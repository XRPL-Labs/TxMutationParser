import { TxMutationParser, MutationType } from "../src/";
import transaction from "./fixtures/tx5";

describe(`Trust Line added by own account`, () => {
  const account = "rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ";
  const parsedTransaction = TxMutationParser(account, transaction);

  // console.log(parsedTransaction);

  describe("Debug", () => {
    it(`'Self' (own account) must be:\n${account}`, async () => {
      expect(parsedTransaction.self.account).toEqual(account);
    });

    it(`Raw TX data available at:\nhttps://hash.xrp.fans/${transaction.hash}`, async () => {
      expect(transaction.hash).toEqual(
        "77F965D99CDE91E5B7652EB4406B107C7BDE59A51EE14EB7549813F633296DF1"
      );
    });
  });

  describe("Basic info", () => {
    it("Own account: one balance change", async () => {
      expect(parsedTransaction.self.balanceChanges).toHaveLength(1);
    });

    it("Transaction type SET", async () => {
      expect(parsedTransaction.type).toEqual(MutationType.SET);
    });
  });

  describe("Event list", () => {
    it("contains (correct) `primary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).toContain("primary");
      expect(parsedTransaction.eventList.primary).toMatchObject({
        counterparty: "",
        currency: "XRP",
        value: "-0.000012",
      });
    });

    it("does not contain `secondary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).not.toContain(
        "secondary"
      );
    });
  });

  describe("Event flow", () => {
    it("does not contain `start` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).not.toContain("start");
    });

    it("contains (correct) `intermediate` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain(
        "intermediate"
      );
      expect(
        parsedTransaction?.eventFlow?.intermediate?.mutations?.in
      ).not.toBeDefined();
      expect(parsedTransaction.eventFlow.intermediate).toMatchObject({
        account: account,
        mutations: {
          out: {
            counterparty: "",
            currency: "XRP",
            value: "-0.000012",
          },
        },
      });
    });

    it("does not contain `end` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).not.toContain("end");
    });
  });
});
