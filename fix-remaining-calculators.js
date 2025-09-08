const fs = require('fs');

const fixFile = (fileName, functionName, title, description, category) => {
  const content = `import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function ${functionName}() {
  const fields = [
    {
      id: 'employees',
      label: 'Number of Employees',
      type: 'number' as const,
      placeholder: '100',
      defaultValue: 100
    },
    {
      id: 'avgSalary',
      label: 'Average Employee Salary',
      type: 'number' as const,
      placeholder: '75000',
      prefix: '$',
      defaultValue: 75000
    },
    {
      id: 'aiToolCost',
      label: 'Monthly AI Tool Cost',
      type: 'number' as const,
      placeholder: '500',
      prefix: '$',
      defaultValue: 500
    }
  ];

  const calculations = [
    {
      id: 'monthlySavings',
      label: 'Monthly Cost Savings',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary } = values;
        const monthlySalary = avgSalary / 12;
        const savings = employees * monthlySalary * 0.2; // 20% efficiency gain
        return savings || 0;
      },
      format: 'currency' as const,
      description: 'Monthly savings from AI automation'
    },
    {
      id: 'netMonthlySavings',
      label: 'Net Monthly Savings',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, aiToolCost } = values;
        const monthlySalary = avgSalary / 12;
        const savings = employees * monthlySalary * 0.2;
        return (savings - aiToolCost) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly savings after AI tool costs'
    },
    {
      id: 'annualROI',
      label: 'Annual Net ROI',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, aiToolCost } = values;
        const monthlySalary = avgSalary / 12;
        const savings = employees * monthlySalary * 0.2;
        const netMonthlySavings = savings - aiToolCost;
        return (netMonthlySavings * 12) || 0;
      },
      format: 'currency' as const,
      description: 'Total annual return on investment'
    }
  ];

  const benefits = [
    'Automate repetitive tasks',
    'Improve operational efficiency',
    'Reduce manual errors',
    'Scale operations effectively',
    'Increase employee productivity',
    'Generate actionable insights'
  ];

  const caseStudies = [
    {
      company: 'Example Corp',
      industry: '${category}',
      savings: '$200K annual savings',
      timeframe: '6 months'
    },
    {
      company: 'Innovation Inc',
      industry: '${category}',
      savings: '30% efficiency improvement',
      timeframe: '4 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="${title}"
      description="${description}"
      category="${category}"
      canonicalPath="/tools/${fileName.replace('.tsx', '')}"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}`;

  fs.writeFileSync(`pages/tools/${fileName}`, content);
  console.log(`Fixed ${fileName}`);
};

// Fix the remaining broken files
fixFile('recruitment-roi-calculator.tsx', 'RecruitmentROICalculator', 'Recruitment AI ROI Calculator', 'Calculate the return on investment for AI recruitment tools. Estimate time savings, cost reductions, and hiring efficiency improvements.', 'HR & Recruitment');

fixFile('security-roi-calculator.tsx', 'SecurityROICalculator', 'Security AI ROI Calculator', 'Calculate the return on investment for AI security solutions. Estimate threat detection improvements, cost savings, and risk reduction.', 'Cybersecurity');

fixFile('sales-ai-roi.tsx', 'SalesAIROI', 'Sales AI ROI Calculator', 'Calculate the return on investment for AI sales tools. Estimate lead generation improvements, conversion rate increases, and revenue growth.', 'Sales AI');

console.log('All files fixed!');