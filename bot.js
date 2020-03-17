var Twit = require('twit');
var Config = require('./config');
var Scrape = require('./scrape')
var T = new Twit(Config);
const request = require('request');
const cheerio = require('cheerio');

setInterval(scrapeIt, 1000*60*240);
scrapeIt();

function scrapeIt(){
  request('https://www.worldometers.info/coronavirus/', (error, response, html) =>{
    if(!error && response.statusCode == 200){
      const $ = cheerio.load(html);

      const activeCases = $('.number-table-main');
      const mildCases = $('.panel_front .number-table');
      const criticalCases = parseInt(activeCases.html().replace(/,/g, '')) - parseInt(mildCases.html().replace(/,/g, ''));
      const criticalCasesString = criticalCases.toString();
      const deathCases = $(".content-inner :nth-child(9)").find('span');
      const recoveredCases = $(".content-inner :nth-child(10)").find('span');

      console.log('casos activos: ' + activeCases.html());
      console.log('casos leves: ' +mildCases.html());
      console.log('casos criticos: ' + criticalCasesString);
      console.log('muertes: ' +deathCases.html());
      console.log('recuperados: ' +recoveredCases.html());

      var tweet = {
        status: "Casos de Coronavirus: \r\n\r\nActivos:  " + activeCases.html() +      "\r\nLeves: " + mildCases.html() + "\r\nCríticos: " + criticalCasesString +      "\r\nRecuperados: " + recoveredCases.html() + "  \r\nMuertes: " + deathCases.html() +      "\r\n\r\n#COVID19 #coronavirus"
      }

      T.post('statuses/update', tweet, tweeted);

      function tweeted(err, data, response){
        if(err){
          console.log("didn't work");
        }else{
          console.log('It worked!');
        }

      }

    }
  });



}
