const fs = require('fs');

let content = fs.readFileSync('src/i18n/ui.ts', 'utf-8');

// Insert EN
content = content.replace(/'about\.pitch2': 'Our syndicate model ensures that you co-own elite prospects alongside industry professionals. From world-class training in Europe to targeted global competition, we manage the entire lifecycle to maximize both sport success and financial return.',/, `'about.pitch2': 'Our syndicate model ensures that you co-own elite prospects alongside industry professionals. From world-class training in Europe to targeted global competition, we manage the entire lifecycle to maximize both sport success and financial return.',\n    'about.stat_years': 'Years of Experience',\n    'about.stat_pedigree': 'Grand Prix Pedigree',\n    'about.stat_markets': 'Key Markets',`);

// Insert NL
content = content.replace(/'about\.pitch2': 'Ons exclusieve syndicaat-model stelt u in staat te co-investeren naaste vooraanstaande professionals. Vanaf de training in Europa tot aan de mondiale competitiestart garanderen wij een totaalbeheer dat zowel het sportieve als financiële resultaat maximaliseert.',/, `'about.pitch2': 'Ons exclusieve syndicaat-model stelt u in staat te co-investeren naaste vooraanstaande professionals. Vanaf de training in Europa tot aan de mondiale competitiestart garanderen wij een totaalbeheer dat zowel het sportieve als financiële resultaat maximaliseert.',\n    'about.stat_years': 'Jarenlange Ervaring',\n    'about.stat_pedigree': 'Grand Prix Pedigree',\n    'about.stat_markets': 'Kernmarkten',`);

// Insert DE
content = content.replace(/'about\.pitch2': 'Unser Syndikatsmodell stellt sicher, dass Sie Seite an Seite mit Branchenprofis investieren. Wir steuern den gesamten Prozess – vom erstklassigen Training in Europa bis hin zur globalen Vermarktung – für maximale Sport- und Finanzerfolge.',/, `'about.pitch2': 'Unser Syndikatsmodell stellt sicher, dass Sie Seite an Seite mit Branchenprofis investieren. Wir steuern den gesamten Prozess – vom erstklassigen Training in Europa bis hin zur globalen Vermarktung – für maximale Sport- und Finanzerfolge.',\n    'about.stat_years': 'Jahre Erfahrung',\n    'about.stat_pedigree': 'Grand Prix Abstammung',\n    'about.stat_markets': 'Kernmärkte',`);

// Insert ES
content = content.replace(/'about\.pitch2': 'Nuestro modelo de sindicación garantiza que usted coinvierta en prospectos de élite junto a profesionales del sector. Desde el entrenamiento en Europa hasta las competiciones globales, gestionamos el ciclo de vida completo.',/, `'about.pitch2': 'Nuestro modelo de sindicación garantiza que usted coinvierta en prospectos de élite junto a profesionales del sector. Desde el entrenamiento en Europa hasta las competiciones globales, gestionamos el ciclo de vida completo.',\n    'about.stat_years': 'Años de Experiencia',\n    'about.stat_pedigree': 'Pedigrí de Grand Prix',\n    'about.stat_markets': 'Mercados Clave',`);

fs.writeFileSync('src/i18n/ui.ts', content);
console.log("Stats translations successfully updated.");
