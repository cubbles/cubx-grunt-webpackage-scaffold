/*global module,require*/
'use strict';

module.exports = function (grunt) {
  // define a task starting with '+' if your task should be listed as one of the top tasks
  grunt.registerTask('_createWebpackageDemo', 'Scaffold a Demo-Webpackage.', function () {
    var updateWorkspaceConfig = function (answers, done) {
      var workspaceConfigPath = grunt.config.get('workspaceConfigPath');
      var workspaceConfigJSON = grunt.file.readJSON(workspaceConfigPath);
      workspaceConfigJSON.activeWebpackage = answers.wpCommonName;
      grunt.file.write(workspaceConfigPath, JSON.stringify(workspaceConfigJSON, null, 2));
      grunt.log.writeln('Note: The created Webpackage is the new \'activeWebpackage\' (@see .workspace)');
      done();
    };

    var options = require('../lib/config/webpackage-demo-options.js')(grunt);
    require('../lib/scaffolder.js')(grunt, this, options, updateWorkspaceConfig);
  });
};
