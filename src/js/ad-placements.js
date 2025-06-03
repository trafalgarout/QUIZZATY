/**
 * Ad Placements Script
 * Handles responsive ad placements across the Arabic Quiz Website
 */

// Google AdSense implementation
function createAdElement(adId) {
    const adContainer = document.createElement('div');
    adContainer.className = 'ad-container';
    adContainer.id = adId;
    
    // Add responsive classes
    adContainer.classList.add('responsive-ad');
    
    // Get ad position number (1-6)
    let adPosition = 1;
    if (adId.includes('-ad-')) {
        const match = adId.match(/-ad-(\d+)/);
        if (match && match[1]) {
            adPosition = parseInt(match[1]);
        }
    }
    
    // Map of ad slots based on position
    const adSlots = {
        1: "7352451765", // AI ADS 1
        2: "8056009400", // AI ADS 2
        3: "3281344818", // AI ADS 3
        4: "4240646223", // AI ADS 4
        5: "2927564558", // AI ADS 5
        6: "8342099801"  // AI ADS 6
    };
    
    // Get the correct ad slot
    const adSlot = adSlots[adPosition] || adSlots[1]; // Default to first ad if position not found
    
    // Create the ad code
    const adCode = `
        <!-- AI ADS ${adPosition} -->
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-6865939387108271"
             data-ad-slot="${adSlot}"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    `;
    
    // Add the ad code to the container
    adContainer.innerHTML = `
        <div class="ad-placeholder">
            <div class="ad-label">إعلان</div>
            <div class="ad-content" id="${adId}-content">
                ${adCode}
            </div>
        </div>
    `;
    
    return adContainer;
}

// Function to insert ad after a specific element
function insertAdAfter(referenceNode, adId) {
    if (!referenceNode) return null;
    
    const ad = createAdElement(adId);
    referenceNode.parentNode.insertBefore(ad, referenceNode.nextSibling);
    return ad;
}

// Function to insert ad before a specific element
function insertAdBefore(referenceNode, adId) {
    if (!referenceNode) return null;
    
    const ad = createAdElement(adId);
    referenceNode.parentNode.insertBefore(ad, referenceNode);
    return ad;
}

// Function to insert ad as first child of a container
function insertAdAsFirstChild(container, adId) {
    if (!container) return null;
    
    const ad = createAdElement(adId);
    if (container.firstChild) {
        container.insertBefore(ad, container.firstChild);
    } else {
        container.appendChild(ad);
    }
    return ad;
}

// Function to insert ad as last child of a container
function insertAdAsLastChild(container, adId) {
    if (!container) return null;
    
    const ad = createAdElement(adId);
    container.appendChild(ad);
    return ad;
}

// Function to insert ad at a specific position in a container with multiple children
function insertAdAtPosition(container, position, adId) {
    if (!container) return null;
    
    const ad = createAdElement(adId);
    const children = container.children;
    
    if (position >= children.length) {
        container.appendChild(ad);
    } else {
        container.insertBefore(ad, children[position]);
    }
    return ad;
}

// Place ads on the home page
function placeHomePageAds() {
    // Check if we're on the home page
    if (!document.querySelector('.hero-section') || !document.querySelector('.modern-footer')) return;
    
    // Ad 1: Top of page, below header
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        insertAdAfter(heroSection, 'home-ad-1');
    }
    
    // Ad 2: Between featured sections
    const featuredSections = document.querySelectorAll('.featured-section');
    if (featuredSections.length > 0) {
        insertAdAfter(featuredSections[0], 'home-ad-2');
    }
    
    // Ad 3: Middle of the page
    const midContent = document.querySelector('.mid-content') || document.querySelector('.main-content');
    if (midContent) {
        insertAdAtPosition(midContent, Math.floor(midContent.children.length / 2), 'home-ad-3');
    }
    
    // Ad 4: Before popular quizzes section
    const popularQuizzes = document.querySelector('.popular-quizzes');
    if (popularQuizzes) {
        insertAdBefore(popularQuizzes, 'home-ad-4');
    }
    
    // Ad 5: Between categories
    const categories = document.querySelector('.categories-section');
    if (categories) {
        insertAdAtPosition(categories, Math.floor(categories.children.length / 2), 'home-ad-5');
    }
    
    // Ad 6: Before footer
    const footer = document.querySelector('.modern-footer');
    if (footer) {
        insertAdBefore(footer, 'home-ad-6');
    }
}

// Place ads on category pages
function placeCategoryPageAds() {
    // Check if we're on a category page
    if (!document.querySelector('.category-header') || !document.getElementById('quizzes-container')) return;
    
    // Ad 1: Below category header
    const categoryHeader = document.querySelector('.category-header');
    if (categoryHeader) {
        insertAdAfter(categoryHeader, 'category-ad-1');
    }
    
    // Ad 2: After category description
    const categoryDescription = document.querySelector('.category-description');
    if (categoryDescription) {
        insertAdAfter(categoryDescription, 'category-ad-2');
    }
    
    // Ad 3 & 4: Between quiz cards
    const quizzesContainer = document.getElementById('quizzes-container');
    if (quizzesContainer) {
        const quizCards = quizzesContainer.querySelectorAll('.quiz-card');
        
        if (quizCards.length > 2) {
            // Ad 3: After the first quiz card
            insertAdAfter(quizCards[0], 'category-ad-3');
            
            // Ad 4: In the middle of quiz cards
            const middleIndex = Math.floor(quizCards.length / 2);
            insertAdAfter(quizCards[middleIndex], 'category-ad-4');
        }
    }
    
    // Ad 5: Before pagination
    const pagination = document.querySelector('.pagination');
    if (pagination) {
        insertAdBefore(pagination, 'category-ad-5');
    } else {
        // If no pagination, insert before footer
        const footer = document.querySelector('.simple-footer');
        if (footer) {
            insertAdBefore(footer, 'category-ad-5');
        }
    }
    
    // Ad 6: Sidebar or before footer
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        insertAdAsFirstChild(sidebar, 'category-ad-6');
    } else {
        // If no sidebar, insert before footer
        const footer = document.querySelector('.simple-footer');
        if (footer) {
            insertAdBefore(footer, 'category-ad-6');
        }
    }
}

// Place ads on quiz pages
function placeQuizPageAds() {
    // Check if we're on a quiz page
    if (!document.getElementById('quiz-title') || !document.getElementById('quiz-container')) return;
    
    // Ad 1: Below quiz title
    const quizTitle = document.getElementById('quiz-title');
    if (quizTitle) {
        insertAdAfter(quizTitle, 'quiz-ad-1');
    }
    
    // Ad 2: Before quiz starts
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        insertAdAsFirstChild(quizContainer, 'quiz-ad-2');
    }
    
    // Ad 3: Between quiz questions
    const quizQuestions = document.querySelectorAll('.question-container');
    if (quizQuestions.length > 2) {
        const middleIndex = Math.floor(quizQuestions.length / 2);
        insertAdAfter(quizQuestions[middleIndex], 'quiz-ad-3');
    }
    
    // Ad 4: Before results section
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
        insertAdBefore(resultsSection, 'quiz-ad-4');
    }
    
    // Ad 5: After results section
    if (resultsSection) {
        insertAdAfter(resultsSection, 'quiz-ad-5');
    }
    
    // Ad 6: Before footer
    const footer = document.querySelector('.simple-footer');
    if (footer) {
        insertAdBefore(footer, 'quiz-ad-6');
    }
}

// Load AdSense library once per page
function loadAdSenseLibrary() {
    // Check if AdSense script is already loaded
    if (document.querySelector('script[src*="adsbygoogle.js"]')) {
        return;
    }
    
    // Create and append the AdSense script
    const adSenseScript = document.createElement('script');
    adSenseScript.async = true;
    adSenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6865939387108271';
    adSenseScript.crossOrigin = 'anonymous';
    document.head.appendChild(adSenseScript);
}

// Initialize ad placements based on page type
function initializeAds() {
    // Load AdSense library
    loadAdSenseLibrary();
    
    // Add CSS for ad containers
    addAdStyles();
    
    // Determine page type and place ads accordingly
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        placeHomePageAds();
    } else if (window.location.pathname.includes('/category/')) {
        placeCategoryPageAds();
    } else if (window.location.pathname.includes('/quiz/')) {
        placeQuizPageAds();
    }
}

// Add styles for ad containers
function addAdStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .ad-container {
            width: 100%;
            margin: 25px 0;
            overflow: hidden;
            text-align: center;
            direction: rtl;
            position: relative;
            clear: both;
        }
        
        .ad-placeholder {
            padding: 5px;
            min-height: 90px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .ad-label {
            position: absolute;
            top: 2px;
            right: 5px;
            font-size: 10px;
            color: #999;
            background-color: rgba(255,255,255,0.8);
            padding: 1px 5px;
            border-radius: 3px;
            z-index: 10;
        }
        
        .ad-content {
            width: 100%;
            min-height: 60px;
        }
        
        /* Make sure AdSense ads are centered in RTL layout */
        .ad-content ins.adsbygoogle {
            display: block;
            margin: 0 auto;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
            .ad-container {
                margin: 20px 0;
            }
        }
        
        /* Ensure ads don't break layout on small screens */
        @media (max-width: 480px) {
            .ad-container {
                margin: 15px 0;
                overflow-x: hidden;
            }
        }
    `;
    document.head.appendChild(styleElement);
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeAds);
