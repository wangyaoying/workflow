/**
 * Created by 执笔流年 on 2018/1/10.
 */
'use strict'
/**
 * 1、less编译、压缩、合并
 * 2、js合并、压缩、混淆
 * 3、img复制
 * 4、html压缩
 * 
 * */
//使用gulpfile先载入gulp包，因为这个包中提供了一些API
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
//1、less编译、压缩、合并
gulp.task('style', function () {
    gulp.src('src/styles/*.less')
        .pipe(less())
        //.pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload(
            {stream:true}
        ));

})

//2、js合并、压缩、混淆
gulp.task('script', function () {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload( {stream:true}));
});

//3、img复制
gulp.task('image', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload( {stream:true}));
})

//4、html压缩
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload( {stream:true}));
});

//5.自动刷新


gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: ['dist']
        }
    });

    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);





// 代理

    //gulp.task('browser-sync', function() {
    //    browserSync.init({
    //        proxy: "你的域名或IP"
    //    });
    //});
});