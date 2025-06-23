document.addEventListener('DOMContentLoaded', function() {
    const clouds = document.querySelectorAll('.cloud');

    // Animate clouds to their final positions
    setTimeout(() => {
        clouds.forEach((cloud, index) => {
            cloud.classList.add('positioned');
            cloud.classList.add('pos' + (index + 1));

            // Add hovering effect after clouds reach their positions
            setTimeout(() => {
                cloud.classList.add('hovering');
            }, 3100); // Wait for the initial positioning to complete
        });
    }, 500);

    // Function to adjust for window resizing
    function adjustForScreenSize() {
        const container = document.getElementById('cloudContainer');
        const minDimension = Math.min(window.innerWidth, window.innerHeight);
    }

    // Initial adjustment
    adjustForScreenSize();

    // Adjust when window is resized
    window.addEventListener('resize', adjustForScreenSize);
});