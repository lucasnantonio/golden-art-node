function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var loadCarousel = function(){
  
  var mySiema = new Siema(); /*global Siema*/
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  
  prev.addEventListener('click', () => mySiema.prev());
  next.addEventListener('click', () => mySiema.next());
};

ready(loadCarousel);
