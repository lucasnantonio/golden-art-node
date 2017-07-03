var express = require('express');
var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var middleware = require('../middleware/middleware');

// CORES ROUTE
router.get("/cores",
  middleware.getColorsData,
    function(req, res) {
  res.render('colors', {
    colors: res.locals.colorsData
  });
  res.end();
});

module.exports = router
