var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');


gulp.task('bundle', function ()
{
	return browserify('src/App.js')
		.transform('babelify', {presets: ['react', 'es2015']})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('static/'));
});

gulp.task('watch', function ()
{

	var b = browserify({
		entries: ['src/App.js'],
		cache: {}, packageCache: {},
		plugin: ['watchify'],
		debug: true,
		sourceMaps: true
	});

	b.on('update', makeBundle);

	function makeBundle()
	{
		b.transform('babelify', {presets: ['react', 'es2015'], sourceMaps: true})
			.bundle()
			.on('error', function (err)
			{
				console.error(err.message);
				console.error(err.codeFrame);
			})
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('public/js/'));
		console.log("Bundle updated, success");
	}

	makeBundle();

	return b;
});

gulp.task('default', ['watch']);
