var express = require('express');
var request = require('request');
var app = express();
app.set('view engine', 'ejs')

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Golden-art has started!!!");
});

app.get('/', function(req, res){
  res.render('home');
});


app.get('/linhas/:linha', function(req, res) {
  var linha = req.params.linha;
  console.log(linha);
  request('https://api.airtable.com/v0/appswoobu90DjfHdO/Produtos?api_key=key8KIoDLtssz0g54&filterByFormula={linha}="'+ linha + '"' , function(error, response, body){
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
  request('https://api.airtable.com/v0/appswoobu90DjfHdO/Produtos?api_key=key8KIoDLtssz0g54&filterByFormula={categoria}="'+ categoria + '"' , function(error, response, body){
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
  var url = 'https://api.airtable.com/v0/appswoobu90DjfHdO/Produtos?api_key=key8KIoDLtssz0g54&filterByFormula={Código}="'+ produto + '"'
  console.log(url);
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

  // res.render('produto', {
  //   produto: produto,
  //   categoria: categoria
  // })
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

