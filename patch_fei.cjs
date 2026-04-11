const fs = require('fs');
const path = require('path');

const dir = './src/content/portfolio';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const feiMap = {
  "special blue de corlato": "https://data.fei.org/Horse/Performance.aspx?p=965D84B5596D9F487D29C0A0D279DED6",
  "theuwi van het distelhof": "https://data.fei.org/Horse/Performance.aspx?p=1CFF3B45A18B405FB168B7CFB1349131",
  "night blue de la roque": "https://data.fei.org/Horse/Performance.aspx?p=EBF8624EC4328A857BF1157FFE0C8FAC",
  "doutzen": "https://data.fei.org/Horse/Performance.aspx?p=73CA825816AC84ED122AE1F42C038618",
  "i'm so good": "https://data.fei.org/Horse/Performance.aspx?p=D445D18FBFE9A9A4A58254881B340E7B",
  "united van de heffinck": "https://data.fei.org/Horse/Performance.aspx?p=1672C43D122064D2B8C015CBE3E106C"
};

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const match = content.match(/title: "(.*)"/);
  if (match) {
    const name = match[1].toLowerCase();
    
    // Replace the fei_data line
    if (feiMap[name]) {
       content = content.replace(/fei_data: "(.*)"/, `fei_data: "${feiMap[name]}"`);
       fs.writeFileSync(filePath, content, 'utf8');
       console.log(`Updated ${file} with EXACT FEI PERFORMANCE LINK!`);
    } else {
       // Young horse with no FEI data yet, let's remove the generic search query so it triggers the fallback State
       content = content.replace(/fei_data: "(.*)"/, `fei_data: ""`);
       fs.writeFileSync(filePath, content, 'utf8');
       console.log(`Updated ${file} - Cleared FEI data because horse is not registered internationally yet.`);
    }
  }
});
