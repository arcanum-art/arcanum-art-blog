class Lightbox {
    constructor() {
        this.createLightbox();
        this.bindEvents();
    }
    
    createLightbox() {
        // Create lightbox container
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox';
        
        // Create content container
        this.content = document.createElement('div');
        this.content.className = 'lightbox-content';
        
        // Create navigation and close buttons
        this.createControls();
        
        // Add to DOM
        this.lightbox.appendChild(this.content);
        document.body.appendChild(this.lightbox);
    }
    
    createControls() {
        // Close button
        this.closeBtn = document.createElement('button');
        this.closeBtn.className = 'lightbox-close';
        this.closeBtn.innerHTML = '×';
        
        // Navigation buttons
        this.prevBtn = document.createElement('button');
        this.prevBtn.className = 'lightbox-prev';
        this.prevBtn.innerHTML = '‹';
        
        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'lightbox-next';
        this.nextBtn.innerHTML = '›';
        
        this.lightbox.appendChild(this.closeBtn);
        this.lightbox.appendChild(this.prevBtn);
        this.lightbox.appendChild(this.nextBtn);
    }
    
    bindEvents() {
        // Add click listeners to all collection images
        document.addEventListener('click', (e) => {
            const image = e.target.closest('.collection-item-image img');
            if (image) {
                this.open(image);
            }
        });
        
        // Close button
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Click outside to close
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
    }
    
    open(image) {
        const img = document.createElement('img');
        img.className = 'lightbox-image';
        img.src = image.src;
        img.alt = image.alt;
        
        this.content.innerHTML = '';
        this.content.appendChild(img);
        
        this.lightbox.classList.add('active');
        
        // Store current image and get all images in collection
        this.currentImage = image;
        this.allImages = Array.from(document.querySelectorAll('.collection-item-image img'));
        this.currentIndex = this.allImages.indexOf(image);
        
        // Show/hide navigation based on position
        this.updateNavigation();
    }
    
    close() {
        this.lightbox.classList.remove('active');
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.open(this.allImages[this.currentIndex]);
        }
    }
    
    next() {
        if (this.currentIndex < this.allImages.length - 1) {
            this.currentIndex++;
            this.open(this.allImages[this.currentIndex]);
        }
    }
    
    updateNavigation() {
        this.prevBtn.style.display = this.currentIndex > 0 ? 'block' : 'none';
        this.nextBtn.style.display = this.currentIndex < this.allImages.length - 1 ? 'block' : 'none';
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
});