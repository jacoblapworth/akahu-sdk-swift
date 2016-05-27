/**
 * Copy configuration for Grunt.
 */
module.exports = {
	'files': {
		expand: true,
		src: 'README.md',
		dest: 'styleguide',
		rename: function(dest, src){
			return dest + '/' + src.replace('README.md','styleguide.md')
		}
	}
};
