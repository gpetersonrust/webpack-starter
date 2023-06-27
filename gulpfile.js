const gulp = require('gulp');
const glob = require('glob');
const browserSync = require('browser-sync');
const { exec } = require('child_process');
const { file_path, tailwind_dir, footer_file, dev_js_file, line_in_footer_to_replace } = require('./library/constants/global');
const find_files_recursively = require('./library/utilities/FS/find_files_recursively');
const browserify = require('gulp-browserify');
const inject = require('gulp-inject');
const { readFileSync, writeFileSync } = require('fs');
const paths = glob.sync(file_path + '/**/**/*');
let new_footer_php = '';
let footer_php;
let dev_js_text;
let script;
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
  (isMac && 'http://localhost:8888/task-manager') ||
  (isWindows && 'http://localhost/task-manager');

function watch() {
  browserSync.init({
    proxy,
    port: 890,
    scrollProportionally: false,
  });

  gulp.watch(paths).on('change', (path) => {
    browserSync.reload();
  });

  gulp.watch(tailwind_customizer_files).on('change', () => {
    // change working directory to library/tailwind
    process.chdir(tailwind_dir);

    // run node update-tailwind.js
    exec('node update-tailwind.js', (err, stdout, stderr) => {
      console.log('====================================');
      console.log('updating');
      console.log('====================================');
      if (err) {
        console.error(err);
        return;
      }
    });
  });



   addScriptToFooter(footer_file, dev_js_file, line_in_footer_to_replace);
 

}

function addScriptToFooter(
  footer_file,
  dev_js_file,
  line_in_footer_to_replace
) {
  const footer_php = readFileSync(footer_file, 'utf8');
  const dev_js_text = readFileSync(dev_js_file, 'utf8');
    script = `<script>\n${dev_js_text}</script>\n`;

  // Check if script is already in footer
  if (footer_php.includes(dev_js_text)) {
    return;
  }

  
    line_to_add_above = line_in_footer_to_replace;
    new_footer_php = footer_php.replace(
    line_to_add_above,
    script + line_to_add_above
  );

  writeFileSync(footer_file, new_footer_php, 'utf8');
}
 
 

function cleanup() {
    let file_php = readFileSync(footer_file, 'utf8');
    let new_file_php = file_php.replace(script, '');

    
    writeFileSync(footer_file, new_file_php, 'utf8');


  
     
}

process.on('SIGINT', () => {
  cleanup();
  process.exit();
 
});

exports.default = gulp.series(watch);
