const gulp = require('gulp')

const jshint = require('gulp-jshint')
const inject = require('gulp-inject')
const jscs = require('gulp-jscs')
const wiredep = require('wiredep').stream;

var jsFiles = ['*.js', 'src/**/*.js']

gulp.task('style', () => {
   return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(jscs())
})

var injectSrc = gulp.src(['./public/css/*.css','./public/js/*.js'], {read:false})

var injectOptions = {
    ignorePath: '/public'
}

gulp.task('inject', () => {
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    }
    return gulp.src('./src/views/*.jade')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'))
})