import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import SEOHead from '../../components/SEOHead';
import { Rocket, Code, Users, Shield, Sparkles, ArrowRight, Play } from 'lucide-react';

export default function KidsLandingPage() {
  return (
    <>
      <SEOHead
        title="Learn to Build with AI | siteoptz.ai Kids"
        description="The first coding platform built for kids to learn AI. Build your first AI app in 10 minutes! Don't just use AI - learn to build with it."
        canonicalUrl="https://siteoptz.ai/kids"
        keywords={['kids coding', 'learn AI', 'coding for kids', 'AI education', 'kids programming', 'learn to code']}
      />
      
      <Layout className="bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-purple-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Don&apos;t just use AI.<br />
            <span className="text-blue-600">Build with it.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Kids are already using ChatGPT and AI image generators. 
            Now learn to build your own AI apps with our interactive platform.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/kids/playground"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5" />
              Try AI Playground
            </Link>
            <Link
              href="/kids/parents"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
            >
              For Parents
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-black border border-gray-800 rounded-2xl shadow-lg mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Kids are already using AI</h2>
            <p className="text-lg text-gray-300 mb-6">
              They&apos;re asking ChatGPT to write their book reports. They&apos;re generating images for school projects. 
              They&apos;re growing up in a world where you describe what you want and a machine makes it.
            </p>
            <p className="text-xl font-semibold text-blue-600">
              But nobody&apos;s teaching them how it works. Or how to build with it.
            </p>
          </div>
        </section>
        
        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Kids Love Learning Here</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="w-8 h-8" />}
              title="Build Real Projects"
              description="Create story generators, image creators, chatbots, and more. Not just tutorials—real apps you can use!"
            />
            <FeatureCard
              icon={<Rocket className="w-8 h-8" />}
              title="Learn at Your Pace"
              description="4 levels from Explorer to Innovator. Start wherever you're comfortable and level up when you're ready."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Share & Remix"
              description="Publish your projects, see what others built, and remix their code to learn even more."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Safe & Monitored"
              description="COPPA-compliant. Content moderation. Parent dashboards. Built for kids, trusted by parents."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Hands-On AI"
              description="Use real AI APIs (OpenAI, DALL-E) in a safe, guided environment. See AI in action."
            />
            <FeatureCard
              icon={<Rocket className="w-8 h-8" />}
              title="Fun Challenges"
              description="Weekly coding challenges, monthly competitions, and hackathons. Learn by doing."
            />
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-12">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">We&apos;re Building Something Amazing</h2>
            <p className="text-xl mb-8 opacity-90">
              Our AI coding platform for kids is launching soon! Be the first to know when it&apos;s ready.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/kids/playground"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
              >
                Try the Playground
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white/10 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Build Your First AI App?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of kids already building with AI
          </p>
          <Link
            href="/kids/playground"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            <Play className="w-5 h-5" />
            Try the Playground
          </Link>
        </section>
      </Layout>
    </>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-black border border-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}