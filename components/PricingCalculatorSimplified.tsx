import { useState, useEffect } from 'react';
import { Calculator, Mail, Check, TrendingUp } from 'lucide-react';

interface Plan {
  plan: string;
  price_per_month: number;
  features: string[];
}

interface PricingCalculatorSimplifiedProps {
  plans: Plan[];
  toolName?: string;
  enablePersistence?: boolean;
  onEmailSubmit?: (email: string, plan: Plan) => void;
}

export default function PricingCalculatorSimplified({ 
  plans, 
  toolName = "Tool",
  enablePersistence = false,
  onEmailSubmit 
}: PricingCalculatorSimplifiedProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Load saved selections from localStorage
  useEffect(() => {
    if (enablePersistence && typeof window !== 'undefined') {
      const savedPlan = localStorage.getItem(`${toolName}-selectedPlan`);
      const savedUsers = localStorage.getItem(`${toolName}-users`);
      
      if (savedPlan) {
        const plan = plans.find(p => p.plan === savedPlan);
        if (plan) setSelectedPlan(plan);
      }
      
      if (savedUsers) {
        setUsers(parseInt(savedUsers) || 1);
      }
    }
  }, [plans, toolName, enablePersistence]);

  // Save selections to localStorage when they change
  useEffect(() => {
    if (enablePersistence && typeof window !== 'undefined' && selectedPlan) {
      localStorage.setItem(`${toolName}-selectedPlan`, selectedPlan.plan);
    }
  }, [selectedPlan, toolName, enablePersistence]);

  useEffect(() => {
    if (enablePersistence && typeof window !== 'undefined') {
      localStorage.setItem(`${toolName}-users`, users.toString());
    }
  }, [users, toolName, enablePersistence]);

  const handleSubmit = () => {
    if (email && selectedPlan) {
      if (onEmailSubmit) {
        onEmailSubmit(email, selectedPlan);
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const calculateTotal = () => {
    if (!selectedPlan) return 0;
    return selectedPlan.price_per_month * users;
  };

  const calculateAnnual = () => {
    return calculateTotal() * 12;
  };

  const calculateAnnualSavings = () => {
    const annual = calculateAnnual();
    const annualWithDiscount = annual * 0.85; // 15% discount
    return annual - annualWithDiscount;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6" />
          <h2 className="text-xl font-bold">
            {toolName} Pricing Calculator
          </h2>
        </div>
        <p className="text-blue-100">Calculate your investment and get personalized recommendations</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Plan
          </label>
          <div className="grid gap-3">
            {plans.map((plan) => (
              <button
                key={plan.plan}
                onClick={() => setSelectedPlan(plan)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedPlan?.plan === plan.plan
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{plan.plan}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {plan.price_per_month === 0 ? 'Free' : `$${plan.price_per_month}`}
                    </div>
                    {plan.price_per_month > 0 && (
                      <div className="text-sm text-gray-500">/month</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {plan.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {plan.features.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{plan.features.length - 3} more
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedPlan && (
          <>
            {/* Users/Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Users/Seats
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={users}
                onChange={(e) => setUsers(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Calculation Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Cost Summary</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Monthly Total</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${calculateTotal().toFixed(2)}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Annual Total</div>
                  <div className="text-xl font-semibold text-gray-700">
                    ${calculateAnnual().toFixed(2)}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Annual Savings
                  </div>
                  <div className="text-xl font-semibold text-green-600">
                    ${calculateAnnualSavings().toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Features for selected plan */}
              <div className="border-t border-blue-200 pt-4">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Included Features:
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Email Capture */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Get Personalized Recommendations & Exclusive Offers
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {submitted ? (
                <div className="w-full bg-green-100 text-green-700 p-3 rounded-lg text-center font-semibold">
                  ✅ Thank you! Check your email for exclusive offers.
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!email}
                  className={`w-full p-3 rounded-lg font-semibold transition-all ${
                    email
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Get Pricing Details & Recommendations
                </button>
              )}
            </div>
          </>
        )}

        {/* Trust Badges */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              🔒 SSL Secured
            </span>
            <span className="flex items-center gap-1">
              ✉️ No Spam Policy
            </span>
            <span className="flex items-center gap-1">
              💳 No Card Required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}