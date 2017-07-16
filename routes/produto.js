var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");
var middleware = require('../middleware/middleware');

let thisProductData = [],
    thisProductCupulas = [],
    thisProductVariations = [],
    thisProductColors = [],
    thisProductSpecialColors = [];

function restartVariables(req, res, next){
    thisProductData = [],
    thisProductCupulas = [],
    thisProductVariations = [],
    thisProductColors = [],
    thisProductSpecialColors = [];
    next();
}

// PRODUTOS/PRODUTO ROUTE
router.get('/produtos/:produto',
  middleware.getData,
  middleware.getColorsData,
  middleware.getCupulasData,
  restartVariables,
  getProductInfo,
  filterThisProductColors,
  filterThisProductSpecialColors,
  filterThisProductVariations,
  filterThisProductCupulas,
  function(req, res) {
  res.render('produto', {data: thisProductData[0]['fields'],
                         colors: thisProductColors,
                         specialcolors: thisProductSpecialColors,
                         variations: thisProductVariations,
                         cupulas: thisProductCupulas
  });
});

function getProductInfo(req, res, next){
  thisProductData = res.locals.productsData.filter(
    function filterProducts(item){
      if(item['fields']['Código']){
      return nakedString(item['fields']['Código']) == nakedString(req.params.produto);
      }
    })
  if(thisProductData[0]){
    next();
  }else{
  res.render('404')}
};

function filterThisProductCupulas(req, res, next){
  if(thisProductData[0]['fields']['Cúpulas']){
  res.locals.cupulasData.forEach(function(cupula, index, arr){
      for (var i=0; i < thisProductData[0]['fields']['Cúpulas'].length; i++){
      if(thisProductData[0]['fields']['Cúpulas'][i] == cupula['id']){
      thisProductCupulas.push(cupula);
      }
      }
  });
  next();
  } else {
next();
}
}

function filterThisProductVariations(req, res, next){
  if(thisProductData[0]['fields']['Variações']){
  res.locals.productsData.forEach(function(variation, index, arr){
      for (var i=0; i < thisProductData[0]['fields']['Variações'].length; i++){
      if(thisProductData[0]['fields']['Variações'][i] == variation['id']){
      thisProductVariations.push(variation)
      }
      }
  });
  next();
  }else{
next();
}
}

function filterThisProductColors(req, res, next){
  if(thisProductData[0]['fields']['Cores Pintura']){
  res.locals.colorsData.forEach(function(color, index, arr){
      for (var i=0; i < thisProductData[0]['fields']['Cores Pintura'].length; i++){
      if(thisProductData[0]['fields']['Cores Pintura'][i] == color['id']){
      thisProductColors.push(color);
      }
      }
  });
  next();
  } else {
next();
}
}

function filterThisProductSpecialColors(req, res, next){
  if(thisProductData[0]['fields']['Cores Especiais']){
  res.locals.colorsData.forEach(function(color, index, arr){
      for (var i=0; i < thisProductData[0]['fields']['Cores Especiais'].length; i++){
      if(thisProductData[0]['fields']['Cores Especiais'][i] == color['id']){
      thisProductSpecialColors.push(color);
      }
      }
  });
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
