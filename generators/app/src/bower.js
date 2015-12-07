'use strict';

var _ = require('lodash');

module.exports = function(GulpAngularAMDGenerator) {
  /**
   * Prepare Bower overrides property to fix external bower.json with missing
   * or incomplete main property (needed by wiredep)
   */
  GulpAngularAMDGenerator.prototype.prepareBowerOverrides = function prepareBowerOverrides() {
    var bowerOverrides = {};

    if (this.props.router.key === 'new-router') {
      bowerOverrides['angular-new-router'] = {
        main: ['dist/router.es5.js']
      };
    }

    if (_.isEmpty(bowerOverrides)) {
      this.bowerOverrides = null;
    } else {
      this.bowerOverrides = JSON.stringify(bowerOverrides, null, 2)
        .replace(/\n/g, '\n  ');
    }
  };

  /**
   * Compute wiredep exclusions depending on the props
   */
  GulpAngularAMDGenerator.prototype.computeWiredepExclusions = function computeWiredepExclusions() {
  };
};
