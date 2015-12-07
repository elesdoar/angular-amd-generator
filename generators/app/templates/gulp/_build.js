'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var tasks = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

<% if (props.htmlPreprocessor.key === 'noHtmlPrepro') { -%>
gulp.task('templates', function () {
<%} else { -%>
gulp.task('templates', ['markups'], function () {
<%} -%>
  return gulp.src([
    path.join(conf.paths.src, '/views/**/*.html')
  ]).pipe(tasks.minifyHtml({
    empty: true,
    spare: true,
    quotes: true
  })).pipe(tasks.angularTemplatecache('templateCacheHtml.js', {
    module: '<%- appName %>',
    root: conf.dist
  })).pipe(gulp.dest(conf.paths.tmp + '/templates/'));
});

// TODO Autoinject CSS files
gulp.task('html', ['inject', 'templates'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/templates/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/templates'),
    addRootSlash: false
  };

  var htmlFilter = tasks.filter('*.html', { restore: true });
  var cssFilter = tasks.filter('**/*.css', { restore: true });

  return gulp.src(path.join(conf.paths.tmp, '/*.html'))
    .pipe(tasks.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(cssFilter)
    .pipe(tasks.sourcemaps.init())
    .pipe(tasks.minifyCss({ processImport: false }))
    .pipe(tasks.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(tasks.useref())
    .pipe(tasks.revReplace())
    .pipe(htmlFilter)
    .pipe(tasks.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe(tasks.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

<% if (imageMin) { -%>
gulp.task('images', function () {
  return gulp.src(path.join(conf.paths.src, '/images/**/*'))
    .pipe(tasks.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/images/')));
});
<% } -%>

gulp.task('clean', function () {
<% if (props.jsPreprocessor.key === 'typescript') { -%>
  return tasks.del([
    path.join(conf.paths.dist, '/'),
    path.join(conf.paths.tmp, '/templates')
  ]);
<% } else { -%>
  return tasks.del([
    path.join(conf.paths.dist, '/'),
    path.join(conf.paths.tmp, '/')
  ]);
<% } -%>
});

<% if (imageMin) { -%>
gulp.task('build', ['html', 'images']);
<% } else { -%>
gulp.task('build', ['html']);
<% } -%>
