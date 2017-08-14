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
    var prev = [].slice.call(document.querySelectorAll('.prev'));
    var next = [].slice.call(document.querySelectorAll('.next'));
  prev.forEach(function(item){
    item.addEventListener('click', function(){productSlider.prev()});
  })
  next.forEach(function(item){
    item.addEventListener('click', function(){productSlider.next()});
  })
};
}

ready(loadCarousel);
