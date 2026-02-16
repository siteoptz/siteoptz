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
    <section className={`relative section-technical--hero ${className}`} style={{ backgroundColor: 'var(--surface-base)' }}>
      {/* Technical grid background */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'linear-gradient(var(--grid-line-default) var(--border-width), transparent var(--border-width)), linear-gradient(90deg, var(--grid-line-default) var(--border-width), transparent var(--border-width))',
        backgroundSize: 'var(--grid-size) var(--grid-size)'
      }}></div>
      
      {/* Geometric accent lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-full" style={{ height: 'var(--border-width)', backgroundColor: 'var(--grid-line-strong)' }}></div>
        <div className="absolute bottom-1/3 left-0 w-full" style={{ height: 'var(--border-width)', backgroundColor: 'var(--grid-line-strong)' }}></div>
        <div className="absolute top-0 left-1/4 h-full" style={{ width: 'var(--border-width)', backgroundColor: 'var(--grid-line-default)' }}></div>
        <div className="absolute top-0 right-1/4 h-full" style={{ width: 'var(--border-width)', backgroundColor: 'var(--grid-line-default)' }}></div>
      </div>
      
      <div className="container-technical relative z-10">
        {/* Technical Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center text-secondary font-mono text-xs tracking-wider uppercase">
            <li>
              <a href="/" className="text-secondary hover:text-primary transition-fast">
                [HOME]
              </a>
            </li>
            <li><span className="mx-3 text-tertiary">&gt;</span></li>
            <li>
              <a href="/compare" className="text-secondary hover:text-primary transition-fast">
                [AI_TOOLS]
              </a>
            </li>
            <li><span className="mx-3 text-tertiary">&gt;</span></li>
            <li>
              <a href="/compare" className="text-secondary hover:text-primary transition-fast">
                [{isComparison ? 'COMPARE' : 'REVIEWS'}]
              </a>
            </li>
            <li><span className="mx-3 text-tertiary">&gt;</span></li>
            <li className="text-primary" aria-current="page">
              [{isComparison ? `${toolA.name.toUpperCase()}_VS_${toolB.name.toUpperCase()}` : `${toolA.name.toUpperCase()}_REVIEW`}]
            </li>
          </ol>
        </nav>

        {/* Main Hero Content */}
        <div className="hero-technical">
          <h1 className="text-6xl font-black text-primary leading-tight tracking-tight mb-6">
            {isComparison ? (
              <>
                <span className="font-light block mb-2">{toolA.name.toUpperCase()}</span>
                <span className="text-secondary font-normal text-4xl block mb-2">VS</span>
                <span className="font-black">{toolB.name.toUpperCase()}</span>
              </>
            ) : (
              <>
                <span className="font-light block mb-2">{toolA.name.toUpperCase()}</span>
                <span className="text-secondary font-normal text-4xl">ANALYSIS</span>
              </>
            )}
          </h1>
          
          <p className="text-lg text-secondary mb-8 max-w-4xl mx-auto font-mono tracking-wide leading-relaxed">
            {isComparison 
              ? `COMPREHENSIVE_COMPARISON // FEATURES_PRICING_USECASES // OPTIMAL_SELECTION_2025`
              : `COMPLETE_ANALYSIS // ${toolA.name.toUpperCase()}_REVIEW // FEATURES_PRICING_ALTERNATIVES`
            }
          </p>
          
          {/* Technical Status Badge */}
          <div className="inline-flex items-center surface-raised border-default border-width text-primary px-6 py-3 text-sm font-medium tracking-wider uppercase mb-12" 
               style={{ 
                 backgroundColor: 'var(--surface-raised)', 
                 border: 'var(--border-width) solid var(--border-default)', 
                 color: 'var(--text-primary)' 
               }}>
            <div className="w-2 h-2 bg-white mr-3"></div>
            STATUS: UPDATED_2025 // LATEST_DATA
          </div>
        </div>

        {/* Tool Comparison Cards */}
        <div className={`grid gap-8 max-w-6xl mx-auto ${isComparison ? 'md:grid-cols-2' : 'max-w-2xl'}`}>
          {/* Tool A Card */}
          <ToolCard tool={toolA} />
          
          {/* Tool B Card (only for comparisons) */}
          {isComparison && <ToolCard tool={toolB} />}
        </div>

        {/* Technical Metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="card-technical">
            <div className="text-3xl font-black text-primary mb-2 font-mono">2025</div>
            <div className="text-secondary text-sm tracking-wider uppercase">DATA_VERSION</div>
          </div>
          <div className="card-technical">
            <div className="text-3xl font-black text-primary mb-2 font-mono">
              {isComparison ? '05:00' : '03:00'}
            </div>
            <div className="text-secondary text-sm tracking-wider uppercase">READ_TIME_MIN</div>
          </div>
          <div className="card-technical">
            <div className="text-3xl font-black text-primary mb-2 font-mono">EXPERT</div>
            <div className="text-secondary text-sm tracking-wider uppercase">ANALYSIS_TYPE</div>
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
    ? `$${startingPrice}/MONTH` 
    : startingPrice === 'Custom' 
      ? 'CUSTOM_PRICING' 
      : 'FREE_TIER';

  return (
    <div className="card-technical">
      <div className="text-left mb-6">
        {/* Tool Logo */}
        <div className="w-16 h-16 mb-4 surface-overlay border-subtle border-width p-3" 
             style={{ 
               backgroundColor: 'var(--surface-overlay)', 
               border: 'var(--border-width) solid var(--border-subtle)' 
             }}>
          <Image
            src={tool.logo}
            alt={`${tool.name} AI tool logo - ${tool.vendor} artificial intelligence platform`}
            width={64}
            height={64}
            className="w-full h-full object-contain"
            style={{ filter: 'contrast(1.2) brightness(1.1)' }}
          />
        </div>
        
        {/* Tool Info */}
        <h2 className="text-2xl font-bold text-primary mb-2 tracking-tight">{tool.name.toUpperCase()}</h2>
        <p className="text-secondary text-sm mb-2 font-mono tracking-wider">{tool.tagline?.toUpperCase()}</p>
        <p className="text-tertiary text-sm mb-4 leading-relaxed">{tool.description}</p>
        
        {/* Technical Rating */}
        {tool.rating && (
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <span className="text-primary text-lg font-mono font-bold mr-3">
                {tool.rating.toFixed(1)}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 mr-1"
                    style={{ 
                      backgroundColor: i < Math.floor(tool.rating) ? 'var(--text-primary)' : 'var(--text-tertiary)' 
                    }}
                  ></div>
                ))}
              </div>
              <span className="ml-3 text-tertiary text-sm font-mono">
                [{tool.reviewCount?.toLocaleString() || 0}_REVIEWS]
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Key Features */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-primary mb-4 tracking-wider uppercase">CORE_FEATURES</h3>
        <ul className="space-y-3">
          {tool.features.core.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start text-secondary text-sm">
              <span className="text-tertiary mr-3 font-mono">—</span>
              {feature.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing Preview */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-primary mb-2 tracking-wider uppercase">PRICING_START</h3>
        <div className="text-2xl font-bold text-primary font-mono tracking-tight">
          {formattedPrice}
          {tool.pricing.freeTier && (
            <div className="text-sm font-normal text-secondary mt-1 font-mono">
              [FREE_TIER_AVAILABLE]
            </div>
          )}
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-primary mb-3 tracking-wider uppercase">OPTIMAL_FOR</h3>
        <div className="flex flex-wrap gap-2">
          {tool.useCases.slice(0, 3).map((useCase, index) => (
            <span 
              key={index}
              className="text-tertiary px-2 py-1 text-xs font-mono tracking-wider border-tertiary border-width"
              style={{ 
                color: 'var(--text-tertiary)', 
                border: 'var(--border-width) solid var(--border-subtle)' 
              }}
            >
              {useCase.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Technical CTA Buttons */}
      <div className="space-y-3">
        <button className="button-technical w-full">
          ACCESS_TOOL
        </button>
        <button className="button-technical--outline w-full">
          TECHNICAL_SPECS
        </button>
      </div>
    </div>
  );
}