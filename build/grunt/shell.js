module.exports = {
  install: {
    command: 'bundle install --frozen --path vendor/bundle'
  },
  kss: {
    command: 'node node_modules/.bin/kss-node --config kss-config.json'
  }
};
