const path = require('path');
 const dirname = process.cwd();
 let parent_dir = '/Applications/MAMP/htdocs/walker/wp-content/themes/walker_theme/';
module.exports = {
    file_path:  path.join(dirname).replace(/webpack$/, ''), 
    hash_file: dirname + '/data/hashes.json',
    tailwind_dir : process.cwd() + '/library/tailwind/', 
    parent_dir,
    webpack_dir: parent_dir + 'webpack/',
    dist_dir : parent_dir +  'dist',
    MODE: 'development', 
    function_php_file: parent_dir + 'functions.php',
}

 