export default {
  Account: "rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ",
  Amount: "3000000",
  Destination: "rLUmNB4HDBXceBoDTZwcMn2akcpSj44BaB",
  Fee: "12",
  Flags: 2147483648,
  Memos: [
    {
      Memo: {
        MemoData:
          "5468616E6B20796F7520666F722068656C70696E67206F7574207472616E736C6174696E672058554D4D20F09F928B",
      },
    },
  ],
  Sequence: 690,
  SigningPubKey:
    "0350714189757DA0403CE1FF2025522337EA1B60D9796B11D5559EE914982D6AC3",
  TransactionType: "Payment",
  TxnSignature:
    "3045022100E08D6E2550325F5582991F9234DC6386E7D44417465A0864A5D8A151BC542AF5022020467C3485DF4FF48D25FAA7D15EEE457CBF9E31E0D553F4C6D61974F25CDFA1",
  date: 675464961,
  hash: "2854762BC8FF1B96FB7231131C49054BF65EE5576C62400E80548E61B0CD1F50",
  inLedger: 63861125,
  ledger_index: 63861125,
  meta: {
    AffectedNodes: [
      {
        ModifiedNode: {
          FinalFields: {
            Account: "rLUmNB4HDBXceBoDTZwcMn2akcpSj44BaB",
            Balance: "1093374213",
            Flags: 0,
            OwnerCount: 0,
            Sequence: 61605133,
          },
          LedgerEntryType: "AccountRoot",
          LedgerIndex:
            "43B8CCA1C2290F9F04E9BF9DA6E97EC89E792B14CE29C65B6692D70DE553CAB3",
          PreviousFields: {
            Balance: "1090374213",
          },
          PreviousTxnID:
            "EB281D3603D306F5F84785121B632D619DB298644F13AB9C2D1951944960BD86",
          PreviousTxnLgrSeq: 63672985,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Account: "rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ",
            Balance: "5585966642",
            Domain: "78756D6D2E617070",
            EmailHash: "FC377D96856A120F509E8FF6DB877ECC",
            Flags: 8388608,
            MessageKey:
              "020000000000000000000000004CCAE8EBCB878C8DB19A910A5EEBCE32E8693211",
            OwnerCount: 7,
            Sequence: 691,
          },
          LedgerEntryType: "AccountRoot",
          LedgerIndex:
            "8C4F456312F02D5199BCB1FB8F657BF19675288E3F4EBF2AFCFB5A1253788404",
          PreviousFields: {
            Balance: "5588966654",
            Sequence: 690,
          },
          PreviousTxnID:
            "C7B9A64DB95753BAC61E58BAAA2FC7D64A3EC5D8652CD8EBA7EB868A57580DF0",
          PreviousTxnLgrSeq: 63841538,
        },
      },
    ],
    TransactionIndex: 26,
    TransactionResult: "tesSUCCESS",
    delivered_amount: "3000000",
  },
  validated: true,
};
