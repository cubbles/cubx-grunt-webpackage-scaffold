/*global module,require*/
'use strict';
var utils = require('../lib/utils');
module.exports = function (grunt) {
  // define a task starting with '+' if your task should be listed as one of the top tasks
  grunt.registerTask('+webpackage-createUtility', 'Scaffold a new Utility in a Webpackage.', function () {
    var updateManifest = function (answers, done) {
      var manifestWebpackagePath = grunt.config.get('manifestWebpackagePath');
      var manifest = grunt.file.readJSON(manifestWebpackagePath);
      var artifactObject = {
        artifactId: answers.artifactId,
        description: answers.description,
        endpoints: [
          {
            endpointId: 'main',
            resources: [
              'js/util.js'
            ],
            dependencies: []
          },
          {
            endpointId: 'html-import',
            description: 'This is recommended for you use with webcomponents.',
            resources: [
              'html-import.html'
            ],
            dependencies: []
          }
        ]
      };

      // make sure the artifact-type section does exist
      if (!manifest.artifacts.utilities) {
        manifest.artifacts.utilities = [];
      }

      // add or replace the artifact
      var index = utils.arrayObjectIndexOf(manifest.artifacts.utilities, 'artifactId',
        artifactObject.artifactId);
      if (index < 0) {
        grunt.verbose.writeln(
          'Pushing the new artifact into manifest.webpackage: ' + artifactObject.artifactId);
        manifest.artifacts.utilities.push(artifactObject);
      } else {
        grunt.verbose.writeln(
          'Replacing the artifact within manifest.webpackage: ' + artifactObject.artifactId);
        manifest.artifacts.utilities.splice(index, 1, artifactObject);
      }
      grunt.file.write(manifestWebpackagePath, JSON.stringify(manifest, null, 2));
      done();
    };

    var options = require('../lib/config/utility-options.js')(grunt);
    require('../lib/scaffolder.js')(grunt, this, options, updateManifest);
  });
};
