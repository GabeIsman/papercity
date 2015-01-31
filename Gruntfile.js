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
    jshint: {
      all: ['javascript/**/*.js', 'Gruntfile.js', '!javascript/lib/**/*.js']
    },
    watch: {
      scss: {
        files: 'stylesheets/scss/**/*.scss',
        tasks: ['compass:dev'],
      },
      js: {
        files: ['javascript/**/*.js', 'Gruntfile.js'],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['compass:dev', 'watch']);
  grunt.registerTask('productionize', ['compass:prod']);
};
