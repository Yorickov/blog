import gulp from 'gulp';
import app from './src';

gulp.task('run', () => {
  const PORT = process.env.PORT || 3000;
  app().listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
});
