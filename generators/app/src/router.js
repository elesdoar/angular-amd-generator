'use strict';

module.exports = function (GulpAngularAMDGenerator) {
  /**
   * Configure routing by defining what to add in the index.html and what in the app.js
   */
  GulpAngularAMDGenerator.prototype.computeRouter = function computeRouter() {
    var routerPartialSrc = 'views/' + this.props.ui.key + '/home/__body.html';
    if(['angular-route', 'ui-router', 'new-router'].indexOf(this.props.router.key) !== -1) {
      this.files.push({
        src: 'src/js/home/' + this.props.router.key + '/routes.' + this.props.jsPreprocessor.srcExtension,
        dest: 'src/js/home/routes.' + this.props.jsPreprocessor.extension,
        template: true
      });
      switch (this.props.router.key) {
        case 'angular-route':
          this.routerHtml = '<div ng-view></div>';
          break;
        case 'ui-router':
          this.routerHtml = '<div ui-view></div>';
          break;
        case 'new-router':
          this.routerHtml = '<div ng-viewport ng-controller="RouterController"></div>';
          break;
      }
    } else {
      this.routerHtml = this.fs.read(this.templatePath(routerPartialSrc));
      this.routerHtml = this.routerHtml.replace(
        /^<div ([^>]*)>/,
        '<div $1 ng-controller="MainController as main">'
      );

      this.routerHtml = this.routerHtml.replace(/\n/g, '\n    ');
    }
  };
};
