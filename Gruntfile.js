module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dev: {
        options: {
          sassDir: 'stylesheets/scss',
          cssDir: 'stylesheets/css',
          imagesDir: 'images',
          fontsDir: 'fonts',
          outputStyle: 'expanded',
          force: true,
          noLineComments: true
        }
      },
      prod: {
        options: {
          sassDir: 'stylesheets/scss',
          cssDir: 'stylesheets/css',
          imagesDir: 'papercity/images',
          fontsDir: 'papercity/fonts',
          outputStyle: 'compressed',
          environment: 'production'
        }
      }
    },
    watch: {
      scss: {
        files: 'stylesheets/scss/**/*.scss',
        tasks: ['compass:dev'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['compass:dev', 'watch']);
  grunt.registerTask('productionize', ['compass:prod']);
};
