const https = require('https');
const agent = new https.Agent({  
  rejectUnauthorized: false
});
const url = "https://www.maartendriessen.com/horses";
https.get(url, { agent }, (res) => {
  let body = "";
  res.on("data", chunk => body += chunk);
  res.on("end", () => console.log(body));
});
