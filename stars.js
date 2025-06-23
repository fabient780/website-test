document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.getElementById('starsContainer');
    const numberOfStars = 300;
    
    // Use document fragment for batch DOM operations
    const fragment = document.createDocumentFragment();
    const stars = [];

    // Create star elements
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position
        const x = Math.random() * 100; // percent
        const y = Math.random() * 100; // percent

        // Random size (small dots)
        const initialSize = Math.random() * 2 + 1;

        // Set styles directly
        star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${initialSize}px;
            height: ${initialSize}px;
            will-change: transform, width, height;
        `;
        
        // Store original positions and size for zoom effect
        star.dataset.originalX = x;
        star.dataset.originalY = y;
        star.dataset.initialSize = initialSize;
        
        // Use data attributes only if needed for animation
        if (Math.random() < 0.2) { // 20% of stars for twinkling
            star.dataset.twinkle = true;
        }

        fragment.appendChild(star);
        stars.push(star);
    }

    // Add all stars to DOM at once (single reflow)
    starsContainer.appendChild(fragment);

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
        // Add fade-in class to all stars
        stars.forEach(star => {
            star.classList.add('fade-in');
        });

        // Apply twinkle effect only to stars marked for twinkling
        setTimeout(() => {
            const twinkleStars = stars.filter(star => star.dataset.twinkle);
            twinkleStars.forEach(star => {
                star.classList.add('twinkle');
                // Randomize animation duration for more natural effect
                star.style.animationDuration = `${Math.random() * 2 + 3}s`;
            });
        }, 1000);
    });
    
    // Optimized scroll handler with throttling
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(function() {
            updateStarsOnScroll();
        });
    });

    // Combined and optimized star update function
    function updateStarsOnScroll() {
        const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const maxZoom = 2.8;
        const zoomFactor = 1 + (scrollPercentage * (maxZoom - 1));
        const centerX = 50;
        const centerY = 50;
        
        // Calculate visibility threshold for performance
        const visibilityThreshold = numberOfStars * (1 - scrollPercentage * 0.5);

        stars.forEach((star, index) => {
            const initialSize = parseFloat(star.dataset.initialSize);
            const originalX = parseFloat(star.dataset.originalX);
            const originalY = parseFloat(star.dataset.originalY);

            // Hide stars beyond visibility threshold for performance
            if (index < visibilityThreshold) {
                if (star.style.display === 'none') {
                    star.style.display = 'block';
                }

                // Calculate new size
                const newSize = initialSize * zoomFactor;
                star.style.width = `${newSize}px`;
                star.style.height = `${newSize}px`;

                // Calculate new position with zoom effect from center
                const deltaX = originalX - centerX;
                const deltaY = originalY - centerY;
                const zoomX = originalX + (deltaX * scrollPercentage * 0.2);
                const zoomY = originalY + (deltaY * scrollPercentage * 0.2);

                star.style.left = `${zoomX}%`;
                star.style.top = `${zoomY}%`;
            } else if (star.style.display !== 'none') {
                star.style.display = 'none';
            }
        });
    }
});