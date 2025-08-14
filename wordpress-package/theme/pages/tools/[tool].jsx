/**
 * Dynamic Tool Page Component
 * Renders individual tool pages based on tool ID
 */

import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import ComparisonTable from '../../components/table';
import PricingCalculator from '../../components/pricing-calculator';
import FAQ from '../../components/faq';

// Import tool data
import toolData from '../../data/tool_data.json';

export default function ToolPage() {
  const router = useRouter();
  const { tool: toolId } = router.query;
  const [tool, setTool] = useState(null);
  const [relatedTools, setRelatedTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (toolId) {
      // Find the tool in our data
      const currentTool = toolData.tools.find(t => t.id === toolId);
      
      if (currentTool) {
        setTool(currentTool);
        
        // Find related tools in the same category
        const related = toolData.tools
          .filter(t => t.category === currentTool.category && t.id !== toolId)
          .slice(0, 3);
        setRelatedTools(related);
      }
      
      setLoading(false);
    }
  }, [toolId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!tool) {
    return <div className="not-found">Tool not found</div>;
  }

  return (
    <>
      <Head>
        <title>{tool.name} - AI Tool Review & Pricing | SiteOptz.ai</title>
        <meta name="description" content={`${tool.description}. Compare features, pricing, and alternatives.`} />
      </Head>

      <div className="tool-page">
        {/* Tool Header */}
        <header className="tool-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a> / 
              <a href="/ai-tools">AI Tools</a> / 
              <a href={`/category/${tool.category}`}>{tool.category}</a> / 
              {tool.name}
            </div>
            
            <div className="tool-intro">
              <h1>{tool.name}</h1>
              <p className="tagline">{tool.description}</p>
              
              <div className="tool-meta">
                <span className="rating">⭐ {tool.rating}/5</span>
                <span className="users">{tool.users} users</span>
                <span className="category">{tool.category}</span>
              </div>
              
              <div className="tool-actions">
                <a href={tool.website} className="btn btn-primary" target="_blank">
                  Visit Website
                </a>
                <button className="btn btn-secondary" onClick={() => addToCompare(tool.id)}>
                  Add to Compare
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="tool-content">
          <div className="container">
            {/* Features Section */}
            <section className="features-section">
              <h2>Key Features</h2>
              <div className="features-grid">
                {tool.features.map((feature, idx) => (
                  <div key={idx} className="feature-card">
                    <h3>{feature}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
              <h2>Pricing Plans</h2>
              <div className="pricing-cards">
                {tool.pricing.free && (
                  <div className="pricing-card">
                    <h3>Free</h3>
                    <div className="price">$0</div>
                    <p>Perfect for trying out</p>
                  </div>
                )}
                
                <div className="pricing-card featured">
                  <h3>Starter</h3>
                  <div className="price">${tool.pricing.starter}<span>/mo</span></div>
                  <p>Great for individuals</p>
                </div>
                
                <div className="pricing-card">
                  <h3>Pro</h3>
                  <div className="price">${tool.pricing.pro}<span>/mo</span></div>
                  <p>Best for teams</p>
                </div>
              </div>
            </section>

            {/* Pros and Cons */}
            <section className="pros-cons-section">
              <h2>Pros & Cons</h2>
              <div className="pros-cons-grid">
                <div className="pros">
                  <h3>✅ Pros</h3>
                  <ul>
                    {tool.pros.map((pro, idx) => (
                      <li key={idx}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h3>❌ Cons</h3>
                  <ul>
                    {tool.cons.map((con, idx) => (
                      <li key={idx}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Comparison with Related Tools */}
            <section className="comparison-section">
              <h2>Compare with Similar Tools</h2>
              <ComparisonTable 
                tools={[tool, ...relatedTools]}
                features={[
                  { key: 'rating', name: 'Rating' },
                  { key: 'pricing', name: 'Starting Price' },
                  { key: 'api', name: 'API Available' },
                  { key: 'features', name: 'Key Features' }
                ]}
              />
            </section>

            {/* ROI Calculator */}
            <section className="calculator-section">
              <h2>Calculate Your ROI</h2>
              <PricingCalculator tools={[tool]} />
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
              <h2>Frequently Asked Questions</h2>
              <FAQ 
                data={{
                  general: [
                    {
                      question: `What is ${tool.name}?`,
                      answer: tool.description
                    },
                    {
                      question: `How much does ${tool.name} cost?`,
                      answer: `${tool.name} starts at $${tool.pricing.starter}/month with ${tool.pricing.free ? 'a free tier available' : 'no free tier'}.`
                    },
                    {
                      question: `Does ${tool.name} have an API?`,
                      answer: tool.api ? 'Yes, an API is available for integration.' : 'No, there is currently no API available.'
                    }
                  ]
                }}
                category="general"
              />
            </section>

            {/* Related Tools */}
            <section className="related-tools-section">
              <h2>Alternative Tools</h2>
              <div className="tools-grid">
                {relatedTools.map(relatedTool => (
                  <div key={relatedTool.id} className="tool-card">
                    <h3>{relatedTool.name}</h3>
                    <p>{relatedTool.description}</p>
                    <div className="tool-meta">
                      <span>⭐ {relatedTool.rating}</span>
                      <span>${relatedTool.pricing.starter}/mo</span>
                    </div>
                    <a href={`/tools/${relatedTool.id}`}>View Details</a>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

// Function to add tool to comparison
function addToCompare(toolId) {
  const compareList = JSON.parse(localStorage.getItem('compareTools') || '[]');
  
  if (!compareList.includes(toolId)) {
    compareList.push(toolId);
    localStorage.setItem('compareTools', JSON.stringify(compareList));
    alert('Tool added to comparison!');
  } else {
    alert('Tool already in comparison list');
  }
}