module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      test: {
        src: ['specs/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.registerTask('default', ['grunt-mocha']);

};