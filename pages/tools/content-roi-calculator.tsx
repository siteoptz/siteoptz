import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function ContentROICalculator() {
  const fields = [
    {
      id: 'contentPieces',
      label: 'Content Pieces per Month',
      type: 'number' as const,
      placeholder: '20',
      defaultValue: 20
    },
    {
      id: 'hoursPerPiece',
      label: 'Hours per Content Piece (Manual)',
      type: 'number' as const,
      placeholder: '4',
      suffix: 'hrs',
      defaultValue: 4
    },
    {
      id: 'contentCreatorSalary',
      label: 'Content Creator Salary',
      type: 'number' as const,
      placeholder: '65000',
      prefix: '$',
      defaultValue: 65000
    },
    {
      id: 'aiEfficiency',
      label: 'Time Savings with AI',
      type: 'select' as const,
      options: [
        { value: '0.4', label: '40% - Basic AI Assistance' },
        { value: '0.6', label: '60% - Advanced AI Tools' },
        { value: '0.8', label: '80% - Comprehensive AI Suite' }
      ],
      defaultValue: 0.6
    },
    {
      id: 'aiToolCost',
      label: 'Monthly AI Tool Costs',
      type: 'number' as const,
      placeholder: '300',
      prefix: '$',
      defaultValue: 300
    }
  ];

  const calculations = [
    {
      id: 'monthlyContentCost',
      label: 'Monthly Manual Content Cost',
      formula: (values: Record<string, number>) => {
        const { contentPieces, hoursPerPiece, contentCreatorSalary } = values;
        const hourlyRate = contentCreatorSalary / 2080;
        const totalHours = contentPieces * hoursPerPiece;
        return (totalHours * hourlyRate) || 0;
      },
      format: 'currency' as const,
      description: 'Current monthly cost of manual content creation'
    },
    {
      id: 'timeSavings',
      label: 'Monthly Time Savings (Hours)',
      formula: (values: Record<string, number>) => {
        const { contentPieces, hoursPerPiece, aiEfficiency } = values;
        const totalHours = contentPieces * hoursPerPiece;
        return (totalHours * aiEfficiency) || 0;
      },
      format: 'number' as const,
      description: 'Hours saved per month using AI content tools'
    },
    {
      id: 'costSavings',
      label: 'Monthly Cost Savings',
      formula: (values: Record<string, number>) => {
        const { contentPieces, hoursPerPiece, contentCreatorSalary, aiEfficiency } = values;
        const hourlyRate = contentCreatorSalary / 2080;
        const totalHours = contentPieces * hoursPerPiece;
        const savedHours = totalHours * aiEfficiency;
        return (savedHours * hourlyRate) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly savings from AI content creation efficiency'
    },
    {
      id: 'netMonthlySavings',
      label: 'Net Monthly Savings',
      formula: (values: Record<string, number>) => {
        const { contentPieces, hoursPerPiece, contentCreatorSalary, aiEfficiency, aiToolCost } = values;
        const hourlyRate = contentCreatorSalary / 2080;
        const totalHours = contentPieces * hoursPerPiece;
        const savedHours = totalHours * aiEfficiency;
        const savings = savedHours * hourlyRate;
        return (savings - aiToolCost) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly savings after AI tool costs'
    },
    {
      id: 'annualROI',
      label: 'Annual Net Savings',
      formula: (values: Record<string, number>) => {
        const { contentPieces, hoursPerPiece, contentCreatorSalary, aiEfficiency, aiToolCost } = values;
        const hourlyRate = contentCreatorSalary / 2080;
        const totalHours = contentPieces * hoursPerPiece;
        const savedHours = totalHours * aiEfficiency;
        const savings = savedHours * hourlyRate;
        const netMonthlySavings = savings - aiToolCost;
        return (netMonthlySavings * 12) || 0;
      },
      format: 'currency' as const,
      description: 'Total annual return on investment'
    },
    {
      id: 'productivityIncrease',
      label: 'Content Output Increase',
      formula: (values: Record<string, number>) => {
        const { aiEfficiency } = values;
        return (aiEfficiency * 100) || 0;
      },
      format: 'percentage' as const,
      description: 'Potential increase in content production capacity'
    }
  ];

  const benefits = [
    'Significantly faster content creation',
    'Maintain consistent quality and tone',
    'Scale content production without hiring',
    'Reduce writer&apos;s block and ideation time',
    'Automate research and fact-checking',
    'Multi-language content generation'
  ];

  const caseStudies = [
    {
      company: 'Digital Marketing Agency',
      industry: 'Marketing',
      savings: '300% increase in content output',
      timeframe: '6 months'
    },
    {
      company: 'E-learning Platform',
      industry: 'Education',
      savings: '$150K annual savings in content costs',
      timeframe: '9 months'
    },
    {
      company: 'SaaS Company',
      industry: 'Technology',
      savings: 'Reduced content creation time by 70%',
      timeframe: '4 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="Content AI ROI Calculator"
      description="Calculate the return on investment for AI-powered content creation tools. Estimate time savings, cost reductions, and content output improvements."
      category="AI Business Solutions"
      canonicalPath="/tools/content-roi-calculator"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}