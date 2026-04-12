const fs = require('fs');

let content = fs.readFileSync('src/components/PortfolioGallery.astro', 'utf-8');

// 1. the card onclick
content = content.replace(/onclick=\{`openModal\('\$\{horse\.id\}'\)`\}/g, "onclick={`window.location.href='/${lang}/portfolio/${horse.id.replace('.md','').split('/').slice(1).join('/')}'`}");

// 2. The Plan button (lines changed from button to link)
content = content.replace(/<button onclick=\{`window\.location\.href='\/[^]+?\n\s+Plan\n\s+<\/button>/g, (match) => {
    // wait, I just replaced the onclick to window.location.href above.
    return match; // Actually it's fine. Wait, better to make it an ACTUAL anchor tag for SEO.
});

// Let's rewrite the plan button to an proper <a>
content = content.replace(/<button onclick=\{`window\.location\.href='\/\$\{lang\}\/portfolio\/\$\{horse\.id\.replace\('\.md',''\)\.split\('\/'\)\.slice\(1\)\.join\('\/'\)\}'`\}([^>]+)>\s*(Plan|Investment Plan)\s*<\/button>/gi, 
"<a href={`/${lang}/portfolio/${horse.id.replace('.md','').split('/').slice(1).join('/')}`} $1>\n                  $2\n               </a>");

// 3. Remove the entire MODALS array block.
// It starts with <!-- MODALS -->
// and ends with </div> <!-- END PORTFOLIO CONTENT -->
const modalStart = content.indexOf('<!-- MODALS -->');
const modalEnd = content.indexOf('</div> <!-- END PORTFOLIO CONTENT -->');
if(modalStart !== -1 && modalEnd !== -1) {
    content = content.substring(0, modalStart) + content.substring(modalEnd);
}

// 4. Remove all Modal JS
content = content.replace(/\(window as any\)\.openModal = function[\s\S]*?\} else \{\n\s*window\.location\.hash = '#' \+ slug;\n\s*\}\n\s*\}\n\s*};\n/g, "");
content = content.replace(/\(window as any\)\.closeModal = function[\s\S]*?\}\n\s*};\n/g, "");
content = content.replace(/function syncHashState\(\)[\s\S]*?syncHashState\(\);\n/g, "");
content = content.replace(/function syncModalScrolls\(\)[\s\S]*?syncModalScrolls\(\);\n/g, "");
content = content.replace(/syncHashState\(\);\n\s*syncModalScrolls\(\);/g, "");

fs.writeFileSync('src/components/PortfolioGallery.astro', content);
console.log("Refactored PortfolioGallery.astro");

