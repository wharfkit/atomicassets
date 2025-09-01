import {assert} from 'chai'
import {
    Asset as AntelopeAsset,
    APIClient,
    FetchProvider,
    Int64,
    Serializer,
} from '@wharfkit/antelope'
import {Chains} from '@wharfkit/common'
import {mockFetch} from '@wharfkit/mock-data'
import {PlaceholderAuth} from '@wharfkit/signing-request'
import {BASE_URL, TIMEOUT, SLOW_THRESHOLD} from './config'

import type {Asset} from '$lib'
import {AtomicAssetsAPIClient, AtomicAssetsContract, AtomicAssetsKit, KitUtility} from '$lib'

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

const kitInst = new AtomicAssetsKit(BASE_URL, Chains.WAX, utility)
const accountName = 'test.gm'
const assetId = 1099851897196
const assetIdBurned = 1099959414679

suite('Asset', function () {
    this.slow(SLOW_THRESHOLD)
    this.timeout(TIMEOUT)

    let testAsset: Asset

    setup(async function () {
        testAsset = await kitInst.loadAsset(assetId)
    })

    test('assetId', function () {
        assert.isTrue(testAsset.assetId.equals(assetId))
    })

    test('collection', function () {
        assert.isTrue(
            testAsset.collection.collectionName.equals(testAsset.data.collection.collection_name)
        )
    })

    test('schema', function () {
        assert.isTrue(testAsset.schema.schemaName.equals(testAsset.data.schema.schema_name))
    })

    test('template', function () {
        assert.isTrue(testAsset.template.templateId.equals(testAsset.data.template.template_id))
    })

    test('schema', function () {
        assert.isTrue(testAsset.schema.schemaName.equals(testAsset.data.schema.schema_name))
    })

    test('owner', function () {
        if (testAsset.owner) {
            assert.isTrue(testAsset.owner.equals(testAsset.data.owner))
        } else {
            assert.isTrue(testAsset.owner === null)
        }
    })

    test('transferable', function () {
        assert.isTrue(testAsset.transferable === testAsset.data.is_transferable)
    })

    test('burnable', function () {
        assert.isTrue(testAsset.burnable === testAsset.data.is_burnable)
    })

    test('name', function () {
        assert.isTrue(testAsset.name === testAsset.data.name)
    })

    test('burnedByAccount', function () {
        if (testAsset.burnedByAccount) {
            assert.isTrue(testAsset.burnedByAccount.equals(testAsset.data.burned_by_account))
        } else {
            assert.isTrue(testAsset.burnedByAccount === null)
        }
    })

    test('burn', function () {
        const action = testAsset.burn()

        assert.isTrue(action.account.equals('atomicassets'))
        assert.isTrue(action.name.equals('burnasset'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicAssetsContract.Types.burnasset,
        })
        if (testAsset.owner) {
            assert.isTrue(decoded.asset_owner.equals(testAsset.owner))
        } else {
            assert.isTrue(decoded.asset_owner === null)
        }
        assert.isTrue(decoded.asset_id.equals(testAsset.assetId))
    })

    test('back', function () {
        const token = AntelopeAsset.from('0.0001 WAX')
        const action = testAsset.back(accountName, token)

        assert.isTrue(action.account.equals('atomicassets'))
        assert.isTrue(action.name.equals('backasset'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicAssetsContract.Types.backasset,
        })
        assert.isTrue(decoded.payer.equals(accountName))
        if (testAsset.owner) {
            assert.isTrue(decoded.asset_owner.equals(testAsset.owner))
        } else {
            assert.isTrue(decoded.asset_owner === null)
        }
        assert.isTrue(decoded.token_to_back.equals(token))
    })

    test('setData', function () {
        const data: AtomicAssetsContract.ActionParams.Type.pair_string_ATOMIC_ATTRIBUTE[] = [
            {
                key: 'hello',
                value: 'world',
            },
            {
                key: 'description',
                value: Int64.from(0),
            },
        ]

        const action = testAsset.setData(accountName, data)

        assert.isTrue(action.account.equals('atomicassets'))
        assert.isTrue(action.name.equals('setassetdata'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicAssetsContract.Types.setassetdata,
        })
        if (testAsset.owner) {
            assert.isTrue(decoded.asset_owner.equals(testAsset.owner))
        } else {
            assert.isTrue(decoded.asset_owner === null)
        }
        assert.isTrue(decoded.asset_id.equals(testAsset.assetId))
        assert.isTrue(decoded.authorized_editor.equals(accountName))
        assert.isTrue(decoded.new_mutable_data[0].key === 'hello')
        assert.isTrue(decoded.new_mutable_data[0].value.equals('world'))
        assert.isTrue(decoded.new_mutable_data[1].key === 'description')
        assert.isTrue(decoded.new_mutable_data[1].value.equals(['int64', 0]))
        assert.isTrue(decoded.new_mutable_data[1].value.equals(Int64.from(0)))
    })

    test('mintAsset', function () {
        const token = AntelopeAsset.from('0.0001 WAX')
        const action = kitInst.mintAsset({
            authorized_minter: accountName,
            collection_name: testAsset.collection.collectionName,
            schema_name: testAsset.schema.schemaName,
            template_id: testAsset.template.templateId,
            new_asset_owner: testAsset.owner ?? accountName,
            immutable_data: [
                {
                    key: 'name',
                    value: 'hello world',
                },
            ],
            mutable_data: [],
            tokens_to_back: [token],
        })

        assert.isTrue(action.account.equals('atomicassets'))
        assert.isTrue(action.name.equals('mintasset'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicAssetsContract.Types.mintasset,
        })
        assert.isTrue(decoded.authorized_minter.equals(accountName))
        assert.isTrue(decoded.collection_name.equals(testAsset.collection.collectionName))
        assert.isTrue(decoded.schema_name.equals(testAsset.schema.schemaName))
        assert.isTrue(decoded.template_id.equals(testAsset.template.templateId))
        if (testAsset.owner) {
            assert.isTrue(decoded.new_asset_owner.equals(testAsset.owner))
        } else {
            assert.isTrue(decoded.new_asset_owner === null)
        }
        assert.isTrue(decoded.immutable_data[0].key === 'name')
        assert.isTrue(decoded.immutable_data[0].value.equals(['string', 'hello world']))
        assert.isTrue(decoded.mutable_data.length === 0)
        assert.isTrue(decoded.tokens_to_back[0].equals(token))
    })
})

suite('Asset (Burned)', function () {
    this.slow(SLOW_THRESHOLD)
    this.timeout(TIMEOUT)

    let testAsset: Asset

    setup(async function () {
        testAsset = await kitInst.loadAsset(assetIdBurned)
    })

    test('assetId', function () {
        assert.isTrue(testAsset.assetId.equals(assetIdBurned))
    })

    test('collection', function () {
        assert.isTrue(
            testAsset.collection.collectionName.equals(testAsset.data.collection.collection_name)
        )
    })

    test('schema', function () {
        assert.isTrue(testAsset.schema.schemaName.equals(testAsset.data.schema.schema_name))
    })

    test('template', function () {
        assert.isTrue(testAsset.template.templateId.equals(testAsset.data.template.template_id))
    })

    test('schema', function () {
        assert.isTrue(testAsset.schema.schemaName.equals(testAsset.data.schema.schema_name))
    })

    test('owner', function () {
        if (testAsset.owner) {
            assert.isTrue(testAsset.owner.equals(testAsset.data.owner))
        } else {
            assert.isTrue(testAsset.owner === null)
        }
    })

    test('transferable', function () {
        assert.isTrue(testAsset.transferable === testAsset.data.is_transferable)
    })

    test('burnable', function () {
        assert.isTrue(testAsset.burnable === testAsset.data.is_burnable)
    })

    test('name', function () {
        assert.isTrue(testAsset.name === testAsset.data.name)
    })

    test('burnedByAccount', function () {
        if (testAsset.burnedByAccount) {
            assert.isTrue(testAsset.burnedByAccount.equals(testAsset.data.burned_by_account))
        } else {
            assert.isTrue(testAsset.burnedByAccount === null)
        }
    })
})
