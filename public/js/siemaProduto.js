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
    var prev = document.querySelectorAll('.prev');
    var next = document.querySelectorAll('.next');
  prev.forEach(function(item){
    item.addEventListener('click', function(){productSlider.prev()});
  })
  next.forEach(function(item){
    item.addEventListener('click', function(){productSlider.next()});
  })
};
}

ready(loadCarousel);
