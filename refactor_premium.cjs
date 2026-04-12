const fs = require('fs');

let content = fs.readFileSync('src/pages/[lang]/premium.astro', 'utf-8');

// The Express Interest button => Investment Plan routing
content = content.replace(/<a href=\{`\/\$\{lang\}\/#contact`\} class="(.*?)">\s*Express Interest\s*<\/a>/g, 
`<a href={\`/\${lang}/portfolio/\${horse.id.replace('.md','').split('/').slice(1).join('/')}\`} class="$1">\n\t\t\t\t\t\t\t\t\t\tInvestment Plan\n\t\t\t\t\t\t\t\t\t</a>`);

// The card root: add cursor-pointer and onclick
content = content.replace(/<div class="horse-card reveal bg-white group overflow-hidden border border-primary\/10 shadow-premium transition-transform flex flex-col h-full hover:-translate-y-2">/g, 
`<div class="horse-card reveal bg-white group overflow-hidden border border-primary/10 shadow-premium transition-transform flex flex-col h-full hover:-translate-y-2 cursor-pointer" onclick={\`window.location.href='/\${lang}/portfolio/\${horse.id.replace('.md','').split('/').slice(1).join('/')}'\`}>`);

fs.writeFileSync('src/pages/[lang]/premium.astro', content);
