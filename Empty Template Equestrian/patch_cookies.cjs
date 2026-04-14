const fs = require('fs');

let content = fs.readFileSync('src/i18n/ui.ts', 'utf-8');

// Insert EN
content = content.replace(/'ui\.scroll': 'Scroll',/, `'ui.scroll': 'Scroll',\n    'cookie.message': 'We use essential cookies to ensure you get the best experience on our website.',\n    'cookie.accept': 'Accept',`);

// Insert NL
content = content.replace(/'ui\.scroll': 'Scroll',/g, (match, offset, string) => {
    // wait we only want to match the NL block
    return match;
});
// let's do more specific replacements
// Actually, I can just use a generic regex that matches 'ui.scroll_top': '...' and appends to it.

function appendAfter(blockLang, strToFind, strToAppend) {
   const langIndex = content.indexOf(`'${blockLang}': {`);
   if(langIndex === -1) return;
   const nextBrace = content.indexOf('}', langIndex);
   const block = content.substring(langIndex, nextBrace);
   const target = block.match(new RegExp(`'ui\\.scroll_top':\\s*'.*?'`, 'g'));
   
   if(target && target.length > 0) {
      content = content.replace(target[0], `${target[0]},\n${strToAppend}`);
   }
}

appendAfter('en', '', `    'cookie.message': 'We use essential cookies to ensure you get the best experience on our website.',\n    'cookie.accept': 'Accept'`);
appendAfter('nl', '', `    'cookie.message': 'Wij maken gebruik van essentiële cookies om u de beste ervaring op onze website te bieden.',\n    'cookie.accept': 'Accepteren'`);
appendAfter('de', '', `    'cookie.message': 'Wir verwenden essenzielle Cookies, um Ihnen das beste Erlebnis auf unserer Website zu bieten.',\n    'cookie.accept': 'Akzeptieren'`);
appendAfter('es', '', `    'cookie.message': 'Utilizamos cookies esenciales para garantizar que obtenga la mejor experiencia.',\n    'cookie.accept': 'Aceptar'`);

fs.writeFileSync('src/i18n/ui.ts', content);
console.log("Cookie translations added.");
