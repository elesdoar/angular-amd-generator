'use strict';

// var _ = require('lodash');

module.exports = function(GulpAngularAMDGenerator) {
  /**
   * Prepare Bower overrides property to fix external bower.json with missing
   * or incomplete main property (needed by wiredep)
   */
  GulpAngularAMDGenerator.prototype.prepareBowerOverrides = function prepareBowerOverrides() {
  };

  /**
   * Compute wiredep exclusions depending on the props
   */
  GulpAngularAMDGenerator.prototype.computeWiredepExclusions = function computeWiredepExclusions() {
  };
};
