// Script to update all category pages to add content between ads
const fs = require('fs');
const path = require('path');

// Path to category pages directory
const categoryDir = path.join(__dirname, 'src', 'pages', 'category');

// Get all HTML files in the category directory
const categoryFiles = fs.readdirSync(categoryDir).filter(file => file.endsWith('.html'));

// New sidebar section with content between ads
const newSidebarContent = `                <div class="sidebar">
                    <div class="ad-container sidebar-ad">
                        <div class="ad-label">إعلان</div>
                        <div class="ad-content">إعلان أفقي</div>
                    </div>
                    
                    <!-- Content between ads -->
                    <div class="between-ads-content">
                        <h3 class="featured-title">اختبارات مميزة</h3>
                        <div class="featured-items">
                            <div class="featured-item">
                                <i class="fas fa-star"></i>
                                <span>اختبار الذكاء العام</span>
                            </div>
                            <div class="featured-item">
                                <i class="fas fa-star"></i>
                                <span>اختبار الشخصية</span>
                            </div>
                            <div class="featured-item">
                                <i class="fas fa-star"></i>
                                <span>اختبار المعلومات العامة</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ad-container sidebar-ad">
                        <div class="ad-label">إعلان</div>
                        <div class="ad-content">إعلان أفقي آخر</div>
                    </div>
                </div>`;

// New content between mid-content and bottom ads
const newMidBottomContent = `            <!-- Ad placement 3: Between quiz rows -->
            <div class="ad-section mid-content">
                <div class="ad-container horizontal-card">
                    <div class="ad-label">إعلان</div>
                    <div class="ad-content">إعلان بين محتوى الاختبارات</div>
                </div>
            </div>
            
            <!-- Content between ads -->
            <div class="between-ads-content wide">
                <h3 class="featured-title">تصفح حسب الموضوع</h3>
                <div class="topic-tags">
                    <a href="#" class="topic-tag">علوم</a>
                    <a href="#" class="topic-tag">رياضيات</a>
                    <a href="#" class="topic-tag">تاريخ</a>
                    <a href="#" class="topic-tag">جغرافيا</a>
                    <a href="#" class="topic-tag">أدب</a>
                    <a href="#" class="topic-tag">فن</a>
                    <a href="#" class="topic-tag">رياضة</a>
                    <a href="#" class="topic-tag">تكنولوجيا</a>
                </div>
            </div>
            
            <!-- Ad placement 4: After all quizzes -->
            <div class="ad-section bottom-ads">
                <div class="ad-container premium-banner">
                    <div class="ad-label">إعلان</div>
                    <div class="ad-content">إعلان أسفل المحتوى</div>
                </div>
            </div>`;

// Process each file
categoryFiles.forEach(file => {
    const filePath = path.join(categoryDir, file);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace the sidebar content
        content = content.replace(
            /                <div class="sidebar">\s*<div class="ad-container sidebar-ad">\s*<div class="ad-label">إعلان<\/div>\s*<div class="ad-content">إعلان أفقي<\/div>\s*<\/div>\s*\s*<div class="ad-container sidebar-ad">\s*<div class="ad-label">إعلان<\/div>\s*<div class="ad-content">إعلان أفقي آخر<\/div>\s*<\/div>\s*<\/div>/g,
            newSidebarContent
        );
        
        // Replace the mid-content and bottom ads section
        content = content.replace(
            /            <!-- Ad placement 3: Between quiz rows -->\s*<div class="ad-section mid-content">\s*<div class="ad-container horizontal-card">\s*<div class="ad-label">إعلان<\/div>\s*<div class="ad-content">إعلان بين محتوى الاختبارات<\/div>\s*<\/div>\s*<\/div>\s*\s*<!-- Ad placement 4: After all quizzes -->\s*<div class="ad-section bottom-ads">\s*<div class="ad-container premium-banner">\s*<div class="ad-label">إعلان<\/div>\s*<div class="ad-content">إعلان أسفل المحتوى<\/div>\s*<\/div>\s*<\/div>/g,
            newMidBottomContent
        );
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated file: ${file}`);
    } catch (error) {
        console.error(`Error updating file ${file}:`, error);
    }
});

console.log('All category pages have been updated with content between ads!');
