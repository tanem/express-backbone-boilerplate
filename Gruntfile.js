module.exports = function(grunt){

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      client: {
        src: ['client/src/js/**/*.js', '!client/src/js/lib/**/*.js'],
        test: ['client/test/**/*.js', '!client/test/lib/jasmine-1.2.0/*', '!client/test/lib/jasmine-reporters/*.js']
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
        src: 'client/test/_lib/casperjs-runner.js'
      }
    },

    docco: {
      client_src: {
        options: {
          output: '_docs/client-src'
        },
        src: '<%= jshint.client.src %>'
      },
      client_test: {
        options: {
          output: '_docs/client-test'
        },
        src: '<%= jshint.client.test %>'
      },
      server_src: {
        options: {
          output: '_docs/server-src'
        },
        src: '<%= jshint.server.src %>'
      },
      server_test: {
        options: {
          output: '_docs/server-test'
        },
        src: '<%= jshint.server.test %>'
      }
    },

    docco_index: {
      client_src: {
        serve: '/docs/client-src/',
        src: '<%= docco.client_src.options.output %>',
        title: 'Client Source',
        tmpl: 'tasks/assets/index.tmpl'
      },
      client_test: {
        serve: '/docs/client-test/',
        src: '<%= docco.client_test.options.output %>',
        title: 'Client Test',
        tmpl: 'tasks/assets/index.tmpl'
      },
      server_src: {
        serve: '/docs/server-src/',
        src: '<%= docco.server_src.options.output %>',
        title: 'Server Source',
        tmpl: 'tasks/assets/index.tmpl'
      },
      server_test: {
        serve: '/docs/server-test/',
        src: '<%= docco.server_test.options.output %>',
        title: 'Server Test',
        tmpl: 'tasks/assets/index.tmpl'
      }
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
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-htmlrefs');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('docs', ['clean:docs', 'docco', 'docco_index']);
  grunt.registerTask('test-client', ['clean:junitxml:client', 'server', 'casperjs']);
  grunt.registerTask('test-server', ['clean:junitxml:server', 'prep_junitxmldir', 'jasmine_node']);
  grunt.registerTask('test', ['clean:junitxml', 'test-server', 'test-client']);
  grunt.registerTask('dist', ['jshint', 'test', 'clean:dist', 'requirejs', 'compass:prod', 'copy:dist', 'htmlrefs:dist']);
  grunt.registerTask('start', ['clean:all', 'compass:dev', 'server', 'watch']);

};