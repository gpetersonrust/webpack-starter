 
const fs = require("fs");
const path = require("path");
let parent_dir = process.cwd().replace(/webpack$/, '');
 function find_php_files_recursively(dir, file_list = []){
    let files = fs.readdirSync(dir);
    for(let file of files){
        let file_path = path.join(dir, file);
        // if file contains node_modules, or webpack or dist or .git, skip
        if(file_path.match(/node_modules|webpack|dist|.git/)) continue;
        if(fs.statSync(file_path).isDirectory()){
            find_php_files_recursively(file_path, file_list);
        }else{
            if(file_path.endsWith(".php")){
                file_list.push(file_path);
            }
        }
    }
    return file_list;
 }
const php_files = find_php_files_recursively(parent_dir);
module.exports = php_files;

    