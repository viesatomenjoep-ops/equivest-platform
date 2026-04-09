const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.astro') || filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Scale the text classes by roughly 1.5
    content = content.replace(/text-\[7px\]/g, 'text-[10px]');
    content = content.replace(/text-\[8px\]/g, 'text-xs');
    content = content.replace(/text-\[9px\]/g, 'text-sm');
    content = content.replace(/text-\[10px\]/g, 'text-[15px]');
    content = content.replace(/text-\[11px\]/g, 'text-[16px]');
    content = content.replace(/text-xs(?!\w)/g, 'text-lg');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
