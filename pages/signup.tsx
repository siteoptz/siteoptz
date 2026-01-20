import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import { StartFreeTrialButton, Start7DayTrialButton } from '../components/TrialButton';

export default function SignupPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Get query parameters
  const { plan, trial, source } = router.query;

  // If user is already signed in, redirect to appropriate page
  useEffect(() => {
    if (session?.user) {
      if (plan === 'kids-ai') {
        router.push('/kids-ai');
      } else {
        router.push('/dashboard');
      }
    }
  }, [session, plan, router]);

  // If loading, show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Determine trial type and plan
  const isKidsAIPlan = plan === 'kids-ai';
  const is7DayTrial = trial === '7days' || trial === '7-day';
  const trialPlan = isKidsAIPlan ? 'free' : (plan as string) || 'free';

  // Page title and description based on plan
  const pageTitle = isKidsAIPlan 
    ? 'Start Your Kids AI Tool Trial | Safe AI for Children'
    : 'Start Your Free Trial | AI Tools Comparison Platform';
  
  const pageDescription = isKidsAIPlan
    ? 'Begin your free trial of our COPPA-compliant, safety-certified AI tools directory for children ages 5-18.'
    : 'Start your free trial and access our comprehensive AI tools comparison platform.';

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`https://siteoptz.ai/signup${plan ? `?plan=${plan}` : ''}`}
        keywords={isKidsAIPlan 
          ? ['kids AI tools trial', 'safe AI for children', 'COPPA compliant AI', 'children AI tools']
          : ['AI tools trial', 'free trial', 'AI comparison platform', 'artificial intelligence tools']
        }
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            {isKidsAIPlan && (
              <div className="text-6xl mb-4">🧒</div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isKidsAIPlan ? (
                <>Start Your Kids AI Tool {is7DayTrial ? '7-Day' : 'Free'} Trial</>
              ) : (
                <>Start Your {is7DayTrial ? '7-Day' : 'Free'} Trial</>
              )}
            </h1>
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
              {isKidsAIPlan ? (
                'Access 200+ safety-certified, COPPA-compliant AI tools designed specifically for children ages 5-18.'
              ) : (
                'Get instant access to our comprehensive AI tools comparison platform and find the perfect solutions for your needs.'
              )}
            </p>
          </div>

          {/* Main Signup Card */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 text-center max-w-2xl mx-auto mb-8">
            <div className="mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Sign Up with Google</h2>
              <p className="text-gray-400">
                Quick and secure signup using your Google account
              </p>
            </div>

            {/* Trial Button */}
            <div className="mb-6">
              {is7DayTrial ? (
                <Start7DayTrialButton 
                  plan={trialPlan as any}
                  size="xl"
                  redirectAfterSignIn={isKidsAIPlan ? '/kids-ai' : '/dashboard'}
                  className="w-full mb-4"
                >
                  {isKidsAIPlan ? 'Start 7-Day Kids AI Trial' : 'Start 7-Day Free Trial'}
                </Start7DayTrialButton>
              ) : (
                <StartFreeTrialButton 
                  plan={trialPlan as any}
                  size="xl"
                  redirectAfterSignIn={isKidsAIPlan ? '/kids-ai' : '/dashboard'}
                  className="w-full mb-4"
                >
                  {isKidsAIPlan ? 'Start Free Kids AI Trial' : 'Start Free Trial'}
                </StartFreeTrialButton>
              )}
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {isKidsAIPlan ? (
                <>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>200+ COPPA-compliant AI tools</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Safety-certified for ages 5-18</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Parental controls & monitoring</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Educational AI coding platform</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>1000+ AI tools comparison</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Real-time pricing data</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Expert reviews & benchmarks</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Custom comparison reports</span>
                  </div>
                </>
              )}
            </div>

            {/* Trust Signals */}
            <div className="text-center text-gray-500 text-sm">
              <p>✓ No credit card required • ✓ Cancel anytime • ✓ 30-day money-back guarantee</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Already have an account?{' '}
              <Link 
                href="/api/auth/signin" 
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Sign in here
              </Link>
            </p>
            
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
              <Link href="/contact" className="hover:text-gray-300">Contact Support</Link>
            </div>
          </div>

          {/* Source Attribution */}
          {source && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Referred from: {source === 'learning-hub' ? 'Learning Hub' : source}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}