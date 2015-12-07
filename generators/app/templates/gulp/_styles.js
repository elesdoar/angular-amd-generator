'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var tasks = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', function () {
<% if (props.cssPreprocessor.key === 'less') { -%>
  var lessOptions = {
    options: [
      'bower_components',
      conf.paths.src
    ]
  };
<% } if (props.cssPreprocessor.extension === 'scss') { -%>
  var sassOptions = {
    style: 'expanded'
  };
<% } -%>

<% if (props.cssPreprocessor.key === 'ruby-sass') { -%>
  var cssFilter = tasks.filter('**/*.css', { restore: true });
<% } -%>

  return gulp.src([
    path.join(
      conf.paths.src,
      '/styles/<%- props.cssPreprocessor.extension %>/**/*.<%- props.cssPreprocessor.extension %>'
    )
  ])
  <% if (props.cssPreprocessor.key === 'ruby-sass') { -%>
  .pipe(tasks.rubySass(sassOptions)).on('error', conf.errorHandler('RubySass'))
  .pipe(cssFilter)
  .pipe(tasks.sourcemaps.init({ loadMaps: true }))
  <% } else { -%>
  .pipe(tasks.sourcemaps.init())
  <% } if (props.cssPreprocessor.key === 'less') { -%>
  .pipe(tasks.less(lessOptions)).on('error', conf.errorHandler('Less'))
  <% } else if (props.cssPreprocessor.key === 'node-sass') { -%>
  .pipe(tasks.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
  <% } else if (props.cssPreprocessor.key === 'stylus') { -%>
  .pipe(tasks.stylus()).on('error', conf.errorHandler('Stylus'))
  <% } -%>
  .pipe(tasks.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
  .pipe(tasks.sourcemaps.write())
  <% if (props.cssPreprocessor.key === 'ruby-sass') { -%>
  .pipe(cssFilter.restore)
  <% } -%>
  .pipe(gulp.dest(path.join(conf.paths.tmp, '/css/')))
  .pipe(browserSync.reload({ stream: true }));
});
