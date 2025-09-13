import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react'
import Layout from '../components/Layout'
import initAnalytics, { trackPageView } from '../utils/analytics-init'
import '../styles/globals.css'
import '../styles/comparisons.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Initialize analytics on app mount
    initAnalytics()
    
    // Track page views on route change
    const handleRouteChange = (url: string) => {
      trackPageView(url)
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    
    // Cleanup
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  )
}