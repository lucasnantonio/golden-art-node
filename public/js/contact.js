function ready (fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var contactFilters;
var contactPages;

function init(){
  initLinks();
  contactPages.forEach(function(item){item.classList.remove('db')})
  document.getElementById('lojistaContent').classList.add('db')
  document.getElementById('lojista').classList.add('currentContact')
}

function initLinks(){
  contactFilters = [].slice.call(document.querySelectorAll('.contactFilter'));
  contactFilters.forEach (function (filter) {
    filter.addEventListener('click', onContactChange);
  });
  contactPages = [].slice.call(document.querySelectorAll('.contactPage'));
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
