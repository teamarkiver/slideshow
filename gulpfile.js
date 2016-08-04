var gulp = require("gulp"),
    awspublish = require('gulp-awspublish'),
    jf = require('jsonfile'),
    headers = { 'Cache-Control': 'max-age=315360000, no-transform, public' };


gulp.task('aws_slideshow_production', function() {
  creds = jf.readFileSync("aws-creds-slideshow-production.json")
  publisher = awspublish.create(creds)

  return gulp.src('./dist/{,*/}*{,*/}*.**')
    .pipe(publisher.publish(headers))
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
