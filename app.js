var compression       = require('compression')
var express           = require('express');
var request           = require('request');
const nakedString     = require('naked-string');
var app               = express();

var airtableKey = process.env.AIRTABLE_KEY;

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(compression({level: 9}))

var home = require("./routes/home")
var busca = require("./routes/search")
var linha = require("./routes/linha")
var categoria = require("./routes/categoria")
var produto = require("./routes/produto")
var representantes = require("./routes/representantes")


var getData = function(req, res, next){

  var productsData = [];

  base('Produtos').select({}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(item){
      productsData.push(item);
    })

    fetchNextPage();

  }, function done(err) {
    if (err) {res.render('404'); return; }

    res.locals.productsData = productsData;

    next();

  });

}

app.use(getData)
app.use(home)
app.use(categoria)
app.use(linha)
app.use(produto)
app.use(representantes)
app.use(busca)


app.get('/filtro', function(req, res) {

	function filterLinha(item){
		if (item['fields']['Linha']){
			return item['fields']['Linha'].toLowerCase() == req.query.linha.toLowerCase()
		}
	}

	var filteredResults = res.locals.productsData.filter(filterLinha);
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

// CORES
app.get('/cores', function(req, res){
res.render('colors')
});

app.get('*', function(req, res) {
  res.render('404');
})

app.listen(process.env.PORT || 4321, process.env.IP, function(){
  console.log("Golden-art has started!!!");
});
