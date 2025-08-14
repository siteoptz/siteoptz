/**
 * Interactive Comparison Table Component
 * Renders a dynamic comparison table for AI tools
 */

import React, { useState, useEffect } from 'react';

const ComparisonTable = ({ tools = [], features = [] }) => {
  const [selectedTools, setSelectedTools] = useState([]);
  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  // Sort tools based on selected criteria
  const sortedTools = [...tools].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return (a.pricing.starter || 0) - (b.pricing.starter || 0);
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Toggle tool selection
  const toggleTool = (toolId) => {
    setSelectedTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  // Check if values differ across tools
  const isDifferent = (feature, tools) => {
    if (!highlightDifferences || tools.length < 2) return false;
    const values = tools.map(tool => tool[feature]);
    return new Set(values).size > 1;
  };

  return (
    <div className="comparison-table-container">
      {/* Controls */}
      <div className="table-controls">
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={highlightDifferences}
              onChange={(e) => setHighlightDifferences(e.target.checked)}
            />
            Highlight Differences
          </label>
        </div>
        
        <div className="control-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="feature-column">Feature</th>
              {sortedTools.map(tool => (
                <th key={tool.id} className="tool-column">
                  <div className="tool-header">
                    <input
                      type="checkbox"
                      checked={selectedTools.includes(tool.id)}
                      onChange={() => toggleTool(tool.id)}
                    />
                    <img 
                      src={`/images/tools/${tool.id}.png`} 
                      alt={tool.name}
                      className="tool-logo"
                    />
                    <h3>{tool.name}</h3>
                    <div className="tool-rating">
                      ⭐ {tool.rating}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {/* Pricing Row */}
            <tr className={isDifferent('pricing', sortedTools) ? 'highlight-diff' : ''}>
              <td className="feature-name">Pricing</td>
              {sortedTools.map(tool => (
                <td key={tool.id}>
                  <div className="pricing-info">
                    {tool.pricing.free && <span className="badge free">Free Tier</span>}
                    {tool.pricing.starter && (
                      <div className="price">${tool.pricing.starter}/mo</div>
                    )}
                  </div>
                </td>
              ))}
            </tr>

            {/* Features Rows */}
            {features.map(feature => (
              <tr key={feature.key} className={isDifferent(feature.key, sortedTools) ? 'highlight-diff' : ''}>
                <td className="feature-name">{feature.name}</td>
                {sortedTools.map(tool => (
                  <td key={tool.id}>
                    {renderFeatureValue(tool, feature)}
                  </td>
                ))}
              </tr>
            ))}

            {/* Pros Row */}
            <tr>
              <td className="feature-name">Pros</td>
              {sortedTools.map(tool => (
                <td key={tool.id}>
                  <ul className="pros-list">
                    {tool.pros.slice(0, 3).map((pro, idx) => (
                      <li key={idx}>{pro}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Cons Row */}
            <tr>
              <td className="feature-name">Cons</td>
              {sortedTools.map(tool => (
                <td key={tool.id}>
                  <ul className="cons-list">
                    {tool.cons.slice(0, 3).map((con, idx) => (
                      <li key={idx}>{con}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr>
              <td className="feature-name">Action</td>
              {sortedTools.map(tool => (
                <td key={tool.id}>
                  <div className="action-buttons">
                    <a 
                      href={`/tools/${tool.id}`} 
                      className="btn btn-primary"
                    >
                      View Details
                    </a>
                    <a 
                      href={tool.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      Visit Website
                    </a>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Export Options */}
      <div className="export-options">
        <button onClick={() => exportToCSV(sortedTools, features)}>
          Export to CSV
        </button>
        <button onClick={() => window.print()}>
          Print Table
        </button>
      </div>
    </div>
  );
};

// Helper function to render feature values
const renderFeatureValue = (tool, feature) => {
  const value = tool[feature.key];
  
  if (typeof value === 'boolean') {
    return value ? '✅' : '❌';
  }
  
  if (Array.isArray(value)) {
    return (
      <ul className="feature-list">
        {value.slice(0, 3).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    );
  }
  
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value);
  }
  
  return value || '-';
};

// Export to CSV function
const exportToCSV = (tools, features) => {
  const headers = ['Feature', ...tools.map(t => t.name)];
  const rows = features.map(feature => [
    feature.name,
    ...tools.map(tool => {
      const value = tool[feature.key];
      return Array.isArray(value) ? value.join('; ') : value;
    })
  ]);
  
  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ai-tools-comparison.csv';
  a.click();
};

export default ComparisonTable;