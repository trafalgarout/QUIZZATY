// Script to remove the 3 ads above the footer in all category pages
const fs = require('fs');
const path = require('path');

// Path to category pages directory
const categoryDir = path.join(__dirname, 'src', 'pages', 'category');

// Get all HTML files in the category directory
const categoryFiles = fs.readdirSync(categoryDir).filter(file => file.endsWith('.html'));

// Process each file
categoryFiles.forEach(file => {
    const filePath = path.join(categoryDir, file);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove the mid-content ad, between-ads-content, and bottom-ads sections
        content = content.replace(
            /\s*<!-- Ad placement 3: Between quiz rows -->\s*<div class="ad-section mid-content">[\s\S]*?<\/div>\s*\s*<!-- Content between ads -->\s*<div class="between-ads-content wide">[\s\S]*?<\/div>\s*\s*<!-- Ad placement 4: After all quizzes -->\s*<div class="ad-section bottom-ads">[\s\S]*?<\/div>/g,
            ''
        );
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated file: ${file}`);
    } catch (error) {
        console.error(`Error updating file ${file}:`, error);
    }
});

console.log('All category pages have been updated - removed ads above footer!');
