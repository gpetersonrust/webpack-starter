const path = require('path');
 const dirname = process.cwd();
 let parent_dir = dirname.replace(/webpack$/, '');
module.exports = {
    file_path:  path.join(dirname).replace(/webpack$/, ''), 
    hash_file: dirname + '/data/hashes.json',
    tailwind_dir : process.cwd() + '/library/tailwind/', 
    parent_dir,
    dist_dir : parent_dir +  'dist',
    MODE: 'development'
}