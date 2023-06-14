const HashOutputPlugin = require('webpack-plugin-hash-output');
const { hash_file: hashFile, file_path } = require('../library/constants/global');
 
const fs = require('fs');
const find_files_recursively = require('../library/utilities/find_files_recursively');
const path = require('path');

class HashUpdatePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('HashUpdatePlugin', (stats) => {
      const prefix = '-wp';
      const newHash = prefix + stats.hash;
       const hash_str = fs.readFileSync(hashFile, 'utf8');
       
      const json = JSON.parse(hash_str);
       const hash = json[0];
      const files = find_files_recursively(
        file_path,
        [],
        'node_modules|.git|webpack',
        '.js$|.php$|.css$|.html$'
      );
       files.forEach((file) => {
        if (file.match(/\.html$|\.php$/)) {
          const fileContent = fs.readFileSync(file, 'utf8');
            const newFileContent = fileContent.replaceAll(hash, newHash);
         
          fs.writeFileSync(file, newFileContent);
       
        }
      });

      updateHashFile(json, newHash, hashFile);

      
    });
  }
}


// 
 

 
 

function updateHashFile(json, newHash, hashFile) {
   json.unshift(newHash)
    
  fs.writeFileSync(hashFile, JSON.stringify(json));
}

module.exports = HashUpdatePlugin;