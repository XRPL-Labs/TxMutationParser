import { TxMutationParser, MutationType } from "../src/";
import transaction from "./fixtures/tx2";

describe(`Own offer consumed partially, not by self\n» https://github.com/XRPL-Labs/XUMM-Issue-Tracker/issues/260`, () => {
  const account = "rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ";
  const parsedTransaction = TxMutationParser(account, transaction);

  // console.log(parsedTransaction);

  describe("Debug", () => {
    it(`'Self' (own account) must be:\n${account}`, async () => {
      expect(parsedTransaction.self.account).toEqual(account);
    });

    it(`Raw TX data available at:\nhttps://hash.xrp.fans/${transaction.hash}`, async () => {
      expect(transaction.hash).toEqual(
        "A357FD7C8F0BBE7120E62FD603ACBE98819BC623D5D12BD81AC68564393A7792"
      );
    });
  });

  describe("Basic info", () => {
    it("Own account: two balance changes", async () => {
      expect(parsedTransaction.self.balanceChanges).toHaveLength(2);
    });

    it("Transaction type TRADE", async () => {
      expect(parsedTransaction.type).toEqual(MutationType.TRADE);
    });
  });

  describe("Event list", () => {
    it("contains (correct) `primary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).toContain("primary");
      expect(parsedTransaction.eventList.primary).toMatchObject({
        counterparty: "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
        currency: "EUR",
        value: "249.99999999999999",
      });
    });

    it("contains (correct) `secondary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).toContain("secondary");
      expect(parsedTransaction.eventList.secondary).toMatchObject({
        counterparty: "",
        currency: "XRP",
        value: "-1000",
      });
    });
  });

  describe("Event flow", () => {
    it("contains (correct) `start` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain("start");
      expect(parsedTransaction.eventFlow.start).toMatchObject({
        account: "rJWSJ8b2DxpvbhJjTA3ZRiEK2xsxZNHaLP",
        mutation: {
          counterparty: "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
          currency: "EUR",
          value: "-9599.9999999999976",
        },
      });
    });

    it("contains (correct) `intermediate` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain(
        "intermediate"
      );
      expect(parsedTransaction.eventFlow.intermediate).toMatchObject({
        account: account,
        mutations: {
          in: {
            counterparty: "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
            currency: "EUR",
            value: "249.99999999999999",
          },
          out: {
            counterparty: "",
            currency: "XRP",
            value: "-1000",
          },
        },
      });
    });

    it("does not contain `end` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).not.toContain("end");
    });
  });
});
