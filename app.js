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
var linha = require("./routes/linha")
var categoria = require("./routes/categoria")
var produto = require("./routes/produto")


app.use(home)
app.use(categoria)
app.use(linha)
app.use(produto)


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


app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Golden-art has started!!!");
});