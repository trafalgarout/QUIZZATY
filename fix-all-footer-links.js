// Script to fix links in both category and quiz page footers
const fs = require('fs');
const path = require('path');

// Paths to directories
const categoryDir = path.join(__dirname, 'src', 'pages', 'category');
const quizDir = path.join(__dirname, 'src', 'pages', 'quiz');

// Simple footer HTML with corrected links for category pages
const categoryFooter = `
    <footer class="simple-footer">
        <div class="container">
            <div class="simple-footer-content">
                <p>© 2025 موقع الاختبارات العربية - جميع الحقوق محفوظة</p>
                <div class="simple-footer-links">
                    <a href="../about.html">من نحن</a>
                    <a href="../contact.html">اتصل بنا</a>
                    <a href="../privacy.html">سياسة الخصوصية</a>
                    <a href="../terms.html">الشروط والأحكام</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="../../../js/categories.js"></script>
    <script src="../../../js/category-template.js"></script>
    <script src="../../../js/footer-animation.js"></script>
</body>
</html>`;

// Simple footer HTML with corrected links for quiz pages
const quizFooter = `
    <footer class="simple-footer">
        <div class="container">
            <div class="simple-footer-content">
                <p>© 2025 موقع الاختبارات العربية - جميع الحقوق محفوظة</p>
                <div class="simple-footer-links">
                    <a href="../about.html">من نحن</a>
                    <a href="../contact.html">اتصل بنا</a>
                    <a href="../privacy.html">سياسة الخصوصية</a>
                    <a href="../terms.html">الشروط والأحكام</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- JSON-LD structured data will be injected here -->
    <script type="application/ld+json" id="quiz-jsonld"></script>
    
    <script src="../../../js/categories.js"></script>
    <script src="../../../js/quiz-template.js"></script>
</body>
</html>`;

// Process category pages
function updateCategoryPages() {
    if (!fs.existsSync(categoryDir)) {
        console.log("Category directory doesn't exist, skipping...");
        return;
    }
    
    const categoryFiles = fs.readdirSync(categoryDir).filter(file => file.endsWith('.html'));
    
    categoryFiles.forEach(file => {
        const filePath = path.join(categoryDir, file);
        
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replace the existing footer with the simple footer with corrected links
            content = content.replace(
                /<footer class="simple-footer">[\s\S]*<\/html>/g,
                categoryFooter
            );
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed footer links in category page: ${file}`);
        } catch (error) {
            console.error(`Error updating file ${file}:`, error);
        }
    });
}

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
                quizFooter
            );
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed footer links in quiz page: ${file}`);
        } catch (error) {
            console.error(`Error updating file ${file}:`, error);
        }
    });
}

// Run the update functions
updateCategoryPages();
updateQuizPages();

console.log('All footer links fixed! Both category and quiz pages now have correct relative paths.');
