module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: ['lib/**/*.js'],
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
        files: '**/*.js',
        tasks: ['concat', 'babel']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['concat', 'babel', 'watch']);
};
