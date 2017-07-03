var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");
var middleware = require('../middleware/middleware');

let thisProductData = [],
    thisProductCupulas = [],
    thisProductVariations = [];

// PRODUTOS/PRODUTO ROUTE
router.get('/produtos/:produto',
  middleware.getData,
  getProductInfo,
  middleware.getColorsData,
  middleware.getCupulasData,
  findColorMatches,
  findVariations,
  findCupulasMatches,
  function(req, res) {
  res.render('produto', {data: thisProductData[0]['fields'],
                         colors: res.locals.thisProductColors,
                         specialcolors: res.locals.thisProductSpecialColors,
                         variations: thisProductVariations,
                         cupulas: thisProductCupulas
  });
});

function getProductInfo(req, res, next){
  thisProductData = res.locals.productsData.filter(
    function filterProducts(item){
      return nakedString(item['fields']['Código']) == nakedString(req.params.produto);
    })
  next();
};

function findCupulasMatches(req, res, next){
  if(thisProductData[0]['fields']['Cúpulas']){
    thisProductCupulas = res.locals.cupulasData.filter(
      function filterCupulas(item){
        for (var i=0; i < thisProductData[0]['fields']['Cúpulas'].length; i++){
        return item['id'] == thisProductData[0]['fields']['Cúpulas'][i];
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
  if(thisProductData[0]['fields']['Cores Pintura'] || thisProductData[0]['fields']['Cores Especiais']){

  res.locals.colorsData.forEach(function(color, index, arr){
      if (thisProductData[0]['fields']['Cores Pintura']) {
        for (var i=0; i < thisProductData[0]['fields']['Cores Pintura'].length; i++){
          if(thisProductData[0]['fields']['Cores Pintura'][i] == color['id']){
            res.locals.thisProductColors.push(color)
          }
        }
      }
      if (thisProductData[0]['fields']['Cores Especiais']) {
          for (var i=0; i < thisProductData[0]['fields']['Cores Especiais'].length; i++){
          if(thisProductData[0]['fields']['Cores Especiais'][i] == color['id']){
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
  if(thisProductData[0]['fields']['Variações']){
    thisProductVariations = res.locals.productsData.filter(
      function filterVariations(item){
        for (var i=0; i < thisProductData[0]['fields']['Variações'].length; i++){
        return item['id'] == thisProductData[0]['fields']['Variações'][i];
      }
      }
    );
    next();
  } else {
    next();
  }
}

//TODO: special colors
//TODO: cúpulas
//TODO: acessórios
//TODO: related products

module.exports = router;
