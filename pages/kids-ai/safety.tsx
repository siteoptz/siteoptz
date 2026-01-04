import React from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import SafetyBadge from '../../components/kids/SafetyBadge';

export default function KidsAISafety() {
  return (
    <>
      <SEOHead
        title="AI Safety Guide for Kids | COPPA Compliance & Best Practices"
        description="Learn how to keep your children safe when using AI tools. COPPA compliance, privacy protection, and safety best practices for kids and AI."
        canonicalUrl="https://siteoptz.ai/kids-ai/safety"
        keywords={['kids AI safety', 'COPPA compliance', 'AI privacy for children', 'safe AI practices', 'children online safety']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🛡️</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Safety Guide for Kids
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Everything parents need to know about keeping kids safe with AI tools
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <SafetyBadge type="coppa" />
              <SafetyBadge type="safetyCertified" />
              <SafetyBadge type="teacherApproved" />
            </div>
          </div>

          {/* COPPA Compliance Section */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-green-500">✓</span> COPPA Compliance
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">What is COPPA?</h3>
                <p className="text-gray-300 leading-relaxed">
                  The Children&apos;s Online Privacy Protection Act (COPPA) is a US federal law that protects children&apos;s online privacy. 
                  It requires websites and services to get parental consent before collecting personal information from children under 13.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">How We Ensure COPPA Compliance</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-400 mb-2">✓ Tool Verification</h4>
                    <p className="text-sm text-gray-300">Every AI tool is verified for COPPA compliance before inclusion</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-400 mb-2">✓ Privacy Reviews</h4>
                    <p className="text-sm text-gray-300">We review privacy policies and data collection practices</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-400 mb-2">✓ Age Verification</h4>
                    <p className="text-sm text-gray-300">Clear age ranges and recommendations for each tool</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-400 mb-2">✓ Regular Audits</h4>
                    <p className="text-sm text-gray-300">Ongoing monitoring of tool safety and compliance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Checklist */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Parent Safety Checklist</h2>
            
            <div className="space-y-4">
              {[
                'Review the AI tool&apos;s privacy policy before your child uses it',
                'Check age recommendations and ensure the tool is appropriate',
                'Set up parental controls and supervision features when available',
                'Discuss AI limitations and the importance of critical thinking',
                'Monitor your child&apos;s usage and conversations with AI tools',
                'Teach children to never share personal information with AI tools',
                'Explain that AI can make mistakes and shouldn&apos;t be trusted blindly',
                'Review any content your child creates or receives from AI tools'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id={`safety-${idx}`}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`safety-${idx}`} className="text-gray-300 cursor-pointer">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Age-Specific Guidelines */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Age-Specific Guidelines</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Ages 5-8: Early Learners</h3>
                <ul className="text-gray-300 space-y-2 pl-4">
                  <li>• Always supervise AI tool usage</li>
                  <li>• Choose tools with no text input requirements</li>
                  <li>• Focus on educational games and creative activities</li>
                  <li>• No sharing of personal information</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Ages 9-12: Explorers</h3>
                <ul className="text-gray-300 space-y-2 pl-4">
                  <li>• Guided exploration with periodic check-ins</li>
                  <li>• Introduction to AI concepts and limitations</li>
                  <li>• Tools for homework help and creative projects</li>
                  <li>• Teach responsible AI usage habits</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Ages 13-18: Independent Users</h3>
                <ul className="text-gray-300 space-y-2 pl-4">
                  <li>• More independence with established guidelines</li>
                  <li>• Advanced AI tools for learning and creativity</li>
                  <li>• Discussions about AI ethics and bias</li>
                  <li>• Preparation for AI in their future careers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Red Flags */}
          <div className="bg-red-900/20 border border-red-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6">🚨 Red Flags to Watch For</h2>
            
            <div className="space-y-4">
              {[
                'AI tool asks for personal information (name, address, school)',
                'No clear privacy policy or terms of service',
                'Tool allows unrestricted communication with strangers',
                'Content generation without appropriate filters',
                'No parental controls or supervision features',
                'Unclear age recommendations or restrictions',
                'Tool requires social media account linking',
                'Inappropriate or harmful content suggestions'
              ].map((flag, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">⚠️</span>
                  <span className="text-gray-300">{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Additional Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-400 mb-3">Government Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-gray-300 hover:text-blue-400 text-sm">
                      FTC COPPA Rule Overview
                    </a>
                  </li>
                  <li>
                    <a href="https://www.consumer.ftc.gov/articles/protecting-your-childs-privacy-online" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-gray-300 hover:text-blue-400 text-sm">
                      Protecting Your Child&apos;s Privacy Online
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-400 mb-3">Educational Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://www.commonsensemedia.org/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-gray-300 hover:text-blue-400 text-sm">
                      Common Sense Media
                    </a>
                  </li>
                  <li>
                    <a href="https://www.netsmartz.org/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-gray-300 hover:text-blue-400 text-sm">
                      NetSmartz Internet Safety
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Explore Safe AI Tools?</h2>
            <p className="text-lg mb-6 opacity-90">
              Browse our directory of 200+ COPPA-compliant, safety-certified AI tools for kids
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/kids-ai"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Safe AI Tools
              </Link>
              <Link
                href="/kids-ai/pricing"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}