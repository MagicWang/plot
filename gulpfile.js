var gulp = require('gulp');
var amdOptimize = require("amd-optimize");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var replace = require('gulp-replace');
var cssnano = require('gulp-cssnano');

gulp.task('compact-goog', function () {
    return gulp.src(['./lib/goog/base.js',
        './lib/goog/idisposable.js',
        './lib/goog/disposable.js',
        './lib/goog/eventid.js',
        './lib/goog/event.js',
        './lib/goog/error.js',
        './lib/goog/nodetype.js',
        './lib/goog/string.js',
        './lib/goog/asserts.js',
        './lib/goog/array.js',
        './lib/goog/object.js',
        './lib/goog/util.js',
        './lib/goog/browser.js',
        './lib/goog/engine.js',
        './lib/goog/reflect.js',
        './lib/goog/useragent.js',
        './lib/goog/eventtype.js',
        './lib/goog/browserfeature.js',
        './lib/goog/browserevent.js',
        './lib/goog/entrypointregistry.js',
        './lib/goog/listenable.js',
        './lib/goog/listener.js',
        './lib/goog/listenermap.js',
        './lib/goog/events.js'])
       .pipe(concat('goog.js'))
       .pipe(uglify())
       .pipe(gulp.dest('./build/'))
       .pipe(gulp.dest('./sample/static/js'))
       .pipe(notify({ message: 'compact-goog task complete' }));
});
gulp.task('compact-goog-debug', function () {
    return gulp.src(['./lib/goog/base.js',
        './lib/goog/idisposable.js',
        './lib/goog/disposable.js',
        './lib/goog/eventid.js',
        './lib/goog/event.js',
        './lib/goog/error.js',
        './lib/goog/nodetype.js',
        './lib/goog/string.js',
        './lib/goog/asserts.js',
        './lib/goog/array.js',
        './lib/goog/object.js',
        './lib/goog/util.js',
        './lib/goog/browser.js',
        './lib/goog/engine.js',
        './lib/goog/reflect.js',
        './lib/goog/useragent.js',
        './lib/goog/eventtype.js',
        './lib/goog/browserfeature.js',
        './lib/goog/browserevent.js',
        './lib/goog/entrypointregistry.js',
        './lib/goog/listenable.js',
        './lib/goog/listener.js',
        './lib/goog/listenermap.js',
        './lib/goog/events.js'])
       .pipe(concat('goog.debug.js'))
       .pipe(gulp.dest('./build/'))
       .pipe(gulp.dest('./sample/static/js'))
       .pipe(notify({ message: 'compact-goog-debug task complete' }));
});
gulp.task('compact-js', function () {
    return gulp.src(['./src/**/*.js'])
       //.pipe(amdOptimize("PlotDraw"))
       //.pipe(concat('plot.js'))
       .pipe(uglify())
       .pipe(gulp.dest('./build/'))
       .pipe(gulp.dest('./sample/static/js'))
       //.pipe(notify({ message: 'compact-js task complete' }));
});

gulp.task('compact-js-debug', function () {
    return gulp.src(['./src/**/*.js'])
        //.pipe(concat('plot.debug.js'))
        .pipe(gulp.dest('./build/'))
        .pipe(gulp.dest('./sample/static/js'));
        //.pipe(notify({ message: 'compact-js-debug task complete' }))
});

gulp.task('compact-css', function () {
    return gulp.src('src/*.css')
        .pipe(concat('plot.css'))
        .pipe(gulp.dest('./build/'))
        .pipe(gulp.dest('./sample/static/css'))
        .pipe(cssnano());
        //.pipe(notify({ message: 'compact-css task complete' }))
});
gulp.task('watch', function () {
    var jsWatch = gulp.watch('./src/**/*.js', ['compact-js', 'compact-js-debug']);
    jsWatch.on('change', function (e) {
        console.log('File ' + e.path + ' was ' + e.type + ', running compact js ...');
    });
    var cssWatch = gulp.watch('./src/*.css', ['compact-css']);
    cssWatch.on('change', function (e) {
        console.log('File ' + e.path + ' was ' + e.type + ', running compact css ...');
    });
});
gulp.task('default', ['compact-js', 'compact-js-debug', 'compact-css', 'watch']);