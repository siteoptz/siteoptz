import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function MarketingROICalculator() {
  const fields = [
    {
      id: 'monthlyAdSpend',
      label: 'Monthly Advertising Spend',
      type: 'number' as const,
      placeholder: '10000',
      prefix: '$',
      defaultValue: 10000
    },
    {
      id: 'currentConversionRate',
      label: 'Current Conversion Rate (%)',
      type: 'number' as const,
      placeholder: '2.5',
      suffix: '%',
      defaultValue: 2.5
    },
    {
      id: 'averageOrderValue',
      label: 'Average Order Value',
      type: 'number' as const,
      placeholder: '150',
      prefix: '$',
      defaultValue: 150
    },
    {
      id: 'aiImprovementRate',
      label: 'Expected AI Marketing Improvement',
      type: 'select' as const,
      options: [
        { value: '0.20', label: '20% - Basic AI Optimization' },
        { value: '0.35', label: '35% - Advanced AI Tools' },
        { value: '0.50', label: '50% - Comprehensive AI Suite' }
      ],
      defaultValue: 0.35
    },
    {
      id: 'aiToolCost',
      label: 'Monthly AI Marketing Tool Cost',
      type: 'number' as const,
      placeholder: '800',
      prefix: '$',
      defaultValue: 800
    }
  ];

  const calculations = [
    {
      id: 'currentMonthlyRevenue',
      label: 'Current Monthly Revenue from Ads',
      formula: (values: Record<string, number>) => {
        const { monthlyAdSpend, currentConversionRate, averageOrderValue } = values;
        const estimatedClicks = (monthlyAdSpend / 100) * 1000;
        const conversions = estimatedClicks * (currentConversionRate / 100);
        return (conversions * averageOrderValue) || 0;
      },
      format: 'currency' as const,
      description: 'Current monthly revenue generated from ad spend'
    },
    {
      id: 'improvedRevenue',
      label: 'Improved Monthly Revenue with AI',
      formula: (values: Record<string, number>) => {
        const { monthlyAdSpend, currentConversionRate, averageOrderValue, aiImprovementRate } = values;
        const estimatedClicks = (monthlyAdSpend / 100) * 1000;
        const baseConversions = estimatedClicks * (currentConversionRate / 100);
        const baseRevenue = baseConversions * averageOrderValue;
        return (baseRevenue * (1 + aiImprovementRate)) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly revenue after AI optimization'
    },
    {
      id: 'revenueIncrease',
      label: 'Monthly Revenue Increase',
      formula: (values: Record<string, number>) => {
        const { monthlyAdSpend, currentConversionRate, averageOrderValue, aiImprovementRate } = values;
        const estimatedClicks = (monthlyAdSpend / 100) * 1000;
        const baseConversions = estimatedClicks * (currentConversionRate / 100);
        const baseRevenue = baseConversions * averageOrderValue;
        const improvedRevenue = baseRevenue * (1 + aiImprovementRate);
        return (improvedRevenue - baseRevenue) || 0;
      },
      format: 'currency' as const,
      description: 'Additional monthly revenue from AI improvements'
    },
    {
      id: 'netMonthlyGain',
      label: 'Net Monthly Gain',
      formula: (values: Record<string, number>) => {
        const { monthlyAdSpend, currentConversionRate, averageOrderValue, aiImprovementRate, aiToolCost } = values;
        const estimatedClicks = (monthlyAdSpend / 100) * 1000;
        const baseConversions = estimatedClicks * (currentConversionRate / 100);
        const baseRevenue = baseConversions * averageOrderValue;
        const improvedRevenue = baseRevenue * (1 + aiImprovementRate);
        const revenueIncrease = improvedRevenue - baseRevenue;
        return (revenueIncrease - aiToolCost) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly profit increase after AI tool costs'
    },
    {
      id: 'annualROI',
      label: 'Annual Net ROI',
      formula: (values: Record<string, number>) => {
        const { monthlyAdSpend, currentConversionRate, averageOrderValue, aiImprovementRate, aiToolCost } = values;
        const estimatedClicks = (monthlyAdSpend / 100) * 1000;
        const baseConversions = estimatedClicks * (currentConversionRate / 100);
        const baseRevenue = baseConversions * averageOrderValue;
        const improvedRevenue = baseRevenue * (1 + aiImprovementRate);
        const revenueIncrease = improvedRevenue - baseRevenue;
        const netMonthlyGain = revenueIncrease - aiToolCost;
        return (netMonthlyGain * 12) || 0;
      },
      format: 'currency' as const,
      description: 'Total annual return on investment'
    }
  ];

  const benefits = [
    'Increase ad campaign performance by 35%+',
    'Automated bid optimization',
    'Advanced audience targeting and segmentation',
    'Real-time campaign adjustments',
    'Predictive customer lifetime value',
    'Cross-channel marketing optimization'
  ];

  const caseStudies = [
    {
      company: 'E-commerce Retailer',
      industry: 'Retail',
      savings: '45% improvement in ROAS',
      timeframe: '3 months'
    },
    {
      company: 'SaaS Company',
      industry: 'Technology',
      savings: '$300K additional revenue annually',
      timeframe: '4 months'
    },
    {
      company: 'Fashion Brand',
      industry: 'Fashion',
      savings: '60% reduction in cost per acquisition',
      timeframe: '6 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="Marketing AI ROI Calculator"
      description="Calculate the return on investment for AI-powered marketing tools. Estimate increased conversions, revenue growth, and cost savings from marketing automation."
      category="Marketing AI"
      canonicalPath="/tools/marketing-roi-calculator"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}