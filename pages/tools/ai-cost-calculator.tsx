import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function AICostCalculator() {
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
      id: 'aiToolsNeeded',
      label: 'Number of AI Tools/Services',
      type: 'number' as const,
      placeholder: '3',
      defaultValue: 3
    },
    {
      id: 'avgToolCost',
      label: 'Average Monthly Cost per Tool',
      type: 'number' as const,
      placeholder: '500',
      prefix: '$',
      defaultValue: 500
    },
    {
      id: 'implementationHours',
      label: 'Implementation Hours Required',
      type: 'number' as const,
      placeholder: '200',
      suffix: 'hrs',
      defaultValue: 200
    },
    {
      id: 'trainingHours',
      label: 'Training Hours per Employee',
      type: 'number' as const,
      placeholder: '10',
      suffix: 'hrs',
      defaultValue: 10
    }
  ];

  const calculations = [
    {
      id: 'monthlyToolCosts',
      label: 'Monthly AI Tool Costs',
      formula: (values: Record<string, number>) => {
        const { aiToolsNeeded, avgToolCost } = values;
        return (aiToolsNeeded * avgToolCost) || 0;
      },
      format: 'currency' as const,
      description: 'Total monthly subscription costs for AI tools'
    },
    {
      id: 'annualToolCosts',
      label: 'Annual AI Tool Costs',
      formula: (values: Record<string, number>) => {
        const { aiToolsNeeded, avgToolCost } = values;
        return (aiToolsNeeded * avgToolCost * 12) || 0;
      },
      format: 'currency' as const,
      description: 'Total yearly subscription costs for AI tools'
    },
    {
      id: 'implementationCost',
      label: 'One-time Implementation Cost',
      formula: (values: Record<string, number>) => {
        const { implementationHours, avgSalary } = values;
        const hourlyRate = avgSalary / 2080; // Annual salary to hourly
        return (implementationHours * hourlyRate) || 0;
      },
      format: 'currency' as const,
      description: 'Cost of time spent on implementation and setup'
    },
    {
      id: 'trainingCost',
      label: 'Employee Training Cost',
      formula: (values: Record<string, number>) => {
        const { employees, trainingHours, avgSalary } = values;
        const hourlyRate = avgSalary / 2080;
        return (employees * trainingHours * hourlyRate) || 0;
      },
      format: 'currency' as const,
      description: 'Cost of training all employees on AI tools'
    },
    {
      id: 'firstYearTotal',
      label: 'First Year Total Cost',
      formula: (values: Record<string, number>) => {
        const { aiToolsNeeded, avgToolCost, implementationHours, avgSalary, employees, trainingHours } = values;
        const annualTools = aiToolsNeeded * avgToolCost * 12;
        const implementation = implementationHours * (avgSalary / 2080);
        const training = employees * trainingHours * (avgSalary / 2080);
        return (annualTools + implementation + training) || 0;
      },
      format: 'currency' as const,
      description: 'Total cost including tools, implementation, and training'
    },
    {
      id: 'costPerEmployee',
      label: 'Cost Per Employee (First Year)',
      formula: (values: Record<string, number>) => {
        const { aiToolsNeeded, avgToolCost, implementationHours, avgSalary, employees, trainingHours } = values;
        const annualTools = aiToolsNeeded * avgToolCost * 12;
        const implementation = implementationHours * (avgSalary / 2080);
        const training = employees * trainingHours * (avgSalary / 2080);
        const total = annualTools + implementation + training;
        return employees > 0 ? total / employees : 0;
      },
      format: 'currency' as const,
      description: 'AI implementation cost per employee'
    }
  ];

  const benefits = [
    'Comprehensive cost breakdown for budgeting',
    'Include all hidden implementation costs',
    'Plan for training and onboarding expenses',
    'Compare different AI solution scenarios',
    'ROI planning with accurate cost projections',
    'Stakeholder presentation ready numbers'
  ];

  const caseStudies = [
    {
      company: 'FinanceFirst',
      industry: 'Financial Services',
      savings: 'Reduced costs by 40% after implementation',
      timeframe: '12 months'
    },
    {
      company: 'TechScale',
      industry: 'Technology',
      savings: 'ROI achieved within 8 months',
      timeframe: '8 months'
    },
    {
      company: 'ManufacturingPlus',
      industry: 'Manufacturing',
      savings: 'Cut operational expenses by $2M annually',
      timeframe: '18 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="AI Cost Calculator"
      description="Calculate the total cost of AI implementation across your organization. Compare different AI solutions and estimate budget requirements."
      category="AI Business Solutions"
      canonicalPath="/tools/ai-cost-calculator"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}