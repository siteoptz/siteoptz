import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function ChatbotROICalculator() {
  const fields = [
    {
      id: 'monthlyCustomerInquiries',
      label: 'Monthly Customer Inquiries',
      type: 'number' as const,
      placeholder: '1000',
      defaultValue: 1000
    },
    {
      id: 'avgResponseTime',
      label: 'Average Response Time (minutes)',
      type: 'select' as const,
      options: [
        { value: '5', label: '5 minutes - Excellent' },
        { value: '15', label: '15 minutes - Good' },
        { value: '30', label: '30 minutes - Average' },
        { value: '60', label: '1 hour - Poor' },
        { value: '120', label: '2+ hours - Very Poor' }
      ],
      defaultValue: 30
    },
    {
      id: 'supportStaffCount',
      label: 'Customer Support Staff',
      type: 'number' as const,
      placeholder: '3',
      defaultValue: 3
    },
    {
      id: 'avgSupportSalary',
      label: 'Average Support Staff Salary',
      type: 'number' as const,
      placeholder: '45000',
      prefix: '$',
      defaultValue: 45000
    },
    {
      id: 'chatbotResolutionRate',
      label: 'Chatbot Resolution Rate',
      type: 'select' as const,
      options: [
        { value: '0.4', label: '40% - Basic Chatbot' },
        { value: '0.6', label: '60% - Good Chatbot' },
        { value: '0.75', label: '75% - Advanced Chatbot' },
        { value: '0.85', label: '85% - AI-Powered Chatbot' }
      ],
      defaultValue: 0.6
    },
    {
      id: 'chatbotMonthlyCost',
      label: 'Monthly Chatbot Cost',
      type: 'number' as const,
      placeholder: '500',
      prefix: '$',
      defaultValue: 500
    }
  ];

  const calculations = [
    {
      id: 'currentSupportCost',
      label: 'Current Monthly Support Cost',
      formula: (values: Record<string, number>) => {
        const { supportStaffCount, avgSupportSalary } = values;
        return (supportStaffCount * avgSupportSalary) / 12 || 0;
      },
      format: 'currency' as const,
      description: 'Monthly cost of your current customer support staff'
    },
    {
      id: 'inquiriesHandledByChatbot',
      label: 'Inquiries Handled by Chatbot',
      formula: (values: Record<string, number>) => {
        const { monthlyCustomerInquiries, chatbotResolutionRate } = values;
        return monthlyCustomerInquiries * chatbotResolutionRate || 0;
      },
      format: 'number' as const,
      description: 'Number of customer inquiries resolved by chatbot monthly'
    },
    {
      id: 'staffTimeFreed',
      label: 'Staff Hours Freed Per Month',
      formula: (values: Record<string, number>) => {
        const { monthlyCustomerInquiries, chatbotResolutionRate, avgResponseTime } = values;
        const inquiriesHandled = monthlyCustomerInquiries * chatbotResolutionRate;
        return (inquiriesHandled * avgResponseTime) / 60 || 0; // Convert to hours
      },
      format: 'number' as const,
      description: 'Support staff hours freed up monthly by chatbot automation'
    },
    {
      id: 'monthlySavings',
      label: 'Monthly Cost Savings',
      formula: (values: Record<string, number>) => {
        const { monthlyCustomerInquiries, chatbotResolutionRate, avgResponseTime, avgSupportSalary, chatbotMonthlyCost } = values;
        const inquiriesHandled = monthlyCustomerInquiries * chatbotResolutionRate;
        const hoursFreed = (inquiriesHandled * avgResponseTime) / 60;
        const hourlyCost = avgSupportSalary / (12 * 160); // Assuming 160 work hours per month
        const laborSavings = hoursFreed * hourlyCost;
        return laborSavings - chatbotMonthlyCost || 0;
      },
      format: 'currency' as const,
      description: 'Net monthly savings after chatbot implementation'
    },
    {
      id: 'annualROI',
      label: 'Annual ROI',
      formula: (values: Record<string, number>) => {
        const { monthlyCustomerInquiries, chatbotResolutionRate, avgResponseTime, avgSupportSalary, chatbotMonthlyCost } = values;
        const inquiriesHandled = monthlyCustomerInquiries * chatbotResolutionRate;
        const hoursFreed = (inquiriesHandled * avgResponseTime) / 60;
        const hourlyCost = avgSupportSalary / (12 * 160);
        const monthlyLaborSavings = hoursFreed * hourlyCost;
        const monthlySavings = monthlyLaborSavings - chatbotMonthlyCost;
        return monthlySavings * 12 || 0;
      },
      format: 'currency' as const,
      description: 'Total annual return on investment'
    },
    {
      id: 'paybackMonths',
      label: 'Payback Period',
      formula: (values: Record<string, number>) => {
        const { monthlyCustomerInquiries, chatbotResolutionRate, avgResponseTime, avgSupportSalary, chatbotMonthlyCost } = values;
        const setupCost = chatbotMonthlyCost * 3; // Assume 3 months setup equivalent
        const inquiriesHandled = monthlyCustomerInquiries * chatbotResolutionRate;
        const hoursFreed = (inquiriesHandled * avgResponseTime) / 60;
        const hourlyCost = avgSupportSalary / (12 * 160);
        const monthlyLaborSavings = hoursFreed * hourlyCost;
        const monthlySavings = monthlyLaborSavings - chatbotMonthlyCost;
        return monthlySavings > 0 ? setupCost / monthlySavings : 0;
      },
      format: 'months' as const,
      description: 'Time to recover initial chatbot investment'
    }
  ];

  const benefits = [
    '24/7 customer support availability',
    'Instant response to customer inquiries',
    'Reduce support team workload by 40-85%',
    'Consistent service quality',
    'Handle multiple customers simultaneously',
    'Capture leads outside business hours',
    'Reduce customer wait times significantly'
  ];

  const caseStudies = [
    {
      company: 'TechSupport Pro',
      industry: 'Software',
      savings: '$120K annually',
      timeframe: '8 months'
    },
    {
      company: 'Retail Solutions',
      industry: 'E-commerce',
      savings: '$200K annually',
      timeframe: '6 months'
    },
    {
      company: 'Healthcare Plus',
      industry: 'Healthcare',
      savings: '$150K annually',
      timeframe: '10 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="Chatbot ROI Calculator"
      description="Calculate the return on investment for implementing AI chatbots. Estimate cost savings from automated customer support and improved response times."
      category="Customer Support AI"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}