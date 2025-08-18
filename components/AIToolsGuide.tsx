import React from 'react';
import { ChevronRight, Download, FileText, TrendingUp, Shield, Users, Zap, BarChart3 } from 'lucide-react';

interface GuideSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

const sections: GuideSection[] = [
  { id: 'executive-summary', title: 'Executive Summary', icon: <FileText className="w-5 h-5" /> },
  { id: 'methodology', title: 'Methodology & Research', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'market-landscape', title: 'Market Landscape', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 'evaluation-framework', title: 'Evaluation Framework', icon: <Shield className="w-5 h-5" /> },
  { id: 'tool-analysis', title: 'Tool Analysis', icon: <Zap className="w-5 h-5" /> },
  { id: 'implementation', title: 'Implementation Roadmap', icon: <Users className="w-5 h-5" /> },
];

export default function AIToolsGuide() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl">
      {/* Cover Page */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white p-16 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-lg mb-6">
            <BarChart3 className="w-10 h-10" />
          </div>
        </div>
        
        <h1 className="text-5xl font-light mb-4 tracking-tight">
          The Enterprise AI Tools
        </h1>
        <h2 className="text-4xl font-light mb-8 text-blue-200">
          Landscape 2025
        </h2>
        
        <div className="border-t border-white/20 pt-8 mt-12">
          <p className="text-xl font-light mb-2">
            A Comprehensive Decision Framework
          </p>
          <p className="text-lg text-slate-300">
            for Digital Transformation
          </p>
        </div>
        
        <div className="mt-16 text-sm text-slate-400">
          <p>Strategic Intelligence Report</p>
          <p className="font-semibold text-white mt-2">Q1 2025</p>
        </div>
      </div>

      {/* Key Insights Bar */}
      <div className="bg-blue-600 text-white p-6">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">$186.2B</div>
            <div className="text-sm opacity-90">Market Size 2025</div>
          </div>
          <div>
            <div className="text-3xl font-bold">87%</div>
            <div className="text-sm opacity-90">Enterprise Adoption</div>
          </div>
          <div>
            <div className="text-3xl font-bold">300%</div>
            <div className="text-sm opacity-90">Average ROI</div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="p-12 bg-gray-50">
        <h3 className="text-2xl font-light text-gray-900 mb-8">Table of Contents</h3>
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center group hover:bg-white p-3 rounded-lg transition-colors">
              <span className="text-blue-600 mr-4 opacity-60">{section.icon}</span>
              <span className="text-gray-500 mr-4 font-light">0{index + 1}</span>
              <span className="flex-grow text-gray-800 group-hover:text-blue-600 transition-colors">
                {section.title}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Executive Summary Preview */}
      <div className="p-12">
        <h3 className="text-3xl font-light text-gray-900 mb-8">Executive Summary</h3>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed mb-6">
            The artificial intelligence tools market has reached an inflection point in 2025, 
            with enterprise adoption rates exceeding 87% across Fortune 500 companies. 
            Our comprehensive analysis of 200+ AI tools reveals critical insights for strategic decision-making.
          </p>

          <div className="bg-slate-50 p-8 rounded-lg my-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Critical Success Factors</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Integration Capability</h5>
                  <p className="text-sm text-gray-600 mt-1">73% of failed implementations cite poor integration</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Scalability Architecture</h5>
                  <p className="text-sm text-gray-600 mt-1">Solutions must support 10x growth</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Compliance Framework</h5>
                  <p className="text-sm text-gray-600 mt-1">GDPR, CCPA, and emerging AI regulations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Total Cost of Ownership</h5>
                  <p className="text-sm text-gray-600 mt-1">Hidden costs average 2.3x initial licensing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Position Matrix */}
      <div className="p-12 bg-gray-50">
        <h3 className="text-2xl font-light text-gray-900 mb-8">Competitive Positioning Matrix</h3>
        
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-8">
            <div className="border-r border-b border-gray-200 pr-8 pb-8">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                High Performance / High Cost
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  OpenAI (GPT-4, DALL-E 3)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Anthropic (Claude 3 Opus)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Google (Gemini Ultra)
                </li>
              </ul>
            </div>
            
            <div className="border-b border-gray-200 pb-8">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                High Performance / Moderate Cost
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Microsoft Copilot
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Cohere
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Perplexity AI
                </li>
              </ul>
            </div>
            
            <div className="border-r border-gray-200 pr-8 pt-8">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Balanced Performance / Cost
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                  Claude 3 Sonnet
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                  GPT-3.5 Turbo
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                  Gemini Pro
                </li>
              </ul>
            </div>
            
            <div className="pt-8">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Specialized / Niche
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  Jasper AI (Marketing)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  GitHub Copilot (Development)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  Midjourney (Creative)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Roadmap Preview */}
      <div className="p-12">
        <h3 className="text-2xl font-light text-gray-900 mb-8">Implementation Roadmap</h3>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-32 text-right pr-6">
              <div className="text-sm font-semibold text-gray-500">PHASE 1</div>
              <div className="text-xs text-gray-400">Months 1-3</div>
            </div>
            <div className="flex-grow border-l-2 border-blue-200 pl-6 pb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Foundation</h4>
              <p className="text-gray-600 text-sm">Establish governance framework, complete tool selection, deploy pilot programs</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-32 text-right pr-6">
              <div className="text-sm font-semibold text-gray-500">PHASE 2</div>
              <div className="text-xs text-gray-400">Months 4-9</div>
            </div>
            <div className="flex-grow border-l-2 border-blue-200 pl-6 pb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Expansion</h4>
              <p className="text-gray-600 text-sm">Scale successful pilots, integrate with core systems, build internal capabilities</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-32 text-right pr-6">
              <div className="text-sm font-semibold text-gray-500">PHASE 3</div>
              <div className="text-xs text-gray-400">Months 10-18</div>
            </div>
            <div className="flex-grow border-l-2 border-blue-200 pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">Optimization</h4>
              <p className="text-gray-600 text-sm">Achieve enterprise-wide adoption, optimize for efficiency, drive innovation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-12 text-center">
        <h3 className="text-3xl font-light mb-4">Ready to Transform Your Enterprise?</h3>
        <p className="text-xl mb-8 opacity-90">
          Download the complete 45-page strategic intelligence report
        </p>
        
        <button className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          <Download className="w-5 h-5 mr-3" />
          Download Complete Guide (PDF)
        </button>
        
        <p className="mt-6 text-sm opacity-75">
          Includes detailed vendor analysis, ROI calculators, and implementation templates
        </p>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 p-8 text-center text-sm">
        <p className="mb-2">© 2025 Strategic Intelligence Unit. All rights reserved.</p>
        <p>This report contains proprietary research and analysis.</p>
      </div>
    </div>
  );
}