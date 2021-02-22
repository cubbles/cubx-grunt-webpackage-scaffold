/* global module,require,__dirname */
'use strict';

const inquirer = require('inquirer');
const mustache = require('mustache');
const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

module.exports = function (grunt, task, options, answersCallback) {
  const workspacePath = grunt.config.get('workspacePath');

  const _copyAndRenderFiles = function (result) {
    const templateDefinitions = options.template || {};
    const skeletonDir = path.join(__dirname, '../');

    if (options.filter && _.isFunction(options.filter)) {
      result = options.filter(result);
    }

    Object.keys(templateDefinitions).forEach(function (key) {
      const template = path.join(skeletonDir, key);
      const dist = path.join(workspacePath, mustache.render(templateDefinitions[key], result));
      const distDir = path.dirname(dist);
      grunt.verbose.writeln('template target: ' + dist);

      if (fs.statSync(template).isFile()) {
        // key is assumed to be a file
        grunt.verbose.writeln('write file: ' + template);
        fs.mkdirsSync(distDir);
        fs.writeFileSync(
          dist,
          mustache.render(
            fs.readFileSync(template, 'utf-8'),
            result
          )
        );
      } else {
        // key is expected to be a directory
        grunt.verbose.writeln('make directory: ' + distDir);

        fs.mkdirsSync(distDir);

        try {
          fs.statSync(dist);
          // fail.warn: Grunt will continue processing tasks if the --force command-line option was specified.
          grunt.fail.warn('Folder already exists: ' + dist + '.');
        } catch (e) {
          grunt.verbose.writeln('Folder does not exist: ' + dist);
          // proceed in case of an error, as we explicitly want to create the folder
        }
        grunt.verbose.writeln('copy template(s) from: ' + template);
        grunt.verbose.writeln('                 to: ' + dist);
        try {
          fs.copySync(template, dist);
        } catch (err) {
          grunt.fail.writeln('Faild by copy from ' + template + ' to ' + dist + '(' + err.message + ')');
        }
        grunt.verbose.writeln('start rendering files in: ' + dist);
        const walk = function (dir) {
          let results = [];
          const list = fs.readdirSync(dir);
          list.forEach(function (file) {
            file = path.join(dir, file);
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
              /* Recurse into a subdirectory */
              results = results.concat(walk(file));
            } else {
              /* Is a file */
              results.push(file);
            }
          });
          return results;
        };
        let results;
        try {
          results = walk(dist);
        } catch (err) {
          grunt.fail.writeln('Failed to replace templaes: ' + err.message);
          results = [];
        }
        results.forEach((file) => {
          grunt.verbose.writeln('render file: ' + file);
          if (fs.statSync(file).isFile()) {
            fs.writeFileSync(
              mustache.render(file, result),
              mustache.render(
                fs.readFileSync(file, 'utf-8'),
                result
              ),
              'utf-8'
            );
            if (file.match(/(.)*({{)(.)*/)) {
              grunt.verbose.writeln('unlink: ' + file);
              fs.unlink(file, function (err) {
                console.error(err);
              });
            }
          }
        });

        // wrench.readdirSyncRecursive(dist).forEach(function (file) {
        //   file = path.join(dist, file);
        //   grunt.verbose.writeln('render file: ' + file);
        //   if (fs.statSync(file).isFile()) {
        //     fs.writeFileSync(
        //       mustache.render(file, result),
        //       mustache.render(
        //         fs.readFileSync(file, 'utf-8'),
        //         result
        //       ),
        //       'utf-8'
        //     );
        //     if (file.match(/(.)*({{)(.)*/)) {
        //       grunt.verbose.writeln('unlink: ' + file);
        //       fs.unlink(file, function (err) {
        //         console.error(err);
        //       });
        //     }
        //   }
        // });
        grunt.verbose.writeln('finished rendering files in: ' + dist);
      }
    });
  };

  const questions = options.questions;

  if (options.before && _.isFunction(options.before)) {
    options.before();
  }

  if (questions) {
    const done = task.async();
    inquirer.prompt(questions).then((result) => {
      if (options.processAnswers && _.isFunction(options.processAnswers)) {
        options.processAnswers(result);
      }
      // Step 1
      _copyAndRenderFiles(result);
      // Step 2 (for artifacts)
      if (answersCallback) {
        answersCallback(result, done);
      } else {
        done();
      }
    });
  } else {
    _copyAndRenderFiles({});
  }
};
