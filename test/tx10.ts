import { TxMutationParser, MutationType } from "../src/";
import transaction from "./fixtures/tx10";

describe(`Trading by payment to self, XRParrot`, () => {
  const account = "rp65fD8N8fWxhMXwQN1CYVwYPeVofmh3S1";
  const parsedTransaction = TxMutationParser(account, transaction);

  // console.log(parsedTransaction);

  describe("Debug", () => {
    it(`'Self' (own account) must be:\n${account}`, async () => {
      expect(parsedTransaction.self.account).toEqual(account);
    });

    it(`Raw TX data available at:\nhttps://hash.xrp.fans/${transaction.hash}`, async () => {
      expect(transaction.hash).toEqual(
        "4598173BFEF787A3F923D5E8E6ECB618F42A0AF38E32BDFA5E4C6EBA49FADE91"
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
        value: "20.172088",
      });
    });

    it("contains (correct) `secondary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).toContain("secondary");
      expect(parsedTransaction.eventList.secondary).toMatchObject({
        counterparty: "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
        currency: "EUR",
        value: "-4",
      });
    });
  });

  describe("Event flow", () => {
    it("contains (correct) `start` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain("start");
      expect(parsedTransaction.eventFlow.start).toMatchObject({
        account: account,
        mutation: {
          counterparty: "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
          currency: "EUR",
          value: "-4",
        },
      });
    });

    it("does not contain `intermediate` entry", async () => {
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
          value: "20.172088",
        },
      });
    });
  });
});
