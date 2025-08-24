import React from 'react';
import Head from 'next/head';

export default function AIToolSelectionFrameworkPDF() {
  const evaluationCriteria = [
    {
      category: "Functionality & Features",
      weight: "25%",
      criteria: [
        { item: "Core feature completeness", score: "1-5" },
        { item: "Accuracy and performance", score: "1-5" },
        { item: "Customization capabilities", score: "1-5" },
        { item: "API and integration options", score: "1-5" },
        { item: "Multi-language support", score: "1-5" }
      ]
    },
    {
      category: "Business Alignment",
      weight: "25%",
      criteria: [
        { item: "Industry-specific features", score: "1-5" },
        { item: "Use case alignment", score: "1-5" },
        { item: "Scalability potential", score: "1-5" },
        { item: "Business model fit", score: "1-5" },
        { item: "Strategic value", score: "1-5" }
      ]
    },
    {
      category: "Technical Requirements",
      weight: "20%",
      criteria: [
        { item: "System compatibility", score: "1-5" },
        { item: "Data requirements", score: "1-5" },
        { item: "Security features", score: "1-5" },
        { item: "Performance benchmarks", score: "1-5" },
        { item: "Infrastructure needs", score: "1-5" }
      ]
    },
    {
      category: "Commercial Viability",
      weight: "20%",
      criteria: [
        { item: "Pricing model transparency", score: "1-5" },
        { item: "Total cost of ownership", score: "1-5" },
        { item: "Contract flexibility", score: "1-5" },
        { item: "ROI potential", score: "1-5" },
        { item: "Payment terms", score: "1-5" }
      ]
    },
    {
      category: "Vendor & Support",
      weight: "10%",
      criteria: [
        { item: "Vendor reputation", score: "1-5" },
        { item: "Support quality", score: "1-5" },
        { item: "Training resources", score: "1-5" },
        { item: "Documentation quality", score: "1-5" },
        { item: "Community & ecosystem", score: "1-5" }
      ]
    }
  ];

  const selectionSteps = [
    {
      step: "1",
      title: "Define Requirements",
      description: "Clearly articulate your business needs, technical requirements, and success criteria",
      deliverable: "Requirements specification document"
    },
    {
      step: "2", 
      title: "Market Research",
      description: "Identify potential solutions, gather vendor information, and create initial shortlist",
      deliverable: "Vendor comparison matrix"
    },
    {
      step: "3",
      title: "Detailed Evaluation",
      description: "Score each solution against evaluation criteria using our framework",
      deliverable: "Scored evaluation spreadsheet"
    },
    {
      step: "4",
      title: "Pilot Testing",
      description: "Test top 2-3 solutions with real data and use cases",
      deliverable: "Pilot test results report"
    },
    {
      step: "5",
      title: "Final Decision",
      description: "Make final selection based on evaluation scores, pilot results, and business factors",
      deliverable: "Selection rationale document"
    }
  ];

  const commonMistakes = [
    "Choosing based on features alone without considering business fit",
    "Underestimating integration complexity and costs",
    "Not involving end users in the evaluation process",
    "Focusing only on upfront costs, ignoring total cost of ownership",
    "Skipping pilot testing with real data and use cases",
    "Not considering vendor stability and long-term support",
    "Overlooking security and compliance requirements",
    "Making decisions based on vendor demonstrations alone"
  ];

  const useCaseTemplates = [
    {
      useCase: "Customer Service Chatbot",
      primaryCriteria: ["Natural Language Processing", "Multi-channel Support", "CRM Integration"],
      keyQuestions: [
        "Does it handle complex queries accurately?",
        "Can it escalate to human agents seamlessly?",
        "Does it support your preferred channels?"
      ]
    },
    {
      useCase: "Content Generation",
      primaryCriteria: ["Content Quality", "Brand Voice Training", "SEO Optimization"],
      keyQuestions: [
        "Can it maintain your brand voice consistently?",
        "Does it optimize for search engines?",
        "How well does it handle different content types?"
      ]
    },
    {
      useCase: "Data Analysis & Insights",
      primaryCriteria: ["Data Source Integration", "Visualization", "Automated Reporting"],
      keyQuestions: [
        "Can it connect to your existing data sources?",
        "Are the insights actionable and accurate?",
        "Does it provide automated reporting features?"
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>AI Tool Selection Framework - SiteOptz</title>
        <style>{`
          @media print {
            body { margin: 0; }
            .page-break { page-break-before: always; }
            .no-print { display: none; }
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: white;
          }
          
          .framework-container {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            background: white;
          }
          
          .header {
            border-bottom: 3px solid #10b981;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
          }
          
          .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 1rem;
            margin-top: 2rem;
            text-align: center;
            font-size: 0.875rem;
            color: #6b7280;
          }
          
          h1 {
            font-size: 2.5rem;
            font-weight: 800;
            color: #059669;
            margin-bottom: 0.5rem;
          }
          
          h2 {
            font-size: 1.875rem;
            font-weight: 700;
            color: #059669;
            margin-top: 2rem;
            margin-bottom: 1rem;
            border-left: 4px solid #10b981;
            padding-left: 1rem;
          }
          
          h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #374151;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          
          h4 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #4b5563;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .evaluation-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
          }
          
          .evaluation-table th,
          .evaluation-table td {
            border: 1px solid #d1d5db;
            padding: 0.75rem;
            text-align: left;
            font-size: 0.875rem;
          }
          
          .evaluation-table th {
            background: #f3f4f6;
            font-weight: 600;
          }
          
          .category-header {
            background: #ecfdf5;
            font-weight: 600;
            color: #059669;
          }
          
          .step-card {
            background: #f0fdfa;
            border: 1px solid #a7f3d0;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }
          
          .step-number {
            background: #10b981;
            color: white;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            float: left;
            margin-right: 1rem;
            margin-top: 0.25rem;
          }
          
          .mistake-item {
            background: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          
          .highlight-box {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 1px solid #10b981;
            border-radius: 0.75rem;
            padding: 2rem;
            margin: 2rem 0;
          }
          
          .scoring-guide {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 0.5rem;
            margin: 1rem 0;
          }
          
          .score-box {
            text-align: center;
            padding: 0.75rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.875rem;
          }
          
          .score-5 { background: #dcfce7; color: #166534; }
          .score-4 { background: #fef3c7; color: #92400e; }
          .score-3 { background: #fde68a; color: #78350f; }
          .score-2 { background: #fed7aa; color: #9a3412; }
          .score-1 { background: #fecaca; color: #991b1b; }
          
          .logo {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #10b981, #06d6a0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
          }
          
          .tagline {
            color: #6b7280;
            font-size: 0.875rem;
            font-weight: 500;
          }
          
          .use-case-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }
        `}</style>
      </Head>

      <div className="framework-container">
        {/* Cover Page */}
        <div className="text-center">
          <div className="header">
            <div className="logo">SiteOptz</div>
            <div className="tagline">Turning AI Into ROI</div>
          </div>
          
          <h1 style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            AI Tool Selection Framework
          </h1>
          
          <div style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '3rem' }}>
            A Systematic Approach to Choosing the Right AI Solution
          </div>
          
          <div className="highlight-box">
            <h3 style={{ marginTop: 0, color: '#059669', textAlign: 'center' }}>
              Framework Components
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ marginTop: 0, marginBottom: '0.75rem' }}>Evaluation Tools</h4>
                <ul style={{ marginLeft: '1.5rem', fontSize: '0.875rem' }}>
                  <li>20+ point scoring matrix</li>
                  <li>Weighted evaluation criteria</li>
                  <li>Vendor comparison templates</li>
                  <li>Cost-benefit calculators</li>
                </ul>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ marginTop: 0, marginBottom: '0.75rem' }}>Decision Support</h4>
                <ul style={{ marginLeft: '1.5rem', fontSize: '0.875rem' }}>
                  <li>5-step selection process</li>
                  <li>Pilot testing guidelines</li>
                  <li>Use case templates</li>
                  <li>Common pitfalls to avoid</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '4rem', padding: '2rem', background: '#f0fdfa', borderRadius: '0.75rem', border: '1px solid #a7f3d0' }}>
            <h3 style={{ marginTop: 0, color: '#374151' }}>Proven Results</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>60%</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Faster Selection</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#059669' }}>$200K+</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Average Savings</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#065f46' }}>95%</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Selection Success</div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-break"></div>

        {/* Evaluation Framework */}
        <h2>1. Comprehensive Evaluation Framework</h2>
        <p>
          Our framework evaluates AI tools across five critical dimensions, with weighted scoring 
          to ensure the most important factors drive your decision.
        </p>

        <h3>Scoring Guide</h3>
        <div className="scoring-guide">
          <div className="score-box score-5">5 - Excellent</div>
          <div className="score-box score-4">4 - Good</div>
          <div className="score-box score-3">3 - Average</div>
          <div className="score-box score-2">2 - Poor</div>
          <div className="score-box score-1">1 - Inadequate</div>
        </div>

        {evaluationCriteria.map((category, index) => (
          <div key={index} style={{ marginBottom: '2rem' }}>
            <h4>{category.category} (Weight: {category.weight})</h4>
            <table className="evaluation-table">
              <thead>
                <tr>
                  <th style={{ width: '60%' }}>Evaluation Criteria</th>
                  <th style={{ width: '15%' }}>Score Range</th>
                  <th style={{ width: '25%' }}>Vendor A Score</th>
                </tr>
              </thead>
              <tbody>
                {category.criteria.map((criterion, idx) => (
                  <tr key={idx}>
                    <td>{criterion.item}</td>
                    <td style={{ textAlign: 'center' }}>{criterion.score}</td>
                    <td style={{ background: '#f9fafb', textAlign: 'center' }}>___</td>
                  </tr>
                ))}
                <tr className="category-header">
                  <td><strong>Category Total (out of 25)</strong></td>
                  <td style={{ textAlign: 'center' }}><strong>25</strong></td>
                  <td style={{ textAlign: 'center' }}><strong>___</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}

        <div className="page-break"></div>

        {/* 5-Step Selection Process */}
        <h2>2. Five-Step Selection Process</h2>
        <p>
          Follow this systematic approach to ensure thorough evaluation and confident decision-making.
        </p>

        {selectionSteps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{step.step}</div>
            <div style={{ marginLeft: '3rem' }}>
              <h4 style={{ marginTop: 0, color: '#059669' }}>{step.title}</h4>
              <p style={{ marginBottom: '1rem' }}>{step.description}</p>
              <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}>
                <strong>Deliverable:</strong> {step.deliverable}
              </div>
            </div>
          </div>
        ))}

        <div className="page-break"></div>

        {/* Use Case Templates */}
        <h2>3. Use Case Evaluation Templates</h2>
        <p>
          Common AI implementation scenarios with specific evaluation criteria and key questions to consider.
        </p>

        {useCaseTemplates.map((template, index) => (
          <div key={index} className="use-case-card">
            <h4 style={{ marginTop: 0, color: '#059669' }}>{template.useCase}</h4>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>Primary Evaluation Criteria:</strong>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                {template.primaryCriteria.map((criterion, idx) => (
                  <li key={idx}>{criterion}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong>Key Evaluation Questions:</strong>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                {template.keyQuestions.map((question, idx) => (
                  <li key={idx}>{question}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="page-break"></div>

        {/* Common Mistakes */}
        <h2>4. Common Selection Mistakes to Avoid</h2>
        <p>
          Learn from others&apos; experiences by avoiding these frequent pitfalls in AI tool selection.
        </p>

        {commonMistakes.map((mistake, index) => (
          <div key={index} className="mistake-item">
            <strong>Mistake #{index + 1}:</strong> {mistake}
          </div>
        ))}

        <div className="highlight-box">
          <h3 style={{ marginTop: 0 }}>Success Tips</h3>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li><strong>Start with clear requirements:</strong> Define exactly what you need before looking at solutions</li>
            <li><strong>Involve end users early:</strong> Get input from people who will actually use the tool</li>
            <li><strong>Test with real data:</strong> Use your actual data and use cases in pilot tests</li>
            <li><strong>Consider the total journey:</strong> Think beyond initial implementation to ongoing use</li>
            <li><strong>Plan for change management:</strong> Factor in training and adoption challenges</li>
          </ul>
        </div>

        <div className="page-break"></div>

        {/* ROI Calculator Template */}
        <h2>5. ROI Calculation Template</h2>
        <p>
          Use this framework to calculate and compare the financial impact of different AI tool options.
        </p>

        <h3>Implementation Costs</h3>
        <table className="evaluation-table">
          <thead>
            <tr>
              <th>Cost Category</th>
              <th>Vendor A</th>
              <th>Vendor B</th>
              <th>Vendor C</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Software Licensing (Annual)</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
            </tr>
            <tr>
              <td>Implementation Services</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
            </tr>
            <tr>
              <td>Training & Change Management</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
            </tr>
            <tr>
              <td>Integration & Customization</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
            </tr>
            <tr>
              <td>Ongoing Maintenance & Support</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
            </tr>
            <tr style={{ fontWeight: '600', background: '#fee2e2' }}>
              <td>Total First Year Cost</td>
              <td>$_____</td>
              <td>$_____</td>
              <td>$_____</td>
            </tr>
          </tbody>
        </table>

        <h3>Expected Benefits</h3>
        <table className="evaluation-table">
          <thead>
            <tr>
              <th>Benefit Category</th>
              <th>Vendor A</th>
              <th>Vendor B</th>
              <th>Vendor C</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Process Automation Savings</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
            </tr>
            <tr>
              <td>Productivity Improvements</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
            </tr>
            <tr>
              <td>Error Reduction Savings</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
            </tr>
            <tr>
              <td>Revenue Generation</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
              <td style={{ background: '#f9fafb' }}>$_____</td>
            </tr>
            <tr style={{ fontWeight: '600', background: '#dcfce7' }}>
              <td>Total Annual Benefits</td>
              <td>$_____</td>
              <td>$_____</td>
              <td>$_____</td>
            </tr>
          </tbody>
        </table>

        <div style={{ margin: '2rem 0', padding: '1.5rem', background: '#f0fdfa', border: '1px solid #a7f3d0', borderRadius: '0.5rem' }}>
          <h4 style={{ marginTop: 0, color: '#059669' }}>ROI Calculation Formula</h4>
          <p style={{ marginBottom: '1rem' }}><strong>ROI = (Total Annual Benefits - Total First Year Cost) / Total First Year Cost × 100%</strong></p>
          <p style={{ marginBottom: '0' }}><strong>Payback Period = Total First Year Cost / Total Annual Benefits × 12 months</strong></p>
        </div>

        <div className="footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="logo" style={{ fontSize: '1rem' }}>SiteOptz</div>
              <div className="tagline">Turning AI Into ROI</div>
            </div>
            <div>
              <div style={{ fontWeight: '600' }}>www.siteoptz.ai</div>
              <div>For selection support: contact@siteoptz.ai</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}