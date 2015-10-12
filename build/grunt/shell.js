module.exports = {
  install: {
    command: 'bundle install --frozen --path vendor/bundle'
  },

  'bump-major': {
    command: './node_modules/.bin/bumper major'
  }
};
