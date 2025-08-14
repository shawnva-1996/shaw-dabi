document.addEventListener('DOMContentLoaded', () => {
    // PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
    const firebaseConfig = {
        apiKey: "AIzaSyA5_ufA0m_86vq4XmdaDL2dtsgSQwQn5Y0",
        authDomain: "va-solutions.firebaseapp.com",
        projectId: "va-solutions",
        storageBucket: "va-solutions.firebasestorage.app",
        messagingSenderId: "209374641326",
        appId: "1:209374641326:web:40f6088ffb428692ef013f",
        measurementId: "G-3G9FSY4291"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const storyTableBody = document.getElementById('story-table-body');
    const logoutBtn = document.getElementById('logout-btn');

    // --- AUTHENTICATION LOGIC ---
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            loadTestimonials();
        } else {
            // User is signed out
            loginSection.classList.remove('hidden');
            dashboardSection.classList.add('hidden');
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                loginError.textContent = error.message;
            });
    });

    logoutBtn.addEventListener('click', () => {
        auth.signOut();
    });

    // --- DASHBOARD LOGIC ---
    async function loadTestimonials() {
        storyTableBody.innerHTML = '<tr><td colspan="4">Loading stories...</td></tr>';
        const snapshot = await db.collection("testimonials").orderBy("submittedAt", "desc").get();
        
        let html = '';
        snapshot.forEach(doc => {
            const story = doc.data();
            const docId = doc.id;
            const statusClass = story.isApproved ? 'status-approved' : 'status-pending';
            const statusText = story.isApproved ? 'Approved' : 'Pending';
            
            html += `
                <tr>
                    <td><strong>${story.clientName}</strong><br>${story.profession}</td>
                    <td>${story.testimonial}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td>
                        <button class="approve-btn" data-id="${docId}" ${story.isApproved ? 'disabled' : ''}>
                            Approve
                        </button>
                    </td>
                </tr>
            `;
        });
        storyTableBody.innerHTML = html;
    }

    // Add event listener for the approve buttons
    storyTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('approve-btn')) {
            const docId = e.target.dataset.id;
            approveTestimonial(docId, e.target);
        }
    });

    async function approveTestimonial(docId, button) {
        button.disabled = true;
        button.textContent = 'Approving...';
        const storyRef = db.collection("testimonials").doc(docId);
        
        try {
            await storyRef.update({ isApproved: true });
            // Visually update the row without a full reload
            const statusCell = button.parentElement.previousElementSibling;
            statusCell.textContent = 'Approved';
            statusCell.className = 'status-approved';
        } catch (error) {
            console.error("Error approving document: ", error);
            button.textContent = 'Error';
        }
    }
});