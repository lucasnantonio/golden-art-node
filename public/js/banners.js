// function ready(fn) {
//   if (document.readyState != 'loading'){
//     fn();
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }
//
// var bannerAnimations = function(){
//
// 	var banners = document.querySelectorAll('.banner')
// 	console.log(banners)
//
// 	for (i = 0; i < banners.length; i++) {
// 		banners[i].addEventListener('mouseenter', function(ev){
// 			ev.target.classList.add('flexGrow')
// 		})
// 		banners[i].addEventListener('mouseleave', function(ev){
// 			ev.target.classList.remove('flexGrow')
// 		})
// 	}
// }

// ready(bannerAnimations);
var Siema = require('siema')

// New siema instance
const mySiema = new Siema();

// Add a function that generates pagination to prototype
Siema.prototype.addPagination = function() {
  for (let i = 0; i < this.innerElements.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.addEventListener('click', () => this.goTo(i));
    this.selector.appendChild(btn);
  }
}

// Trigger pagination creator
mySiema.addPagination();
