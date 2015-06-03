module.exports = function(grunt) {
  pkg: grunt.file.readJSON('package.json'),
  grunt.initConfig({
    webdriver: {
      kevKanye: {
        tests: 'specs/features/homepageFeature.js'
      },
      options: {
        desiredCapabilities: {
          browserName: 'chrome'
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-webdriver');
  // grunt.registerTask('default', ['mocha']);
  grunt.registerTask('default', ['webdriver']);

};