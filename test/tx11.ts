import { TxMutationParser, MutationType } from "../src/";
import transaction from "./fixtures/tx11";

describe(`Regular 3 XRP receiving`, () => {
  const account = "rLUmNB4HDBXceBoDTZwcMn2akcpSj44BaB";
  const parsedTransaction = TxMutationParser(account, transaction);

  // console.log(parsedTransaction);

  describe("Debug", () => {
    it(`'Self' (own account) must be:\n${account}`, async () => {
      expect(parsedTransaction.self.account).toEqual(account);
    });

    it(`Raw TX data available at:\nhttps://hash.xrp.fans/${transaction.hash}`, async () => {
      expect(transaction.hash).toEqual(
        "2854762BC8FF1B96FB7231131C49054BF65EE5576C62400E80548E61B0CD1F50"
      );
    });
  });

  describe("Basic info", () => {
    it("Own account: one balance change", async () => {
      expect(parsedTransaction.self.balanceChanges).toHaveLength(1);
    });

    it("Transaction type RECEIVED", async () => {
      expect(parsedTransaction.type).toEqual(MutationType.RECEIVED);
    });
  });

  describe("Event list", () => {
    it("contains (correct) `primary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).toContain("primary");
      expect(parsedTransaction.eventList.primary).toMatchObject({
        counterparty: "",
        currency: "XRP",
        value: "3",
      });
    });

    it("does not contain `secondary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).not.toContain(
        "secondary"
      );
    });
  });

  describe("Event flow", () => {
    it("contains (correct) `start` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain("start");
      expect(parsedTransaction.eventFlow.start).toMatchObject({
        account: "rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ",
        mutation: {
          counterparty: "",
          currency: "XRP",
          value: "-3",
        },
      });
    });

    it("does not contains `intermediate` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).not.toContain(
        "intermediate"
      );
    });

    it("contains (correct) `end` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain("end");
      expect(parsedTransaction.eventFlow.end).toMatchObject({
        account: account,
        mutation: {
          counterparty: "",
          currency: "XRP",
          value: "3",
        },
      });
    });
  });
});
