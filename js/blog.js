import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

async function loadBlogPosts() {
    const container = document.getElementById('posts-container');
    if (!container) return;

    const postsQuery = query(collection(db, 'posts'), orderBy('publishedAt', 'desc'));
    const postsSnapshot = await getDocs(postsQuery);

    let postsHTML = '';
    postsSnapshot.forEach(doc => {
        const post = doc.data();
        const postDate = post.publishedAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        postsHTML += `
            <a href="/post.html?slug=${post.slug}" class="post-card">
                <img src="${post.coverImageUrl}" alt="${post.title}" class="post-card-thumbnail">
                <div class="post-card-info">
                    <p class="date">${postDate}</p>
                    <h3 class="title">${post.title}</h3>
                    <p class="summary">${post.summary}</p>
                </div>
            </a>
        `;
    });
    container.innerHTML = postsHTML;
}

loadBlogPosts();
