// Statistics Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    // Fix for WebKit browsers that don't support background-clip: text
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(value => {
        if (navigator.userAgent.indexOf('AppleWebKit') > -1) {
            value.style.backgroundClip = 'text';
        }
    });
    
    // Intersection Observer to trigger animations when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(statsSection);
    }
    
    // Function to animate counting for stat values
    function animateStats() {
        const statValues = document.querySelectorAll('.stat-value[data-count]');
        
        statValues.forEach(stat => {
            const targetValue = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // Animation duration in milliseconds
            const startTime = performance.now();
            const originalText = stat.textContent;
            const prefix = originalText.startsWith('+') ? '+' : '';
            
            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Easing function for smoother animation
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                
                const currentCount = Math.floor(targetValue * easedProgress);
                
                // Format the number with commas
                const formattedCount = new Intl.NumberFormat().format(currentCount);
                stat.textContent = prefix + formattedCount;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
        
        // Add entrance animation classes to stat cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 150);
        });
    }
});
