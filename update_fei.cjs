const fs = require('fs');
const path = require('path');

const dir = './src/content/portfolio';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract horse name from title
  const match = content.match(/title: "(.*)"/);
  if (match) {
    const name = match[1];
    const encodedName = encodeURIComponent(name);
    // URL for horsetelex FEI results search
    const feiUrl = `https://www.horsetelex.com/horses/search?name=${encodedName}`;
    
    // Check if documents already exists
    if (!content.includes('documents:')) {
      const parts = content.split('---');
      if (parts.length >= 3) {
        // parts[1] is the frontmatter
        const frontmatter = parts[1].trimEnd();
        const newFrontmatter = frontmatter + `\ndocuments:\n  fei_data: "${feiUrl}"\n`;
        parts[1] = '\n' + newFrontmatter + '\n';
        content = parts.join('---');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file} with FEI database link for ${name}`);
      }
    }
  }
});
