const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');


class Carousel {
	constructor(container, items, controls){
		this.carouselContainer = container;
		this.carouselControls = controls;
		this.carouselArray = [...items];
		
		// Touch event variables
		this.touchStartX = 0;
		this.touchEndX = 0;
		this.minSwipeDistance = 50; // minimum distance for swipe
		
		// Initialize touch events
		this.initTouchEvents();
	}

	initTouchEvents() {
		this.carouselContainer.addEventListener('touchstart', (e) => {
			this.touchStartX = e.changedTouches[0].screenX;
		}, { passive: true });

		this.carouselContainer.addEventListener('touchend', (e) => {
			this.touchEndX = e.changedTouches[0].screenX;
			this.handleSwipe();
		}, { passive: true });
	}

	handleSwipe() {
		const swipeDistance = this.touchEndX - this.touchStartX;
		
		if (Math.abs(swipeDistance) < this.minSwipeDistance) return;
		
		if (swipeDistance > 0) {
			// Swipe right - show previous
			this.setCurrentState({ className: 'gallery-controls-previous' });
		} else {
			// Swipe left - show next
			this.setCurrentState({ className: 'gallery-controls-next' });
		}
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
