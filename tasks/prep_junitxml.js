module.exports = function(grunt){
  grunt.registerTask('prep_junitxmldir', 'Ensures the junitxml dir is ready for the jasmine_node task.', function(){
    
    var conf = grunt.config('jasmine_node'),
      dir = conf.jUnit.savePath;
    
    grunt.file.exists(dir) || grunt.file.mkdir(dir);

  });
};