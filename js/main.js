document.addEventListener('DOMContentLoaded', () => {
    // Menu functionality
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');

    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    const closeMenuHandler = () => {
        sideMenu.classList.add('translate-x-full');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    };

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (closeIcon.classList.contains('hidden')) {
            // Menu is closed, open it
            sideMenu.classList.remove('translate-x-full');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            // Menu is open, close it
            closeMenuHandler();
        }
    });

    // Add click handlers to menu items
    const menuLinks = document.querySelectorAll('#sideMenu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenuHandler();
        });
    });

    const scrollContainer = document.querySelector('.scroll-container');
    const images = document.querySelectorAll('.panel-image');
    const rightPanel = document.getElementById('rightPanel');
    let viewportHeight = window.innerHeight;
    let transitionInterval;

    // Add CSS transition for smooth fade
    const style = document.createElement('style');
    style.textContent = '.panel-image { transition: opacity 1s ease-in-out; }';
    document.head.appendChild(style);
    
    // Color values from tailwind config
    const colors = {
        dark: {
            bg: '#262626',
            text: '#f2f2f2'
        },
        light: {
            bg: '#d9d9d9',
            text: '#1a1a1a'
        }
    };

    // Linear interpolation function
    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    // Convert hex to RGB for interpolation
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Convert RGB to hex
    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    // Interpolate between two colors
    function interpolateColor(color1, color2, factor) {
        const c1 = hexToRgb(color1);
        const c2 = hexToRgb(color2);
        
        const r = Math.round(lerp(c1.r, c2.r, factor));
        const g = Math.round(lerp(c1.g, c2.g, factor));
        const b = Math.round(lerp(c1.b, c2.b, factor));
        
        return rgbToHex(r, g, b);
    }

    function updateTransitions() {
        // Get scroll progress (0 to 1)
        const scrollProgress = window.scrollY / viewportHeight;
        
    // Update image visibility
    images.forEach((img, index) => {
        if (index === 0) {
            // First image
            img.classList.toggle('active', scrollProgress < 0.5);
        } else if (index === 1) {
            // Second image
            img.classList.toggle('active', scrollProgress >= 0.5 && scrollProgress < 1.5);
        } else if (index === 2) {
            // Third image
            img.classList.toggle('active', scrollProgress >= 1.5 && scrollProgress < 2.5);
        } else if (index === 3) {
            // Fourth image
            img.classList.toggle('active', scrollProgress >= 2.5 && scrollProgress < 3.5);
        } else if (index === 4) {
            // Fifth image
            img.classList.toggle('active', scrollProgress >= 3.5 && scrollProgress < 4.5);
        } else if (index === 5 || index === 6) {
            // Handle Josh and Kieran images
            const section6Visible = scrollProgress >= 4.5 && scrollProgress < 5.5;
            const joshImage = document.querySelector('.panel-image[data-index="5"]');
            const kieranImage = document.querySelector('.panel-image[data-index="6"]');
            const joshText = document.getElementById('josh-text');
            const kieranText = document.getElementById('kieran-text');

            if (section6Visible) {
                if (!transitionInterval) {
                    let showingJosh = true;
                    
                    // Set initial state
                    joshImage.classList.add('active');
                    kieranImage.classList.remove('active');
                    joshText.style.opacity = '1';
                    kieranText.style.opacity = '0.5';
                    
                    // Start alternating transitions
                    transitionInterval = setInterval(() => {
                        showingJosh = !showingJosh;
                        
                        if (showingJosh) {
                            joshImage.classList.add('active');
                            kieranImage.classList.remove('active');
                            joshText.style.opacity = '1';
                            kieranText.style.opacity = '0.5';
                        } else {
                            joshImage.classList.remove('active');
                            kieranImage.classList.add('active');
                            joshText.style.opacity = '0.5';
                            kieranText.style.opacity = '1';
                        }
                    }, 3000);
                }
            } else {
                // Clear interval when leaving section 6
                if (transitionInterval) {
                    clearInterval(transitionInterval);
                    transitionInterval = null;
                }
                
                // Remove active class from both images when not in section
                joshImage.classList.remove('active');
                kieranImage.classList.remove('active');
                
                // Reset text opacities
                joshText.style.opacity = '1';
                kieranText.style.opacity = '0.5';
            }
        } else if (index === 7) {
            // Seventh image
            img.classList.toggle('active', scrollProgress >= 5.5);
        }
    });

        // Update colors based on scroll progress
        if (scrollProgress <= 1) {
            // First and second section stay dark
            rightPanel.style.backgroundColor = colors.dark.bg;
        } else if (scrollProgress <= 2) {
            // Second to third section transition
            const transitionProgress = scrollProgress - 1;
            const bgColor = interpolateColor(colors.dark.bg, colors.light.bg, transitionProgress);
            rightPanel.style.backgroundColor = bgColor;
        } else if (scrollProgress <= 3) {
            // Third to fourth section transition
            const transitionProgress = scrollProgress - 2;
            const bgColor = interpolateColor(colors.light.bg, colors.dark.bg, transitionProgress);
            rightPanel.style.backgroundColor = bgColor;
        } else if (scrollProgress <= 4) {
            // Fourth to fifth section transition
            const transitionProgress = scrollProgress - 3;
            const bgColor = interpolateColor(colors.dark.bg, colors.light.bg, transitionProgress);
            rightPanel.style.backgroundColor = bgColor;
        } else if (scrollProgress <= 5) {
            // Fifth to sixth section transition
            const transitionProgress = scrollProgress - 4;
            const bgColor = interpolateColor(colors.light.bg, colors.dark.bg, transitionProgress);
            rightPanel.style.backgroundColor = bgColor;
        } else if (scrollProgress <= 6) {
            // Sixth to seventh section transition
            const transitionProgress = scrollProgress - 5;
            const bgColor = interpolateColor(colors.dark.bg, colors.light.bg, transitionProgress);
            rightPanel.style.backgroundColor = bgColor;
        }

        // Handle text opacity transitions
        const firstSectionText = document.querySelector('.content-section:first-child .text-text-light');
        const thirdSectionText = document.querySelector('.content-section:nth-child(3) .text-text-light');
        const fifthSectionText = document.querySelector('.content-section:nth-child(5) .text-text-light');
        const sixthSectionText = document.querySelector('.content-section:nth-child(6) .text-text-light');
        
        if (firstSectionText) {
            firstSectionText.style.opacity = Math.max(0, 1 - scrollProgress);
        }
        
        if (thirdSectionText) {
            thirdSectionText.style.opacity = Math.max(0, Math.min(1, scrollProgress - 1));
        }

        if (fifthSectionText) {
            fifthSectionText.style.opacity = Math.max(0, Math.min(1, scrollProgress - 3));
        }

        if (sixthSectionText) {
            sixthSectionText.style.opacity = Math.max(0, Math.min(1, scrollProgress - 4));
        }
    }

    // Initial update
    updateTransitions();

    // Update on scroll
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateTransitions);
    });

    // Update on resize
    window.addEventListener('resize', () => {
        viewportHeight = window.innerHeight;
        updateTransitions();
    });

    // Cleanup interval on page unload
    window.addEventListener('unload', () => {
        if (transitionInterval) {
            clearInterval(transitionInterval);
        }
    });
});
