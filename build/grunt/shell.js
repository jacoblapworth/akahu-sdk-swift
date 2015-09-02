module.exports = {
  install: {
    command: 'bundle install --frozen --path vendor/bundle'
  },

  styleguide: {
      command: './node_modules/.bin/kss-node -c kss-config.json'
  }
};
