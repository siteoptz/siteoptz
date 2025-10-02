import React from 'react';
import { UserPlan } from '@/lib/server-side-auth';
import { Crown, User, Settings, Bell, LogOut } from 'lucide-react';
import Link from 'next/link';

interface CleanDashboardHeaderProps {
  userPlan: UserPlan;
  currentPage?: string;
}

export function CleanDashboardHeader({ userPlan, currentPage }: CleanDashboardHeaderProps) {
  const planDisplayName = getPlanDisplayName(userPlan.plan);
  const planColor = getPlanColor(userPlan.plan);

  return (
    <header className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-white">SiteOptz</span>
            </Link>
            
            {/* Plan Badge */}
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${planColor} bg-gray-800 border border-gray-700`}>
              <div className="flex items-center space-x-1">
                {userPlan.plan !== 'free' && <Crown className="w-3 h-3" />}
                <span>{planDisplayName}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/dashboard/pro" 
              className={`text-sm font-medium transition-colors ${
                currentPage === 'dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            
            {userPlan.plan === 'pro' && (
              <>
                <Link 
                  href="/dashboard/pro?tab=roi-dashboard" 
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'roi-dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ROI Dashboard
                </Link>
                <Link 
                  href="/dashboard/pro?tab=platforms" 
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'platforms' ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Platforms
                </Link>
                <Link 
                  href="/dashboard/pro?tab=ai-insights" 
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'ai-insights' ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  AI Insights
                </Link>
              </>
            )}
            
            <Link 
              href="/dashboard/pro/settings" 
              className={`text-sm font-medium transition-colors ${
                currentPage === 'settings' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Settings
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-white">{userPlan.userName}</div>
                <div className="text-xs text-gray-400">{userPlan.plan} plan</div>
              </div>
            </div>

            {/* Logout */}
            <Link 
              href="/api/auth/signout"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Helper functions
function getPlanDisplayName(plan: string): string {
  switch (plan) {
    case 'free': return 'Free';
    case 'starter': return 'Starter';
    case 'pro': return 'Pro';
    case 'enterprise': return 'Enterprise';
    default: return 'Unknown';
  }
}

function getPlanColor(plan: string): string {
  switch (plan) {
    case 'free': return 'text-gray-400';
    case 'starter': return 'text-blue-400';
    case 'pro': return 'text-purple-400';
    case 'enterprise': return 'text-green-400';
    default: return 'text-gray-400';
  }
}
