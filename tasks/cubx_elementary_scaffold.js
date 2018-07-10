/*global module,require*/
'use strict';
var utils = require('../lib/utils');
module.exports = function (grunt) {
  // define a task starting with '+' if your task should be listed as one of the top tasks
  grunt.registerTask('+webpackage-createElementary', 'Scaffold a new Elementary-Component in a Webpackage.',
    function () {
      var updateManifest = function (answers, done) {
        var manifestWebpackagePath = grunt.config.get('manifestWebpackagePath');
        var manifest = grunt.file.readJSON(manifestWebpackagePath);
        var artifactObject = {
          artifactId: answers.artifactId,
          description: answers.description,
          runnables: [
            {
              name: 'demo',
              path: '/demo/index.html',
              description: 'Demo app...'
            },
            {
              name: 'docs',
              path: '/docs/index.html',
              description: 'Show the interface of this component.'
            }
          ],
          resources: [
            answers.artifactId + '.css',
            answers.artifactId + '.html'
          ],
          dependencies: [
            {
              webpackageId: 'cubx.core.rte@2.5.1',
              artifactId: 'cubxpolymer'
            }
          ],
          slots: []
        };

        // make sure the artifact-type section does exist
        if (!manifest.artifacts.elementaryComponents) {
          manifest.artifacts.elementaryComponents = [];
        }

        // add or replace the artifact
        var index = utils.arrayObjectIndexOf(manifest.artifacts.elementaryComponents, 'artifactId',
          artifactObject.artifactId);
        if (index < 0) {
          grunt.verbose.writeln(
            'Pushing the new artifact into manifest.webpackage: ' + artifactObject.artifactId);
          manifest.artifacts.elementaryComponents.push(artifactObject);
        } else {
          grunt.verbose.writeln(
            'Replacing the artifact within manifest.webpackage: ' + artifactObject.artifactId);
          manifest.artifacts.elementaryComponents.splice(index, 1, artifactObject);
        }
        grunt.file.write(manifestWebpackagePath, JSON.stringify(manifest, null, 2));
        done();
      };

      var options = require('../lib/config/elementary-options.js')(grunt);
      require('../lib/scaffolder.js')(grunt, this, options, updateManifest);
    });
};
