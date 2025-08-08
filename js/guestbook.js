import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAy8bC4VPqwOajedDs-vLldSoKDjcJVZd0",
    authDomain: "myportfolio-aadishhere.firebaseapp.com",
    projectId: "myportfolio-aadishhere",
    storageBucket: "myportfolio-aadishhere.firebasestorage.app",
    messagingSenderId: "483800227478",
    appId: "1:483800227478:web:994bda2c2d41a7377eecb7",
    measurementId: "G-WZ3WLWDVK5"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Handle Form Submission ---
const guestbookForm = document.getElementById('guestbook-form');
if (guestbookForm) {
    guestbookForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page

        const nameInput = document.getElementById('guest-name');
        const messageInput = document.getElementById('guest-message');
        const submitButton = guestbookForm.querySelector('button');

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message) {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            try {
                await addDoc(collection(db, 'guestbook'), {
                    name: name,
                    message: message,
                    createdAt: serverTimestamp()
                });
                nameInput.value = '';
                messageInput.value = '';
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Sorry, there was an error submitting your message.");
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Sign Guestbook';
            }
        }
    });
}


// --- Listen for and Display Messages in Real-Time ---
const messagesContainer = document.getElementById('guestbook-messages');
if (messagesContainer) {
    const messagesQuery = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));

    onSnapshot(messagesQuery, (snapshot) => {
        let messagesHTML = '';
        if (snapshot.empty) {
            messagesContainer.innerHTML = '<p>Be the first to sign the guestbook!</p>';
            return;
        }

        snapshot.forEach(doc => {
            const msg = doc.data();
            const date = msg.createdAt ? msg.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now';
            
            messagesHTML += `
                <div class="message-card">
                    <div class="message-header">
                        <p class="message-name">${escapeHTML(msg.name)}</p>
                        <p class="message-date">${date}</p>
                    </div>
                    <p class="message-body">${escapeHTML(msg.message)}</p>
                </div>
            `;
        });
        messagesContainer.innerHTML = messagesHTML;
    });
}

// Simple function to prevent HTML injection attacks
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
    );
}
