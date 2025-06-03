// JavaScript for quiz pages

document.addEventListener('DOMContentLoaded', function() {
    // Get quiz ID from URL
    const quizId = getQuizIdFromUrl();
    
    // Extract category ID from quiz ID (assuming format: category##)
    const categoryId = extractCategoryId(quizId);
    
    // Update back button link
    document.getElementById('back-to-category').href = `../category/${categoryId}.html`;
    
    // Load quiz data
    loadQuiz(quizId, categoryId);
});

/**
 * Extract quiz ID from the current URL
 * @returns {string} The quiz ID
 */
function getQuizIdFromUrl() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    return filename.replace('.html', '');
}

/**
 * Extract category ID from quiz ID
 * @param {string} quizId - The quiz ID (e.g., "general01")
 * @returns {string} The category ID (e.g., "general")
 */
function extractCategoryId(quizId) {
    // Remove trailing numbers from quiz ID to get category ID
    return quizId.replace(/\d+$/, '');
}

/**
 * Load quiz data for the specified quiz
 * @param {string} quizId - The quiz ID
 * @param {string} categoryId - The category ID
 */
function loadQuiz(quizId, categoryId) {
    const quizContainer = document.getElementById('quiz-container');
    
    // Show loading message
    quizContainer.innerHTML = '<div class="loading">جاري تحميل الاختبار...</div>';
    
    // Dynamically load the quiz data file for this category
    const script = document.createElement('script');
    script.src = `../../data/${categoryId}.js`;
    script.onload = function() {
        // Find the specific quiz in the loaded quiz data
        const quiz = quizData.find(q => q.id === quizId);
        
        if (quiz) {
            // Update page metadata
            updatePageMetadata(quiz);
            
            // Display the quiz
            displayQuiz(quiz, quizContainer);
            
            // Load related quizzes
            loadRelatedQuizzes(quiz);
        } else {
            showError('عذراً، لم نتمكن من العثور على هذا الاختبار');
        }
    };
    script.onerror = function() {
        showError('عذراً، لم نتمكن من تحميل بيانات الاختبار');
    };
    
    document.head.appendChild(script);
}

/**
 * Update page metadata with quiz information
 * @param {Object} quiz - The quiz data
 */
function updatePageMetadata(quiz) {
    // Update title and description
    document.title = `${quiz.title} - موقع الاختبارات العربية`;
    document.getElementById('quiz-title').textContent = quiz.title;
    document.getElementById('quiz-description').textContent = quiz.description;
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription.setAttribute('content', quiz.description);
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle.setAttribute('content', quiz.title);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    ogDescription.setAttribute('content', quiz.description);
    
    // Add JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Quiz",
        "name": quiz.title,
        "description": quiz.description,
        "educationalAlignment": {
            "@type": "AlignmentObject",
            "alignmentType": "educationalSubject",
            "targetName": getCategoryNameById(extractCategoryId(quiz.id))
        },
        "about": {
            "@type": "Thing",
            "name": getCategoryNameById(extractCategoryId(quiz.id))
        },
        "numberOfQuestions": quiz.questions.length
    };
    
    document.getElementById('quiz-jsonld').textContent = JSON.stringify(jsonLd);
}

/**
 * Get category name by ID
 * @param {string} categoryId - The category ID
 * @returns {string} - The category name
 */
function getCategoryNameById(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'غير معروف';
}

/**
 * Display quiz in the container
 * @param {Object} quiz - The quiz data
 * @param {HTMLElement} container - Container element
 */
function displayQuiz(quiz, container) {
    // Clear loading message
    container.innerHTML = '';
    
    // Create quiz state
    const quizState = {
        currentQuestion: 0,
        score: 0,
        answers: [],
        quiz: quiz
    };
    
    // Display first question
    displayQuestion(quizState, container);
    
    // Add event listener for retry button
    document.getElementById('retry-button').addEventListener('click', function() {
        // Reset quiz state
        quizState.currentQuestion = 0;
        quizState.score = 0;
        quizState.answers = [];
        
        // Hide results and show quiz again
        document.getElementById('results-container').style.display = 'none';
        displayQuestion(quizState, container);
        container.style.display = 'block';
    });
    
    // Add event listeners for share buttons
    setupShareButtons(quiz);
}

/**
 * Display a question
 * @param {Object} quizState - The current quiz state
 * @param {HTMLElement} container - Container element
 */
function displayQuestion(quizState, container) {
    const quiz = quizState.quiz;
    const questionIndex = quizState.currentQuestion;
    const question = quiz.questions[questionIndex];
    
    if (!question) {
        // No more questions, show results
        showResults(quizState);
        return;
    }
    
    // Create question element
    const questionElement = document.createElement('div');
    questionElement.className = 'quiz-question';
    
    // Create question HTML
    questionElement.innerHTML = `
        <h3 class="question-text">${question.text}</h3>
        <ul class="options-list" id="options-list">
            ${question.options.map((option, index) => `
                <li class="option-item" data-index="${index}">${option}</li>
            `).join('')}
        </ul>
        <div class="quiz-controls">
            <div class="quiz-progress">${questionIndex + 1} من ${quiz.questions.length}</div>
            <button class="quiz-button next-button" id="next-button" disabled>السؤال التالي</button>
        </div>
    `;
    
    // Clear container and add question
    container.innerHTML = '';
    container.appendChild(questionElement);
    
    // Add event listeners to options
    const optionItems = document.querySelectorAll('.option-item');
    optionItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove selected class from all options
            optionItems.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Enable next button
            document.getElementById('next-button').disabled = false;
        });
    });
    
    // Add event listener to next button
    document.getElementById('next-button').addEventListener('click', function() {
        // Get selected option
        const selectedOption = document.querySelector('.option-item.selected');
        if (!selectedOption) return;
        
        const selectedIndex = parseInt(selectedOption.getAttribute('data-index'));
        
        // Check if answer is correct
        const isCorrect = selectedIndex === question.correctAnswer;
        
        // Update score
        if (isCorrect) {
            quizState.score++;
        }
        
        // Save answer
        quizState.answers.push({
            questionIndex,
            selectedIndex,
            isCorrect
        });
        
        // Show feedback
        showAnswerFeedback(selectedOption, optionItems[question.correctAnswer], isCorrect);
        
        // Disable all options
        optionItems.forEach(opt => opt.style.pointerEvents = 'none');
        
        // Change next button text for last question
        if (questionIndex === quiz.questions.length - 1) {
            this.textContent = 'إنهاء الاختبار';
        }
        
        // Wait a moment before moving to next question
        setTimeout(() => {
            quizState.currentQuestion++;
            displayQuestion(quizState, container);
        }, 1500);
    });
}

/**
 * Show feedback for the selected answer
 * @param {HTMLElement} selectedOption - The selected option element
 * @param {HTMLElement} correctOption - The correct option element
 * @param {boolean} isCorrect - Whether the answer is correct
 */
function showAnswerFeedback(selectedOption, correctOption, isCorrect) {
    if (isCorrect) {
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
        correctOption.classList.add('correct');
    }
}

/**
 * Show quiz results
 * @param {Object} quizState - The current quiz state
 */
function showResults(quizState) {
    const quiz = quizState.quiz;
    const score = quizState.score;
    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Hide quiz container
    document.getElementById('quiz-container').style.display = 'none';
    
    // Update results
    const resultsContainer = document.getElementById('results-container');
    const scoreElement = document.getElementById('results-score');
    const messageElement = document.getElementById('results-message');
    
    scoreElement.textContent = `${score}/${totalQuestions} (${percentage}%)`;
    
    // Set message based on score
    if (percentage >= 90) {
        messageElement.textContent = 'ممتاز! أداء رائع!';
    } else if (percentage >= 70) {
        messageElement.textContent = 'جيد جداً! أحسنت!';
    } else if (percentage >= 50) {
        messageElement.textContent = 'جيد! يمكنك التحسن أكثر.';
    } else {
        messageElement.textContent = 'حاول مرة أخرى للحصول على نتيجة أفضل.';
    }
    
    // Show results container
    resultsContainer.style.display = 'block';
}

/**
 * Setup share buttons
 * @param {Object} quiz - The quiz data
 */
function setupShareButtons(quiz) {
    const shareText = encodeURIComponent(`لقد أكملت اختبار "${quiz.title}" على موقع الاختبارات العربية! جرب أنت أيضاً!`);
    const shareUrl = encodeURIComponent(window.location.href);
    
    document.getElementById('share-facebook').addEventListener('click', function() {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, '_blank');
    });
    
    document.getElementById('share-twitter').addEventListener('click', function() {
        window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank');
    });
    
    document.getElementById('share-whatsapp').addEventListener('click', function() {
        window.open(`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`, '_blank');
    });
}

/**
 * Load and display related quizzes
 * @param {Object} currentQuiz - The current quiz data
 */
function loadRelatedQuizzes(currentQuiz) {
    const relatedQuizzesGrid = document.getElementById('related-quizzes-grid');
    const currentCategoryId = extractCategoryId(currentQuiz.id);
    
    // First, try to load quizzes from the same category
    const sameCategoryQuizzes = quizData.filter(quiz => quiz.id !== currentQuiz.id);
    
    // If we have enough quizzes from the same category, display them
    if (sameCategoryQuizzes.length >= 6) {
        displayRelatedQuizzes(sameCategoryQuizzes.slice(0, 6), relatedQuizzesGrid);
        return;
    }
    
    // Otherwise, we need to load quizzes from other categories
    const loadedQuizzes = [...sameCategoryQuizzes];
    const categoriesToLoad = categories.filter(cat => cat.id !== currentCategoryId)
                                      .sort(() => 0.5 - Math.random())
                                      .slice(0, 3); // Load from up to 3 random categories
    
    let loadedCount = 0;
    
    // Function to check if we've loaded enough quizzes
    const checkAndDisplayQuizzes = () => {
        loadedCount++;
        if (loadedCount === categoriesToLoad.length || loadedQuizzes.length >= 6) {
            // Display the quizzes we have so far (up to 6)
            displayRelatedQuizzes(loadedQuizzes.slice(0, 6), relatedQuizzesGrid);
        }
    };
    
    // Load quizzes from other categories
    categoriesToLoad.forEach(category => {
        // Create a temporary script element to load the category data
        const script = document.createElement('script');
        script.src = `../../data/${category.id}.js`;
        
        script.onload = function() {
            // Get random quizzes from this category
            const categoryQuizzes = window.quizData
                .filter(quiz => extractCategoryId(quiz.id) === category.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 2); // Get up to 2 quizzes from each category
            
            // Add to our collection
            loadedQuizzes.push(...categoryQuizzes);
            
            // Check if we have enough quizzes
            checkAndDisplayQuizzes();
            
            // Clean up the temporary script
            document.head.removeChild(script);
        };
        
        script.onerror = function() {
            // Handle error, just continue with what we have
            checkAndDisplayQuizzes();
            document.head.removeChild(script);
        };
        
        document.head.appendChild(script);
    });
    
    // If we don't have any categories to load, just display what we have
    if (categoriesToLoad.length === 0) {
        displayRelatedQuizzes(loadedQuizzes.slice(0, 6), relatedQuizzesGrid);
    }
}

/**
 * Display related quizzes in the grid
 * @param {Array} quizzes - Array of quiz objects to display
 * @param {HTMLElement} container - The container to display quizzes in
 */
function displayRelatedQuizzes(quizzes, container) {
    // Clear the container
    container.innerHTML = '';
    
    // If no quizzes, hide the section
    if (quizzes.length === 0) {
        document.querySelector('.related-quizzes-container').style.display = 'none';
        return;
    }
    
    // Display each quiz
    quizzes.forEach(quiz => {
        const categoryId = extractCategoryId(quiz.id);
        const categoryName = getCategoryNameById(categoryId);
        
        // Create difficulty label
        let difficultyClass = 'medium';
        let difficultyText = 'متوسط';
        
        if (quiz.difficulty) {
            if (quiz.difficulty === 'easy') {
                difficultyClass = 'easy';
                difficultyText = 'سهل';
            } else if (quiz.difficulty === 'hard') {
                difficultyClass = 'hard';
                difficultyText = 'صعب';
            }
        }
        
        // Create quiz card
        const quizCard = document.createElement('a');
        quizCard.href = `../quiz/${quiz.id}.html`;
        quizCard.className = 'related-quiz-card';
        quizCard.innerHTML = `
            <div class="related-quiz-card-content">
                <div class="related-quiz-title">${quiz.title}</div>
                <div class="related-quiz-description">${categoryName}</div>
                <span class="related-quiz-difficulty ${difficultyClass}">${difficultyText}</span>
            </div>
        `;
        
        container.appendChild(quizCard);
    });
    
    // Show the container
    document.querySelector('.related-quizzes-container').style.display = 'block';
}

/**
 * Show error message
 * @param {string} message - The error message
 */
function showError(message) {
    const container = document.getElementById('quiz-container');
    container.innerHTML = `<div class="error-message">${message}</div>`;
}
