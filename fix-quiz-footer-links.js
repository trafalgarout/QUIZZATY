// Script to fix links in quiz page footers
const fs = require('fs');
const path = require('path');

// Path to quiz pages directory
const quizDir = path.join(__dirname, 'src', 'pages', 'quiz');

// Simple footer HTML with corrected links
const simpleFooter = `
    <footer class="simple-footer">
        <div class="container">
            <div class="simple-footer-content">
                <p>© 2025 موقع الاختبارات العربية - جميع الحقوق محفوظة</p>
                <div class="simple-footer-links">
                    <a href="../../pages/about.html">من نحن</a>
                    <a href="../../pages/contact.html">اتصل بنا</a>
                    <a href="../../pages/privacy.html">سياسة الخصوصية</a>
                    <a href="../../pages/terms.html">الشروط والأحكام</a>
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
            
            // Replace the existing footer with the simple footer with corrected links
            content = content.replace(
                /<footer class="simple-footer">[\s\S]*<\/html>/g,
                simpleFooter
            );
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed footer links in quiz page: ${file}`);
        } catch (error) {
            console.error(`Error updating file ${file}:`, error);
        }
    });
}

// Run the update function
updateQuizPages();

console.log('Quiz page footer links fixed! All quiz pages now have correct relative paths.');
