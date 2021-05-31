# XRPL Transaction Mutation Parser [![npm version](https://badge.fury.io/js/tx-mutation-parser.svg)](https://www.npmjs.com/tx-mutation-parser) [![GitHub Actions NodeJS status](https://github.com/XRPL-Labs/TxMutationParser/workflows/NodeJS/badge.svg?branch=main)](https://github.com/XRPL-Labs/TxMutationParser/actions) [![CDNJS Browserified](https://img.shields.io/badge/cdnjs-browserified-blue)](https://cdn.jsdelivr.net/gh/XRPL-Labs/TxMutationParser@main/dist/browser.js) [![CDNJS Browserified Minified](https://img.shields.io/badge/cdnjs-minified-orange)](https://cdn.jsdelivr.net/gh/XRPL-Labs/TxMutationParser@main/dist/browser.min.js)

### TxMutationParser, npm: `tx-mutation-parser`

Parse XRPL transaction to context aware object for visual representation. It takes a XRPL transaction (outcome, meta) and an XRPL account. The XRPL account is the context from which the XPRL transaction is to be interpreted.

The account can be the sender, recipient, or an intermediate account. An intermediate account applies if e.g. there's a trade
happening, touching your own offer asynchronously. You put up an offer and at some point down the road it gets (possibly partially) consumed. Alternatively, you can be an Intermediate account if you are a regular key signer or if something is rippling through your account.

The lib. then parses everything, performs all logic (include fee or not, etc.) and returns an object that is ready for use in e.g. an event list, or transaction details view, with all relevant objects parsed & calculated.

This package can be used in Node/Typescript projects (`tx-mutation-parser`) or used (browserified) in the browser.

Origin: https://github.com/XRPL-Labs/XUMM-Issue-Tracker/issues/341

### Syntax

```javascript
const xrplTx = {}; // Full XRPL transaction, containing Account, Destination, meta, etc.)
const parsedTx = TxMutationParser("r...", xrplTx);
console.log(parsedTx);
```

A sample response object (see `src/types.ts`):

```javascript
{
  self: {
    account: 'rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ',
    balanceChanges: [ [Object], [Object] ]
  },
  type: 'TRADE',
  eventList: {
    primary: { ... },
    secondary: { ... },
  },
  eventFlow: {
    start: {
      account: 'rXUMMaPpZqPutoRszR29jtC8amWq3APkx',
      mutation: [Object]
    },
    intermediate: {
      account: 'rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ',
      mutations: [Object]
    },
    end: {
      account: 'richard43NZXStHcjJi2UB8LGDQGFLKNs',
      mutation: [Object]
    }
  },
  allBalanceChanges: {
    rXUMMaPpZqPutoRszR29jtC8amWq3APkx: [ [Object], [Object] ],
    rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ: [ [Object], [Object] ],
    richard43NZXStHcjJi2UB8LGDQGFLKNs: [ [Object] ]
  }
}
```

### Use in the browser

You can clone this repository and run:

- `npm run install` to install dependencies
- `npm run build` to build the source code
- `npm run browserify` to browserify this lib.

Now the `dist/browser.js` file will exist, for you to use in a browser.

Alternatively you can get a [prebuilt](https://cdn.jsdelivr.net/gh/XRPL-Labs/TxMutationParser@main/dist/browser.js) / [prebuilt & minified](https://cdn.jsdelivr.net/gh/XRPL-Labs/TxMutationParser@main/dist/browser.min.js) version from Github.

## Scenario's (data contents)

#### Event List (`eventList`, e.g. a list with transactions belonging to the context account)

If no balance changes to your context account applied: empty. If only one relevant change (e.g. payment in / out): only the `eventList.primary` object exists. If a trade happened and your account both sent and received / exchanged something, the `eventList.primary` object is the main balance change. For reference, the `eventList.secondary` value can be displayed as well.

A common scenario where the `eventList` is completely empty, is if your context account is eg. the account an issued currency
rippled through, or the context account is the regular key, signing the transaction parsed.

#### Event Flow (`eventFlow`, e.g. transaction details page viewed by the context account)

The `eventFlow` object can contain a `eventFlow.start`, `eventFlow.intermediate` and `eventFlow.end` object. The `start` and `end` object can contain a `mutation` (one, so e.g. `eventFlow.start.mutation`).

The `eventFlow.intermediate` object can contain multiple `mutations`, an `in` and `out` (or only `in`, or (more commonly) only `out`) mutation: `eventFlow.intermediate.mutations.in` / `eventFlow.intermediate.mutations.out`.

The `eventFlow` object can contain **only** a `intermediate` object (so no `start` and `end` object) if:

- The transaction is of the mutation type `SET` (e.g. Regular Key set, AccountSet, putting up an XRPL offer, etc.)
- The context account is the issuer of a transaction, and the transaction is rippling through
- The context account is the signer using a regular key, and no balance changes apply to the context account

##### Display logic:

Always show then in this order (if present)

- start
- intermediate
- end

... And only (but always) show them if they are present.
