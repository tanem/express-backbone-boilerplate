module.exports = function(grunt){
  grunt.registerTask('casperjs', 'Runs casperjs.', function(){
    
    var done = this.async(),
      options = this.options();
    
    grunt.util.spawn({
      cmd: 'casperjs',
      args: [options.src, options.junitxmlDest]
    }, function(error, result, code){
      if (code !== 0) grunt.warn(result.stdout, code);
      grunt.log.ok(result);
      done();
    });

  });
};