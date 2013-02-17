module.exports = function(grunt){

  grunt.initConfig({
    jshint: {
      options: {
        browser: true,
        es5: true
      },
      src: ['client/src/js/**/*.js', '!client/src/js/lib/*.js'],
      test: ['client/test/**/*.js', '!client/test/lib/jasmine-1.2.0/*', '!client/test/lib/jasmine-reporters/*.js'],
      server: ['server/**/*.js', '!server/node_modules/**/*']
    },
    compass: {
      dev: {
        options: {              
          sassDir: 'client/src/sass',
          cssDir: 'client/src/css/dev',
          outputStyle: 'expanded',
          noLineComments: false
        }
      },
      prod: {
        options: {              
          sassDir: 'client/src/sass',
          cssDir: 'client/src/css/prod',
          outputStyle: 'compressed',
          noLineComments: true,
          force: true
        }
      }
    },
    watch: {
      sass: {
        files: 'client/src/sass/**/*.scss',
        tasks: 'compass:dev'
      },
      jsSrc: {
        files: '<%= jshint.src %>',
        tasks: 'jshint:src'
      },
      jsTest: {
        files: '<%= jshint.test %>',
        tasks: 'jshint:test'
      },
      jsServer: {
        files: '<%= jshint.server %>',
        tasks: 'jshint:server'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('server', function(){ require('./server/server.js').listen(3000); });
  grunt.registerTask('start', ['server', 'watch']);

};