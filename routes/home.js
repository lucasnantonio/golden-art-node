var express = require('express');
var router  = new express.Router({mergeParams: true});

router.get('/', function(req, res) {
res.render('home', {productsData: res.locals.productsData});
});

router.get('/filter', function(req, res) {
res.send(req.query);
});

module.exports = router;
