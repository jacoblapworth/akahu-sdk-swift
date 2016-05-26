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
	},
	icons: {
		expand: true,
		cwd: 'bower_components/xui-icon/dist',
		src: 'xuiIconBlobES5.js',
		dest: 'styleguide'
	}
};
