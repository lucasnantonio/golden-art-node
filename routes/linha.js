var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");

// LINHAS/LINHA ROUTE

router.get('/linhas/:linha', function(req, res) {

  var linha = nakedString(req.params.linha);
  var data;
  
  base('Produtos').select({
    filterByFormula: "{Linha} = '" +  linha + "'"
  }).eachPage(function page(records, fetchNextPage) {
      data = records;
      fetchNextPage();
  
  }, function done(err) {
      if (err) { res.render('404'); return; }
      res.render('linha', {linha: linha, data: data});
  });
  
})

module.exports = router;