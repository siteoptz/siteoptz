import ROICalculatorTemplate from '../../components/ROICalculatorTemplate';

export default function ManufacturingROICalculator() {
  const fields = [
    {
      id: 'monthlyProduction',
      label: 'Monthly Production Units',
      type: 'number' as const,
      placeholder: '10000',
      defaultValue: 10000
    },
    {
      id: 'productionCostPerUnit',
      label: 'Production Cost per Unit',
      type: 'number' as const,
      placeholder: '25',
      prefix: '$',
      defaultValue: 25
    },
    {
      id: 'defectRate',
      label: 'Current Defect Rate (%)',
      type: 'number' as const,
      placeholder: '3',
      suffix: '%',
      defaultValue: 3
    },
    {
      id: 'aiEfficiencyGain',
      label: 'Expected Efficiency Improvement',
      type: 'select' as const,
      options: [
        { value: '0.15', label: '15% - Basic AI Monitoring' },
        { value: '0.25', label: '25% - Advanced Predictive Analytics' },
        { value: '0.35', label: '35% - Comprehensive AI Integration' }
      ],
      defaultValue: 0.25
    },
    {
      id: 'aiSystemCost',
      label: 'Monthly AI System Cost',
      type: 'number' as const,
      placeholder: '15000',
      prefix: '$',
      defaultValue: 15000
    }
  ];

  const calculations = [
    {
      id: 'monthlyProductionCost',
      label: 'Current Monthly Production Cost',
      formula: (values: Record<string, number>) => {
        const { monthlyProduction, productionCostPerUnit } = values;
        return (monthlyProduction * productionCostPerUnit) || 0;
      },
      format: 'currency' as const,
      description: 'Total monthly cost of production'
    },
    {
      id: 'defectCost',
      label: 'Monthly Defect Cost',
      formula: (values: Record<string, number>) => {
        const { monthlyProduction, productionCostPerUnit, defectRate } = values;
        const defectUnits = monthlyProduction * (defectRate / 100);
        return (defectUnits * productionCostPerUnit * 2) || 0; // Defect cost is 2x production cost
      },
      format: 'currency' as const,
      description: 'Monthly cost from defective products'
    },
    {
      id: 'efficiencySavings',
      label: 'Monthly Efficiency Savings',
      formula: (values: Record<string, number>) => {
        const { monthlyProduction, productionCostPerUnit, aiEfficiencyGain } = values;
        const totalCost = monthlyProduction * productionCostPerUnit;
        return (totalCost * aiEfficiencyGain) || 0;
      },
      format: 'currency' as const,
      description: 'Savings from improved production efficiency'
    },
    {
      id: 'qualityImprovement',
      label: 'Monthly Quality Savings',
      formula: (values: Record<string, number>) => {
        const { monthlyProduction, productionCostPerUnit, defectRate } = values;
        const defectUnits = monthlyProduction * (defectRate / 100);
        const improvedDefectRate = defectRate * 0.4; // 60% reduction in defects
        const newDefectUnits = monthlyProduction * (improvedDefectRate / 100);
        const defectReduction = defectUnits - newDefectUnits;
        return (defectReduction * productionCostPerUnit * 2) || 0;
      },
      format: 'currency' as const,
      description: 'Savings from reduced defect rates'
    },
    {
      id: 'totalMonthlySavings',
      label: 'Total Monthly Savings',
      formula: (values: Record<string, number>) => {
        const { monthlyProduction, productionCostPerUnit, defectRate, aiEfficiencyGain } = values;
        const totalCost = monthlyProduction * productionCostPerUnit;
        const efficiencySavings = totalCost * aiEfficiencyGain;
        
        const defectUnits = monthlyProduction * (defectRate / 100);
        const improvedDefectRate = defectRate * 0.4;
        const newDefectUnits = monthlyProduction * (improvedDefectRate / 100);
        const defectReduction = defectUnits - newDefectUnits;
        const qualitySavings = defectReduction * productionCostPerUnit * 2;
        
        return (efficiencySavings + qualitySavings) || 0;
      },
      format: 'currency' as const,
      description: 'Combined savings from efficiency and quality improvements'
    },
    {
      id: 'netMonthlySavings',
      label: 'Net Monthly Savings',
      formula: (values: Record<string, number>) => {
        const { monthlyProduction, productionCostPerUnit, defectRate, aiEfficiencyGain, aiSystemCost } = values;
        const totalCost = monthlyProduction * productionCostPerUnit;
        const efficiencySavings = totalCost * aiEfficiencyGain;
        
        const defectUnits = monthlyProduction * (defectRate / 100);
        const improvedDefectRate = defectRate * 0.4;
        const newDefectUnits = monthlyProduction * (improvedDefectRate / 100);
        const defectReduction = defectUnits - newDefectUnits;
        const qualitySavings = defectReduction * productionCostPerUnit * 2;
        
        const totalSavings = efficiencySavings + qualitySavings;
        return (totalSavings - aiSystemCost) || 0;
      },
      format: 'currency' as const,
      description: 'Monthly profit after AI system costs'
    },
    {
      id: 'annualROI',
      label: 'Annual Net ROI',
      formula: (values: Record<string, number>) => {
        const { monthlyProduction, productionCostPerUnit, defectRate, aiEfficiencyGain, aiSystemCost } = values;
        const totalCost = monthlyProduction * productionCostPerUnit;
        const efficiencySavings = totalCost * aiEfficiencyGain;
        
        const defectUnits = monthlyProduction * (defectRate / 100);
        const improvedDefectRate = defectRate * 0.4;
        const newDefectUnits = monthlyProduction * (improvedDefectRate / 100);
        const defectReduction = defectUnits - newDefectUnits;
        const qualitySavings = defectReduction * productionCostPerUnit * 2;
        
        const totalSavings = efficiencySavings + qualitySavings;
        const netMonthlySavings = totalSavings - aiSystemCost;
        return (netMonthlySavings * 12) || 0;
      },
      format: 'currency' as const,
      description: 'Total annual return on investment'
    }
  ];

  const benefits = [
    'Reduce production costs by 25%+',
    'Improve product quality and consistency',
    'Predictive maintenance to prevent downtime',
    'Real-time production optimization',
    'Reduce defect rates by up to 60%',
    'Increase overall equipment effectiveness (OEE)'
  ];

  const caseStudies = [
    {
      company: 'Automotive Manufacturer',
      industry: 'Manufacturing',
      savings: '$2.5M annual savings, 40% defect reduction',
      timeframe: '8 months'
    },
    {
      company: 'Electronics Producer',
      industry: 'Electronics',
      savings: '30% increase in production efficiency',
      timeframe: '6 months'
    },
    {
      company: 'Food Processing Plant',
      industry: 'Food & Beverage',
      savings: '$1.8M saved through quality improvements',
      timeframe: '12 months'
    }
  ];

  return (
    <ROICalculatorTemplate
      title="Manufacturing AI ROI Calculator"
      description="Calculate the return on investment for AI manufacturing solutions. Estimate production efficiency gains, quality improvements, and cost reductions."
      category="AI Business Solutions"
      canonicalPath="/tools/manufacturing-roi-calculator"
      fields={fields}
      calculations={calculations}
      benefits={benefits}
      caseStudies={caseStudies}
    />
  );
}