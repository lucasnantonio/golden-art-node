var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");

function listProductsInSearch(req, res, next){
	res.locals.searchResults = [];

	function checkCode(item){
		return item['fields']['Código'] == req.query.search.toUpperCase()
	}
	function checkName(item){
		if (item['fields']['Nome']){
			return item['fields']['Nome'].toLowerCase() == req.query.search.toLowerCase() || item['fields']['Nome'].toLowerCase() == (" " + req.query.search.toLowerCase())
		}
	}
	function checkType(item){
		if(item['fields']['Tipo']){
			return item['fields']['Tipo'].toLowerCase() == req.query.search.toLowerCase()
		}
	}

	//TODO: BUSCA POR MATERIAL
	//TODO: BUSCA POR PALAVRA-CHAVE
	//TODO: BUSCA POR DESCRIÇÃO
	//TODO: BUSCA POR LINHA

	function checkAll(item){
			return checkCode(item) ||
						 checkName(item) ||
						 checkType(item)
	}

	res.locals.searchResults = res.locals.productsData.filter(checkAll);

	next();

}

router.get('/busca',
listProductsInSearch,
function(req, res) {
  // res.render('categoria', {categoria: req.params.categoria, thisCategoryProducts: res.locals.thisCategoryProducts, data: res.locals.productsData});
	res.render('searchResults', {data: res.locals.searchResults, query: req.query.search})
});

module.exports = router
