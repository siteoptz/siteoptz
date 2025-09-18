import React from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useUserPlan } from '../../hooks/useUserPlan';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { FeatureGate } from '../../components/FeatureGate';
import { UpgradePrompt } from '../../components/UpgradePrompt';
import { 
  Search, 
  Calendar, 
  Users, 
  CheckCircle, 
  Zap,
  BookOpen,
  TrendingUp,
  Clock,
  AlertCircle,
  MessageCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function FreeDashboard() {
  const { userPlan, loading } = useUserPlan();

  if (loading || !userPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userPlan || userPlan.plan !== 'free') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-300">This page is for Free plan users only.</p>
          <Link href="/dashboard" className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} userName="Free User" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to SiteOptz Free
          </h1>
          <p className="text-gray-300">
            Discover AI tools and unlock your potential. Upgrade to get unlimited access!
          </p>
        </div>

        {/* Daily Usage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Daily Comparisons</p>
                <p className="text-2xl font-bold text-white">
                  {userPlan.usage.comparisons}/{userPlan.limits.dailyComparisons}
                </p>
                <p className="text-cyan-400 text-xs mt-1">
                  {userPlan.limits.dailyComparisons - userPlan.usage.comparisons} remaining today
                </p>
              </div>
              <Search className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-cyan-500 h-2 rounded-full" 
                style={{ 
                  width: `${Math.min((userPlan.usage.comparisons / userPlan.limits.dailyComparisons) * 100, 100)}%` 
                }}
              />
            </div>
            {userPlan.usage.comparisons >= userPlan.limits.dailyComparisons && (
              <p className="text-red-400 text-xs mt-2">Daily limit reached</p>
            )}
          </div>
          
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Expert Consultations</p>
                <p className="text-2xl font-bold text-white">0/0</p>
                <p className="text-purple-400 text-xs mt-1">Available with Starter</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-400 opacity-50" />
            </div>
          </div>
          
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Team Members</p>
                <p className="text-2xl font-bold text-white">1/1</p>
                <p className="text-green-400 text-xs mt-1">Just you for now</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Daily AI Tool Spotlight */}
        <div className="mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Star className="w-6 h-6 text-yellow-400 mr-2" />
              Today&apos;s AI Tool Spotlight
            </h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              Free Feature
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">ChatGPT for Business</h3>
              <p className="text-gray-300 mb-4">
                Discover how ChatGPT can transform your customer service and content creation workflows with AI-powered automation.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Customer service automation
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Content generation at scale
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Data analysis and insights
                </div>
              </div>
            </div>
            <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                Get Full Analysis
              </h4>
              <p className="text-sm text-gray-300 mb-4">
                Unlock detailed implementation guides, ROI calculations, and expert recommendations.
              </p>
              <UpgradePrompt
                currentPlan="free"
                requiredPlan="starter"
                feature="detailed tool analysis"
                variant="inline"
              />
            </div>
          </div>
        </div>

        {/* Limited Tool Comparisons */}
        <div className="mb-8 bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">AI Tool Comparisons</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                {userPlan.usage.comparisons}/{userPlan.limits.dailyComparisons} used today
              </span>
              <div className="w-20 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full"
                  style={{ width: `${(userPlan.usage.comparisons / userPlan.limits.dailyComparisons) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <FeatureGate
            userPlan={userPlan}
            requiredPlan="free"
            feature="basic tool comparisons"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search AI tools (ChatGPT, Claude, Jasper...)"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  disabled={userPlan.usage.comparisons >= userPlan.limits.dailyComparisons}
                >
                  Compare
                </button>
              </div>
              
              {userPlan.usage.comparisons >= userPlan.limits.dailyComparisons && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-amber-400 flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Daily limit reached
                      </h4>
                      <p className="text-sm text-amber-300">
                        You&apos;ve used all 3 daily comparisons. Upgrade to Starter for unlimited access.
                      </p>
                    </div>
                    <UpgradePrompt
                      currentPlan="free"
                      requiredPlan="starter"
                      feature="unlimited comparisons"
                      variant="banner"
                    />
                  </div>
                </div>
              )}
            </div>
          </FeatureGate>
        </div>

        {/* Basic Implementation Guides */}
        <div className="mb-8 bg-black border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <BookOpen className="w-6 h-6 text-blue-400 mr-2" />
            Implementation Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
              <h3 className="font-semibold text-white mb-2">Getting Started with AI</h3>
              <p className="text-sm text-gray-300 mb-3">
                A beginner&apos;s guide to implementing AI in your business workflow.
              </p>
              <button className="text-blue-400 text-sm font-medium hover:text-blue-300 flex items-center">
                Read Guide <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
              <h3 className="font-semibold text-white mb-2">AI Tool Selection</h3>
              <p className="text-sm text-gray-300 mb-3">
                How to choose the right AI tools for your specific business needs.
              </p>
              <button className="text-blue-400 text-sm font-medium hover:text-blue-300 flex items-center">
                Read Guide <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
              <h3 className="font-semibold text-white mb-2">ROI Measurement</h3>
              <p className="text-sm text-gray-300 mb-3">
                Track and measure the return on your AI tool investments effectively.
              </p>
              <button className="text-blue-400 text-sm font-medium hover:text-blue-300 flex items-center">
                Read Guide <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-400">Want 50+ More Guides?</h4>
                <p className="text-sm text-blue-300">
                  Get access to detailed implementation guides, industry templates, and expert strategies.
                </p>
              </div>
              <UpgradePrompt
                currentPlan="free"
                requiredPlan="starter"
                feature="50+ implementation guides"
                variant="banner"
              />
            </div>
          </div>
        </div>

        {/* Community Support */}
        <div className="mb-8 bg-black border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <MessageCircle className="w-6 h-6 text-green-400 mr-2" />
            Community Support
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Access to community forum
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Basic Q&A section
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Peer-to-peer discussions
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Join Community Forum
              </button>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-2">Need Priority Support?</h4>
              <p className="text-sm text-purple-300 mb-4">
                Get priority email support, faster response times, and dedicated help channels.
              </p>
              <UpgradePrompt
                currentPlan="free"
                requiredPlan="starter"
                feature="priority support"
                variant="inline"
              />
            </div>
          </div>
        </div>

        {/* Plan Limitations Display */}
        <div className="mb-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            Free Plan Limitations
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {userPlan.limitations?.map((limitation, index) => (
              <div key={index} className="flex items-center text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 mr-3 flex-shrink-0" />
                {limitation}
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Upgrade Prompts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <UpgradePrompt
            currentPlan="free"
            requiredPlan="starter"
            feature="unlimited AI tool comparisons and advanced analytics"
          />
          <UpgradePrompt
            currentPlan="free"
            requiredPlan="pro"
            feature="expert consultations and team collaboration tools"
          />
        </div>

        {/* Bottom Banner Upgrade */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Join 10,000+ Businesses</h3>
          <p className="text-blue-100 mb-4">
            Unlock your AI potential with unlimited comparisons, expert guidance, and advanced features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <UpgradePrompt
              currentPlan="free"
              requiredPlan="starter"
              feature="unlimited access"
              variant="banner"
            />
            <button className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/#login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};