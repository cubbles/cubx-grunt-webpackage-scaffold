/* global module,require */
'use strict';
var wrap = require('wordwrap')(70);
var schemaPath = require.resolve('cubx-webpackage-document-api/lib/jsonSchema/manifestWebpackage-9.1.2.schema.json');
var schema = JSON.parse(require('fs').readFileSync(schemaPath));
var path = require('path');

module.exports = function (grunt) {
  var activeWebpackage = grunt.config.get('activeWebpackage');

  var regexLib = {
    artifactName: new RegExp(schema.definitions.appArtifact.properties.artifactId.pattern)
  };

  var options = {
    questions: [
      {
        name: 'artifactId',
        type: 'input',
        message: 'Application name (e.g. \'my-app\'):',
        validate: function (input) {
          if (!regexLib.artifactName.test(input)) {
            return wrap('Please provide a valid value like \'demoapp\' or \'my-demo-app\'!');
            // (regex=' + regexLib.artifactName + ').');
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
    processAnswers: function (result) {},
    template: {
      // <source>: <target> used by the scaffolder to copy template files
      './skeletons/app': path.join(activeWebpackage, '{{artifactId}}')
    }
  };
  return options;
};
