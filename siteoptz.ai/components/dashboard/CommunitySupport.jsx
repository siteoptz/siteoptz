import { useState } from 'react';
import Link from 'next/link';

const CommunitySupport = () => {
  const [activeTab, setActiveTab] = useState('help');

  const helpArticles = [
    {
      title: "Getting Started with AI Tools",
      description: "Complete beginner's guide to choosing and using AI tools effectively",
      category: "Beginner",
      readTime: "5 min",
      link: "/guides/getting-started"
    },
    {
      title: "AI Tool Comparison Guide",
      description: "How to compare AI tools and choose the right one for your needs",
      category: "Guide",
      readTime: "8 min",
      link: "/guides/comparison-guide"
    },
    {
      title: "Free vs Paid AI Tools",
      description: "Understanding when to upgrade from free to paid AI tool plans",
      category: "Planning",
      readTime: "6 min",
      link: "/guides/free-vs-paid"
    },
    {
      title: "AI Tool Security Best Practices",
      description: "Keep your data safe while using AI tools for business",
      category: "Security",
      readTime: "7 min",
      link: "/guides/security-best-practices"
    }
  ];

  const communityFeatures = [
    {
      icon: "💬",
      title: "Community Discussions",
      description: "Join discussions about AI tools with other users",
      action: "Join Discord",
      actionLink: "#",
      comingSoon: true
    },
    {
      icon: "📚",
      title: "Knowledge Base",
      description: "Browse our comprehensive database of AI tool guides",
      action: "Browse Articles",
      actionLink: "/guides"
    },
    {
      icon: "🎯",
      title: "Tool Recommendations",
      description: "Get personalized AI tool recommendations",
      action: "Get Recommendations",
      actionLink: "#",
      comingSoon: true
    },
    {
      icon: "📧",
      title: "Expert Support",
      description: "Direct email support from our AI specialists",
      action: "Contact Us",
      actionLink: "mailto:support@siteoptz.ai"
    }
  ];

  const faqs = [
    {
      question: "How do I choose the right AI tool?",
      answer: "Start by identifying your specific needs, budget, and technical requirements. Use our comparison tool to evaluate different options side by side."
    },
    {
      question: "Are free AI tools worth using?",
      answer: "Free AI tools can be excellent for personal use and small projects. However, paid versions typically offer better performance, more features, and priority support."
    },
    {
      question: "How often are tool reviews updated?",
      answer: "We update our reviews monthly or whenever there are significant feature updates or pricing changes to ensure accuracy."
    },
    {
      question: "Can I request a tool comparison?",
      answer: "Yes! Contact us with your comparison request, and we'll prioritize adding it to our comparison database."
    }
  ];

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Community Support</h2>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-900 rounded-lg p-1">
        {[
          { id: 'help', label: 'Help Center' },
          { id: 'community', label: 'Community' },
          { id: 'faq', label: 'FAQ' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Help Center Tab */}
      {activeTab === 'help' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpArticles.map((article, index) => (
              <Link
                key={index}
                href={article.link}
                className="group border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {article.readTime}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  {article.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                    {article.category}
                  </span>
                  <span className="text-cyan-400 text-xs group-hover:text-cyan-300">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Community Tab */}
      {activeTab === 'community' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityFeatures.map((feature, index) => (
              <div
                key={index}
                className="border border-gray-800 rounded-lg p-4 relative"
              >
                {feature.comingSoon && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-yellow-900 text-yellow-300 text-xs rounded-full">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{feature.description}</p>
                    {feature.comingSoon ? (
                      <button
                        disabled
                        className="text-gray-500 text-sm px-3 py-1 border border-gray-800 rounded cursor-not-allowed"
                      >
                        {feature.action}
                      </button>
                    ) : (
                      <Link
                        href={feature.actionLink}
                        className="text-cyan-400 hover:text-cyan-300 text-sm px-3 py-1 border border-cyan-400 rounded hover:border-cyan-300 transition-colors"
                      >
                        {feature.action}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">{faq.question}</h3>
              <p className="text-sm text-gray-400">{faq.answer}</p>
            </div>
          ))}
          <div className="text-center pt-4 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-3">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Link
              href="mailto:support@siteoptz.ai"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitySupport;