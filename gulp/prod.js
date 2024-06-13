const gulp = require('gulp');
const replace = require('gulp-replace');

// HTML
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const webpHTML = require('gulp-webp-retina-html');
const typograf = require('gulp-typograf');

// SASS
const postcss       = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webImagesCSS = require('gulp-web-images-css');  //Вывод WEBP-изображений

const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const changed = require('gulp-changed');

// Images
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const extReplace = require('gulp-ext-replace');
const webp = require('gulp-webp');

// SVG
const svgsprite = require('gulp-svg-sprite');

gulp.task('clean:prod', function (done) {
	if (fs.existsSync('./prod/')) {
		return gulp
			.src('./prod/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

gulp.task('html:prod', function () {
	return gulp
		.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
		.pipe(changed('./prod/'))
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSetting))
		.pipe(
			replace(
				/(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
				'$1./$4$5$7$1'
			)
		)
		.pipe(
			typograf({
				locale: ['ru', 'en-US'],
				htmlEntity: { type: 'digit' },
				safeTags: [
					['<\\?php', '\\?>'],
					['<no-typography>', '</no-typography>'],
				],
			})
		)
		.pipe(
			webpHTML({
				extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
				retina: {
					1: '',
					2: '@2x',
				},
			})
		)
		.pipe(htmlclean())
		.pipe(gulp.dest('./prod/'));
});

gulp.task('sass:prod', function () {
	const prt = require('postcss-responsive-type');
	const plugins = [
		prt()
	]
	return gulp
		.src('./src/scss/*.scss')
		.pipe(changed('./prod/css/'))
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sourceMaps.init())
		.pipe(autoprefixer())
		.pipe(sassGlob())
		.pipe(groupMedia())
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(
			webImagesCSS({
				mode: 'webp',
			})
		)
		.pipe(
			replace(
				/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
				'$1$2$3$4$6$1'
			)
		)
		.pipe(csso())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./prod/css/'));
});

gulp.task('images:prod', function () {
	return gulp
		.src(['./src/img/**/*', '!./src/img/svgicons/**/*'])
		.pipe(changed('./prod/img/'))
		// .pipe(
		// 	imagemin([
		// 		imageminWebp({
		// 			quality: 85,
		// 		}),
		// 	])
		// )
		.pipe(webp({
			quality: 80,
			preset: 'photo',
			method: 6
		}))
		// .pipe(extReplace('.webp'))
		.pipe(gulp.dest('./prod/img/'))
		.pipe(gulp.src('./src/img/**/*'))
		.pipe(changed('./prod/img/'))
		.pipe(
			imagemin(
				[
					imagemin.gifsicle({ interlaced: true }),
					imagemin.mozjpeg({ quality: 85, progressive: true }),
					imagemin.optipng({ optimizationLevel: 5 }),
				],
				{ verbose: true }
			)
		)
		.pipe(gulp.dest('./prod/img/'));
});

const svgStack = {
	mode: {
		stack: {
			example: true,
		},
	},
};

const svgSymbol = {
	mode: {
		symbol: {
			sprite: '../sprite.symbol.svg',
		},
	},
	shape: {
		transform: [
			{
				svgo: {
					plugins: [
						{
							name: 'removeAttrs',
							params: {
								attrs: '(fill|stroke)',
							},
						},
					],
				},
			},
		],
	},
};

gulp.task('svgStack:prod', function () {
	return gulp
		.src('./src/img/svgicons/**/*.svg')
		.pipe(plumber(plumberNotify('SVG:dev')))
		.pipe(svgsprite(svgStack))
		.pipe(gulp.dest('./prod/img/svgsprite/'));
});

gulp.task('svgSymbol:prod', function () {
	return gulp
		.src('./src/img/svgicons/**/*.svg')
		.pipe(plumber(plumberNotify('SVG:prod')))
		.pipe(svgsprite(svgSymbol))
		.pipe(gulp.dest('./prod/img/svgsprite/'));
});

gulp.task('files:prod', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./prod/files/'))
		.pipe(gulp.dest('./prod/files/'));
});

gulp.task('js:prod', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./prod/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(babel())
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./prod/js/'));
});

const serverOptions = {
	livereload: true,
	open: true,
};

gulp.task('server:prod', function () {
	return gulp.src('./prod/').pipe(server(serverOptions));
});
