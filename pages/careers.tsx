import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import JobApplicationModal from '../components/JobApplicationModal';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp, 
  Heart,
  Zap,
  Shield,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = (position: any) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  const openPositions = [
    {
      title: "Senior AI Implementation Consultant",
      department: "Consulting",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      level: "Senior",
      description: "Lead AI transformation projects for Fortune 500 clients. Design and implement AI solutions that drive measurable business results.",
      requirements: [
        "5+ years in AI/ML consulting or implementation",
        "Experience with enterprise AI deployments",
        "Strong client communication skills",
        "MBA or relevant technical degree preferred"
      ],
      featured: true
    },
    {
      title: "AI Research Scientist",
      department: "R&D",
      location: "San Francisco, CA",
      type: "Full-time", 
      level: "Senior",
      description: "Drive cutting-edge research in AI applications for business. Develop new methodologies for AI implementation and optimization.",
      requirements: [
        "PhD in AI, ML, or related field",
        "3+ years industry research experience",
        "Published papers in top-tier conferences",
        "Experience with PyTorch, TensorFlow"
      ]
    },
    {
      title: "Product Marketing Manager - AI Tools",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      level: "Mid-level",
      description: "Shape the go-to-market strategy for AI tool recommendations. Work closely with technical teams to communicate complex AI concepts.",
      requirements: [
        "3+ years B2B SaaS marketing experience",
        "Understanding of AI/ML landscape",
        "Excellent written communication skills",
        "Experience with marketing automation tools"
      ]
    },
    {
      title: "Full-Stack Developer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      level: "Mid-level", 
      description: "Build and scale our AI tool comparison platform. Work on both frontend user experiences and backend data processing systems.",
      requirements: [
        "4+ years full-stack development experience",
        "Proficiency in React, Node.js, Python",
        "Experience with cloud platforms (AWS/GCP)",
        "Database design and optimization skills"
      ]
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      level: "Mid-level",
      description: "Ensure client success with AI implementations. Provide ongoing support and optimization recommendations to drive maximum ROI.",
      requirements: [
        "3+ years customer success experience",
        "Technical background preferred",
        "Excellent relationship management skills",
        "Experience with B2B SaaS products"
      ]
    },
    {
      title: "AI Content Writer",
      department: "Content",
      location: "Remote",
      type: "Contract",
      level: "Mid-level",
      description: "Create compelling content about AI tools, implementation guides, and industry insights. Help educate our audience about AI adoption.",
      requirements: [
        "3+ years technical writing experience",
        "Deep understanding of AI/ML concepts",
        "SEO and content marketing knowledge",
        "Portfolio of technical content"
      ]
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Competitive Compensation",
      description: "Top-tier salaries plus equity participation in our growth story"
    },
    {
      icon: Heart,
      title: "Comprehensive Health Benefits",
      description: "Premium medical, dental, and vision coverage for you and your family"
    },
    {
      icon: Clock,
      title: "Flexible Work Arrangements",
      description: "Remote-first culture with flexible hours and unlimited PTO"
    },
    {
      icon: Zap,
      title: "Professional Development",
      description: "$5,000 annual learning budget plus conference attendance"
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with world-class AI experts in a supportive environment"
    },
    {
      icon: Shield,
      title: "Financial Security",
      description: "401(k) matching, stock options, and long-term incentives"
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We stay at the forefront of AI technology to deliver cutting-edge solutions"
    },
    {
      title: "Client Success",
      description: "Our clients' success is our success. We measure ourselves by their results"
    },
    {
      title: "Continuous Learning",
      description: "The AI field evolves rapidly. We invest in continuous learning and growth"
    },
    {
      title: "Diverse Perspectives",
      description: "Different backgrounds and viewpoints make us stronger and more creative"
    }
  ];

  const stats = [
    { number: "50+", label: "Team Members" },
    { number: "4.8/5", label: "Employee Satisfaction" },
    { number: "95%", label: "Employee Retention" },
    { number: "50+", label: "Countries Represented" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPostingSearchResults",
    "name": "SiteOptz Careers",
    "description": "Join the leading AI implementation company. We're hiring AI consultants, engineers, researchers, and marketers to help businesses transform with AI.",
    "url": "https://siteoptz.ai/careers",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "SiteOptz",
      "sameAs": "https://siteoptz.ai",
      "logo": "https://siteoptz.ai/images/siteoptz-logo.png"
    },
    "mainEntity": openPositions.map(position => ({
      "@type": "JobPosting",
      "title": position.title,
      "description": position.description,
      "employmentType": position.type === "Full-time" ? "FULL_TIME" : "CONTRACTOR",
      "jobLocation": {
        "@type": "Place",
        "address": position.location
      },
      "hiringOrganization": {
        "@type": "Organization", 
        "name": "SiteOptz"
      },
      "datePosted": new Date().toISOString().split('T')[0]
    }))
  };

  return (
    <>
      <Head>
        <title>Careers at SiteOptz - Join the AI Implementation Leaders</title>
        <meta 
          name="description" 
          content="Join SiteOptz and help businesses transform with AI. We're hiring AI consultants, engineers, researchers, and marketers. Competitive compensation and remote-first culture." 
        />
        <meta 
          name="keywords" 
          content="AI jobs, machine learning careers, AI consultant jobs, AI engineer positions, AI research jobs, remote AI jobs, AI startup careers" 
        />
        <link rel="canonical" href="https://siteoptz.ai/careers" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Careers at SiteOptz - Leading AI Implementation Company" />
        <meta property="og:description" content="Join our team of AI experts. Remote-first culture, competitive compensation, and the opportunity to shape the future of business AI." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/careers" />
        <meta property="og:image" content="https://siteoptz.ai/images/careers-og.jpg" />
        
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
            
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Shape the Future of AI
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Join our team of AI experts and help businesses around the world 
                transform with artificial intelligence.
              </p>
              <Link
                href="#open-positions"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                View Open Positions
              </Link>
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

        {/* Why Work Here Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Work at SiteOptz?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We&apos;re building the future of AI implementation, and we want you to be part of it.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Benefits & Perks
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We believe in taking care of our team so they can do their best work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section id="open-positions" className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Open Positions
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Find your next opportunity to make an impact in the AI industry.
              </p>
            </div>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div
                  key={index}
                  className={`bg-black border rounded-xl p-6 hover:border-cyan-400 transition-all ${
                    position.featured ? 'border-cyan-400 ring-1 ring-cyan-400/20' : 'border-gray-800'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div className="mb-4 lg:mb-0">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold text-white mr-3">
                          {position.title}
                        </h3>
                        {position.featured && (
                          <span className="px-2 py-1 bg-cyan-600 text-white text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {position.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {position.type}
                        </div>
                        <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                          {position.level}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApplyClick(position)}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-sm font-medium flex items-center justify-center lg:justify-start"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {position.description}
                  </p>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Key Requirements:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {position.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-4">
                Don&apos;t see a position that fits? We&apos;re always looking for exceptional talent.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Send us your resume
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Join Our Mission?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Help us transform how businesses implement and optimize AI. Your next career opportunity awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#open-positions"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  View Positions
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  Learn About Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        position={selectedPosition}
      />
    </>
  );
}