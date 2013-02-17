module.exports = function(grunt){

  grunt.initConfig({
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
      }/*,
      js: {
        files: '<%= jshint.files %>',
        tasks: 'jshint'
      }*/
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('server', function(){ require('./server/server.js').listen(3000); });
  grunt.registerTask('start', ['server', 'watch']);

};