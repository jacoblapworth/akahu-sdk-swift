/**
 * Copy configuration for Grunt.
 */
module.exports = {
	images: {
		expand: true,
		cwd: 'src/',
		src: 'images/**',
		dest: 'dist'
	},
	'images-docs': {
		expand: true,
		cwd: 'src/',
		src: 'images/**',
		dest: 'styleguide'
	}
};
