import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Calculator, Zap, Users, TrendingUp, CheckCircle } from 'lucide-react';
import EnhancedPricingCalculator from '../components/EnhancedPricingCalculator';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import { loadUnifiedToolsData } from '../utils/unifiedDataAdapter';

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

interface PricingPageProps {
  tools: Tool[];
}

export default function PricingPage({ tools }: PricingPageProps) {
  const handleEmailSubmit = async (email: string, data?: any) => {
    try {
      console.log('Email submission:', { email, data });
      // Here you could send the email data to your CRM or email service
      // For now, we'll just log it
      return Promise.resolve();
    } catch (error) {
      console.error('Error handling email submission:', error);
      throw error;
    }
  };

  return (
    <>
      <Head>
        <title>AI Tools Pricing Calculator | Compare Costs & Plans | SiteOptz</title>
        <meta name="description" content="Calculate your AI tools costs with our interactive pricing calculator. Compare plans, estimate monthly expenses, and find the best AI solution for your budget." />
        <meta name="keywords" content="ai tools pricing, cost calculator, pricing comparison, ai software costs, monthly pricing" />
        <link rel="canonical" href="https://siteoptz.ai/pricing" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Tools Pricing Calculator | SiteOptz" />
        <meta property="og:description" content="Calculate and compare AI tools pricing. Interactive calculator with usage sliders and real-time cost estimates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/pricing" />
        
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "AI Tools Pricing Calculator",
              "description": "Interactive pricing calculator for AI tools and software",
              "url": "https://siteoptz.ai/pricing",
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": "Pricing Calculator",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black mobile-safe relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>
        {/* Hero Section */}
        <section className="pt-20 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 border border-gray-700 rounded-full mb-6">
                <Calculator className="w-8 h-8 text-cyan-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                AI Tools Pricing Calculator
              </h1>
              <p className="text-2xl font-semibold text-cyan-400 mb-6">
                Turning AI Into ROI
              </p>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Compare up to 5 AI tools side-by-side, estimate monthly expenses with team scaling, 
                and get expert guidance to find the perfect solution for your business.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 border border-gray-700 rounded-full mb-4">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Real-time Calculations</h3>
                <p className="text-gray-300">Instant cost estimates as you adjust usage and plans</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 border border-gray-700 rounded-full mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Multi-Tool Comparison</h3>
                <p className="text-gray-300">Compare up to 5 tools side-by-side with team scaling</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 border border-gray-700 rounded-full mb-4">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Usage-Based Pricing</h3>
                <p className="text-gray-300">Accurate estimates based on your actual usage patterns</p>
              </div>
            </div>

            {/* Main Calculator */}
            <div className="max-w-6xl mx-auto">
              <EnhancedPricingCalculator tools={tools} onEmailSubmit={handleEmailSubmit} />
            </div>

            {/* Why Use Our Calculator */}
            <div className="mt-20 bg-black border border-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Why Use Our Pricing Calculator?
                </h2>
                <p className="text-lg text-gray-300">
                  Make informed decisions with accurate cost projections
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white">Accurate Cost Modeling</h3>
                      <p className="text-gray-300">Based on real pricing data from 93 AI tools and actual usage patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white">Hidden Costs Included</h3>
                      <p className="text-gray-300">Factors in setup fees, overage charges, and additional feature costs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white">Enterprise Scaling</h3>
                      <p className="text-gray-300">See how costs change as your usage grows from startup to enterprise</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white">Side-by-Side Comparison</h3>
                      <p className="text-gray-300">Compare up to 5 AI tools simultaneously with detailed cost breakdowns</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white">ROI Projections</h3>
                      <p className="text-gray-300">Estimate potential savings and productivity gains from AI adoption</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white">Expert Consultation</h3>
                      <p className="text-gray-300">Connect with AI specialists for personalized recommendations and strategy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Insights */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-900 border border-gray-800 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Average Savings</h3>
                <div className="text-4xl font-bold mb-2 text-blue-400">32%</div>
                <p className="text-gray-300">Organizations save an average of 32% on AI tool costs by comparing options first</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Usage Optimization</h3>
                <div className="text-4xl font-bold mb-2 text-green-400">45%</div>
                <p className="text-gray-300">Businesses reduce overages by 45% when they plan usage with our calculator</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">ROI Timeline</h3>
                <div className="text-4xl font-bold mb-2">3.2x</div>
                <p className="opacity-90">Average ROI within 6 months of implementing the right AI tool stack</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Load all tools using the unified data adapter
    const allTools = loadUnifiedToolsData(fs, path);
    
    // Convert tools to format needed for pricing calculator
    const toolsForCalculator = allTools.map(tool => {
      // Extract pricing information
      const monthlyPrice = typeof tool.pricing.monthly === 'number' ? tool.pricing.monthly : 
                          typeof tool.pricing.monthly === 'string' && tool.pricing.monthly !== 'Free' && tool.pricing.monthly !== 'Custom' ? 
                          parseFloat(tool.pricing.monthly.toString().replace(/[^0-9.]/g, '')) || 0 : 0;
      
      const yearlyPrice = typeof tool.pricing.yearly === 'number' ? tool.pricing.yearly :
                         typeof tool.pricing.yearly === 'string' && tool.pricing.yearly !== 'Free' && tool.pricing.yearly !== 'Custom' ?
                         parseFloat(tool.pricing.yearly.toString().replace(/[^0-9.]/g, '')) || 0 : 0;

      // Create pricing plans
      const pricingPlans = [];
      
      if (monthlyPrice >= 0) {
        pricingPlans.push({
          plan: tool.pricing.monthly === 'Free' ? 'Free' : 'Monthly',
          price_per_month: monthlyPrice,
          features: tool.use_cases || tool.pros || []
        });
      }
      
      if (yearlyPrice > 0 && yearlyPrice !== monthlyPrice * 12) {
        pricingPlans.push({
          plan: 'Yearly',
          price_per_month: Math.round(yearlyPrice / 12),
          features: tool.use_cases || tool.pros || []
        });
      }
      
      if (tool.pricing.enterprise && tool.pricing.enterprise !== 'Custom') {
        pricingPlans.push({
          plan: 'Enterprise',
          price_per_month: 0,
          features: [...(tool.use_cases || []), 'Custom pricing', 'Enterprise support']
        });
      }

      return {
        id: tool.id || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        slug: tool.slug || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: tool.tool_name,
        pricing: pricingPlans.length > 0 ? pricingPlans : [{
          plan: 'Custom Pricing',
          price_per_month: 0,
          features: tool.use_cases || tool.pros || []
        }],
        category: tool.category,
        overview: {
          category: tool.category
        }
      };
    }).filter(tool => tool.pricing && tool.pricing.length > 0);

    return {
      props: {
        tools: toolsForCalculator
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading unified tools data:', error);
    return {
      props: {
        tools: []
      },
      revalidate: 60
    };
  }
};