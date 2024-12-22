document.addEventListener('DOMContentLoaded', () => {
    const menuText = document.querySelector('.menu-text');
    const menuIcon = document.querySelector('.menu-icon');
    const circle = document.querySelector('.circle');
    const panels = document.querySelectorAll('.panel');
    const rightPanels = document.querySelectorAll('.panel-right');
    
    let currentPanel = 0;
    let isTransitioning = false;

    function updatePanels() {
        panels.forEach((panel, index) => {
            if (index === currentPanel) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        // Update right panel colors - alternate between dark and light
        rightPanels.forEach((panel, index) => {
            if (index % 2 === 1) { // Odd panels (1, 3, etc) are light
                panel.style.background = '#D9D9D9';
            } else { // Even panels (0, 2, etc) are dark
                panel.style.background = '#262626';
            }
        });

        // Update menu colors based on current panel
        if (currentPanel % 2 === 1) { // Odd panels have dark menu
            menuText.style.color = '#000';
            menuIcon.style.borderColor = '#000';
            circle.style.background = '#000';
        } else {
            menuText.style.color = '#fff';
            menuIcon.style.borderColor = '#fff';
            circle.style.background = '#fff';
        }
    }

    function handleWheel(event) {
        if (isTransitioning) return;
        
        const delta = event.deltaY;
        if (Math.abs(delta) < 25) return; // Threshold to prevent small scroll triggers
        
        isTransitioning = true;
        
        if (delta > 0 && currentPanel < panels.length - 1) {
            currentPanel++;
        } else if (delta < 0 && currentPanel > 0) {
            currentPanel--;
        }
        
        updatePanels();
        
        // Reset transition lock after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 300); // Match this with CSS transition duration
    }

    // Handle wheel events for panel transitions
    window.addEventListener('wheel', handleWheel, { passive: true });

    // Set initial state
    panels[0].classList.add('active');
    updatePanels();
});
