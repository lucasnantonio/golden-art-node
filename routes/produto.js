var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");


// PRODUTOS/PRODUTO ROUTE

router.get('/produtos/:produto', function(req, res) {
  
  var produto = req.params.produto
  var data;
  
  base('Produtos').select({
    filterByFormula: "{Código} = '" +  produto + "'"
  }).firstPage(function(err, records) {
      if (err || !records[0]) { res.render('404'); return; }
      data = records[0]["fields"];
      res.render('produto', {data: data});
      });
  });

module.exports = router;