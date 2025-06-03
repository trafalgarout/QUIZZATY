// Main JavaScript file for the homepage

document.addEventListener('DOMContentLoaded', function() {
    // Load and display categories
    displayCategories();
});

/**
 * Display all categories in the grid
 */
function displayCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    
    // Clear loading message
    categoriesContainer.innerHTML = '';
    
    // Loop through categories and create cards
    categories.forEach(category => {
        const categoryCard = createCategoryCard(category);
        categoriesContainer.appendChild(categoryCard);
    });
}

/**
 * Create a category card element
 * @param {Object} category - The category data
 * @returns {HTMLElement} - The category card element
 */
function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.setAttribute('data-category-id', category.id);
    
    // Create card HTML structure
    card.innerHTML = `
        <div class="category-header">
            <div class="category-icon" style="background-color: ${category.color}">
                <i class="${category.icon}"></i>
            </div>
            <h2 class="category-title">${category.name}</h2>
        </div>
        <div class="category-content">
            <p class="category-description">${category.description}</p>
            <a href="src/pages/category/${category.id}.html" class="category-link">عرض الاختبارات</a>
        </div>
    `;
    
    // Add click event to the entire card
    card.addEventListener('click', function(e) {
        // If the click is not on the link itself, navigate programmatically
        if (!e.target.classList.contains('category-link')) {
            window.location.href = `src/pages/category/${category.id}.html`;
        }
    });
    
    return card;
}
