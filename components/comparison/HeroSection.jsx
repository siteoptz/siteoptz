import React from 'react';
import { ArrowRight, Star, Download } from 'lucide-react';
import ToolLogo from '../ToolLogo';

export default function HeroSection({ tool }) {
  const startingPrice = tool.pricingPlans.find(plan => plan.monthlyPrice > 0)?.monthlyPrice || 0;
  const annualPrice = tool.pricingPlans.find(plan => plan.annualPrice > 0)?.annualPrice || 0;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
              <Star className="w-3 h-3" />
              AI Tool
            </span>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900">
                {tool.name} Review & Pricing
                <span className="block text-3xl lg:text-4xl text-blue-600 mt-2">
                  [2025]
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                {tool.description}
              </p>
            </div>

            {/* Pricing Info */}
            <div className="flex items-center gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="text-2xl font-bold text-gray-900">
                  ${startingPrice}
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
                {annualPrice > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    ${annualPrice}/year (Save ${(startingPrice * 12) - annualPrice})
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8/5 rating</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`/compare/${tool.slug}`}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Try {tool.name} Free
                <ArrowRight className="w-4 h-4" />
              </a>
              
              <a 
                href="#comparison" 
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Compare Alternatives
                <Download className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Free Trial Available
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Money-Back Guarantee
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Secure & Reliable
              </div>
            </div>
          </div>

          {/* Right Column - Tool Logo & Info */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 border">
              {/* Tool Logo */}
              <div className="flex items-center gap-4 mb-6">
                <ToolLogo 
                  toolName={tool.name}
                  logoUrl={tool.logo}
                  size="lg"
                  className="bg-gray-100"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{tool.name}</h2>
                  <p className="text-gray-600">{tool.description.substring(0, 50)}...</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">
                    {tool.features.length}
                  </div>
                  <div className="text-sm text-gray-600">Features</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">
                    {tool.pricingPlans.length}
                  </div>
                  <div className="text-sm text-gray-600">Plans</div>
                </div>
              </div>

              {/* Top Pros */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Key Benefits:</h3>
                <ul className="space-y-2">
                  {tool.pros.slice(0, 3).map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing Highlight */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">
                    ${startingPrice}/month
                  </div>
                  <div className="text-sm text-blue-700">
                    Starting price
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            
          </div>
        </div>
      </div>
    </section>
  );
}
