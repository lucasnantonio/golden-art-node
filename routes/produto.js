var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");
var middleware = require('../middleware/middleware');


// PRODUTOS/PRODUTO ROUTE
router.get('/produtos/:produto',
  middleware.getData,
  getProductInfo,
  getColorsData,
  findColorMatches,
  getCupulasData,
  findCupulasMatches,
  findVariations,
  function(req, res) {
  res.render('produto', {data: res.locals.thisProductData['fields'],
                         colors: res.locals.thisProductColors,
                         specialcolors: res.locals.thisProductSpecialColors,
                         variations: res.locals.thisProductVariations,
                         cupulas: res.locals.thisProductCupulas
  });
  res.end();
});

// CORES ROUTE
router.get("/cores",
  getColorsData,
    function(req, res) {
  res.render('colors', {
                         colors: res.locals.colorsData

  });
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

function getCupulasData(req, res, next){
  var cupulasData = [];

  base('Cúpulas').select({}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(item){
      cupulasData.push(item);
    });

    fetchNextPage();

  }, function done(err) {
    if (err) {res.render('404'); return; }

    res.locals.cupulasData = cupulasData;
    next();

  });

}

function findCupulasMatches(req, res, next){
  res.locals.thisProductCupulas = [];
  if(res.locals.thisProductData['fields']['Cúpulas']){
  res.locals.cupulasData.forEach(function(cupula, index, arr){
      for (var i=0; i < res.locals.thisProductData['fields']['Cúpulas'].length; i++){
      if(res.locals.thisProductData['fields']['Cúpulas'][i] == cupula['id']){
      res.locals.thisProductCupulas.push(cupula);
      }
      }
  });
  next();
  } else {
next();
}
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
  res.locals.thisProductSpecialColors = [];

  if(res.locals.thisProductData['fields']['Cores Pintura'] || res.locals.thisProductData['fields']['Cores Especiais']){

  res.locals.colorsData.forEach(function(color, index, arr){
      if (res.locals.thisProductData['fields']['Cores Pintura']) {
        for (var i=0; i < res.locals.thisProductData['fields']['Cores Pintura'].length; i++){
          if(res.locals.thisProductData['fields']['Cores Pintura'][i] == color['id']){
            res.locals.thisProductColors.push(color)
          }
        }
      }
      if (res.locals.thisProductData['fields']['Cores Especiais']) {
          for (var i=0; i < res.locals.thisProductData['fields']['Cores Especiais'].length; i++){
          if(res.locals.thisProductData['fields']['Cores Especiais'][i] == color['id']){
            res.locals.thisProductSpecialColors.push(color)
          }
        }
      }
  });
  next();
  }
  else {
next();
}
}


function findVariations(req, res, next){

  res.locals.thisProductVariations = [];
  if(res.locals.thisProductData['fields']['Variações']){
  res.locals.thisProductVariationIds = res.locals.thisProductData['fields']['Variações'];
  res.locals.productsData.forEach(function(product, index, arr){
      for (var i=0; i < res.locals.thisProductVariationIds.length; i++){
      if(res.locals.thisProductVariationIds[i] == product['id']){
      res.locals.thisProductVariations.push(product)
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
