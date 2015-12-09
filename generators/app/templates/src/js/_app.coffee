'use strict';

define ['angularAMD', 'angular-ui-router', 'angular-bootstrap'], (angularAMD) ->
  angular.module '<%- appName %>', ['ui.bootstrap', 'ui.router']
  app = angular.module '<%- appName %>'
  angularAMD.bootstrap app
