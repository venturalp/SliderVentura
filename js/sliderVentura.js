config = {
	centerW : false,
	slidesToShow : 2,
	slidesToScroll: 1,
	navElement: ''
}

//Função para gerar slides
var SliderVentura = function(selector, config){
	this.init(selector, config);
};

SliderVentura.prototype.init = function (selector, config) {
	var slider = document.querySelector(selector);
	var currentSlide = 0;	
	var track = document.createElement('div');
	track.classList.add('track-ventura');
	
	var slides = document.querySelector(selector).children;
			
	var slideW = (slider.clientWidth/config.slidesToShow);
		
	for(var i = 0; i < slides.length; i++){		
		slides[i].classList.add('slide-ventura')		
		slides[i].style.position = 'absolute';
		slides[i].style.top = '0';				
	}
			
	slides = document.querySelectorAll(selector + ' .slide-ventura');
	slider.style.height = slides[0].offsetHeight + 'px';
	
	var qtdSlides = Math.ceil(document.querySelectorAll(selector + ' .slide-ventura:not(.slide-ventura-clone)').length);	
	
	slider.appendChild(track);
	
	track.addEventListener('drag', function(e){
		console.log(e);
		track.style.marginLeft = e.pageX + (-1 *(currentSlide * slideW) * config.slidesToScroll) + 'px';
	})
	
	for (var i = 0; i < slides.length; i++){
		track.appendChild(slides[i]);		
		slideW = (slider.clientWidth/config.slidesToShow);
		slides[i].style.width = slideW + 'px';
		slides[i].style.left = (i * slider.clientWidth)/config.slidesToShow + 'px';		
	}
	
	this.next = function(){
		if (qtdSlides-1 == currentSlide)
			return;
		currentSlide++;		
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
	
	this.goTo = function(pos){
		pos--;
		if (pos < 0 || pos > qtdSlides-1)
			return;
		currentSlide = pos;
		slider.style.height = slides[currentSlide].offsetHeight + 'px';
		track.style.marginLeft = (-1 *(currentSlide * slideW) * config.slidesToScroll) + 'px';
	}
	
	this.getCurrent = function(){
		return currentSlide;
	}
	
	this.totalSlides = function(){
		return qtdSlides;
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