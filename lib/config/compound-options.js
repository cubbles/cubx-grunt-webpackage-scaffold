/* global module,require */
'use strict';
var wrap = require('wordwrap')(70);
var schemaPath = require.resolve('cubx-webpackage-document-api/lib/jsonSchema/manifestWebpackage-9.1.2.schema.json');
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
        message: 'Component name (e.g. \'my-compound\'):',
        validate: function (input) {
          if (!regexLib.artifactName.test(input)) {
            return wrap('Please provide a valid value like \'my-compound\' or \'my-demo-compound\'!');
            // (regex=' + regexLib.artifactName + ').');
          }
          return true;
        }
      },
      {
        name: 'description',
        type: 'input',
        message: 'Provide a short description (optional):',
        default: 'This is a cubbles-compound-component.'
      }
    ],
    processAnswers: function (result) {},
    template: {
      // <source>: <target> used by the scaffolder to copy template files
      './skeletons/compound': path.join(activeWebpackage, '{{artifactId}}')
    }
  };
  return options;
};
