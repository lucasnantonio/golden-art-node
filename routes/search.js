var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");
var middleware = require('../middleware/middleware');

function listProductsInSearch(req, res, next){
	res.locals.searchResults = [];

	function checkCode(item){
		return item['fields']['Código'] == req.query.search.toUpperCase()
	}
	function checkName(item){
		if (item['fields']['Nome']){
			return nakedString(item['fields']['Nome']) == nakedString(req.query.search) || nakedString(item['fields']['Nome']) == (" " + nakedString(req.query.search.toLowerCase));
		}
	}
	function checkCategory(item){
		if (item['fields']['Categoria']){
			return nakedString(item['fields']['Categoria']) == nakedString(req.query.search);
		}
	}
	function checkType(item){
		if(item['fields']['Tipo']){
			return nakedString(item['fields']['Tipo']) == nakedString(req.query.search);
		}
	}
	function checkMaterial(item){
		result = false;
		if(item['fields']['Material']){
			 item['fields']['Material'].forEach(function(material){
				if(nakedString(material) == nakedString(req.query.search)){
					result = true;
				}
			});

		}
		return result;
	}

	//TODO: BUSCA POR PALAVRA-CHAVE
	//TODO: BUSCA POR DESCRIÇÃO
	//TODO: BUSCA POR LINHA

	function checkAll(item){
			return checkCode(item)      ||
						 checkName(item)      ||
						 checkType(item)      ||
						 checkMaterial(item)  ||
						 checkCategory(item)
	}

	res.locals.searchResults = res.locals.productsData.filter(checkAll);

	next();

}

router.get('/busca',
middleware.getData,
listProductsInSearch,
function(req, res) {
  // res.render('categoria', {categoria: req.params.categoria, thisCategoryProducts: res.locals.thisCategoryProducts, data: res.locals.productsData});
	res.render('searchResults', {data: res.locals.searchResults, query: req.query.search})
});

module.exports = router
