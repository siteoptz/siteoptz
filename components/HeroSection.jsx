import React from 'react';
import aiToolsData from '../aiToolsData.json';

const HeroSection = ({ 
  toolName = null, 
  comparisonMode = false, 
  tools = [], 
  title = null, 
  subtitle = null,
  ctaText = null,
  ctaLink = null 
}) => {
  
  // Generate content based on props
  const generateContent = () => {
    if (comparisonMode && tools.length > 0) {
      return generateComparisonContent();
    } else if (toolName) {
      return generateToolContent();
    } else {
      return generateDefaultContent();
    }
  };

  const generateComparisonContent = () => {
    const tool1 = tools[0];
    const tool2 = tools[1];
    
    return {
      title: `${tool1?.tool_name} vs ${tool2?.tool_name}: Complete Comparison [2025]`,
      subtitle: `Compare ${tool1?.tool_name} and ${tool2?.tool_name} pricing, features, and use cases. Find the best ${tool1?.category.toLowerCase()} tool for your needs.`,
      primaryCTA: {
        text: `Try ${tool1?.tool_name} Free`,
        link: tool1?.affiliate_link,
        tool: tool1
      },
      secondaryCTA: {
        text: `Try ${tool2?.tool_name} Free`,
        link: tool2?.affiliate_link,
        tool: tool2
      },
      logos: tools.map(tool => ({
        src: tool.logo_url,
        alt: `${tool.tool_name} logo`,
        name: tool.tool_name,
        vendor: tool.vendor
      }))
    };
  };

  const generateToolContent = () => {
    const tool = aiToolsData.find(t => t.tool_name === toolName);
    if (!tool) return generateDefaultContent();

    return {
      title: `${tool.tool_name} Review & Pricing [2025]`,
      subtitle: `${tool.tool_name} is an AI-powered ${tool.category.toLowerCase()} tool by ${tool.vendor}. ${tool.pros.slice(0, 2).join(' ')}. Starting at $${tool.pricing.monthly}/month.`,
      primaryCTA: {
        text: `Try ${tool.tool_name} Free`,
        link: tool.affiliate_link,
        tool: tool
      },
      secondaryCTA: {
        text: 'Compare Alternatives',
        link: `/compare/${tool.tool_name}`,
        tool: null
      },
      logos: [{
        src: tool.logo_url,
        alt: `${tool.tool_name} logo`,
        name: tool.tool_name,
        vendor: tool.vendor
      }]
    };
  };

  const generateDefaultContent = () => {
    return {
      title: title || "AI Tools Comparison & Reviews [2025]",
      subtitle: subtitle || "Compare the best AI tools for content creation, SEO, social media, and more. Find the perfect AI solution for your business needs.",
      primaryCTA: {
        text: ctaText || "Start Comparing Tools",
        link: ctaLink || "/compare",
        tool: null
      },
      secondaryCTA: {
        text: "View All Tools",
        link: "/tools",
        tool: null
      },
      logos: []
    };
  };

  const content = generateContent();

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return (
      <div className="flex items-center">
        <div className="flex mr-2">{stars}</div>
        <span className="text-sm font-semibold">{rating}</span>
      </div>
    );
  };

  const renderQuickStats = (tools) => {
    if (!tools || tools.length === 0) return null;

    const avgRating = tools.reduce((sum, t) => sum + t.rating, 0) / tools.length;
    const avgPrice = tools.reduce((sum, t) => sum + t.pricing.monthly, 0) / tools.length;
    const totalSearchVolume = tools.reduce((sum, t) => sum + (t.search_volume || 0), 0);

    return (
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Avg Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">${avgPrice.toFixed(0)}</div>
          <div className="text-sm text-gray-600">Avg Price/Mo</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalSearchVolume.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Monthly Searches</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Logos Section */}
          {content.logos.length > 0 && (
            <div className="mb-8">
              <div className={`flex items-center justify-center gap-8 ${content.logos.length === 2 ? 'flex-col sm:flex-row' : ''}`}>
                {content.logos.map((logo, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={logo.src} 
                        alt={logo.alt}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                        onError={(e) => {
                          e.target.src = '/images/placeholder-logo.png';
                        }}
                      />
                      {content.logos.length === 2 && index === 0 && (
                        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                          vs
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{logo.name}</div>
                      <div className="text-sm text-gray-600">{logo.vendor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Title and Subtitle */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
            {content.title}
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600 mb-8">
            {content.subtitle}
          </p>

          {/* Quick Stats */}
          {renderQuickStats(tools)}

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-4 flex-col sm:flex-row">
            <a
              href={content.primaryCTA.link}
              target={content.primaryCTA.link.startsWith('http') ? '_blank' : '_self'}
              rel={content.primaryCTA.link.startsWith('http') ? 'noopener noreferrer' : ''}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              {content.primaryCTA.text}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <a
              href={content.secondaryCTA.link}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-gray-50 border-2 border-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              {content.secondaryCTA.text}
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free Trials Available
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Money-Back Guarantee
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure & Reliable
            </div>
          </div>

          {/* Additional Info */}
          {content.primaryCTA.tool && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{content.primaryCTA.tool.tool_name}</div>
                  <div className="text-sm text-gray-600">Starting at ${content.primaryCTA.tool.pricing.monthly}/month</div>
                </div>
                <div className="text-right">
                  {renderRating(content.primaryCTA.tool.rating)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


