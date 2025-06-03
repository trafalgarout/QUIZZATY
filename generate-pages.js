// Script to generate category and quiz pages

const fs = require('fs');
const path = require('path');

// Load categories data
const categoriesData = fs.readFileSync(path.join(__dirname, 'src', 'js', 'categories.js'), 'utf8');
// Extract categories array from the file
const categoriesMatch = categoriesData.match(/const\s+categories\s*=\s*(\[[\s\S]*?\]);/);
const categoriesJson = categoriesMatch ? categoriesMatch[1] : '[]';
const categories = eval(categoriesJson);

// Create category pages
function generateCategoryPages() {
    console.log('Generating category pages...');
    
    // Read category template
    const templatePath = path.join(__dirname, 'src', 'pages', 'category', 'template.html');
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // Create a page for each category
    categories.forEach(category => {
        console.log(`Creating page for category: ${category.id}`);
        
        // Create the category page
        const categoryPath = path.join(__dirname, 'src', 'pages', 'category', `${category.id}.html`);
        fs.writeFileSync(categoryPath, template);
        
        // Create empty data file for this category if it doesn't exist
        const dataPath = path.join(__dirname, 'src', 'data', `${category.id}.js`);
        if (!fs.existsSync(dataPath)) {
            const quizDataTemplate = `const quizData = [
  {
    id: "${category.id}01",
    title: "اختبار في ${category.name}",
    description: "اختبار أساسي في ${category.name}",
    difficulty: "متوسط",
    questions: [
      {
        text: "سؤال نموذجي في ${category.name}؟",
        options: [
          "الخيار الأول",
          "الخيار الثاني",
          "الخيار الثالث",
          "الخيار الرابع"
        ],
        correctAnswer: 0
      },
      {
        text: "سؤال نموذجي آخر في ${category.name}؟",
        options: [
          "الخيار الأول",
          "الخيار الثاني",
          "الخيار الثالث",
          "الخيار الرابع"
        ],
        correctAnswer: 1
      }
    ]
  }
];`;
            fs.writeFileSync(dataPath, quizDataTemplate);
        }
    });
    
    console.log('Category pages generated successfully!');
}

// Create quiz pages
function generateQuizPages() {
    console.log('Generating quiz pages...');
    
    // Read quiz template
    const templatePath = path.join(__dirname, 'src', 'pages', 'quiz', 'template.html');
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // For each category, read its data file and create quiz pages
    categories.forEach(category => {
        const dataPath = path.join(__dirname, 'src', 'data', `${category.id}.js`);
        
        // Skip if data file doesn't exist
        if (!fs.existsSync(dataPath)) {
            console.log(`No data file found for category: ${category.id}`);
            return;
        }
        
        // Read quiz data
        const quizDataContent = fs.readFileSync(dataPath, 'utf8');
        // Extract quizData array from the file
        const quizDataMatch = quizDataContent.match(/const\s+quizData\s*=\s*(\[[\s\S]*?\]);/);
        const quizDataJson = quizDataMatch ? quizDataMatch[1] : '[]';
        
        try {
            const quizData = eval(quizDataJson);
            
            // Create a page for each quiz
            quizData.forEach(quiz => {
                console.log(`Creating page for quiz: ${quiz.id}`);
                
                // Create the quiz page
                const quizPath = path.join(__dirname, 'src', 'pages', 'quiz', `${quiz.id}.html`);
                fs.writeFileSync(quizPath, template);
            });
        } catch (error) {
            console.error(`Error processing quiz data for category ${category.id}:`, error);
        }
    });
    
    console.log('Quiz pages generated successfully!');
}

// Generate sitemap.xml
function generateSitemap() {
    console.log('Generating sitemap.xml...');
    
    const baseUrl = 'https://arabicquiz.example.com'; // Replace with actual domain when deployed
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>`;
    
    // Add category pages
    categories.forEach(category => {
        sitemapContent += `
  <url>
    <loc>${baseUrl}/src/pages/category/${category.id}.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>`;
        
        // Get quiz data for this category
        const dataPath = path.join(__dirname, 'src', 'data', `${category.id}.js`);
        if (fs.existsSync(dataPath)) {
            const quizDataContent = fs.readFileSync(dataPath, 'utf8');
            const quizDataMatch = quizDataContent.match(/const\s+quizData\s*=\s*(\[[\s\S]*?\]);/);
            const quizDataJson = quizDataMatch ? quizDataMatch[1] : '[]';
            
            try {
                const quizData = eval(quizDataJson);
                
                // Add quiz pages
                quizData.forEach(quiz => {
                    sitemapContent += `
  <url>
    <loc>${baseUrl}/src/pages/quiz/${quiz.id}.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.6</priority>
  </url>`;
                });
            } catch (error) {
                console.error(`Error processing quiz data for sitemap (category ${category.id}):`, error);
            }
        }
    });
    
    sitemapContent += `
</urlset>`;
    
    // Write sitemap file
    const sitemapPath = path.join(__dirname, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent);
    
    console.log('Sitemap generated successfully!');
}

// Generate robots.txt
function generateRobotsTxt() {
    console.log('Generating robots.txt...');
    
    const robotsContent = `User-agent: *
Allow: /
Sitemap: https://arabicquiz.example.com/sitemap.xml`;
    
    const robotsPath = path.join(__dirname, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsContent);
    
    console.log('robots.txt generated successfully!');
}

// Create necessary directories if they don't exist
function ensureDirectories() {
    const dirs = [
        path.join(__dirname, 'src', 'data'),
        path.join(__dirname, 'src', 'pages', 'category'),
        path.join(__dirname, 'src', 'pages', 'quiz')
    ];
    
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

// Main function
function main() {
    try {
        ensureDirectories();
        generateCategoryPages();
        generateQuizPages();
        generateSitemap();
        generateRobotsTxt();
        console.log('All pages generated successfully!');
    } catch (error) {
        console.error('Error generating pages:', error);
    }
}

// Run the main function
main();
