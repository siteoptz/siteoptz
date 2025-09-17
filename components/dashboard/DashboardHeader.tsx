import React from 'react';
import Link from 'next/link';
import { UserPlan } from '../../types/userPlan';
import { User, Bell, Zap } from 'lucide-react';

interface DashboardHeaderProps {
  userPlan: UserPlan;
  userName?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userPlan,
  userName = "Dashboard User"
}) => {
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'starter': return 'bg-blue-100 text-blue-800';
      case 'pro': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-black/50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              SiteOptz
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(userPlan.plan)}`}>
                {userPlan.plan.charAt(0).toUpperCase() + userPlan.plan.slice(1)} Plan
              </span>
            </div>
            <button className="text-gray-300 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8 text-gray-300" />
              <span className="text-white">{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};