config = {
	centerW : false,
	slidesToShow : 1,
	slidesToScroll: 1,
	navElement: ''
}

var SliderVentura = function(selector, config){
	this.init(selector, config);
}; 

SliderVentura.prototype.init = function (selector, config) {
	var slider = document.querySelector(selector);
	var currentSlide = 0;
	var track = document.createElement('div');
	track.classList.add('track-ventura');
	
	var slides = document.querySelector(selector).children;
	
	slider.style.height = slides[0].offsetHeight + 'px';
	var qtdSlides = Math.floor(slides.length/config.slidesToScroll);
	var slideW = (slider.offsetWidth/config.slidesToShow);
		
	for(var i = 0; i < slides.length; i++){		
		slides[i].classList.add('slide-ventura')
		slides[i].style.width = (slider.offsetWidth/config.slidesToShow) + 'px';
		slides[i].style.position = 'absolute';
		slides[i].style.top = '0';
		slides[i].style.left = (i * slider.offsetWidth)/config.slidesToShow + 'px';
		slides[i].addEventListener('drag', function(e){
			console.log(e);
			track.style.marginLeft = -e.pageX + (-1 *(currentSlide * slideW) * config.slidesToScroll) + 'px';
		})
	}
	
	slides = document.querySelectorAll(selector + ' .slide-ventura');
	
	slider.appendChild(track);
	
	for (var i = 0; i < slides.length; i++){
		track.appendChild(slides[i]);
	}
	
	this.next = function(){
		if (qtdSlides-1 == currentSlide)
			return;
		currentSlide++;
		slider.style.height = slides[currentSlide].offsetHeight + 'px';
		track.style.marginLeft = (-1 *(currentSlide * slideW) * config.slidesToScroll) + 'px';		
		slider.style.height = slides[currentSlide].offsetHeight + 'px';
	}
	
	this.prev = function(){		
		if (currentSlide == 0)
			return;
		currentSlide--;
		slider.style.height = slides[currentSlide].offsetHeight + 'px';
		track.style.marginLeft = (-1 *(currentSlide * slideW) * config.slidesToScroll) + 'px';
	}	
	
	var controls = document.createElement('div');
	controls.classList.add('controls-ventura');
	controls.classList.add('centerW-ventura');
	
	slider.appendChild(controls);
	
	var btPrev = document.createElement('div');
	btPrev.classList.add('arrow-ventura');
	btPrev.classList.add('prev-ventura');
	btPrev.addEventListener('click', this.prev);
	
	var btNext = document.createElement('div');
	btNext.classList.add('arrow-ventura');
	btNext.classList.add('next-ventura');
	btNext.addEventListener('click', this.next);
	
	controls.appendChild(btPrev);
	controls.appendChild(btNext);
}
	

window.addEventListener('load', function(){
	var slider = new SliderVentura('#slider', config);
})


//<div class="controls-ventura centerW-ventura">
//			<div class="prev-ventura arrow-ventura inactivated">Previous</div>
//			<div class="next-ventura arrow-ventura">Next</div>
//		</div>