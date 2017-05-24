var express = require('express');
var request = require('request');
var app = express();

var airtableKey = process.env.AIRTABLE_KEY;
var airtableProductsUrl = process.env.AIRTABLE_PRODUCTS_URL;

app.set('view engine', 'ejs')

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Golden-art has started!!!");
});

app.get('/', function(req, res){
  res.render('home');
});


// app.get('/:section/:subsection', function(req, res){
//   var sec
// })

app.get('/linhas/:linha', function(req, res) {
  var linha = req.params.linha;

  request(airtableProductsUrl + '&filterByFormula={linha}="'+ linha + '"' , function(error, response, body){
    var parsedData = JSON.parse(body);
    if(!error && response.statusCode == 200 && parsedData['records'].length !=0){
      var parsedData = JSON.parse(body);
      res.render('linha', {
        linha: linha,
        data: parsedData
      });
    } else
    res.render('404');
  });
  
})

app.get('/categorias/:categoria', function(req, res) {
  var categoria = req.params.categoria;
  request(airtableProductsUrl + '&filterByFormula={categoria}="'+ categoria + '"' , function(error, response, body){
    var parsedData = JSON.parse(body);
    if(!error && response.statusCode == 200 && parsedData['records'].length !=0){
      res.render('categoria', {
        categoria: categoria,
        data: parsedData
      });
    } else
    res.render('404');
  });
  
});


app.get('/categorias/:categoria/:produto', function(req, res) {
  var linha = null
  var categoria = req.params.categoria
  var produto = req.params.produto
  var url = airtableProductsUrl + '&filterByFormula={Código}="'+ produto + '"'
  request(url , function(error, response, body){
    var parsedData = JSON.parse(body);
    if(!error && response.statusCode == 200 && parsedData['records'].length !=0){
      res.render('produto', {
        
        produto: produto,
        categoria: categoria,
        linha: linha,
        data: parsedData
      });
    } else
    res.render('404');
  });
});

app.get('/linhas/:linha/:produto', function(req, res) {
  
  var categoria = null;
  var linha = req.params.linha
  var produto = req.params.produto

  res.render('produto', {
    produto: produto,
    linha: linha,
    categoria: categoria
  })
});



app.get('*', function(req, res) {
  res.render('404');
})