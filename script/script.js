const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['prev', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
	constructor(container, items, controls){
		this.carouselContainer = container;
		this.carouselControls = controls;
		this.carouselArray = [...items];
		
		// Add touch events
		this.startX = 0;
		this.carouselContainer.addEventListener('touchstart', this.handleTouchStart.bind(this));
		this.carouselContainer.addEventListener('touchmove', this.handleTouchMove.bind(this));
	}

	handleTouchStart(e) {
		this.startX = e.touches[0].clientX;
	}

	handleTouchMove(e) {
		if (!this.startX) return;
		
		const currentX = e.touches[0].clientX;
		const diff = this.startX - currentX;

		if (Math.abs(diff) > 50) { // Minimum swipe distance
			if (diff > 0) {
				// Swipe left - next
				this.setCurrentState({ className: 'gallery-controls-next' });
			} else {
				// Swipe right - previous
				this.setCurrentState({ className: 'gallery-controls-prev' });
			}
			this.startX = 0;
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
		if(direction.className == 'gallery-controls-prev'){
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
