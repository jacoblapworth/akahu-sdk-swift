const config = {
  bail: false,
  verbose: true,
  globals: {
    window: true,
  },
  roots: ['<rootDir>/.plop/', '<rootDir>/src/react/components'],
  testRegex: '-test\\.((j|t)sx?)$',
  testResultsProcessor: 'jest-teamcity-reporter',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: [
    '**/.plop/**/*.{js,jsx,ts,tsx}',
    '**/src/react/components/**/*.{js,jsx,ts,tsx}',
    '!**/.plop/**/__tests__/*',
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
  transformIgnorePatterns: ['/node_modules/(?!(@xero|d3))'],
  setupFiles: ['<rootDir>/src/react/helpers/axeHelper.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
module.exports = config;
