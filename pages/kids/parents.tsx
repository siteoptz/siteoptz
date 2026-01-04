import React from 'react';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { ArrowLeft, Shield, Users, BarChart, Mail, CheckCircle } from 'lucide-react';

export default function KidsParentsPage() {
  return (
    <>
      <SEOHead
        title="For Parents | siteoptz.ai Kids Coding Platform"
        description="Learn about our safe, COPPA-compliant coding platform for kids. Parent dashboards, progress tracking, and educational resources."
        canonicalUrl="https://siteoptz.ai/kids/parents"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link 
            href="/kids" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Kids Home
          </Link>

          <div className="text-center mb-12">
            <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              For Parents & Educators
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A safe, educational platform where kids learn to build with AI
            </p>
          </div>

          {/* Safety Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-black border border-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-10 h-10 text-green-600" />
                <h2 className="text-2xl font-bold text-white">Safety First</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    COPPA Compliant
                  </h3>
                  <p className="text-gray-300">We&apos;re fully compliant with children&apos;s online privacy laws</p>
                </div>
                <div>
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Content Moderation
                  </h3>
                  <p className="text-gray-300">All content is reviewed and filtered for safety</p>
                </div>
                <div>
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Parent Controls
                  </h3>
                  <p className="text-gray-300">You control what your child can access and share</p>
                </div>
                <div>
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Privacy Protected
                  </h3>
                  <p className="text-gray-300">No personal data is shared publicly</p>
                </div>
              </div>
            </div>

            {/* Features for Parents */}
            <div className="bg-black border border-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Parent Dashboard Features</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <BarChart className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-white">Progress Tracking</h3>
                    <p className="text-gray-300">See what your child is learning and how they&apos;re progressing</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-white">Project Visibility</h3>
                    <p className="text-gray-300">Review projects your child creates before they share publicly</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-white">Time Management</h3>
                    <p className="text-gray-300">Set learning goals and monitor screen time</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-white">Weekly Reports</h3>
                    <p className="text-gray-300">Get email updates on your child&apos;s learning journey</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coming Soon */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">We&apos;re Launching Soon!</h2>
              <p className="text-lg mb-8 opacity-90">
                Our platform is currently in development. Join our waitlist to be notified when we launch and get early access.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Join Waitlist
                </Link>
                <Link 
                  href="/kids"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}