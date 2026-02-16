import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRightIcon, BookOpenIcon, ChartBarIcon, CogIcon, ArrowRightIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/outline';
import { freeplanDashboardContent } from '../../content/free-plan-dashboard-content';

const FreePlanContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'getting-started' | 'tool-selection' | 'roi-measurement'>('getting-started');

  const tabs = [
    {
      id: 'getting-started' as const,
      title: 'Getting Started with AI',
      icon: BookOpenIcon,
      description: 'Master AI fundamentals and implementation'
    },
    {
      id: 'tool-selection' as const,
      title: 'AI Tool Selection',
      icon: CogIcon,
      description: 'Choose the perfect tools for your needs'
    },
    {
      id: 'roi-measurement' as const,
      title: 'ROI Measurement',
      icon: ChartBarIcon,
      description: 'Track and optimize your AI investments'
    }
  ];

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'getting-started':
        return freeplanDashboardContent.gettingStarted;
      case 'tool-selection':
        return freeplanDashboardContent.toolSelection;
      case 'roi-measurement':
        return freeplanDashboardContent.roiMeasurement;
      default:
        return freeplanDashboardContent.gettingStarted;
    }
  };

  const currentContent = getCurrentContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {currentContent.heroSection.headline}
            </h1>
            <p className="text-xl text-white mb-8 max-w-4xl mx-auto">
              {currentContent.heroSection.subheadline}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {currentContent.heroSection.keyPoints.map((point, index) => (
                <div key={index} className="flex items-center text-left text-white">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-800">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-2 ${
                    activeTab === tab.id ? 'text-cyan-400' : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                  <div className="text-left">
                    <div className="font-semibold">{tab.title}</div>
                    <div className="text-xs text-gray-500 hidden sm:block">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {currentContent.sections.map((section, index) => (
            <div key={section.id} className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-gray-700 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">{section.title}</h2>
              
              {/* Content HTML */}
              <div 
                className="prose prose-invert prose-lg max-w-none mb-8 prose-p:text-white prose-li:text-white prose-strong:text-white prose-h2:!text-white prose-h3:!text-white prose-h4:!text-white"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />

              {/* CTA Button */}
              {section.cta && (
                <div className="flex justify-center mt-8">
                  <Link
                    href={section.cta.link}
                    className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      section.cta.type === 'primary'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105'
                        : 'bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 hover:border-gray-600'
                    }`}
                  >
                    {section.cta.text}
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade CTA Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {freeplanDashboardContent.ctaSections.upgradePrompt.title}
            </h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              {freeplanDashboardContent.ctaSections.upgradePrompt.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {freeplanDashboardContent.ctaSections.upgradePrompt.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start text-left">
                  <StarIcon className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>

            <Link
              href={freeplanDashboardContent.ctaSections.upgradePrompt.cta.link}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
            >
              {freeplanDashboardContent.ctaSections.upgradePrompt.cta.text}
              <ArrowRightIcon className="w-6 h-6 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Free Resources Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {freeplanDashboardContent.ctaSections.freeResources.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {freeplanDashboardContent.ctaSections.freeResources.resources.map((resource, index) => (
            <Link
              key={index}
              href={resource.link}
              className="group bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-all duration-200 hover:transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {resource.title}
              </h3>
              <p className="text-white mb-4">{resource.description}</p>
              <div className="flex items-center text-cyan-400 font-medium">
                Learn More
                <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreePlanContent;