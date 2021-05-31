import { TxMutationParser, MutationType } from "../src/";
import transaction from "./fixtures/tx1";

describe(`Rippling through own account\n» https://github.com/XRPL-Labs/XUMM-Issue-Tracker/issues/322`, () => {
  const account = "r38UeRHhNLnprf1CjJ3ts4y1TuGCSSY3hL";
  const parsedTransaction = TxMutationParser(account, transaction);

  // console.log(parsedTransaction);

  describe("Debug", () => {
    it(`'Self' (own account) must be:\n${account}`, async () => {
      expect(parsedTransaction.self.account).toEqual(account);
    });

    it(`Raw TX data available at:\nhttps://hash.xrp.fans/${transaction.hash}`, async () => {
      expect(transaction.hash).toEqual(
        "D36265AD359D82BDF056CAFE760F9DFF42BB21C308EC3F68C4DE0D707D2FB6B6"
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
        counterparty: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
        currency: "CSC",
        value: "1.999999999999",
      });
    });

    it("contains (correct) `secondary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).toContain("secondary");
      expect(parsedTransaction.eventList.secondary).toMatchObject({
        counterparty: "",
        currency: "XRP",
        value: "-0.004362",
      });
    });
  });

  describe("Event flow", () => {
    it("contains (correct) `start` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain("start");
      expect(parsedTransaction.eventFlow.start).toMatchObject({
        account: "rogue5HnPRSszD9CWGSUz8UGHMVwSSKF6",
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
            counterparty: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
            currency: "CSC",
            value: "1.999999999999",
          },
          out: {
            counterparty: "",
            currency: "XRP",
            value: "-0.004362",
          },
        },
      });
    });

    it("contains (correct) `end` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain("end");
      expect(parsedTransaction.eventFlow.end).toMatchObject({
        account: "rogue5HnPRSszD9CWGSUz8UGHMVwSSKF6",
      });
    });
  });
});
