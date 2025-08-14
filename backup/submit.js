document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
        apiKey: "AIzaSyB5lFiB9grDsedR9osrB2zvE71l91zHjz0",
        authDomain: "va-solutions-eadd3.firebaseapp.com",
        projectId: "va-solutions-eadd3",
        storageBucket: "va-solutions-eadd3.firebasestorage.app",
        messagingSenderId: "365317326824",
        appId: "1:365317326824:web:f7e4c5da7aabe12120865d",
        measurementId: "G-8PS1VPG0R5"
    };

    // Initialize Firebase
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.error("Firebase has already been initialized.", e);
    }

    const db = firebase.firestore();
    const storage = firebase.storage();

    const form = document.getElementById('testimonial-form');
    const statusMessage = document.getElementById('status-message');
    const submitButton = form.querySelector('.submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // This is crucial, it stops the form from trying to submit the old way

        // --- 1. VALIDATION BLOCK ---
        // Get form values
        const clientName = form.clientName.value.trim();
        const profession = form.profession.value.trim();
        const testimonial = form.testimonial.value.trim();
        const consent = form.consent.checked;
        const photoFile = form.clientPhoto.files[0];

        // Check for required fields and provide clear feedback
        if (!clientName) {
            statusMessage.textContent = 'Please enter your name.';
            statusMessage.style.color = '#ef4444'; // Red
            return;
        }
        if (!testimonial) {
            statusMessage.textContent = 'Please share your story.';
            statusMessage.style.color = '#ef4444';
            return;
        }
        if (!consent) {
            statusMessage.textContent = 'You must consent to be featured.';
            statusMessage.style.color = '#ef4444';
            return;
        }

        // --- 2. SUBMISSION LOGIC ---
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        statusMessage.textContent = 'Processing your submission, please wait...';
        statusMessage.style.color = '#374151'; // Neutral text color

        try {
            let imageUrl = '';

            // 2a. If a photo is provided, upload it first
            if (photoFile) {
                statusMessage.textContent = 'Uploading photo...';
                // Create a unique file path
                const storageRef = storage.ref(`testimonials/${Date.now()}_${photoFile.name}`);
                const snapshot = await storageRef.put(photoFile);
                imageUrl = await snapshot.ref.getDownloadURL(); // Get the public URL
            }

            // 2b. Prepare the data for Firestore
            statusMessage.textContent = 'Saving your story...';
            const testimonialData = {
                agentName: "Shawn",
                clientName: clientName,
                profession: profession,
                testimonial: testimonial,
                imageUrl: imageUrl,
                submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
                isApproved: false,
                
            };

            // 2c. Add the data to Firestore
            await db.collection("testimonials").add(testimonialData);

            // 2d. Success!
            form.reset();
            statusMessage.textContent = 'Thank you! Your story has been submitted for review.';
            statusMessage.style.color = '#10b981'; // Green

        } catch (error) {
            console.error("Error submitting testimonial: ", error);
            statusMessage.textContent = 'An error occurred. Please try again or contact us directly.';
            statusMessage.style.color = '#ef4444'; // Red
        } finally {
            // Re-enable the button regardless of success or failure
            submitButton.disabled = false;
            submitButton.textContent = 'Submit My Story';
        }
    });
});