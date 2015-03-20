module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        process: function(src, filepath) {
          return src.replace(/(?:\/\*.*\*\/|\/\/.*)$\r\n(^.*$)/gm, '$1');
        }
        // ,footer: 'module.exports = ArusPSConnector;\n'
      },
      dist: {
        src: ['config.js', 'lib/**/*.js'],
        dest: 'build/compiled.js'
      }
    },

    babel: {
      dist: {
        files: {
          'index.js': 'build/compiled.js'
        }
      }
    },

    watch: {
      gruntfile: {
        files: ['gruntfile.js'],
        tasks: ['default'],
        options: {
          reload: true
        }
      },
      scripts: {
        files: ['config.js', 'lib/**/*.js'],
        tasks: ['concat', 'babel'],
        options: {
          debounceDelay: 250
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['concat', 'babel', 'watch']);
};
