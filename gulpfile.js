var gulp = require('gulp');
var uglyfly = require('gulp-uglyfly');
var concat = require('gulp-concat');
var jsdoc = require('gulp-jsdoc3');

var jsFiles = [
    'bower_components/lodash/dist/lodash.min.js',
    'bower_components/sylvester/sylvester.js',
    'src/helper.js'
];

gulp.task('build', function () {
    gulp.src(jsFiles)
        .pipe(uglyfly())
        .pipe(concat('helper.min.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('doc', function (cb) {
    var config = require('./jsdoc.json');
    gulp.src(['README.md'].concat(jsFiles), {read: false})
        .pipe(jsdoc(config, cb));
});

gulp.task('default', ['build'], function() {

});