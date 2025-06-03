// Decorative Elements JavaScript for Arabic Quiz Website
document.addEventListener('DOMContentLoaded', function() {
    // Add gradient background
    const gradientBg = document.createElement('div');
    gradientBg.className = 'gradient-bg';
    document.body.appendChild(gradientBg);
    
    // Add dot pattern
    const dotPattern = document.createElement('div');
    dotPattern.className = 'dot-pattern';
    document.body.appendChild(dotPattern);
    
    // Add corner decorations
    const cornerTopRight = document.createElement('div');
    cornerTopRight.className = 'corner-decoration corner-top-right';
    document.body.appendChild(cornerTopRight);
    
    const cornerBottomLeft = document.createElement('div');
    cornerBottomLeft.className = 'corner-decoration corner-bottom-left';
    document.body.appendChild(cornerBottomLeft);
    
    // Add RTL decoration
    const rtlDecoration = document.createElement('div');
    rtlDecoration.className = 'rtl-decoration';
    document.body.appendChild(rtlDecoration);
    
    // Create floating particles
    createFloatingParticles();
    
    // Add page transition effect to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }
    
    // Add shiny card effect to all cards
    const cards = document.querySelectorAll('.mission-card, .vision-card, .value-card, .team-member, .faq-item, .contact-form-container, .contact-info-container, .policy-container');
    cards.forEach(card => {
        card.classList.add('shiny-card');
    });
    
    // Add floating animation to selected elements
    const floatElements = document.querySelectorAll('.page-title, .decorative-icon');
    floatElements.forEach(element => {
        element.classList.add('float-element');
    });
    
    // Add hover glow effect to buttons and links
    const hoverElements = document.querySelectorAll('button, .contact-button, .social-icon');
    hoverElements.forEach(element => {
        element.classList.add('hover-glow');
    });
    
    // Add fancy dividers before each section heading
    const sectionHeadings = document.querySelectorAll('section h2, .policy-section h2');
    sectionHeadings.forEach(heading => {
        const divider = document.createElement('div');
        divider.className = 'fancy-divider';
        heading.parentNode.insertBefore(divider, heading);
    });
    
    // Add decorative icons to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        const icon = item.querySelector('i');
        if (icon) {
            const iconWrapper = document.createElement('div');
            iconWrapper.className = 'decorative-icon';
            
            // Move the icon into the wrapper
            icon.parentNode.insertBefore(iconWrapper, icon);
            iconWrapper.appendChild(icon);
        }
    });
});

// Function to create floating particles
function createFloatingParticles() {
    const particleCount = 15;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 10px and 50px
        const size = Math.random() * 40 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random animation duration between 20s and 40s
        const duration = Math.random() * 20 + 20;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}
