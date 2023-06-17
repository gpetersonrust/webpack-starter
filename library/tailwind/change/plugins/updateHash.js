const HashOutputPlugin = require('webpack-plugin-hash-output');
const { hash_file: hashFile, file_path, function_php_file } = require('../library/constants/global');
const fs = require('fs');
const path = require('path');

class HashUpdatePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('HashUpdatePlugin', (stats) => {
      const prefix = '-wp';
      const newHash = prefix + stats.hash;
       const hash_str = fs.readFileSync(hashFile, 'utf8');
       const json = JSON.parse(hash_str);
       const hash = json[0];
       const fileContent = fs.readFileSync(function_php_file, 'utf8');
       const newFileContent = fileContent.replaceAll(hash, newHash);
       fs.writeFileSync(function_php_file, newFileContent);
       updateHashFile(json, newHash, hashFile);
    });
  }
}


 
 

 
 

function updateHashFile(json, newHash, hashFile) {
   json.unshift(newHash)
    
  fs.writeFileSync(hashFile, JSON.stringify(json));
}

module.exports = HashUpdatePlugin;


