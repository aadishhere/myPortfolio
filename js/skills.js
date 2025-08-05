document.addEventListener('DOMContentLoaded', () => {
    const closeButtons = document.querySelectorAll('.js-close-skill');
    const skillCards = document.querySelectorAll('.macos-window-card');
    const skillsContainer = document.querySelector('.skills-container');
    let visibleCardCount = skillCards.length;

    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const cardToHide = event.target.closest('.macos-window-card');
            
            if (cardToHide && !cardToHide.classList.contains('is-hidden')) {
                cardToHide.classList.add('is-hidden');
                visibleCardCount--; 
            }

            checkForReset();
        });
    });

    function checkForReset() {
        if (visibleCardCount === 0) {
            skillsContainer.classList.add('is-resetting');

            setTimeout(() => {
                skillCards.forEach(card => {
                    card.classList.remove('is-hidden');
                });
                skillsContainer.classList.remove('is-resetting');
                
                visibleCardCount = skillCards.length;
            }, 4500);
        }
    }
});
