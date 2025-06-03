document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const faqSearch = document.getElementById('faqSearch');
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    
    // Initially hide the "no results" message
    if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
    }
    
    // Handle FAQ item click (accordion)
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            // Initially hide all answers
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            
            question.addEventListener('click', function() {
                // Toggle active class
                const isActive = item.classList.contains('active');
                
                // Close all items first
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqAnswer = faqItem.querySelector('.faq-answer');
                    const faqIcon = faqItem.querySelector('.faq-question i');
                    
                    faqAnswer.style.maxHeight = '0';
                    faqAnswer.style.opacity = '0';
                    faqIcon.className = 'fas fa-chevron-down';
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                    icon.className = 'fas fa-chevron-up';
                }
            });
        });
    }
    
    // Search functionality
    if (faqSearch) {
        faqSearch.addEventListener('input', filterFAQs);
    }
    
    // Category filter functionality
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter FAQs by category
                const category = this.getAttribute('data-category');
                filterFAQsByCategory(category);
                
                // Clear search input
                if (faqSearch) {
                    faqSearch.value = '';
                }
            });
        });
    }
    
    // Function to filter FAQs by search term
    function filterFAQs() {
        const searchTerm = faqSearch.value.toLowerCase();
        let visibleCount = 0;
        
        // Reset category buttons
        categoryButtons.forEach(btn => {
            if (btn.getAttribute('data-category') === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            // Show item if search term is found in question or answer
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
            
            // Close all items
            item.classList.remove('active');
            const faqAnswer = item.querySelector('.faq-answer');
            const faqIcon = item.querySelector('.faq-question i');
            
            faqAnswer.style.maxHeight = '0';
            faqAnswer.style.opacity = '0';
            faqIcon.className = 'fas fa-chevron-down';
        });
        
        // Show or hide "no results" message
        if (noResultsMessage) {
            if (visibleCount === 0 && searchTerm !== '') {
                noResultsMessage.style.display = 'flex';
            } else {
                noResultsMessage.style.display = 'none';
            }
        }
    }
    
    // Function to filter FAQs by category
    function filterFAQsByCategory(category) {
        let visibleCount = 0;
        
        faqItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
            
            // Close all items
            item.classList.remove('active');
            const faqAnswer = item.querySelector('.faq-answer');
            const faqIcon = item.querySelector('.faq-question i');
            
            faqAnswer.style.maxHeight = '0';
            faqAnswer.style.opacity = '0';
            faqIcon.className = 'fas fa-chevron-down';
        });
        
        // Show or hide "no results" message
        if (noResultsMessage) {
            if (visibleCount === 0) {
                noResultsMessage.style.display = 'flex';
            } else {
                noResultsMessage.style.display = 'none';
            }
        }
    }
    
    // Add animation to FAQ items
    faqItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Auto-expand FAQ item if it's referenced in the URL hash
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetFAQ = document.getElementById(hash);
        
        if (targetFAQ && targetFAQ.classList.contains('faq-item')) {
            const question = targetFAQ.querySelector('.faq-question');
            if (question) {
                setTimeout(() => {
                    question.click();
                    targetFAQ.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
            }
        }
    }
});
