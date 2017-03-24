var gulp        = require("gulp");
var browserify  = require("browserify");
var browserSync = require("browser-sync");
var source      = require('vinyl-source-stream');
var tsify       = require("tsify");
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var clean       = require('gulp-clean');

var paths = {
	tscripts: {
		src: ["src/**/*.ts"],
		dest: "dist"
	},
	html:{
		views: ["src/**/*.html", "index.html"],
		main: "src/index.html",
		dest: "dist/views/**/*.html"
	},
	sass: {
		src: ["src/styles/**/*.sass"],
		dest: "./dist/styles"
	},
	fonts: {
		src: ["src/fonts/**/*.*"],
		dest: "./dist/fonts"
	},
	images: {
		src: ["src/images/**/*.{png,jpeg,jpg,svg}"],
		dest: "./dist/images"
	},
	dist: "dist"
};

gulp.task("clean", function () {
    return gulp.src(paths.dist + "/*.*",{read: false})
        .pipe(clean());
});


gulp.task("copy-html", function () {
    return gulp.src(paths.html.views)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-images', function() {  
  gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('copy-fonts', function() {  
  gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('compile:sass', function () {
  return gulp.src(paths.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task("default", ["copy-html", "compile:sass", "copy-images", "copy-fonts"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("serve", function (done) {
	browserSync({
		open: false,
		port: 9000,
		server: {
			baseDir: [paths.dist],
			middleware: function (req, res, next) {
				res.setHeader("Access-Control-Allow-Origin", "*");
				next();
			}
		}
	}, done);
});

gulp.task("watch", ["clean", "default", "serve"], function () {
	gulp.watch(paths.tscripts.src, ["default", browserSync.reload]).on("change", reportChange);
	gulp.watch(paths.html.views, ["copy-html", browserSync.reload]).on("change", reportChange);
	gulp.watch(paths.sass.src, ["compile:sass", browserSync.reload]).on("change", reportChange);
	gulp.watch(paths.images.src, ["copy-images", browserSync.reload]).on("change", reportChange);
	gulp.watch(paths.fonts.src, ["copy-fonts", browserSync.reload]).on("change", reportChange);
});

gulp.task("release", ["clean", "default"], function () {

});


function reportChange(event) {
	console.log("File " + event.path + " was " + event.type);
}