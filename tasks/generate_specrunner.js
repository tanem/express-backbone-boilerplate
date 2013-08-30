'use strict';

module.exports = function(grunt){
  grunt.registerTask(
    'generate_specrunner',
    'Generates the specrunner (index.html) for client unit testing via Jasmine.',
    function(){

      var conf = grunt.config('generate_specrunner'),
        template = grunt.file.read(conf.template),
        files = grunt.file.expand(conf.src),
        filesLength = files.length,
        str = '';

      files.forEach(function(file, i){
        if (i !== 0) str += '    ';
        str += 'require(\'' + file.split('client')[1] + '\');';
        if (i !== filesLength - 1) str += '\n';
      });

      grunt.file.write(
        conf.dest,
        grunt.template.process(template, {
        data: {
          files: str
        }
      }));

    }
  );
};