/*global module,require*/
'use strict';
var wrap = require('wordwrap')(70);
var schemaPath = require.resolve('cubx-webpackage-document-api/lib/jsonSchema/manifestWebpackage-8.3.0.schema');
var schema = JSON.parse(require('fs').readFileSync(schemaPath));

module.exports = function (grunt) {

  var regexLib = {
    packageName: new RegExp(schema.properties.name.pattern),
    packageGroupId: new RegExp(schema.properties.groupId.pattern),
    personName: new RegExp(schema.definitions.person.properties.name.pattern),
    personEmail: new RegExp(schema.definitions.person.properties.email.pattern)
  };

  var options = {
    questions: [
      {
        name: 'wpName',
        type: 'input',
        message: 'WebPackage name (e.g. \'my-package\'):',
        validate: function (input) {
          if (!regexLib.packageName.test(input)) {
            return wrap('Please provide a valid value like \'my-super-package\'');
            //(regex=' + regexLib.packageName + ').';
          }
          return true;
        }
      },
      {
        name: 'wpAuthorName',
        type: 'input',
        message: 'Your name (as the author of the package):',
        validate: function (input) {
          if (!regexLib.personName.test(input)) {
            return wrap('Please provide a valid value like \'John Doe\'');
            //(regex=' + regexLib.personName + ').');
          }
          return true;
        }
      },
      {
        name: 'wpAuthorEmail',
        type: 'input',
        message: 'Your eMail:',
        validate: function (input) {
          if (!regexLib.personEmail.test(input)) {
            return wrap('Please provide a valid value like \'john.doe@email.com\'');
            //(regex=' + regexLib.personEmail + ').';
          }
          return true;
        }
      },
      {
        name: 'wpGroupId',
        type: 'input',
        message: wrap('WebPackage groupId (optional, expected to start with your reversed ' +
          'mail-domain):'),
        validate: function (input) {
          if (input.length === 0) {
            return true;
          }
          if (!regexLib.packageGroupId.test(input)) {
            return wrap('Please provide a valid value like \'my.domain\'');
            //(regex=' + regexLib.packageGroupId + ').';
          }
          return true;
        }
      }
    ],
    processAnswers: function (result) {
      if (result.wpGroupId) {
        result.wpCommonName = result.wpGroupId + '.' + result.wpName;
      } else {
        result.wpCommonName = result.wpName;
      }
    },
    template: {
      // <source>: <target> used by the scaffolder to copy template files
      './skeletons/webpackage': '{{wpCommonName}}'
    }
  };
  return options;
};
