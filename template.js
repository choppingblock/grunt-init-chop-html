/*
 * grunt-init-chop-html-basic
 * https://choppingblock.com/
 *
 * Copyright (c) 2013 The Chopping Block
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create an HTML project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    {
      name: 'title',
	  message: 'Title of project?',
	  default: "Untitled Project"		
    },
	{
      name: 'compass',
      message: 'Use Compass?',
      default: 'Y/n',
      warning: 'Yes: Include Compass task and compass files.'
    }
  ], function(err, props) {
	props.compass = /y/i.test(props.compass);
    props.file_name = '<%= pkg.name %>';

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);
    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.title,
      version: '0.0.0',
      npm_test: 'qunit',
      devDependencies: {
        'grunt-contrib-jshint': '~0.5.2',
        'grunt-contrib-qunit': '~0.2.1',
        'grunt-contrib-concat': '~0.3.0',
        'grunt-contrib-uglify': '~0.2.0',
        'grunt-contrib-watch': '~0.4.3',
        'grunt-contrib-clean': '~0.4.1',
        'grunt-contrib-compass': '~0.2.0',
  		'grunt-contrib-copy': '~0.4.1'

      }
    });

    done();
  });

};
