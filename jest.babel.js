const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['@xero/babel-preset-xero', 'jest'],
});
