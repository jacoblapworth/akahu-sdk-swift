/**
 * Copy configuration for Grunt.
 */
module.exports = {
	'files': {
		expand: true,
		src: 'README.md',
		dest: 'kss/styleguide',
		rename: function(dest, src){
			return dest + '/' + src.replace('README.md','styleguide.md')
		}
	},
	'xui': {
		expand: true,
		src: 'xui.css',
		cwd: 'dist',
		dest: 'docs/kss-assets'
	}
};
