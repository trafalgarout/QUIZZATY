// Script to fix links in category page footers
const fs = require('fs');
const path = require('path');

// Path to category pages directory
const categoryDir = path.join(__dirname, 'src', 'pages', 'category');

// Simple footer HTML with corrected links for category pages
const simpleFooter = `
    <footer class="simple-footer">
        <div class="container">
            <div class="simple-footer-content">
                <p>© 2025 موقع الاختبارات العربية - جميع الحقوق محفوظة</p>
                <div class="simple-footer-links">
                    <a href="../../about.html">من نحن</a>
                    <a href="../../contact.html">اتصل بنا</a>
                    <a href="../../privacy.html">سياسة الخصوصية</a>
                    <a href="../../terms.html">الشروط والأحكام</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="../../js/categories.js"></script>
    <script src="../../js/category-template.js"></script>
    <script src="../../../src/js/footer-animation.js"></script>
</body>
</html>`;

// Process category pages
function updateCategoryPages() {
    const categoryFiles = fs.readdirSync(categoryDir).filter(file => file.endsWith('.html'));
    
    categoryFiles.forEach(file => {
        const filePath = path.join(categoryDir, file);
        
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replace the existing footer with the simple footer with corrected links
            content = content.replace(
                /<footer class="simple-footer">[\s\S]*<\/html>/g,
                simpleFooter
            );
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed footer links in category page: ${file}`);
        } catch (error) {
            console.error(`Error updating file ${file}:`, error);
        }
    });
}

// Run the update function
updateCategoryPages();

console.log('Category page footer links fixed! All category pages now have correct relative paths.');
