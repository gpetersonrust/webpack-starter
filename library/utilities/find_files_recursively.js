// import fs
const fs = require('fs');
const path = require('path');
function find_files_recursively(
  dir,
  file_list = [],
  excludes = 'node_modules|dist|.git',
  file_type = '.json$'
) {
  let files = fs.readdirSync(dir);
   

  for (let file of files) {
    let file_path = path.join(dir, file);

    if (file_path.match(excludes)) continue;

    if (fs.statSync(file_path).isDirectory()) {
      find_files_recursively(file_path, file_list, excludes, file_type);
    } else {
      if (file_path.match(file_type)) {
        file_list.push(file_path);
      }
    }
  }

  return file_list;
}

module.exports = find_files_recursively;
