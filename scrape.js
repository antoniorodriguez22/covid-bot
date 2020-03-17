const request = require('request');
const cheerio = require('cheerio');

request('https://www.worldometers.info/coronavirus/', (error, response, html) =>{
  if(!error && response.statusCode == 200){
    const $ = cheerio.load(html);

    const activeCases = $('.number-table-main');
    const mildCases = $('.panel_front .number-table');
    const criticalCases = parseInt(activeCases.html().replace(/,/g, '')) - parseInt(mildCases.html().replace(/,/g, ''));

    const deathCases = $(".content-inner :nth-child(9)").find('span');
    const recoveredCases = $(".content-inner :nth-child(10)").find('span');

    console.log('casos activos: ' + activeCases.html());
    console.log('casos leves: ' +mildCases.html());
    console.log('casos criticos: ' +criticalCases.toString());
    console.log('muertes: ' +deathCases.html());
    console.log('recuperados: ' +recoveredCases.html());
  }
});
