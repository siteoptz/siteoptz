import React, { useState } from 'react';
import Link from 'next/link';
import { UserPlan } from '../../types/userPlan';
import { User, Bell, Zap, Settings, CreditCard, MessageSquare, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/router';

interface DashboardHeaderProps {
  userPlan: UserPlan;
  userName?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userPlan,
  userName = "Dashboard User"
}) => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefreshPlan = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/user/refresh-plan', {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Plan refreshed:', data);
        // Reload the page to get fresh data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error refreshing plan:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'starter': return 'bg-blue-100 text-blue-800';
      case 'pro': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const navigationItems = [
    {
      name: 'Overview',
      href: `/dashboard/${userPlan}`,
      icon: Zap
    },
    {
      name: 'Billing',
      href: `/dashboard/${userPlan}/billing`,
      icon: CreditCard
    },
    {
      name: 'Notifications',
      href: `/dashboard/${userPlan}/notifications`,
      icon: MessageSquare
    },
    {
      name: 'Settings',
      href: `/dashboard/${userPlan}/settings`,
      icon: Settings
    }
  ];

  return (
    <header className="bg-black/50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-white">
              SiteOptz
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-cyan-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(userPlan)}`}>
                {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan
              </span>
              <button
                onClick={handleRefreshPlan}
                disabled={isRefreshing}
                className="ml-2 text-gray-400 hover:text-cyan-400 transition-colors"
                title="Refresh plan status"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
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