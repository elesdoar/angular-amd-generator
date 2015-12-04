'use strict';

var path = require('path');
var s = require('underscore.string');
var options = require('../options.json');

module.exports = function (GulpAngularAMDGenerator) {
  /**
   * Declares options in the generator (only used for the help messages)
   */
  GulpAngularAMDGenerator.prototype.defineOptions = function defineOptions() {
    options.forEach(function (option) {
      this.option(option.name, {
        type: global[option.type],
        required: option.required,
        desc: option.desc,
        defaults: option.defaults
      });
    }, this);
  };
  /**
   * Determine the appName either from the current directory or the parameter of the generator
   */
  GulpAngularAMDGenerator.prototype.determineAppName = function determineAppName() {
    this.appName = this.appName || path.basename(process.cwd());
    this.appName = s.camelize(s.slugify(s.humanize(this.appName)));
  };
};
