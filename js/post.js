import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, limit } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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
const converter = new showdown.Converter();

async function loadSinglePost() {
    const slug = new URLSearchParams(window.location.search).get('slug');
    if (!slug) {
        document.body.innerHTML = '<h1>Post not found!</h1>';
        return;
    }

    const postsQuery = query(collection(db, 'posts'), where("slug", "==", slug), limit(1));
    const postSnapshot = await getDocs(postsQuery);

    if (postSnapshot.empty) {
        document.body.innerHTML = '<h1>Post not found!</h1>';
        return;
    }

    const post = postSnapshot.docs[0].data();
    const postDate = post.publishedAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    document.title = `${post.title} | Aadish Jain`;
    document.querySelector('meta[name="description"]').setAttribute('content', post.summary);
    injectArticleSchema(post, postDate);

    document.getElementById('post-title').innerText = post.title;
    document.getElementById('post-meta').innerText = `By ${post.authorName} on ${postDate}`;
    const coverImage = document.getElementById('post-cover-image');
    coverImage.src = post.coverImageUrl;
    coverImage.alt = post.title;
    document.getElementById('post-content').innerHTML = converter.makeHtml(post.content);
}

function injectArticleSchema(post, postDate) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      },
      "headline": post.title,
      "description": post.summary,
      "image": post.coverImageUrl,  
      "author": {
        "@type": "Person",
        "name": post.authorName
      },  
      "publisher": {
        "@type": "Person",
        "name": "Aadish Jain",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.aadishjain.com/assets/aadishjain.webp"
        }
      },
      "datePublished": post.publishedAt.toDate().toISOString()
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}

loadSinglePost();
