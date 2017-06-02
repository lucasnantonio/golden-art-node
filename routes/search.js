var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");

function listProductsInSearch(req, res, next){

	function checkCode(item){
		return item['fields']['Código'] == req.query.search.toUpperCase();
	}

	res.locals.searchResults = res.locals.productsData.filter(checkCode);

	next();

}

router.get('/busca',
listProductsInSearch,
function(req, res) {
  // res.render('categoria', {categoria: req.params.categoria, thisCategoryProducts: res.locals.thisCategoryProducts, data: res.locals.productsData});
	console.log(res.locals.searchResults)
});

module.exports = router
