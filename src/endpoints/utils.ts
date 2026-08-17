export function buildQueryParams(
    params?: {[key: string]: any},
    extra?: {[key: string]: string}
): string {
    const queryParts = buildBodyParams(params, extra)
    const queryParams = Object.keys(queryParts).length
        ? '?' + new URLSearchParams(queryParts).toString()
        : ''

    return queryParams
}

export function buildBodyParams(
    params?: {[key: string]: any},
    extra?: {[key: string]: string}
): {[key: string]: any} {
    let options = serializeQueryParams(params)
    options = fixPostArguments(options)
    return Object.assign(extra ? extra : {}, options)
}

export function fixPostArguments(params) {
    // https://github.com/pinknetworkx/eosio-contract-api/issues/131
    const options = {...params}
    for (const key of ['page', 'limit', 'before', 'after', 'burned'])
        if (key in options) {
            options[key] = String(options[key])
        }
    return options
}

export function serializeQueryParams(params?: {[key: string]: any}): {[key: string]: any} {
    const result = {}
    for (const [key, value] of Object.entries(params || {})) {
        if (['boolean', 'number'].includes(typeof value)) {
            result[key] = value
        } else {
            result[key] = String(value)
        }
    }

    return result
}

/**
 * Encode a value for use as one path segment.
 *
 * An empty value or a dot segment would rewrite the request path, so both are rejected, as is a
 * missing value, which would otherwise travel as the literal segment 'undefined'. A value that
 * equals a sibling route literal such as '_count' is a valid segment and is not rejected here.
 */
export function pathSegment(value: unknown): string {
    if (value === null || value === undefined) {
        throw new Error('Invalid path segment: a value is required')
    }
    const segment = String(value)
    if (segment === '' || segment === '.' || segment === '..') {
        throw new Error(
            `Invalid path segment '${segment}': an empty or dot segment rewrites the request path`
        )
    }

    return encodeURIComponent(segment)
}
