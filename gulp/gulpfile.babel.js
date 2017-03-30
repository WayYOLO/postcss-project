import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import cssnext from 'postcss-cssnext';
import precss from 'precss';
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';
import cssimport from 'postcss-import';
import mqpacker from 'css-mqpacker';
import browserSync from 'browser-sync';

// let create = browserSync.create();
// let reload = create.reload;

gulp.task('css',() => {
	const plugins = [
		// autoprefixer({browsers:['last 3 version']}), //postcss-cssnext已包含autoprefixer，可不引入
		// stylelint,
		cssimport,
		cssnext,
		// precss,
		mqpacker

	];
	return gulp.src('./src/css/*.css')
	.pipe(sourcemaps.init())
	.pipe(postcss(plugins))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./dist/css'))
})

gulp.task('stylelint',() => {
	const plugins = [
		stylelint,
		reporter({
			clearMassages:true,
			throwError:true
		})
	];
	return gulp.src('./src/css/**/*.css')
	.pipe(postcss(plugins))
})

gulp.task('reloadCss',['css'],() => {
	return gulp.src('./dist/css/*.css')
	.pipe(browserSync.reload({stream: true}));
})

gulp.task('sever',['reloadCss'],() => {
	browserSync.init({
		server: "./"
	});
	gulp.watch('./src/css/**/*.css', ['reloadCss']);
	gulp.watch(['index.html']).on('change', browserSync.reload);
})

gulp.task('default',['sever']);