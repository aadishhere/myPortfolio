firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return; 

    try {
        const projectsSnapshot = await db.collection('projects').get();
        let projectsHTML = '';

        projectsSnapshot.forEach(doc => {
            const project = doc.data();

            const tagsHTML = project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
            
            projectsHTML += `
                <div class="project-card">
                    <img src="${project.imageUrl}" alt="${project.title}" class="project-thumbnail">
                    <div class="project-info">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tags">
                            ${tagsHTML}
                        </div>
                        <div class="project-links">
                            <a href="${project.sourceUrl}" class="project-link-button"><i class="fa-brands fa-github"></i>Source</a>
                        </div>
                    </div>
                </div>
            `;
        });

        projectsGrid.innerHTML = projectsHTML;

    } catch (error) {
        console.error("Error loading projects:", error);
        projectsGrid.innerHTML = '<p>Could not load projects at this time.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});