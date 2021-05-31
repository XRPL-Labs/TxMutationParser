export default {
  Account: "rogue5HnPRSszD9CWGSUz8UGHMVwSSKF6",
  Amount: "100300000",
  Destination: "rogue5HnPRSszD9CWGSUz8UGHMVwSSKF6",
  Fee: "10000",
  Flags: 196608,
  LastLedgerSequence: 62015879,
  Paths: [
    [
      {
        currency: "USD",
        issuer: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
        type: 48,
      },
      {
        account: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
        type: 1,
      },
      {
        currency: "CSC",
        issuer: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
        type: 48,
      },
      {
        account: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
        type: 1,
      },
    ],
  ],
  SendMax: {
    currency: "CNY",
    issuer: "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y",
    value: "26.42538528",
  },
  Sequence: 1728972,
  SigningPubKey:
    "ED3DC1A8262390DBA0E9926050A7BE377DFCC7937CC94C5F5F24E6BD97D677BA6C",
  TransactionType: "Payment",
  TxnSignature:
    "1A3C1E09F5635C44E94400274F60109D90817ADFC9267E50088F639957BE020C394D9255B425B9D1B68DF9F9EFC4CE976483FA28BE107E9CC5A3100B715F9D05",
  date: 668328001,
  hash: "D36265AD359D82BDF056CAFE760F9DFF42BB21C308EC3F68C4DE0D707D2FB6B6",
  inLedger: 62015878,
  ledger_index: 62015878,
  meta: {
    AffectedNodes: [
      {
        ModifiedNode: {
          FinalFields: {
            Flags: 0,
            Owner: "rB1CbvwR8Ld6zdTJG96nFRnxF8HvDQooe6",
            RootIndex:
              "0D43F9341FFDCA314B5E7BF0CB1FA1C45AE03283704D195862B0151610E71FBD",
          },
          LedgerEntryType: "DirectoryNode",
          LedgerIndex:
            "0D43F9341FFDCA314B5E7BF0CB1FA1C45AE03283704D195862B0151610E71FBD",
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Balance: {
              currency: "CSC",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-4001.999999999999",
            },
            Flags: 2228224,
            HighLimit: {
              currency: "CSC",
              issuer: "r38UeRHhNLnprf1CjJ3ts4y1TuGCSSY3hL",
              value: "999999999",
            },
            HighNode: "0",
            LowLimit: {
              currency: "CSC",
              issuer: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
              value: "0",
            },
            LowNode: "3",
          },
          LedgerEntryType: "RippleState",
          LedgerIndex:
            "13D2B054EB79D481FE73BCB4DCC5F9F80681070D5E579EA4D96837D7BB40B566",
          PreviousFields: {
            Balance: {
              currency: "CSC",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-4000",
            },
          },
          PreviousTxnID:
            "C0D64B75CC7B57E9A630C109D4B97B30AC3EC1CC88CBCE92F585AC7B64D53809",
          PreviousTxnLgrSeq: 61977218,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Account: "rB1CbvwR8Ld6zdTJG96nFRnxF8HvDQooe6",
            Balance: "54476575988",
            EmailHash: "851134201C279F32B15041754CC25CD9",
            Flags: 0,
            OwnerCount: 6,
            Sequence: 56205183,
          },
          LedgerEntryType: "AccountRoot",
          LedgerIndex:
            "28B972894A2E515DC0B49BB71A7A48A83B277DF9EC8D716D2EBD00B4E6488D0F",
          PreviousFields: {
            Balance: "54576575988",
            OwnerCount: 7,
          },
          PreviousTxnID:
            "552AC5F2350AC22269FA642D1D23D34476970CDADCD3DB6BF78DBBE17C73773F",
          PreviousTxnLgrSeq: 62015877,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Account: "r4L6ZLHkTytPqDR81H1ysCr6qGv9oJJAKi",
            BookDirectory:
              "B7A806DE52025BB22C244FEDDF0BA9F6A3CC04C8430B936D55176079A29F4001",
            BookNode: "0",
            Flags: 131072,
            OwnerNode: "1",
            Sequence: 295608,
            TakerGets: {
              currency: "USD",
              issuer: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              value: "213.1854956428151",
            },
            TakerPays: {
              currency: "CNY",
              issuer: "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y",
              value: "1402.760561329724",
            },
          },
          LedgerEntryType: "Offer",
          LedgerIndex:
            "2ABFF49C68E07A074CD4D0C3F3765273E76D05F97BB99826F5E86E6C60306BC1",
          PreviousFields: {
            TakerGets: {
              currency: "USD",
              issuer: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              value: "217.201511642815",
            },
            TakerPays: {
              currency: "CNY",
              issuer: "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y",
              value: "1429.185946609723",
            },
          },
          PreviousTxnID:
            "06D43378B3D4EF4D344A07641094AF6B4246BBB3A7B3C1A17CBF1C70DCA11A29",
          PreviousTxnLgrSeq: 62013294,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Balance: {
              currency: "CSC",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-47094.00000000001",
            },
            Flags: 2228224,
            HighLimit: {
              currency: "CSC",
              issuer: "rnhxcjE1PPCMdiHY9MvAZ13cQnrQh7yCsC",
              value: "65000000000",
            },
            HighNode: "0",
            LowLimit: {
              currency: "CSC",
              issuer: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
              value: "0",
            },
            LowNode: "0",
          },
          LedgerEntryType: "RippleState",
          LedgerIndex:
            "2C037425FA3CB2C76E1CDF5678FDA2DFDBD26B6C7F9D047D1464C90318EE03EC",
          PreviousFields: {
            Balance: {
              currency: "CSC",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-48096",
            },
          },
          PreviousTxnID:
            "87F2B5274536CF889865CB6650874937ED05DC05DB0E2E308B0B6365904CD13F",
          PreviousTxnLgrSeq: 61995834,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Balance: {
              currency: "CNY",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "0.00000100447034",
            },
            Flags: 1114112,
            HighLimit: {
              currency: "CNY",
              issuer: "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y",
              value: "0",
            },
            HighNode: "7a",
            LowLimit: {
              currency: "CNY",
              issuer: "rogue5HnPRSszD9CWGSUz8UGHMVwSSKF6",
              value: "10000000",
            },
            LowNode: "0",
          },
          LedgerEntryType: "RippleState",
          LedgerIndex:
            "35AD47BA82E5FEA072605F092C547C1B70953BCEBB72158B0C4801054DF4E428",
          PreviousFields: {
            Balance: {
              currency: "CNY",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "26.42538628447034",
            },
          },
          PreviousTxnID:
            "7ED6BD981F3C93F650A59FF4563819E96686658661C7D4DE4BABA935516F3852",
          PreviousTxnLgrSeq: 62015878,
        },
      },
      {
        DeletedNode: {
          FinalFields: {
            Account: "rB1CbvwR8Ld6zdTJG96nFRnxF8HvDQooe6",
            BookDirectory:
              "6506533636CDB7474F7CA0D6013EFBC538BE58E1E575CDC150038D7EA4C68000",
            BookNode: "0",
            Expiration: 699863979,
            Flags: 0,
            OwnerNode: "0",
            PreviousTxnID:
              "552AC5F2350AC22269FA642D1D23D34476970CDADCD3DB6BF78DBBE17C73773F",
            PreviousTxnLgrSeq: 62015877,
            Sequence: 56205182,
            TakerGets: "0",
            TakerPays: {
              currency: "CSC",
              issuer: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
              value: "0",
            },
          },
          LedgerEntryType: "Offer",
          LedgerIndex:
            "3E9AB1F08B454DB4D62B6033AFCCFCBE91CD141C669DEA3F63D973529DA1B598",
          PreviousFields: {
            TakerGets: "100000000",
            TakerPays: {
              currency: "CSC",
              issuer: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
              value: "1000",
            },
          },
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Balance: {
              currency: "CNY",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-24107.40056308713",
            },
            Flags: 2228224,
            HighLimit: {
              currency: "CNY",
              issuer: "r4L6ZLHkTytPqDR81H1ysCr6qGv9oJJAKi",
              value: "10000000",
            },
            HighNode: "0",
            LowLimit: {
              currency: "CNY",
              issuer: "rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y",
              value: "0",
            },
            LowNode: "e",
          },
          LedgerEntryType: "RippleState",
          LedgerIndex:
            "436680584512838F5DC460557C199DE9420D6ABD36DCA547EF8F16C274E11FA7",
          PreviousFields: {
            Balance: {
              currency: "CNY",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-24080.97517780714",
            },
          },
          PreviousTxnID:
            "82FA6944411BD7759952020F38829B15D8947F26175ADF1EE56ADD4B4987F9E2",
          PreviousTxnLgrSeq: 62014093,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Account: "r38UeRHhNLnprf1CjJ3ts4y1TuGCSSY3hL",
            Balance: "7392314863",
            Flags: 0,
            MessageKey:
              "020000000000000000000000002EF2587D04AEAF5D5D04007A187AD44111CC69A8",
            OwnerCount: 3,
            Sequence: 33,
          },
          LedgerEntryType: "AccountRoot",
          LedgerIndex:
            "51F15DA2E80C1A9B5F7A950EDC8CD8D107B0B11F9BB389889F6A00771583A3D0",
          PreviousFields: {
            Balance: "7392319225",
          },
          PreviousTxnID:
            "B204132649DDBFD284A68132A02D48747AAF061D66F227F974C4F91A62ED7CCF",
          PreviousTxnLgrSeq: 62012280,
        },
      },
      {
        DeletedNode: {
          FinalFields: {
            ExchangeRate: "50038d7ea4c68000",
            Flags: 0,
            RootIndex:
              "6506533636CDB7474F7CA0D6013EFBC538BE58E1E575CDC150038D7EA4C68000",
            TakerGetsCurrency: "0000000000000000000000000000000000000000",
            TakerGetsIssuer: "0000000000000000000000000000000000000000",
            TakerPaysCurrency: "0000000000000000000000004353430000000000",
            TakerPaysIssuer: "07453A365D565F637A8CB8478AF080F2CE8E0D48",
          },
          LedgerEntryType: "DirectoryNode",
          LedgerIndex:
            "6506533636CDB7474F7CA0D6013EFBC538BE58E1E575CDC150038D7EA4C68000",
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Balance: {
              currency: "CSC",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-1000",
            },
            Flags: 2228224,
            HighLimit: {
              currency: "CSC",
              issuer: "rB1CbvwR8Ld6zdTJG96nFRnxF8HvDQooe6",
              value: "999999999",
            },
            HighNode: "0",
            LowLimit: {
              currency: "CSC",
              issuer: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
              value: "0",
            },
            LowNode: "9",
          },
          LedgerEntryType: "RippleState",
          LedgerIndex:
            "C40C8A08CF20584133318F4AD82CADB3B45A0AD5A626B0EDBB4D1BD17EFD2F39",
          PreviousFields: {
            Balance: {
              currency: "CSC",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "0",
            },
          },
          PreviousTxnID:
            "2922A71788E05E071ADBC67BCE0DE10408EB4FA0F59B6269649409F93935AFFE",
          PreviousTxnLgrSeq: 62015195,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Account: "rnhxcjE1PPCMdiHY9MvAZ13cQnrQh7yCsC",
            BookDirectory:
              "230DD9C857DC604EDA71D8F0EA00EC265D0763E20A12F3AD520E35FA931A0000",
            BookNode: "0",
            Flags: 131072,
            OwnerNode: "0",
            Sequence: 61965155,
            TakerGets: {
              currency: "CSC",
              issuer: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
              value: "23998.00000000001",
            },
            TakerPays: {
              currency: "USD",
              issuer: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              value: "95.99200000000001",
            },
          },
          LedgerEntryType: "Offer",
          LedgerIndex:
            "CA1328ED252930827D8719B8E42F5A6A6569BF948D0C9AC455D83D30F00999D5",
          PreviousFields: {
            TakerGets: {
              currency: "CSC",
              issuer: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
              value: "25000",
            },
            TakerPays: {
              currency: "USD",
              issuer: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              value: "100",
            },
          },
          PreviousTxnID:
            "0DC0E278E5BD9DA9B83D290D1A20AD89220C141F8F0FF8DFE2A406F93DD8B169",
          PreviousTxnLgrSeq: 61966482,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Account: "r38UeRHhNLnprf1CjJ3ts4y1TuGCSSY3hL",
            BookDirectory:
              "6506533636CDB7474F7CA0D6013EFBC538BE58E1E575CDC151104A14C7229D85",
            BookNode: "0",
            Expiration: 699850092,
            Flags: 0,
            OwnerNode: "0",
            Sequence: 32,
            TakerGets: "87235638",
            TakerPays: {
              currency: "CSC",
              issuer: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
              value: "39998.00000000001",
            },
          },
          LedgerEntryType: "Offer",
          LedgerIndex:
            "DE8F6A1FAD750817F19C277990DB3198503C490B5100E49188876B9136AF3573",
          PreviousFields: {
            TakerGets: "87240000",
            TakerPays: {
              currency: "CSC",
              issuer: "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr",
              value: "40000",
            },
          },
          PreviousTxnID:
            "B204132649DDBFD284A68132A02D48747AAF061D66F227F974C4F91A62ED7CCF",
          PreviousTxnLgrSeq: 62012280,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Account: "rogue5HnPRSszD9CWGSUz8UGHMVwSSKF6",
            AccountTxnID:
              "D36265AD359D82BDF056CAFE760F9DFF42BB21C308EC3F68C4DE0D707D2FB6B6",
            Balance: "3677848922",
            Flags: 0,
            OwnerCount: 289,
            Sequence: 1728973,
          },
          LedgerEntryType: "AccountRoot",
          LedgerIndex:
            "E7C799A822859C2DC1CA293CB3136B6590628B19F81D5C7BA8752B49BB422E84",
          PreviousFields: {
            AccountTxnID:
              "7ED6BD981F3C93F650A59FF4563819E96686658661C7D4DE4BABA935516F3852",
            Balance: "3577854560",
            Sequence: 1728972,
          },
          PreviousTxnID:
            "7ED6BD981F3C93F650A59FF4563819E96686658661C7D4DE4BABA935516F3852",
          PreviousTxnLgrSeq: 62015878,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Balance: {
              currency: "USD",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-5083.526109863022",
            },
            Flags: 2228224,
            HighLimit: {
              currency: "USD",
              issuer: "r4L6ZLHkTytPqDR81H1ysCr6qGv9oJJAKi",
              value: "10000000",
            },
            HighNode: "0",
            LowLimit: {
              currency: "USD",
              issuer: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              value: "0",
            },
            LowNode: "30d",
          },
          LedgerEntryType: "RippleState",
          LedgerIndex:
            "F47A9F11D73846204865302AD1372B82A3D0901F2D187D4177F98325679D53B4",
          PreviousFields: {
            Balance: {
              currency: "USD",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-5087.542125863021",
            },
          },
          PreviousTxnID:
            "82FA6944411BD7759952020F38829B15D8947F26175ADF1EE56ADD4B4987F9E2",
          PreviousTxnLgrSeq: 62014093,
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Balance: {
              currency: "USD",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-8.530285883734837",
            },
            Flags: 2228224,
            HighLimit: {
              currency: "USD",
              issuer: "rnhxcjE1PPCMdiHY9MvAZ13cQnrQh7yCsC",
              value: "999999999",
            },
            HighNode: "0",
            LowLimit: {
              currency: "USD",
              issuer: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              value: "0",
            },
            LowNode: "626",
          },
          LedgerEntryType: "RippleState",
          LedgerIndex:
            "FCDE0104049DD3415003EF1DA0A2DEA845D4A0FC1A99FC5373BA863EA97B1840",
          PreviousFields: {
            Balance: {
              currency: "USD",
              issuer: "rrrrrrrrrrrrrrrrrrrrBZbvji",
              value: "-4.522285883734839",
            },
          },
          PreviousTxnID:
            "D183DF3A66C3B406B6C81909DF80C302E213182B0EA3CF86805BD86BC22A19B8",
          PreviousTxnLgrSeq: 61967368,
        },
      },
    ],
    DeliveredAmount: "100004362",
    TransactionIndex: 11,
    TransactionResult: "tesSUCCESS",
    delivered_amount: "100004362",
  },
  validated: true,
};
