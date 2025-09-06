import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function NoCodeAiRoi() {
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
      title="No-Code AI ROI Calculator"
      description="Calculate the return on investment for no-code AI platforms. Estimate development time savings, reduced technical debt, and faster time-to-market."
      category="AI Business Solutions"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}