import { TxMutationParser, MutationType } from "../src/";
import transaction from "./fixtures/tx9";

describe(`OfferCreate, instant trade`, () => {
  const account = "rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ";
  const parsedTransaction = TxMutationParser(account, transaction);

  // console.log(parsedTransaction);

  describe("Debug", () => {
    it(`'Self' (own account) must be:\n${account}`, async () => {
      expect(parsedTransaction.self.account).toEqual(account);
    });

    it(`Raw TX data available at:\nhttps://hash.xrp.fans/${transaction.hash}`, async () => {
      expect(transaction.hash).toEqual(
        "4AEEDA19D5EC4F902765FD061DCEDEEA63E4E507B5C2E0B17AA281AFD09F05AC"
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
        counterparty: "",
        currency: "XRP",
        value: "0.005908",
      });
    });

    it("contains (correct) `secondary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).toContain("secondary");
      expect(parsedTransaction.eventList.secondary).toMatchObject({
        counterparty: "rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz",
        currency: "534F4C4F00000000000000000000000000000000",
        value: "-0.0040004",
      });
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
      expect(parsedTransaction.eventFlow.intermediate).toMatchObject({
        account: account,
        mutations: {
          in: {
            counterparty: "",
            currency: "XRP",
            value: "0.005908",
          },
          out: {
            counterparty: "rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz",
            currency: "534F4C4F00000000000000000000000000000000",
            value: "-0.0040004",
          },
        },
      });
    });

    it("does not contain `end` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).not.toContain("end");
    });
  });
});
