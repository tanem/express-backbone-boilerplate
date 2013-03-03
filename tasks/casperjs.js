module.exports = function(grunt){
  grunt.registerTask('casperjs', 'Runs casperjs.', function(){
    
    var done = this.async();
    
    grunt.util.spawn({
      cmd: 'casperjs',
      args: [this.options().src]
    }, function(error, result, code){
      grunt.log.writeln(error, result, code);
      grunt.log.writeln(result.stdout);
      done();
    });

  });
};