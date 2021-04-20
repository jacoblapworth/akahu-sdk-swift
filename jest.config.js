const config = {
  bail: false,
  verbose: true,
  globals: {
    window: true,
  },
  roots: ['<rootDir>/src/react/components'],
  testRegex: '-test\\.((j|t)sx?)$',
  testResultsProcessor: 'jest-teamcity-reporter',
  testEnvironment: 'jest-environment-jsdom-fifteen',
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: [
    '**/src/react/components/**/*.{js,jsx,ts,tsx}',
    '!**/src/react/components/**/__tests__/*',
    '!**/src/react/components/**/stories/*',
    '!**/node_modules/**',
    '!**/src/react/components/autocompleter/private/people.js',
  ],
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(png)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@xero))'],
  setupFiles: ['<rootDir>/src/react/helpers/axeHelper.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
module.exports = config;
