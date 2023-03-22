import { debug as Debug } from "debug";
import { parseBalanceChanges } from "./ext-dependencies/balanceParser";
import { pubkeyToAccount } from "./ext-dependencies/utils";
import {
  MutationParserResult,
  XrplTransaction,
  MutationType,
  EventFlow,
  FormattedBalanceChange,
  EventList,
} from "./types";

export * from "./types";

const log = Debug("txmutation");

const significantBalanceChange = (
  balanceChanges: FormattedBalanceChange[],
  fee?: string
): FormattedBalanceChange => {
  const positiveChanges = balanceChanges.filter(
    (change) => change.value.slice(0, 1) !== "-"
  );

  const positiveChangesNonXRP = positiveChanges.filter(
    (change) => !(change.currency === "XRP" && change.counterparty === "")
  );

  const nonXRPChanges = balanceChanges.filter(
    (change) => !(change.currency === "XRP" && change.counterparty === "")
  );

  if (positiveChangesNonXRP.length > 0) {
    return positiveChangesNonXRP[0];
  }

  if (positiveChanges.length > 0) {
    return positiveChanges[0];
  }

  if (nonXRPChanges.length > 0) {
    return nonXRPChanges[0];
  }

  /**
   * Fallback to default
   *  Possibly XRP sent, if so: exclude fee
   */
  const fallback = balanceChanges?.[0];

  if (
    fallback?.currency === "XRP" &&
    fallback?.counterparty === "" &&
    fallback?.value.slice(0, 1) === "-" &&
    fee
  ) {
    return {
      ...fallback,
      value:
        Math.abs(Number(fallback.value)) === Math.abs(Number(fee))
          ? fallback.value
          : String(Number(fallback.value) + Number(fee)),
    };
  }

  return fallback;
};

// Parameters may be declared in a variety of syntactic forms
/**
 * @param {string} account - "Me" (<self>, r...), the XRPL account the transaction is viewed by
 * @param {XrplTransaction} transaction - Signed XRPL transaction JSON
 * @return {MutationParserResult} Parsed transaction result
 */
export const TxMutationParser = (
  account: string,
  transaction: XrplTransaction
): MutationParserResult => {
  /**
   * Transaction Fee to string notation
   */
  const fee = String(Number(transaction.Fee) / 1_000_000);

  /**
   * Calculate balance changes from meta and own changes
   */
  const allBalanceChanges = parseBalanceChanges(transaction.meta);
  const ownBalanceChanges =
    Object.keys(allBalanceChanges).indexOf(account) > -1
      ? allBalanceChanges[account]
      : [];
  const balanceChangeExclFeeOnly = ownBalanceChanges.filter(
    (feeOnly) =>
      !(
        feeOnly.currency === "XRP" &&
        feeOnly.counterparty === "" &&
        feeOnly.value === "-" + fee
      )
  );

  /**
   * Get signer from tx public key
   */
  let signer = transaction?.Account;
  if (!signer || ownBalanceChanges.length < 1) {
    // No signer known from Account, or own account has no balance changes.
    // Self is possibly a Regular Key
    if (
      typeof transaction?.SigningPubKey === "string" &&
      transaction.SigningPubKey !== ""
    ) {
      signer = pubkeyToAccount(transaction.SigningPubKey);
    }
  }

  /**
   * Determine transaction type from the context of own account
   */
  let type = MutationType.UNKNOWN;

  if (signer === account) {
    type = MutationType.REGULARKEYSIGNER;
  }

  if (transaction?.Account === account) {
    type = MutationType.SENT;
  }

  if (transaction?.Destination === account) {
    type = MutationType.RECEIVED;
  }

  /**
   * Payment to self, multiple currencies affected
   */
  if (
    transaction?.Account === account &&
    transaction?.Destination === account &&
    balanceChangeExclFeeOnly.length > 1
  ) {
    type = MutationType.TRADE;
  }

  /**
   * Own balance change count excl. fee only > 1 (so something was exchanged)
   * TX Type = Offer (Trade)
   */
  if (
    balanceChangeExclFeeOnly.length > 1 &&
    transaction.TransactionType.match(/offer|payment/i)
  ) {
    type = MutationType.TRADE;
  }

  /**
   * Own balance change is fee only
   */
  if (ownBalanceChanges.length === 1 && balanceChangeExclFeeOnly.length === 0) {
    type = MutationType.SET;
  }

  /**
   * Render Event List object
   */
  const eventList: EventList = {};
  if (ownBalanceChanges.length > 0) {
    Object.assign(eventList, {
      primary: significantBalanceChange(ownBalanceChanges, fee),
    });
    if (balanceChangeExclFeeOnly.length > 1) {
      const secondary = balanceChangeExclFeeOnly.filter(
        (change) => change !== eventList.primary
      );
      if (secondary.length > 0) {
        Object.assign(eventList, {
          secondary: secondary[0],
        });
      }
    }
  }

  if (
    type === MutationType.TRADE &&
    eventList.primary &&
    eventList.secondary &&
    eventList.primary.currency === eventList.secondary.currency &&
    Math.abs(Number(eventList.primary.value)) ===
      Math.abs(Number(eventList.secondary.value))
  ) {
    delete eventList.primary;
    delete eventList.secondary;
  }

  /**
   * Render event details, min. 1, max. 3 results:
   * 1 = Only self
   *     Set, escrow to self, etc.
   * 2 = From - To
   * 3 = Intermediary, eg. Regular Key signed or async offer consumed
   */
  const eventFlow: EventFlow = {};
  /**
   * Where did the transaction start?
   */
  if (
    transaction?.Account &&
    typeof allBalanceChanges[transaction.Account] !== "undefined"
  ) {
    Object.assign(eventFlow, {
      start: {
        account: transaction.Account,
        mutation: significantBalanceChange(
          allBalanceChanges[transaction.Account].filter((change) => {
            return change.value.slice(0, 1) === "-";
          }),
          transaction.Account === account ||
            transaction?.Destination === account
            ? fee
            : undefined
        ),
      },
    });
  }

  /**
   * Where did the transaction end up?
   */
  if (
    transaction?.Destination &&
    typeof allBalanceChanges[transaction.Destination] !== "undefined"
  ) {
    // log(transaction.Destination, allBalanceChanges[transaction.Destination]);
    const mutation = significantBalanceChange(
      allBalanceChanges[transaction.Destination].filter((change) => {
        return change !== eventFlow?.start?.mutation;
      }),
      transaction.Destination === account || transaction?.Account === account
        ? fee
        : undefined
    );
    if (mutation) {
      Object.assign(eventFlow, {
        end: {
          account: transaction.Destination,
          mutation,
        },
      });
    }
  }

  /**
   * What happened at an intermediary?
   */
  if (type === MutationType.REGULARKEYSIGNER && signer) {
    Object.assign(eventFlow, {
      intermediate: {
        account: signer,
      },
    });
  }

  let isOwnDirectTrade =
    transaction?.Account &&
    transaction.Account === account &&
    eventFlow?.start &&
    !eventFlow?.end;

  if (
    ((!transaction?.Destination || transaction.Destination !== account) &&
      (!transaction?.Account || transaction.Account !== account)) ||
    isOwnDirectTrade
  ) {
    Object.assign(eventFlow, {
      intermediate: {
        account,
        mutations: {
          in: eventList?.primary,
          out: eventList?.secondary,
        },
      },
    });

    /**
     * If intermediate only one value (in) and negative,
     * it's `out`
     */
    if (
      eventFlow.intermediate?.mutations?.in &&
      !eventFlow.intermediate?.mutations?.out &&
      eventFlow.intermediate.mutations.in.value.slice(0, 1) === "-"
    ) {
      Object.assign(eventFlow.intermediate?.mutations, {
        out: eventFlow.intermediate.mutations.in,
      });
      delete eventFlow.intermediate.mutations.in;
    }

    if (isOwnDirectTrade && eventFlow?.intermediate && eventFlow?.start) {
      delete eventFlow.start;
    }
  }

  /**
   * Return result
   */
  return {
    self: {
      account,
      balanceChanges: ownBalanceChanges,
    },
    type,
    eventList,
    eventFlow,
    allBalanceChanges,
  };
};
