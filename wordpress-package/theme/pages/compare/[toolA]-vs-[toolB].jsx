/**
 * Dynamic Comparison Page Component
 * Renders comparison pages for two tools
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ComparisonTable from '../../components/table';

// Import tool data
import toolData from '../../data/tool_data.json';

export default function ComparisonPage() {
  const router = useRouter();
  const { 'toolA-vs-toolB': comparison } = router.query;
  const [toolA, setToolA] = useState(null);
  const [toolB, setToolB] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (comparison) {
      // Parse the comparison string
      const match = comparison.match(/(.+)-vs-(.+)/);
      
      if (match) {
        const [, toolAId, toolBId] = match;
        
        // Find tools in our data
        const foundToolA = toolData.tools.find(t => t.id === toolAId);
        const foundToolB = toolData.tools.find(t => t.id === toolBId);
        
        setToolA(foundToolA);
        setToolB(foundToolB);
      }
      
      setLoading(false);
    }
  }, [comparison]);

  if (loading) {
    return <div className="loading">Loading comparison...</div>;
  }

  if (!toolA || !toolB) {
    return <div className="not-found">Tools not found</div>;
  }

  // Determine winner based on rating and price
  const determineWinner = () => {
    const scoreA = (toolA.rating * 10) - (toolA.pricing.starter * 0.1);
    const scoreB = (toolB.rating * 10) - (toolB.pricing.starter * 0.1);
    return scoreA > scoreB ? toolA : toolB;
  };

  const winner = determineWinner();
  const loser = winner === toolA ? toolB : toolA;

  return (
    <>
      <Head>
        <title>{toolA.name} vs {toolB.name} - AI Tool Comparison | SiteOptz.ai</title>
        <meta 
          name="description" 
          content={`Compare ${toolA.name} and ${toolB.name} side by side. Features, pricing, pros & cons.`} 
        />
      </Head>

      <div className="comparison-page">
        {/* Header */}
        <header className="comparison-header">
          <div className="container">
            <h1>{toolA.name} vs {toolB.name}</h1>
            <p>Comprehensive comparison to help you choose the right tool</p>
            
            <div className="tools-overview">
              <div className="tool-summary">
                <h2>{toolA.name}</h2>
                <div className="rating">⭐ {toolA.rating}/5</div>
                <p>{toolA.description}</p>
                <div className="price">From ${toolA.pricing.starter}/mo</div>
                <a href={toolA.website} className="btn" target="_blank">Visit Website</a>
              </div>
              
              <div className="vs-divider">VS</div>
              
              <div className="tool-summary">
                <h2>{toolB.name}</h2>
                <div className="rating">⭐ {toolB.rating}/5</div>
                <p>{toolB.description}</p>
                <div className="price">From ${toolB.pricing.starter}/mo</div>
                <a href={toolB.website} className="btn" target="_blank">Visit Website</a>
              </div>
            </div>
          </div>
        </header>

        {/* Quick Verdict */}
        <section className="quick-verdict">
          <div className="container">
            <h2>Quick Verdict</h2>
            <div className="verdict-box">
              <div className="winner-announcement">
                <h3>🏆 Winner: {winner.name}</h3>
                <p>
                  Based on our analysis, {winner.name} offers better overall value with 
                  its {winner.rating > loser.rating ? 'higher rating' : 'competitive pricing'} 
                  and comprehensive feature set.
                </p>
              </div>
              
              <div className="verdict-details">
                <div className="choose-tool">
                  <h4>Choose {toolA.name} if you:</h4>
                  <ul>
                    {toolA.pros.slice(0, 3).map((pro, idx) => (
                      <li key={idx}>Value {pro.toLowerCase()}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="choose-tool">
                  <h4>Choose {toolB.name} if you:</h4>
                  <ul>
                    {toolB.pros.slice(0, 3).map((pro, idx) => (
                      <li key={idx}>Value {pro.toLowerCase()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="comparison-table-section">
          <div className="container">
            <h2>Feature-by-Feature Comparison</h2>
            <ComparisonTable 
              tools={[toolA, toolB]}
              features={[
                { key: 'company', name: 'Company' },
                { key: 'founded', name: 'Founded' },
                { key: 'users', name: 'User Base' },
                { key: 'rating', name: 'Rating' },
                { key: 'pricing', name: 'Pricing' },
                { key: 'features', name: 'Key Features' },
                { key: 'api', name: 'API Available' },
                { key: 'integrations', name: 'Integrations' }
              ]}
            />
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="pricing-comparison">
          <div className="container">
            <h2>Pricing Comparison</h2>
            <div className="pricing-grid">
              <div className="tool-pricing">
                <h3>{toolA.name}</h3>
                <div className="pricing-tiers">
                  {toolA.pricing.free && (
                    <div className="tier">
                      <span className="tier-name">Free</span>
                      <span className="tier-price">$0</span>
                    </div>
                  )}
                  <div className="tier">
                    <span className="tier-name">Starter</span>
                    <span className="tier-price">${toolA.pricing.starter}/mo</span>
                  </div>
                  <div className="tier">
                    <span className="tier-name">Pro</span>
                    <span className="tier-price">${toolA.pricing.pro}/mo</span>
                  </div>
                  <div className="tier">
                    <span className="tier-name">Enterprise</span>
                    <span className="tier-price">{toolA.pricing.enterprise}</span>
                  </div>
                </div>
              </div>
              
              <div className="tool-pricing">
                <h3>{toolB.name}</h3>
                <div className="pricing-tiers">
                  {toolB.pricing.free && (
                    <div className="tier">
                      <span className="tier-name">Free</span>
                      <span className="tier-price">$0</span>
                    </div>
                  )}
                  <div className="tier">
                    <span className="tier-name">Starter</span>
                    <span className="tier-price">${toolB.pricing.starter}/mo</span>
                  </div>
                  <div className="tier">
                    <span className="tier-name">Pro</span>
                    <span className="tier-price">${toolB.pricing.pro}/mo</span>
                  </div>
                  <div className="tier">
                    <span className="tier-name">Enterprise</span>
                    <span className="tier-price">{toolB.pricing.enterprise}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="pros-cons-comparison">
          <div className="container">
            <h2>Pros and Cons</h2>
            <div className="pros-cons-grid">
              <div className="tool-pros-cons">
                <h3>{toolA.name}</h3>
                <div className="pros">
                  <h4>✅ Pros</h4>
                  <ul>
                    {toolA.pros.map((pro, idx) => (
                      <li key={idx}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Cons</h4>
                  <ul>
                    {toolA.cons.map((con, idx) => (
                      <li key={idx}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="tool-pros-cons">
                <h3>{toolB.name}</h3>
                <div className="pros">
                  <h4>✅ Pros</h4>
                  <ul>
                    {toolB.pros.map((pro, idx) => (
                      <li key={idx}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Cons</h4>
                  <ul>
                    {toolB.cons.map((con, idx) => (
                      <li key={idx}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="integrations-comparison">
          <div className="container">
            <h2>Integrations</h2>
            <div className="integrations-grid">
              <div className="tool-integrations">
                <h3>{toolA.name}</h3>
                <div className="integration-list">
                  {toolA.integrations.map((integration, idx) => (
                    <span key={idx} className="integration-badge">
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="tool-integrations">
                <h3>{toolB.name}</h3>
                <div className="integration-list">
                  {toolB.integrations.map((integration, idx) => (
                    <span key={idx} className="integration-badge">
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Recommendation */}
        <section className="final-recommendation">
          <div className="container">
            <h2>Our Recommendation</h2>
            <div className="recommendation-box">
              <h3>Bottom Line</h3>
              <p>
                Both {toolA.name} and {toolB.name} are excellent tools in the {toolA.category} space. 
                {winner.name} edges out as our top pick due to its {winner === toolA ? 
                  `${toolA.rating > toolB.rating ? 'superior rating' : 'better value'}` :
                  `${toolB.rating > toolA.rating ? 'superior rating' : 'better value'}`
                } and comprehensive feature set.
              </p>
              
              <p>
                However, {loser.name} remains a strong choice, particularly for users who 
                prioritize {loser.pros[0].toLowerCase()} and {loser.pros[1].toLowerCase()}.
              </p>
              
              <div className="action-buttons">
                <a href={winner.website} className="btn btn-primary" target="_blank">
                  Try {winner.name} →
                </a>
                <a href={loser.website} className="btn btn-secondary" target="_blank">
                  Try {loser.name} →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Comparisons */}
        <section className="related-comparisons">
          <div className="container">
            <h2>Related Comparisons</h2>
            <div className="comparisons-grid">
              {toolData.tools
                .filter(t => 
                  t.category === toolA.category && 
                  t.id !== toolA.id && 
                  t.id !== toolB.id
                )
                .slice(0, 3)
                .map(relatedTool => (
                  <a 
                    key={relatedTool.id}
                    href={`/compare/${toolA.id}-vs-${relatedTool.id}`}
                    className="comparison-link"
                  >
                    {toolA.name} vs {relatedTool.name}
                  </a>
                ))
              }
            </div>
          </div>
        </section>
      </div>
    </>
  );
}