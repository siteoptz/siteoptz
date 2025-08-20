import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, Zap, TrendingUp, Mail, ChevronDown, X, Plus, User, Phone, Building, MessageCircle, Filter } from 'lucide-react';
import GuideDownloadModal from './GuideDownloadModal';

interface Tool {
  id: string;
  slug: string;
  name: string;
  pricing: {
    plan: string;
    price_per_month: number;
    features: string[];
  }[];
  category?: string;
  overview?: {
    category?: string;
  };
}

interface SelectedToolPlan {
  toolId: string;
  toolName: string;
  planName: string;
  pricePerMonth: number;
  features: string[];
  usageLevel: number;
}

interface ExpertFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  interestedTools: string[];
  budget: string;
  timeline: string;
}

interface EnhancedPricingCalculatorProps {
  tools: Tool[];
  onEmailSubmit?: (email: string, data?: any) => void;
}

const EnhancedPricingCalculator: React.FC<EnhancedPricingCalculatorProps> = ({ tools, onEmailSubmit }) => {
  const [selectedTools, setSelectedTools] = useState<SelectedToolPlan[]>([]);
  const [teamSize, setTeamSize] = useState(5);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [expertForm, setExpertForm] = useState<ExpertFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    interestedTools: [],
    budget: '',
    timeline: ''
  });
  const [isSubmittingExpert, setIsSubmittingExpert] = useState(false);

  // Process tools data
  const processedTools = useMemo(() => {
    if (!tools || tools.length === 0) return [];
    
    return tools
      .filter(tool => tool.pricing && Array.isArray(tool.pricing) && tool.pricing.length > 0)
      .map(tool => ({
        ...tool,
        pricing: tool.pricing.filter(plan => plan && typeof plan === 'object')
      }))
      .filter(tool => tool.pricing.length > 0);
  }, [tools]);

  // Extract unique categories from tools
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    
    processedTools.forEach(tool => {
      const category = tool.overview?.category || tool.category || 'Other';
      categorySet.add(category);
    });
    
    return Array.from(categorySet).sort();
  }, [processedTools]);

  // Filter tools by selected category
  const filteredTools = useMemo(() => {
    if (selectedCategory === 'all') {
      return processedTools;
    }
    
    return processedTools.filter(tool => {
      const toolCategory = tool.overview?.category || tool.category || 'Other';
      return toolCategory === selectedCategory;
    });
  }, [processedTools, selectedCategory]);

  // Add a tool to comparison
  const addToolToComparison = (toolId: string) => {
    if (selectedTools.length >= 5) return;
    
    const tool = processedTools.find(t => t.id === toolId);
    if (!tool || selectedTools.some(st => st.toolId === toolId)) return;

    const defaultPlan = tool.pricing[0];
    const newSelection: SelectedToolPlan = {
      toolId: tool.id,
      toolName: tool.name,
      planName: defaultPlan.plan,
      pricePerMonth: defaultPlan.price_per_month,
      features: defaultPlan.features,
      usageLevel: 50
    };

    setSelectedTools([...selectedTools, newSelection]);
  };

  // Remove tool from comparison
  const removeToolFromComparison = (toolId: string) => {
    setSelectedTools(selectedTools.filter(st => st.toolId !== toolId));
  };

  // Update tool plan
  const updateToolPlan = (toolId: string, planName: string) => {
    const tool = processedTools.find(t => t.id === toolId);
    if (!tool) return;

    const plan = tool.pricing.find(p => p.plan === planName);
    if (!plan) return;

    setSelectedTools(selectedTools.map(st => 
      st.toolId === toolId 
        ? { ...st, planName, pricePerMonth: plan.price_per_month, features: plan.features }
        : st
    ));
  };

  // Update usage level
  const updateUsageLevel = (toolId: string, usageLevel: number) => {
    setSelectedTools(selectedTools.map(st => 
      st.toolId === toolId ? { ...st, usageLevel } : st
    ));
  };

  // Calculate total cost
  const totalCost = useMemo(() => {
    const baseTotal = selectedTools.reduce((total, tool) => {
      const usageMultiplier = tool.usageLevel / 100;
      const toolCost = tool.pricePerMonth * teamSize * usageMultiplier;
      return total + toolCost;
    }, 0);

    if (billingCycle === 'annual') {
      return baseTotal * 12 * 0.85; // 15% annual discount
    }
    return baseTotal;
  }, [selectedTools, teamSize, billingCycle]);

  // Format price
  const formatPrice = (price: number | string) => {
    if (price === 0 || price === '0') return 'Free';
    if (typeof price === 'string' && (price.toLowerCase() === 'custom' || price.toLowerCase() === 'free')) {
      return price;
    }
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice) || numPrice <= 0) return 'Custom';
    if (numPrice >= 10000) return `$${(numPrice / 1000).toFixed(1)}K`;
    return `$${Math.round(numPrice).toLocaleString()}`;
  };

  // Handle expert form submission
  const handleExpertFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingExpert(true);

    try {
      // Add selected tools to interested tools and include pricing info
      const updatedForm = {
        ...expertForm,
        interestedTools: [...expertForm.interestedTools, ...selectedTools.map(t => t.toolName)],
        totalCost: totalCost,
        billingCycle: billingCycle
      };

      // Debug logging
      console.log('👨‍💼 Submitting expert consultation form:', updatedForm);
      const apiUrl = '/api/expert-consultation';
      console.log(`🔍 Making API call to: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedForm),
      });

      console.log(`📨 Response status: ${response.status} ${response.statusText}`);
      const result = await response.json();

      if (response.ok && result.success) {
        // Reset form and close modal
        setExpertForm({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          interestedTools: [],
          budget: '',
          timeline: ''
        });
        setShowExpertModal(false);
        alert(result.message || 'Thank you! An expert will contact you within 24 hours.');
      } else {
        throw new Error(result.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting expert form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error submitting request. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmittingExpert(false);
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mobile-safe">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 border border-gray-700 rounded-full mb-4">
          <Calculator className="w-6 h-6 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Multi-Tool Pricing Calculator</h2>
        <p className="text-gray-300">Compare up to 5 AI tools and estimate your monthly expenses</p>
      </div>

      {/* Global Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 p-4 sm:p-6 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Team Size</label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="1"
              max="100"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-lg font-semibold text-cyan-400 min-w-[60px]">{teamSize}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Billing Cycle</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="monthly"
                checked={billingCycle === 'monthly'}
                onChange={(e) => setBillingCycle(e.target.value as 'monthly')}
                className="mr-2 text-cyan-400"
              />
              <span className="text-sm text-gray-300">Monthly</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="annual"
                checked={billingCycle === 'annual'}
                onChange={(e) => setBillingCycle(e.target.value as 'annual')}
                className="mr-2 text-cyan-400"
              />
              <span className="text-sm text-gray-300">Annual (15% off)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Tool Selection */}
      {selectedTools.length < 5 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <h3 className="text-lg font-semibold whitespace-nowrap text-white">Add Tools to Compare</h3>
              {selectedCategory !== 'all' && (
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-gray-800 border border-gray-700 text-cyan-400 text-sm rounded-full">
                    {selectedCategory} ({filteredTools.length})
                  </span>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-gray-400 hover:text-red-400 underline"
                  >
                    Clear filter
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                <Filter className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Filter by Category:</span>
              </div>
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none w-full sm:min-w-[200px] px-3 sm:px-4 py-2 pr-8 border border-gray-700 rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 bg-gray-800 text-white font-medium text-sm"
                >
                  <option value="all">All Categories ({processedTools.length})</option>
                  {categories.map((category) => {
                    const count = processedTools.filter(tool => 
                      (tool.overview?.category || tool.category || 'Other') === category
                    ).length;
                    return (
                      <option key={category} value={category}>
                        {category} ({count})
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {filteredTools.length === 0 ? (
            <div className="text-center py-8 bg-gray-900 border border-gray-800 rounded-lg">
              <p className="text-gray-400">No tools found in the selected category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-2 text-cyan-400 hover:text-cyan-300 font-medium"
              >
                View all tools
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-hidden">
              {filteredTools
                .filter(tool => !selectedTools.some(st => st.toolId === tool.id))
                .slice(0, 12)
                .map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => addToolToComparison(tool.id)}
                    className="p-3 border border-gray-800 bg-gray-900 rounded-lg hover:border-cyan-400 hover:bg-gray-800 transition-colors text-left group"
                  >
                    <div className="font-medium text-sm truncate text-white group-hover:text-cyan-400">
                      {tool.name}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {tool.overview?.category || tool.category || 'AI Tool'}
                    </div>
                    <div className="text-xs text-cyan-400 mt-1 font-medium">
                      From {formatPrice(tool.pricing[0]?.price_per_month || 0)}/mo
                    </div>
                    {tool.pricing.length > 1 && (
                      <div className="text-xs text-gray-400 mt-1">
                        {tool.pricing.length} plans available
                      </div>
                    )}
                  </button>
                ))}
            </div>
          )}
          
          {filteredTools.filter(tool => !selectedTools.some(st => st.toolId === tool.id)).length > 12 && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Showing 12 of {filteredTools.filter(tool => !selectedTools.some(st => st.toolId === tool.id)).length} tools
              </p>
            </div>
          )}
        </div>
      )}

      {/* Selected Tools Comparison */}
      {selectedTools.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Comparing {selectedTools.length} Tool{selectedTools.length > 1 ? 's' : ''}
          </h3>
          
          <div className="grid gap-6">
            {selectedTools.map((selectedTool) => {
              const tool = processedTools.find(t => t.id === selectedTool.toolId);
              if (!tool) return null;

              const adjustedPrice = selectedTool.pricePerMonth * teamSize * (selectedTool.usageLevel / 100);
              const finalPrice = billingCycle === 'annual' ? adjustedPrice * 12 * 0.85 : adjustedPrice;

              return (
                <div key={selectedTool.toolId} className="bg-black border border-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <h4 className="text-lg font-semibold text-white">{selectedTool.toolName}</h4>
                      <span className="ml-2 px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded-full">
                        {tool.overview?.category || tool.category || 'AI Tool'}
                      </span>
                    </div>
                    <button
                      onClick={() => removeToolFromComparison(selectedTool.toolId)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Plan Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Plan</label>
                      <select
                        value={selectedTool.planName}
                        onChange={(e) => updateToolPlan(selectedTool.toolId, e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      >
                        {tool.pricing.map((plan) => (
                          <option key={plan.plan} value={plan.plan}>
                            {plan.plan} - {formatPrice(plan.price_per_month)}/mo
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Usage Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Usage Level: {selectedTool.usageLevel}%
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="10"
                        value={selectedTool.usageLevel}
                        onChange={(e) => updateUsageLevel(selectedTool.toolId, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Light</span>
                        <span>Heavy</span>
                      </div>
                    </div>

                    {/* Cost */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {billingCycle === 'annual' ? 'Annual Cost' : 'Monthly Cost'}
                      </label>
                      <div className="text-2xl font-bold text-cyan-400">
                        {formatPrice(finalPrice)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {billingCycle === 'annual' ? 'per year' : 'per month'}
                      </div>
                    </div>
                  </div>

                  {/* Features Preview */}
                  <div className="mt-4">
                    <div className="text-sm text-gray-300">
                      <strong className="text-white">Includes:</strong> {selectedTool.features.slice(0, 3).join(', ')}
                      {selectedTool.features.length > 3 && ` +${selectedTool.features.length - 3} more`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Total Cost Summary */}
      {selectedTools.length > 0 && (
        <div className="bg-black border border-gray-800 p-6 rounded-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Total Cost Summary</h3>
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{formatPrice(totalCost)}</div>
              <div className="text-sm text-gray-300">
                Total {billingCycle === 'annual' ? 'Annual' : 'Monthly'} Cost
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{selectedTools.length}</div>
              <div className="text-sm text-gray-300">Tools Selected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{teamSize}</div>
              <div className="text-sm text-gray-300">Team Members</div>
            </div>
          </div>

          {billingCycle === 'annual' && totalCost > 0 && (
            <div className="mt-4 p-3 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="text-sm text-green-400 text-center">
                💰 You save {formatPrice(totalCost * 0.176)} per year with annual billing!
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Contact for Pricing */}
        <a
          href="/contact/"
          className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <User className="w-5 h-5 mr-2" />
          Contact for Pricing
        </a>

        {/* Get Pricing Guide */}
        <button
          onClick={() => setShowGuideModal(true)}
          className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg border border-gray-700"
        >
          <Mail className="w-5 h-5 mr-2" />
          Get Free Pricing Guide
        </button>
      </div>

      {/* Guide Download Modal */}
      {showGuideModal && (
        <GuideDownloadModal
          isOpen={showGuideModal}
          onClose={() => setShowGuideModal(false)}
          onDownload={(data) => {
            console.log('Guide download request:', data);
            // The modal handles the download API call internally
          }}
        />
      )}

      {/* Expert Consultation Modal */}
      {showExpertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto h-full w-full z-50 p-4">
          <div className="relative top-10 mx-auto p-4 sm:p-5 border border-gray-800 w-full max-w-2xl shadow-lg rounded-md bg-black">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Connect with an AI Expert</h3>
              <button
                onClick={() => setShowExpertModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleExpertFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={expertForm.firstName}
                    onChange={(e) => setExpertForm({...expertForm, firstName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={expertForm.lastName}
                    onChange={(e) => setExpertForm({...expertForm, lastName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={expertForm.email}
                    onChange={(e) => setExpertForm({...expertForm, email: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={expertForm.phone}
                    onChange={(e) => setExpertForm({...expertForm, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Company *</label>
                <input
                  type="text"
                  required
                  value={expertForm.company}
                  onChange={(e) => setExpertForm({...expertForm, company: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Budget Range</label>
                  <select
                    value={expertForm.budget}
                    onChange={(e) => setExpertForm({...expertForm, budget: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="">Select budget...</option>
                    <option value="<$1K">Less than $1,000/month</option>
                    <option value="$1K-$5K">$1,000 - $5,000/month</option>
                    <option value="$5K-$15K">$5,000 - $15,000/month</option>
                    <option value="$15K+">$15,000+/month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Timeline</label>
                  <select
                    value={expertForm.timeline}
                    onChange={(e) => setExpertForm({...expertForm, timeline: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="">Select timeline...</option>
                    <option value="Immediate">Immediate (this week)</option>
                    <option value="Short">Short term (1-2 months)</option>
                    <option value="Medium">Medium term (3-6 months)</option>
                    <option value="Long">Long term (6+ months)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tell us about your AI needs
                </label>
                <textarea
                  rows={4}
                  value={expertForm.message}
                  onChange={(e) => setExpertForm({...expertForm, message: e.target.value})}
                  placeholder="What AI challenges are you looking to solve? What's your current setup?"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
                />
              </div>

              {selectedTools.length > 0 && (
                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Tools in your comparison:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTools.map((tool) => (
                      <span key={tool.toolId} className="px-2 py-1 bg-gray-800 text-cyan-400 text-sm rounded">
                        {tool.toolName}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-300 mt-2">
                    Total estimated cost: {formatPrice(totalCost)} {billingCycle === 'annual' ? '/year' : '/month'}
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmittingExpert}
                  className="flex-1 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                >
                  {isSubmittingExpert ? 'Submitting...' : 'Schedule Consultation'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowExpertModal(false)}
                  className="px-6 py-3 border border-gray-600 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedPricingCalculator;