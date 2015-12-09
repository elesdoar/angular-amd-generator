'use strict';

define(['angularAMD', 'angular-ui-router', 'angular-bootstrap'], function (angularAMD) {
  angular.module('<%- appName %>', ['ui.bootstrap', 'ui.router']);
  var app = angular.module('<%- appName %>');
  return angularAMD.bootstrap(app);
});
