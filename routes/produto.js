var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");


// PRODUTOS/PRODUTO ROUTE
router.get('/produtos/:produto', getProductInfo, findColorMatches, function(req, res) {
  // console.log(res.locals.productColors);
  res.render('produto', {data: res.locals.data, colors: res.locals.colors});
  res.end();
});


//middleware
function getProductInfo(req, res, next){
  var produto = req.params.produto
  base('Produtos').select({
    filterByFormula: "{Código} = '" +  produto + "'"
  }).firstPage(function(err, records) {
      if (err || !records[0]) { res.render('404'); return; }
      res.locals.data = records[0]["fields"];
      next();
      });
};

// itemsProcessed++;
//     if(itemsProcessed === array.length) {
//       callback();
//     }

function callback () { console.log('all done'); }



function findColorMatches(req, res, next){
  
  var itemsProcessed = 0;
  res.locals.colors = [];
  res.locals.data['Cores Pintura'].forEach(function(colorId, index, arr){
    
      base('Cores').find(colorId, function(err, record) {
        if (err) { console.error(err); return; }
        itemsProcessed++;
        res.locals.colors.push(record);
        console.log("element inserted");
        if(itemsProcessed === arr.length) {
          next();
        };
    });
    });
}

  // console.log(res.locals.colors); 




module.exports = router;