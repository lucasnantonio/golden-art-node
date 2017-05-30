var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");


// PRODUTOS/PRODUTO ROUTE
router.get('/produtos/:produto', 
  getProductInfo, 
  findColorMatches,
  findVariations,
  function(req, res) {
  res.render('produto', {data: res.locals.data, colors: res.locals.colors, variations: res.locals.variations});
  res.end();
});


//middleware
function getProductInfo(req, res, next){
  var produto = req.params.produto
  base('Produtos').select({
    filterByFormula: "{Código} = '" +  produto + "'"
  }).firstPage(function(err, records) {
      if (err || !records[0]) { res.render('404'); return; }
      console.log(records)
      res.locals.data = records[0]["fields"];
      next();
      });
};


function findColorMatches(req, res, next){
  
  var itemsProcessed = 0;
  res.locals.colors = [];
  
  if (res.locals.data['Cores Pintura']){
  res.locals.data['Cores Pintura'].forEach(function(colorId, index, arr){
    
      base('Cores').find(colorId, function(err, record) {
        if (err) { console.error(err); return; }
        itemsProcessed++;
        res.locals.colors.push(record);

        if(itemsProcessed === arr.length) {
          next();
        };
    });
    });
} else {
  next()}
}

//variations
function findVariations(req, res, next){
  
  var itemsProcessed = 0;
  res.locals.variations = [];

  if (res.locals.data['Variações']){
  res.locals.data['Variações'].forEach(function(variationId, index, arr){
    
      base('Produtos').find(variationId, function(err, record) {
        if (err) { console.error(err); return; }
        itemsProcessed++;
        res.locals.variations.push(record);

        if(itemsProcessed === arr.length) {
          console.log(res.locals.variations);
          next();
        };
    });
    });
} else {
  next()}
}

//TODO: special colors
//TODO: cúpulas
//TODO: acessórios
//TODO: related products




module.exports = router;