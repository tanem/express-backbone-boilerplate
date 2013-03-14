module.exports = function(grunt){
  grunt.registerTask(
    'generate_testsmodule',
    'Generates a module that references the required test files for client testing.',
    function(){

      var conf = grunt.config('generate_testsmodule'),
        template = grunt.file.read(conf.template),
        files = grunt.file.expand(conf.src),
        filesLength = files.length,
        str = '';

      files.forEach(function(file, i){
        str += '  "/' + file + '"';
        if (i !== filesLength - 1) str += ',\n';
      });

      grunt.file.write(
        conf.dest,
        grunt.template.process(template, {
        data: {
          files: str
        }
      }));

      grunt.log.writeln('Finished generating tests module.');

    }
  );
};