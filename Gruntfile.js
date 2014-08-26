'use strict';

module.exports = function(grunt) {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    var proto = grunt.file.readJSON('bower.json');
    /**
     * Define projet properties
     */
    var project = {
        name: proto.name,
        version: proto.version,
        finalName: proto.name + '-' + proto.version,
        outDir: 'target',
        buildDir: 'target/build',
        distDir: 'target/dist',
        srcDir: 'src',
        mainDir: 'src/main',
        vendorDir: 'src/vendors',
        testDir: 'src/test'
    };

    /*
     * Load grunt tasks automatically
     */
    require('load-grunt-tasks')(grunt);

    /*
     * Time how long tasks take. Can help when optimizing build times
     */
    require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: project,

      /**
       * Install Bower packages.
       */
      bower: { install: true, cleanup: true, options: {targetDir: project.outDir+'/vendors'} },

      /**
       * The directory to delete when `grunt clean` is executed.
       */
      clean: [project.vendorDir, project.outDir],

      /**
       * Copy HTML files.
       */
      copy: {
          build: { expand: true, cwd: project.mainDir, src: ['**/*.js', '**/*.css', '**/*.html'], dest: project.buildDir, filter: 'isFile' },
          dist: { expand: true, cwd: project.mainDir, src: ['**/*', '!**/*.tpl.html', '!**/*.js'], dest: project.distDir, filter: 'isFile' },
          vendors: { expand: true, cwd: project.vendorDir, src: ['**/*'], dest: project.outDir+'/vendors', filter: 'isFile' }
      },

      /**
       * Minify the sources!
       */
      useminPrepare: {
          concat: { },
          cssmin: { },
          html: project.buildDir + '/*.html',
          options: {
              dest: project.distDir,
              staging: project.buildDir
          }
      },
      uglify: { options: { mangle: false } },
      usemin: { html: project.distDir + '/*.html' },
      ngmin: {
          dist: {
              files: [
                  { expand: true, cwd: project.buildDir + '/concat/', src: ['**/*.js'], dest: project.buildDir + '/concat/' }
              ]
          }
      },

      /*
       * Make sure code styles are up to par and there are no obvious mistakes
       */
      jshint: {
          options: {
              jshintrc: '.jshintrc',
              reporter: require('jshint-stylish')
          },
          all: {
              src: ['<%= pkg.mainDir %>{,*/}*.js']
          },
          test: {
              src: ['<%= pkg.testDir %>/spec/{,*/}*.js']
          }
      },

      /**
       * Compress artifacts to ZIP file.
       */
      compress: {
          main: {
              options: {
                  mode: 'zip',
                  archive: project.outDir + '/' + project.finalName + '.zip'
              },
              files: [
                  {expand: true, cwd: project.distDir + '/', src: ['**/*']}
              ]
          }
      }
  });

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */

    grunt.registerTask('init', [
        'clean',
        'resolve'
    ]);

    grunt.registerTask('build-dev', [
        'copy',
        'ngtemplates'
    ]);

    grunt.registerTask('build-all', [
        'jshint',
        'copy',
        'optimize'
    ]);

    grunt.registerTask('resolve', [
        'bower'
    ]);


    grunt.registerTask('release', [
        'init',
        'build-all',
        'compress'
    ]);

    grunt.registerTask('test', [
        'build-all',
        'karma'
    ]);

    // simple build task
    grunt.registerTask('optimize', [
        'useminPrepare',
        'concat',
        //'ngmin',
        'uglify',
        //'cssmin',
        //'filerev',
        'usemin'
    ]);

    /**
     * The default task is to build.
     */
    grunt.registerTask('default', [
        'init',
        'build-all'
    ]);

};