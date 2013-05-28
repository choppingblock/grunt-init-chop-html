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
	copy:{
		dist: {
			files:[
				{ expand: true, cwd: "src/assets", src: ['**'], dest: 'dist/assets/'},
				{ expand: true, src: ['src/*'], dest: 'dist/'}
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
				sassDir: 'dist/assets/sass',
				cssDir: 'dist/assets/css',
				environment: 'production'
			}
		},
			dev: {                    // Another target
				options: {
					sassDir: 'src/assets/sass',
					cssDir: 'src/assets/css'
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
	qunit: {
      files: ['test/qunit/**/*.html']
    },
    watch: {
		files: 'src/assets/**',
        tasks: ['jshint:dev', 'compass:dev', 'qunit']		
  }
 });

  {% if (compass) { %}
     grunt.loadNpmTasks('grunt-contrib-compass');
  {% } %}
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  // Default task.

  grunt.registerTask('default', ['jshint', 'concat', 'uglify' , 'compass']);
  grunt.registerTask('build', ['jshint:dev', 'compass:dev', 'qunit']);
  grunt.registerTask('distribute', ['jshint', 'copy:dist', 'concat', 'uglify', 'compass:dist']);
  grunt.registerTask('watcher', ['watch:assets']);


};