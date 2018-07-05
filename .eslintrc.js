module.exports = {
  root: true,
  env: {
    'jest/globals': true,
    node: true,
  },
  parser: 'babel-eslint',
  plugins: [
    'jest',
    'jsx-a11y'
	],
  extends: [
    '@xero/eslint-config-xero-react-base',
		'plugin:jest/recommended',
		'plugin:jsx-a11y/recommended'
  ],
  rules: {
    'no-console': 'warn',
    'jest/no-disabled-tests': 0,
    'jsx-a11y/label-has-for': [ 2, {
      'allowChildren': true
    }]
  }
};
