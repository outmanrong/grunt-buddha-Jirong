/*
 * grunt-buddha-jirong
 * 
 *
 * Copyright (c) 2016 Jirong
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('buddha_jirong', 'Buddha\'s illuminates code as sunshine', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      who: 'buddha',
      commentSymbol: '//',
      //punctuation: '.',
      //separator: ', '
    });

    var testExistRegexMap = {
      'buddha': /o8888888o/,
      'alpaca': /┗┓ ┓ ┏━┳━┓ ┏━━┛/,
    };

    var who = options.who,
        commentSymbol = options.commentSymbol,
        commentFilePathMap = {
          'buddha': 'assets/buddha.txt',
          'alpaca': 'assets/alpaca.txt',
        },
        commentFilePath = path.join(__dirname, commentFilePathMap[who]),
        commentContent = grunt.file.read(commentFilePath),
        lineCommentArr = commentContent.split(grunt.util.normalizelf('\n'));

    lineCommentArr.forEach(function(value, index, arr){
      arr[index] = commentSymbol + value;
    }); 

    commentContent = lineCommentArr.join(grunt.util.normalizelf('\n'));

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      //不需要临时变量：var src = file.src.filter(function (filepath) {
        file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        var originalFileContent = grunt.file.read(filepath),
            newFileContent = commentContent + 
                              grunt.util.normalizelf('\n') + 
                              originalFileContent;
        if(testExistRegexMap[who].test(originalFileContent)){
          return;
        }

        grunt.file.write(filepath, newFileContent);
        //return grunt.file.read(filepath);
      });


      /*删除不必要操作： 
      .join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(file.dest, src);
      */

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
