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
  const prev = document.querySelectorAll('.prev');
  const next = document.querySelectorAll('.next');
  console.log(prev)
  console.log(next)

  prev.forEach(function(item){
    item.addEventListener('click', () => productSlider.prev());
  })
  next.forEach(function(item){
    item.addEventListener('click', () => productSlider.next());
  })

};

}

ready(loadCarousel);
