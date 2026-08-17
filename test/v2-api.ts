import {assert} from 'chai'

import {Types} from '$lib'

suite('v2 API response fields', function () {
    // Shapes taken from a live v2 indexer. All of these fields are absent from
    // a v1 indexer's responses, so every one of them is optional.
    test('template exposes mutable data and deletion markers', function () {
        const template = Types.TemplateObject.from({
            template_id: 1,
            is_transferable: true,
            is_burnable: true,
            issued_supply: 1,
            max_supply: 10,
            immutable_data: {name: 'Test'},
            mutable_data: {level: 3},
            data: {name: 'Test', level: 3},
            deleted_at_block: 100,
            deleted_at_time: '1700000000000',
            created_at_block: 1,
            created_at_time: '1',
        })

        assert.deepEqual(template.mutable_data, {level: 3})
        assert.equal(template.deleted_at_block.toNumber(), 100)
        assert.equal(template.deleted_at_time, '1700000000000')
    })

    test('template decodes a v1 response without the v2 fields', function () {
        const template = Types.TemplateObject.from({
            template_id: 1,
            is_transferable: true,
            is_burnable: true,
            issued_supply: 1,
            max_supply: 10,
            immutable_data: {name: 'Test'},
            created_at_block: 1,
            created_at_time: '1',
        })

        // An absent optional field reads back as null when it is declared with a
        // primitive type and undefined when it is declared with a class type, so
        // consumers need a loose check rather than a strict null comparison.
        assert.isNull(template.mutable_data)
        assert.isNull(template.data)
        assert.isNull(template.deleted_at_time)
        assert.isUndefined(template.deleted_at_block)
    })

    test('collection exposes a pending author succession', function () {
        // new_author_date is a millisecond timestamp reported as a string,
        // matching created_at_time rather than a numeric field.
        const collection = Types.CollectionObject.from({
            collection_name: 'testcollect',
            author: 'alice',
            allow_notify: true,
            authorized_accounts: [],
            notify_accounts: [],
            market_fee: 0.05,
            created_at_block: 1,
            created_at_time: '1',
            new_author_name: 'bob',
            new_author_date: '1785263212000',
        })

        assert.isTrue(collection.new_author_name.equals('bob'))
        assert.equal(collection.new_author_date, '1785263212000')
    })

    // The nested collection carries the fee the listing was created with, and
    // current_collection_fee carries the fee as of the last indexed block.
    const listingCollection = {
        collection_name: 'royaltycol11',
        author: 'alice',
        allow_notify: true,
        authorized_accounts: [],
        notify_accounts: [],
        market_fee: 0.05,
        created_at_block: 1,
        created_at_time: '1',
    }

    const listingPrice = {
        token_contract: 'eosio.token',
        token_symbol: 'WAX',
        token_precision: 8,
        amount: '1250000',
    }

    const listingTemplate = {
        template_id: 662912,
        is_transferable: true,
        is_burnable: true,
        issued_supply: 1,
        max_supply: 10,
        immutable_data: {name: 'Test'},
        created_at_block: 1,
        created_at_time: '1',
    }

    test('auctions, buyoffers, and template buyoffers report the live collection fee', function () {
        const auction = Types.AuctionObject.from({
            market_contract: 'atomicmarket',
            assets_contract: 'atomicassets',
            auction_id: 1,
            seller: 'alice',
            assets: [],
            end_time: '1783387748000',
            price: listingPrice,
            bids: [],
            state: 1,
            claimed_by_seller: false,
            claimed_by_buyer: false,
            collection: listingCollection,
            is_seller_contract: false,
            created_at_block: 1,
            created_at_time: '1',
            updated_at_block: 2,
            updated_at_time: '2',
            current_collection_fee: 0.07,
        })

        const buyoffer = Types.BuyofferObject.from({
            market_contract: 'atomicmarket',
            assets_contract: 'atomicassets',
            buyoffer_id: 2,
            seller: 'alice',
            buyer: 'bob',
            price: listingPrice,
            assets: [],
            collection: listingCollection,
            memo: '',
            created_at_block: 1,
            created_at_time: '1',
            updated_at_block: 2,
            updated_at_time: '2',
            state: 0,
            current_collection_fee: 0.07,
        })

        const templateBuyoffer = Types.TemplateBuyofferObject.from({
            market_contract: 'atomicmarket',
            assets_contract: 'atomicassets',
            buyoffer_id: 3,
            buyer: 'bob',
            price: listingPrice,
            assets: [],
            collection: listingCollection,
            template: listingTemplate,
            created_at_block: 1,
            created_at_time: '1',
            updated_at_block: 2,
            updated_at_time: '2',
            state: 0,
            current_collection_fee: 0.07,
        })

        assert.equal(auction.current_collection_fee.value, 0.07)
        assert.equal(buyoffer.current_collection_fee.value, 0.07)
        assert.equal(templateBuyoffer.current_collection_fee.value, 0.07)

        assert.equal(auction.collection.market_fee.value, 0.05)
        assert.equal(buyoffer.collection.market_fee.value, 0.05)
        assert.equal(templateBuyoffer.collection.market_fee.value, 0.05)
    })

    test('an auction from a v1 indexer decodes without the collection fee', function () {
        const auction = Types.AuctionObject.from({
            market_contract: 'atomicmarket',
            assets_contract: 'atomicassets',
            auction_id: 1,
            seller: 'alice',
            assets: [],
            end_time: '1783387748000',
            price: listingPrice,
            bids: [],
            state: 1,
            claimed_by_seller: false,
            claimed_by_buyer: false,
            collection: listingCollection,
            is_seller_contract: false,
            created_at_block: 1,
            created_at_time: '1',
            updated_at_block: 2,
            updated_at_time: '2',
        })

        assert.isUndefined(auction.current_collection_fee)
        assert.equal(auction.collection.market_fee.value, 0.05)
    })

    test('a schema reports the authored media type descriptors', function () {
        const schema = Types.SchemaObject.from({
            schema_name: 'cmbz.res',
            format: [{name: 'video', type: 'string', mediatype: 'video/mp4', info: 'trailer'}],
            types: [{name: 'video', mediatype: 'video/mp4', info: 'trailer'}],
            created_at_block: 1,
            created_at_time: '1',
        })

        assert.equal(schema.types.length, 1)
        assert.instanceOf(schema.types[0], Types.SchemaFormatType)
        assert.equal(schema.types[0].name, 'video')
        assert.equal(schema.types[0].mediatype, 'video/mp4')
        assert.equal(schema.types[0].info, 'trailer')
    })

    test('a schema without the descriptors decodes and reports none', function () {
        const schema = Types.SchemaObject.from({
            schema_name: 'cmbz.res',
            format: [{name: 'video', type: 'string'}],
            created_at_block: 1,
            created_at_time: '1',
        })

        // An absent types array means the response does not report descriptors,
        // which is a different answer from the empty array a schema endpoint
        // sends for a schema that has none.
        assert.isUndefined(schema.types)
    })

    test('a royalty payout decodes the nullable ids the indexer emits', function () {
        const attributePayout = Types.RoyaltyPayout.from({
            market_contract: 'atomicmarket',
            log_global_sequence: '840330124',
            payout_index: 0,
            listing_type: 'sale',
            listing_id: '46890',
            category: 'attribute',
            collection_name: 'royaltycol11',
            asset_id: '1099603751717',
            template_id: null,
            rule_id: '2',
            recipient: 'jacktestr125',
            amount: '1250000',
            token_symbol: 'WAX',
            token_precision: 8,
            token_contract: 'eosio.token',
            txid: '6df6118add83bab9b0d79b5a7a6cf3877133893daefb96280f6f52943db74f2a',
            created_at_block: '414927681',
            created_at_time: '1783387748000',
        })

        assert.equal(attributePayout.amount.toNumber(), 1250000)
        assert.equal(attributePayout.listing_id.toNumber(), 46890)
        assert.equal(attributePayout.rule_id.toNumber(), 2)
        assert.isUndefined(attributePayout.template_id)

        // listing_type and category are the strings the indexer maps the stored
        // integers to, and it sends null for a value it has no name for.
        const unmappedPayout = Types.RoyaltyPayout.from({
            market_contract: 'atomicmarket',
            log_global_sequence: '840330125',
            payout_index: 1,
            listing_type: null,
            listing_id: null,
            category: null,
            collection_name: 'royaltycol11',
            asset_id: null,
            template_id: null,
            rule_id: null,
            recipient: 'jacktestr125',
            amount: '1250000',
            token_symbol: 'WAX',
            token_precision: 8,
            token_contract: 'eosio.token',
            txid: '6df6118add83bab9b0d79b5a7a6cf3877133893daefb96280f6f52943db74f2a',
            created_at_block: '414927681',
            created_at_time: '1783387748000',
        })

        assert.isNull(unmappedPayout.listing_type)
        assert.isNull(unmappedPayout.category)
        assert.isUndefined(unmappedPayout.listing_id)
        assert.isUndefined(unmappedPayout.asset_id)
    })

    test('a royalty attribute rule keeps the raw variant tuple', function () {
        const rule = Types.RoyaltyAttributeRule.from({
            market_contract: 'atomicmarket',
            collection_name: 'royaltycol11',
            rule_id: '2',
            source: 0,
            field: 'rarity',
            value: ['string', 'legendary'],
            weight: '1',
            recipients: [{recipient: 'jacktestr125', weight: 1}],
            lookup_hash: '68ec3427c453d24cfd9faaa1db9d39533ab06b8127bb09a6f2958e5c26ebce74',
            updated_at_block: '414895354',
            updated_at_time: '1783371584500',
            created_at_block: '414895354',
            created_at_time: '1783371584500',
        })

        assert.deepEqual(rule.value, ['string', 'legendary'])
        assert.equal(rule.weight.toNumber(), 1)
        assert.isTrue(rule.recipients[0].recipient.equals('jacktestr125'))
    })

    test('a marketplace stat decodes an unnamed marketplace and empty volumes', function () {
        const unnamed = Types.Market.MarketplaceStat.from({
            market_contract: 'atomicmarket',
            marketplace_name: null,
            sellers: '4896',
            buyers: '0',
            maker_volume: '1749594747693104',
            taker_volume: null,
        })

        // Null when no marketplace is stored, and the empty string when the
        // stored value is the default marketplace name. Both mean the same
        // thing to a client.
        const blank = Types.Market.MarketplaceStat.from({
            market_contract: 'atomicmarket',
            marketplace_name: '',
            sellers: '0',
            buyers: '2106',
            maker_volume: null,
            taker_volume: '1412670696427700',
        })

        assert.isNull(unnamed.marketplace_name)
        assert.equal(unnamed.sellers.toNumber(), 4896)
        assert.isUndefined(unnamed.taker_volume)

        assert.equal(blank.marketplace_name, '')
        assert.isUndefined(blank.maker_volume)
        assert.equal(blank.taker_volume.toNumber(), 1412670696427700)
    })
})
