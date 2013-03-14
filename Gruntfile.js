module.exports = function(grunt){

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      client: {
        src: ['client/src/js/**/*.js', '!client/src/js/lib/**/*.js'],
        test: ['client/test/spec/**/*_spec.js', '!client/test/lib']
      },
      server: {
        src: ['server/**/*.js', '!server/node_modules/**/*'],
        test: 'server/test/**/*_spec.js'
      }
    },

    clean: {
      all: ['_docs', '_dist', '_junitxml'],
      docs: '_docs',
      dist: '_dist',
      junitxml: {
        client: '_junitxml/cient',
        server: '_junitxml/server'
      }
    },

    compass: {
      dev: {
        options: {              
          sassDir: 'client/src/sass',
          cssDir: 'client/src/css',
          outputStyle: 'expanded',
          noLineComments: false
        }
      },
      prod: {
        options: {              
          sassDir: 'client/src/sass',
          cssDir: '_dist/client/src/css',
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
        files: ['<%= jshint.client.src %>', '<%= jshint.client.test %>'],
        tasks: ['jshint:client', 'test-client']
      },
      jsServer: {
        files: ['<%= jshint.server.src %>', '<%= jshint.server.test %>'],
        tasks: ['jshint:server', 'test-server']
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
      options: {
        src: 'client/test/_lib/casperjs-runner.js',
        junitxmlDest: '_junitxml/client'
      }
    },

    generate_testsmodule: {
      src: '<%= jshint.client.test %>',
      dest: 'client/test/lib/tests.js',
      template: 'tasks/assets/testsmodule.tmpl'
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'client/src/js',
          include: 'requireLib',
          mainConfigFile: 'client/src/js/config.js',
          name: 'main',
          out: '_dist/client/src/js/main.js',
          paths: {
            requireLib: 'lib/require'
          }
        }
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, flatten: true, src: 'client/src/font/*', dest: '_dist/client/src/font/' },
          { src: ['server/**/*.js', '!server/test/**/*.js'], dest: '_dist/' }
        ]
      }
    },

    htmlrefs: {
      dist: {
        src: 'client/src/index.html',
        dest: '_dist/client/src/'
      }
    },

    docker: {
      app: {
        expand: true,
        src: [
          '<%= jshint.client.src %>', 
          '<%= jshint.client.test %>',
          '<%= jshint.server.src %>',
          '<%= jshint.server.test %>',
          'README.md'
        ],
        dest: '_docs',
        options: {
          onlyUpdated: true,
          colourScheme: 'default'
        }
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-docker');
  grunt.loadNpmTasks('grunt-htmlrefs');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('dist', ['jshint', 'test', 'clean:dist', 'requirejs', 'compass:prod', 'copy:dist', 'htmlrefs:dist']);
  grunt.registerTask('docs', ['clean:docs', 'docker']);
  grunt.registerTask('test-client', ['clean:junitxml:client', 'generate_testsmodule', 'server', 'casperjs']);
  grunt.registerTask('test-server', ['clean:junitxml:server', 'prep_junitxmldir', 'jasmine_node']);
  grunt.registerTask('test', ['clean:junitxml', 'test-server', 'test-client']);
  grunt.registerTask('start', ['clean:all', 'compass:dev', 'docker', 'generate_testsmodule', 'server', 'watch']);

};