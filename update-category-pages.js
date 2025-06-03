// Script to update all category pages with the enhanced hero section and ad placements
const fs = require('fs');
const path = require('path');

// Path to category pages directory
const categoryDir = path.join(__dirname, 'src', 'pages', 'category');

// Get all HTML files in the category directory
const categoryFiles = fs.readdirSync(categoryDir).filter(file => file.endsWith('.html'));

// Template for the new content
const newHeaderTemplate = `<body>
    <!-- Top Navigation Bar -->
    <nav class="top-nav">
        <div class="container nav-container">
            <div class="nav-right">
                <a href="../../../index.html" class="nav-link">الرئيسية</a>
                <a href="../../pages/categories.html" class="nav-link">الاختبارات</a>
                <a href="../../pages/categories.html" class="nav-link">الفئات</a>
            </div>
            <div class="nav-left">
                <a href="#" class="nav-link">تسجيل الدخول</a>
                <a href="#" class="nav-link highlight">إنشاء حساب</a>
            </div>
        </div>
    </nav>

    <header class="category-hero">
        <div class="hero-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
        </div>
        <div class="container">
            <div class="category-header-info">
                <div class="category-icon-container">
                    <i id="category-icon" class="fas fa-question"></i>
                </div>
                <h1 id="category-title">عنوان الفئة</h1>
                <p id="category-description" class="hero-description">وصف الفئة</p>
                <a href="../../../index.html" class="back-button">
                    <i class="fas fa-arrow-right"></i> العودة للرئيسية
                </a>
            </div>
        </div>
    </header>
    
    <!-- Ad placement 1: Premium banner between hero and content -->
    <div class="ad-section">
        <div class="container">
            <div class="ad-container premium-banner">
                <div class="ad-label">إعلان</div>
                <div class="ad-content">مساحة إعلانية مميزة</div>
            </div>
        </div>
    </div>`;

const newMainTemplate = `    <main>
        <div class="container">
            <!-- Quiz section header -->
            <div class="section-header">
                <h2 class="section-title">اختبارات هذه الفئة</h2>
                <p class="section-subtitle">اختر من بين مجموعة متنوعة من الاختبارات</p>
            </div>
            
            <!-- Ad placement 2: Sidebar ad that floats alongside content -->
            <div class="content-with-sidebar">
                <div class="main-content">
                    <section class="quiz-grid" id="quizzes-container">
                        <!-- Quizzes will be loaded here dynamically -->
                        <div class="loading">جاري تحميل الاختبارات...</div>
                    </section>
                </div>
                
                <div class="sidebar">
                    <div class="ad-container sidebar-ad">
                        <div class="ad-label">إعلان</div>
                        <div class="ad-content">إعلان جانبي</div>
                    </div>
                    
                    <div class="ad-container sidebar-ad">
                        <div class="ad-label">إعلان</div>
                        <div class="ad-content">إعلان جانبي آخر</div>
                    </div>
                </div>
            </div>
            
            <!-- Ad placement 3: Between quiz rows -->
            <div class="ad-section mid-content">
                <div class="ad-container horizontal-card">
                    <div class="ad-label">إعلان</div>
                    <div class="ad-content">إعلان بين محتوى الاختبارات</div>
                </div>
            </div>
            
            <!-- Ad placement 4: After all quizzes -->
            <div class="ad-section bottom-ads">
                <div class="ad-container premium-banner">
                    <div class="ad-label">إعلان</div>
                    <div class="ad-content">إعلان أسفل المحتوى</div>
                </div>
            </div>
        </div>
    </main>`;

// CSS link to add
const cssLink = '<link rel="stylesheet" href="../../css/category-pages.css">';

// Process each file
categoryFiles.forEach(file => {
    const filePath = path.join(categoryDir, file);
    
    // Skip already updated files
    if (file === 'art.html' || file === 'general.html') {
        console.log(`Skipping already updated file: ${file}`);
        return;
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add CSS link if not present
        if (!content.includes('category-pages.css')) {
            content = content.replace(
                '<link rel="stylesheet" href="../../css/static-elements.css">',
                '<link rel="stylesheet" href="../../css/static-elements.css">\n    <link rel="stylesheet" href="../../css/category-pages.css">'
            );
        }
        
        // Replace the body opening section
        content = content.replace(
            /<body>[\s\S]*?<\/header>/,
            newHeaderTemplate
        );
        
        // Replace the main section
        content = content.replace(
            /<main>[\s\S]*?<\/main>/,
            newMainTemplate
        );
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated file: ${file}`);
    } catch (error) {
        console.error(`Error updating file ${file}:`, error);
    }
});

console.log('All category pages have been updated!');
