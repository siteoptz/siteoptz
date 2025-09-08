import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function RecruitmentROICalculator() {
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
      industry: 'HR & Recruitment',
      savings: '$200K annual savings',
      timeframe: '6 months'
    },
    {
      company: 'Innovation Inc',
      industry: 'HR & Recruitment',
      savings: '30% efficiency improvement',
      timeframe: '4 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="Recruitment AI ROI Calculator"
      description="Calculate the return on investment for AI recruitment tools. Estimate time savings, cost reductions, and hiring efficiency improvements."
      category="HR & Recruitment"
      canonicalPath="/tools/recruitment-roi-calculator"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}