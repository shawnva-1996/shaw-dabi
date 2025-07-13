document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Slideshow ---
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    let currentSlide = 0;
    const slideInterval = 4000; // 4 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 1) {
        // Start the slideshow if there's more than one slide
        setInterval(nextSlide, slideInterval);
    }





    // --- Testimonial Card Interaction ---
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    testimonialCards.forEach(card => {
        // Function to toggle the active state
        const toggleCard = () => {
            card.classList.toggle('is-active');
        };

        // Event listener for mouse click
        card.addEventListener('click', toggleCard);

        // Event listener for keyboard interaction (Enter or Space key)
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent page from scrolling on Space
                toggleCard();
            }
        });
    });

    // --- Footer Year ---
    document.getElementById('year').textContent = new Date().getFullYear();
});
