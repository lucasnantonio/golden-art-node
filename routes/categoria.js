var express = require('express');
var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");

// CATEGORIAS/CATEGORIA ROUTE

function getByCategory(req, res, next){
  
  res.locals.categoria = nakedString(req.params.categoria);
  res.locals.thisCategoryProducts = [];
  
  res.locals.productsData.forEach(function(product){
    if (product['fields']['Categoria'] == res.locals.categoria){
      res.locals.thisCategoryProducts.push(product['fields']);
    }
    });
    next();
}

router.get('/categorias/:categoria', 
getByCategory,
function(req, res) {
  res.render('categoria', {categoria: req.params.categoria, product: res.locals.thisCategoryProducts, data: res.locals.productsData});
});

module.exports = router