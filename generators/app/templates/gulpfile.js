var gulp        = require("gulp");
var browserify  = require("browserify");
var browserSync = require("browser-sync").create();
var source      = require("vinyl-source-stream");
var tsify       = require("tsify");
var sass        = require("gulp-sass");
var sourcemaps  = require("gulp-sourcemaps");
var clean       = require("gulp-clean");
var runSequence = require("run-sequence");
var uglify      = require('gulp-uglify');
var buffer      = require('vinyl-buffer');

var paths = {
	tscripts: {
		src: ["src/_typescript/**/*.ts"],
		dest: "src/script"
	},
	html:{
		views: ["src/views/**/*.html", "src/index.html"],
		main: "src/index.html",
		dest: "dist/views/**/*.html"
	},
	sass: {
		src: ["src/_sass/**/*.sass"],
		dest: "src/styles",
		release: "dist/styles"
	},
	fonts: {
		src: ["src/fonts/**/*.*"],
		dest: "dist/fonts"
	},
	images: {
		src: ["src/images/**/*.{png,jpeg,jpg,svg}"],
		dest: "dist/images"
	},
	vendor: {
		src: ["src/vendor/**/*.*"],
		dest: "dist/vendor"
	},
	src: "src",
	dist: "dist"
};

gulp.task("clean", function () {
  return gulp.src(paths.dist,{read: false})
  	.pipe(clean());
});

gulp.task("compile:sass", function () {
  return gulp.src(paths.sass.src)
    .pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed', includePaths: [paths.sass.src]}).on("error", sass.logError))
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest(paths.sass.dest))
		.pipe(browserSync.stream({ match: "**/*.css" }));
});

gulp.task("bundle:ts", function (done) {
	return browserify({
		basedir: ".",
		debug: true,
		entries: ["src/_typescript/main.ts"],
		cache: {},
		packageCache: {}
	})
		.plugin(tsify)
		.bundle()
		.on("error", function (error) { 
			console.error(error.toString()); 
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify({ mangle: false }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.tscripts.dest));
});

gulp.task("default", ["compile:sass", "bundle:ts"], function(){});

gulp.task("watch", ["default"], function () {

	browserSync.init({
		open: false,
		port: 8000,
		files: ["!**/*.maps.css", "!**/*.css"],
		server: [paths.src]
	});

	gulp.watch(paths.tscripts.src, ["ts-watch"]);
	gulp.watch(paths.html.views).on("change", browserSync.reload);
	gulp.watch(paths.sass.src, ["compile:sass"]).on("change", reportChange);
	gulp.watch(paths.images.src).on("change", browserSync.reload);
	gulp.watch(paths.fonts.src).on("change", browserSync.reload);
	gulp.watch(paths.vendor.src).on("change", browserSync.reload);
});

gulp.task("ts-watch", ["bundle:ts"], function (done) {
    browserSync.reload();
    done();
});

gulp.task("copy", function () {
	return gulp.src([
		"!src/_sass",
		"!src/_sass/**",
		"!src/_typescript",
		"!src/_typescript/**",
		"src/**/*"
	])
		.pipe(gulp.dest(paths.dist))
		.on("error", function (error) { console.error(error.toString()); })
})

gulp.task("release", function () {
	runSequence("clean", "default", "copy");
});

function reportChange(event) {
	console.log("File " + event.path + " was " + event.type);
}