// js/experience.js

document.addEventListener('DOMContentLoaded', () => {
    const tabControls = document.querySelector('.tab-controls');

    // Check if the tab controls exist on the page
    if (tabControls) {
        const tabButtons = tabControls.querySelectorAll('.tab-button');
        const contentPanels = document.querySelectorAll('.content-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove 'is-active' from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('is-active'));
                contentPanels.forEach(panel => panel.classList.remove('is-active'));

                // Add 'is-active' to the clicked button
                button.classList.add('is-active');

                // Get the target panel's ID from the button's data-tab attribute
                const targetPanelId = button.dataset.tab;
                const targetPanel = document.getElementById(targetPanelId);

                // Add 'is-active' to the corresponding panel
                if (targetPanel) {
                    targetPanel.classList.add('is-active');
                }
            });
        });
    }
});