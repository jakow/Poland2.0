var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

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

gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(sass({includePaths: paths.extSass}).on('error', sass.logError))
		//.pipe(autoprefixer())
		.pipe(gulp.dest(paths.style.output));
});


gulp.task('watch', [
  'watch:sass',
  'watch:lint'
]);

gulp.task('default', ['sass', 'lint']);
