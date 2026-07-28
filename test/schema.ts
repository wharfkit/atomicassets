import {assert} from 'chai'
import {APIClient, FetchProvider, Serializer} from '@wharfkit/antelope'
import {Chains} from '@wharfkit/common'
import {mockFetch} from '@wharfkit/mock-data'
import {PlaceholderAuth} from '@wharfkit/signing-request'
import {BASE_URL, TIMEOUT, SLOW_THRESHOLD} from './config'

import type {Schema} from '$lib'
import {AtomicAssetsAPIClient, AtomicAssetsContract, AtomicAssetsKit, KitUtility, Types} from '$lib'

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
const collectionName = 'taco'
const schemaName = 'cmbz.res'
const accountName = 'test.gm'

suite('Schema', function () {
    this.slow(SLOW_THRESHOLD)
    this.timeout(TIMEOUT)

    let testSchema: Schema

    setup(async function () {
        testSchema = await kitInst.loadSchema(collectionName, schemaName)
    })

    test('schemaName', function () {
        assert.isTrue(testSchema.schemaName.equals(schemaName))
    })

    test('assets', function () {
        assert.isTrue(testSchema.assets.toNumber() > 0)
    })

    test('collection', function () {
        assert.isTrue(testSchema.collection.collectionName.equals(collectionName))
    })

    test('format', function () {
        assert.instanceOf(testSchema.format[0], Types.SchemaFormatField)
    })

    test('format carries v2 media types', function () {
        const field = Types.SchemaFormatField.from({
            name: 'video',
            type: 'string',
            mediatype: 'video/mp4',
            info: 'trailer',
        })

        assert.equal(field.name, 'video')
        assert.equal(field.type, 'string')
        assert.equal(field.mediatype, 'video/mp4')
        assert.equal(field.info, 'trailer')
    })

    test('format decodes v1 responses without media types', function () {
        const field = Types.SchemaFormatField.from({name: 'video', type: 'string'})

        assert.equal(field.name, 'video')
        assert.equal(field.type, 'string')
        assert.isNull(field.mediatype)
        assert.isNull(field.info)
    })

    test('the API format type stays separate from the contract format type', function () {
        // The contract's FORMAT is what createschema and extendschema serialize,
        // so it must stay at {name, type}. The API reports two further fields.
        // Keeping them on a separate struct is what stops a mediatype from ever
        // reaching action data.
        const contractFields = AtomicAssetsContract.Types.FORMAT.abiFields?.map((f) => f.name)
        const apiFields = Types.SchemaFormatField.abiFields?.map((f) => f.name)

        assert.deepEqual(contractFields, ['name', 'type'])
        assert.deepEqual(apiFields, ['name', 'type', 'mediatype', 'info'])
    })

    test('media types are dropped from createschema action data', function () {
        const action = kitInst.createSchema({
            authorized_creator: accountName,
            collection_name: collectionName,
            schema_name: schemaName,
            schema_format: [{name: 'video', type: 'string', mediatype: 'video/mp4'} as any],
        })

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicAssetsContract.Types.createschema,
        })

        assert.equal(decoded.schema_format.length, 1)
        assert.deepEqual(Object.keys(Serializer.objectify(decoded.schema_format[0])), [
            'name',
            'type',
        ])
    })

    test('extendSchema', function () {
        const action = testSchema.extendSchema(accountName, [{name: 'video', type: 'string'}])

        assert.isTrue(action.account.equals('atomicassets'))
        assert.isTrue(action.name.equals('extendschema'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicAssetsContract.Types.extendschema,
        })
        assert.isTrue(decoded.authorized_editor.equals(accountName))
        assert.isTrue(decoded.collection_name.equals(collectionName))
        assert.isTrue(decoded.schema_name.equals(testSchema.schemaName))
        assert.isTrue(decoded.schema_format_extension[0].name === 'video')
        assert.isTrue(decoded.schema_format_extension[0].type === 'string')
    })

    test('createSchema', function () {
        const action = kitInst.createSchema({
            authorized_creator: accountName,
            collection_name: collectionName,
            schema_name: schemaName,
            schema_format: [{name: 'video', type: 'string'}],
        })

        assert.isTrue(action.account.equals('atomicassets'))
        assert.isTrue(action.name.equals('createschema'))
        assert.isTrue(action.authorization[0].equals(PlaceholderAuth))

        const decoded = Serializer.decode({
            data: action.data,
            type: AtomicAssetsContract.Types.createschema,
        })
        assert.isTrue(decoded.authorized_creator.equals(accountName))
        assert.isTrue(decoded.collection_name.equals(collectionName))
        assert.isTrue(decoded.schema_name.equals(schemaName))
        assert.isTrue(decoded.schema_format[0].name === 'video')
        assert.isTrue(decoded.schema_format[0].type === 'string')
    })
})
