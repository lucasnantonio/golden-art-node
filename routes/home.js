var express = require('express');
var router  = new express.Router({mergeParams: true});
var Airtable = require('airtable');


// HOME ROUTE

router.get('/', function(req, res){

  var data;
  var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
  
  base('Produtos').select({}).eachPage(function page(records, fetchNextPage) {
      data = records;
      fetchNextPage();
  
  }, function done(err) {
      if (err) { res.render('404'); return; }
      res.render('home', {
        data: data,
        url: req.originalUrl
      });
  });
  
});


module.exports = router;