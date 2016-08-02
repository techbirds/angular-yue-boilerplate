/**
 * Copyright (c) 2014-2015 Artgoer Ltd. All Rights Reserved.
 */
/**
 * User: TechBirds
 * Date: 16/1/26
 * Time: 09:27
 * Version: 1.0.0
 * Description:
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var insert = require('gulp-insert');
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');
var cleanCss = require('gulp-clean-css');
var filter = require('gulp-filter');
var gulpif = require('gulp-if');
var path = require('path');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var inject = require('gulp-inject');
var series = require('stream-series');
var watch = require('gulp-watch');
var gzip = require('gulp-gzip');
var connect = require('gulp-connect');
var os = require('os');
var open = require('gulp-open');
var eslint = require('gulp-eslint');
var env = process.env.NODE_ENV;

var config = {

    srcDir: './src',

    buildDir: './dist',

    scripts: {
        src: ['./src/app/**/*.module.js', './src/app/**/*.js'],
        dist: './dist/resources',
        name: 'app.min.js'
    },

    templates: {
        name: 'app.templates.js',
        moduleName: 'app.templates',
        src: './src/app/**/*.html',
        dist: './dist/resources'
    },

    styles: {
        src: './src/asserts/styles/**/*.css',
        dist: './dist/resources',
        name: 'app.min.css'
    },

    fonts: {
        src: './src/asserts/fonts/**/*',
        dist: './dist/resources/fonts/'
    },

    images: {
        src: './src/asserts/images/**/*',
        dist: './dist/resources/images/'
    },

    bower: {
        name: {
            css: 'lib.min.css',
            js: 'lib.min.js'
        },
        dist: './dist/resources',
        extension: {
            css: '**/*.css',
            js: '**/*.js'
        }
    },

    index: {
        src: './src/index.html',
        dist: './dist/',
        scripts: {
            lib: './dist/**/lib*',
            app: './dist/**/app*'
        }
    },

    gzip: {
        src: ['dist/resources/*.{html,xml,json,css,js,js.map,css.map}'],
        dist: 'dist/resources'
    },

    open: {
        url: 'http://localhost',
        port: 8888,
        path: '/dist'
    },

    eslint: {
        src: './src/**/*.js'
    }

}

// 获取浏览器
var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'));

/**
 * mainBowerFiles初始设置
 */
function mainBowerFileinit() {
    return mainBowerFiles({
        paths: {
            bowerDirectory: './bower_components',
            bowerJson: './bower.json'
        }
    });
}

/**
 * 判断是否是压缩文件
 * @param file
 * @returns {boolean}
 */
function isNotMinified(file) {
    var extname = path.extname(file.path);
    if (extname === '.js' || extname === '.css') {
        return path.extname(file.path.substr(0, file.path.length - extname.length)) !== '.min';
    }
    else {
        return false;
    }
};

// 清理目录
gulp.task('clean', function () {
    return del([config.buildDir]);

});

// 工程脚本
gulp.task('scripts', function () {
    return gulp.src(config.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(uglify({
            compress: {drop_console: true}
        }))
        .pipe(concat(config.scripts.name))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.scripts.dist))
        .pipe(connect.reload());
});

// bower
gulp.task('bower', function () {
    var cssFilter = filter(['**/*.css'], {restore: true});
    var jsFilter = filter(['**/*.js'], {restore: true});
    return gulp.src(mainBowerFileinit())
        .pipe(cssFilter)
        .pipe(gulpif(isNotMinified, cleanCss()))
        .pipe(concat(config.bower.name.css))
        .pipe(gulp.dest(config.bower.dist))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(gulpif(isNotMinified, uglify({
            compress: {drop_console: true}
        })))
        .pipe(concat(config.bower.name.js))
        .pipe(gulp.dest(config.bower.dist));
});

// 工程样式
gulp.task('styles', function () {
    return gulp.src(config.styles.src)
        .pipe(cleanCss())
        .pipe(concat(config.styles.name, {newLine: ';'}))
        .pipe(gulp.dest(config.styles.dist));
});

// 字体
gulp.task('fonts', function () {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dist));
});

// 图片
gulp.task('images', function () {
    return gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.dist));
});

// angular模板合并
gulp.task('templates', function () {
    return gulp.src(config.templates.src)
        .pipe(templateCache({
            module: config.templates.moduleName,
            filename: config.templates.name,
            standalone: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.templates.dist));
    ;
});

// index
gulp.task('index', function () {
    var target = gulp.src(config.index.src);
    var libSource = gulp.src(config.index.scripts.lib, {read: false});
    var appSource = gulp.src(config.index.scripts.app, {read: false});
    return target.pipe(inject(series(libSource, appSource), {relative: true}))
        .pipe(gulp.dest(config.index.dist));
});

// native watch 弃用,对add、delete等事件监听失效
gulp.task('native-watch', function () {
    gulp.watch(config.scripts.src, ['scripts']);
    gulp.watch(config.styles.src, ['styles']);
    gulp.watch(config.templates.src, ['templates']);
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.index.src, ['index']);
});

// watch
gulp.task('watch', function () {
    watch(config.scripts.src, function (cb) {
        runSequence('eslint','scripts');
    });

    watch(config.styles.src, function () {
        gulp.start('styles');
    });

    watch(config.templates.src, function () {
        gulp.start('templates');
    });

    watch(config.images.src, function () {
        gulp.start('images');
    });

    watch(config.index.src, function () {
        gulp.start('index');
    });
});

// gzip
gulp.task('gzip', function () {
    return gulp.src(config.gzip.src)
        .pipe(gzip())
        .pipe(gulp.dest(config.gzip.dist));
});

// connect
gulp.task('connect', function () {
    connect.server({
        port: config.open.port,
        livereload: true
    });
});

// open url
gulp.task('open', function () {
    var options = {
        uri: config.open.url + ":" + config.open.port + config.open.path, // 注意uri格式书写
        app: browser
    };
    return gulp.src('./') // 目录存在即可,不影响打开的地址
        .pipe(open(options));
});

// eslint
gulp.task('eslint', function () {
    return gulp.src(config.eslint.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on('error', handleError); // 转码异常捕捉,不终止watch
});

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('dev', function (cb) {
    runSequence('clean', 'eslint', ['scripts', 'bower', 'styles', 'fonts', 'images', 'templates'], 'index', 'watch', 'connect', 'open', cb)
});

gulp.task('prod', function (cb) {
    runSequence('clean', ['scripts', 'bower', 'styles', 'fonts', 'images', 'templates'], 'index', cb)
});
