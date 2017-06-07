var isAnimating = false;

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadContent(res){

	let wrapper = document.getElementById('main')

	wrapper.innerHTML = res;

}

function request(id) {
	let xhr = new XMLHttpRequest();
	let url = window.location.href + 'filtro?linha=' + id
	console.log(url)
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        loadContent(xhr.response);
    }
	}
	xhr.send();
}

function onMenuClick (e) {
	e.preventDefault();
	request(e.target.id);
}

function redefineMenuLinks() {
	let filters = document.querySelectorAll('.filter')
	filters.forEach (function (filter) {
		filter.addEventListener('click', onMenuClick)
	});
}

function init(){
	redefineMenuLinks();
}

ready(init);
