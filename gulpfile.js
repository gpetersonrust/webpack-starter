const gulp = require('gulp');
const glob = require('glob');
const browserSync = require('browser-sync');
const { exec } = require('child_process');
 const { file_path, tailwind_dir } = require('./library/constants/global');
const find_files_recursively = require('./library/utilities/FS/find_files_recursively');
 
const paths = find_files_recursively(
  file_path,
  [],
  'node_modules|dist|.git',
  '.php$, .js$, .scss$'
);

 
 
const tailwind_customizer_files = find_files_recursively(
  tailwind_dir,
  [],
  'node_modules|dist|.git',
  '.json$'
);


// check if system is mac
const isMac = process.platform === 'darwin';

// check if system is windows
const isWindows = process.platform === 'win32';



let proxy =
  (isMac && 'http://localhost:8888/listeo') ||
  (isWindows && 'http://localhost:8888/listeo');

function watch() {
  browserSync.init({
    proxy,
    port: 800,
  });

  gulp.watch(paths).on('change', (path) => {
    browserSync.reload();
   
  });

  
}
exports.default = watch;
