document.addEventListener('DOMContentLoaded', () => {
    const tabControls = document.querySelector('.tab-controls');

    if (tabControls) {
        const tabButtons = tabControls.querySelectorAll('.tab-button');
        const contentPanels = document.querySelectorAll('.content-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('is-active'));
                contentPanels.forEach(panel => panel.classList.remove('is-active'));

                button.classList.add('is-active');

                const targetPanelId = button.dataset.tab;
                const targetPanel = document.getElementById(targetPanelId);

                if (targetPanel) {
                    targetPanel.classList.add('is-active');
                }
            });
        });
    }
});