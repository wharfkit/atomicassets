// Test configuration shared across all test files
export const TEST_CONFIG = {
    // Base URL for the AtomicAssets API
    BASE_URL: 'https://wax-atomic.alcor.exchange/',

    // Base URL for an AtomicMarket v2 indexer. The host above indexes WAX
    // mainnet, an AtomicMarket v1 chain, where every royalty route answers 416
    // or an empty array, so the royalty fixtures are recorded here instead.
    V2_BASE_URL: 'https://test.wax.api.atomicassets.io',

    // Default test timeout and slow thresholds
    TIMEOUT: 10 * 1000,
    SLOW_THRESHOLD: 300,
} as const

// Export individual values for convenience
export const { BASE_URL, V2_BASE_URL, TIMEOUT, SLOW_THRESHOLD } = TEST_CONFIG
