var express = require('express');
var router  = new express.Router({mergeParams: true});
// var Airtable = require('airtable');

// var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');

router.get('/', function(req, res) {
res.render('home', {productsData: res.locals.productsData});
});

module.exports = router;