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

        // Update right panel colors
        rightPanels.forEach((panel, index) => {
            if (index === 1) {
                panel.style.background = '#D9D9D9';
            } else {
                panel.style.background = '#262626';
            }
        });

        // Update menu colors
        if (currentPanel === 1) {
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
        if (Math.abs(delta) < 50) return; // Threshold to prevent small scroll triggers
        
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
        }, 500); // Match this with CSS transition duration
    }

    // Handle wheel events for panel transitions
    window.addEventListener('wheel', handleWheel, { passive: true });

    // Set initial state
    panels[0].classList.add('active');
    updatePanels();
});
