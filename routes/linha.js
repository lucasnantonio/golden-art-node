var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");

// LINHAS/LINHA ROUTE

function getByLinha(req, res, next){
  
  res.locals.linha = nakedString(req.params.linha);
  res.locals.thisLineProducts = [];
  
  res.locals.productsData.forEach(function(product){
    if (product['fields']['Linha'] == res.locals.linha){
      res.locals.thisLineProducts.push(product['fields']);
    }
    });
    next();
}

router.get('/linhas/:linha', 
getByLinha,
function(req, res) {
  res.render('linha', {linha: req.params.linha, product: res.locals.thisLineProducts, data: res.locals.productsData});
});

module.exports = router