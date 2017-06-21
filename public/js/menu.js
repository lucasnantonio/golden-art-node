function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var loadMenu = function(){

    var logo = document.getElementById('logo');
    var logoSmall = document.getElementById('logo-small');
    var logoExpanded = document.getElementById('logo-expanded');

    var mobileMenuWrapper = document.getElementById('mobileMenuWrapper');
    var mobileMenuItems = document.getElementById('mobileMenuItems');
    var mobileMenuButton = document.getElementById('mobileMenuButton');

    mobileMenuItems.style.height = "0px";
    logoExpanded.style.opacity = 0;

    mobileMenuButton.addEventListener("click", function( event ) {

      if (mobileMenuItems.style.height == "0px"){
        mobileMenuWrapper.style.backgroundColor = 'white';
        mobileMenuButton.style.color = 'gray';
        mobileMenuItems.style.height = "100vh";
      } else {
        mobileMenuWrapper.style.backgroundColor = 'transparent';
        mobileMenuItems.style.height = "0px";
        mobileMenuButton.style.color = 'white';
      }

    });

    logo.addEventListener("mouseenter", function( event ) {
      logoExpanded.style.opacity = 1;
    });
    logo.addEventListener("mouseleave", function( event ) {
      logoExpanded.style.opacity = 0;
    });
}

ready(loadMenu);
