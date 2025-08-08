// js/info-grid.js

document.addEventListener('DOMContentLoaded', () => {
    const localTimeElement = document.getElementById('live-time');
    const focusStatusElement = document.getElementById('live-focus');

    // --- Live Clock Logic ---
    function updateTime() {
        if (!localTimeElement) return;

        const options = {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const timeString = formatter.format(new Date());

        localTimeElement.textContent = timeString;
    }
    updateTime();
    setInterval(updateTime, 1000);

    // --- Rotating Focus Status Logic ---
    const focusStatuses = [
        "Building Cool Apps",
        "Writing Poetry",
        "Exploring Swift UI",
        "Crafting User Interfaces"
    ];
    let currentStatusIndex = 0;

    function updateFocusStatus() {
        if (!focusStatusElement) return;

        focusStatusElement.classList.add('fade-out');
        setTimeout(() => {
            currentStatusIndex = (currentStatusIndex + 1) % focusStatuses.length;
            focusStatusElement.textContent = focusStatuses[currentStatusIndex];
            focusStatusElement.classList.remove('fade-out');
        }, 300);
    }
    setInterval(updateFocusStatus, 5000);
});
