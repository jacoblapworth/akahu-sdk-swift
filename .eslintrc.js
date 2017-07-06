module.exports = {
  root: true,
  env: {
    'jest/globals': true,
    node: true,
  },
  parser: 'babel-eslint',
  plugins: ['jest'],
  extends: [
    '@xero/eslint-config-xero-react-base',
    'plugin:jest/recommended'
  ],
  rules: {
    'no-console': 'warn',
    'jest/no-disabled-tests': 0
  }
};
