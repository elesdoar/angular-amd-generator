'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var pkg = require('../../package.json');

var GulpAngularAMDGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // Define arguments
    this.argument('appName', {
      type: String,
      required: false
    });

    this.version = pkg.version;

    this.props = {};
  },

  /**
   * Shows yeoman says his greatings unless the skip option is set
   */
  info: function () {
    if (!this.options['skip-welcome-message']) {
      this.log(yosay(
        chalk.red('Welcome!') + '\n' +
        chalk.green('You\'re using the fantastic generator for scaffolding an application with Angular, RequireJS and Gulp!')
      ));
    }
  }
});

require('./src/options')(GulpAngularAMDGenerator);
require('./src/prompts')(GulpAngularAMDGenerator);
require('./src/paths')(GulpAngularAMDGenerator);
require('./src/files')(GulpAngularAMDGenerator);

require('./src/modules')(GulpAngularAMDGenerator);
require('./src/techs')(GulpAngularAMDGenerator);
require('./src/ui')(GulpAngularAMDGenerator);
require('./src/router')(GulpAngularAMDGenerator);
require('./src/preprocessors')(GulpAngularAMDGenerator);
require('./src/bower')(GulpAngularAMDGenerator);

require('./src/write')(GulpAngularAMDGenerator);

module.exports = GulpAngularAMDGenerator;
