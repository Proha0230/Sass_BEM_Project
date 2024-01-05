const { src, dest, parallel, series, watch } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();

const config = {
        paths: {
            scss: './src/scss/**/*.scss',
            html: './public/index.html'
        },
        output: {
            cssName: 'bundle.min.css',
            path: './public'
        },
        isDevelopment: false
}

function scss () {
    return src(config.paths.scss)
        .pipe(gulpIf(config.isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(gulpIf(!config.isDevelopment, cleanCSS()))
        .pipe(gulpIf(config.isDevelopment, sourcemaps.write()))
        .pipe(dest(config.output.path))
        .pipe(browserSync.stream())
}

function serve () {
        browserSync.init({
            server: {
                baseDir: config.output.path
            }
        })
    watch(config.paths.scss, scss)
    watch(config.paths.html).on('change', browserSync.reload)
}

exports.default = parallel(scss, serve);