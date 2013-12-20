var grunt = require('grunt');

module.exports = function(grunt) {
	
	//Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: ['Gruntfile.js', 'server.js', 'public/js/app.js', 'public/js/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        smarttabs: true,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          it: true
        },
        node: true
      }
    },
    
    browserify: {
			dist: {
				files: {
				  'public/bundle.js': ['public/js/app.js', 'public/js/**/*.js'],
				},
				options: {
				  //transform: ['uglifyjs']
				}
			}
		},
		
		appcache: {
			options: {
			// Task-specific options go here.
			},
			your_target: {
			// Target-specific file lists and/or options go here.
			}
		}
  });
};
	
	
	
  // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', ['jshint', 'browserify']);
  
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

