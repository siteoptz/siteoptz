import React, { useState, useMemo } from 'react';
import { Calculator, Users, Zap, DollarSign, Calendar } from 'lucide-react';

export default function PricingCalculator({ selectedTools = [] }) {
  const [inputs, setInputs] = useState({
    teamSize: 1,
    monthlyUsage: 'low',
    paymentCycle: 'monthly',
  });

  // Usage multipliers
  const usageMultipliers = {
    low: 1,
    medium: 1.5,
    high: 2.5,
  };

  // Calculate pricing for each tool
  const calculations = useMemo(() => {
    const results = {};
    
    selectedTools.forEach(tool => {
      const basePrice = inputs.paymentCycle === 'yearly' 
        ? tool.pricingPlans.find(p => p.annualPrice > 0)?.annualPrice || 0
        : tool.pricingPlans.find(p => p.monthlyPrice > 0)?.monthlyPrice || 0;
      
      const usageMultiplier = usageMultipliers[inputs.monthlyUsage];
      
      // Calculate per-user pricing
      let perUserPrice = basePrice;
      if (basePrice < 50) {
        // For lower-priced tools, assume per-user pricing
        perUserPrice = basePrice * inputs.teamSize;
      } else {
        // For higher-priced tools, assume team pricing with discounts
        const teamDiscount = inputs.teamSize > 5 ? 0.8 : inputs.teamSize > 2 ? 0.9 : 1;
        perUserPrice = basePrice * teamDiscount;
      }

      // Apply usage multiplier
      const totalPrice = perUserPrice * usageMultiplier;
      
      // Calculate savings
      const monthlyPrice = inputs.paymentCycle === 'yearly' 
        ? tool.pricingPlans.find(p => p.monthlyPrice > 0)?.monthlyPrice || 0 
        : basePrice;
      const yearlyPrice = inputs.paymentCycle === 'yearly' ? totalPrice : totalPrice * 12;
      const savings = inputs.paymentCycle === 'yearly' ? (monthlyPrice * 12 - yearlyPrice) : 0;

      results[tool.id] = {
        monthlyPrice: inputs.paymentCycle === 'yearly' ? yearlyPrice / 12 : totalPrice,
        yearlyPrice: inputs.paymentCycle === 'yearly' ? yearlyPrice : totalPrice * 12,
        savings: savings,
        perUserPrice: perUserPrice / inputs.teamSize,
        totalPrice: totalPrice,
        basePrice: basePrice,
      };
    });

    return results;
  }, [selectedTools, inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getUsageDescription = (usage) => {
    switch (usage) {
      case 'low': return 'Light usage (1-2 hours/week)';
      case 'medium': return 'Moderate usage (5-10 hours/week)';
      case 'high': return 'Heavy usage (20+ hours/week)';
      default: return '';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">AI Tool Pricing Calculator</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate the total cost for your team based on size, usage, and payment cycle.
        </p>
      </div>

      {/* Input Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Configuration
          </CardTitle>
          <CardDescription>
            Adjust these settings to see how pricing changes for your specific needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                              <label htmlFor="teamSize" className="text-sm font-medium text-gray-700 block">Team Size</label>
              <input
                id="teamSize"
                type="number"
                min="1"
                max="100"
                value={inputs.teamSize}
                onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500">
                Number of team members using the tools
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyUsage">Monthly Usage</Label>
              <Select
                value={inputs.monthlyUsage}
                onValueChange={(value) => handleInputChange('monthlyUsage', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select usage level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Usage</SelectItem>
                  <SelectItem value="medium">Medium Usage</SelectItem>
                  <SelectItem value="high">High Usage</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                {getUsageDescription(inputs.monthlyUsage)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentCycle">Payment Cycle</Label>
              <Select
                value={inputs.paymentCycle}
                onValueChange={(value) => handleInputChange('paymentCycle', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly (Save 10-20%)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Choose between monthly or annual billing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tool Selection */}
      {selectedTools.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select Tools to Compare
            </h3>
            <p className="text-gray-500">
              Choose the AI tools you're interested in to see pricing comparisons.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Individual Tool Pricing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedTools.map(tool => {
              const calc = calculations[tool.id];
              if (!calc) return null;

              return (
                <Card key={tool.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img 
                          src={tool.logo} 
                          alt={`${tool.name} logo`}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder-logo.png';
                          }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription>by {tool.vendor}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(calc.monthlyPrice)}
                        </div>
                        <div className="text-sm text-gray-600">Monthly</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(calc.yearlyPrice)}
                        </div>
                        <div className="text-sm text-gray-600">Yearly</div>
                      </div>
                    </div>

                    {calc.savings > 0 && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-green-700">Yearly Savings:</span>
                        <span className="font-semibold text-green-700">
                          {formatCurrency(calc.savings)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Per User/Month:</span>
                      <span className="font-semibold">{formatCurrency(calc.perUserPrice)}</span>
                    </div>

                    <Button 
                      className="w-full" 
                      asChild
                    >
                      <a
                        href={tool.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Started with {tool.name}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Cost Summary
              </CardTitle>
              <CardDescription>
                Total cost for all selected tools based on your configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-900">
                    {formatCurrency(
                      selectedTools.reduce((sum, tool) => {
                        const calc = calculations[tool.id];
                        return sum + (calc ? calc.monthlyPrice : 0);
                      }, 0)
                    )}
                  </div>
                  <div className="text-sm text-blue-700 font-medium">Total Monthly Cost</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatCurrency(
                      selectedTools.reduce((sum, tool) => {
                        const calc = calculations[tool.id];
                        return sum + (calc ? calc.yearlyPrice : 0);
                      }, 0)
                    )}
                  </div>
                  <div className="text-sm text-gray-700 font-medium">Total Yearly Cost</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-900">
                    {formatCurrency(
                      selectedTools.reduce((sum, tool) => {
                        const calc = calculations[tool.id];
                        return sum + (calc ? calc.savings : 0);
                      }, 0)
                    )}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Total Savings</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Configuration Details:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{inputs.teamSize} team member{inputs.teamSize > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>{inputs.monthlyUsage.charAt(0).toUpperCase() + inputs.monthlyUsage.slice(1)} usage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{inputs.paymentCycle.charAt(0).toUpperCase() + inputs.paymentCycle.slice(1)} billing</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
