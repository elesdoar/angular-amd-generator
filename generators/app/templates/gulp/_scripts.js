'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync');

<% if (props.jsPreprocessor.srcExtension === 'es6' || props.jsPreprocessor.key === 'typescript') { -%>
var webpack = require('webpack-stream');
<% } -%>

var tasks = require('gulp-load-plugins')();

<% if (props.jsPreprocessor.srcExtension !== 'es6' && props.jsPreprocessor.key !== 'typescript') { -%>
gulp.task('scripts', function () {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.<%- props.jsPreprocessor.extension %>'))
  <% if (props.jsPreprocessor.extension === 'js') { -%>
    .pipe(tasks.eslint())
    .pipe(tasks.eslint.format())
  <% } if (props.jsPreprocessor.key !== 'noJsPrepro') { -%>
    .pipe(tasks.sourcemaps.init())
  <% } if (props.jsPreprocessor.key === 'coffee') { -%>
    .pipe(tasks.coffeelint())
    .pipe(tasks.coffeelint.reporter())
    .pipe(tasks.coffee()).on('error', conf.errorHandler('CoffeeScript'))
  <% } if (props.jsPreprocessor.key !== 'noJsPrepro') { -%>
    .pipe(tasks.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/js')))
  <% } -%>
    .pipe(browserSync.reload({ stream: true }))
    .pipe(tasks.size());
});
<% } else { -%>
function webpackWrapper(watch, test, callback) {
  var webpackOptions = {
  <% if (props.jsPreprocessor.key === 'typescript') { -%>
    resolve: { extensions: ['', '.ts'] },
  <% } -%>
    watch: watch,
    module: {
    <% if (props.jsPreprocessor.extension === 'js') { -%>
      preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
    <% } if (props.jsPreprocessor.key === 'typescript') { -%>
      preLoaders: [{ test: /\.ts$/, exclude: /node_modules/, loader: 'tslint-loader'}],
    <% } -%>
    <% if (props.jsPreprocessor.key === 'babel') { -%>
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader']}]
    <% } if (props.jsPreprocessor.key === 'traceur') { -%>
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'traceur-loader']}]
    <% } if (props.jsPreprocessor.key === 'typescript') { -%>
      loaders: [{ test: /\.ts$/, exclude: /node_modules/, loaders: ['ng-annotate', 'awesome-typescript-loader']}]
    <% } -%>
    },
    output: { filename: 'index.module.js' }
  };

  if(watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function(err, stats) {
    if(err) {
      conf.errorHandler('Webpack')(err);
    }

    tasks.util.log(stats.toString({
      colors: tasks.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if(watch) {
      watch = false;
      callback();
    }
  };

  var sources = [ path.join(conf.paths.src, '/app/index.module.<%- props.jsPreprocessor.extension %>') ];
  if (test) {
    sources.push(path.join(conf.paths.src, '/app/**/*.spec.<%- props.jsPreprocessor.extension %>'));
  }

  return gulp.src(sources)
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/js')));
}

gulp.task('scripts', function () {
  return webpackWrapper(false, false);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
  return webpackWrapper(true, false, callback);
});

gulp.task('scripts:test', function () {
  return webpackWrapper(false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function (callback) {
  return webpackWrapper(true, true, callback);
});
<% } -%>
