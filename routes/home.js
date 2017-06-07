var express = require('express');
var router  = new express.Router({mergeParams: true});

router.get('/', function(req, res) {
res.render('home', {productsData: res.locals.productsData});
});

module.exports = router;
