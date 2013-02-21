module.exports = function(grunt){
  grunt.registerMultiTask('casperjs', 'Runs casperjs.', function(){
    
    var done = this.async();
    
    grunt.util.spawn({
      cmd: 'casperjs',
      args: [this.data.src]
    }, function(error, result, code){
      grunt.log.writeln(result.stdout);
      done();
    });

  });
};