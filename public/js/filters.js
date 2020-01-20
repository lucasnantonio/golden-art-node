var homeSlider;
var filters;
var lineFilters = [];


function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function showLoading() {
  document.getElementById('main').innerHTML = '';
  document.getElementById('loader').classList.add('db');
  document.getElementById('loader').classList.remove('dn');
}

function removeLoading() {
  document.getElementById('loader').classList.remove('db');
  document.getElementById('loader').classList.add('dn');
}

function renderContent(res) {
  var wrapper = document.getElementById('main')
  wrapper.innerHTML = res;
}

function request(linha, categoria) {
  var xhr = new XMLHttpRequest();
  var url = window.location.href + 'filtro?linha=' + linha + '&categoria=' + categoria
  showLoading();
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
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
  for (var i = 0; i < parts.length; i++) {
    var seg = parts[i].split("=");
    if (seg[0] == param) {
      return seg[1];
    }
  }
}

function onCategoryChange(e) {
  var realTarget;
  if (e.target.id === "") {
    realTarget = e.target.parentElement;
  } else {
    realTarget = e.target;
  }
  var currentLine = [].slice.call(document.querySelectorAll('.currentLine'))[0].getAttribute('id');
  e.preventDefault();
  request(currentLine, realTarget.id);
  assignCategoryClasses(e, realTarget);
}

function onLineChange(e) {
  var realTarget;
  if (e.target.id === "") {
    realTarget = e.target.parentElement;
  } else {
    realTarget = e.target;
  }
  var currentCategory = [].slice.call(document.querySelectorAll('.currentCategory'))[0].getAttribute('id')
  e.preventDefault();
  request(realTarget.id, currentCategory);
  assignLineClasses(e, realTarget);
}

function assignLineClasses(e, realTarget) {
  lineFilters.forEach(function (item) {
    item.classList.remove('currentLine');
  })
  realTarget.classList.add('currentLine');
}

function assignCategoryClasses(e, realTarget) {
  categoryFilters.forEach(function (item) {
    item.classList.remove('currentCategory');
  })
  realTarget.classList.add('currentCategory');
}

function redefineMenuLinks() {
  categoryFilters = [].slice.call(document.querySelectorAll('.categoryFilter'));
  lineFilters.forEach(function (filter) {
    filter.addEventListener('click', onLineChange)
  });
  categoryFilters.forEach(function (filter) {
    filter.addEventListener('click', onCategoryChange)
  });
}


function init() {
  lineFilters = [].slice.call(document.querySelectorAll('.lineFilter'));
  request('allLines', 'allCategories')
  redefineMenuLinks();
}

ready(init);
