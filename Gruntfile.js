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
      jsClient: {
        files: ['<%= jshint.src %>', '<%= jshint.test %>'],
        tasks: ['jshint:src', 'jshint:test'/*, 'casperjs'*/]
      },
      jsServer: {
        files: '<%= jshint.server %>',
        tasks: ['jshint:server', 'jasmine_node']
      }
    },
    jasmine_node: {
      projectRoot: 'server/test',
      forceExit: true,
      jUnit: {
        report: true,
        savePath : '_junitxml/server/'
      }
    },
    casperjs: {
      src: 'client/test/lib/casperjs-runner.js'
    }
  });

  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jasmine-node');
  
  grunt.registerTask('server', function(){ require('./server/server.js').listen(3000); });
  grunt.registerTask('test-client', ['server', 'casperjs']);
  grunt.registerTask('start', ['server', 'watch']);

};