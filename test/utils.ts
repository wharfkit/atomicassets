import {assert} from 'chai'
import {APIClient, FetchProvider, Name, UInt64} from '@wharfkit/antelope'
import {mockFetch} from '@wharfkit/mock-data'
import {BASE_URL, TIMEOUT, SLOW_THRESHOLD} from './config'

import {AtomicAssetsAPIClient} from '$lib'
import {pathSegment} from '../src/endpoints/utils'

// Setup the API
const atomicassets = new AtomicAssetsAPIClient(
    new APIClient({
        provider: new FetchProvider(BASE_URL, {fetch: mockFetch}),
    })
)

suite('utils', function () {
    this.slow(SLOW_THRESHOLD)
    this.timeout(TIMEOUT)

    test('pathSegment encodes characters that rewrite the path', function () {
        assert.equal(pathSegment('alien/worlds'), 'alien%2Fworlds')
        assert.equal(pathSegment('alien?worlds'), 'alien%3Fworlds')
        assert.equal(pathSegment('alien#worlds'), 'alien%23worlds')
        assert.equal(pathSegment('alien worlds'), 'alien%20worlds')
        assert.equal(pathSegment('alien&worlds'), 'alien%26worlds')
    })

    test('pathSegment returns the text of a Name and a UInt64', function () {
        assert.equal(pathSegment(Name.from('alice')), 'alice')
        assert.equal(pathSegment(UInt64.from(5)), '5')
    })

    test('pathSegment rejects an empty value and the dot segments', function () {
        assert.throws(() => pathSegment(''), /Invalid path segment/)
        assert.throws(() => pathSegment('.'), /Invalid path segment/)
        assert.throws(() => pathSegment('..'), /Invalid path segment/)
        assert.throws(() => pathSegment(null), /a value is required/)
        assert.throws(() => pathSegment(undefined), /a value is required/)
    })

    test('get_asset rejects a dot segment before it requests anything', async function () {
        let error: unknown

        try {
            await atomicassets.atomicassets.v1.get_asset('..')
        } catch (caught) {
            error = caught
        }

        assert.instanceOf(error, Error)
        assert.match((error as Error).message, /^Invalid path segment '\.\.'/)
    })
})
