/*global module,require*/
'use strict';
var wrap = require('wordwrap')(70);
var schemaPath = require.resolve('cubx-webpackage-document-api/lib/jsonSchema/manifestWebpackage-8.3.0.schema');
var schema = JSON.parse(require('fs').readFileSync(schemaPath));
var path = require('path');

module.exports = function (grunt) {
  var activeWebpackage = grunt.config.get('activeWebpackage');

  var regexLib = {
    artifactName: new RegExp(schema.definitions.elementaryArtifact.properties.artifactId.pattern)
  };

  var options = {
    questions: [
      {
        name: 'artifactId',
        type: 'input',
        message: 'Component name (e.g. \'my-elementary\'):',
        validate: function (input) {
          if (!regexLib.artifactName.test(input)) {
            return wrap('Please provide a valid value like \'my-elementary\' or \'my-demo-elementary\'!');
            //(regex=' + regexLib.artifactName + ').');
          }
          return true;
        }
      },
      {
        name: 'description',
        type: 'input',
        message: 'Provide a short description (optional):',
        default: 'This is an elementary-component based on Polymer.'
      }
    ],
    processAnswers: function (result) {
      return;
    },
    template: {
      // <source>: <target> used by the scaffolder to copy template files
      './skeletons/elementary': path.join(activeWebpackage, '{{artifactId}}')
    }
  };
  return options;
};
