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
		console.log(xhr.readyState)
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

function onCategoryChange(){
  var selectedCategoryFilter = categoryFilters.options[categoryFilters.selectedIndex].value;
  var currentLinha = document.querySelectorAll('.current')[0].getAttribute('id')
  request(currentLinha, selectedCategoryFilter);
}
function onMenuClick (e) {
  var categoryFilters = document.getElementById("categoryFilters");
  var selectedCategoryFilter = categoryFilters.options[categoryFilters.selectedIndex].value;
	e.preventDefault();
	request(e.target.id, selectedCategoryFilter);
	changeSlider(e);
	assignClasses(e);
}

function assignClasses(e) {
	filters.forEach(function(item){
		item.classList.remove('current');
	})
	e.target.classList.add('current');
}

function redefineMenuLinks() {
	filters = document.querySelectorAll('.filter')
	filters.forEach (function (filter) {
		filter.addEventListener('click', onMenuClick)
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
