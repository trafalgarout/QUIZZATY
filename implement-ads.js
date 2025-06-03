// Script to implement ad placements across the website
const fs = require('fs');
const path = require('path');

// Paths to different page types
const rootDir = __dirname;
const indexPath = path.join(rootDir, 'index.html');
const categoryDir = path.join(rootDir, 'src', 'pages', 'category');
const quizDir = path.join(rootDir, 'src', 'pages', 'quiz');

// Ad script tag to add to pages
const adScriptTag = '<script src="../../js/ad-placements.js"></script>';
const homeAdScriptTag = '<script src="src/js/ad-placements.js"></script>';

// Function to add ad script to a file
function addAdScriptToFile(filePath, scriptTag) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if the script is already included
        if (content.includes('ad-placements.js')) {
            console.log(`Ad script already included in ${filePath}`);
            return;
        }
        
        // Insert the script tag before the closing body tag
        content = content.replace('</body>', `    ${scriptTag}\n</body>`);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Added ad script to ${filePath}`);
    } catch (error) {
        console.error(`Error updating file ${filePath}:`, error);
    }
}

// Function to process all files in a directory
function processDirectory(directory, scriptTag) {
    const files = fs.readdirSync(directory).filter(file => file.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        addAdScriptToFile(filePath, scriptTag);
    });
}

// Add ad script to home page
console.log('Adding ad script to home page...');
addAdScriptToFile(indexPath, homeAdScriptTag);

// Add ad script to category pages
console.log('Adding ad script to category pages...');
processDirectory(categoryDir, adScriptTag);

// Add ad script to quiz pages
console.log('Adding ad script to quiz pages...');
processDirectory(quizDir, adScriptTag);

console.log('Ad implementation complete! All pages now have 6 responsive ad placements.');
