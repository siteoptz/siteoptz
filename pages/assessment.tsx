import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Brain, 
  CheckCircle, 
  ArrowRight, 
  BarChart3,
  Users,
  Zap,
  Shield,
  TrendingUp,
  AlertCircle,
  Download,
  Mail
} from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'current-ai',
    category: 'Current State',
    question: 'What is your current level of AI adoption?',
    options: [
      { value: 0, label: 'No AI tools', description: 'We haven\'t started using AI yet' },
      { value: 1, label: 'Basic tools', description: 'Using ChatGPT or similar for basic tasks' },
      { value: 2, label: 'Some integration', description: 'AI tools in 1-2 departments' },
      { value: 3, label: 'Advanced usage', description: 'Multiple AI tools across departments' }
    ]
  },
  {
    id: 'team-size',
    category: 'Organization',
    question: 'How many employees does your organization have?',
    options: [
      { value: 1, label: '1-10 employees' },
      { value: 2, label: '11-50 employees' },
      { value: 3, label: '51-200 employees' },
      { value: 4, label: '200+ employees' }
    ]
  },
  {
    id: 'budget',
    category: 'Investment',
    question: 'What is your annual technology budget?',
    options: [
      { value: 1, label: 'Under $50K' },
      { value: 2, label: '$50K - $250K' },
      { value: 3, label: '$250K - $1M' },
      { value: 4, label: 'Over $1M' }
    ]
  },
  {
    id: 'pain-points',
    category: 'Challenges',
    question: 'What is your biggest operational challenge?',
    options: [
      { value: 1, label: 'Manual repetitive tasks' },
      { value: 2, label: 'Data analysis and insights' },
      { value: 3, label: 'Customer service scaling' },
      { value: 4, label: 'Process optimization' }
    ]
  },
  {
    id: 'timeline',
    category: 'Urgency',
    question: 'When do you need to see results?',
    options: [
      { value: 4, label: 'Within 30 days' },
      { value: 3, label: 'Within 90 days' },
      { value: 2, label: 'Within 6 months' },
      { value: 1, label: 'Within 12 months' }
    ]
  },
  {
    id: 'data-readiness',
    category: 'Infrastructure',
    question: 'How would you describe your data infrastructure?',
    options: [
      { value: 0, label: 'Mostly manual/spreadsheets' },
      { value: 1, label: 'Basic CRM/ERP systems' },
      { value: 2, label: 'Integrated systems with APIs' },
      { value: 3, label: 'Advanced data warehouse' }
    ]
  },
  {
    id: 'industry',
    category: 'Sector',
    question: 'What industry are you in?',
    options: [
      { value: 2, label: 'Healthcare' },
      { value: 2, label: 'Finance' },
      { value: 2, label: 'Manufacturing' },
      { value: 1, label: 'Other' }
    ]
  },
  {
    id: 'decision-maker',
    category: 'Authority',
    question: 'Are you the primary decision maker?',
    options: [
      { value: 3, label: 'Yes, I have full authority' },
      { value: 2, label: 'I influence decisions' },
      { value: 1, label: 'I research and recommend' },
      { value: 0, label: 'I\'m gathering information' }
    ]
  }
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
    if (currentStep < assessmentQuestions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  const getScore = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = assessmentQuestions.length * 4;
    return Math.round((totalScore / maxScore) * 100);
  };

  const getReadinessLevel = () => {
    const score = getScore();
    if (score >= 75) return { level: 'Advanced', color: 'text-green-400', recommendation: 'Enterprise' };
    if (score >= 50) return { level: 'Moderate', color: 'text-cyan-400', recommendation: 'Growth' };
    if (score >= 25) return { level: 'Basic', color: 'text-yellow-400', recommendation: 'Starter' };
    return { level: 'Beginning', color: 'text-orange-400', recommendation: 'Starter' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to your backend/CRM
    console.log('Assessment submitted:', { email, company, name, answers, score: getScore() });
    setSubmitted(true);
  };

  const readiness = getReadinessLevel();
  const score = getScore();

  return (
    <>
      <Head>
        <title>AI Readiness Assessment | Free Business Analysis | SiteOptz</title>
        <meta name="description" content="Take our free 2-minute AI readiness assessment and get a personalized roadmap for AI implementation. Discover your organization's AI maturity level." />
        <link rel="canonical" href="https://siteoptz.ai/assessment" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 py-20">
          {!showResults ? (
            <>
              {/* Assessment Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-full mb-6">
                  <Brain className="w-8 h-8 text-cyan-400" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  AI Readiness Assessment
                </h1>
                <p className="text-xl text-gray-300">
                  Discover your organization's AI maturity in 2 minutes
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">
                    Question {currentStep + 1} of {assessmentQuestions.length}
                  </span>
                  <span className="text-sm text-gray-400">
                    {Math.round(((currentStep + 1) / assessmentQuestions.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / assessmentQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <div className="mb-2">
                  <span className="text-cyan-400 text-sm font-semibold">
                    {assessmentQuestions[currentStep].category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {assessmentQuestions[currentStep].question}
                </h2>
                
                <div className="space-y-3">
                  {assessmentQuestions[currentStep].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(assessmentQuestions[currentStep].id, option.value)}
                      className="w-full text-left p-4 bg-gray-800 border border-gray-700 rounded-xl hover:border-cyan-500 hover:bg-gray-800/50 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-600 group-hover:border-cyan-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-white font-medium">{option.label}</div>
                          {option.description && (
                            <div className="text-gray-400 text-sm mt-1">{option.description}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              {currentStep > 0 && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </>
          ) : !submitted ? (
            <>
              {/* Results */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Your AI Readiness Results
                </h1>
                <p className="text-xl text-gray-300">
                  Based on your responses, here's your personalized AI roadmap
                </p>
              </div>

              {/* Score Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 mb-8">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-white mb-2">{score}%</div>
                  <div className={`text-2xl font-semibold ${readiness.color}`}>
                    {readiness.level} AI Readiness
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Recommended Package</div>
                    <div className="text-xl font-semibold text-cyan-400">{readiness.recommendation}</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Potential ROI</div>
                    <div className="text-xl font-semibold text-green-400">
                      {score >= 50 ? '3.2x - 5.1x' : '2.1x - 3.5x'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">Key Recommendations:</h3>
                  {score >= 75 ? (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">Ready for enterprise-wide AI transformation</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">Focus on custom AI model development</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">Implement advanced automation workflows</p>
                      </div>
                    </>
                  ) : score >= 50 ? (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">Scale AI across multiple departments</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">Integrate AI tools with existing systems</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">Build data infrastructure for AI</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">Start with single AI tool implementation</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">Focus on automating repetitive tasks</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">Build AI literacy within your team</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Get Detailed Report Form */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Get Your Detailed AI Roadmap
                </h2>
                <p className="text-gray-300 mb-6">
                  Receive a personalized 15-page report with specific recommendations for your organization
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                      placeholder="Company Inc."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Get Free AI Roadmap
                  </button>
                  
                  <p className="text-sm text-gray-400 text-center">
                    We'll also schedule a free 30-minute consultation to discuss your results
                  </p>
                </form>
              </div>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4">
                  Thank You, {name}!
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Your personalized AI roadmap has been sent to {email}
                </p>
                
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">What's Next?</h2>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <div className="text-cyan-400 font-semibold">1.</div>
                      <p className="text-gray-300">Check your email for your detailed AI roadmap (15-page PDF)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-cyan-400 font-semibold">2.</div>
                      <p className="text-gray-300">Our AI specialist will contact you within 24 hours to schedule your free consultation</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-cyan-400 font-semibold">3.</div>
                      <p className="text-gray-300">Review our {readiness.recommendation} package details while you wait</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/services" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all">
                    View Service Packages
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/roi-calculator" className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all">
                    Calculate ROI
                    <BarChart3 className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}