var gulp = require("gulp");
var sass = require("gulp-sass"); //编译scss
var auto = require("gulp-autoprefixer"); //自动添加前缀
var clean = require("gulp-clean-css"); //压缩css
var server = require("gulp-webserver"); //起服务拦截前端请求
// var uglify = require("gulp-uglify"); //压缩js
// var babel = require("gulp-babel") //ES6-->ES5语法


var url = require("url");
var fs = require("fs");
var path = require("path");

var list = require("./mock/list.json"); //渲染数据

gulp.task("devScss", function() {
    console.log("gulp");
    //把./src/scss/*.scss的内容同步到./src/css 
    return gulp.src("./src/scss/*.scss")
        .pipe(sass()) //编译scss
        .pipe(auto({
            browsers: ['last 2 versions'],
        }))
        .pipe(clean())
        .pipe(gulp.dest("./src/css"))
})

//监听./src/scss/*.scss更改后，./src/css 自动更改
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devScss"))
})

//起服务
gulp.task("devServer", function() {
    return gulp.src("src")
        .pipe(server({
            port: 9090, //配置端口号
            open: true, //是否自动打开浏览器
            livereload: true, //是否自动刷新浏览器
            middleware: function(req, res, next) { //拦截前端请求
                var pathname = url.parse(req.url).pathname;
                if (pathname == "/api/list") { //请求接口
                    res.end(JSON.stringify({ code: 1, data: list }))
                } else { //请求文件
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }
        }))
})