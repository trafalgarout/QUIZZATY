// JavaScript for category pages

document.addEventListener('DOMContentLoaded', function() {
    // Get category ID from URL
    const categoryId = getCategoryIdFromUrl();
    
    // Load category data
    const category = categories.find(cat => cat.id === categoryId);
    
    if (!category) {
        showError('فئة غير موجودة');
        return;
    }
    
    // Update page title and header
    document.title = `${category.name} - موقع الاختبارات العربية`;
    document.getElementById('category-title').textContent = category.name;
    document.getElementById('category-description').textContent = category.description;
    
    // Set category icon and color
    const iconElement = document.getElementById('category-icon');
    iconElement.className = category.icon;
    iconElement.parentElement.style.backgroundColor = category.color;
    
    // Load quizzes for this category
    loadQuizzes(categoryId);
});

/**
 * Extract category ID from the current URL
 * @returns {string} The category ID
 */
function getCategoryIdFromUrl() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    return filename.replace('.html', '');
}

/**
 * Load quizzes for the specified category
 * @param {string} categoryId - The category ID
 */
function loadQuizzes(categoryId) {
    const quizzesContainer = document.getElementById('quizzes-container');
    
    // Show loading message
    quizzesContainer.innerHTML = '<div class="loading">جاري تحميل الاختبارات...</div>';
    
    // Dynamically load the quiz data file for this category
    const script = document.createElement('script');
    script.src = `../../data/${categoryId}.js`;
    script.onload = function() {
        displayQuizzes(quizData, quizzesContainer);
    };
    script.onerror = function() {
        showError('عذراً، لم نتمكن من تحميل الاختبارات لهذه الفئة');
    };
    
    document.head.appendChild(script);
}

/**
 * Display quizzes in the container
 * @param {Array} quizzes - Array of quiz data
 * @param {HTMLElement} container - Container element
 */
function displayQuizzes(quizzes, container) {
    // Clear loading message
    container.innerHTML = '';
    
    // Limit to 30 quizzes max
    const limitedQuizzes = quizzes.slice(0, 30);
    
    if (limitedQuizzes.length === 0) {
        container.innerHTML = '<div class="no-quizzes">لا توجد اختبارات في هذه الفئة حالياً</div>';
        return;
    }
    
    // Create and append quiz cards with ads in between
    limitedQuizzes.forEach((quiz, index) => {
        const quizCard = createQuizCard(quiz);
        container.appendChild(quizCard);
    });
}

/**
 * Create a quiz card element
 * @param {Object} quiz - The quiz data
 * @returns {HTMLElement} - The quiz card element
 */
function createQuizCard(quiz) {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.setAttribute('data-quiz-id', quiz.id);
    
    // Get difficulty class
    const difficultyClass = getDifficultyClass(quiz.difficulty);
    
    // Create card HTML structure
    card.innerHTML = `
        <div class="quiz-header">
            <h3 class="quiz-title">${quiz.title}</h3>
            <span class="quiz-difficulty ${difficultyClass}">${getArabicDifficulty(quiz.difficulty)}</span>
        </div>
        <div class="quiz-content">
            <p class="quiz-description">${quiz.description}</p>
            <a href="../quiz/${quiz.id}.html" class="quiz-link">بدء الاختبار</a>
        </div>
    `;
    
    // Add click event to the entire card
    card.addEventListener('click', function(e) {
        // If the click is not on the link itself, navigate programmatically
        if (!e.target.classList.contains('quiz-link')) {
            window.location.href = `../quiz/${quiz.id}.html`;
        }
    });
    
    return card;
}

/**
 * Get the CSS class for a difficulty level
 * @param {string} difficulty - The difficulty level
 * @returns {string} - The CSS class
 */
function getDifficultyClass(difficulty) {
    switch (difficulty.toLowerCase()) {
        case 'easy':
        case 'سهل':
            return 'difficulty-easy';
        case 'medium':
        case 'متوسط':
            return 'difficulty-medium';
        case 'hard':
        case 'صعب':
            return 'difficulty-hard';
        default:
            return 'difficulty-medium';
    }
}

/**
 * Get the Arabic translation of difficulty
 * @param {string} difficulty - The difficulty level
 * @returns {string} - The Arabic translation
 */
function getArabicDifficulty(difficulty) {
    switch (difficulty.toLowerCase()) {
        case 'easy':
            return 'سهل';
        case 'medium':
            return 'متوسط';
        case 'hard':
            return 'صعب';
        default:
            return difficulty; // Return as is if already in Arabic
    }
}

/**
 * Show error message
 * @param {string} message - The error message
 */
function showError(message) {
    const container = document.getElementById('quizzes-container');
    container.innerHTML = `<div class="error-message">${message}</div>`;
}
