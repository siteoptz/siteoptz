// components/dashboard/Sidebar.jsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  HomeIcon, 
  ChartBarIcon, 
  CogIcon, 
  LightBulbIcon,
  PlayIcon,
  MagnifyingGlassIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ activeTab, onTabChange, collapsed, onToggleCollapse }) {
  const router = useRouter();

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: HomeIcon, href: '/dashboard' },
    { id: 'google-ads', name: 'Google Ads', icon: MagnifyingGlassIcon, href: '/dashboard/google-ads' },
    { id: 'meta-ads', name: 'Meta Ads', icon: DevicePhoneMobileIcon, href: '/dashboard/meta-ads' },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon, href: '/dashboard/analytics' },
    { id: 'search-console', name: 'Search Console', icon: MagnifyingGlassIcon, href: '/dashboard/search-console' },
    { id: 'tiktok-ads', name: 'TikTok Ads', icon: PlayIcon, href: '/dashboard/tiktok-ads' },
    { id: 'linkedin-ads', name: 'LinkedIn Ads', icon: BriefcaseIcon, href: '/dashboard/linkedin-ads' },
    { id: 'insights', name: 'AI Insights', icon: LightBulbIcon, href: '/dashboard/insights' },
    { id: 'automation', name: 'Automation', icon: CogIcon, href: '/dashboard/automation' }
  ];

  const handleNavigation = (item) => {
    onTabChange(item.id);
    router.push(item.href);
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-black border-r border-gray-800 transition-all duration-300 z-50 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-white font-semibold">SiteOptz</span>
              </div>
            )}
            <button 
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              {collapsed ? <ArrowRightIcon className="w-4 h-4" /> : <ArrowLeftIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                  title={collapsed ? item.name : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-gray-800 p-4">
          <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">U</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">User Account</p>
                <p className="text-xs text-gray-400 truncate">Professional Plan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}