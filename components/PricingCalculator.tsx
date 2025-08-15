import React, { useState, useEffect, useRef } from "react";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
}

interface Tool {
  id: string;
  slug: string;
  name: string;
  pricing: {
    plan: string;
    price_per_month: number;
    features: string[];
  }[];
  [key: string]: any;
}

interface PricingCalculatorProps {
  tools?: Tool[];
  onEmailSubmit?: (email: string, data?: any) => void;
  // Legacy props for backward compatibility
  plans?: PricingPlan[];
  toolName?: string;
  enablePersistence?: boolean;
}

export default function PricingCalculator({ 
  tools, 
  onEmailSubmit, 
  plans, 
  toolName, 
  enablePersistence 
}: PricingCalculatorProps) {
  // Convert tools to plans format if tools are provided
  const convertedPlans = tools ? tools.flatMap(tool => 
    tool.pricing.map(p => {
      let price: string;
      
      // Check if this is actually enterprise/custom pricing vs truly free
      const isEnterpriseOrCustom = p.price_per_month === 0 && 
        (p.plan?.toLowerCase().includes('enterprise') || 
         p.plan?.toLowerCase().includes('custom') ||
         p.features?.some((f: string) => f.toLowerCase().includes('custom pricing')));
      
      const isTrulyFree = p.price_per_month === 0 && 
        p.plan?.toLowerCase().includes('free');
      
      if (isEnterpriseOrCustom) {
        price = 'Custom';
      } else if (isTrulyFree) {
        price = 'Free';
      } else if (p.price_per_month === 0) {
        price = 'Custom'; // Default for 0 price when not explicitly free
      } else {
        price = `$${p.price_per_month}`;
      }
      
      return {
        name: `${tool.name} - ${p.plan}`,
        price,
        features: p.features
      };
    })
  ) : plans || [];

  const [selectedPlan, setSelectedPlan] = useState(convertedPlans[0] || null);
  const [email, setEmail] = useState("");
  const [quoteSaved, setQuoteSaved] = useState(false);
  const [discount, setDiscount] = useState<string | null>(null);
  const [discountExpired, setDiscountExpired] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quoteId = params.get("quoteId");

    if (!quoteId) return;

    fetch(`/api/get-quote?quoteId=${quoteId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.expired) {
          setDiscountExpired(true);
          return;
        }

        const matchPlan = convertedPlans.find((p) => p.name === data.selectedPlan);
        if (matchPlan) {
          setSelectedPlan(matchPlan);
        }

        if (data.discountCode) {
          setDiscount(data.discountCode);
          applyDiscount(data.discountCode);
        }
      });
  }, [convertedPlans]);

  // Apply discount logic
  const applyDiscount = (code: string) => {
    if (code === "SUMMER2025") {
      setSelectedPlan((prev) => ({
        ...prev,
        price: `${(parseFloat(prev.price.replace("$", "")) * 0.9).toFixed(2)} (10% OFF)`,
      }));
    }
  };

  const handlePlanChange = (planName: string) => {
    const plan = convertedPlans.find((p) => p.name === planName);
    if (plan) {
      setSelectedPlan(plan);
    }
    if (enablePersistence && toolName) {
      localStorage.setItem(`pricingPlan_${toolName}`, planName);
    }
  };

  const handleSaveQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (toolName) {
      localStorage.setItem(`quoteEmail_${toolName}`, email);
    }

    // Use onEmailSubmit if provided (new usage)
    if (onEmailSubmit) {
      onEmailSubmit(email, {
        selectedPlan: selectedPlan.name,
        discountCode: discount,
        source: 'pricing_calculator'
      });
      setQuoteSaved(true);
      return;
    }

    // Fall back to legacy API call
    try {
      const response = await fetch("/api/save-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          toolName,
          selectedPlan: selectedPlan.name,
          discountCode: discount,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setQuoteSaved(true);
        console.log("Quote saved with deep link:", data.deepLink);
      }
    } catch (error) {
      console.error("Error saving quote:", error);
    }
  };

  if (!selectedPlan || convertedPlans.length === 0) {
    return (
      <div className="border rounded-lg p-4 space-y-4">
        <p className="text-gray-500">No pricing plans available.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <label className="block font-medium">Choose a plan:</label>
      <select
        value={selectedPlan.name}
        onChange={(e) => handlePlanChange(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      >
        {convertedPlans.map((plan) => (
          <option key={plan.name} value={plan.name}>
            {plan.name} — {plan.price}
          </option>
        ))}
      </select>

      <div className="text-lg">
        {discount && !discountExpired && (
          <div className="p-2 bg-yellow-100 text-yellow-800 rounded">
            🎉 Discount code <strong>{discount}</strong> applied!  
            You saved 10% on your plan.
          </div>
        )}

        {discountExpired && (
          <div className="p-2 bg-red-100 text-red-800 rounded">
            ⏳ Sorry, your discount code has expired.  
            Contact our team for current offers.
          </div>
        )}
        
        <strong>Total Price:</strong> {selectedPlan.price}
      </div>

      {/* Discount Code Input */}
      {!discount && !discountExpired && (
        <div className="space-y-2">
          <label className="block font-medium text-sm">Have a discount code?</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="border rounded px-3 py-2 flex-1 text-sm"
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  setDiscount(discountCode);
                  applyDiscount(discountCode);
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                setDiscount(discountCode);
                applyDiscount(discountCode);
              }}
              className="bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Lead capture form */}
      {!quoteSaved ? (
        <form onSubmit={handleSaveQuote} className="space-y-3 mt-4">
          <label className="block font-medium">Email me this quote:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="border rounded px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            Save My Quote
          </button>
        </form>
      ) : (
        <div className="p-3 bg-green-100 text-green-800 rounded">
          ✅ Your quote has been saved and emailed to you!
        </div>
      )}
    </div>
  );
}