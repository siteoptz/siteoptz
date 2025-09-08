import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function ChatbotROICalculator() {
  const fields = [
    {
      id: 'monthlyTickets',
      label: 'Monthly Customer Support Tickets',
      type: 'number' as const,
      placeholder: '1000',
      defaultValue: 1000
    },
    {
      id: 'avgResolutionTime',
      label: 'Average Resolution Time (minutes)',
      type: 'number' as const,
      placeholder: '20',
      suffix: 'min',
      defaultValue: 20
    },
    {
      id: 'supportStaffSalary',
      label: 'Average Support Staff Salary',
      type: 'number' as const,
      placeholder: '50000',
      prefix: '$',
      defaultValue: 50000
    },
    {
      id: 'automationRate',
      label: 'Percentage of Tickets AI Can Handle',
      type: 'select' as const,
      options: [
        { value: '0.4', label: '40% - Basic Queries' },
        { value: '0.6', label: '60% - Standard Support' },
        { value: '0.8', label: '80% - Advanced AI' }
      ],
      defaultValue: 0.6
    },
    {
      id: 'chatbotCost',
      label: 'Monthly Chatbot Platform Cost',
      type: 'number' as const,
      placeholder: '200',
      prefix: '$',
      defaultValue: 200
    }
  ];

  const calculations = [
    {
      id: 'monthlyLaborCost',
      label: 'Monthly Support Labor Cost',
      formula: (values: Record<string, number>) => {
        const { monthlyTickets, avgResolutionTime, supportStaffSalary } = values;
        const hourlyRate = supportStaffSalary / 2080;
        const totalMinutes = monthlyTickets * avgResolutionTime;
        const totalHours = totalMinutes / 60;
        return (totalHours * hourlyRate) || 0;
      },
      format: 'currency' as const,
      description: 'Current monthly cost of human support staff'
    },
    {
      id: 'potentialSavings',
      label: 'Monthly Savings with AI',
      formula: (values: Record<string, number>) => {
        const { monthlyTickets, avgResolutionTime, supportStaffSalary, automationRate } = values;
        const hourlyRate = supportStaffSalary / 2080;
        const totalMinutes = monthlyTickets * avgResolutionTime;
        const totalHours = totalMinutes / 60;
        const currentCost = totalHours * hourlyRate;
        return (currentCost * automationRate) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly savings from automating support tickets'
    },
    {
      id: 'netMonthlySavings',
      label: 'Net Monthly Savings',
      formula: (values: Record<string, number>) => {
        const { monthlyTickets, avgResolutionTime, supportStaffSalary, automationRate, chatbotCost } = values;
        const hourlyRate = supportStaffSalary / 2080;
        const totalMinutes = monthlyTickets * avgResolutionTime;
        const totalHours = totalMinutes / 60;
        const currentCost = totalHours * hourlyRate;
        const savings = currentCost * automationRate;
        return (savings - chatbotCost) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly savings after chatbot platform costs'
    },
    {
      id: 'annualSavings',
      label: 'Annual Net Savings',
      formula: (values: Record<string, number>) => {
        const { monthlyTickets, avgResolutionTime, supportStaffSalary, automationRate, chatbotCost } = values;
        const hourlyRate = supportStaffSalary / 2080;
        const totalMinutes = monthlyTickets * avgResolutionTime;
        const totalHours = totalMinutes / 60;
        const currentCost = totalHours * hourlyRate;
        const savings = currentCost * automationRate;
        const netMonthlySavings = savings - chatbotCost;
        return (netMonthlySavings * 12) || 0;
      },
      format: 'currency' as const,
      description: 'Total annual savings from chatbot implementation'
    }
  ];

  const benefits = [
    '24/7 customer support availability',
    'Instant response to customer queries',
    'Reduce support staff workload by 60%+',
    'Improve customer satisfaction scores',
    'Scale support without hiring',
    'Free up staff for complex issues'
  ];

  const caseStudies = [
    {
      company: 'E-commerce Plus',
      industry: 'Retail',
      savings: '$120K annually in support costs',
      timeframe: '6 months'
    },
    {
      company: 'FinTech Solutions',
      industry: 'Financial Services',
      savings: '70% reduction in response time',
      timeframe: '4 months'
    },
    {
      company: 'SaaS Startup',
      industry: 'Technology',
      savings: '$80K saved, 2 staff reassigned',
      timeframe: '8 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="Chatbot ROI Calculator"
      description="Calculate the return on investment for implementing AI chatbots. Estimate cost savings from automated customer support and improved response times."
      category="Customer Support AI"
      canonicalPath="/tools/chatbot-roi-calculator"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}