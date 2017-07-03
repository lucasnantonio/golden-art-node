var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");
var middleware = require('../middleware/middleware');


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
                         cupulas: res.locals.thisProductCupulas
  });
});

let thisproductData;

function getProductInfo(req, res, next){
  thisproductData = res.locals.productsData.filter(
    function filterProducts(item){
      return item['fields']['Código'] == req.params.produto
    })
  next();
};

function findCupulasMatches(req, res, next){
  // console.log('findCupulasMatches');
  res.locals.thisProductCupulas = [];
  if(thisproductData[0]['fields']['Cúpulas']){
  res.locals.cupulasData.forEach(function(cupula, index, arr){
      for (var i=0; i < thisproductData[0]['fields']['Cúpulas'].length; i++){
      if(thisproductData[0]['fields']['Cúpulas'][i] == cupula['Código']){
      res.locals.thisProductCupulas.push(cupula);
      }
      }
  });
  // console.log('findCupulasMatchesEnd');
  next();

  } else {
// console.log('findCupulasMatchesEndNext');
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
