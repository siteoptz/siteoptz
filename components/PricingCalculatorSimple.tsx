import { useState } from 'react';
import { Calculator, Mail, Check } from 'lucide-react';

interface Plan {
  plan: string;
  price: string;
  details: string;
}

interface SimplePricingCalculatorProps {
  plans: Plan[];
  toolName?: string;
  onSubmit?: (email: string, selectedPlan: Plan | null) => void;
}

export default function PricingCalculatorSimple({ 
  plans, 
  toolName = "Tool",
  onSubmit 
}: SimplePricingCalculatorProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email && selectedPlan) {
      if (onSubmit) {
        onSubmit(email, selectedPlan);
      } else {
        alert(`Email: ${email} - Selected Plan: ${selectedPlan?.plan}`);
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4">
      <div className="flex items-center gap-3">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">
          {toolName} Pricing Calculator
        </h2>
      </div>
      
      <select
        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => {
          const plan = plans.find((p) => p.plan === e.target.value);
          setSelectedPlan(plan || null);
        }}
        defaultValue=""
      >
        <option value="" disabled>Select a Plan</option>
        {plans.map((plan) => (
          <option key={plan.plan} value={plan.plan}>
            {plan.plan} - {plan.price}
          </option>
        ))}
      </select>

      {selectedPlan && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-semibold text-lg text-gray-900">
                {selectedPlan.plan}: {selectedPlan.price}
              </p>
              <p className="text-gray-700 mt-1">{selectedPlan.details}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Enter your email for exclusive offers"
            className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {submitted ? (
          <div className="w-full bg-green-100 text-green-700 p-3 rounded-lg text-center font-semibold">
            ✅ Thank you! Check your email for details.
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!selectedPlan || !email}
            className={`w-full p-3 rounded-lg font-semibold transition-all ${
              selectedPlan && email
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Get Pricing Details
          </button>
        )}
      </div>

      {/* Optional: Add trust badges */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
          <span>🔒 SSL Secured</span>
          <span>✉️ No Spam</span>
          <span>💳 No Card Required</span>
        </div>
      </div>
    </div>
  );
}