# @wharfkit/atomicassets

AtomicAssets library for Wharf

## Installing

```
yarn add @wharfkit/atomicassets
```

## AtomicAssets v2 and AtomicMarket v2

The v2 contracts add fields that the API returns only from a v2 indexer. Every one of them is
declared optional, so a response from a v1 indexer decodes unchanged and the field reads back
empty.

| Field | Returned on | Meaning |
| --- | --- | --- |
| `current_collection_fee` | sales, auctions, buyoffers, template buyoffers | The collection's `market_fee` as of the last indexed block. The nested `collection.market_fee` is the listing-time snapshot, and the two differ while the listing is open. |
| `types` | schemas | The media type descriptors authored through `setschematyp`, exactly as stored. |
| `mutable_data`, `data` | templates | The data written by `settempldata`, and the immutable and mutable data merged. |
| `deleted_at_block`, `deleted_at_time` | templates | Set once `deltemplate` removes the template. |
| `new_author_name`, `new_author_date` | collections | The pending author succession written by `createauswap`, and the date it may be accepted. |

A schema also reports `mediatype` and `info` inside `format[]`, but the API merges the authored
descriptors with a name and type heuristic there, so a reader cannot tell a stored value from a
derived one. `types` reports the authored ones alone. This matters to a client that calls
`setschematyp`, which replaces the whole array: resubmitting a `format[]` value writes the
heuristic's guess to chain. An empty `types` array means the schema has no descriptors, and an
absent one means the response does not report them, which is what a schema nested inside an asset
or template answers.

### Royalties

The AtomicMarket v2 royalty tables and the settled payout ledger are read through the v1 market
client. The example needs an indexer of an AtomicMarket v2 chain, such as the WAX testnet one
shown below:

```ts
import {APIClient, FetchProvider} from '@wharfkit/antelope'
import {AtomicAssetsAPIClient} from '@wharfkit/atomicassets'

const api = new AtomicAssetsAPIClient(
    new APIClient({provider: new FetchProvider('https://test.wax.api.atomicassets.io')})
)
const market = api.atomicmarket.v1

// The royaltyconf, royaltytemp, and royaltyattr rows of one collection.
const config = await market.get_royalty_config('mycollection')
const templateRules = await market.get_royalty_template_rules('mycollection')
const attributeRules = await market.get_royalty_attribute_rules('mycollection')

// The payouts an account has been paid, the total number of them, and the
// per-token totals.
const payouts = await market.get_royalty_payouts({recipient: ['myaccount'], limit: 100})
const payoutCount = await market.get_royalty_payouts_count({recipient: ['myaccount']})
const totals = await market.get_royalty_account('myaccount')
```

A payout carries `amount` in the token's smallest unit, `category` naming which rule paid
(`founders`, `template`, `attribute`, or `dust`), and a nullable `listing_id`, `asset_id`,
`template_id`, and `rule_id`. `get_royalty_account` answers one row per token symbol.

A collection with no royalty configuration answers HTTP 416, which reaches the caller as an
`APIError` with `error.response.status === 416`. On an AtomicMarket v1 chain every collection
answers that way, and the payout routes answer an empty array. An indexer without the royalty
routes answers 404 on all six methods.

## Running Tests

```
make test
```

The suite never contacts the network. `@wharfkit/mock-data` replays recorded responses from
`test/data`, where each filename is a hash of the full request URL and its parameters, so
responses from two hosts never collide. To re-record one fixture, name its test:

```
MOCK=overwrite make test grep='get_royalty_payouts'
```

`MOCK=overwrite make test` without a `grep=` re-records every fixture in `test/data` against the
live hosts. The royalty fixtures come from `V2_BASE_URL` in `test/config.ts`, an AtomicMarket v2
indexer, because the default host indexes an AtomicMarket v1 chain where those routes answer 416
or an empty array.
