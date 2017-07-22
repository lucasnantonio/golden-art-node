function ready (fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

let contactFilters;
let contactPages;

function init(){
  initLinks();
  contactPages.forEach(function(item){item.classList.remove('db')})
  document.getElementById('arquitetoContent').classList.add('db')
  document.getElementById('arquiteto').classList.add('currentContact')
}

function initLinks(){
  contactFilters = document.querySelectorAll('.contactFilter');
  contactFilters.forEach (function (filter) {
    filter.addEventListener('click', onContactChange);
  });
  contactPages = document.querySelectorAll('.contactPage');
}

function onContactChange (e) {
  e.preventDefault();
  changeContact(e);
	assignContactClasses(e);
}

function assignContactClasses(e) {
	contactFilters.forEach(function(item){
		item.classList.remove('currentContact');
	})
	e.target.classList.add('currentContact');
}

function changeContact(e){
	if (e.target.id == "pessoaFisica"){
		goTo('pessoaFisicaContent');
	}
	else if (e.target.id == "arquiteto"){
		goTo('arquitetoContent');
	}
	else if (e.target.id == "lojista"){
		goTo('lojistaContent');
	}
	else if (e.target.id == "empresa"){
		goTo('empresaContent');
	}
}

function goTo(id){
  contactPages.forEach(function(item){
    item.classList.remove('db');
    item.classList.add('dn');
  })
  document.getElementById(id).classList.add('db');
}

ready(init);