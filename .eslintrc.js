module.exports = {
	root: true,
  env: {
    'jest/globals': true,
		node: true,
  },
	plugins: ['jest'],
  extends: [
		"@xero/eslint-config-xero-react-base",
		"plugin:jest/recommended"
	],
  rules: {
    "no-console": "warn",
  }
};
