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
  thisProductVariations = []

function restartVariables(req, res, next) {
  (thisProductData = []),
    (thisProductCupulas = []),
    (thisProductVidros = []),
    (thisProductVariations = []);
  next();
}

function parallel(middlewares) {
  return function (req, res, next) {
    async.each(
      middlewares,
      function (mw, cb) {
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
    filterThisProductVariations,
    filterThisProductCupulas,
    filterThisProductVidros
  ]),
  function (req, res) {
    res.render("produto", {
      data: thisProductData[0]["fields"],
      allColors: res.locals.colorsData,
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

//TODO: cúpulas
//TODO: related products

module.exports = router;
