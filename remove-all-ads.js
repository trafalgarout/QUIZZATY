// Script to remove all ads from the website
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
        
        // Remove the premium banner ad between hero and content
        content = content.replace(
            /\s*<!-- Ad placement 1: Premium banner between hero and content -->\s*<div class="ad-section">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g,
            ''
        );
        
        // Remove the sidebar ads
        content = content.replace(
            /<div class="sidebar">[\s\S]*?<\/div>\s*<\/div>/g,
            '</div>'
        );
        
        // Convert content-with-sidebar to a simple container
        content = content.replace(
            /<div class="content-with-sidebar">\s*<div class="main-content">/g,
            '<div class="main-content">'
        );
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Removed ads from: ${file}`);
    } catch (error) {
        console.error(`Error updating file ${file}:`, error);
    }
});

// Also modify the category-template.js to remove the in-grid ads
const templateJsPath = path.join(__dirname, 'src', 'js', 'category-template.js');
try {
    let jsContent = fs.readFileSync(templateJsPath, 'utf8');
    
    // Remove the code that inserts ads between quiz cards
    jsContent = jsContent.replace(
        /\s*\/\/ Insert an ad after every 3rd quiz card\s*if \(\(index \+ 1\) % 3 === 0 && index < limitedQuizzes\.length - 1\) \{\s*const adElement = createAdElement\(Math\.floor\(index \/ 3\) \+ 1\);\s*container\.appendChild\(adElement\);\s*\}/g,
        ''
    );
    
    // Remove the createAdElement function
    jsContent = jsContent.replace(
        /\/\*\*\s*\* Create an ad element to insert between quiz cards[\s\S]*?function createAdElement\(adNumber\) \{[\s\S]*?return adContainer;\s*\}\s*/g,
        ''
    );
    
    fs.writeFileSync(templateJsPath, jsContent, 'utf8');
    console.log('Removed ad insertion code from category-template.js');
} catch (error) {
    console.error('Error updating category-template.js:', error);
}

console.log('All ads have been removed from the website!');
