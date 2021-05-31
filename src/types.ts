export type AnyJson = Record<string, unknown>;

export enum MutationType {
  SENT = "SENT", // Outgoing transaction
  RECEIVED = "RECEIVED", // Incoming transaction
  SET = "SET", // Set, eg. Account, Trust Line, Offer, ...
  TRADE = "TRADE", // Eg. Trade based on offer, or self to self
  REGULARKEYSIGNER = "REGULARKEYSIGNER", // Executed on behalf of someone else (Regular Key)
  UNKNOWN = "UNKNOWN", // Could not determine the transaction type (from own context)
}

export type XrplAmount = {
  currency: string;
  issuer: string;
  value: string;
};

export type FormattedBalanceChange = {
  counterparty: string;
  currency: string;
  value: string;
  formatted: {
    value: string;
    currency: string;
  };
};

export type FormattedBalanceChanges = {
  [key: string]: FormattedBalanceChange[];
};

export interface XrplTransaction extends AnyJson {
  TransactionType: string;
  Account?: string;
  Destination?: string;
  Amount?: string | XrplAmount;
  SigningPubKey: string;
  Fee: string;
  Flags?: number;
  meta: {
    AffectedNodes: AnyJson[];
    DeliveredAmount?: string | XrplAmount;
    TransactionIndex: number;
    TransactionResult: string;
    delivered_amount?: string | XrplAmount;
  };
}

export type EventList = {
  primary?: FormattedBalanceChange;
  secondary?: FormattedBalanceChange;
};

export type FlowEntry = {
  account: string;
  mutation?: FormattedBalanceChange;
};

export type IntermediateEntries = {
  account: string;
  mutations?: {
    in?: FormattedBalanceChange;
    out?: FormattedBalanceChange;
  };
};

export type EventFlow = {
  start?: FlowEntry;
  intermediate?: IntermediateEntries;
  end?: FlowEntry;
};

export interface MutationParserResult extends AnyJson {
  self: {
    account: string;
    balanceChanges: FormattedBalanceChange[];
  };
  type: MutationType;
  eventList: EventList;
  eventFlow: EventFlow;
  allBalanceChanges: FormattedBalanceChanges;
}
