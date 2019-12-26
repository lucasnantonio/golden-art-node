var express = require("express");
var router = new express.Router();
var Airtable = require("airtable");
var async = require("async");
var base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
  "appswoobu90DjfHdO"
);
var nakedString = require("naked-string");
var middleware = require("../middleware/middleware");

let thisProductData = [],
  thisProductCupulas = [],
  thisProductVidros = [],
  thisProductVariations = [],
  thisProductColors = [],
  thisProductSpecialColors = [];

function restartVariables(req, res, next) {
  (thisProductData = []),
    (thisProductCupulas = []),
    (thisProductVidros = []),
    (thisProductVariations = []),
    (thisProductColors = []),
    (thisProductSpecialColors = []);
  next();
}

function parallel(middlewares) {
  return function(req, res, next) {
    async.each(
      middlewares,
      function(mw, cb) {
        mw(req, res, cb);
      },
      next
    );
  };
}

// PRODUTOS/PRODUTO ROUTE
router.get(
  "/produtos/:produto",
  parallel([
    middleware.getData,
    middleware.getColorsData,
    middleware.getCupulasData,
    middleware.getVidrosData
  ]),
  restartVariables,
  getProductInfo,
  parallel([
    filterThisProductColors,
    filterThisProductSpecialColors,
    filterThisProductVariations,
    filterThisProductCupulas,
    filterThisProductVidros
  ]),
  function(req, res) {
    res.render("produto", {
      data: thisProductData[0]["fields"],
      colors: thisProductColors,
      specialcolors: thisProductSpecialColors,
      variations: thisProductVariations,
      cupulas: thisProductCupulas,
      vidros: thisProductVidros
    });
  }
);

function getProductInfo(req, res, next) {
  thisProductData = res.locals.productsData.filter(function filterProducts(
    item
  ) {
    if (item["fields"]["Código"]) {
      return (
        nakedString(item["fields"]["Código"]) == nakedString(req.params.produto)
      );
    }
  });
  if (thisProductData[0]) {
    next();
  } else {
    res.render("404");
  }
}

function filterThisProductVidros(req, res, next) {
  if (thisProductData[0]["fields"]["Vidros"]) {
    thisProductVidros = res.locals.vidrosData.filter(item => {
      return !(
        thisProductData[0]["fields"]["Vidros"].indexOf(item["id"]) == -1
      );
    });
    next();
  } else {
    next();
  }
}

function filterThisProductCupulas(req, res, next) {
  if (thisProductData[0]["fields"]["Cúpulas"]) {
    thisProductCupulas = res.locals.cupulasData.filter(item => {
      return !(
        thisProductData[0]["fields"]["Cúpulas"].indexOf(item["id"]) == -1
      );
    });
    next();
  } else {
    next();
  }
}

function filterThisProductVariations(req, res, next) {
  if (thisProductData[0]["fields"]["Variações"]) {
    thisProductVariations = res.locals.productsData.filter(item => {
      return !(
        thisProductData[0]["fields"]["Variações"].indexOf(item["id"]) == -1
      );
    });
    next();
  } else {
    next();
  }
}

function filterThisProductColors(req, res, next) {
  if (thisProductData[0]["fields"]["Cores Pintura"]) {
    thisProductColors = res.locals.colorsData.filter(item => {
      return !(
        thisProductData[0]["fields"]["Cores Pintura"].indexOf(item["id"]) == -1
      );
    });
    next();
  } else {
    next();
  }
}

function filterThisProductSpecialColors(req, res, next) {
  if (thisProductData[0]["fields"]["Cores Especiais"]) {
    thisProductSpecialColors = res.locals.colorsData.filter(item => {
      return !(
        thisProductData[0]["fields"]["Cores Especiais"].indexOf(item["id"]) ==
        -1
      );
    });
    next();
  } else {
    next();
  }
}

//TODO: special colors
//TODO: cúpulas
//TODO: related products

module.exports = router;
