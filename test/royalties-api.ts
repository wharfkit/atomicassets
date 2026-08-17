import {assert} from 'chai'

import {APIClient, APIError, FetchProvider} from '@wharfkit/antelope'
import {mockFetch} from '@wharfkit/mock-data'
import {V2_BASE_URL, TIMEOUT, SLOW_THRESHOLD} from './config'

import {AtomicAssetsAPIClient, Types} from '$lib'

// The royalty routes answer with rows only on an AtomicMarket v2 chain, so this
// client points at the testnet indexer instead of the shared BASE_URL.
const client = new APIClient({
    provider: new FetchProvider(V2_BASE_URL, {fetch: mockFetch}),
})

// Setup the API
const atomicassets = new AtomicAssetsAPIClient(client)

const collectionName = 'royaltycol11'
const unconfiguredCollection = 'alien.worlds'
const recipient = 'jacktestr125'

suite('atomicmarket royalties', function () {
    this.slow(SLOW_THRESHOLD)
    this.timeout(TIMEOUT)

    test('get_royalty_payouts', async function () {
        const res = await atomicassets.atomicmarket.v1.get_royalty_payouts({limit: 2})
        assert.instanceOf(res, Types.Market.GetRoyaltyPayoutsResponse)
        assert.equal(res.success, true)
        assert.isNotEmpty(res.data)
    })

    test('get_royalty_payouts filtered', async function () {
        const res = await atomicassets.atomicmarket.v1.get_royalty_payouts({
            category: ['attribute'],
            listing_type: 'sale',
            sort: 'amount',
            order: 'asc',
            limit: 2,
        })
        assert.instanceOf(res, Types.Market.GetRoyaltyPayoutsResponse)
        assert.equal(res.success, true)
        assert.isNotEmpty(res.data)
    })

    test('get_royalty_payouts_count', async function () {
        const res = await atomicassets.atomicmarket.v1.get_royalty_payouts_count()
        assert.instanceOf(res, Types.CountResponseStruct)
        assert.equal(res.success, true)
        assert.isAbove(res.data.toNumber(), 0)
    })

    test('get_royalty_account', async function () {
        const res = await atomicassets.atomicmarket.v1.get_royalty_account(recipient)
        assert.instanceOf(res, Types.Market.GetRoyaltyAccountResponse)
        assert.equal(res.success, true)
        assert.isNotEmpty(res.data)
        assert.isAbove(res.data[0].payout_count.toNumber(), 0)
    })

    test('get_royalty_config', async function () {
        const res = await atomicassets.atomicmarket.v1.get_royalty_config(collectionName)
        assert.instanceOf(res, Types.Market.GetRoyaltyConfigResponse)
        assert.equal(res.success, true)
        assert.isNotEmpty(res.data)
        assert.isTrue(res.data.collection_name.equals(collectionName))
    })

    test('get_royalty_config answers 416 for an unconfigured collection', async function () {
        // A collection with no royalty configuration is not a failure for the
        // caller, and on an AtomicMarket v1 chain every collection answers so.
        let error: APIError | undefined

        try {
            await atomicassets.atomicmarket.v1.get_royalty_config(unconfiguredCollection)
        } catch (caught) {
            error = caught as APIError
        }

        assert.instanceOf(error, APIError)
        assert.equal(error?.response.status, 416)
    })

    test('get_royalty_template_rules', async function () {
        const res = await atomicassets.atomicmarket.v1.get_royalty_template_rules(collectionName)
        assert.instanceOf(res, Types.Market.GetRoyaltyTemplateRulesResponse)
        assert.equal(res.success, true)
        assert.isNotEmpty(res.data)
    })

    test('get_royalty_attribute_rules', async function () {
        const res = await atomicassets.atomicmarket.v1.get_royalty_attribute_rules(collectionName)
        assert.instanceOf(res, Types.Market.GetRoyaltyAttributeRulesResponse)
        assert.equal(res.success, true)
        assert.isNotEmpty(res.data)
    })
})
