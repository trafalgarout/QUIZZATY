# موقع الاختبارات العربية (Arabic Quiz Website)

A multilingual (RTL-friendly) Arabic quiz website that offers a variety of quizzes across different categories.

## Features

- 🌐 **Multilingual Support**: Fully supports Arabic (RTL) content
- 📱 **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- 🎯 **Multiple Categories**: 20 different quiz categories
- 📊 **Score Tracking**: Track and share your quiz results
- 🔍 **SEO Optimized**: Structured data for better search engine visibility
- 💰 **Monetization**: Strategic ad placements with responsive Google AdSense integration
- 🦶 **Optimized Footer**: Detailed footer on homepage, simplified footer on content pages

## Project Structure

```
/
├── index.html              # Homepage with category grid
├── sitemap.xml             # Auto-generated sitemap
├── robots.txt              # Robots file for search engines
├── generate-pages.js       # Script to generate category and quiz pages
├── src/
│   ├── css/                # Stylesheets
│   │   └── main.css        # Main stylesheet
│   ├── js/                 # JavaScript files
│   │   ├── categories.js   # Categories data
│   │   ├── main.js         # Homepage script
│   │   ├── category-template.js  # Category page script
│   │   └── quiz-template.js      # Quiz page script
│   ├── data/               # Quiz data files
│   │   ├── general.js      # General knowledge quizzes
│   │   ├── science.js      # Science quizzes
│   │   └── ...             # Other category quiz files
│   ├── pages/              # HTML pages
│   │   ├── category/       # Category pages
│   │   │   ├── template.html     # Category page template
│   │   │   ├── general.html      # General knowledge category
│   │   │   └── ...               # Other category pages
│   │   └── quiz/           # Quiz pages
│   │       ├── template.html     # Quiz page template
│   │       ├── general01.html    # Quiz page for general01
│   │       └── ...               # Other quiz pages
│   └── assets/             # Assets directory
│       └── icons/          # Icons for categories
```

## Setup Instructions

1. Clone this repository
2. Run the page generator script to create all necessary pages:
   ```
   node generate-pages.js
   ```
3. Open `index.html` in your browser to view the website

## Adding New Quizzes

1. Create or edit a JavaScript file in the `src/data/` directory for your category (e.g., `general.js`)
2. Add quiz objects to the `quizData` array following this structure:
   ```javascript
   {
     id: "categoryXX",
     title: "Quiz Title",
     description: "Quiz Description",
     difficulty: "سهل|متوسط|صعب",
     questions: [
       {
         text: "Question text?",
         options: ["Option 1", "Option 2", "Option 3", "Option 4"],
         correctAnswer: 0 // Index of correct option (0-based)
       },
       // More questions...
     ]
   }
   ```
3. Run the page generator script to create pages for the new quizzes:
   ```
   node generate-pages.js
   ```

## SEO Features

- Each page includes proper meta tags and Open Graph tags
- JSON-LD structured data for quizzes
- Semantic HTML5 elements
- Auto-generated sitemap.xml
- Mobile-friendly responsive design

## Technical Details

- Built with pure HTML, CSS, and JavaScript
- No backend required - all static files
- Lazy loading of quiz data per category
- Responsive design with mobile-first approach

## License

This project is licensed under the MIT License - see the LICENSE file for details.
