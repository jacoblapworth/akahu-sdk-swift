module.exports = {
  bail: false,
  verbose: true,
  roots: ['<rootDir>/src/react/components'],
  testRegex: '-test\\.(js|jsx)$',
  testResultsProcessor: 'jest-teamcity-reporter',
	moduleDirectories: ['node_modules'],
  collectCoverageFrom: [
		'**/src/react/components/**/*.{js,jsx}',
		'!**/src/react/components/**/__tests__/*',
		'!**/src/react/components/**/stories/*',
		'!**/node_modules/**'
	],
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(png)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js'
};
