module.exports = {
  bail: true,
  verbose: true,
  roots: ['<rootDir>/src/react/components'],
  testRegex: '\-test\\.(js|jsx)$',
  testResultsProcessor: 'jest-teamcity-reporter',
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: [
		'<rootDir>/src/react/components/**/*.{js,jsx}',
		'!**/node_modules/**'
	],
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(png)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest.babel.js',
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js'
};
