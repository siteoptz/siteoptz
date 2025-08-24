import React from 'react';
import Head from 'next/head';
import { 
  CheckCircle,
  TrendingUp,
  Users,
  Target,
  Award,
  BarChart3,
  Clock,
  DollarSign,
  Zap,
  Shield,
  ArrowRight
} from 'lucide-react';

export default function AIImplementationPlaybookPDF() {
  const tableOfContents = [
    { section: "1", title: "Executive Summary", page: "3" },
    { section: "2", title: "AI Implementation Strategy", page: "5" },
    { section: "3", title: "Technology Assessment Framework", page: "8" },
    { section: "4", title: "ROI Calculation & Measurement", page: "12" },
    { section: "5", title: "Implementation Roadmap", page: "16" },
    { section: "6", title: "Team Training & Change Management", page: "22" },
    { section: "7", title: "Risk Assessment & Mitigation", page: "28" },
    { section: "8", title: "Vendor Selection Criteria", page: "32" },
    { section: "9", title: "Implementation Best Practices", page: "36" },
    { section: "10", title: "Success Metrics & KPIs", page: "42" },
    { section: "11", title: "Case Studies & Examples", page: "46" },
    { section: "12", title: "Templates & Worksheets", page: "50" }
  ];

  const keyBenefits = [
    "Reduce implementation time by 60%",
    "Increase success rate by 95%",
    "Minimize risks and avoid costly mistakes",
    "Achieve measurable ROI within 3-6 months",
    "Build organizational AI competency",
    "Establish scalable AI processes"
  ];

  const implementationPhases = [
    {
      phase: "Phase 1: Assessment",
      duration: "2-4 weeks",
      activities: [
        "Current state analysis",
        "Business requirements gathering",
        "Technology readiness assessment",
        "Resource allocation planning"
      ]
    },
    {
      phase: "Phase 2: Planning",
      duration: "3-6 weeks", 
      activities: [
        "AI strategy development",
        "Tool selection and vendor evaluation",
        "Implementation roadmap creation",
        "Budget and timeline finalization"
      ]
    },
    {
      phase: "Phase 3: Implementation",
      duration: "8-16 weeks",
      activities: [
        "Pilot program execution",
        "System integration and setup",
        "Team training and onboarding",
        "Process optimization"
      ]
    },
    {
      phase: "Phase 4: Optimization",
      duration: "Ongoing",
      activities: [
        "Performance monitoring",
        "Continuous improvement",
        "Scaling and expansion",
        "ROI measurement and reporting"
      ]
    }
  ];

  const roiCalculation = {
    costs: [
      { item: "AI Software Licensing", amount: "$50,000", type: "Annual" },
      { item: "Implementation Services", amount: "$75,000", type: "One-time" },
      { item: "Training & Change Management", amount: "$25,000", type: "One-time" },
      { item: "Integration & Setup", amount: "$40,000", type: "One-time" },
      { item: "Ongoing Maintenance", amount: "$30,000", type: "Annual" }
    ],
    benefits: [
      { item: "Process Automation Savings", amount: "$200,000", type: "Annual" },
      { item: "Productivity Improvements", amount: "$150,000", type: "Annual" },
      { item: "Error Reduction Savings", amount: "$80,000", type: "Annual" },
      { item: "Customer Satisfaction Impact", amount: "$100,000", type: "Annual" }
    ]
  };

  return (
    <>
      <Head>
        <title>AI Implementation Playbook - SiteOptz</title>
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
          
          .playbook-container {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            background: white;
          }
          
          .header {
            border-bottom: 3px solid #0ea5e9;
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
            color: #1e40af;
            margin-bottom: 0.5rem;
          }
          
          h2 {
            font-size: 1.875rem;
            font-weight: 700;
            color: #1e40af;
            margin-top: 2rem;
            margin-bottom: 1rem;
            border-left: 4px solid #0ea5e9;
            padding-left: 1rem;
          }
          
          h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #374151;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          
          .toc-item {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 0;
            border-bottom: 1px dotted #d1d5db;
          }
          
          .phase-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }
          
          .phase-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 1rem;
          }
          
          .phase-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e40af;
          }
          
          .phase-duration {
            background: #dbeafe;
            color: #1e40af;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
          }
          
          .benefit-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.75rem;
          }
          
          .checkmark {
            width: 1.25rem;
            height: 1.25rem;
            background: #10b981;
            border-radius: 50%;
            margin-right: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .roi-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
          }
          
          .roi-table th,
          .roi-table td {
            border: 1px solid #d1d5db;
            padding: 0.75rem;
            text-align: left;
          }
          
          .roi-table th {
            background: #f3f4f6;
            font-weight: 600;
          }
          
          .cost-row { background: #fef2f2; }
          .benefit-row { background: #f0fdf4; }
          
          .highlight-box {
            background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
            border: 1px solid #3b82f6;
            border-radius: 0.75rem;
            padding: 2rem;
            margin: 2rem 0;
          }
          
          .logo {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
          }
          
          .tagline {
            color: #6b7280;
            font-size: 0.875rem;
            font-weight: 500;
          }
        `}</style>
      </Head>

      <div className="playbook-container">
        {/* Cover Page */}
        <div className="text-center">
          <div className="header">
            <div className="logo">SiteOptz</div>
            <div className="tagline">Turning AI Into ROI</div>
          </div>
          
          <h1 style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            The Complete AI Implementation Playbook
          </h1>
          
          <div style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '3rem' }}>
            A Comprehensive 50-Page Guide to Successful AI Implementation
          </div>
          
          <div className="highlight-box">
            <h3 style={{ marginTop: 0, color: '#1e40af', textAlign: 'center' }}>
              What You&apos;ll Learn
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="checkmark">
                    <span style={{ color: 'white', fontSize: '0.75rem' }}>✓</span>
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ marginTop: '4rem', padding: '2rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
            <h3 style={{ marginTop: 0, color: '#374151' }}>Proven Results</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>95%</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Success Rate</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#3b82f6' }}>60%</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Faster Implementation</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#8b5cf6' }}>10x</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Average ROI</div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-break"></div>

        {/* Table of Contents */}
        <h2>Table of Contents</h2>
        <div style={{ marginTop: '2rem' }}>
          {tableOfContents.map((item, index) => (
            <div key={index} className="toc-item">
              <span>
                <strong>Section {item.section}:</strong> {item.title}
              </span>
              <span style={{ fontWeight: '600' }}>{item.page}</span>
            </div>
          ))}
        </div>

        <div className="page-break"></div>

        {/* Executive Summary */}
        <h2>1. Executive Summary</h2>
        <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
          Artificial Intelligence is no longer a futuristic concept&mdash;it&apos;s a business imperative. 
          Companies that successfully implement AI solutions achieve significant competitive advantages, 
          including cost reductions, productivity improvements, and enhanced customer experiences.
        </p>

        <div className="highlight-box">
          <h3 style={{ marginTop: 0 }}>Key Implementation Statistics</h3>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li>87% of businesses believe AI will give them competitive advantage</li>
            <li>Companies using AI report 15% increase in productivity</li>
            <li>AI implementations show average ROI of 300% within first year</li>
            <li>62% of businesses plan to increase AI investment in next 12 months</li>
          </ul>
        </div>

        <h3>The Challenge</h3>
        <p>
          Despite the clear benefits, many organizations struggle with AI implementation. Common challenges include:
        </p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Unclear strategy and unrealistic expectations</li>
          <li>Inadequate data quality and infrastructure</li>
          <li>Lack of skilled personnel and training</li>
          <li>Poor change management and user adoption</li>
          <li>Insufficient measurement and optimization</li>
        </ul>

        <h3>The Solution</h3>
        <p>
          This playbook provides a proven framework for successful AI implementation, based on best practices 
          from over 500 successful projects across various industries. Our systematic approach addresses each 
          challenge with practical solutions, templates, and real-world examples.
        </p>

        <div className="page-break"></div>

        {/* Implementation Phases */}
        <h2>2. AI Implementation Roadmap</h2>
        <p>
          Our proven 4-phase approach ensures systematic, successful AI implementation while minimizing risks 
          and maximizing ROI. Each phase builds upon the previous one, creating momentum and reducing complexity.
        </p>

        {implementationPhases.map((phase, index) => (
          <div key={index} className="phase-card">
            <div className="phase-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="phase-title">{phase.phase}</div>
              <div className="phase-duration">{phase.duration}</div>
            </div>
            <ul style={{ marginLeft: '1.5rem' }}>
              {phase.activities.map((activity, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>{activity}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="page-break"></div>

        {/* ROI Calculation */}
        <h2>3. ROI Calculation Framework</h2>
        <p>
          Measuring and demonstrating ROI is crucial for AI project success and continued investment. 
          Our framework helps you calculate both hard and soft benefits while accounting for all implementation costs.
        </p>

        <h3>Sample ROI Calculation</h3>
        <table className="roi-table">
          <thead>
            <tr>
              <th>Cost Category</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {roiCalculation.costs.map((cost, index) => (
              <tr key={index} className="cost-row">
                <td>{cost.item}</td>
                <td>{cost.amount}</td>
                <td>{cost.type}</td>
              </tr>
            ))}
            <tr style={{ fontWeight: '600', background: '#fee2e2' }}>
              <td>Total First Year Costs</td>
              <td>$220,000</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <table className="roi-table">
          <thead>
            <tr>
              <th>Benefit Category</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {roiCalculation.benefits.map((benefit, index) => (
              <tr key={index} className="benefit-row">
                <td>{benefit.item}</td>
                <td>{benefit.amount}</td>
                <td>{benefit.type}</td>
              </tr>
            ))}
            <tr style={{ fontWeight: '600', background: '#dcfce7' }}>
              <td>Total Annual Benefits</td>
              <td>$530,000</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <div className="highlight-box">
          <h3 style={{ marginTop: 0, textAlign: 'center' }}>ROI Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>241%</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>First Year ROI</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#3b82f6' }}>4.9</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Months to Break-even</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#8b5cf6' }}>$310K</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Net First Year Benefit</div>
            </div>
          </div>
        </div>

        <div className="page-break"></div>

        {/* Success Metrics */}
        <h2>4. Success Metrics & KPIs</h2>
        <p>
          Establishing the right metrics from the start ensures you can measure progress, 
          demonstrate value, and continuously optimize your AI implementation.
        </p>

        <h3>Implementation Metrics</h3>
        <ul style={{ marginLeft: '2rem' }}>
          <li><strong>Time to Value:</strong> Duration from project start to first measurable benefit</li>
          <li><strong>Adoption Rate:</strong> Percentage of intended users actively using AI tools</li>
          <li><strong>Training Completion:</strong> Percentage of team members completing AI training</li>
          <li><strong>Integration Success:</strong> Number of systems successfully integrated</li>
        </ul>

        <h3>Business Impact Metrics</h3>
        <ul style={{ marginLeft: '2rem' }}>
          <li><strong>Cost Reduction:</strong> Operational cost savings from automation</li>
          <li><strong>Productivity Gains:</strong> Output increase per employee</li>
          <li><strong>Quality Improvements:</strong> Error reduction and accuracy increases</li>
          <li><strong>Customer Satisfaction:</strong> NPS, CSAT, and retention improvements</li>
          <li><strong>Revenue Impact:</strong> New revenue streams and growth acceleration</li>
        </ul>

        <h3>Technical Performance Metrics</h3>
        <ul style={{ marginLeft: '2rem' }}>
          <li><strong>Model Accuracy:</strong> AI model performance benchmarks</li>
          <li><strong>System Reliability:</strong> Uptime and availability metrics</li>
          <li><strong>Processing Speed:</strong> Response time and throughput measures</li>
          <li><strong>Data Quality:</strong> Data accuracy and completeness scores</li>
        </ul>

        <div className="highlight-box">
          <h3 style={{ marginTop: 0 }}>Measurement Best Practices</h3>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li>Establish baseline measurements before implementation</li>
            <li>Set realistic targets based on industry benchmarks</li>
            <li>Implement automated monitoring and reporting</li>
            <li>Review and adjust metrics quarterly</li>
            <li>Communicate results regularly to stakeholders</li>
          </ul>
        </div>

        <div className="footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="logo" style={{ fontSize: '1rem' }}>SiteOptz</div>
              <div className="tagline">Turning AI Into ROI</div>
            </div>
            <div>
              <div style={{ fontWeight: '600' }}>www.siteoptz.ai</div>
              <div>For implementation support: contact@siteoptz.ai</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}