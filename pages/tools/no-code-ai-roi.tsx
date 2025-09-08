import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function NoCodeAIROI() {
  const fields = [
    {
      id: 'projects',
      label: 'Number of AI Projects per Year',
      type: 'number' as const,
      placeholder: '12',
      defaultValue: 12
    },
    {
      id: 'developmentTimeTraditional',
      label: 'Traditional Development Time (weeks)',
      type: 'number' as const,
      placeholder: '16',
      suffix: 'weeks',
      defaultValue: 16
    },
    {
      id: 'developerSalary',
      label: 'Average Developer Salary',
      type: 'number' as const,
      placeholder: '100000',
      prefix: '$',
      defaultValue: 100000
    },
    {
      id: 'noCodeSpeedup',
      label: 'No-Code Development Speedup',
      type: 'select' as const,
      options: [
        { value: '3', label: '3x - Basic No-Code Tools' },
        { value: '5', label: '5x - Advanced Platforms' },
        { value: '8', label: '8x - Comprehensive Suites' }
      ],
      defaultValue: 5
    },
    {
      id: 'noCodePlatformCost',
      label: 'Annual No-Code Platform Cost',
      type: 'number' as const,
      placeholder: '10000',
      prefix: '$',
      defaultValue: 10000
    }
  ];

  const calculations = [
    {
      id: 'traditionalDevelopmentCost',
      label: 'Annual Traditional Development Cost',
      formula: (values: Record<string, number>) => {
        const { projects, developmentTimeTraditional, developerSalary } = values;
        const weeksPerYear = 52;
        const weeklyRate = developerSalary / weeksPerYear;
        const totalWeeks = projects * developmentTimeTraditional;
        return (totalWeeks * weeklyRate) || 0;
      },
      format: 'currency' as const,
      description: 'Annual cost of traditional AI development'
    },
    {
      id: 'noCodeDevelopmentTime',
      label: 'No-Code Development Time (weeks)',
      formula: (values: Record<string, number>) => {
        const { developmentTimeTraditional, noCodeSpeedup } = values;
        return (developmentTimeTraditional / noCodeSpeedup) || 0;
      },
      format: 'number' as const,
      description: 'Time required with no-code platforms'
    },
    {
      id: 'noCodeDevelopmentCost',
      label: 'Annual No-Code Development Cost',
      formula: (values: Record<string, number>) => {
        const { projects, developmentTimeTraditional, developerSalary, noCodeSpeedup } = values;
        const weeksPerYear = 52;
        const weeklyRate = developerSalary / weeksPerYear;
        const noCodeWeeks = (developmentTimeTraditional / noCodeSpeedup);
        const totalWeeks = projects * noCodeWeeks;
        return (totalWeeks * weeklyRate) || 0;
      },
      format: 'currency' as const,
      description: 'Annual development cost with no-code tools'
    },
    {
      id: 'developmentSavings',
      label: 'Annual Development Savings',
      formula: (values: Record<string, number>) => {
        const { projects, developmentTimeTraditional, developerSalary, noCodeSpeedup } = values;
        const weeksPerYear = 52;
        const weeklyRate = developerSalary / weeksPerYear;
        const traditionalCost = projects * developmentTimeTraditional * weeklyRate;
        const noCodeWeeks = (developmentTimeTraditional / noCodeSpeedup);
        const noCodeCost = projects * noCodeWeeks * weeklyRate;
        return (traditionalCost - noCodeCost) || 0;
      },
      format: 'currency' as const,
      description: 'Savings from faster development cycles'
    },
    {
      id: 'netAnnualSavings',
      label: 'Net Annual Savings',
      formula: (values: Record<string, number>) => {
        const { projects, developmentTimeTraditional, developerSalary, noCodeSpeedup, noCodePlatformCost } = values;
        const weeksPerYear = 52;
        const weeklyRate = developerSalary / weeksPerYear;
        const traditionalCost = projects * developmentTimeTraditional * weeklyRate;
        const noCodeWeeks = (developmentTimeTraditional / noCodeSpeedup);
        const noCodeCost = projects * noCodeWeeks * weeklyRate;
        const developmentSavings = traditionalCost - noCodeCost;
        return (developmentSavings - noCodePlatformCost) || 0;
      },
      format: 'currency' as const,
      description: 'Net savings after platform costs'
    },
    {
      id: 'timeToMarketImprovement',
      label: 'Time-to-Market Improvement',
      formula: (values: Record<string, number>) => {
        const { developmentTimeTraditional, noCodeSpeedup } = values;
        const timeReduction = developmentTimeTraditional - (developmentTimeTraditional / noCodeSpeedup);
        return timeReduction || 0;
      },
      format: 'number' as const,
      description: 'Weeks saved per project'
    },
    {
      id: 'projectsPerYear',
      label: 'Potential Projects per Year',
      formula: (values: Record<string, number>) => {
        const { projects, noCodeSpeedup } = values;
        return (projects * noCodeSpeedup) || 0;
      },
      format: 'number' as const,
      description: 'Maximum projects possible with same resources'
    }
  ];

  const benefits = [
    'Accelerate AI development by 5x',
    'Reduce technical complexity and barriers',
    'Enable non-technical teams to build AI solutions',
    'Faster time-to-market for AI products',
    'Lower development and maintenance costs',
    'Rapid prototyping and iteration'
  ];

  const caseStudies = [
    {
      company: 'Startup Accelerator',
      industry: 'Technology',
      savings: 'Built 10 AI apps in 6 months vs 2 years',
      timeframe: '6 months'
    },
    {
      company: 'Marketing Agency',
      industry: 'Marketing',
      savings: '$150K saved in development costs',
      timeframe: '12 months'
    },
    {
      company: 'E-commerce Platform',
      industry: 'Retail',
      savings: '8x faster deployment of AI features',
      timeframe: '9 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="No-Code AI ROI Calculator"
      description="Calculate the return on investment for no-code AI platforms. Estimate development time savings, reduced technical debt, and faster time-to-market."
      category="AI Business Solutions"
      canonicalPath="/tools/no-code-ai-roi"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}