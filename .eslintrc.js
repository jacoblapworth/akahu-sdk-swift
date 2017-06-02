module.exports = {
  env: {
    "jest/globals": true,
  },
  extends: [
		"@xero/eslint-config-xero-react-base",
		"plugin:jest/recommended"
	],
  rules: {
    "no-console": "warn",
  }
};
