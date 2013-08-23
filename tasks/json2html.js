/*
 * grunt-json2html
 * https://github.com/alercrepaldi/grunt-json2html
 *
 * Copyright (c) 2013 alercrepaldi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');

  var // Tags Regular Expressions
      regexTagStart = "<!--\\s*fillAndPaste\\s(\\w+)\\s*-->", // <!-- fillAndPaste template -->
      regexTagEnd = "<!--\\s*/fillAndPaste\\s*-->"; // <!-- /build -->
     

  grunt.registerMultiTask('json2html', 'Compile inline json file into static html from template', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    var templatesBaseDir = this.options().templatesBaseDir + '/';

    // Iterate over all specified file groups.
    this.files.forEach(function(f, index) {

      var destPath = f.dest;
      
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.

        grunt.log.write('\nparsing ' + filepath);

        

        var content = grunt.file.read(filepath);

        var lines = content.replace(/\r\n/g, '\n').split(/\n/),
            paresedLines = [];

        var inBlock = false; // true when the line is between two tags
        var jsonLine = []; // here the data will be momorized
        var template = '';
        var data = {};
        var initialChar;

        lines.forEach(function(line, index){

            var tagStart = line.match(new RegExp(regexTagStart)),
                tagEnd = line.match(new RegExp(regexTagEnd)); 

            if (tagStart) {
                var templateFile = tagStart[1] + '.html';
      
                template = grunt.file.read(templatesBaseDir + templateFile);

                initialChar = line.match(/(\s*\t*\s*)<!--/)[1];

                inBlock = true;
                line = ''; // skip this line
            }

            if (inBlock && tagEnd) {
                // we are ending a block
                inBlock = false;
                
                var rawJSON = jsonLine.join('');

                if (rawJSON !== '') {
                  grunt.file.write('tmp/tmp.json', rawJSON);
                  data = grunt.file.readJSON('tmp/tmp.json');
                  grunt.file.delete('tmp/');
                } else {
                  data = {};
                }
                
                var compiled = grunt.util._.template(template, data);

                paresedLines.push('\n');

                compiled.replace(/\r\n/g, '\n').split(/\n/).forEach(function(l, i){                   
                    paresedLines.push( (i === 0 ? '' : '\n') + initialChar + l);
                });
                              
                line = ''; // skip this line
                jsonLine = [];
            }

            if (inBlock) {
              jsonLine.push(line);             
            } else {
                if (tagEnd) {
                    paresedLines.push(line);
                } else {
                    paresedLines.push((index === 0 ? '' : '\n') +line);
                }              
            }
            
            
        });
        
        var parsedFile = paresedLines.join('');

        grunt.log.write(', results in ' + destPath + path.basename(filepath));
        grunt.file.write(destPath + path.basename(filepath), parsedFile);

      });

    });
  });

};
