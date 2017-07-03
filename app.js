var compression       = require('compression')
var express           = require('express');
var request           = require('request');
var app               = express();
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(compression({level: 9}))

var home = require("./routes/home")
var busca = require("./routes/search")
var cores = require("./routes/cores")
var produto = require("./routes/produto")
var representantes = require("./routes/representantes")
var middleware = require('./middleware/middleware');

// app.use(getData)
app.use(home)
app.use(produto)
app.use(representantes)
app.use(busca)
app.use(cores)

app.get('/filtro', middleware.getData, function(req, res) {

  function filterAll(item){
    if (req.query.categoria.toLowerCase() == 'todos'){
      return item['fields']['Linha'] &&
             item['fields']['Linha'].toLowerCase() == req.query.linha.toLowerCase()
    }else{
    return item['fields']['Linha'] &&
           item['fields']['Linha'].toLowerCase() == req.query.linha.toLowerCase() &&
           item['fields']['Categoria'] &&
           item['fields']['Categoria'].toLowerCase() == req.query.categoria.toLowerCase()
         }
  }

	var filteredResults = res.locals.productsData.filter(filterAll);
	res.render('gallery', {products: filteredResults});
});

// SOBRE
app.get('/sobre/sobre', function(req, res){
res.render('sobre')
});

// CONTATO
app.get('/sobre/contato', function(req, res){
res.render('contato')
});

app.get('*', function(req, res) {
  res.render('404');
})

app.listen(process.env.PORT || 4321, process.env.IP, function(){
  console.log("Golden-art has started!!!");
});
