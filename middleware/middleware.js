var airtableKey = process.env.AIRTABLE_KEY;
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');

var getData = function(req, res, next){
  var productsData = [];
  base('Produtos').select({}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(item){
      productsData.push(item);
    })
    fetchNextPage();
  }, function done(err) {
    if (err) {res.render('404'); return; }
    res.locals.productsData = productsData;
    next();
  });
}

module.exports = {
    getData : getData,
}
