/* global module,require */
'use strict';
const wrap = require('wordwrap')(70);
const schemaPath = require.resolve('cubx-webpackage-document-api/lib/jsonSchema/manifestWebpackage-9.1.2.schema.json');
const schema = JSON.parse(require('fs').readFileSync(schemaPath));
const path = require('path');

module.exports = function (grunt) {
  const activeWebpackage = grunt.config.get('activeWebpackage');

  const regexLib = {
    artifactName: new RegExp(schema.definitions.appArtifact.properties.artifactId.pattern)
  };

  const options = {
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
