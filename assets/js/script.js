document.addEventListener('DOMContentLoaded', () => {
    // Hero Image Slider
    const cyclingImages = document.querySelectorAll('.gallery-cycling-img');
    let currentImageIndex = 0;

    function showNextImage() {
        if (cyclingImages.length === 0) return;

        if (cyclingImages[currentImageIndex]) {
            cyclingImages[currentImageIndex].classList.remove('active');
        }

        currentImageIndex = (currentImageIndex + 1) % cyclingImages.length;
        cyclingImages[currentImageIndex].classList.add('active');
    }

    if (cyclingImages.length > 1) {
        setInterval(showNextImage, 5000); // Change image every 5 seconds
    }

    // Hero Content Parallax (Subtle)
    const heroContent = document.querySelector('.hero-content');
    const heroGallery = document.querySelector('.hero-gallery'); // The background images

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        // Adjust these values to control the parallax strength
        // A smaller division means stronger parallax effect
        heroGallery.style.transform = `translateZ(-1px) scale(2) translateY(${scrollPos * 0.1}px)`;
        // heroContent.style.transform = `translateY(${scrollPos * -0.1}px)`; // For content to move slightly faster than foreground
    });


    // Fade-in sections on scroll
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Back to Top Button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling down 300px
            backToTopBtn.style.display = 'block';
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
            // Using a timeout to ensure transition plays before display: none
            setTimeout(() => {
                if (window.scrollY <= 300) { // Double check in case user scrolled back up quickly
                    backToTopBtn.style.display = 'none';
                }
            }, 300); // Matches transition duration
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
