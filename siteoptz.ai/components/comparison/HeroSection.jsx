import Image from 'next/image';
import { TryNowButton, LearnMoreButton } from '../CTAButton';

/**
 * Hero section component for tool comparisons
 * @param {Object} props - Component props
 * @returns {JSX.Element} Hero section component
 */
export default function HeroSection({ toolA, toolB = null, className = '' }) {
  const isComparison = !!toolB;
  
  return (
    <section className={`relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-16 lg:py-24 ${className}`}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-blue-100 text-sm">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li><span className="mx-2">/</span></li>
            <li>
              <a href="/compare" className="hover:text-white transition-colors">
                AI Tools
              </a>
            </li>
            <li><span className="mx-2">/</span></li>
            <li>
              <a href="/compare" className="hover:text-white transition-colors">
                {isComparison ? 'Compare' : 'Reviews'}
              </a>
            </li>
            <li><span className="mx-2">/</span></li>
            <li className="text-blue-200" aria-current="page">
              {isComparison ? `${toolA.name} vs ${toolB.name}` : `${toolA.name} Review`}
            </li>
          </ol>
        </nav>

        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {isComparison ? (
              <>
                {toolA.name} <span className="text-blue-200">vs</span> {toolB.name}
              </>
            ) : (
              <>
                {toolA.name} <span className="text-blue-200">Review</span>
              </>
            )}
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            {isComparison 
              ? `Complete comparison of features, pricing, and use cases. Find the best AI tool for your needs in 2025.`
              : `Complete review of ${toolA.name}: features, pricing, pros & cons, and alternatives.`
            }
          </p>
          
          {/* Updated Badge */}
          <div className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-12">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Updated for 2025 - Latest Pricing & Features
          </div>
        </div>

        {/* Tool Comparison Cards */}
        <div className={`grid gap-8 max-w-6xl mx-auto ${isComparison ? 'md:grid-cols-2' : 'max-w-2xl'}`}>
          {/* Tool A Card */}
          <ToolCard tool={toolA} />
          
          {/* Tool B Card (only for comparisons) */}
          {isComparison && <ToolCard tool={toolB} />}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-2">2025</div>
            <div className="text-blue-100">Latest Data</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-2">
              {isComparison ? '5 Min' : '3 Min'}
            </div>
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

/**
 * Individual tool card component
 */
function ToolCard({ tool }) {
  const startingPrice = tool.pricing.plans.find(plan => plan.price > 0)?.price || 'Free';
  const formattedPrice = typeof startingPrice === 'number' 
    ? `$${startingPrice}/month` 
    : startingPrice === 'Custom' 
      ? 'Custom Pricing' 
      : startingPrice;

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300">
      <div className="text-center mb-6">
        {/* Tool Logo */}
        <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl p-3 shadow-lg">
          <Image
            src={tool.logo}
            alt={`${tool.name} AI tool logo - ${tool.vendor} artificial intelligence platform`}
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Tool Info */}
        <h2 className="text-2xl font-bold text-white mb-2">{tool.name}</h2>
        <p className="text-blue-100 text-sm mb-2">{tool.tagline}</p>
        <p className="text-blue-100 text-sm mb-4">{tool.description}</p>
        
        {/* Rating */}
        {tool.rating && (
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(tool.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-white text-sm">
                {tool.rating} ({tool.reviewCount?.toLocaleString() || 0} reviews)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Key Features */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
        <ul className="space-y-2">
          {tool.features.core.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start text-blue-100 text-sm">
              <svg 
                className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
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
          {formattedPrice}
          {tool.pricing.freeTier && (
            <span className="text-base font-normal text-green-300 ml-2">
              Free tier available
            </span>
          )}
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Best For</h3>
        <div className="flex flex-wrap gap-2">
          {tool.useCases.slice(0, 3).map((useCase, index) => (
            <span 
              key={index}
              className="bg-blue-500 bg-opacity-30 text-blue-100 px-2 py-1 rounded text-xs"
            >
              {useCase}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <TryNowButton 
          tool={tool}
          size="medium"
          fullWidth
          className="bg-blue-600 hover:bg-blue-700"
        />
        <LearnMoreButton 
          tool={tool}
          size="medium"
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-blue-600"
        />
      </div>
    </div>
  );
}