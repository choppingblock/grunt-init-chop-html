/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '',
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['*.js'],
        dest: 'dist/assets/javascript/app.min.js'
      }
    },
	clean: {
	  dist: {
	    src: ["dist/public/assets/stylesheets", "dist/public/cache"]
	  }
	},
    imageoptim: {
      files: ['dist/public/assets/images'],
      options: {
        jpegMini: false,
        imageAlpha: false,
        quitAfter: false
      }
    },
	copy:{
		dist: {
			files:[
				{ expand: true, cwd: "src/public/", src: ['**'], dest: 'dist/public/'},
				{ expand: true, cwd: "src/", src: ['*'], dest: 'dist/', filter: 'isFile'},
				{ expand: true, cwd: "src/views/", src: ['**'], dest: 'dist/views/'},							
			]
		}
	},
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/assets/javascript/app.min.js'
      }
    },{% if (compass) { %}
			compass: {
				dist: {
					options: {
					relativeAssets: true,					
					outputStyle: 'compressed',				
					imagesDir: 'dist/public/assets/images', 
					sassDir: 'dist/public/assets/sass',
					cssDir: 'dist/public/assets/stylesheets'

					}
				},
				dev: {                   
					options: {
						relativeAssets: true,	
						imagesDir: 'src/public/assets/images',									
						sassDir: 'src/public/assets/sass',
						cssDir: 'src/public/assets/stylesheets'
					}
				}
			},


	{% } %}
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
		}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
	  dev:{
		src: ['src/assets/javascript/*']
	  },
      qunit: {
        src: ['test/qunit/**/*.js']
      }
    },

	csscss: {
	  src: {
	    src: ['src/public/assets/stylesheets/styles.css']
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
			src: ['src/public/assets/stylesheets/styles.css']
		}
	},
	
	qunit: {
      files: ['test/qunit/**/*.html']
    },
	watch: {
		script: {
			files: ['src/public/assets/javascript/**'],
			tasks: ['jshint:dev']		
			
		},
		css: {
			files: ['src/public/assets/sass/**', 'src/public/assets/stylesheets/**'],
			tasks: [ 'compass:dev', 'csscss', 'csslint']					
		}
	}
 });



  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify' , 'compass']);
  grunt.registerTask('build', ['jshint:dev', 'compass:dev', 'qunit']);
  grunt.registerTask('distribute', ['jshint:dev', 'copy:dist', 'clean', 'concat', 'uglify', 'compass:dist', 'imageoptim', 'usemin']);
  grunt.registerTask('watcher', ['watch:script', 'watch:css']);



};