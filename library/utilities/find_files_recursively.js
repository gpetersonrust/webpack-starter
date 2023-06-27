// import fs
const fs = require('fs');
const path = require('path');
const { parent_dir, function_php_file } = require('../constants/global');
function find_files_recursively(
  dir,
  file_list = [],
  paths_to_exclude = 'node_modules|dist|.git',
  file_type = '.json$', 
  files_to_exclude = []
) {
  let files = fs.readdirSync(dir);
    for (let file of files) {
    let file_path = path.join(dir, file);
    // if file path is in files_to_exclude, skip
    if (files_to_exclude.includes(file_path) || file_path.match(paths_to_exclude) ) continue;
     if (fs.statSync(file_path).isDirectory()) {
      find_files_recursively(file_path, file_list, paths_to_exclude, file_type, files_to_exclude);
    } else {
      if (file_path.match(file_type)) {
        file_list.push(file_path);
      }
    }
  }
  return file_list;
}

module.exports = find_files_recursively;

console.log(find_files_recursively(
    parent_dir,
    [],
    'node_module|.git|webpack',
    '.php$|.html$', 
    [function_php_file]
   
  ));
 

  console.log([function_php_file]);