function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var loadMenu = function(){

    // var desktopMenuWrapper = document.getElementById('desktopMenuWrapper');
    // var desktopMenuItems = document.getElementById('desktopMenuItems');
    var mobileMenuWrapper = document.getElementById('mobileMenuWrapper');
    var mobileMenuItems = document.getElementById('mobileMenuItems');
    var mobileMenuButton = document.getElementById('mobileMenuButton');

    mobileMenuItems.style.height = "0px";

    mobileMenuButton.addEventListener("click", function( event ) {

      if (mobileMenuItems.style.height == "0px"){
        mobileMenuItems.style.height = "100vh";
      } else {
        mobileMenuItems.style.height = "0px";
      }

    });

    // desktopMenuWrapper.style.height = '4.5rem';
    // desktopMenuItems.addEventListener("mouseenter", function( event ) {
    //   desktopMenuWrapper.style.height = '15rem';
    //   desktopMenuWrapper.style.boxShadow = "0px 0px 65px rgba(0,0,0,.2)";
    // 	desktopMenuWrapper.addEventListener("mouseleave", function(event){
    //     setTimeout(function() {
    //   		desktopMenuWrapper.style.height = '4.5rem';
    //   		desktopMenuWrapper.style.boxShadow = "0px 0px 0px black";
    //       }, 500);
    //     })
    // });
}

ready(loadMenu);
