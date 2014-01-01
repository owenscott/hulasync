var grunt = require('grunt');

module.exports = function(grunt) {

  //Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: ['Gruntfile.js', 'server.js', 'app/app.js', 'app/**/*.js', '!public/js/*.js'],
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
    watchify: {
      options: {
        debug: true,
        keepalive: false
      },
      example: {
        src: ['./app/app.js'],
        dest: 'public/bundle.js'
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'public/bundle.min.js': ['public/bundle.js']
        }
      }
    },
    appcache: {
      options: {
        // Task-specific options go here.
      },
      all: {
        dest: 'public/manifest.appcache',
        cache: ['index.html'] //'bundle.js']//['bundle.js', 'index.html']
      }
    }

  });
};

//Grunt tasks
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-appcache');
grunt.loadNpmTasks('grunt-watchify');

// Default task.
grunt.registerTask('default', ['watchify', 'jshint', 'uglify']); //, 'appcache'
