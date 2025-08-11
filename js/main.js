/**
 * This script handles the interactive elements of the website.
 * It is wrapped in a DOMContentLoaded event listener to ensure
 * the HTML document is fully loaded before the script runs.
 */
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Mobile Navigation (Hamburger Menu)
     * Toggles the 'active' class on the hamburger icon and the navigation menu
     * to show or hide the menu on smaller screens.
     */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        // Show/hide menu on hamburger click
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Hide menu when a navigation link is clicked
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    /**
     * Hero Section Slideshow
     * Cycles through the images in the hero section with a fade effect.
     */
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length > 1) { // Only run if there's more than one slide
        let currentSlide = 0;
        const slideInterval = 4000; // Time per slide in milliseconds (4 seconds)

        function nextSlide() {
            // Remove 'active' class from the current slide
            slides[currentSlide].classList.remove('active');
            // Calculate the index of the next slide, looping back to the start
            currentSlide = (currentSlide + 1) % slides.length;
            // Add 'active' class to the new current slide to make it visible
            slides[currentSlide].classList.add('active');
        }
        
        // Initialize the slideshow by making the first slide active
        if (slides[0]) {
            slides[0].classList.add('active');
        }
        
        // Set an interval to automatically call nextSlide
        setInterval(nextSlide, slideInterval);
    }

    /**
     * Footer Year
     * Automatically updates the year in the footer to the current year.
     * This ensures the copyright information is always up to date.
     */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
