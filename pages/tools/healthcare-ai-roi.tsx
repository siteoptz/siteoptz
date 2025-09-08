import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function HealthcareAIROI() {
  const fields = [
    {
      id: 'patients',
      label: 'Monthly Patient Volume',
      type: 'number' as const,
      placeholder: '1000',
      defaultValue: 1000
    },
    {
      id: 'avgCostPerPatient',
      label: 'Average Cost per Patient',
      type: 'number' as const,
      placeholder: '300',
      prefix: '$',
      defaultValue: 300
    },
    {
      id: 'staffCount',
      label: 'Healthcare Staff Count',
      type: 'number' as const,
      placeholder: '50',
      defaultValue: 50
    },
    {
      id: 'avgStaffSalary',
      label: 'Average Staff Salary',
      type: 'number' as const,
      placeholder: '75000',
      prefix: '$',
      defaultValue: 75000
    },
    {
      id: 'aiEfficiencyGain',
      label: 'Expected AI Efficiency Improvement',
      type: 'select' as const,
      options: [
        { value: '0.15', label: '15% - Basic AI Assistance' },
        { value: '0.25', label: '25% - Advanced AI Diagnostics' },
        { value: '0.35', label: '35% - Comprehensive AI Integration' }
      ],
      defaultValue: 0.25
    },
    {
      id: 'aiSystemCost',
      label: 'Monthly AI System Cost',
      type: 'number' as const,
      placeholder: '8000',
      prefix: '$',
      defaultValue: 8000
    }
  ];

  const calculations = [
    {
      id: 'monthlyOperationalCost',
      label: 'Monthly Operational Cost',
      formula: (values: Record<string, number>) => {
        const { patients, avgCostPerPatient, staffCount, avgStaffSalary } = values;
        const patientCosts = patients * avgCostPerPatient;
        const staffCosts = (staffCount * avgStaffSalary) / 12;
        return (patientCosts + staffCosts) || 0;
      },
      format: 'currency' as const,
      description: 'Current monthly healthcare operational costs'
    },
    {
      id: 'efficiencySavings',
      label: 'Monthly Efficiency Savings',
      formula: (values: Record<string, number>) => {
        const { patients, avgCostPerPatient, staffCount, avgStaffSalary, aiEfficiencyGain } = values;
        const patientCosts = patients * avgCostPerPatient;
        const staffCosts = (staffCount * avgStaffSalary) / 12;
        const totalCosts = patientCosts + staffCosts;
        return (totalCosts * aiEfficiencyGain) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly savings from AI-driven efficiency improvements'
    },
    {
      id: 'qualityImprovement',
      label: 'Patient Outcome Improvement Value',
      formula: (values: Record<string, number>) => {
        const { patients, avgCostPerPatient, aiEfficiencyGain } = values;
        // Assume better outcomes reduce readmission costs by 10% of patient volume
        const qualityFactor = aiEfficiencyGain * 0.4; // 40% of efficiency gain translates to quality
        return (patients * avgCostPerPatient * qualityFactor) || 0;
      },
      format: 'currency' as const,
      description: 'Value from improved patient outcomes and reduced readmissions'
    },
    {
      id: 'totalMonthlySavings',
      label: 'Total Monthly Savings',
      formula: (values: Record<string, number>) => {
        const { patients, avgCostPerPatient, staffCount, avgStaffSalary, aiEfficiencyGain } = values;
        const patientCosts = patients * avgCostPerPatient;
        const staffCosts = (staffCount * avgStaffSalary) / 12;
        const totalCosts = patientCosts + staffCosts;
        const efficiencySavings = totalCosts * aiEfficiencyGain;
        const qualityFactor = aiEfficiencyGain * 0.4;
        const qualityImprovement = patients * avgCostPerPatient * qualityFactor;
        return (efficiencySavings + qualityImprovement) || 0;
      },
      format: 'currency' as const,
      description: 'Combined savings from efficiency and quality improvements'
    },
    {
      id: 'netMonthlySavings',
      label: 'Net Monthly Savings',
      formula: (values: Record<string, number>) => {
        const { patients, avgCostPerPatient, staffCount, avgStaffSalary, aiEfficiencyGain, aiSystemCost } = values;
        const patientCosts = patients * avgCostPerPatient;
        const staffCosts = (staffCount * avgStaffSalary) / 12;
        const totalCosts = patientCosts + staffCosts;
        const efficiencySavings = totalCosts * aiEfficiencyGain;
        const qualityFactor = aiEfficiencyGain * 0.4;
        const qualityImprovement = patients * avgCostPerPatient * qualityFactor;
        const totalSavings = efficiencySavings + qualityImprovement;
        return (totalSavings - aiSystemCost) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly profit after AI system costs'
    },
    {
      id: 'annualROI',
      label: 'Annual Net ROI',
      formula: (values: Record<string, number>) => {
        const { patients, avgCostPerPatient, staffCount, avgStaffSalary, aiEfficiencyGain, aiSystemCost } = values;
        const patientCosts = patients * avgCostPerPatient;
        const staffCosts = (staffCount * avgStaffSalary) / 12;
        const totalCosts = patientCosts + staffCosts;
        const efficiencySavings = totalCosts * aiEfficiencyGain;
        const qualityFactor = aiEfficiencyGain * 0.4;
        const qualityImprovement = patients * avgCostPerPatient * qualityFactor;
        const totalSavings = efficiencySavings + qualityImprovement;
        const netMonthlySavings = totalSavings - aiSystemCost;
        return (netMonthlySavings * 12) || 0;
      },
      format: 'currency' as const,
      description: 'Total annual return on investment'
    }
  ];

  const benefits = [
    'Improve patient outcomes and satisfaction',
    'Reduce medical errors and misdiagnoses',
    'Accelerate diagnostic processes',
    'Optimize staff workflow and productivity',
    'Lower operational costs by 25%+',
    'Enhanced predictive analytics for treatments'
  ];

  const caseStudies = [
    {
      company: 'Regional Medical Center',
      industry: 'Healthcare',
      savings: '$2.1M annual savings, 30% faster diagnosis',
      timeframe: '10 months'
    },
    {
      company: 'University Hospital',
      industry: 'Healthcare',
      savings: '40% reduction in readmission rates',
      timeframe: '12 months'
    },
    {
      company: 'Specialty Clinic Group',
      industry: 'Healthcare',
      savings: '$800K saved through workflow optimization',
      timeframe: '8 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="Healthcare AI ROI Calculator"
      description="Calculate the return on investment for AI healthcare solutions. Estimate improved patient outcomes, operational efficiency, and cost savings."
      category="AI Business Solutions"
      canonicalPath="/tools/healthcare-ai-roi"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}