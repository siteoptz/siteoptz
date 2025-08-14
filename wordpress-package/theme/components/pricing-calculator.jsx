/**
 * Pricing Calculator Component
 * Interactive calculator for AI tool ROI and pricing comparison
 */

import React, { useState, useEffect } from 'react';

const PricingCalculator = ({ tools = [] }) => {
  const [teamSize, setTeamSize] = useState(5);
  const [usageHours, setUsageHours] = useState(20);
  const [taskType, setTaskType] = useState('content');
  const [budget, setBudget] = useState(500);
  const [results, setResults] = useState(null);

  // Task productivity multipliers
  const taskMultipliers = {
    content: { time: 3.5, quality: 1.3 },
    coding: { time: 2.8, quality: 1.2 },
    design: { time: 4.0, quality: 1.4 },
    analysis: { time: 2.5, quality: 1.5 },
    support: { time: 3.0, quality: 1.2 }
  };

  // Calculate ROI for each tool
  const calculateROI = () => {
    const hourlyRate = 50; // Average hourly rate
    const multiplier = taskMultipliers[taskType];
    
    const toolResults = tools.map(tool => {
      // Calculate monthly cost
      const monthlyCost = tool.pricing.starter * teamSize;
      
      // Calculate time saved
      const timeSaved = usageHours * multiplier.time;
      const moneySaved = timeSaved * hourlyRate * teamSize;
      
      // Calculate ROI
      const roi = ((moneySaved - monthlyCost) / monthlyCost) * 100;
      const paybackPeriod = monthlyCost / (moneySaved / 30); // in days
      
      // Quality improvement value
      const qualityValue = (multiplier.quality - 1) * moneySaved * 0.5;
      
      return {
        tool: tool.name,
        monthlyCost,
        timeSaved,
        moneySaved,
        qualityValue,
        totalValue: moneySaved + qualityValue,
        roi: Math.round(roi),
        paybackPeriod: Math.round(paybackPeriod),
        withinBudget: monthlyCost <= budget
      };
    });

    // Sort by ROI
    toolResults.sort((a, b) => b.roi - a.roi);
    
    setResults(toolResults);
  };

  // Calculate on input change
  useEffect(() => {
    if (tools.length > 0) {
      calculateROI();
    }
  }, [teamSize, usageHours, taskType, budget, tools]);

  return (
    <div className="pricing-calculator">
      <div className="calculator-header">
        <h2>AI Tool ROI Calculator</h2>
        <p>Calculate the potential return on investment for your team</p>
      </div>

      <div className="calculator-inputs">
        {/* Team Size Input */}
        <div className="input-group">
          <label htmlFor="team-size">
            Team Size
            <span className="help-text">Number of team members using the tool</span>
          </label>
          <div className="input-wrapper">
            <input
              type="range"
              id="team-size"
              min="1"
              max="100"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value))}
            />
            <span className="input-value">{teamSize} users</span>
          </div>
        </div>

        {/* Usage Hours Input */}
        <div className="input-group">
          <label htmlFor="usage-hours">
            Weekly Usage Hours
            <span className="help-text">Hours per week each member will use AI tools</span>
          </label>
          <div className="input-wrapper">
            <input
              type="range"
              id="usage-hours"
              min="1"
              max="40"
              value={usageHours}
              onChange={(e) => setUsageHours(parseInt(e.target.value))}
            />
            <span className="input-value">{usageHours} hrs/week</span>
          </div>
        </div>

        {/* Task Type Selection */}
        <div className="input-group">
          <label htmlFor="task-type">
            Primary Task Type
            <span className="help-text">Main use case for AI tools</span>
          </label>
          <select
            id="task-type"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
          >
            <option value="content">Content Creation</option>
            <option value="coding">Software Development</option>
            <option value="design">Design & Creative</option>
            <option value="analysis">Data Analysis</option>
            <option value="support">Customer Support</option>
          </select>
        </div>

        {/* Budget Input */}
        <div className="input-group">
          <label htmlFor="budget">
            Monthly Budget
            <span className="help-text">Maximum monthly spend on AI tools</span>
          </label>
          <div className="input-wrapper">
            <span className="currency">$</span>
            <input
              type="number"
              id="budget"
              min="0"
              max="10000"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
            />
            <span className="period">/month</span>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="calculator-results">
          <h3>Recommended Tools & ROI Analysis</h3>
          
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-icon">💰</div>
              <div className="card-content">
                <span className="card-label">Best ROI</span>
                <span className="card-value">{results[0]?.tool}</span>
                <span className="card-detail">{results[0]?.roi}% ROI</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="card-icon">⏱️</div>
              <div className="card-content">
                <span className="card-label">Time Saved</span>
                <span className="card-value">
                  {Math.round(results[0]?.timeSaved * 4)} hrs/mo
                </span>
                <span className="card-detail">Per team member</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="card-icon">📈</div>
              <div className="card-content">
                <span className="card-label">Value Created</span>
                <span className="card-value">
                  ${Math.round(results[0]?.totalValue).toLocaleString()}
                </span>
                <span className="card-detail">Monthly value</span>
              </div>
            </div>
          </div>

          {/* Detailed Results Table */}
          <div className="results-table">
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Monthly Cost</th>
                  <th>Time Saved</th>
                  <th>Value Created</th>
                  <th>ROI</th>
                  <th>Payback</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, idx) => (
                  <tr key={idx} className={result.withinBudget ? '' : 'over-budget'}>
                    <td className="tool-name">{result.tool}</td>
                    <td>${result.monthlyCost}</td>
                    <td>{Math.round(result.timeSaved * 4)} hrs/mo</td>
                    <td>${Math.round(result.totalValue).toLocaleString()}</td>
                    <td className={`roi ${result.roi > 100 ? 'positive' : 'negative'}`}>
                      {result.roi}%
                    </td>
                    <td>{result.paybackPeriod} days</td>
                    <td>
                      {result.withinBudget ? (
                        result.roi > 200 ? (
                          <span className="badge excellent">Excellent</span>
                        ) : result.roi > 100 ? (
                          <span className="badge good">Good</span>
                        ) : (
                          <span className="badge fair">Fair</span>
                        )
                      ) : (
                        <span className="badge over">Over Budget</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visualization */}
          <div className="roi-chart">
            <h4>ROI Comparison</h4>
            <div className="chart-container">
              {results.slice(0, 5).map((result, idx) => (
                <div key={idx} className="chart-bar">
                  <div 
                    className="bar" 
                    style={{ 
                      height: `${Math.min(result.roi, 300)}px`,
                      background: result.roi > 100 ? '#10b981' : '#f59e0b'
                    }}
                  >
                    <span className="bar-value">{result.roi}%</span>
                  </div>
                  <span className="bar-label">{result.tool}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="calculator-insights">
            <h4>Key Insights</h4>
            <ul>
              <li>
                <strong>Top Recommendation:</strong> {results[0]?.tool} offers the best ROI 
                at {results[0]?.roi}% with a payback period of {results[0]?.paybackPeriod} days.
              </li>
              <li>
                <strong>Time Savings:</strong> Your team could save approximately {' '}
                {Math.round(results[0]?.timeSaved * teamSize * 4)} hours per month.
              </li>
              <li>
                <strong>Budget Fit:</strong> {' '}
                {results.filter(r => r.withinBudget).length} out of {results.length} tools 
                fit within your budget of ${budget}/month.
              </li>
              <li>
                <strong>Break-even:</strong> Most tools will pay for themselves within {' '}
                {Math.round(results.reduce((acc, r) => acc + r.paybackPeriod, 0) / results.length)} days 
                on average.
              </li>
            </ul>
          </div>

          {/* Export Options */}
          <div className="export-section">
            <button onClick={() => exportResults(results)}>
              📊 Export Report
            </button>
            <button onClick={() => shareResults(results)}>
              🔗 Share Results
            </button>
            <button onClick={() => window.print()}>
              🖨️ Print Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export results function
const exportResults = (results) => {
  const data = {
    timestamp: new Date().toISOString(),
    results: results,
    settings: {
      teamSize,
      usageHours,
      taskType,
      budget
    }
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ai-tools-roi-analysis.json';
  a.click();
};

// Share results function
const shareResults = (results) => {
  const text = `AI Tools ROI Analysis: ${results[0]?.tool} offers ${results[0]?.roi}% ROI`;
  const url = window.location.href;
  
  if (navigator.share) {
    navigator.share({
      title: 'AI Tools ROI Analysis',
      text: text,
      url: url
    });
  } else {
    // Fallback to clipboard
    navigator.clipboard.writeText(`${text} - ${url}`);
    alert('Results copied to clipboard!');
  }
};

export default PricingCalculator;