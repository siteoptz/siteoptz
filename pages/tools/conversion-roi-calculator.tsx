import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function ConversionROICalculator() {
  const fields = [
    {
      id: 'monthlyTraffic',
      label: 'Monthly Website Traffic',
      type: 'number' as const,
      placeholder: '10000',
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
      placeholder: '100',
      prefix: '$',
      defaultValue: 100
    },
    {
      id: 'conversionImprovement',
      label: 'Expected Conversion Improvement',
      type: 'select' as const,
      options: [
        { value: '0.15', label: '15% - Basic AI Optimization' },
        { value: '0.25', label: '25% - Advanced AI Tools' },
        { value: '0.35', label: '35% - Comprehensive AI Suite' }
      ],
      defaultValue: 0.25
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
      id: 'currentMonthlyRevenue',
      label: 'Current Monthly Revenue',
      formula: (values: Record<string, number>) => {
        const { monthlyTraffic, currentConversionRate, averageOrderValue } = values;
        const conversions = monthlyTraffic * (currentConversionRate / 100);
        return (conversions * averageOrderValue) || 0;
      },
      format: 'currency' as const,
      description: 'Current monthly revenue from website conversions'
    },
    {
      id: 'improvedConversionRate',
      label: 'Improved Conversion Rate',
      formula: (values: Record<string, number>) => {
        const { currentConversionRate, conversionImprovement } = values;
        return (currentConversionRate * (1 + conversionImprovement)) || 0;
      },
      format: 'percentage' as const,
      description: 'New conversion rate with AI optimization'
    },
    {
      id: 'newMonthlyRevenue',
      label: 'New Monthly Revenue',
      formula: (values: Record<string, number>) => {
        const { monthlyTraffic, currentConversionRate, averageOrderValue, conversionImprovement } = values;
        const newConversionRate = currentConversionRate * (1 + conversionImprovement);
        const conversions = monthlyTraffic * (newConversionRate / 100);
        return (conversions * averageOrderValue) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly revenue after AI conversion optimization'
    },
    {
      id: 'monthlyRevenueIncrease',
      label: 'Monthly Revenue Increase',
      formula: (values: Record<string, number>) => {
        const { monthlyTraffic, currentConversionRate, averageOrderValue, conversionImprovement } = values;
        const currentRevenue = monthlyTraffic * (currentConversionRate / 100) * averageOrderValue;
        const newConversionRate = currentConversionRate * (1 + conversionImprovement);
        const newRevenue = monthlyTraffic * (newConversionRate / 100) * averageOrderValue;
        return (newRevenue - currentRevenue) || 0;
      },
      format: 'currency' as const,
      description: 'Additional monthly revenue from improved conversions'
    },
    {
      id: 'netMonthlyGain',
      label: 'Net Monthly Gain',
      formula: (values: Record<string, number>) => {
        const { monthlyTraffic, currentConversionRate, averageOrderValue, conversionImprovement, aiToolCost } = values;
        const currentRevenue = monthlyTraffic * (currentConversionRate / 100) * averageOrderValue;
        const newConversionRate = currentConversionRate * (1 + conversionImprovement);
        const newRevenue = monthlyTraffic * (newConversionRate / 100) * averageOrderValue;
        const revenueIncrease = newRevenue - currentRevenue;
        return (revenueIncrease - aiToolCost) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly profit after AI tool costs'
    },
    {
      id: 'annualROI',
      label: 'Annual Net Gain',
      formula: (values: Record<string, number>) => {
        const { monthlyTraffic, currentConversionRate, averageOrderValue, conversionImprovement, aiToolCost } = values;
        const currentRevenue = monthlyTraffic * (currentConversionRate / 100) * averageOrderValue;
        const newConversionRate = currentConversionRate * (1 + conversionImprovement);
        const newRevenue = monthlyTraffic * (newConversionRate / 100) * averageOrderValue;
        const revenueIncrease = newRevenue - currentRevenue;
        const netMonthlyGain = revenueIncrease - aiToolCost;
        return (netMonthlyGain * 12) || 0;
      },
      format: 'currency' as const,
      description: 'Total annual return on investment'
    }
  ];

  const benefits = [
    'Increase conversion rates by 25%+',
    'Personalized user experiences',
    'A/B testing automation',
    'Smart recommendation engines',
    'Optimize checkout processes',
    'Reduce cart abandonment rates'
  ];

  const caseStudies = [
    {
      company: 'Fashion Retailer',
      industry: 'E-commerce',
      savings: '40% increase in conversion rate',
      timeframe: '3 months'
    },
    {
      company: 'SaaS Platform',
      industry: 'Technology',
      savings: '$500K additional annual revenue',
      timeframe: '6 months'
    },
    {
      company: 'Travel Booking',
      industry: 'Travel',
      savings: '30% reduction in cart abandonment',
      timeframe: '4 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="Conversion AI ROI Calculator"
      description="Calculate the return on investment for AI conversion optimization tools. Estimate conversion rate improvements, revenue increases, and marketing efficiency gains."
      category="AI Business Solutions"
      canonicalPath="/tools/conversion-roi-calculator"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}