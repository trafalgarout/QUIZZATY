// Script to update footers for quiz pages
const fs = require('fs');
const path = require('path');

// Path to quiz pages directory
const quizDir = path.join(__dirname, 'src', 'pages', 'quiz');

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

    <!-- JSON-LD structured data will be injected here -->
    <script type="application/ld+json" id="quiz-jsonld"></script>
    
    <script src="../../js/categories.js"></script>
    <script src="../../js/quiz-template.js"></script>
</body>
</html>`;

// Process quiz pages
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
            // This pattern specifically targets the entire footer section including the closing tags
            content = content.replace(
                /<footer class="modern-footer">[\s\S]*<\/html>/g,
                simpleFooter
            );
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated footer in quiz page: ${file}`);
        } catch (error) {
            console.error(`Error updating file ${file}:`, error);
        }
    });
}

// Run the update function
updateQuizPages();

console.log('Quiz page footer update complete! All quiz pages now have a simple footer.');
