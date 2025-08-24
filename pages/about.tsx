import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  Lightbulb,
  Heart,
  Zap,
  Shield,
  ArrowRight
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "We measure success by your ROI. Every AI implementation is designed to deliver measurable business impact."
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your success is our success. We partner with you throughout the entire AI transformation journey."
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Enterprise-grade security and compliance ensure your data remains protected throughout AI implementation."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We stay ahead of AI trends to bring you cutting-edge solutions that give you a competitive advantage."
    }
  ];

  const stats = [
    { number: "500+", label: "Successful AI Implementations" },
    { number: "50+", label: "Industries Served" },
    { number: "10x", label: "Average ROI Increase" },
    { number: "98%", label: "Client Satisfaction Rate" }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "CEO & AI Strategist",
      description: "15+ years in AI/ML with experience at Google and Microsoft. Led AI transformations for Fortune 500 companies.",
      image: "/images/team/alex-chen.jpg"
    },
    {
      name: "Sarah Rodriguez",
      role: "Head of Implementation", 
      description: "Former McKinsey consultant specializing in digital transformation. Expert in enterprise AI adoption.",
      image: "/images/team/sarah-rodriguez.jpg"
    },
    {
      name: "Dr. Michael Kim",
      role: "Chief Technology Officer",
      description: "PhD in Machine Learning from Stanford. Previously led AI research teams at OpenAI and Anthropic.",
      image: "/images/team/michael-kim.jpg"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SiteOptz",
    "url": "https://siteoptz.ai",
    "logo": "https://siteoptz.ai/images/siteoptz-logo.png",
    "description": "SiteOptz helps businesses implement and optimize AI tools to drive measurable growth and ROI. We provide expert AI consulting, implementation, and ongoing optimization services.",
    "foundingDate": "2020",
    "industry": "Artificial Intelligence Consulting",
    "numberOfEmployees": "50-100",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-AI-TOOLS",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://twitter.com/siteoptz",
      "https://linkedin.com/company/siteoptz",
      "https://youtube.com/@siteoptz"
    ]
  };

  return (
    <>
      <Head>
        <title>About SiteOptz - Leading AI Implementation & Optimization Experts</title>
        <meta 
          name="description" 
          content="Learn about SiteOptz's mission to help businesses unlock growth through AI. Meet our expert team and discover why 500+ companies trust us for AI implementation and optimization." 
        />
        <meta 
          name="keywords" 
          content="AI consulting company, artificial intelligence experts, AI implementation services, AI optimization team, machine learning consultants, AI transformation specialists" 
        />
        <link rel="canonical" href="https://siteoptz.ai/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About SiteOptz - Leading AI Implementation Experts" />
        <meta property="og:description" content="Meet the team behind 500+ successful AI implementations. Learn how SiteOptz helps businesses achieve 10x ROI through expert AI consulting and optimization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/about" />
        <meta property="og:image" content="https://siteoptz.ai/images/about-og.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About SiteOptz - AI Implementation Experts" />
        <meta name="twitter:description" content="500+ successful AI implementations. 10x average ROI. Meet the team transforming businesses with AI." />
        <meta name="twitter:image" content="https://siteoptz.ai/images/about-twitter.jpg" />
        
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
                About SiteOptz
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                We're on a mission to help every business unlock their growth potential 
                through intelligent AI implementation and optimization.
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

        {/* Mission Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  At SiteOptz, we believe AI should be accessible, practical, and profitable for businesses of all sizes. 
                  Too many companies struggle with AI implementation—choosing the wrong tools, facing integration challenges, 
                  or failing to see measurable results.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  That's why we created a comprehensive platform that not only helps you discover the best AI tools 
                  but also provides expert guidance on implementation, optimization, and scaling. We turn AI complexity 
                  into business simplicity.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  <Heart className="w-5 h-5 mr-2" />
                  Turning AI Into ROI Since 2020
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-gray-800">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">Growth Focused</h3>
                      <p className="text-gray-400 text-sm">Every AI solution is designed to drive measurable business growth</p>
                    </div>
                    <div className="text-center">
                      <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">Expert Vetted</h3>
                      <p className="text-gray-400 text-sm">All recommendations backed by real-world testing and expertise</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                These core principles guide everything we do and every recommendation we make.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-black border border-gray-800 rounded-xl p-6 text-center hover:border-cyan-400 transition-colors"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                World-class AI experts with deep experience in implementation and optimization.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6 text-center hover:border-cyan-400 transition-colors"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {member.name}
                  </h3>
                  <div className="text-cyan-400 font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-gray-300 text-sm">
                    {member.description}
                  </p>
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
                Ready to Transform Your Business with AI?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join 500+ companies that trust SiteOptz for their AI implementation and optimization.
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
                  href="/tools"
                  className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  Explore AI Tools
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