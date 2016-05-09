/*global module,require*/
'use strict';
var utils = require('../lib/utils');
module.exports = function (grunt) {
  // define a task starting with '+' if your task should be listed as one of the top tasks
  grunt.registerTask('+webpackage-createApp', 'Scaffold a new App in a Webpackage.', function () {
    var updateManifest = function (answers, done) {
      var manifestWebpackagePath = grunt.config.get('manifestWebpackagePath');
      var manifest = grunt.file.readJSON(manifestWebpackagePath);
      var appObject = {
        artifactId: answers.artifactId,
        description: answers.description,
        runnables: [
          {
            name: 'My Hello World App.',
            path: '/index.html',
            description: 'Call this app as a simple demo.'
          }
        ]
      };

      // make sure the artifact-type section does exist
      if (!manifest.artifacts.apps) {
        manifest.artifacts.apps = [];
      }

      // add or replace the artifact
      var index = utils.arrayObjectIndexOf(manifest.artifacts.apps, 'artifactId', appObject.artifactId);
      if (index < 0) {
        grunt.verbose.writeln('Pushing the new artifact into manifest.webpackage: ' + appObject.artifactId);
        manifest.artifacts.apps.push(appObject);
      } else {
        grunt.verbose.writeln('Replacing the artifact within manifest.webpackage: ' + appObject.artifactId);
        manifest.artifacts.apps.splice(index, 1, appObject);
      }
      grunt.file.write(manifestWebpackagePath, JSON.stringify(manifest, null, 2));
      done();
    };

    var options = require('../lib/config/app-options.js')(grunt);
    require('../lib/scaffolder.js')(grunt, this, options, updateManifest);
  });
};
