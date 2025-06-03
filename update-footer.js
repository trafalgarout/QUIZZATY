// Script to update footers across the website
const fs = require('fs');
const path = require('path');

// Path to category pages directory
const categoryDir = path.join(__dirname, 'src', 'pages', 'category');
const quizDir = path.join(__dirname, 'src', 'pages', 'quiz');
const otherPagesDir = path.join(__dirname, 'src', 'pages');

// Simple footer HTML
const simpleFooter = `
    <footer class="simple-footer">
        <div class="container">
            <div class="simple-footer-content">
                <p>© 2025 موقع الاختبارات العربية - جميع الحقوق محفوظة</p>
                <div class="simple-footer-links">
                    <a href="/src/pages/about.html">من نحن</a>
                    <a href="/src/pages/contact.html">اتصل بنا</a>
                    <a href="/src/pages/privacy.html">سياسة الخصوصية</a>
                    <a href="/src/pages/terms.html">الشروط والأحكام</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="../../js/categories.js"></script>
    <script src="../../js/category-template.js"></script>
</body>
</html>`;

// Simple footer CSS
const simpleFooterCSS = `
/* Simple Footer Styles */
.simple-footer {
    background-color: #1a237e;
    color: #fff;
    padding: 20px 0;
    text-align: center;
    margin-top: 50px;
}

.simple-footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.simple-footer-links {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
}

.simple-footer-links a {
    color: #fff;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.simple-footer-links a:hover {
    color: #ffeb3b;
    text-decoration: underline;
}

@media (max-width: 768px) {
    .simple-footer-links {
        gap: 10px;
    }
}
`;

// Process category pages
function updateCategoryPages() {
    const categoryFiles = fs.readdirSync(categoryDir).filter(file => file.endsWith('.html'));
    
    categoryFiles.forEach(file => {
        const filePath = path.join(categoryDir, file);
        
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replace the existing footer with the simple footer
            content = content.replace(
                /<footer class="modern-footer">[\s\S]*?<\/footer>\s*<script/g,
                simpleFooter + '\n<script'
            );
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated footer in category page: ${file}`);
        } catch (error) {
            console.error(`Error updating file ${file}:`, error);
        }
    });
}

// Process quiz pages if they exist
function updateQuizPages() {
    if (!fs.existsSync(quizDir)) {
        console.log("Quiz directory doesn't exist, skipping...");
        return;
    }
    
    const quizFiles = fs.readdirSync(quizDir).filter(file => file.endsWith('.html'));
    
    quizFiles.forEach(file => {
        const filePath = path.join(quizDir, file);
        
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replace the existing footer with the simple footer
            content = content.replace(
                /<footer[\s\S]*?<\/footer>\s*<script/g,
                simpleFooter + '\n<script'
            );
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated footer in quiz page: ${file}`);
        } catch (error) {
            console.error(`Error updating file ${file}:`, error);
        }
    });
}

// Process other pages (about, contact, etc.) but not index.html
function updateOtherPages() {
    const otherFiles = fs.readdirSync(otherPagesDir)
        .filter(file => file.endsWith('.html') && !['index.html'].includes(file));
    
    otherFiles.forEach(file => {
        const filePath = path.join(otherPagesDir, file);
        
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replace the existing footer with the simple footer
            content = content.replace(
                /<footer[\s\S]*?<\/footer>\s*<script/g,
                simpleFooter + '\n<script'
            );
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated footer in page: ${file}`);
        } catch (error) {
            console.error(`Error updating file ${file}:`, error);
        }
    });
}

// Add simple footer CSS to the main CSS file
function addSimpleFooterCSS() {
    const cssPath = path.join(__dirname, 'src', 'css', 'static-elements.css');
    
    try {
        let cssContent = fs.readFileSync(cssPath, 'utf8');
        
        // Check if the simple footer styles already exist
        if (!cssContent.includes('.simple-footer')) {
            cssContent += simpleFooterCSS;
            fs.writeFileSync(cssPath, cssContent, 'utf8');
            console.log('Added simple footer CSS to static-elements.css');
        } else {
            console.log('Simple footer CSS already exists in static-elements.css');
        }
    } catch (error) {
        console.error('Error updating CSS file:', error);
    }
}

// Run all update functions
updateCategoryPages();
updateQuizPages();
updateOtherPages();
addSimpleFooterCSS();

console.log('Footer update complete! Home page footer preserved, all other pages now have a simple footer.');
