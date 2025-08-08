document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.constellation-container');
    if (!container) return; // Exit if the container isn't on the page

    const svg = container.querySelector('.constellation-svg');
    const stars = container.querySelectorAll('.star');
    const lines = new Set(); // To keep track of lines already drawn
    let lastVisitedStar = null;

    // Store the center coordinates of each star
    const starPositions = new Map();
    stars.forEach(star => {
        const rect = star.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        starPositions.set(star, {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
        });
    });

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            if (lastVisitedStar && lastVisitedStar !== star) {
                // Create a unique key for the line to prevent duplicates
                const lineKey = [star.dataset.starId, lastVisitedStar.dataset.starId].sort().join('-');
                
                if (!lines.has(lineKey)) {
                    // Get positions from our pre-calculated map
                    const pos1 = starPositions.get(lastVisitedStar);
                    const pos2 = starPositions.get(star);

                    // Create the SVG line element
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', pos1.x);
                    line.setAttribute('y1', pos1.y);
                    line.setAttribute('x2', pos2.x);
                    line.setAttribute('y2', pos2.y);
                    line.classList.add('constellation-line');
                    
                    svg.appendChild(line);
                    lines.add(lineKey);
                }
            }
            lastVisitedStar = star;
        });
    });
});
