$(document).ready(function() {
var swiperElems = Array.prototype.slice.call(document.querySelectorAll('.swiper-container'));

var swipers = swiperElems.map(function(item) { 
	// console.log(item);
	return new Swiper(item, {
		direction: 'horizontal',
		pagination: item.getElementsByClassName('swiper-pagination')[0],
		nextButton: item.getElementsByClassName('swiper-button-next')[0],
		prevButton: item.getElementsByClassName('swiper-button-prev')[0],
		roundLengths: true,
		loop: true,
		autoplay: 2000,
		speed: 200,
		slidesPerView: 'auto',
		loopedSlides: item.getElementsByClassName('swiper-slide').length,
		paginatonClickable: true,
		spaceBetween: 30,
		grabCursor: true,
		centeredSlides: true
	});
});


});