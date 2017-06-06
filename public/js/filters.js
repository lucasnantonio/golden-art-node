function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

let filter;

let init = function(){
	filter = document.getElementById('filter')
	filter.addEventListener('click', filterRequest)
}

let filterRequest = function(){
	let xhr = new XMLHttpRequest();
	url = "/filter?linha=linha";
	xhr.open('GET', url);
	xhr.onload = function() {
		console.log(xhr.response);
	};

xhr.send();

}


ready(init);
