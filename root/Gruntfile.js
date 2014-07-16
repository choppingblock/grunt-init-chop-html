/* jshint node: true */

module.exports = function(grunt) {	
	'use strict';
	
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	

	// Configurable paths
	var config = {
		src: 'src',
		dist: 'dist',
		jspath: 'assets/javascript',
		imagepath: 'assets/images',
		sasspath: 'assets/sass',
		csspath: 'assets/css'
		
    };

	// Project configuration.
	grunt.initConfig({


	// Project settings
		config: config,



		watch: {
			js: {
				files: ['<%= config.src %>/<%= config.jspath %>/{,*/}*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			jstest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['test:watch']
			},
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['jshint']
			},
			styles: {
				files: ['<%= config.src %>/<%= config.sasspath %>/{,*/}*.{scss,sass}'],
				tasks: ['compass:dev']
			},
			stylestest: {
				files: ['<%= config.app %>/<%= config.sasspath %>/{,*/}*.scss'],
				tasks: ['compass:dev', 'csslint', 'csscss']
			},
			development: {
				files: ['<%= config.src %>/<%= config.jspath %>/{,*/}*.js', '<%= config.app %>/<%= config.csspath %>/{,*/}*.css', '<%= config.src %>/<%= config.sasspath %>/{,*/}*.{scss,sass}'],
				tasks: ['jshint', 'compass:dev']
			},			
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.src %>/{,*/}*.html',
					'<%= config.src %>/assets/javascript/{,*/}*.js',
					'<%= config.src %>/assets/css/{,*/}*.css',					
					'<%= config.src %>/assets/images/{,*/}*'
				]
			}
		},
		
		clean: {
			dist: {
				src: ["<%= config.dist %>/*"]
			}
		},


		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [

						connect.static(config.src),
						connect().use('/bower_components', connect.static('./bower_components'))
						];
					}
				}
			},
			test: {
				options: {
					open: false,
					port: 9001,
					middleware: function(connect) {
						return [   
							connect.static('test'),
							connect.static(config.src)
						];
					}
				}
			},
			dist: {
				options: {
					base: '<%= config.dist %>',
					livereload: false
				}
			}
		},
	
	

		
		copy:{

			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'images/{,*/}*.webp',
						'{,*/}*.html',
						'assets/fonts/{,*/}*.*'
					]
				}]
			}


		},
	
	
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
				}
			}
		},	

		// // Generates a custom Modernizr build that includes only the tests you
		// // reference in your app
		// modernizr: {
		// dist: {
		// devFile: 'bower_components/modernizr/modernizr.js',
		// outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
		// files: {
		// src: [
		// '<%= config.dist %>/scripts/{,*/}*.js',
		// '<%= config.dist %>/styles/{,*/}*.css',
		// '!<%= config.dist %>/scripts/vendor/*'
		// ]
		// },
		// uglify: true
		// }
		// },
	
	
		

		compass: {
			dist: {
				options: {
				relativeAssets: true,					
				outputStyle: 'compressed',				
				imagesDir: '<%= config.dist %>/<%= config.imagepath %>', 
				sassDir: '<%= config.dist %>/<%= config.sasspath %>', 
				cssDir: '<%= config.dist %>/<%= config.csspath %>', 

				}
			},
			dev: {                   
				options: {
					relativeAssets: true,	
					imagesDir: '<%= config.src %>/<%= config.imagepath %>', 
					sassDir: '<%= config.src %>/<%= config.sasspath %>', 
					cssDir: '<%= config.src %>/<%= config.csspath %>', 
				}
			}
		},
	
	
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				},
				reporter: require('jshint-stylish')
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			all:{
				src: ['<%= config.src %>/<%= config.jspath %>/*.js']
			}
		},

		csscss: {
			src: {
				src: ['<%= config.src %>/<%= config.csspath %>/*.css']
			}
		},

		csslint: {

			src:{
				options: {
					"adjoining-classes": false,
					"box-sizing": false,
					"box-model": false,
					"fallback-colors": false
				},
				src: ['<%= config.src %>/<%= config.csspath %>/*.css']
			}
		},



        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.src %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/<%= config.csspath', '<%= config.dist %>/<%= config.imagepath', '<%= config.dist %>/<%= config.jspath']
            },
            html: ['<%= config.dist %>/{,*/}*.html']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/<%= config.imagepath %>',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/<%= config.imagepath %>'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/<%= config.imagepath %>',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/<%= config.imagepath %>'
                }]
            }
        },
		
		uglify:{
			options: {
				preserveComments: "some",
			        sourceMap: true,
			        compress: {
			          drop_console: true
			        }
			      }
		},

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        concurrent: {
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        }
		
	});
	

	
    grunt.registerTask('serve', function () {

        grunt.task.run([
            'connect:livereload',
            'watch',
        ]);
    });	
	
    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat:generated',
        'uglify:generated',
        'copy:dist',
        'usemin',
        'htmlmin'
    ]);

};