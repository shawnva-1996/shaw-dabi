document.addEventListener('DOMContentLoaded', () => {

    // --- PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE (SAME AS IN submit.js) ---
    const firebaseConfig = {
        apiKey: "AIzaSyA5_ufA0m_86vq4XmdaDL2dtsgSQwQn5Y0",
        authDomain: "va-solutions.firebaseapp.com",
        projectId: "va-solutions",
        storageBucket: "va-solutions.firebasestorage.app",
        messagingSenderId: "209374641326",
        appId: "1:209374641326:web:40f6088ffb428692ef013f",
        measurementId: "G-3G9FSY4291"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();



    /**
     * Fetch and Display Approved Testimonials
     */
    const testimonialGrid = document.querySelector('.testimonial-grid');
    const counterElement = document.getElementById('testimonial-counter');

    if (testimonialGrid && counterElement) {
        db.collection("testimonials")
            .where("isApproved", "==", true)
            .orderBy("submittedAt", "desc")
            .get()
            .then((querySnapshot) => {
                // FIX & COUNTER: Update the counter with the number of documents found
                const count = querySnapshot.size;
                counterElement.textContent = `Showcasing ${count} Stories of Success`;

                if (querySnapshot.empty) {
                    testimonialGrid.innerHTML = "<p>Client stories coming soon.</p>";
                    return;
                }

                let testimonialsHTML = '';
                querySnapshot.forEach((doc) => {
                    const story = doc.data();
                    // Use the uploaded image URL, or a placeholder if it's not available
                    const imageSrc = story.imageUrl || 'assets/images/optimized_images/placeholder.webp';

                    testimonialsHTML += `
                    <div class="testimonial-card-new">
                      <div class="testimonial-img-wrapper">
                        <img src="${imageSrc}" alt="${story.clientName}" loading="lazy" width="400" height="400"/>
                      </div>
                      <div class="testimonial-content">
                        <p>"${story.testimonial}"</p>
                        <div class="testimonial-author">
                            <h3>${story.clientName}</h3>
                            <span>${story.profession}</span>
                        </div>
                      </div>
                    </div>
                  `;
                });
                testimonialGrid.innerHTML = testimonialsHTML;
            })
            .catch((error) => {
                console.error("Error getting testimonials: ", error);
                // Provide helpful error message for debugging
                testimonialGrid.innerHTML = `<p style="color:red;">Error loading testimonials. Check the browser console (F12) for details.</p>`;
            });
    }


    /**
     * Mobile Navigation (Hamburger Menu) - Unchanged
     */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    /**
     * Hero Section Slideshow - Unchanged
     */
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        slides[0]?.classList.add('active'); // Safely add active class
        setInterval(() => {
            slides[currentSlide]?.classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide]?.classList.add('active');
        }, 4000);
    }

    /**
     * Footer Year - Unchanged
     */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});