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
      res.render('home', {
        data: data,
        url: req.originalUrl
      });
  });
  
});

// SOBRE
app.get('/sobre/sobre', function(req, res){
res.render('sobre')
});

// CONTATO
app.get('/sobre/contato', function(req, res){
res.render('contato')
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
    filterByFormula: "{Categoria} = '" +  categoria + "'"
    }).eachPage(function page(records, fetchNextPage) {
      data = records;
      fetchNextPage();
  
    }, function done(err) {
        if (err) { res.render('404'); return; }
        res.render('categoria', {categoria: categoria, data: data});
  });
  
});


// PRODUTOS/PRODUTO ROUTE

app.get('/produtos/:produto', function(req, res) {
  
  var produto = req.params.produto
  var data;
  
  base('Produtos').select({
    filterByFormula: "{Código} = '" +  produto + "'"
  }).firstPage(function(err, records) {
      if (err || !records[0]) { res.render('404'); return; }
      data = records[0]["fields"];
      res.render('produto', {data: data});
      });
  });


app.get('*', function(req, res) {
  res.render('404');
})