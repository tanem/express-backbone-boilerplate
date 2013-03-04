module.exports = function(grunt){
  grunt.registerTask('casperjs', 'Runs casperjs.', function(){
    
    var done = this.async(),
      options = this.options();
    
    grunt.util.spawn({
      cmd: 'casperjs',
      args: [options.src, options.junitxmlDest]
    }, function(error, result, code){
      // if (error) grunt.fail.warn(error, code);
      grunt.log.writeln(result);
      done();
    });

  });
};