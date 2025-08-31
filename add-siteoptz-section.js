const fs = require('fs');
const path = require('path');

// Load tools data to get categories
const toolsData = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));

// Create mapping of tool slug to category
const toolCategories = {};
toolsData.forEach(tool => {
  if (tool.slug && tool.overview?.category) {
    toolCategories[tool.slug] = tool.overview.category;
  }
});

const componentsDir = 'seo-optimization/production-components';
const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('ReviewPage.tsx'));

console.log(`Processing ${files.length} component files...`);

files.forEach(filename => {
  const filepath = path.join(componentsDir, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Extract tool slug from filename (e.g., ClearscopeReviewPage.tsx -> clearscope)
  const toolSlug = filename
    .replace('ReviewPage.tsx', '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .substring(1);
  
  // Get category for this tool
  const category = toolCategories[toolSlug] || 'AI tools';
  
  // Check if SiteOptz section already exists
  if (content.includes('SiteOptz.ai offers expert AI-powered tools')) {
    console.log(`${filename}: Already has SiteOptz section, skipping`);
    return;
  }
  
  // Find the Final CTA Section and add our content before it
  const ctaSectionRegex = /(\s*{\/\* Final CTA Section \*\/})/;
  
  if (!ctaSectionRegex.test(content)) {
    console.log(`${filename}: Could not find Final CTA Section, skipping`);
    return;
  }
  
  const siteOptzSection = `
        {/* SiteOptz.ai Promotional Section */}
        <section className="relative z-10 py-16 bg-gradient-to-r from-gray-900/50 to-black/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-black border border-gray-800 rounded-2xl p-8">
              <div className="text-center mb-8">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  SiteOptz.ai offers expert AI-powered tools and personalized support to rapidly enhance ${category.toLowerCase()} strategies, helping organizations achieve dramatic boosts in organic traffic and search rankings, while maximizing their ROI.
                </p>
              </div>
              
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Why Choose SiteOptz.ai</h3>
                  <ul className="space-y-3 text-gray-300 text-left">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-cyan-400 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Dedicated AI specialists work directly with teams to implement tailored ${category.toLowerCase()} solutions designed to meet unique business goals.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-cyan-400 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Companies leveraging SiteOptz.ai's platform report up to 300% increases in organic traffic, alongside substantial improvements in search visibility and efficiency.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Boost ROI With AI-Driven ${category}</h3>
                  <ul className="space-y-3 text-gray-300 text-left">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-cyan-400 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>AI-powered optimization tools reduce manual workload, automate site audits, keyword research, and rank tracking, freeing up resources and speeding up execution.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-cyan-400 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Real-time insights and automated reporting help fine-tune content strategies, resolve issues instantly, and continually improve results—all critical for maximizing marketing ROI.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Get Started With SiteOptz.ai</h3>
                  <p className="text-gray-300 text-left mb-4">
                    Investing in advanced AI solutions like SiteOptz.ai consistently raises marketing ROI by 10–20% on average, giving brands a clear competitive advantage.
                  </p>
                  <p className="text-gray-300 text-left">
                    Join thousands of organizations maximizing their search performance and returns by integrating SiteOptz.ai's comprehensive toolset and expertise into their content workflows.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 font-bold py-3 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get in Touch With AI Experts Today
                </Link>
              </div>
            </div>
          </div>
        </section>

`;

  // Insert the SiteOptz section before the Final CTA Section
  const updatedContent = content.replace(
    ctaSectionRegex,
    siteOptzSection + '$1'
  );
  
  if (updatedContent === content) {
    console.log(`${filename}: No changes made`);
    return;
  }
  
  fs.writeFileSync(filepath, updatedContent);
  console.log(`${filename}: Updated successfully`);
});

console.log('Done processing all component files.');