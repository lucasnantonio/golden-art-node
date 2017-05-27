function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var loadMenu = function(){

    var menuWrapper = document.getElementById('menuWrapper');
    var menuItems = document.getElementById('menuItems');
    menuWrapper.style.height = '4.5rem';
    
    menuItems.addEventListener("mouseenter", function( event ) {   
    menuWrapper.style.height = '15rem';
  	menuWrapper.addEventListener("mouseleave", function(event){
    setTimeout(function() {
		menuWrapper.style.height = '4.5rem';
    }, 500);
    })
  	
}, false);
}

ready(loadMenu);
