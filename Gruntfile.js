module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		connect: {
			all: {
				options: {
					hostname: '*',
					port: '8080',
					base: ['.', './app'],
					livereload: true
				}
			}
		},
		watch: {
			scripts: {
				files: ['**/*.js'],
				tasks: [],
				options: {
					spawn: false,
				},
			},
		}
	});

	grunt.registerTask('default', ['connect', 'watch']);
};