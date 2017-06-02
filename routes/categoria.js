var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");

// CATEGORIAS/CATEGORIA ROUTE


function listProductsInCategory(req, res, next){

	res.locals.categoria = nakedString(req.params.categoria);
	res.locals.thisCategoryProducts = []

	function checkCategory(item){
		return item['fields']['Categoria'] == res.locals.categoria
	}

	res.locals.thisCategoryProducts = res.locals.productsData.filter(checkCategory);

	next();

}

router.get('/categorias/:categoria',
listProductsInCategory,
function(req, res) {
  res.render('categoria', {categoria: req.params.categoria, thisCategoryProducts: res.locals.thisCategoryProducts, data: res.locals.productsData});
});

module.exports = router
