/* global module,require */
'use strict';
const wrap = require('wordwrap')(70);
const schemaPath = require.resolve('cubx-webpackage-document-api/lib/jsonSchema/manifestWebpackage-9.1.2.schema.json');
const schema = JSON.parse(require('fs').readFileSync(schemaPath));
const path = require('path');

module.exports = function (grunt) {
  const activeWebpackage = grunt.config.get('activeWebpackage');

  const regexLib = {
    artifactName: new RegExp(schema.definitions.utilArtifact.properties.artifactId.pattern)
  };

  const options = {
    questions: [
      {
        name: 'artifactId',
        type: 'input',
        message: 'Utility name (e.g. \'my-util\'):',
        validate: function (input) {
          if (!regexLib.artifactName.test(input)) {
            return wrap('Please provide a valid value like \'util\' or \'my-demo-util\'!');
            // (regex=' + regexLib.artifactName + ').');
          }
          return true;
        }
      },
      {
        name: 'description',
        type: 'input',
        message: 'Provide a short description (optional):',
        default: 'This is a utilitity artifact.'
      }
    ],
    processAnswers: function (result) {},
    template: {
      // <source>: <target> used by the scaffolder to copy template files
      './skeletons/utility': path.join(activeWebpackage, '{{artifactId}}')
    }
  };
  return options;
};
