var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");


// PRODUTOS/PRODUTO ROUTE
router.get('/produtos/:produto', 
  getProductInfo,
  getColorsData,
  findColorMatches,
  findVariations,
  function(req, res) {
  res.render('produto', {data: res.locals.thisProductData['fields'], colors: res.locals.thisProductColors, variations: res.locals.thisProductVariations});
  res.end();
});



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


function getProductInfo(req, res, next){
  var produto = req.params.produto
  
  res.locals.productsData.forEach(function(product){
    if (product['fields']['Código'] == produto){

      res.locals.thisProductData = product;
      next();
    }
  })
};


function findColorMatches(req, res, next){
  res.locals.thisProductColors = [];
  if(res.locals.thisProductData['fields']['Cores Pintura']){

  res.locals.colorsData.forEach(function(color, index, arr){
      for (var i=0; i < res.locals.thisProductData['fields']['Cores Pintura'].length; i++){
      if(res.locals.thisProductData['fields']['Cores Pintura'][i] == color['id']){
      res.locals.thisProductColors.push(color)
      }
      }
  });
  next();
  } else {
next();
}
}

function findVariations(req, res, next){
  res.locals.thisProductVariations = [];
  
  if(res.locals.thisProductData['fields']['Varições']){
  res.locals.variations = [];

  res.locals.productsData.forEach(function(product, index, arr){
      for (var i=0; i < res.locals.thisProductData['fields']['Variações'].length; i++){
      if(res.locals.thisProductData['fields']['Varições'][i] == res.locals.productsData['id']){
      res.locals.variations.push(product)
      }
      }
  });
  next();
  
  }else{
    
next();
}
}


//TODO: special colors
//TODO: cúpulas
//TODO: acessórios
//TODO: related products




module.exports = router;