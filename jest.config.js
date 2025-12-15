module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/tests/**',
    '!jest.config.js',
  ],
  forceExit: true,
  detectOpenHandles: true,
  testTimeout: 30000,
  // Additional configuration for better test reporting
  verbose: true,
  bail: false, // Don't stop on first test failure
};
