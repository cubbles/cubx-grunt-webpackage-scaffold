/*global module,require*/
'use strict';
var utils = require('../lib/utils');
module.exports = function (grunt) {
  // define a task starting with '+' if your task should be listed as one of the top tasks
  grunt.registerTask('+webpackage-createCompound', 'Scaffold a new Compound-Component in a Webpackage.',
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
              description: 'Show the interface and dataflow of this component.'
            }
          ],
          endpoints: [
            {
              endpointId: 'main',
              resources: [
                'css/' + answers.artifactId + '.css'
              ],
              dependencies: []
            }
          ],
          slots: [
            {
              slotId: 'outdoor-temperature',
              type: 'number',
              direction: [
                'input',
                'output'
              ]
            } ],
          members: [
            {
              memberId: 'member1',
              componentId: 'webpackage@version/artifactId'
            }
          ],
          connections: [
            {
              connectionId: 'temperature-transfer',
              source: {
                slot: 'outdoor-temperature'
              },
              destination: {
                memberIdRef: 'member1',
                slot: 'temperatureIn'
              }
            } ],
          inits: [
            {
              slot: 'outdoor-temperature',
              value: 0
            }
          ]
        };

        // make sure the artifact-type section does exist
        if (!manifest.artifacts.compoundComponents) {
          manifest.artifacts.compoundComponents = [];
        }

        // add or replace the artifact
        var index = utils.arrayObjectIndexOf(manifest.artifacts.compoundComponents, 'artifactId',
          artifactObject.artifactId);
        if (index < 0) {
          grunt.verbose.writeln(
            'Pushing the new artifact into manifest.webpackage: ' + artifactObject.artifactId);
          manifest.artifacts.compoundComponents.push(artifactObject);
        } else {
          grunt.verbose.writeln(
            'Replacing the artifact within manifest.webpackage: ' + artifactObject.artifactId);
          manifest.artifacts.compoundComponents.splice(index, 1, artifactObject);
        }
        grunt.file.write(manifestWebpackagePath, JSON.stringify(manifest, null, 2));
        done();
      };

      var options = require('../lib/config/compound-options.js')(grunt);
      require('../lib/scaffolder.js')(grunt, this, options, updateManifest);
    });
};
