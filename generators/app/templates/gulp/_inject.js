'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var tasks = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('inject', ['styles'], function () {
<% if (props.cssPreprocessor.key !== 'noCssPrepro') { -%>
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/css/**/*.css')
  ], { read: false });
<% } else { -%>
  var injectStyles = gulp.src([
    path.join(conf.paths.src, '/styles/css/**/*.css')
  ], { read: false });
<% } -%>
  var injectOptions = {
    ignorePath: [conf.paths.src],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe(tasks.inject(injectStyles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, './')));
});
