var airtableKey = process.env.AIRTABLE_KEY;
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');

function getData(req, res, next){
  // console.log('getdata');
  var productsData = [];
  base('Produtos').select({}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(item){
      productsData.push(item);
    })
    fetchNextPage();
  }, function done(err) {
    if (err) {res.render('404'); return; }
    res.locals.productsData = productsData;
    // console.log('getdataEnd');
    next();
  });
}

function getColorsData(req, res, next){
  var colorsData = [];
  base('Cores').select({}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(item){
      colorsData.push(item);
    });

    fetchNextPage();
  }, function done(err) {
    if (err) {res.render('404'); return; }
    res.locals.colorsData = colorsData;
    next();
  });

}

module.exports = {
    getData : getData,
    getColorsData : getColorsData,
}
