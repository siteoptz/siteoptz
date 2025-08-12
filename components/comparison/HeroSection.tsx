import Image from 'next/image';

interface Tool {
  tool_name: string;
  vendor: string;
  logo_url: string;
  description: string;
  features: {
    core: string[];
    advanced: string[];
    integrations: string[];
  };
  pros: string[];
  cons: string[];
  pricing: {
    monthly: number;
    yearly: number;
    enterprise: string;
    plans: {
      plan_name: string;
      price: string;
      features_included: string[];
    }[];
  };
  official_url: string;
  affiliate_link: string;
  rating: number;
  review_count: number;
  best_use_cases: string[];
  target_audience: string[];
  free_trial: boolean;
  demo_available: boolean;
}

interface HeroSectionProps {
  toolA: Tool;
  toolB: Tool;
}

export default function HeroSection({ toolA, toolB }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-20">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-blue-100 text-sm">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li><a href="/ai-tools" className="hover:text-white transition-colors">AI Tools</a></li>
            <li><span className="mx-2">/</span></li>
            <li><a href="/compare" className="hover:text-white transition-colors">Compare</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-blue-200">{toolA.tool_name} vs {toolB.tool_name}</li>
          </ol>
        </nav>

        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {toolA.tool_name} <span className="text-blue-200">vs</span> {toolB.tool_name}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            Complete comparison of features, pricing, and use cases. Find the best AI tool for your needs in 2025.
          </p>
          
          {/* Updated Badge */}
          <div className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-12">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Updated for 2025 - Latest Pricing & Features
          </div>
        </div>

        {/* Tool Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Tool A Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl p-3 shadow-lg">
                <Image
                  src={toolA.logo_url}
                  alt={`${toolA.tool_name} AI tool logo - ${toolA.vendor} artificial intelligence platform`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{toolA.tool_name}</h2>
              <p className="text-blue-100 text-sm mb-4">{toolA.description}</p>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
              <ul className="space-y-2">
                {toolA.features.core.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start text-blue-100 text-sm">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Preview */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Starting Price</h3>
              <div className="text-3xl font-bold text-white">
                {toolA.pricing.plans[0]?.price || 'Custom'}
                <span className="text-base font-normal text-blue-200 ml-1">
                  {toolA.pricing.plans[0]?.price?.includes('/') ? '' : '/month'}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={toolA.affiliate_link || toolA.official_url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Try {toolA.tool_name} Free
            </a>
          </div>

          {/* Tool B Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl p-3 shadow-lg">
                <Image
                  src={toolB.logo_url}
                  alt={`${toolB.tool_name} AI tool logo - ${toolB.vendor} artificial intelligence platform`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{toolB.tool_name}</h2>
              <p className="text-blue-100 text-sm mb-4">{toolB.description}</p>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
              <ul className="space-y-2">
                {toolB.features.core.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start text-blue-100 text-sm">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Preview */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Starting Price</h3>
              <div className="text-3xl font-bold text-white">
                {toolB.pricing.plans[0]?.price || 'Custom'}
                <span className="text-base font-normal text-blue-200 ml-1">
                  {toolB.pricing.plans[0]?.price?.includes('/') ? '' : '/month'}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={toolB.affiliate_link || toolB.official_url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Try {toolB.tool_name} Free
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-2">2025</div>
            <div className="text-blue-100">Latest Data</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-2">5 Min</div>
            <div className="text-blue-100">Read Time</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-2">Expert</div>
            <div className="text-blue-100">Analysis</div>
          </div>
        </div>
      </div>
    </section>
  );
}