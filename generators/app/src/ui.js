'use strict';

module.exports = function (GulpAngularAMDGenerator) {
  /**
   * Add files of the navbar and the main view depending on the ui framework
   * and the css preprocessor
   */
  GulpAngularAMDGenerator.prototype.uiFiles = function uiFiles() {
    this.files.push({
      src: 'src/views/' + this.props.ui.key + '/__navbar.html',
      dest: 'src/views/navbar.html',
      template: false
    });

    /*
    if (this.props.router.module !== null) {
      this.files.push({
        src: 'src/app/main/__' + this.props.ui.key + '.html',
        dest: 'src/app/main/main.html',
        template: true
      });
    }
    */

    this.files.push({
      src: 'src/styles/' + this.props.ui.key + '/**/*.' + this.props.cssPreprocessor.extension,
      dest: 'src/' + this.props.cssPreprocessor.extension + '/',
      template: true
    });

    /*
    this.files.push({
      src: 'src/app/components/malarkey/__malarkey.' + this.props.cssPreprocessor.extension,
      dest: 'src/app/components/malarkey/malarkey.' + this.props.cssPreprocessor.extension,
      template: false
    });

    this.files.push({
      src: 'src/app/components/navbar/__navbar.' + this.props.cssPreprocessor.extension,
      dest: 'src/app/components/navbar/navbar.' + this.props.cssPreprocessor.extension,
      template: false
    });
    */
  };
};
