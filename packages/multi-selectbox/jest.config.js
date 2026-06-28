/** @type {import('jest').Config} */
module.exports = {
  preset: '@react-native/jest-preset',
  rootDir: __dirname,
  testMatch: ['<rootDir>/__tests__/**/*.(test|spec).(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/test-utils/setup.ts'],
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
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
