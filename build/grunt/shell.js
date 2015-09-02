var slash = require('slash');

module.exports = {
  install: {
    command: 'bundle install --frozen --path vendor/bundle'
  },

  styleguide: {
      command: function () {
        'use strict';

        var cmd = slash('./node_modules/.bin/kss-node');

        return cmd + ' -c kss-config.json';
      }
  }
};
