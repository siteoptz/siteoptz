import React from 'react';
import { UserPlan } from '../../types/userPlan';
import { FeatureGate } from '../FeatureGate';
import { UpgradePrompt } from '../UpgradePrompt';
import { UsageMeter } from './UsageMeter';
import { 
  Search, 
  Calendar, 
  Users, 
  CheckCircle, 
  Zap,
  Crown,
  TrendingUp,
  BookOpen,
  Clock,
  AlertCircle
} from 'lucide-react';

interface FreePlanDashboardProps {
  userPlan: UserPlan;
}

export const FreePlanDashboard: React.FC<FreePlanDashboardProps> = ({ userPlan }) => {
  return (
    <div className="space-y-8">
      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UsageMeter
          label="Daily Comparisons"
          current={userPlan.usage.comparisons}
          limit={userPlan.limits.dailyComparisons}
          icon={<Search className="w-8 h-8" />}
          color="cyan"
        />
        <UsageMeter
          label="Monthly Consultations"
          current={userPlan.usage.consultations}
          limit={userPlan.limits.monthlyConsultations}
          icon={<Calendar className="w-8 h-8" />}
          color="purple"
        />
        <UsageMeter
          label="Team Members"
          current={userPlan.usage.teamMembers}
          limit={userPlan.limits.maxTeamMembers}
          icon={<Users className="w-8 h-8" />}
          color="green"
          showProgressBar={false}
        />
      </div>

      {/* Available Features */}
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
          Your Free Plan Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userPlan.features.map((feature, index) => (
            <div key={index} className="flex items-center text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Plan Limitations */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
          <AlertCircle className="w-6 h-6 mr-2" />
          Free Plan Limitations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userPlan.limitations?.map((limitation, index) => (
            <div key={index} className="flex items-center text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 mr-3 flex-shrink-0" />
              {limitation}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Starter Plan Preview */}
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 text-blue-400 mr-2" />
            Unlock with Starter Plan
          </h3>
          <div className="space-y-4">
            <FeatureGate 
              userPlan={userPlan} 
              requiredPlan="starter"
              feature="unlimited comparisons"
              fallback={
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-blue-400 font-medium">Advanced Analytics</span>
                  </div>
                  <p className="text-blue-300 text-sm mb-3">
                    Get detailed ROI tracking, comparison history, and performance insights.
                  </p>
                  <UpgradePrompt
                    currentPlan="free"
                    requiredPlan="starter"
                    feature="advanced analytics"
                    variant="inline"
                  />
                </div>
              }
            >
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-400 font-medium">✅ Advanced Analytics Available</p>
                <p className="text-blue-300 text-sm">Access detailed ROI tracking and insights.</p>
              </div>
            </FeatureGate>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 opacity-60">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-400 font-medium">Implementation Roadmaps</span>
              </div>
              <p className="text-gray-500 text-sm">
                Get step-by-step implementation guides for your chosen tools.
              </p>
            </div>
          </div>
        </div>

        {/* Pro Plan Preview */}
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Crown className="w-5 h-5 text-purple-400 mr-2" />
            Unlock with Pro Plan
          </h3>
          <div className="space-y-4">
            <FeatureGate 
              userPlan={userPlan} 
              requiredPlan="pro"
              feature="expert consultations"
              fallback={
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-purple-400 mr-2" />
                    <span className="text-purple-400 font-medium">Expert Consultations</span>
                  </div>
                  <p className="text-purple-300 text-sm mb-3">
                    Schedule 1-on-1 sessions with AI implementation experts.
                  </p>
                  <UpgradePrompt
                    currentPlan="free"
                    requiredPlan="pro"
                    feature="expert consultations"
                    variant="inline"
                  />
                </div>
              }
            >
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <p className="text-purple-400 font-medium">✅ Expert Consultations Available</p>
                <p className="text-purple-300 text-sm">Schedule 1-on-1 sessions with AI experts.</p>
              </div>
            </FeatureGate>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 opacity-60">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-400 font-medium">Team Collaboration</span>
              </div>
              <p className="text-gray-500 text-sm">
                Invite team members and collaborate on AI tool evaluations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Upgrade Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
};