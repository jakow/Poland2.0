var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell')
var sass = require('gulp-sass');
var wiredep = require('wiredep').stream;
var autoprefixer = require('gulp-autoprefixer');

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']

,
	'style': {
		all: './src/scss/**/*.scss',
		output: './public/styles/'
	},
	'extSass': ['./bower_components/foundation-sites/scss','./bower_components/font-awesome/scss', './bower_components/motion-ui/src'],
	'jade': './src/templates/**/*.jade',
	'js': [
		'src/js/**/*/js',
		'./bower_components/foundation-sites/js/**/*.js'
	]

};

// gulp.task('wiredep', function () {
//   gulp.src(paths.jade)
//     .pipe(wiredep({
//     	ignorePath: '../../../bower_components/'
//     }))
//     .pipe(gulp.dest('./templates'));
// });
// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint({esversion:6}))
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.watch(paths.src, ['lint']);
});


gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(sass({includePaths: paths.extSass}).on('error', sass.logError))
		//.pipe(autoprefixer())
		.pipe(gulp.dest(paths.style.output));
});


gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [

  'watch:sass',

  'watch:lint'
]);

gulp.task('default', ['sass', 'lint']);
