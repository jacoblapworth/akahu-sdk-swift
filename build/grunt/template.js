var packageJson = require('../../package.json');

module.exports = {
	styleguide: {
		options: {
			data: function () {
				'use strict';

				return {
					version: packageJson.version
				};
			}
		},
		files: {
			'styleguide/styleguide.md': 'styleguide/styleguide.md.tpl'
		}
	}
};
