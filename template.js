/*
 * grunt-init-chop-html-basic
 * https://choppingblock.com/
 *
 * Copyright (c) 2014 The Chopping Block
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
      npm_test: 'mocha',
      devDependencies: {
	    "grunt-contrib-compass": "~0.5.0",
	    "grunt-csscss": "~0.6.1",
	    "grunt-contrib-csslint": "^0.2",
	    "grunt-contrib-copy": "~0.5.0",
	    "grunt-contrib-concat": "~0.3.0",
	    "grunt-contrib-uglify": "~0.4.0",
	    "grunt-contrib-sass": "~0.7.3",
	    "grunt-contrib-jshint": "~0.9.2",
	    "grunt-contrib-connect": "~0.7.1",
	    "grunt-contrib-clean": "~0.5.0",
	    "grunt-contrib-htmlmin": "~0.2.0",
	    "grunt-bower-install": "~1.4.0",
	    "grunt-contrib-imagemin": "~0.6.0",
	    "grunt-contrib-watch": "~0.6.1",
	    "grunt-usemin": "~2.1.0",
	    "grunt-mocha": "~0.4.10",
	    "grunt-modernizr": "~0.5.2",
	    "grunt-newer": "~0.7.0",
	    "grunt-svgmin": "~0.4.0",
	    "grunt-concurrent": "~0.5.0",		
		
	    "time-grunt": "~0.3.1",
	    "jshint-stylish": "~0.1.5",		
	    "load-grunt-tasks": "~0.4.0"

      }
    });

    done();
  });

};


