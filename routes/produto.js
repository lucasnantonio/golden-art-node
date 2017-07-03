var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");
var middleware = require('../middleware/middleware');

let thisproductData = [],
    thisProductCupulas = [];

// PRODUTOS/PRODUTO ROUTE
router.get('/produtos/:produto',
  middleware.getData,
  middleware.getColorsData,
  middleware.getCupulasData,
  getProductInfo,
  findColorMatches,
  findVariations,
  findCupulasMatches,
  function(req, res) {
  res.render('produto', {data: thisproductData[0]['fields'],
                         colors: res.locals.thisProductColors,
                         specialcolors: res.locals.thisProductSpecialColors,
                         variations: res.locals.thisProductVariations,
                         cupulas: thisProductCupulas
  });
});

function getProductInfo(req, res, next){
  thisproductData = res.locals.productsData.filter(
    function filterProducts(item){
      return item['fields']['Código'] == req.params.produto
    })
  next();
};

function findCupulasMatches(req, res, next){
  if(thisproductData[0]['fields']['Cúpulas']){
    thisProductCupulas = res.locals.cupulasData.filter(
      function filterCupulas(item){
        for (var i=0; i < thisproductData[0]['fields']['Cúpulas'].length; i++){
        return item['id'] == thisproductData[0]['fields']['Cúpulas'][i];
      }
      }
    );
    next();
  } else {
    next();
  }
}

function findColorMatches(req, res, next){
  // console.log('findColorMatches');
  res.locals.thisProductColors = [];
  res.locals.thisProductSpecialColors = [];
  if(thisproductData[0]['fields']['Cores Pintura'] || thisproductData[0]['fields']['Cores Especiais']){

  res.locals.colorsData.forEach(function(color, index, arr){
      if (thisproductData[0]['fields']['Cores Pintura']) {
        for (var i=0; i < thisproductData[0]['fields']['Cores Pintura'].length; i++){
          if(thisproductData[0]['fields']['Cores Pintura'][i] == color['id']){
            res.locals.thisProductColors.push(color)
          }
        }
      }
      if (thisproductData[0]['fields']['Cores Especiais']) {
          for (var i=0; i < thisproductData[0]['fields']['Cores Especiais'].length; i++){
          if(thisproductData[0]['fields']['Cores Especiais'][i] == color['id']){
            res.locals.thisProductSpecialColors.push(color)
          }
        }
      }
  });
  // console.log('findColorMatchesEnd');
  next();

  }
  else {
    // console.log('findColorMatchesEnd');
next();
}
}


function findVariations(req, res, next){
  // console.log('findVariations');
  res.locals.thisProductVariations = [];
  if(thisproductData[0]['fields']['Variações']){
  res.locals.thisProductVariationIds = thisproductData[0]['fields']['Variações'];
  res.locals.productsData.forEach(function(product, index, arr){
      for (var i=0; i < res.locals.thisProductVariationIds.length; i++){
      if(res.locals.thisProductVariationIds[i] == product['Código']){
      res.locals.thisProductVariations.push(product)
      }
      }
  });
  // console.log('findVariationsEnd');
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
