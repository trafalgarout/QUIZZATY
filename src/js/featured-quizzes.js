// Featured Quizzes Animation and Interaction
document.addEventListener('DOMContentLoaded', function() {
    // Get all featured quiz cards
    const quizCards = document.querySelectorAll('.featured-quiz-card');
    
    // Add hover effect and staggered entrance animation
    quizCards.forEach((card, index) => {
        // Add staggered entrance animation
        setTimeout(() => {
            card.classList.add('visible');
        }, 100 * index);
        
        // Add hover effect with mouse movement
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply the rotation transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        // Reset transform when mouse leaves
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        // Add click effect
        card.addEventListener('mousedown', function() {
            card.style.transform = 'perspective(1000px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            card.style.transform = 'perspective(1000px) scale(1)';
        });
    });
    
    // Add color-changing effect to ribbons
    const ribbons = document.querySelectorAll('.featured-quiz-ribbon');
    ribbons.forEach(ribbon => {
        // Create a subtle color-changing animation
        const colors = ['var(--pink)', 'var(--purple)', 'var(--blue)'];
        let colorIndex = 0;
        
        setInterval(() => {
            colorIndex = (colorIndex + 1) % colors.length;
            ribbon.style.background = colors[colorIndex];
        }, 3000);
    });
});
