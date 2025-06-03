document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission (in a real application, this would be an AJAX request)
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitButton.disabled = true;
            
            // Simulate network delay
            setTimeout(function() {
                // Hide the form and show success message
                contactForm.style.display = 'none';
                formSuccessMessage.style.display = 'flex';
                
                // Scroll to the success message
                formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form for future use (though it's hidden now)
                contactForm.reset();
                submitButton.innerHTML = 'إرسال الرسالة';
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            // Initially hide all answers
            answer.style.maxHeight = '0';
            
            question.addEventListener('click', function() {
                // Toggle active class
                const isActive = item.classList.contains('active');
                
                // Close all items first
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    faqItem.querySelector('.faq-answer').style.maxHeight = '0';
                    faqItem.querySelector('.faq-question i').className = 'fas fa-chevron-down';
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.className = 'fas fa-chevron-up';
                }
            });
        });
    }
    
    // Form input animation
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    if (formInputs.length > 0) {
        formInputs.forEach(input => {
            // Add focus class when input is focused
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Remove focus class when input loses focus, unless it has a value
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input already has a value on page load
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
    }
    
    // Map interaction enhancement
    const mapContainer = document.querySelector('.map-container');
    
    if (mapContainer) {
        const mapIframe = mapContainer.querySelector('iframe');
        
        mapContainer.addEventListener('mouseenter', function() {
            mapIframe.style.opacity = '1';
        });
        
        mapContainer.addEventListener('mouseleave', function() {
            mapIframe.style.opacity = '0.8';
        });
    }
});
