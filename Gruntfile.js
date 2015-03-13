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
          environment: 'production',
          force: true
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
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "./javascript",
          mainConfigFile: "./javascript/main.js",
          name: './lib/almond',
          include: 'main',
          out: 'public/build.js',
          wrap: true,
          insertRequire: ['main'],
          findNestedDependencies: true,
        }
      }
    },
    replace: {
      scriptsrc: {
        src: ["index.html"],
        overwrite: true,
        replacements: [
          {
            from: /^.*script data-main=\".*$/m,
            to: '    <script type="text/javascript" src="public/build.js"></script>'
          }
        ]
      },
      imageurls: {
        src: ["javascript/views/*"],
        overwrite: true,
        replacements: [
          {
            from: /("|')\/images\/(.*)("|')/g,
            to: "$1http://gabeisman.github.io/papercity/images/$2$3"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.registerTask('default', ['compass:dev', 'watch']);
  grunt.registerTask('productionize', ['compass:prod', 'requirejs:compile', 'replace:scriptsrc']);
};
