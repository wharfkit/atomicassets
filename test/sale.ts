import {assert} from 'chai'
import {Asset as AntelopeAsset, APIClient, FetchProvider, Serializer} from '@wharfkit/antelope'
import {Chains} from '@wharfkit/common'
import {mockFetch} from '@wharfkit/mock-data'
import {PlaceholderAuth} from '@wharfkit/signing-request'
import {BASE_URL, TIMEOUT, SLOW_THRESHOLD} from './config'

import {
    AtomicAssetsAPIClient,
    AtomicMarketContract,
    AtomicMarketKit,
    Auction,
    Buyoffer,
    KitUtility,
    Sale,
    Types,
} from '$lib'

const client = new APIClient({
    provider: new FetchProvider(Chains.WAX.url, {fetch: mockFetch}),
})

// Setup the API
const atomicassets = new AtomicAssetsAPIClient(
    new APIClient({
        provider: new FetchProvider(BASE_URL, {fetch: mockFetch}),
    })
)

const utility = new KitUtility(BASE_URL, Chains.WAX, {
    client,
    atomicClient: atomicassets,
})

const kitInst = new AtomicMarketKit(BASE_URL, Chains.WAX, utility)
const accountName = 'test.gm'
const saleId = 89024803

suite('Sale', function () {
    this.slow(SLOW_THRESHOLD)
    this.timeout(TIMEOUT)

    let testSale: Sale

    setup(async function () {
        testSale = await kitInst.loadSale(saleId)
    })

    test('saleId', function () {
        assert.isTrue(testSale.saleId.equals(saleId))
    })

    test('seller', function () {
        assert.isTrue(testSale.seller.equals(testSale.data.seller))
    })

    test('buyer', function () {
        if (testSale.buyer) {
            assert.isTrue(testSale.buyer.equals(testSale.data.buyer))
        } else {
            assert.isTrue(testSale.buyer === testSale.data.buyer)
        }
    })

    test('listingPrice', function () {
        assert.isTrue(testSale.data.listing_price.equals(testSale.listingPrice.units))
    })

    test('listingSymbol', function () {
        assert.isTrue(testSale.listingSymbol.equals(testSale.price.quantity.symbol))
    })

    test('makerMarketplace', function () {
        assert.isTrue(testSale.makerMarketplace.equals(testSale.data.maker_marketplace))
    })

    test('takerMarketplace', function () {
        if (testSale.takerMarketplace) {
            assert.isTrue(testSale.takerMarketplace.equals(testSale.data.taker_marketplace))
        } else {
            assert.isTrue(testSale.takerMarketplace === null)
        }
    })

    test('state', function () {
        assert.isTrue(testSale.state === Types.SaleState.SOLD)
    })

    test('isSellerContract', function () {
        assert.isTrue(testSale.isSellerContract === testSale.data.is_seller_contract)
    })

    test('assert', function () {
        const action = testSale.assert()

        assert.isTrue(action.account.equals('atomicmarket'))
        assert.isTrue(action.name.equals('assertsale'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicMarketContract.Types.assertsale,
        })
        assert.isTrue(decoded.sale_id.equals(testSale.saleId))
        assert.isTrue(decoded.asset_ids_to_assert.length === testSale.assets.length)
        assert.isTrue(decoded.listing_price_to_assert.equals(testSale.listingPrice))
        assert.isTrue(decoded.settlement_symbol_to_assert.equals(testSale.listingSymbol))
    })

    test('cancel', function () {
        const action = testSale.cancel()

        assert.isTrue(action.account.equals('atomicmarket'))
        assert.isTrue(action.name.equals('cancelsale'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicMarketContract.Types.cancelsale,
        })
        assert.isTrue(decoded.sale_id.equals(testSale.saleId))
    })

    test('payram', function () {
        const action = testSale.payram(accountName)

        assert.isTrue(action.account.equals('atomicmarket'))
        assert.isTrue(action.name.equals('paysaleram'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicMarketContract.Types.paysaleram,
        })
        assert.isTrue(decoded.sale_id.equals(testSale.saleId))
        assert.isTrue(decoded.payer.equals(accountName))
    })

    test('purchase', function () {
        const takerM = 'x.nft'
        const token = AntelopeAsset.from('0.0001 WAX')
        const action = testSale.purchase(accountName, token.value, takerM)

        assert.isTrue(action.account.equals('atomicmarket'))
        assert.isTrue(action.name.equals('purchasesale'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicMarketContract.Types.purchasesale,
        })
        assert.isTrue(decoded.buyer.equals(accountName))
        assert.isTrue(decoded.sale_id.equals(testSale.saleId))
        assert.isTrue(decoded.intended_delphi_median.equals(token.value))
        assert.isTrue(decoded.taker_marketplace.equals(takerM))
    })

    test('announceSale', function () {
        const token = AntelopeAsset.from('0.0001 WAX')
        const action = kitInst.announceSale({
            seller: testSale.seller,
            asset_ids: testSale.assets.map((x) => x.assetId),
            listing_price: token,
            settlement_symbol: token.symbol,
            maker_marketplace: testSale.makerMarketplace,
        })

        assert.isTrue(action.account.equals('atomicmarket'))
        assert.isTrue(action.name.equals('announcesale'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicMarketContract.Types.announcesale,
        })
        assert.isTrue(decoded.seller.equals(testSale.seller))
        assert.isTrue(decoded.asset_ids.length === testSale.assets.length)
        assert.isTrue(decoded.asset_ids[0].equals(testSale.assets[0].assetId))
        assert.isTrue(decoded.listing_price.equals(token))
        assert.isTrue(decoded.settlement_symbol.equals(token.symbol))
        assert.isTrue(decoded.maker_marketplace.equals(testSale.makerMarketplace))
    })

    test('decodes listings created without a referring marketplace', function () {
        // maker_marketplace is null for any listing created without a referrer,
        // which is a large share of live sales, auctions and buyoffers.
        const base = {
            market_contract: 'atomicmarket',
            assets_contract: 'atomicassets',
            seller: 'test.gm',
            offer_id: 1,
            price: {
                token_contract: 'eosio.token',
                token_symbol: 'WAX',
                token_precision: 8,
                amount: '100000000',
            },
            listing_price: 1,
            listing_symbol: '8,WAX',
            assets: [],
            maker_marketplace: null,
            taker_marketplace: null,
            state: 1,
            is_seller_contract: false,
            collection_name: 'taco',
            collection: {
                collection_name: 'taco',
                author: 'test.gm',
                allow_notify: true,
                authorized_accounts: [],
                notify_accounts: [],
                market_fee: 0.05,
                created_at_block: 1,
                created_at_time: '1',
            },
            updated_at_block: 1,
            updated_at_time: '1',
            created_at_block: 1,
            created_at_time: '1',
        }

        const sale = Types.SaleObject.from({...base, sale_id: 1})
        assert.isNull(sale.maker_marketplace)

        const auction = Types.AuctionObject.from({
            ...base,
            auction_id: 1,
            end_time: '1',
            bids: [],
            claimed_by_buyer: false,
            claimed_by_seller: false,
        })
        assert.isNull(auction.maker_marketplace)

        const buyoffer = Types.BuyofferObject.from({
            ...base,
            buyoffer_id: 1,
            buyer: 'test.gm',
            memo: '',
        })
        assert.isNull(buyoffer.maker_marketplace)

        // The accessors still return a Name: a null in the API is the default
        // marketplace, which is the empty name on chain. All three carry the
        // same logic, so all three are asserted.
        assert.isTrue(Sale.from(sale, utility).makerMarketplace.equals(''))
        assert.isTrue(Auction.from(auction, utility).makerMarketplace.equals(''))
        assert.isTrue(Buyoffer.from(buyoffer, utility).makerMarketplace.equals(''))
    })
})
