/*
 * grunt-cubx-webpackage-upload
 *
 *
 * Copyright (c) 2015 Hd Böhlau
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // Project configuration.
  var workspacePath = 'test/webpackages/';
  var workspaceConfigPath = workspacePath + '.workspace';
  var activeWebpackage = grunt.file.readJSON(workspaceConfigPath).activeWebpackage;
  var manifestWebpackagePath = workspacePath + activeWebpackage + '/manifest.webpackage';

  grunt.initConfig({
    githooks: {
      all: {
        'pre-commit': 'eslint'
      }
    },
    eslint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        configFile: '.eslintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: [ 'tmp' ]
    },

    // Unit tests.
    nodeunit: {
      tests: [ 'test/*_test.js' ]
    },

    'http-server': {
      dev: {
        root: 'test/webpackages',
        port: 8282,
        host: 'localhost',
        cache: 1,
        showDir: true,
        autoIndex: true,
        // server default file extension
        ext: 'html',
        // run in parallel with other tasks
        runInBackground: false,
        // Proxies all requests which can't be resolved locally to the given url
        // Note: this will disable 'showDir'
        proxy: 'https://webblebase.net',
        // Tell grunt task to open the browser
        openBrowser: true
      }
    },

    // the option used within the devtools to load the workspace-config
    workspacePath: workspacePath,
    workspaceConfigPath: workspaceConfigPath,
    activeWebpackage: activeWebpackage,
    manifestWebpackagePath: manifestWebpackagePath
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-githooks');

  // By default, lint and run all tests.
  grunt.registerTask('default', [ 'eslint' ]);
};
