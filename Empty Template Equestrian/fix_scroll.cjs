const fs = require('fs');

let content = fs.readFileSync('src/i18n/ui.ts', 'utf-8');

// The English block has: 'ui.scroll': 'Scroll to top',
// Let's replace 'ui.scroll': 'Scroll to top', with exactly: 'ui.scroll': 'Scroll',\n    'ui.scroll_top': 'Scroll to top',
content = content.replace(/'ui\.scroll': 'Scroll to top',/, "'ui.scroll': 'Scroll',\n    'ui.scroll_top': 'Scroll to top',");

// The NL block has: 'ui.scroll': 'Scroll to top', (since I did a global replace)
content = content.replace(/'ui\.scroll': 'Scroll naar boven',/, "'ui.scroll': 'Scroll',\n    'ui.scroll_top': 'Scroll naar boven',");
content = content.replace(/'ui\.scroll': 'Scroll to top',/, "'ui.scroll': 'Scroll',\n    'ui.scroll_top': 'Scroll naar boven',"); // Just in case it wasn't replaced properly earlier

// The DE block has: 'ui.scroll': 'Nach oben scrollen',
content = content.replace(/'ui\.scroll': 'Nach oben scrollen',/, "'ui.scroll': 'Scrollen',\n    'ui.scroll_top': 'Nach oben scrollen',");

// The ES block has: 'ui.scroll': 'Desplazarse hacia arriba',
content = content.replace(/'ui\.scroll': 'Desplazarse hacia arriba',/, "'ui.scroll': 'Desplazar',\n    'ui.scroll_top': 'Desplazarse hacia arriba',");

fs.writeFileSync('src/i18n/ui.ts', content);
