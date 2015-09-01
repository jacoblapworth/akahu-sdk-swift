module.exports = {
  install: {
    command: 'bundle install --frozen --path vendor/bundle'
  },

  styleguide: {
      command: 'kss-node -c kss-config.json'
  }
};
