const markdownpdf = require('markdown-pdf');
const fs = require('fs');
const path = require('path');

// Configuration for PDF generation
const options = {
  // Paper format
  paperFormat: 'A4',
  paperOrientation: 'portrait',
  paperBorder: '1cm',
  
  // Rendering options
  renderDelay: 1000,
  loadTimeout: 10000,
  
  // CSS styling
  cssPath: path.join(__dirname, 'pdf-styles.css'),
  
  // Page options
  remarkable: {
    html: true,
    breaks: true,
    plugins: ['remarkable-classy'],
    preset: 'full'
  }
};

// Create CSS file for PDF styling
const cssContent = `
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: none;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #1a365d;
  font-size: 28px;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 3px solid #3182ce;
  padding-bottom: 10px;
}

h2 {
  color: #2d3748;
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 5px;
}

h3 {
  color: #4a5568;
  font-size: 20px;
  margin-top: 25px;
  margin-bottom: 12px;
}

h4 {
  color: #718096;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 12px;
  text-align: justify;
}

ul, ol {
  margin-bottom: 15px;
  padding-left: 25px;
}

li {
  margin-bottom: 5px;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  font-size: 14px;
}

th, td {
  border: 1px solid #e2e8f0;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f7fafc;
  font-weight: 600;
  color: #2d3748;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

code {
  background-color: #f7fafc;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 14px;
}

pre {
  background-color: #1a202c;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 15px 0;
}

pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

blockquote {
  border-left: 4px solid #3182ce;
  margin: 20px 0;
  padding: 10px 0 10px 15px;
  background-color: #f7fafc;
  font-style: italic;
}

strong {
  color: #2d3748;
  font-weight: 600;
}

.page-break {
  page-break-after: always;
}

@page {
  margin: 2cm;
  @bottom-center {
    content: counter(page);
    font-size: 12px;
    color: #718096;
  }
}

/* Header styling for SiteOptz branding */
img[alt*="SiteOptz"] {
  max-width: 150px;
  margin-bottom: 20px;
}

/* Table of contents styling */
.toc {
  background-color: #f7fafc;
  padding: 20px;
  border-radius: 5px;
  margin: 20px 0;
}

.toc ul {
  list-style: none;
  padding-left: 0;
}

.toc li {
  padding: 5px 0;
  border-bottom: 1px dotted #e2e8f0;
}

.toc a {
  text-decoration: none;
  color: #3182ce;
}

.toc a:hover {
  color: #2c5282;
}
`;

fs.writeFileSync(path.join(__dirname, 'pdf-styles.css'), cssContent);

// Files to convert
const filesToConvert = [
  {
    input: '/Users/siteoptz/siteoptz/public/guides/ai-chatbot-implementation-guide-content.md',
    output: '/Users/siteoptz/siteoptz/public/guides/ai-chatbot-implementation-guide.pdf'
  },
  {
    input: '/Users/siteoptz/siteoptz/public/guides/ai-content-generation-guide-content.md',
    output: '/Users/siteoptz/siteoptz/public/guides/ai-content-generation-guide.pdf'
  },
  {
    input: '/Users/siteoptz/siteoptz/public/guides/ai-data-analysis-guide-content.md',
    output: '/Users/siteoptz/siteoptz/public/guides/ai-data-analysis-guide.pdf'
  },
  {
    input: '/Users/siteoptz/siteoptz/public/reports/ai-healthcare-2024-report-content.md',
    output: '/Users/siteoptz/siteoptz/public/reports/ai-healthcare-2024-report.pdf'
  },
  {
    input: '/Users/siteoptz/siteoptz/public/reports/fintech-ai-2024-report-content.md',
    output: '/Users/siteoptz/siteoptz/public/reports/fintech-ai-2024-report.pdf'
  },
  {
    input: '/Users/siteoptz/siteoptz/public/reports/manufacturing-ai-2024-report-content.md',
    output: '/Users/siteoptz/siteoptz/public/reports/manufacturing-ai-2024-report.pdf'
  }
];

// Convert each file
async function generatePDFs() {
  console.log('Starting PDF generation...');
  
  for (const file of filesToConvert) {
    try {
      console.log(`Converting ${path.basename(file.input)} to PDF...`);
      
      await new Promise((resolve, reject) => {
        markdownpdf(options)
          .from(file.input)
          .to(file.output, (err) => {
            if (err) {
              console.error(`Error converting ${file.input}:`, err);
              reject(err);
            } else {
              console.log(`Successfully created ${file.output}`);
              resolve();
            }
          });
      });
      
    } catch (error) {
      console.error(`Failed to convert ${file.input}:`, error);
    }
  }
  
  console.log('PDF generation completed!');
}

// Run the conversion
generatePDFs().catch(console.error);