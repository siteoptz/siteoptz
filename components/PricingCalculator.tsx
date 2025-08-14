import { useState, useEffect } from "react";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
}

interface PricingCalculatorProps {
  plans: PricingPlan[];
  toolName: string;
  enablePersistence?: boolean;
}

export default function PricingCalculator({ plans, toolName, enablePersistence }: PricingCalculatorProps) {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [email, setEmail] = useState("");
  const [quoteSaved, setQuoteSaved] = useState(false);
  const [discount, setDiscount] = useState<string | null>(null);
  const [discountExpired, setDiscountExpired] = useState(false);

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

        const matchPlan = plans.find((p) => p.name === data.selectedPlan);
        if (matchPlan) {
          setSelectedPlan(matchPlan);
        }

        if (data.discountCode) {
          setDiscount(data.discountCode);
          applyDiscount(data.discountCode);
        }
      });
  }, [plans]);

  // Apply discount logic
  const applyDiscount = (code: string) => {
    if (code === "SUMMER2025") {
      setSelectedPlan((prev) => ({
        ...prev,
        price: `${(parseFloat(prev.price.replace("$", "")) * 0.9).toFixed(2)} (10% OFF)`,
      }));
    }
  };

  const handlePlanChange = (planName) => {
    const plan = plans.find((p) => p.name === planName);
    setSelectedPlan(plan);
    if (enablePersistence) {
      localStorage.setItem(`pricingPlan_${toolName}`, planName);
    }
  };

  const handleSaveQuote = async (e) => {
    e.preventDefault();
    localStorage.setItem(`quoteEmail_${toolName}`, email);

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

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <label className="block font-medium">Choose a plan:</label>
      <select
        value={selectedPlan.name}
        onChange={(e) => handlePlanChange(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      >
        {plans.map((plan) => (
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
              className="border rounded px-3 py-2 flex-1 text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setDiscount(e.target.value);
                  applyDiscount(e.target.value);
                }
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                const input = e.target.previousElementSibling;
                setDiscount(input.value);
                applyDiscount(input.value);
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