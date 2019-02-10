var gulp = require('gulp');

//压缩html
var htmlClean = require('gulp-htmlclean');

//压缩图片
var imageMin = require('gulp-imagemin');

//压缩js
var uglify = require('gulp-uglify');

//去掉js中的调试语句
var debug = require('gulp-strip-debug');


//将less转换为css
var less = require('gulp-less');

//压缩css
var cleanCss = require('gulp-clean-css');

//css添加前缀  postcss  autoprefixer
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer')

//开启服务器
var connect = require('gulp-connect');

//开启监听 文件变化
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
});

var folder = {
    src: 'src/',
    dist: 'dist/'
}

//判断当前的环境
var devMod = process.env.NODE_ENV == 'development';//开发环境
// export NODE_ENV=development  设置环境变量
console.log(devMod)

//创建任务
gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload());
    if (!devMod) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.dist + 'html/'))
});

gulp.task('img', function () {
    gulp.src(folder.src + 'img/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'img/'))
});

gulp.task('css', function () {
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]));
    if (!devMod) {
        page.pipe(cleanCss())
    }

    page.pipe(gulp.dest(folder.dist + 'css/'))
});

gulp.task('js', function () {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload());
    if (!devMod) {
        page.pipe(debug())
            .pipe(uglify());
    }
    page.pipe(gulp.dest(folder.dist + 'js/'))
});


gulp.task('server', function () {
    connect.server({
        port: '8888',//改变默认端口
        livereload: true
    });
});


gulp.task('default', ['html', 'css', 'js', 'img', 'server', 'watch']);