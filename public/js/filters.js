var homeSlider;
var filters;



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

//Alert: rataria ahead. TO-DO: replace this by re-writing siema banner on home without the use of siema.
function setSiemaImage(){
  var width = window.innerWidth
              || document.documentElement.clientWidth
              || document.body.clientWidth;
  var images = document.querySelectorAll('.siema img');
  if (width<500){
     images.forEach(function(image){
       image.src = image.src.replace('.png', '-mobile.png' );
     })
   }
}

function renderContent (res) {
	var wrapper = document.getElementById('main')
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
	var xhr = new XMLHttpRequest();
	var url = window.location.href + 'filtro?linha=' + linha + '&categoria=' + categoria
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

function initFilters(){
  var isFilterOn = false;
  categoryFilterWrapper = document.getElementById("categoryFilterWrapper");
  categoryFilterHandle = document.getElementById("categoryFilterHandle");
  categoryFilterList = document.getElementById('categoryFilterList')
  categoryFilterWrapper.addEventListener('mouseenter', filtersOn);
  categoryFilterHandle.addEventListener('click', filtersOn);
  categoryFilterWrapper.addEventListener('mouseleave', filtersOff);
  window.addEventListener('click', function(e){
    if (e.target != categoryFilterWrapper && e.target != selectedFilter && e.target != filterLabel){
      filtersOff(e);
    }
  })
  function filtersOn(e){
    categoryFilterList.style.display = 'block'
  }
  function filtersOff(e){
    categoryFilterList.style.display = 'none'  }
  function toggleFilters(){
    if (categoryFilterList.style.display =='none'){
      categoryFilterList.style.display = 'block'
    } else {
    categoryFilterList.style.display = 'none'  }
  }
}

function changeSelectedFilter(filter){
  selectedFilter = document.getElementById("selectedFilter");
  selectedFilter.innerHTML = filter;
}

function onCategoryChange(e){
  var categoryFilters = document.getElementById("categoryFilters");
  var currentLine = document.querySelectorAll('.currentLine')[0].getAttribute('id');
  e.preventDefault();
  request(currentLine, e.target.id);
  assignCategoryClasses(e);
  document.getElementById('categoryFilterList').style.display = 'none';
  changeSelectedFilter(e.target.id)
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
  setSiemaImage();
	homeSlider = new Siema({
    draggable: false,
  }
  );
  document.addEventListener('click', toggleFiltersOut)
  function toggleFiltersOut(){
    if (document.getElementById('categoryFilterList').style.display == 'none'){
      document.getElementById('categoryFilterList').style.display = 'block';
    } else {
      return
    }
  }
	homeSlider.goTo(0);
	redefineMenuLinks();
  initFilters();
}

ready(init);
