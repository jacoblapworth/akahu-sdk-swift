const config = {
	bail: false,
	verbose: true,
	globals: {
		window: true
	},
	roots: ['<rootDir>/src/react/components'],
	testRegex: '-test\\.(js|jsx)$',
	testResultsProcessor: 'jest-teamcity-reporter',
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules'],
	collectCoverageFrom: [
		'**/src/react/components/**/*.{js,jsx}',
		'!**/src/react/components/**/__tests__/*',
		'!**/src/react/components/**/stories/*',
		'!**/node_modules/**',
		'!**/src/react/components/autocompleter/private/people.js'
	],
	moduleNameMapper: {
		'\\.(scss)$': '<rootDir>/src/__mocks__/styleMock.js',
		'\\.(png)$': '<rootDir>/src/__mocks__/fileMock.js'
	},
	transform: {
		'^.+\\.jsx?$': 'babel-jest'
	},
	setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js'
}
module.exports = config;
