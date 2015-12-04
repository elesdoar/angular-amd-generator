'use strict';

var _ = require('lodash');

module.exports = function (GulpAngularAMDGenerator) {
  /**
   * Compute Angular's module to load and format the dependency list to insert
   */
  GulpAngularAMDGenerator.prototype.computeModules = function computeModules() {
    var ngModules = this.props.angularModules.map(function (module) {
      return module.module;
    });

    ngModules = ngModules.concat([
      this.props.router.module,
      this.props.ui.module,
      this.props.bootstrapComponents.module,
    ]);

    ngModules.push('toastr');

    this.modulesDependencies = ngModules
      .filter(_.isString)
      .map(function (dependency) {
        return '\'' + dependency + '\'';
      })
      .join(', ');
  };

  /**
   * Simplify the model to simplify access to angular modules from the templates
   */
  GulpAngularAMDGenerator.prototype.prepareAngularModules = function prepareAngularModules() {
    this.angularModulesObject = {};

    this.props.angularModules.forEach(function (module) {
      this[module.key] = module.module;
    }, this.angularModulesObject);
  };
};
