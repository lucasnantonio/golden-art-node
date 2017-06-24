let homeSlider;
let filters;



function ready (fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function showLoading(){
	document.getElementById('main').innerHTML = '';
	document.getElementById('loader').classList.add('db');
	document.getElementById('loader').classList.remove('dn');
}

function removeLoading(){
	document.getElementById('loader').classList.remove('db');
	document.getElementById('loader').classList.add('dn');
}

function renderContent (res) {
	let wrapper = document.getElementById('main')
	wrapper.innerHTML = res;
}

function changeSlider(e){
	if (e.target.id == "designlab"){
		homeSlider.goTo(0);
	}
	else if (e.target.id == "essencial"){
		homeSlider.goTo(1);
	}
	else if (e.target.id == "vintage"){
		homeSlider.goTo(3);
	}
	else if (e.target.id == "cristal"){
		homeSlider.goTo(2);
	}
}

function request (linha, categoria) {
	let xhr = new XMLHttpRequest();
	let url = window.location.href + 'filtro?linha=' + linha + '&categoria=' + categoria
  console.log(url);
	showLoading();
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
				renderContent(xhr.response);
				removeLoading();
    }
	}
	xhr.send();
}

function getUrlParams(param) {
  var query = window.location.search.substring(1);
  var parts = query.split("&");
  for (var i=0;i<parts.length;i++) {
    var seg = parts[i].split("=");
    if (seg[0] == param) {
      return seg[1];
    }
  }
}

function onCategoryChange(e){
  var categoryFilters = document.getElementById("categoryFilters");
  var currentLine = document.querySelectorAll('.currentLine')[0].getAttribute('id');
  e.preventDefault();
  request(currentLine, e.target.id);
  assignCategoryClasses(e);
}

function onLineChange (e) {
  var lineFilters = document.getElementById("lineFilters");
  var currentCategory = document.querySelectorAll('.currentCategory')[0].getAttribute('id')
	e.preventDefault();
	request(e.target.id, currentCategory);
	changeSlider(e);
	assignLineClasses(e);
}

function assignLineClasses(e) {
	lineFilters.forEach(function(item){
		item.classList.remove('currentLine');
	})
	e.target.classList.add('currentLine');
}

function assignCategoryClasses(e) {
	categoryFilters.forEach(function(item){
		item.classList.remove('currentCategory');
	})
	e.target.classList.add('currentCategory');
}

function redefineMenuLinks() {
	lineFilters = document.querySelectorAll('.lineFilter')
  categoryFilters = document.querySelectorAll('.categoryFilter')
	lineFilters.forEach (function (filter) {
		filter.addEventListener('click', onLineChange)
	});
  categoryFilters.forEach (function (filter) {
		filter.addEventListener('click', onCategoryChange)
	});
}

function init(){
	request('designlab', 'todos')
	homeSlider = new Siema({
    draggable: false,
  }
  );
	homeSlider.goTo(0);
	redefineMenuLinks();
}

ready(init);
