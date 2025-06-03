// Footer Animations and Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Show success message
                const button = this.querySelector('button');
                const originalText = button.textContent;
                button.textContent = 'تم الاشتراك بنجاح!';
                button.style.background = 'linear-gradient(45deg, #00b894, #00cec9)';
                
                // Reset form
                emailInput.value = '';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 3000);
            }
        });
    }
    
    // Social icons hover effect
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(360deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Footer links animation
    const footerLinks = document.querySelectorAll('.footer-links li');
    footerLinks.forEach((link, index) => {
        // Add staggered entrance animation
        link.style.opacity = '0';
        link.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, 100 * index);
    });
    
    // Add scroll to top functionality
    const createScrollTopButton = () => {
        const scrollTopButton = document.createElement('button');
        scrollTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollTopButton.className = 'scroll-to-top';
        scrollTopButton.style.display = 'none';
        document.body.appendChild(scrollTopButton);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopButton.style.display = 'flex';
                scrollTopButton.style.opacity = '1';
            } else {
                scrollTopButton.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        scrollTopButton.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Scroll to top when clicked
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createScrollTopButton();
});
