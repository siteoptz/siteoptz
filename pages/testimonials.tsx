import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Star, 
  Quote, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "CEO",
      company: "TechFlow Solutions",
      industry: "SaaS",
      image: "/images/testimonials/sarah-johnson.jpg",
      rating: 5,
      quote: "SiteOptz transformed our customer support with AI chatbots. We reduced response time by 80% and increased customer satisfaction by 45%. The ROI was immediate.",
      results: ["80% faster response time", "45% higher satisfaction", "$200K annual savings"],
      featured: true
    },
    {
      name: "Michael Chen",
      title: "VP of Marketing", 
      company: "GrowthLabs",
      industry: "Marketing",
      image: "/images/testimonials/michael-chen.jpg",
      rating: 5,
      quote: "The AI content generation tools recommended by SiteOptz increased our content output by 300% while maintaining quality. Our organic traffic doubled in 6 months.",
      results: ["300% more content", "2x organic traffic", "60% cost reduction"]
    },
    {
      name: "Lisa Rodriguez",
      title: "CTO",
      company: "DataVision Inc",
      industry: "Analytics",
      image: "/images/testimonials/lisa-rodriguez.jpg", 
      rating: 5,
      quote: "SiteOptz helped us implement AI-powered data analysis that uncovered insights we never knew existed. Our decision-making speed improved by 70%.",
      results: ["70% faster decisions", "25% revenue increase", "90% accuracy improvement"]
    },
    {
      name: "David Park",
      title: "Operations Director",
      company: "LogiCorp",
      industry: "Logistics",
      image: "/images/testimonials/david-park.jpg",
      rating: 5,
      quote: "The route optimization AI tools saved us $500K annually in fuel costs. The implementation was seamless and the support team was exceptional.",
      results: ["$500K annual savings", "35% efficiency gain", "Zero downtime implementation"]
    },
    {
      name: "Amanda Foster",
      title: "Head of Sales",
      company: "SalesMax Pro",
      industry: "Sales",
      image: "/images/testimonials/amanda-foster.jpg",
      rating: 5,
      quote: "AI lead scoring and personalization tools boosted our conversion rates by 65%. SiteOptz's expertise made all the difference in choosing the right solutions.",
      results: ["65% higher conversions", "40% more qualified leads", "50% faster sales cycle"]
    },
    {
      name: "Robert Kim",
      title: "Finance Director", 
      company: "FinanceFirst",
      industry: "Finance",
      image: "/images/testimonials/robert-kim.jpg",
      rating: 5,
      quote: "The AI fraud detection system prevented $2M in potential losses in the first year alone. The peace of mind is invaluable.",
      results: ["$2M losses prevented", "99.5% accuracy rate", "24/7 protection"]
    }
  ];

  const stats = [
    { number: "98%", label: "Client Satisfaction" },
    { number: "500+", label: "Success Stories" },
    { number: "10x", label: "Average ROI" },
    { number: "50+", label: "Industries Served" }
  ];

  const industries = [
    "SaaS & Technology", "E-commerce & Retail", "Healthcare", "Finance & Banking",
    "Manufacturing", "Marketing & Media", "Education", "Real Estate",
    "Logistics & Supply Chain", "Professional Services", "Energy & Utilities", "Legal"
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Client Testimonials & Success Stories",
    "description": "Read testimonials from 500+ businesses that achieved 10x ROI with SiteOptz AI implementation. Real results from real clients across 50+ industries.",
    "url": "https://siteoptz.ai/testimonials",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": testimonials.length,
      "itemListElement": testimonials.map((testimonial, index) => ({
        "@type": "Review",
        "position": index + 1,
        "author": {
          "@type": "Person",
          "name": testimonial.name,
          "jobTitle": testimonial.title
        },
        "reviewBody": testimonial.quote,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": testimonial.rating,
          "bestRating": 5
        },
        "itemReviewed": {
          "@type": "Organization",
          "name": "SiteOptz"
        }
      }))
    }
  };

  return (
    <>
      <Head>
        <title>Client Testimonials - 500+ Success Stories | SiteOptz</title>
        <meta 
          name="description" 
          content="Read testimonials from 500+ businesses that achieved 10x ROI with SiteOptz AI implementation. Real results from real clients across 50+ industries." 
        />
        <meta 
          name="keywords" 
          content="AI implementation testimonials, client success stories, AI consulting reviews, business AI results, AI transformation case studies, SiteOptz reviews" 
        />
        <link rel="canonical" href="https://siteoptz.ai/testimonials" />
        
        {/* Open Graph */}
        <meta property="og:title" content="500+ Client Success Stories | SiteOptz" />
        <meta property="og:description" content="See how businesses achieved 10x ROI with AI. Read testimonials from CEOs, CTOs, and executives across 50+ industries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/testimonials" />
        <meta property="og:image" content="https://siteoptz.ai/images/testimonials-og.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Client Success Stories
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Discover how 500+ businesses across 50+ industries achieved 10x ROI 
                with our AI implementation and optimization services.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Testimonial */}
        {testimonials.filter(t => t.featured).map((testimonial, index) => (
          <section key={index} className="py-16 bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 lg:p-12 border border-gray-800">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <Quote className="w-8 h-8 text-cyan-400 mr-3" />
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-xl text-white leading-relaxed mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">
                          {testimonial.title}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Results Achieved:</h3>
                    <div className="space-y-3">
                      {testimonial.results.map((result, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Testimonials Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real testimonials from executives who transformed their businesses with AI.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.filter(t => !t.featured).map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-all hover:transform hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-400">{testimonial.industry}</span>
                  </div>
                  
                  <blockquote className="text-gray-300 mb-6 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{testimonial.name}</div>
                        <div className="text-gray-400 text-xs">
                          {testimonial.title}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {testimonial.results.map((result, idx) => (
                        <div key={idx} className="flex items-center text-xs">
                          <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-400">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Trusted Across Industries
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From startups to Fortune 500 companies, businesses across every industry trust SiteOptz.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-lg p-4 text-center hover:border-cyan-400 transition-colors"
                >
                  <span className="text-gray-300 text-sm">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Join Our Success Stories?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Let&apos;s create your AI transformation success story. Schedule a consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Link>
                <Link
                  href="/case-studies"
                  className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  View Case Studies
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}