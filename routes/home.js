var express = require('express');
var router  = new express.Router({mergeParams: true});
var middleware = require('../middleware/middleware');

router.get('/', function(req, res) {
res.render('home', {productsData: res.locals.productsData});
});

module.exports = router;
