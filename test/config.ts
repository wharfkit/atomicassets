// Test configuration shared across all test files
export const TEST_CONFIG = {
    // Base URL for the AtomicAssets API
    BASE_URL: 'https://wax-atomic.alcor.exchange/',
    
    // Default test timeout and slow thresholds
    TIMEOUT: 10 * 1000,
    SLOW_THRESHOLD: 300,
} as const

// Export individual values for convenience
export const { BASE_URL, TIMEOUT, SLOW_THRESHOLD } = TEST_CONFIG
