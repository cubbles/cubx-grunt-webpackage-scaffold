/* global module,require */
'use strict';

module.exports = function (grunt) {
  // define a task starting with '+' if your task should be listed as one of the top tasks
  grunt.registerTask('+createWebpackage', 'Scaffold a new Cubbles-Webpackage.', function () {
    const updateWorkspaceConfig = function (answers, done) {
      const workspaceConfigPath = grunt.config.get('workspaceConfigPath');
      const workspaceConfigJSON = grunt.file.readJSON(workspaceConfigPath);
      workspaceConfigJSON.activeWebpackage = answers.wpCommonName;
      grunt.file.write(workspaceConfigPath, JSON.stringify(workspaceConfigJSON, null, 2));
      grunt.log.writeln('Note: The created Webpackage is the new \'activeWebpackage\' (@see .workspace)');
      done();
    };
    const options = require('../lib/config/webpackage-options.js')(grunt);
    require('../lib/scaffolder.js')(grunt, this, options, updateWorkspaceConfig);
  });
};
