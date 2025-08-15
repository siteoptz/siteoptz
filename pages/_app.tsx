import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import Layout from '../components/Layout'
import '../styles/globals.css'
import '../styles/comparisons.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  )
}