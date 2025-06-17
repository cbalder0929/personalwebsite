const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
	constructor(container, items, controls){
		this.carouselContainer = container;
		this.carouselControls = controls;
		this.carouselArray = [...items];
	}
	updateGallery(){
		this.carouselArray.forEach(el => {
			el.classList.remove('gallery-item-1');
			el.classList.remove('gallery-item-2');
			el.classList.remove('gallery-item-3');
			el.classList.remove('gallery-item-4');
			el.classList.remove('gallery-item-5');
		});
		
		this.carouselArray.slice(0, 5).forEach((el, i) => {
			el.classList.add(`gallery-item-${i + 1}`);
		});
	}
	
	setCurrentState(direction){
		if(direction.className == 'gallery-controls-previous'){
			this.carouselArray.unshift(this.carouselArray.pop());
		}else{
			this.carouselArray.push(this.carouselArray.shift());
		}
		this.updateGallery();
	}
	
	setControls() {
		this.carouselControls.forEach(control => {
			const button = document.createElement('button');
			button.className = `gallery-controls-${control}`;
			button.innerText = control;
			galleryControlsContainer.appendChild(button);
		});
	}
	
	useControls(){
		const triggers = [...galleryControlsContainer.childNodes];
		triggers.forEach(control => {
			control.addEventListener('click', e => {
				e.preventDefault();
				this.setCurrentState(control);
			});
		});
	}
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();

let startX = 0;
let endX = 0;

// Listen for swipe on the carousel container
galleryContainer.addEventListener('touchstart', (e) => {
	startX = e.touches[0].clientX;
});

galleryContainer.addEventListener('touchend', (e) => {
	endX = e.changedTouches[0].clientX;
	const diff = startX - endX;

	if (diff > 50) {
		// Swiped left → go to next image
		exampleCarousel.setCurrentState({ className: 'gallery-controls-next' });
	} else if (diff < -50) {
		// Swiped right → go to previous image
		exampleCarousel.setCurrentState({ className: 'gallery-controls-previous' });
	}
});
