// Script to update all category pages to change sidebar ads to horizontal ads
const fs = require('fs');
const path = require('path');

// Path to category pages directory
const categoryDir = path.join(__dirname, 'src', 'pages', 'category');

// Get all HTML files in the category directory
const categoryFiles = fs.readdirSync(categoryDir).filter(file => file.endsWith('.html'));

// New sidebar section with horizontal ads
const newSidebarContent = `                <div class="sidebar">
                    <div class="ad-container sidebar-ad">
                        <div class="ad-label">إعلان</div>
                        <div class="ad-content">إعلان أفقي</div>
                    </div>
                    
                    <div class="ad-container sidebar-ad">
                        <div class="ad-label">إعلان</div>
                        <div class="ad-content">إعلان أفقي آخر</div>
                    </div>
                </div>`;

// Process each file
categoryFiles.forEach(file => {
    const filePath = path.join(categoryDir, file);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace the sidebar content
        content = content.replace(
            /                <div class="sidebar">\s*<div class="ad-container sidebar-ad">\s*<div class="ad-label">إعلان<\/div>\s*<div class="ad-content">إعلان جانبي<\/div>\s*<\/div>\s*\s*<div class="ad-container sidebar-ad">\s*<div class="ad-label">إعلان<\/div>\s*<div class="ad-content">إعلان جانبي آخر<\/div>\s*<\/div>\s*<\/div>/g,
            newSidebarContent
        );
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated file: ${file}`);
    } catch (error) {
        console.error(`Error updating file ${file}:`, error);
    }
});

console.log('All category pages have been updated with horizontal ads!');
