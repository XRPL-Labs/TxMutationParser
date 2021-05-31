import { TxMutationParser, MutationType } from "../src/";
import transaction from "./fixtures/tx12";

describe(`NFT owner sends NFT to someone else (issuer perspective, rippling through own account)`, () => {
  const account = "richard43NZXStHcjJi2UB8LGDQGFLKNs";
  const parsedTransaction = TxMutationParser(account, transaction);

  // console.log(parsedTransaction);

  describe("Debug", () => {
    it(`'Self' (own account) must be:\n${account}`, async () => {
      expect(parsedTransaction.self.account).toEqual(account);
    });

    it(`Raw TX data available at:\nhttps://hash.xrp.fans/${transaction.hash}`, async () => {
      expect(transaction.hash).toEqual(
        "40181066402827E7AD3393C450E1AC1C5A1B055D0862182B7F8FA62759B76E68"
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
        account: "rcoinShpZ8MfUipcfbySaV7rPV82k1SMS",
        mutation: {
          counterparty: account,
          currency: "021D001703B37004416E205852504C204E46543F",
          value: "-1e-81",
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
          in: undefined,
          out: undefined,
        },
      });
    });

    it("contains (correct) `end` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain("end");
      expect(parsedTransaction.eventFlow.end).toMatchObject({
        account: "rDMxhp4g689YyM7qfaarJRC6YMm74E3sMW",
        mutation: {
          counterparty: account,
          currency: "021D001703B37004416E205852504C204E46543F",
          value: "1e-81",
        },
      });
    });
  });
});
