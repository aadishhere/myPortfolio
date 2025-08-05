document.addEventListener('DOMContentLoaded', () => {
    const closeButtons = document.querySelectorAll('.js-close-skill');
    const skillCards = document.querySelectorAll('.macos-window-card');
    const skillsContainer = document.querySelector('.skills-container');

    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const cardToHide = event.target.closest('.macos-window-card');
            
            if (cardToHide) {
                cardToHide.classList.add('is-hidden');
            }
            checkForReset();
        });
    });

    function checkForReset() {
        const visibleCards = document.querySelectorAll('.macos-window-card:not(.is-hidden)');

        if (visibleCards.length === 0) {
            skillsContainer.classList.add('is-resetting');

            setTimeout(() => {
                skillCards.forEach(card => {
                    card.classList.remove('is-hidden');
                });
                skillsContainer.classList.remove('is-resetting');
            }, 4000);
        }
    }
});