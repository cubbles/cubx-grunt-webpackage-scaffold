/* global module,require */
'use strict';
const wrap = require('wordwrap')(70);
const schemaPath = require.resolve('cubx-webpackage-document-api/lib/jsonSchema/manifestWebpackage-9.1.2.schema.json');
const schema = JSON.parse(require('fs').readFileSync(schemaPath));
const path = require('path');

module.exports = function (grunt) {
  const activeWebpackage = grunt.config.get('activeWebpackage');

  const regexLib = {
    artifactName: new RegExp(schema.definitions.elementaryArtifact.properties.artifactId.pattern)
  };

  const options = {
    questions: [
      {
        name: 'artifactId',
        type: 'input',
        message: 'Component name (e.g. \'my-elementary\'):',
        validate: function (input) {
          if (!regexLib.artifactName.test(input)) {
            return wrap('Please provide a valid value like \'my-elementary\' or \'my-demo-elementary\'!');
            // (regex=' + regexLib.artifactName + ').');
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
    processAnswers: function (result) {},
    template: {
      // <source>: <target> used by the scaffolder to copy template files
      './skeletons/elementary': path.join(activeWebpackage, '{{artifactId}}')
    }
  };
  return options;
};
