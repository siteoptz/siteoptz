import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Download,
  Mail,
  Zap,
  PiggyBank
} from 'lucide-react';

interface ROIInputs {
  employees: number;
  avgSalary: number;
  hoursPerWeek: number;
  repetitiveTasks: number;
  dataAnalysisHours: number;
  customerServiceHours: number;
  implementationPackage: 'starter' | 'growth' | 'enterprise';
}

const packagePricing = {
  starter: { min: 5000, max: 15000, avg: 10000 },
  growth: { min: 25000, max: 50000, avg: 37500 },
  enterprise: { min: 75000, max: 150000, avg: 100000 }
};

const automationSavings = {
  repetitiveTasks: 0.75, // 75% time savings
  dataAnalysis: 0.60, // 60% time savings
  customerService: 0.50 // 50% time savings
};

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState<ROIInputs>({
    employees: 50,
    avgSalary: 60000,
    hoursPerWeek: 40,
    repetitiveTasks: 10,
    dataAnalysisHours: 8,
    customerServiceHours: 12,
    implementationPackage: 'growth'
  });

  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const calculateROI = () => {
    const hourlyRate = inputs.avgSalary / (52 * inputs.hoursPerWeek);
    
    // Calculate weekly savings
    const repetitiveSavings = inputs.repetitiveTasks * automationSavings.repetitiveTasks * hourlyRate * inputs.employees;
    const analysisSavings = inputs.dataAnalysisHours * automationSavings.dataAnalysis * hourlyRate * inputs.employees;
    const serviceSavings = inputs.customerServiceHours * automationSavings.customerService * hourlyRate * inputs.employees;
    
    const weeklySavings = repetitiveSavings + analysisSavings + serviceSavings;
    const annualSavings = weeklySavings * 52;
    
    const implementationCost = packagePricing[inputs.implementationPackage].avg;
    const roi = ((annualSavings - implementationCost) / implementationCost) * 100;
    const paybackPeriod = implementationCost / (annualSavings / 12); // in months
    
    return {
      annualSavings: Math.round(annualSavings),
      implementationCost,
      roi: Math.round(roi),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      hoursSaved: Math.round((repetitiveSavings + analysisSavings + serviceSavings) / hourlyRate),
      productivityGain: Math.round(((repetitiveSavings + analysisSavings + serviceSavings) / (hourlyRate * inputs.employees * inputs.hoursPerWeek)) * 100)
    };
  };

  const results = calculateROI();

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to your backend/CRM
    console.log('ROI Calculator submitted:', { email, company, name, inputs, results });
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>AI ROI Calculator | Calculate Your AI Investment Return | SiteOptz</title>
        <meta name="description" content="Calculate your potential ROI from AI implementation. See projected savings, productivity gains, and payback period based on your specific business metrics." />
        <link rel="canonical" href="https://siteoptz.ai/roi-calculator" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full mb-6">
              <Calculator className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI ROI Calculator
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Calculate your potential return on investment from AI implementation based on your actual business metrics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Your Business Metrics</h2>
              
              <div className="space-y-6">
                {/* Company Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    value={inputs.employees}
                    onChange={(e) => setInputs({ ...inputs, employees: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                  />
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>Small: 1-50</span>
                    <span>Medium: 51-200</span>
                    <span>Large: 200+</span>
                  </div>
                </div>

                {/* Average Salary */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Average Annual Salary ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.avgSalary}
                    onChange={(e) => setInputs({ ...inputs, avgSalary: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Hours per Week */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Average Hours per Week
                  </label>
                  <input
                    type="number"
                    value={inputs.hoursPerWeek}
                    onChange={(e) => setInputs({ ...inputs, hoursPerWeek: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Time Spent on Tasks */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Weekly Hours Spent On:</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Repetitive/Manual Tasks
                        <span className="text-green-400 text-xs ml-2">(75% automatable)</span>
                      </label>
                      <input
                        type="number"
                        value={inputs.repetitiveTasks}
                        onChange={(e) => setInputs({ ...inputs, repetitiveTasks: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Data Analysis & Reporting
                        <span className="text-cyan-400 text-xs ml-2">(60% automatable)</span>
                      </label>
                      <input
                        type="number"
                        value={inputs.dataAnalysisHours}
                        onChange={(e) => setInputs({ ...inputs, dataAnalysisHours: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Customer Service
                        <span className="text-purple-400 text-xs ml-2">(50% automatable)</span>
                      </label>
                      <input
                        type="number"
                        value={inputs.customerServiceHours}
                        onChange={(e) => setInputs({ ...inputs, customerServiceHours: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Implementation Package */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Implementation Package
                  </label>
                  <select
                    value={inputs.implementationPackage}
                    onChange={(e) => setInputs({ ...inputs, implementationPackage: e.target.value as any })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="starter">Starter ($5K-$15K)</option>
                    <option value="growth">Growth ($25K-$50K)</option>
                    <option value="enterprise">Enterprise ($75K+)</option>
                  </select>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate ROI
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* ROI Summary Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Your Projected ROI</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Annual Savings</div>
                    <div className="text-2xl font-bold text-green-400">
                      ${results.annualSavings.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">ROI</div>
                    <div className="text-2xl font-bold text-cyan-400">
                      {results.roi}%
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Payback Period</div>
                    <div className="text-2xl font-bold text-purple-400">
                      {results.paybackPeriod} months
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Hours Saved/Week</div>
                    <div className="text-2xl font-bold text-orange-400">
                      {results.hoursSaved.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Visual ROI Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Investment</span>
                    <span className="text-sm text-gray-400">Returns (Year 1)</span>
                  </div>
                  <div className="relative h-12 bg-gray-800 rounded-lg overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-red-500/30"
                      style={{ width: `${(results.implementationCost / (results.implementationCost + results.annualSavings)) * 100}%` }}
                    />
                    <div 
                      className="absolute top-0 right-0 h-full bg-green-500/30"
                      style={{ width: `${(results.annualSavings / (results.implementationCost + results.annualSavings)) * 100}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {results.roi > 0 ? `+${results.roi}% ROI` : `${results.roi}% ROI`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Productivity Metrics */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white mb-3">Productivity Impact</h3>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white">{results.productivityGain}% Productivity Increase</div>
                      <div className="text-gray-400 text-sm">Across automated workflows</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white">{results.hoursSaved * 52} Hours Saved Annually</div>
                      <div className="text-gray-400 text-sm">Available for strategic initiatives</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white">{Math.round(results.hoursSaved / inputs.hoursPerWeek)} FTE Equivalent</div>
                      <div className="text-gray-400 text-sm">In productivity gains</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3-Year Projection */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">3-Year Projection</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year 1</span>
                    <span className="text-green-400 font-semibold">
                      ${(results.annualSavings - results.implementationCost).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year 2</span>
                    <span className="text-green-400 font-semibold">
                      ${results.annualSavings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year 3</span>
                    <span className="text-green-400 font-semibold">
                      ${results.annualSavings.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between">
                    <span className="text-white font-semibold">Total Net Gain</span>
                    <span className="text-green-400 font-bold text-xl">
                      ${((results.annualSavings * 3) - results.implementationCost).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-green-400 text-sm">
                    <strong>Note:</strong> These projections are conservative estimates. Most clients see 
                    15-25% additional savings from improved decision-making and innovation capacity.
                  </p>
                </div>
              </div>

              {/* Get Report */}
              {showResults && !submitted && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Get Your Detailed ROI Report
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Receive a customized implementation plan with specific recommendations
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Work Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                    />
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Get Detailed ROI Report
                    </button>
                  </form>
                </div>
              )}

              {submitted && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Report Sent!</h3>
                  <p className="text-gray-300 mb-4">
                    Check your email for your detailed ROI analysis
                  </p>
                  <Link href="/services" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                    View Implementation Packages
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}