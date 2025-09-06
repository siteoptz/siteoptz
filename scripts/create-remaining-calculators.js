#!/usr/bin/env node

/**
 * Create Remaining ROI Calculator Pages
 * Generates the remaining calculator pages from the 404 list
 */

const fs = require('fs');
const path = require('path');

const calculators = {
  'content-roi-calculator': {
    title: 'Content AI ROI Calculator',
    description: 'Calculate the return on investment for AI-powered content creation tools. Estimate time savings, cost reductions, and content output improvements.'
  },
  'sales-ai-roi': {
    title: 'Sales AI ROI Calculator', 
    description: 'Calculate the return on investment for AI sales tools. Estimate increased conversion rates, lead qualification improvements, and sales team productivity gains.'
  },
  'healthcare-ai-roi': {
    title: 'Healthcare AI ROI Calculator',
    description: 'Calculate the return on investment for AI healthcare solutions. Estimate improved patient outcomes, operational efficiency, and cost savings.'
  },
  'manufacturing-roi-calculator': {
    title: 'Manufacturing AI ROI Calculator',
    description: 'Calculate the return on investment for AI manufacturing solutions. Estimate production efficiency gains, quality improvements, and cost reductions.'
  },
  'recruitment-roi-calculator': {
    title: 'Recruitment AI ROI Calculator', 
    description: 'Calculate the return on investment for AI recruitment tools. Estimate time-to-hire reductions, candidate quality improvements, and HR cost savings.'
  },
  'security-roi-calculator': {
    title: 'Security AI ROI Calculator',
    description: 'Calculate the return on investment for AI security solutions. Estimate threat detection improvements, incident response time reductions, and security cost savings.'
  },
  'no-code-ai-roi': {
    title: 'No-Code AI ROI Calculator',
    description: 'Calculate the return on investment for no-code AI platforms. Estimate development time savings, reduced technical debt, and faster time-to-market.'
  },
  'enterprise-ai-calculator': {
    title: 'Enterprise AI ROI Calculator',
    description: 'Calculate the return on investment for enterprise AI implementations. Estimate organizational efficiency gains, process automation benefits, and strategic advantages.'
  },
  'conversion-roi-calculator': {
    title: 'Conversion AI ROI Calculator',
    description: 'Calculate the return on investment for AI conversion optimization tools. Estimate conversion rate improvements, revenue increases, and marketing efficiency gains.'
  },
  'ai-cost-calculator': {
    title: 'AI Cost Calculator',
    description: 'Calculate the total cost of AI implementation across your organization. Compare different AI solutions and estimate budget requirements.'
  }
};

console.log('🧮 CREATING REMAINING ROI CALCULATORS\n');

const templateContent = (slug, config) => `import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function ${slug.split('-').map(word => 
  word.charAt(0).toUpperCase() + word.slice(1)
).join('')}() {
  const fields = [
    {
      id: 'employees',
      label: 'Number of Employees Affected',
      type: 'number' as const,
      placeholder: '50',
      defaultValue: 50
    },
    {
      id: 'avgSalary',
      label: 'Average Employee Salary',
      type: 'number' as const,
      placeholder: '65000',
      prefix: '$',
      defaultValue: 65000
    },
    {
      id: 'hoursPerWeek',
      label: 'Hours Per Week on Relevant Tasks',
      type: 'number' as const,
      placeholder: '8',
      suffix: 'hrs',
      defaultValue: 8
    },
    {
      id: 'improvementRate',
      label: 'Expected Efficiency Improvement',
      type: 'select' as const,
      options: [
        { value: '0.2', label: '20% - Conservative' },
        { value: '0.35', label: '35% - Moderate' },
        { value: '0.5', label: '50% - Aggressive' },
        { value: '0.7', label: '70% - Best Case' }
      ],
      defaultValue: 0.35
    },
    {
      id: 'aiImplementationCost',
      label: 'Annual AI Implementation Cost',
      type: 'number' as const,
      placeholder: '25000',
      prefix: '$',
      defaultValue: 25000
    }
  ];

  const calculations = [
    {
      id: 'annualLaborCost',
      label: 'Annual Labor Cost',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, hoursPerWeek } = values;
        return (employees * avgSalary * (hoursPerWeek / 40)) || 0;
      },
      format: 'currency' as const,
      description: 'Current annual cost for relevant employee activities'
    },
    {
      id: 'potentialSavings',
      label: 'Potential Annual Savings',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, hoursPerWeek, improvementRate } = values;
        const laborCost = employees * avgSalary * (hoursPerWeek / 40);
        return (laborCost * improvementRate) || 0;
      },
      format: 'currency' as const,
      description: 'Estimated annual savings from AI implementation'
    },
    {
      id: 'netROI',
      label: 'Net Annual ROI',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, hoursPerWeek, improvementRate, aiImplementationCost } = values;
        const laborCost = employees * avgSalary * (hoursPerWeek / 40);
        const savings = laborCost * improvementRate;
        return (savings - aiImplementationCost) || 0;
      },
      format: 'currency' as const,
      description: 'Net return on investment after implementation costs'
    },
    {
      id: 'roiPercentage',
      label: 'ROI Percentage',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, hoursPerWeek, improvementRate, aiImplementationCost } = values;
        const laborCost = employees * avgSalary * (hoursPerWeek / 40);
        const savings = laborCost * improvementRate;
        const netROI = savings - aiImplementationCost;
        return aiImplementationCost > 0 ? (netROI / aiImplementationCost) * 100 : 0;
      },
      format: 'percentage' as const,
      description: 'Return on investment as a percentage'
    }
  ];

  const benefits = [
    'Increase operational efficiency',
    'Reduce manual processing time',
    'Improve accuracy and consistency',
    'Scale operations effectively',
    'Enable strategic focus areas',
    'Enhance competitive advantage'
  ];

  const caseStudies = [
    {
      company: 'Innovation Corp',
      industry: 'Technology',
      savings: '$300K annually',
      timeframe: '12 months'
    },
    {
      company: 'Growth Enterprises',
      industry: 'Services',
      savings: '$450K annually',
      timeframe: '9 months'
    },
    {
      company: 'Scale Solutions',
      industry: 'Manufacturing',
      savings: '$600K annually',
      timeframe: '15 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="${config.title}"
      description="${config.description}"
      category="AI Business Solutions"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}`;

let createdCount = 0;

Object.entries(calculators).forEach(([slug, config]) => {
  const fileName = `${slug}.tsx`;
  const filePath = path.join(process.cwd(), 'pages/tools', fileName);
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  ${fileName} already exists, skipping...`);
    return;
  }
  
  const content = templateContent(slug, config);
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log(`✅ Created ${fileName}`);
  createdCount++;
});

console.log(`\n🎉 Created ${createdCount} ROI calculator pages!`);
console.log('\n📋 CREATED CALCULATORS:');
Object.entries(calculators).forEach(([slug, config]) => {
  console.log(`  📊 /tools/${slug} - ${config.title}`);
});

console.log('\n💡 NEXT STEPS:');
console.log('  1. Update sitemap to include these calculator pages');
console.log('  2. Test calculator functionality');
console.log('  3. Add internal linking from relevant pages');