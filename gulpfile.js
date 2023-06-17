const gulp = require('gulp');
const glob = require('glob');
const browserSync = require('browser-sync');
const { exec } = require('child_process');
const find_files_recursively = require('./library/utilities/find_files_recursively');
const { file_path, tailwind_dir } = require('./library/constants/global');
const dirname = process.cwd();
const paths = glob.sync(file_path + '/**/**/*');
 
 
 
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
  (isMac && 'http://localhost:8888/walker/') ||
  (isWindows && 'http://localhost/walker/');

function watch() {
  browserSync.init({
    proxy,
    port: 800,
  });

  gulp.watch(paths).on('change', (path) => {
    browserSync.reload();
  
     
    //  let  fs.readFileSync(hashFile, 'utf8');
     

    // exec("git pull origin master", (err, stdout, stderr) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }

    //   console.log(stdout);
    // });
  });

  gulp.watch(tailwind_customizer_files).on('change', () => {
    // change working directory to library/tailwind
    process.chdir( tailwind_dir);

    // run node update-tailwind.js
    exec('node update-tailwind.js', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
}
exports.default = watch;

console.log('====================================');
console.log('hello world');
console.log('====================================');