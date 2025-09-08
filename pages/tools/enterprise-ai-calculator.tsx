import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function EnterpriseAICalculator() {
  const fields = [
    {
      id: 'employees',
      label: 'Total Number of Employees',
      type: 'number' as const,
      placeholder: '500',
      defaultValue: 500
    },
    {
      id: 'avgSalary',
      label: 'Average Employee Salary',
      type: 'number' as const,
      placeholder: '80000',
      prefix: '$',
      defaultValue: 80000
    },
    {
      id: 'processAutomationRate',
      label: 'Process Automation Potential',
      type: 'select' as const,
      options: [
        { value: '0.25', label: '25% - Basic Automation' },
        { value: '0.40', label: '40% - Moderate Automation' },
        { value: '0.60', label: '60% - Advanced Automation' }
      ],
      defaultValue: 0.40
    },
    {
      id: 'implementationCost',
      label: 'Total Implementation Investment',
      type: 'number' as const,
      placeholder: '500000',
      prefix: '$',
      defaultValue: 500000
    },
    {
      id: 'annualLicenseCost',
      label: 'Annual AI Platform Licensing',
      type: 'number' as const,
      placeholder: '100000',
      prefix: '$',
      defaultValue: 100000
    }
  ];

  const calculations = [
    {
      id: 'totalLaborCost',
      label: 'Annual Labor Cost',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary } = values;
        return (employees * avgSalary) || 0;
      },
      format: 'currency' as const,
      description: 'Total annual cost of all employees'
    },
    {
      id: 'automatableLaborCost',
      label: 'Automatable Labor Cost',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, processAutomationRate } = values;
        const totalLaborCost = employees * avgSalary;
        return (totalLaborCost * processAutomationRate) || 0;
      },
      format: 'currency' as const,
      description: 'Annual cost of work that can be automated'
    },
    {
      id: 'annualSavings',
      label: 'Annual Labor Savings',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, processAutomationRate } = values;
        const totalLaborCost = employees * avgSalary;
        const savings = totalLaborCost * processAutomationRate * 0.7; // 70% savings from automation
        return savings || 0;
      },
      format: 'currency' as const,
      description: 'Annual savings from process automation'
    },
    {
      id: 'totalAnnualCost',
      label: 'Total Annual AI Costs',
      formula: (values: Record<string, number>) => {
        const { implementationCost, annualLicenseCost } = values;
        const annualImplementationCost = implementationCost / 3; // Amortize over 3 years
        return (annualImplementationCost + annualLicenseCost) || 0;
      },
      format: 'currency' as const,
      description: 'Total annual cost including implementation and licensing'
    },
    {
      id: 'netAnnualROI',
      label: 'Net Annual ROI',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, processAutomationRate, implementationCost, annualLicenseCost } = values;
        const totalLaborCost = employees * avgSalary;
        const savings = totalLaborCost * processAutomationRate * 0.7;
        const annualImplementationCost = implementationCost / 3;
        const totalCosts = annualImplementationCost + annualLicenseCost;
        return (savings - totalCosts) || 0;
      },
      format: 'currency' as const,
      description: 'Net return on investment after all costs'
    },
    {
      id: 'roiPercentage',
      label: 'ROI Percentage',
      formula: (values: Record<string, number>) => {
        const { employees, avgSalary, processAutomationRate, implementationCost, annualLicenseCost } = values;
        const totalLaborCost = employees * avgSalary;
        const savings = totalLaborCost * processAutomationRate * 0.7;
        const annualImplementationCost = implementationCost / 3;
        const totalCosts = annualImplementationCost + annualLicenseCost;
        const netROI = savings - totalCosts;
        return totalCosts > 0 ? (netROI / totalCosts) * 100 : 0;
      },
      format: 'percentage' as const,
      description: 'Return on investment as a percentage'
    }
  ];

  const benefits = [
    'Automate complex business processes',
    'Reduce operational overhead by 40%+',
    'Improve decision-making with AI insights',
    'Scale operations without proportional hiring',
    'Enhance customer experience and satisfaction',
    'Gain competitive advantage through innovation'
  ];

  const caseStudies = [
    {
      company: 'Fortune 500 Financial',
      industry: 'Financial Services',
      savings: '$5M annual savings, 50% process automation',
      timeframe: '18 months'
    },
    {
      company: 'Global Manufacturing',
      industry: 'Manufacturing',
      savings: '60% reduction in manual processing',
      timeframe: '24 months'
    },
    {
      company: 'Healthcare System',
      industry: 'Healthcare',
      savings: '$2.5M saved, improved patient outcomes',
      timeframe: '12 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="Enterprise AI ROI Calculator"
      description="Calculate the return on investment for enterprise AI implementations. Estimate organizational efficiency gains, process automation benefits, and strategic advantages."
      category="AI Business Solutions"
      canonicalPath="/tools/enterprise-ai-calculator"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}