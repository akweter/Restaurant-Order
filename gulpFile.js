//Use strict javascript..
'use stirct'

    //Requiring gulp mods
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        browserSync = require('gulp-browser-sync'),
        del = require('del'),
        imagemin = require('gulp-imagemin'),
        uglify = require('gulp-uglify'),
        usemin = require('gulp-usemin'),
        rev  = require('gulp-rev'),
        cleanCss = require('gulp-clesn-css'),
        flatmap = require('gulp-flatmap'),
        htmlmin = require('gulp-html');


    //Configuring gulp sass..
    gulp.task('sass', function() {
        //Gulp src represents the source files that creates a stream of object..
        return gulp.src('./css/*scss')

        //Pipe allows a set of functions to be passed through..
        .pipe(sass().on('error', sass.logError)).pipe(

        //Gulp dest specifies the destination of the files that has ben processed..
        gulp.dest('./css'));
        });

        //Configuring gulp watch for my files...   
        gulp.task('sass:watch', function() {
            gulp.watch('./css/*.scss', ['sass']);
        });

    //Configuring gulp browserSync for loading the page..
    gulp.task('browserSync', function() {
        var files = [
            './*.html', './css*.css', './js*.js', './img/*.{png,jpg,jpeg,gif,img}'
        ];

        //Configuring broser Sync root..
            browserSync.init(files, {
                server: {
                    baseDir: './'
                }
            });
        });

    //Configuring build for my functions..
    gulp.task('default', ['browser-sync'], function() {
        gulp.start('sass:watch');
    });



    gulp.task('clean', function() {
        return del(['dist']);
    });

    gulp.task('copyfonts', function() {
        gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
    });

    gulp.task('imagemin', function() {
    return gulp.src('img/*.{png,jpg,gif,img,jpeg}').pipe(imagemin({opptimizationLevel: 3, progressive: true, interlaced: true,})).pipe(gulp.dest('dist/img'));
});

    gulp.task('usemin', function() {
        return gulp.src('./*.html').pipe(flatmap(function(stream, file) {
            return stream.pipe(usemin({
                css: [rev()],
                html: [ function () {
                    return htmlmin({collapseWhitespace: true})
                }],
                js: [ uglify(), rev()],
                inlinejs: [uglify()],
                inlinecss: [ cleanCss()],
            }))
        }))
        .pipe(gulp.dest('dest/'));
    });






    gulp.task('build', ['clean', function() {
        gulp.start('copyfonts', 'imagemin', 'usemin');
    }]);
