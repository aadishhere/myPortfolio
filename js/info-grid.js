// js/showcase.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Live Status Logic ---
    const localTimeElement = document.getElementById('live-time');
    const focusStatusElement = document.getElementById('live-focus');

    if (localTimeElement) {
        function updateTime() {
            const options = { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true };
            localTimeElement.textContent = new Intl.DateTimeFormat('en-US', options).format(new Date());
        }
        updateTime();
        setInterval(updateTime, 1000);
    }

    if (focusStatusElement) {
        const focusStatuses = ["Building Cool Apps", "Writing Poetry", "Exploring SwiftUI", "Crafting Interfaces"];
        let currentStatusIndex = 0;
        function updateFocusStatus() {
            focusStatusElement.classList.add('fade-out');
            setTimeout(() => {
                currentStatusIndex = (currentStatusIndex + 1) % focusStatuses.length;
                focusStatusElement.textContent = focusStatuses[currentStatusIndex];
                focusStatusElement.classList.remove('fade-out');
            }, 300);
        }
        setInterval(updateFocusStatus, 5000);
    }

    // --- Bookshelf Logic ---
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        book.addEventListener('click', () => {
            book.classList.toggle('is-flipped');
        });
    });
});
