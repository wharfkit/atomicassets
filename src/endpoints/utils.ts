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
    options = fixPageLimit(options)
    return Object.assign(extra ? extra : {}, options)
}

export function fixPageLimit(params) {
    // https://github.com/pinknetworkx/eosio-contract-api/issues/131
    const options = {...params}
    for (const key of ['page', 'limit'])
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
