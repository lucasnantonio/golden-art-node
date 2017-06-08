function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var loadCarousel = function(){

  var productSlider = new Siema();
	if (document.querySelector('.prev') != null){
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  prev.addEventListener('click', () => productSlider.prev());
  next.addEventListener('click', () => productSlider.next());
	}

};

ready(loadCarousel);
