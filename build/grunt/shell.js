module.exports = {
  install: {
    command: 'bundle install --frozen --path vendor/bundle'
  },
  kss: {
    options: {
      execOptions: {
        cwd: './node_modules/.bin'
      }
    },
    command: 'kss-node --config ../../kss-config.json'
  }
};
