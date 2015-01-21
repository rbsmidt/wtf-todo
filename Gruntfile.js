module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/css'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['compass']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('dev',['watch']);
}
