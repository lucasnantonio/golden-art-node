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

//Alert: rataria ahead. TO-DO: replace this by re-writing siema banner on home without the use of siema.
function setSiemaImage() {
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  var images = [].slice.call(document.querySelectorAll('.siema img'));
  if (width < 500) {
    images.forEach(function (image) {
      image.src = image.src.replace('.png', '-mobile.png');
    })
  }
}

function renderContent(res) {
  var wrapper = document.getElementById('main')
  wrapper.innerHTML = res;
}

function changeSlider(e) {
  if (e.target.id == "designlab") {
    homeSlider.goTo(0);
  }
  else if (e.target.id == "essencial") {
    homeSlider.goTo(1);
  }
  else if (e.target.id == "vintage") {
    homeSlider.goTo(3);
  }
  else if (e.target.id == "cristal") {
    homeSlider.goTo(2);
  }
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
  var currentLine = [].slice.call(document.querySelectorAll('.currentLine'))[0].getAttribute('id');
  e.preventDefault();
  request(currentLine, e.target.id);
  assignCategoryClasses(e);
  changeSelectedFilter(e.target.id)
}

function onLineChange(e) {
  var currentCategory = [].slice.call(document.querySelectorAll('.currentCategory'))[0].getAttribute('id')
  e.preventDefault();
  request(e.target.id, currentCategory);
  changeSlider(e);
  assignLineClasses(e);
}

function assignLineClasses(e) {
  lineFilters.forEach(function (item) {
    item.classList.remove('currentLine');
  })
  e.target.classList.add('currentLine');
}

function assignCategoryClasses(e) {
  categoryFilters.forEach(function (item) {
    item.classList.remove('currentCategory');
  })
  e.target.classList.add('currentCategory');
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
  request('designlab', 'todos')
  setSiemaImage();
  homeSlider = new Siema({
    draggable: false,
  }
  );
  homeSlider.goTo(0);
  redefineMenuLinks();
  initFilters();
}

ready(init);
