var compression = require('compression')
var express = require('express');
var request = require('request');
const nakedString = require('naked-string');
var app = express();



var airtableKey = process.env.AIRTABLE_KEY;
var airtableProductsUrl = process.env.AIRTABLE_PRODUCTS_URL;

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(compression({level: 9}))

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Golden-art has started!!!");
});

// HOME ROUTE

app.get('/', function(req, res){
  var data;
  
  base('Produtos').select({}).eachPage(function page(records, fetchNextPage) {
      data = records;
      fetchNextPage();
  
  }, function done(err) {
      if (err) { res.render('404'); return; }
      res.render('home', {data: data});
  });
  
});


// LINHAS/LINHA ROUTE

app.get('/linhas/:linha', function(req, res) {
  var linha = nakedString(req.params.linha);
  var data;
  
  base('Produtos').select({
    filterByFormula: "{Linha} = '" +  linha + "'"
  }).eachPage(function page(records, fetchNextPage) {
      data = records;
      fetchNextPage();
  
  }, function done(err) {
      if (err) { res.render('404'); return; }
      res.render('linha', {linha: linha, data: data});
  });
  
})

// CATEGORIAS/CATEGORIA ROUTE

app.get('/categorias/:categoria', function(req, res) {
  var categoria = nakedString(req.params.categoria);
  var data;
  
  base('Produtos').select({
    filterByFormula: "{categoria} = '" +  categoria + "'"
    }).eachPage(function page(records, fetchNextPage) {
      data = records;
      fetchNextPage();
  
    }, function done(err) {
        if (err) { res.render('404'); return; }
        res.render('categoria', {categoria: categoria, data: data});
  });
  
});


// CATEGORIAS/CATEGORIA/PRODUTO ROUTE

app.get('/categorias/:categoria/:produto', function(req, res) {
  var linha = null
  var categoria = req.params.categoria
  var produto = req.params.produto
  var url = airtableProductsUrl + '&filterByFormula={Código}="'+ produto + '"'
  var data;
  
  base('Produtos').select({
    filterByFormula: "{Código} = '" +  produto + "'"
  }).firstPage(function(err, records) {
      if (err || !records[0]) { res.render('404'); return; }
      data = records[0]["fields"];
      res.render('produto', {produto: produto, linha:linha, categoria: categoria, data: data});
      });
  });


// LINHAS/LINHA/PRODUTO ROUTE

app.get('/linhas/:linha/:produto', function(req, res) {
  
  var linha = null
  var categoria = req.params.categoria
  var produto = req.params.produto
  var url = airtableProductsUrl + '&filterByFormula={Código}="'+ produto + '"'
  var data;
  
  base('Produtos').select({
    filterByFormula: "{Código} = '" +  produto + "'"
    }).firstPage(function(err, records) {
        if (err || !records[0] ) { res.render('404'); return; }
        data = records[0]["fields"];
        res.render('produto', {produto: produto, linha:linha, categoria: categoria, data: data});
  });
  
});


app.get('*', function(req, res) {
  res.render('404');
})