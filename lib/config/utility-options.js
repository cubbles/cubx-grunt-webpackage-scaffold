/*global module,require*/
'use strict';
var wrap = require('wordwrap')(70);
var schemaPath = require.resolve('cubx-webpackage-document-api/lib/jsonSchema/manifestWebpackage-8.3.1.schema.json');
var schema = JSON.parse(require('fs').readFileSync(schemaPath));
var path = require('path');

module.exports = function (grunt) {
  var activeWebpackage = grunt.config.get('activeWebpackage');

  var regexLib = {
    artifactName: new RegExp(schema.definitions.utilArtifact.properties.artifactId.pattern)
  };

  var options = {
    questions: [
      {
        name: 'artifactId',
        type: 'input',
        message: 'Utility name (e.g. \'my-util\'):',
        validate: function (input) {
          if (!regexLib.artifactName.test(input)) {
            return wrap('Please provide a valid value like \'util\' or \'my-demo-util\'!');
            //(regex=' + regexLib.artifactName + ').');
          }
          return true;
        }
      },
      {
        name: 'description',
        type: 'input',
        message: 'Provide a short description (optional):'
      }
    ],
    processAnswers: function (result) {
      return;
    },
    template: {
      // <source>: <target> used by the scaffolder to copy template files
      './skeletons/utility': path.join(activeWebpackage, '{{artifactId}}')
    }
  };
  return options;
};
