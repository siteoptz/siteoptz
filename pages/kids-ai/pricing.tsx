import React from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import { kidsAIPricingPlans, kidsAIFreeTier } from '../../data/kidsAIPricingPlans';
import SafetyBadge from '../../components/kids/SafetyBadge';

export default function KidsAIPricing() {
  const plans = Object.values(kidsAIPricingPlans);

  return (
    <>
      <SEOHead
        title="Kids AI Tools Pricing | Safe AI Directory for Children"
        description="Choose the right plan for safe, COPPA-compliant AI tools for your children. Parent Pro, Educator, and School plans available."
        canonicalUrl="https://siteoptz.ai/kids-ai/pricing"
        keywords={['kids AI pricing', 'COPPA compliant AI tools', 'safe AI for children', 'educational AI subscription']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Kids AI Plan
            </h1>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Get access to 200+ safety-certified AI tools PLUS our revolutionary AI coding platform for children
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <SafetyBadge type="coppa" />
              <SafetyBadge type="safetyCertified" />
              <SafetyBadge type="teacherApproved" />
            </div>
          </div>

          {/* Free Tier */}
          <div className="mb-8">
            <div className="bg-black border border-gray-800 rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Free Access</h3>
                  <p className="text-gray-300">{kidsAIFreeTier.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">Free</div>
                  <div className="text-gray-400 text-sm">Forever</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">What&apos;s Included:</h4>
                  <ul className="space-y-2">
                    {kidsAIFreeTier.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-300">{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Limitations:</h4>
                  <ul className="space-y-2">
                    {kidsAIFreeTier.limitations.map((limitation, idx) => (
                      <li key={idx} className="text-sm text-gray-400">{limitation}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <Link
                  href="/kids-ai"
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Start with Free Access
                </Link>
              </div>
            </div>
          </div>

          {/* Paid Plans */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`
                  bg-black border rounded-2xl p-6 relative
                  ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-800'}
                `}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    {typeof plan.price === 'number' ? (
                      <>
                        <span className="text-4xl font-bold text-white">${plan.price}</span>
                        <span className="text-gray-400">/{plan.period}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-white">Custom Pricing</span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 text-sm mt-1">✓</span>
                      <span className="text-sm text-gray-300">{feature.replace('✓ ', '')}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2 mb-6 pb-6 border-b border-gray-800">
                    {plan.limitations.slice(0, 3).map((limitation, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-gray-500 text-sm mt-1">✗</span>
                        <span className="text-xs text-gray-500">{limitation.replace('✗ ', '')}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  {plan.contactSales ? (
                    <Link
                      href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Contact Sales
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        // In a real app, this would integrate with Stripe
                        console.log(`Subscribe to ${plan.name}`);
                        alert('Stripe integration would go here');
                      }}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Get Started
                    </button>
                  )}
                  
                  <p className="text-xs text-gray-500 text-center">
                    {plan.contactSales ? 
                      'Custom implementation and pricing' : 
                      'Cancel anytime • 30-day money-back guarantee'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* AI Coding Platform Highlight */}
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 mb-8 border border-purple-700">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold text-white mb-4">NEW: AI Coding Platform Included!</h2>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                All paid plans now include access to our revolutionary AI coding platform where kids build 
                real projects using OpenAI, DALL-E, and other AI APIs in a safe environment.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black/30 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-lg font-bold text-white mb-2">Story Generators</h3>
                <p className="text-gray-300 text-sm">Create interactive stories with AI</p>
              </div>
              <div className="bg-black/30 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">🖼️</div>
                <h3 className="text-lg font-bold text-white mb-2">Image Creators</h3>
                <p className="text-gray-300 text-sm">Generate art with DALL-E AI</p>
              </div>
              <div className="bg-black/30 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="text-lg font-bold text-white mb-2">Smart Chatbots</h3>
                <p className="text-gray-300 text-sm">Build AI assistants that learn</p>
              </div>
              <div className="bg-black/30 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">🎮</div>
                <h3 className="text-lg font-bold text-white mb-2">AI Games</h3>
                <p className="text-gray-300 text-sm">Create intelligent game companions</p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Link
                href="/kids-ai/coding"
                className="bg-white text-purple-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Explore Coding Platform 🚀
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-white mb-2">Is this safe for my children?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Yes! All tools are COPPA-compliant and safety-certified. We verify each tool&apos;s privacy practices, content moderation, and age-appropriateness.
                </p>
                
                <h3 className="font-semibold text-white mb-2">What ages are supported?</h3>
                <p className="text-gray-300 text-sm">
                  Our directory covers AI tools for children ages 5-18, with clear age range filtering and recommendations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Yes, all paid plans can be canceled anytime with no cancellation fees. We also offer a 30-day money-back guarantee.
                </p>
                
                <h3 className="font-semibold text-white mb-2">Do you offer educator discounts?</h3>
                <p className="text-gray-300 text-sm">
                  Yes! Our Educator plan includes special pricing for teachers, and we offer custom school/district packages.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">Trusted by Families Worldwide</h3>
            <div className="flex justify-center items-center gap-8 flex-wrap text-gray-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">10,000+</div>
                <div className="text-sm">Parent Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">200+</div>
                <div className="text-sm">Certified Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">100%</div>
                <div className="text-sm">COPPA Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}