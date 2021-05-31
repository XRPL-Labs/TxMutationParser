import { TxMutationParser, MutationType } from "../src/";
import transaction from "./fixtures/tx13";

describe(`Completely unrelated account`, () => {
  const account = "richard43NZXStHcjJi2UB8LGDQGFLKNs";
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
    it("Own account: two balance changes", async () => {
      expect(parsedTransaction.self.balanceChanges).toHaveLength(0);
    });

    it("Transaction type UNKNOWN", async () => {
      expect(parsedTransaction.type).toEqual(MutationType.UNKNOWN);
    });
  });

  describe("Event list", () => {
    it("does not contain `primary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).not.toContain("primary");
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
      });
    });

    it("contains (correct) `intermediate` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain(
        "intermediate"
      );
      expect(parsedTransaction.eventFlow.intermediate).toMatchObject({
        account: account,
        mutations: {
          in: undefined,
          out: undefined,
        },
      });
    });

    it("contains (correct) `end` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain("end");
      expect(parsedTransaction.eventFlow.end).toMatchObject({
        account: "rLUmNB4HDBXceBoDTZwcMn2akcpSj44BaB",
      });
    });
  });
});
