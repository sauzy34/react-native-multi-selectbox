/** @type {import('jest').Config} */
module.exports = {
  preset: '@react-native/jest-preset',
  rootDir: __dirname,
  testMatch: ['<rootDir>/src/**/*.(test|spec).(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup.ts'],
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/test-utils/**',
    '!src/testIDs.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 45,
      branches: 35,
      functions: 40,
      lines: 45,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-svg|lodash)/)',
  ],
}
