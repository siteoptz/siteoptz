import React from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import { buildCanonicalUrl } from '../seo/meta-config';

export default function CookiePolicy() {
  const lastUpdated = "January 3, 2025";
  
  return (
    <>
      <SEOHead
        title="Cookie Policy - SiteOptz AI"
        description="Learn about how SiteOptz uses cookies and similar technologies to improve your browsing experience and provide personalized content."
        keywords={["cookie policy", "privacy", "data protection", "cookies", "tracking", "SiteOptz"]}
        canonicalUrl={buildCanonicalUrl('/cookies')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        <main className="max-w-4xl mx-auto px-4 py-10 relative z-10">
          <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-gray-800 p-8 md:p-12">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            
            <p className="text-gray-400 mb-8">
              Last Updated: {lastUpdated}
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed">
                  This Cookie Policy explains how SiteOptz AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) uses cookies and similar technologies to recognize you when you visit our website at <a href="https://www.siteoptz.ai" className="text-cyan-400 hover:text-cyan-300">www.siteoptz.ai</a> (&ldquo;Website&rdquo;). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. What Are Cookies?</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Cookies set by the website owner (in this case, SiteOptz) are called &ldquo;first party cookies&rdquo;. Cookies set by parties other than the website owner are called &ldquo;third party cookies&rdquo;. Third party cookies enable third party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">Essential Cookies</h3>
                    <p className="text-gray-300 mb-3">
                      These cookies are strictly necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
                    </p>
                    <div className="text-sm text-gray-400">
                      <span className="font-medium">Duration:</span> Session
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">Analytics Cookies</h3>
                    <p className="text-gray-300 mb-3">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous.
                    </p>
                    <div className="text-sm text-gray-400">
                      <span className="font-medium">Duration:</span> Up to 2 years
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">Functional Cookies</h3>
                    <p className="text-gray-300 mb-3">
                      These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies, then some or all of these services may not function properly.
                    </p>
                    <div className="text-sm text-gray-400">
                      <span className="font-medium">Duration:</span> Up to 1 year
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">Marketing Cookies</h3>
                    <p className="text-gray-300 mb-3">
                      These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites. They do not store directly personal information but are based on uniquely identifying your browser and internet device.
                    </p>
                    <div className="text-sm text-gray-400">
                      <span className="font-medium">Duration:</span> Up to 1 year
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Specific Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cookie Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Provider</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Purpose</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      <tr>
                        <td className="px-4 py-4 text-sm text-gray-300">_ga</td>
                        <td className="px-4 py-4 text-sm text-gray-300">Google Analytics</td>
                        <td className="px-4 py-4 text-sm text-gray-300">Distinguishes unique users</td>
                        <td className="px-4 py-4 text-sm text-gray-300">Analytics</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 text-sm text-gray-300">_gid</td>
                        <td className="px-4 py-4 text-sm text-gray-300">Google Analytics</td>
                        <td className="px-4 py-4 text-sm text-gray-300">Distinguishes unique users</td>
                        <td className="px-4 py-4 text-sm text-gray-300">Analytics</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 text-sm text-gray-300">selectedTool</td>
                        <td className="px-4 py-4 text-sm text-gray-300">SiteOptz</td>
                        <td className="px-4 py-4 text-sm text-gray-300">Remembers user&apos;s tool selection</td>
                        <td className="px-4 py-4 text-sm text-gray-300">Functional</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 text-sm text-gray-300">cookieConsent</td>
                        <td className="px-4 py-4 text-sm text-gray-300">SiteOptz</td>
                        <td className="px-4 py-4 text-sm text-gray-300">Stores cookie consent preferences</td>
                        <td className="px-4 py-4 text-sm text-gray-300">Essential</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. How to Control Cookies</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
                </p>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 mt-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">Browser Controls</h3>
                  <p className="text-gray-300 mb-4">
                    Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience. To find out more about cookies, including how to see what cookies have been set, visit:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li><a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">www.aboutcookies.org</a></li>
                    <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">www.allaboutcookies.org</a></li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Third-Party Cookies</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Website, deliver advertisements on and through the Website, and so on. These third parties include:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Google Analytics for website analytics</li>
                  <li>Google AdSense for advertising (if applicable)</li>
                  <li>Social media platforms for social sharing features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Do Not Track Signals</h2>
                <p className="text-gray-300 leading-relaxed">
                  Some browsers incorporate a Do Not Track (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Our website currently does not respond to DNT signals, but we respect your privacy choices through our cookie consent manager.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Updates to This Cookie Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions about our use of cookies or other technologies, please contact us at:
                </p>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                  <p className="text-gray-300">
                    <strong className="text-white">SiteOptz AI</strong><br />
                    Email: <a href="mailto:privacy@siteoptz.ai" className="text-cyan-400 hover:text-cyan-300">privacy@siteoptz.ai</a><br />
                    Website: <a href="https://www.siteoptz.ai" className="text-cyan-400 hover:text-cyan-300">www.siteoptz.ai</a><br />
                    Contact Form: <Link href="/contact" className="text-cyan-400 hover:text-cyan-300">Contact Us</Link>
                  </p>
                </div>
              </section>

              <section className="border-t border-gray-800 pt-8 mt-12">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/privacy" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    View Privacy Policy
                  </Link>
                  <Link 
                    href="/terms" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    View Terms of Service
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}