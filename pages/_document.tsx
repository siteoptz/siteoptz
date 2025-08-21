import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Mobile Optimization */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Comprehensive Favicon Configuration for Search Results */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon-192x192.png" />
        
        {/* Android Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        
        {/* MS Tile Icon */}
        <meta name="msapplication-TileImage" content="/favicon-192x192.png" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* Shortcut Icon (Legacy) */}
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Mask Icon for Safari */}
        <link rel="mask-icon" href="/favicon.png" color="#2563eb" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Resource hints for better performance */}
        <link rel="preload" href="/images/siteoptz-logo.png" as="image" type="image/png" />
        <link rel="prefetch" href="/sitemap.xml" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-06WK4MZERF"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-06WK4MZERF');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}