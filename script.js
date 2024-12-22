document.addEventListener('DOMContentLoaded', () => {
    const menuText = document.querySelector('.menu-text');
    const menuIcon = document.querySelector('.menu-icon');
    const circle = document.querySelector('.menu-k');
    const insta = document.querySelector('.instagram-icon i');
    const panels = document.querySelectorAll('.panel');
    const rightPanels = document.querySelectorAll('.panel-right');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuCloseBtn = document.querySelector('.menu-close-btn');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    let currentPanel = 0;
    let isTransitioning = false;
    let aboutImageInterval;
    let isMenuOpen = false;

    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const sidebar = document.querySelector('.sidebar');
    const sidebarCloseBtn = document.querySelector('.sidebar-close');
    let isSidebarOpen = false;

    // Menu toggle functionality (K icon)
    menuIcon.addEventListener('click', (e) => {
        if (e.target.closest('.hamburger-icon') || e.target.closest('.instagram-icon')) {
            return; // Don't trigger menu if clicking hamburger or instagram icon
        }
        isMenuOpen = !isMenuOpen;
        menuOverlay.classList.toggle('active', isMenuOpen);
    });

    // Sidebar toggle functionality (hamburger icon)
    hamburgerIcon.addEventListener('click', () => {
        isSidebarOpen = !isSidebarOpen;
        sidebar.classList.toggle('active', isSidebarOpen);
    });

    // Close sidebar when close button is clicked
    sidebarCloseBtn.addEventListener('click', () => {
        isSidebarOpen = false;
        sidebar.classList.remove('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (isSidebarOpen && 
            !sidebar.contains(e.target) && 
            !hamburgerIcon.contains(e.target)) {
            isSidebarOpen = false;
            sidebar.classList.remove('active');
        }
    });

    // Navigation functionality
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (isTransitioning) return;
            
            isTransitioning = true;
            currentPanel = index;
            updatePanels();
            
            // Close sidebar
            isSidebarOpen = false;
            sidebar.classList.remove('active');
            
            // Reset transition lock after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        });
    });

    // Close menu when close button is clicked
    menuCloseBtn.addEventListener('click', () => {
        isMenuOpen = false;
        menuOverlay.classList.remove('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !menuOverlay.contains(e.target) && 
            !menuIcon.contains(e.target)) {
            isMenuOpen = false;
            menuOverlay.classList.remove('active');
        }
    });

    // About panel elements
    const aboutImage1 = document.getElementById('aboutImage1');
    const aboutImage2 = document.getElementById('aboutImage2');
    const joshText = document.getElementById('joshText');
    const kieranText = document.getElementById('kieranText');
    let isFirstImage = true;

    function startAboutAnimation() {
        if (aboutImageInterval) clearInterval(aboutImageInterval);
        
        // Reset initial state
        aboutImage1.style.display = 'block';
        aboutImage2.style.display = 'none';
        joshText.classList.add('text-white');
        kieranText.classList.add('text-gray');
        isFirstImage = true;

        aboutImageInterval = setInterval(() => {
            if (isFirstImage) {
                // Transition to second image
                aboutImage1.classList.add('fade');
                setTimeout(() => {
                    aboutImage1.style.display = 'none';
                    aboutImage2.style.display = 'block';
                    aboutImage2.classList.remove('fade');
                }, 300);
                joshText.classList.remove('text-white');
                joshText.classList.add('text-gray');
                kieranText.classList.remove('text-gray');
                kieranText.classList.add('text-white');
            } else {
                // Transition to first image
                aboutImage2.classList.add('fade');
                setTimeout(() => {
                    aboutImage2.style.display = 'none';
                    aboutImage1.style.display = 'block';
                    aboutImage1.classList.remove('fade');
                }, 300);
                joshText.classList.remove('text-gray');
                joshText.classList.add('text-white');
                kieranText.classList.remove('text-white');
                kieranText.classList.add('text-gray');
            }
            isFirstImage = !isFirstImage;
        }, 3000);
    }

    function stopAboutAnimation() {
        if (aboutImageInterval) {
            clearInterval(aboutImageInterval);
            aboutImageInterval = null;
        }
    }

    function updatePanels() {
        panels.forEach((panel, index) => {
            if (index === currentPanel) {
                panel.classList.add('active');
                // Start animation if it's the about panel (panel with about images)
                if (panel.querySelector('#aboutImage1')) {
                    startAboutAnimation();
                } else {
                    stopAboutAnimation();
                }
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
            circle.style.color = '#000';
            insta.style.color = '#000';
        } else {
            menuText.style.color = '#fff';
            menuIcon.style.borderColor = '#fff';
            circle.style.color = '#fff';
            insta.style.color = '#fff';
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
