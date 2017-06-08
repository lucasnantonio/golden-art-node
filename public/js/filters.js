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
	document.getElementById('main').classList.add('ajaxLoader');
}

function removeLoading(){
	document.getElementById('main').classList.remove('ajaxLoader');
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
		homeSlider.goTo(2);
	}
	else if (e.target.id == "cristal"){
		homeSlider.goTo(3);
	}
}

function request (id) {
	let xhr = new XMLHttpRequest();
	let url = window.location.href + 'filtro?linha=' + id
	showLoading();
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
		console.log(xhr.readyState)
		if (xhr.readyState == XMLHttpRequest.DONE) {
				removeLoading();
				renderContent(xhr.response);
    }
	}
	xhr.send();
}

function assignClasses(e) {
	filters.forEach(function(item){
		item.classList.remove('current');
	})
	e.target.classList.add('current');
}

function onMenuClick (e) {
	e.preventDefault();
	request(e.target.id);
	changeSlider(e);
	assignClasses(e);
}

function redefineMenuLinks() {
	filters = document.querySelectorAll('.filter')
	filters.forEach (function (filter) {
		filter.addEventListener('click', onMenuClick)
	});
}

function init(){
	request('designlab')
	homeSlider = new Siema();
	homeSlider.goTo(0);
	redefineMenuLinks();


}

ready(init);
