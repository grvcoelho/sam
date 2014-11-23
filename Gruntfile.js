module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		stylus: {
		  compile: {
		    options: {
		      use: [
            require('jeet'),
		        require('axis'),
		        require('rupture'),
		        require('kouto-swiss'),
		      ],
		    },
		    files: {
		      'dist/assets/stylesheets/style.css': ['src/stylesheets/style.styl'] // compile and concat into single file
		    }
		  }
		},

    concat: {
      options: {
        separator: ';\n',
      },
      angularApp: {
        src: ['src/javascripts/melancia.js', 'src/javascripts/**/*.js'],
        dest: 'dist/assets/javascripts/melancia.js'
      }
    },

		jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [
          { 
            cwd: 'src',
            src: ['**/*.jade'],
            dest: 'dist',
            expand: true,
            ext: '.html'
          },
          { 'dist/index.html': ['src/views/index.jade']}
        ]
      }
    },

    watch: {
      stylesheets: {
        files: ['src/stylesheets/**/*.styl'],
        tasks: ['stylus'],
      },
      javascripts: {
        files: ['src/javascripts/**/*.js'],
        tasks: ['concat'],
      },
      views: {
        files: ['src/views/**/*.jade'],
        tasks: ['jade'],
      },
    },
	});

  grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['stylus', 'jade', 'concat', 'watch']);
  grunt.registerTask('s', ['stylus']);
  grunt.registerTask('j', ['jade']);
  grunt.registerTask('w', ['watch']);
};