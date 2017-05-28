var express = require('express');
var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");

// CATEGORIAS/CATEGORIA ROUTE

router.get('/categorias/:categoria', function(req, res) {
  var categoria = nakedString(req.params.categoria);
  var data;
  
  base('Produtos').select({
    filterByFormula: "{Categoria} = '" +  categoria + "'"
    }).eachPage(function page(records, fetchNextPage) {
      data = records;
      fetchNextPage();
  
    }, function done(err) {
        if (err) { res.render('404'); return; }
        res.render('categoria', {categoria: categoria, data: data});
  });
  
});

module.exports = router