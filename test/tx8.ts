import { TxMutationParser, MutationType } from "../src/";
import transaction from "./fixtures/tx8";

describe(`Sending a payment, other account (Regular Key) signed`, () => {
  const account = "rQHYSEyxX3GKK3F6sXRvdd2NHhUqaxtC6F";
  const parsedTransaction = TxMutationParser(account, transaction);

  // console.log(parsedTransaction);

  describe("Debug", () => {
    it(`'Self' (own account) must be:\n${account}`, async () => {
      expect(parsedTransaction.self.account).toEqual(account);
    });

    it(`Raw TX data available at:\nhttps://hash.xrp.fans/${transaction.hash}`, async () => {
      expect(transaction.hash).toEqual(
        "2CE935CC1FB07310E34DF373C95CE735FCB546577BA3C3E197F5F2CECAABB8B4"
      );
    });
  });

  describe("Basic info", () => {
    it("Own account: two balance changes", async () => {
      expect(parsedTransaction.self.balanceChanges).toHaveLength(2);
    });

    it("Transaction type SENT", async () => {
      expect(parsedTransaction.type).toEqual(MutationType.SENT);
    });
  });

  describe("Event list", () => {
    it("contains (correct) `primary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).toContain("primary");
      expect(parsedTransaction.eventList.primary).toMatchObject({
        counterparty: "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
        currency: "USD",
        value: "-0.1",
      });
    });

    it("not to contain `secondary` entry", async () => {
      expect(Object.keys(parsedTransaction.eventList)).not.toContain(
        "secondary"
      );
    });
  });

  describe("Event flow", () => {
    it("contains (correct) `start` entry", async () => {
      expect(Object.keys(parsedTransaction.eventFlow)).toContain("start");
      expect(parsedTransaction.eventFlow.start).toMatchObject({
        account: account,
        mutation: {
          counterparty: "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
          currency: "USD",
          value: "-0.1",
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
        account: "rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT",
        mutation: {
          counterparty: "",
          currency: "XRP",
          value: "0.106294",
        },
      });
    });
  });
});
