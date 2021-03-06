var gulp = require('gulp');
var uglyfly = require('gulp-uglyfly');
var concat = require('gulp-concat');
var jsdoc = require('gulp-jsdoc3');

var srcFiles = [
    'src/helper.js'
];

var vendorFiles = [
    'bower_components/lodash/dist/lodash.min.js',
    'bower_components/sylvester/sylvester.js'
];

var dest = 'dist';

gulp.task('build', function () {
    gulp.src([].concat(vendorFiles, srcFiles))
        .pipe(concat('helper.js'))
        .pipe(gulp.dest(dest))
        .pipe(uglyfly())
        .pipe(concat('helper.min.js'))
        .pipe(gulp.dest(dest))
});

gulp.task('doc', function (cb) {
    var config = require('./jsdoc.json');
    gulp.src(['README.md'].concat(srcFiles), {read: false})
        .pipe(jsdoc(config, cb));
});

gulp.task('watch', function () {
    gulp.watch(srcFiles, ['default']);
});

gulp.task('default', ['build', 'doc'], function() {

});