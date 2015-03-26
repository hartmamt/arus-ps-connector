module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        process: function(src) {
          src = src.replace(/(?:\/\*.*\*\/|\/\/.*)$\r\n(^.*$)/gm, '$1');
          var imports;
          return src;
        }
        // ,footer: 'module.exports = ArusPSConnector;\n'
      },
      dist: {
        src: ['config.js', 'lib/**/*.js', 'lib/**/*.es6'],
        dest: 'build/concatenated.es6'
      }
    },

    babel: {
      dist: {
        files: {
          'index.js': 'build/concatenated.es6'
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
        files: ['config.js', 'lib/**/*.js', 'lib/**/*.es6'],
        tasks: ['concat', 'babel'],
        options: {
          debounceDelay: 250
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'babel', 'watch']);
};
