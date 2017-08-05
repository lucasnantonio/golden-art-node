var airtableKey = process.env.AIRTABLE_KEY;
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');

function getData(req, res, next){
  // console.log('getdata');
  var productsData = [];
  base('Produtos').select({
    view: "Ordem do site",
    fields: [
      "Código",
      "Código Acabamento Especial",
      "Variações",
      "Nome",
      "Descrição",
      "Categoria",
      "Linha",
      "Tipo",
      "Soquete",
      "Cores Pintura",
      "Cores Especiais",
      "Fotos",
      "Acessórios",
      "Cúpulas",
      "Vidros",
      "Ficha Técnica",
      "Relacionados",
      "Lançamento?",
      "Desenho Técnico",
      "Material",
      "Title SEO",
      "Description SEO"
    ]
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(item){
      productsData.push(item);
    })
    fetchNextPage();
  }, function done(err) {
    if (err) {res.render('404'); return; }
    res.locals.productsData = productsData;
    // console.log('getdataEnd');
    next();
  });
}

function getGalleryData(req, res, next){
  var productsData = [];
  base('Produtos').select({
    view: "Ordem do site",
    fields: [
      "Código",
      "Categoria",
      "Linha",
      "Fotos",
      "Lançamento?",
      "Esconder na Galeria?"
    ]
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(item){
      productsData.push(item);
    })
    fetchNextPage();
  }, function done(err) {
    if (err) {res.render('404'); return; }
    res.locals.productsData = productsData;
    // console.log('getdataEnd');
    next();
  });
}

function getColorsData(req, res, next){
  var colorsData = [];
  base('Cores').select({}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(item){
      colorsData.push(item);
    });
    fetchNextPage();
  }, function done(err) {
    if (err) {res.render('404'); return; }
    res.locals.colorsData = colorsData;
    next();
  });
}

function getCupulasData(req, res, next){
  var cupulasData = [];
  base('Cúpulas').select({}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(item){
      cupulasData.push(item);
    });
    fetchNextPage();
  }, function done(err) {
    if (err) {res.render('404'); return; }
    res.locals.cupulasData = cupulasData;
    next();
  });
}

function getVidrosData(req, res, next){
  var vidrosData = [];
  base('Vidros').select({}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(item){
      vidrosData.push(item);
    });
    fetchNextPage();
  }, function done(err) {
    if (err) {res.render('404'); return; }
    res.locals.vidrosData = vidrosData;
    next();
  });
}

module.exports = {
    getData : getData,
    getGalleryData : getGalleryData,
    getColorsData : getColorsData,
    getCupulasData : getCupulasData,
    getVidrosData : getVidrosData,
}
