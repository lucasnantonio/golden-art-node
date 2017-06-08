var homeSlider;

function ready (fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
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

function request (e) {
	console.log(e.target.sliderindex);
	let xhr = new XMLHttpRequest();
	let url = window.location.href + 'filtro?linha=' + e.target.id
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        renderContent(xhr.response);
    }
	}
	xhr.send();
}

function onMenuClick (e) {
	e.preventDefault();
	request(e);
	changeSlider(e)
}

function redefineMenuLinks() {
	let filters = document.querySelectorAll('.filter')
	filters.forEach (function (filter) {
		filter.addEventListener('click', onMenuClick)
	});
}

function init(){
	homeSlider = new Siema();
	redefineMenuLinks();
}

ready(init);
