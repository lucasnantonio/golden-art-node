var express = require('express');
var express = require('express');
var router  = new express.Router();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appswoobu90DjfHdO');
var nakedString = require("naked-string");

// CATEGORIAS/CATEGORIA ROUTE

var states = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins"]


function getRepresentantes(req, res, next){

  res.locals.states = states;
  res.locals.representantes = [];

  base('Representantes').select({
    view: 'Grid view'
    }).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    records.forEach(function(record) {
        res.locals.representantes.push(record)
    });
    next();
});
}

router.get('/sobre/contato',
getRepresentantes,
function(req, res) {
  res.render('contato', {states: res.locals.states, representantes: res.locals.representantes});
});

module.exports = router
