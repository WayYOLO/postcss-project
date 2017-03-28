import gulp from 'gulp';
import postcss from 'gulp-postcss';

gulp.task('css',() => {
	const plugins = [];
	return gulp.src('./src/css/*.css')
	.pipe(postcss(plugins))
	.pipe(gulp.dest('./dist/css'));
})

gulp.task('default',['css']);