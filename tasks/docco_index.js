module.exports = function(grunt){

  grunt.registerMultiTask('docco_index', 'Generates index.html files for Docco documentation.', function(){

    var data = this.data,
      template = grunt.file.read(data.tmpl),
      displayname,
      href,
      filelist = '';

    grunt.file.recurse(data.src, function(abspath, rootdir, subdir, filename){
      if (/\.css$/.test(filename)) return;
      displayname = filename.replace(/\.html$/, '');
      href = data.serve + filename;
      filelist += '<li><a href="' + href + '">' + displayname + '</a></li>';
    });

    grunt.file.write(
      data.src + '/index.html',
      grunt.template.process(template, {
        data: {
          title: data.title,
          filelist: filelist
        }
      })
    );

    grunt.log.writeln('Generated index.html');

  });

};