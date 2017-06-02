var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");

// LINHAS/LINHA ROUTE

function listProductsInLinha(req, res, next){

	res.locals.linha = nakedString(req.params.linha);
	res.locals.thisLineProducts = []

	function checkLinha(item){
		return item['fields']['Linha'] == res.locals.linha
	}

	res.locals.thisLineProducts = res.locals.productsData.filter(checkLinha);

	next();

}

router.get('/linhas/:linha',
listProductsInLinha,
function(req, res) {
  res.render('linha', {linha: req.params.linha, thisLineProducts: res.locals.thisLineProducts, data: res.locals.productsData});
});

module.exports = router
