module.exports = function(grunt) {

	grunt.initConfig({
		connect: {
			all: {
				options: {
					hostname: '*',
					port: '8080',
					base: ['.', 'bower_components', './app'],
					livereload: true
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			files: ['app/**']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect', 'watch']);
};