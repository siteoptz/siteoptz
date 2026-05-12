import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, Shield, ChevronLeft, ChevronRight, Download, BarChart3 } from 'lucide-react';
import { ResponsiveRadar } from '@nivo/radar';
import {
  QUESTIONS_CONFIG,
  COMPANY_SIZE_OPTIONS,
  ROLE_OPTIONS,
  generateScorecardResults,
  getQualificationTier
} from '../../lib/scorecard-config';

// Scorecard state management
type ScorecardStep = 'intro' | 'questions' | 'email' | 'results';

interface FormData {
  email: string;
  company: string;
  role: string;
  companySize: string;
}

export default function AIComplianceScorecardPage() {
  // Core state
  const [currentStep, setCurrentStep] = useState<ScorecardStep>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
    company: '',
    role: '',
    companySize: ''
  });
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Timing and UTM tracking
  const [startTime] = useState(Date.now());
  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: ''
  });
  
  // Extract UTM params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || ''
    });
  }, []);

  // Answer selection
  const handleAnswerSelect = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  // Question navigation
  const nextQuestion = () => {
    if (currentQuestion < QUESTIONS_CONFIG.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentStep('email');
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  // Email form submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.company || !formData.role || !formData.companySize) return;

    setIsSubmitting(true);

    try {
      const results = generateScorecardResults(answers);
      const qualificationTier = getQualificationTier(results.score.total);
      const completionTimeSeconds = Math.round((Date.now() - startTime) / 1000);
      
      const payload = {
        email: formData.email,
        tool: 'AI Compliance Readiness Scorecard',
        source: 'scorecard-completion',
        additionalData: {
          company: formData.company,
          role: formData.role,
          companySize: formData.companySize,
          scorecardResults: {
            totalScore: results.score.total,
            scoreBand: results.band.band,
            scoreBandEmoji: results.band.emoji,
            scorePercentage: results.score.percentage,
            questionScores: answers,
            topGaps: results.gaps.map(gap => ({
              category: gap.category,
              score: gap.score,
              priority: gap.score === 0 ? 'critical' : gap.score <= 3 ? 'high' : 'medium'
            })),
            recommendedActionAtSubmission: results.band.recommendedAction,
            completedAt: new Date().toISOString(),
            completionTimeSeconds,
            scorecardVersion: 'v1.0',
            pageSource: 'scorecard-standalone'
          },
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          leadQualifiers: {
            qualificationTier,
            companyStage: formData.companySize,
            decisionMakerLevel: ['founder', 'cto', 'operations'].includes(formData.role) ? 'high' : 'medium'
          }
        }
      };

      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setCurrentStep('results');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Print to PDF
  const handleDownloadPDF = () => {
    window.print();
  };
  
  // Generate results for display
  const results = Object.keys(answers).length === QUESTIONS_CONFIG.length ? 
    generateScorecardResults(answers) : null;

  return (
    <>
      <Head>
        <title>AI Compliance Readiness Scorecard | SiteOptz</title>
        <meta name="description" content="Take our 5-minute AI compliance readiness assessment. Get your score from 0-100, identify your top 3 governance gaps, and receive a personalized action plan." />
        <meta name="keywords" content="AI compliance scorecard, AI risk assessment, AI governance readiness, EU AI Act, NIST AI RMF" />
        <link rel="canonical" href="https://siteoptz.ai/ai-governance/scorecard" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Compliance Readiness Scorecard | SiteOptz" />
        <meta property="og:description" content="5-minute AI compliance assessment. Get your score and personalized action plan." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/ai-governance/scorecard" />
        <meta property="og:image" content="https://siteoptz.ai/images/scorecard-og.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Compliance Readiness Scorecard | SiteOptz" />
        <meta name="twitter:description" content="5-minute AI compliance assessment. Get your score and personalized action plan." />
        <meta name="twitter:image" content="https://siteoptz.ai/images/scorecard-twitter.jpg" />
        
        {/* Print stylesheet for PDF generation */}
        <style jsx global>{`
          @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { background: white !important; color: black !important; }
            .bg-black { background: white !important; }
            .text-white { color: black !important; }
            .text-gray-300 { color: #374151 !important; }
            .border-gray-800 { border-color: #e5e7eb !important; }
          }
          .print-only { display: none; }
        `}</style>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Navigation breadcrumb */}
        <div className="pt-20 pb-8 no-print">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/ai-governance"
              className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AI Governance
            </Link>
          </div>
        </div>

        {/* Main content */}
        <section className={`${currentStep === 'results' ? 'py-8' : 'py-16'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Intro Screen */}
            {currentStep === 'intro' && (
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  How Audit-Ready Is Your AI Stack?
                </h1>
                
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  A 5-minute diagnostic that scores your AI compliance posture across 10 dimensions enterprise buyers, investors, and regulators actually check.
                </p>
                
                <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">You&apos;ll get:</h2>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                      <span className="text-gray-300">A score from 0 to 100 with breakdown by category</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                      <span className="text-gray-300">Your three highest-risk gaps, with what to fix first</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                      <span className="text-gray-300">A personalized PDF you can hand to your team or board</span>
                    </div>
                  </div>
                  <p className="text-cyan-400 text-center mt-6 font-semibold">
                    No sales call required. Just useful information.
                  </p>
                </div>
                
                <button
                  onClick={() => setCurrentStep('questions')}
                  className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 inline-flex items-center gap-2"
                >
                  Start Scorecard
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Question Screen */}
            {currentStep === 'questions' && (
              <div>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-white">
                      Question {currentQuestion + 1} of {QUESTIONS_CONFIG.length}
                    </h1>
                    <div className="text-gray-400">
                      Progress: {Math.round(((currentQuestion + 1) / QUESTIONS_CONFIG.length) * 100)}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
                    <div 
                      className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / QUESTIONS_CONFIG.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-black border border-gray-800 rounded-2xl p-8">
                  <div className="mb-8">
                    <h2 className="text-sm font-semibold text-cyan-400 mb-3">
                      {QUESTIONS_CONFIG[currentQuestion].category}
                    </h2>
                    <h3 className="text-2xl font-bold text-white mb-6 leading-tight">
                      {QUESTIONS_CONFIG[currentQuestion].question}
                    </h3>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {QUESTIONS_CONFIG[currentQuestion].options.map((option, index) => {
                      const isSelected = answers[QUESTIONS_CONFIG[currentQuestion].id] === option.value;
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(QUESTIONS_CONFIG[currentQuestion].id, option.value)}
                          className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                            isSelected 
                              ? 'border-orange-500 bg-orange-500/10 text-white' 
                              : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-600'
                            }`}>
                              {isSelected && <div className="w-3 h-3 bg-white rounded-full"></div>}
                            </div>
                            <span className="flex-1">{option.label}</span>
                            <span className={`text-sm font-bold px-2 py-1 rounded ${
                              isSelected ? 'text-orange-100' : 'text-gray-500'
                            }`}>
                              {option.value} pts
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={prevQuestion}
                      disabled={currentQuestion === 0}
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>
                    
                    <button
                      onClick={nextQuestion}
                      disabled={answers[QUESTIONS_CONFIG[currentQuestion].id] === undefined}
                      className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                    >
                      {currentQuestion === QUESTIONS_CONFIG.length - 1 ? 'Complete Assessment' : 'Next'}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Email Capture Screen */}
            {currentStep === 'email' && (
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Get Your Results
                </h1>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                  Enter your details below to see your AI compliance readiness score and personalized recommendations.
                </p>
                
                <div className="bg-black border border-gray-800 rounded-2xl p-8 max-w-md mx-auto">
                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                        Email address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                        Company name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Your Company"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                        Your role *
                      </label>
                      <select
                        id="role"
                        required
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      >
                        <option value="">Select your role</option>
                        {ROLE_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="companySize" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                        Company size *
                      </label>
                      <select
                        id="companySize"
                        required
                        value={formData.companySize}
                        onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      >
                        <option value="">Select company size</option>
                        {COMPANY_SIZE_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.email || !formData.company || !formData.role || !formData.companySize}
                      className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isSubmitting ? 'Getting Your Results...' : 'Get My Results'}
                    </button>
                  </form>
                  
                  <p className="text-sm text-gray-400 mt-4">
                    No spam. Your information is used only for your personalized results.
                  </p>
                </div>
              </div>
            )}

            {/* Results Screen */}
            {currentStep === 'results' && results && (
              <div>
                {/* Header */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    Your AI Compliance Readiness Score
                  </h1>
                  <div className="flex items-center justify-center gap-4 no-print">
                    <button
                      onClick={handleDownloadPDF}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 inline-flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF
                    </button>
                  </div>
                </div>
                
                {/* Score Overview */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-black border border-gray-800 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Overall Score</h2>
                    <div className="mb-6">
                      <div className="text-6xl font-bold text-white mb-2">
                        {results.score.total}
                        <span className="text-3xl text-gray-400">/100</span>
                      </div>
                      <div className={`text-2xl font-semibold ${
                        results.band.color === 'red' ? 'text-red-400' :
                        results.band.color === 'yellow' ? 'text-yellow-400' :
                        results.band.color === 'green' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {results.band.emoji} {results.band.band}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      {results.band.description}
                    </p>
                  </div>
                  
                  <div className="bg-black border border-gray-800 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Score Breakdown</h2>
                    <div className="h-80">
                      <ResponsiveRadar
                        data={QUESTIONS_CONFIG.map(q => ({
                          category: q.category.split(' ').slice(0, 2).join(' '),
                          score: answers[q.id] || 0,
                          fullScore: 10
                        }))}
                        keys={['score']}
                        indexBy="category"
                        maxValue={10}
                        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                        curve="linearClosed"
                        borderWidth={2}
                        borderColor={{ from: 'color' }}
                        gridLevels={5}
                        gridShape="circular"
                        gridLabelOffset={24}
                        enableDots={true}
                        dotSize={8}
                        dotColor={{ theme: 'background' }}
                        dotBorderWidth={2}
                        dotBorderColor={{ from: 'color' }}
                        colors={['#ea580c']}
                        fillOpacity={0.25}
                        theme={{
                          background: 'transparent',
                          text: {
                            fontSize: 11,
                            fill: '#d1d5db'
                          },
                          axis: {
                            domain: {
                              line: {
                                stroke: '#374151',
                                strokeWidth: 1
                              }
                            },
                            legend: {
                              text: {
                                fontSize: 12,
                                fill: '#d1d5db'
                              }
                            },
                            ticks: {
                              line: {
                                stroke: '#374151',
                                strokeWidth: 1
                              },
                              text: {
                                fontSize: 11,
                                fill: '#9ca3af'
                              }
                            }
                          },
                          grid: {
                            line: {
                              stroke: '#374151',
                              strokeWidth: 1
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Top 3 Gaps */}
                <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-12">
                  <h2 className="text-2xl font-bold text-white mb-8 text-center">
                    Your Top 3 Priority Areas
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {results.gaps.slice(0, 3).map((gap, index) => (
                      <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            gap.score === 0 ? 'bg-red-500' : gap.score <= 3 ? 'bg-orange-500' : 'bg-yellow-500'
                          }`}>
                            {index + 1}
                          </div>
                          <h3 className="font-semibold text-white text-sm">{gap.category}</h3>
                        </div>
                        <div className="mb-3">
                          <span className="text-xs font-medium text-gray-400">Current Score: </span>
                          <span className="text-white font-bold">{gap.score}/10</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">{gap.risk}</p>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                          <p className="text-blue-300 text-sm font-medium">Quick Fix:</p>
                          <p className="text-blue-100 text-sm">{gap.fix}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recommended Next Steps */}
                <div className="bg-black border border-gray-800 rounded-2xl p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Recommended Next Steps</h2>
                  <p className="text-gray-300 mb-8">{results.band.priority}</p>
                  
                  <div className="space-y-4">
                    <Link
                      href="/ai-governance"
                      className="block px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors"
                    >
                      {results.band.recommendedAction}
                    </Link>
                    
                    <Link
                      href="/ai-governance"
                      className="block px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Learn More About AI Governance
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </div>
    </>
  );
}