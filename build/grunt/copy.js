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
	},
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
		cwd: 'src/',
		src: 'bower_components/dist/xuiIconBlobES5.js',
		dest: 'styleguide'
	}
};
