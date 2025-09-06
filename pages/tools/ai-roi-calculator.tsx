import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function AIROICalculator() {
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
      id: 'hoursPerWeek',
      label: 'Hours Spent on Automatable Tasks per Employee per Week',
      type: 'number' as const,
      placeholder: '10',
      suffix: 'hrs',
      defaultValue: 10
    },
    {
      id: 'automationPercentage',
      label: 'Percentage of Tasks AI Can Automate',
      type: 'select' as const,
      options: [
        { value: '0.3', label: '30% - Basic Automation' },
        { value: '0.5', label: '50% - Moderate Automation' },
        { value: '0.7', label: '70% - Advanced Automation' },
        { value: '0.9', label: '90% - Comprehensive Automation' }
      ],
      defaultValue: 0.5
    },
    {
      id: 'aiImplementationCost',
      label: 'Annual AI Implementation Cost',
      type: 'number' as const,
      placeholder: '50000',
      prefix: '$',
      defaultValue: 50000
    }
  ];

  const calculations = [
    {
      id: 'annualLaborCost',
      label: 'Annual Labor Cost for Automatable Tasks',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, hoursPerWeek } = values;
        return (employees * avgSalary * (hoursPerWeek / 40)) || 0;
      },
      format: 'currency' as const,
      description: 'Total cost of employee time spent on tasks that could be automated'
    },
    {
      id: 'potentialSavings',
      label: 'Potential Annual Savings',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, hoursPerWeek, automationPercentage } = values;
        const laborCost = employees * avgSalary * (hoursPerWeek / 40);
        return (laborCost * automationPercentage) || 0;
      },
      format: 'currency' as const,
      description: 'Amount you could save annually by automating tasks with AI'
    },
    {
      id: 'netROI',
      label: 'Net Annual ROI',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, hoursPerWeek, automationPercentage, aiImplementationCost } = values;
        const laborCost = employees * avgSalary * (hoursPerWeek / 40);
        const savings = laborCost * automationPercentage;
        return (savings - aiImplementationCost) || 0;
      },
      format: 'currency' as const,
      description: 'Your net return on investment after implementation costs'
    },
    {
      id: 'roiPercentage',
      label: 'ROI Percentage',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, hoursPerWeek, automationPercentage, aiImplementationCost } = values;
        const laborCost = employees * avgSalary * (hoursPerWeek / 40);
        const savings = laborCost * automationPercentage;
        const netROI = savings - aiImplementationCost;
        return aiImplementationCost > 0 ? (netROI / aiImplementationCost) * 100 : 0;
      },
      format: 'percentage' as const,
      description: 'Return on investment as a percentage'
    },
    {
      id: 'paybackPeriod',
      label: 'Payback Period',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, hoursPerWeek, automationPercentage, aiImplementationCost } = values;
        const laborCost = employees * avgSalary * (hoursPerWeek / 40);
        const monthlySavings = (laborCost * automationPercentage) / 12;
        return monthlySavings > 0 ? aiImplementationCost / monthlySavings : 0;
      },
      format: 'months' as const,
      description: 'Time it takes to recover your investment'
    }
  ];

  const benefits = [
    'Reduce manual work by up to 70%',
    'Increase employee productivity and satisfaction',
    'Lower operational costs significantly',
    'Scale operations without proportional hiring',
    'Improve accuracy and reduce errors',
    'Free up staff for strategic initiatives'
  ];

  const caseStudies = [
    {
      company: 'TechCorp',
      industry: 'Software Development',
      savings: '$500K annually',
      timeframe: '18 months'
    },
    {
      company: 'Global Manufacturing',
      industry: 'Manufacturing',
      savings: '$1.2M annually',
      timeframe: '12 months'
    },
    {
      company: 'Financial Services Inc',
      industry: 'Finance',
      savings: '$800K annually',
      timeframe: '9 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="AI ROI Calculator"
      description="Calculate the return on investment for implementing AI solutions in your business. Get precise estimates of cost savings, productivity gains, and payback periods."
      category="AI Business Solutions"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}