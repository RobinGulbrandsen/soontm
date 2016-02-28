var gulp = require("gulp");
var less = require("gulp-less");
var inject = require("gulp-inject");
var browserSync = require("browser-sync").create();
var del = require("del");
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task("less", function () {
    return gulp.src("./src/assets/style.less")
        .pipe(less())
        .pipe(gulp.dest("./dist/assets"));
});

gulp.task("less-page", function () {
    return gulp.src("./src/page/style.less")
        .pipe(less())
        .pipe(gulp.dest("./dist/page"));
});

gulp.task("assets", function () {
    return gulp.src("./src/assets/**/*.jpg")
        .pipe(gulp.dest("./dist/assets"));
});

gulp.task("js", function () {
    return browserify({ entries: "./src/main.js", extensions: [".js"], debug: true })
        .add(require.resolve("babel/polyfill"))
        .transform(babelify)
        .bundle()
        .pipe(source("script.js"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("js-page", function () {
    return browserify({ entries: "./src/page/script.js", extensions: [".js"], debug: true })
        .add(require.resolve("babel/polyfill"))
        .transform(babelify)
        .bundle()
        .pipe(source("script.js"))
        .pipe(gulp.dest("./dist/page"));
});

gulp.task("html-root", ["less", "assets", "js"], function () {
    var target = gulp.src("./src/index.html");
    var sources = gulp.src(["./dist/assets/style.css", "./dist/script.js"], { read: false });

    return target.pipe(inject(sources, { ignorePath: "/dist" }))
        .pipe(gulp.dest("./dist"));
});

gulp.task("html-page", ["less-page", "js-page"], function () {
    var target = gulp.src("./src/page/index.html");
    var sources = gulp.src(["./dist/page/style.css", "./dist/page/script.js"], { read: false });

    return target.pipe(inject(sources, { ignorePath: "/dist" }))
        .pipe(gulp.dest("./dist/page"));
});

gulp.task("serve", ["html-root", "html-page"], function () {
    browserSync.init({ server: "./dist" });
    gulp.watch("./src/**/*", ["html-root", "html-page"]);
    gulp.watch("dist/**/*").on("change", browserSync.reload);
});

gulp.task("clean", function (cb) {
    del(["./dist"], cb);
});

gulp.task("default", ["serve"]);
