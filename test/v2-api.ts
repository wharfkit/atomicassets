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
})
