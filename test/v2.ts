import {assert} from 'chai'
import {Serializer} from '@wharfkit/antelope'

import {AtomicAssetsContract, AtomicMarketContract} from '$lib'

// AtomicAssets v2 and AtomicMarket v2 are additive: every action and table below
// is new, and nothing from the v1 surface changed. These tests pin that surface
// so a future regeneration cannot silently drop it.

const ASSETS_V2_ACTIONS = [
    'createtempl2',
    'settempldata',
    'redtemplmax',
    'deltemplate',
    'setschematyp',
    'createauswap',
    'acceptauswap',
    'rejectauswap',
    'setrampayer',
    'setlastpayer',
    'logsetdatatl',
    'logrampayer',
]

const ASSETS_V2_TABLES = ['templates2', 'schematypes', 'authorswaps']

const MARKET_V2_ACTIONS = [
    'setroyalconf',
    'settemplroy',
    'setattrroy',
    'delroyalconf',
    'deltemplroy',
    'delattrroy',
    'logroyfound',
    'logroytempl',
    'logroyattr',
    'logroydust',
]

const MARKET_V2_TABLES = ['royaltyconf', 'royaltytemp', 'royaltyattr']

// Encodings produced by the deployed ABIs (atomicassets v2.0.0-rc5 on WAX
// Testnet and Jungle4, atomicmarket v2.0.0-rc2). Round-tripping a value through
// the generated type only proves the type agrees with itself; these pin field
// order and integer width against the contract, so a regeneration that reorders
// or widens a field fails here instead of on chain.
const ENCODINGS: [string, Record<string, any>, string][] = [
    [
        'createtempl2',
        {
            authorized_creator: 'alice',
            collection_name: 'testcollect',
            schema_name: 'testschema',
            transferable: true,
            burnable: false,
            max_supply: 100,
            immutable_data: [{key: 'name', value: ['string', 'Test']}],
            mutable_data: [{key: 'level', value: ['uint32', 3]}],
        },
        '0000000000855c34003252315294b1ca008091aa219cb1ca01006400000001046e616d650a04' +
            '5465737401056c6576656c0603000000',
    ],
    [
        'settempldata',
        {
            authorized_editor: 'alice',
            collection_name: 'testcollect',
            template_id: 7,
            new_mutable_data: [],
        },
        '0000000000855c34003252315294b1ca0700000000',
    ],
    [
        'setschematyp',
        {
            authorized_editor: 'alice',
            collection_name: 'testcollect',
            schema_name: 'testschema',
            schema_format_type: [{name: 'video', mediatype: 'video/mp4', info: 'trailer'}],
        },
        '0000000000855c34003252315294b1ca008091aa219cb1ca0105766964656f09766964656f2f' +
            '6d703407747261696c6572',
    ],
]

const MARKET_ENCODINGS: [string, Record<string, any>, string][] = [
    [
        'setroyalconf',
        {
            collection_name: 'testcollect',
            founders: [{recipient: 'alice', weight: 2}],
            attribute_mode: 0,
            split_founders: 2,
            split_templates: 1,
            split_attributes: 1,
        },
        '003252315294b1ca010000000000855c340200000000020000000100000001000000',
    ],
    [
        'setattrroy',
        {
            collection_name: 'testcollect',
            source: 1,
            field: 'rarity',
            value: ['string', 'legendary'],
            rule_weight: 5,
            recipients: [{recipient: 'bob', weight: 1}],
        },
        '003252315294b1ca01067261726974790a096c6567656e6461727905000000010000000000000e3d01000000',
    ],
]

suite('AtomicAssets v2', function () {
    test('abi exposes every v2 action', function () {
        for (const name of ASSETS_V2_ACTIONS) {
            assert.property(AtomicAssetsContract.Types, name, `missing action type: ${name}`)
        }
    })

    test('abi exposes every v2 table', function () {
        for (const name of ASSETS_V2_TABLES) {
            assert.property(AtomicAssetsContract.TableMap, name, `missing table: ${name}`)
        }
    })

    test('v1 tables are unchanged', function () {
        // The v2 ABI is a strict superset: every v1 table keeps its row type.
        for (const name of [
            'assets',
            'balances',
            'collections',
            'config',
            'offers',
            'schemas',
            'templates',
            'tokenconfigs',
        ]) {
            assert.property(AtomicAssetsContract.TableMap, name, `dropped v1 table: ${name}`)
        }
    })

    test('createtempl2 round-trips', function () {
        const object = {
            authorized_creator: 'alice',
            collection_name: 'testcollect',
            schema_name: 'testschema',
            transferable: true,
            burnable: false,
            max_supply: 100,
            immutable_data: [{key: 'name', value: ['string', 'Test']}],
            mutable_data: [{key: 'level', value: ['uint32', 3]}],
        }

        const encoded = Serializer.encode({
            object,
            type: AtomicAssetsContract.Types.createtempl2,
        })
        const decoded = Serializer.decode({
            data: encoded,
            type: AtomicAssetsContract.Types.createtempl2,
        })

        assert.isTrue(decoded.authorized_creator.equals('alice'))
        assert.isTrue(decoded.collection_name.equals('testcollect'))
        assert.equal(decoded.max_supply.toNumber(), 100)
        assert.isTrue(decoded.transferable)
        assert.isFalse(decoded.burnable)
        assert.equal(decoded.mutable_data.length, 1)
        assert.equal(decoded.mutable_data[0].key, 'level')
    })

    test('settempldata round-trips an empty map', function () {
        // settempldata is a whole-map replace: an empty map erases the row.
        const encoded = Serializer.encode({
            object: {
                authorized_editor: 'alice',
                collection_name: 'testcollect',
                template_id: 1,
                new_mutable_data: [],
            },
            type: AtomicAssetsContract.Types.settempldata,
        })
        const decoded = Serializer.decode({
            data: encoded,
            type: AtomicAssetsContract.Types.settempldata,
        })

        assert.equal(decoded.template_id.toNumber(), 1)
        assert.equal(decoded.new_mutable_data.length, 0)
    })

    test('setschematyp carries media types', function () {
        const encoded = Serializer.encode({
            object: {
                authorized_editor: 'alice',
                collection_name: 'testcollect',
                schema_name: 'testschema',
                schema_format_type: [{name: 'video', mediatype: 'video/mp4', info: 'trailer'}],
            },
            type: AtomicAssetsContract.Types.setschematyp,
        })
        const decoded = Serializer.decode({
            data: encoded,
            type: AtomicAssetsContract.Types.setschematyp,
        })

        assert.equal(decoded.schema_format_type.length, 1)
        assert.equal(decoded.schema_format_type[0].name, 'video')
        assert.equal(decoded.schema_format_type[0].mediatype, 'video/mp4')
        assert.equal(decoded.schema_format_type[0].info, 'trailer')
    })

    test('author succession actions round-trip', function () {
        const created = Serializer.decode({
            data: Serializer.encode({
                object: {collection_name: 'testcollect', new_author: 'bob', owner: true},
                type: AtomicAssetsContract.Types.createauswap,
            }),
            type: AtomicAssetsContract.Types.createauswap,
        })
        assert.isTrue(created.new_author.equals('bob'))
        assert.isTrue(created.owner)

        for (const type of [
            AtomicAssetsContract.Types.acceptauswap,
            AtomicAssetsContract.Types.rejectauswap,
        ]) {
            const decoded = Serializer.decode({
                data: Serializer.encode({object: {collection_name: 'testcollect'}, type}),
                type,
            })
            assert.isTrue(decoded.collection_name.equals('testcollect'))
        }
    })

    test('actions encode exactly as the deployed contract expects', function () {
        for (const [name, object, expected] of ENCODINGS) {
            const encoded = Serializer.encode({
                object,
                type: (AtomicAssetsContract.Types as any)[name],
            })
            assert.equal(encoded.hexString, expected, `encoding drifted for ${name}`)
        }
    })

    test('template_mutables_s row decodes', function () {
        const decoded = Serializer.decode({
            data: Serializer.encode({
                object: {
                    template_id: 42,
                    schema_name: 'testschema',
                    mutable_serialized_data: [1, 2, 3],
                },
                type: AtomicAssetsContract.Types.template_mutables_s,
            }),
            type: AtomicAssetsContract.Types.template_mutables_s,
        })

        assert.equal(decoded.template_id.toNumber(), 42)
        assert.isTrue(decoded.schema_name.equals('testschema'))
        assert.equal(decoded.mutable_serialized_data.length, 3)
    })
})

suite('AtomicMarket v2', function () {
    test('abi exposes every v2 royalty action', function () {
        for (const name of MARKET_V2_ACTIONS) {
            assert.property(AtomicMarketContract.Types, name, `missing action type: ${name}`)
        }
    })

    test('abi exposes every v2 royalty table', function () {
        for (const name of MARKET_V2_TABLES) {
            assert.property(AtomicMarketContract.TableMap, name, `missing table: ${name}`)
        }
    })

    test('template buyoffer actions are present', function () {
        // Live on WAX mainnet since AtomicMarket 1.3.
        for (const name of ['createtbuyo', 'canceltbuyo', 'fulfilltbuyo', 'lognewtbuyo']) {
            assert.property(AtomicMarketContract.Types, name, `missing action type: ${name}`)
        }
    })

    test('setroyalconf round-trips', function () {
        const decoded = Serializer.decode({
            data: Serializer.encode({
                object: {
                    collection_name: 'testcollect',
                    founders: [{recipient: 'alice', weight: 2}],
                    attribute_mode: 0,
                    split_founders: 2,
                    split_templates: 1,
                    split_attributes: 1,
                },
                type: AtomicMarketContract.Types.setroyalconf,
            }),
            type: AtomicMarketContract.Types.setroyalconf,
        })

        assert.isTrue(decoded.collection_name.equals('testcollect'))
        assert.equal(decoded.founders.length, 1)
        assert.isTrue(decoded.founders[0].recipient.equals('alice'))
        assert.equal(decoded.founders[0].weight.toNumber(), 2)
        assert.equal(decoded.attribute_mode.toNumber(), 0)
    })

    test('setattrroy round-trips a typed attribute value', function () {
        const decoded = Serializer.decode({
            data: Serializer.encode({
                object: {
                    collection_name: 'testcollect',
                    source: 1,
                    field: 'rarity',
                    value: ['string', 'legendary'],
                    rule_weight: 5,
                    recipients: [{recipient: 'bob', weight: 1}],
                },
                type: AtomicMarketContract.Types.setattrroy,
            }),
            type: AtomicMarketContract.Types.setattrroy,
        })

        assert.equal(decoded.field, 'rarity')
        assert.equal(decoded.source.toNumber(), 1)
        assert.equal(decoded.rule_weight.toNumber(), 5)
        assert.equal(decoded.recipients.length, 1)
    })

    test('actions encode exactly as the deployed contract expects', function () {
        for (const [name, object, expected] of MARKET_ENCODINGS) {
            const encoded = Serializer.encode({
                object,
                type: (AtomicMarketContract.Types as any)[name],
            })
            assert.equal(encoded.hexString, expected, `encoding drifted for ${name}`)
        }
    })

    test('v1 tables are unchanged', function () {
        for (const name of [
            'auctions',
            'balances',
            'config',
            'marketplaces',
            'sales',
            'buyoffers',
        ]) {
            assert.property(AtomicMarketContract.TableMap, name, `dropped v1 table: ${name}`)
        }
    })
})
