import Head from 'next/head';
import { 
  siteConfig, 
  generateMetaTags, 
  buildCanonicalUrl,
  buildOgImageUrl 
} from '../seo/meta-config.js';

const SEOHead = ({ 
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = 'website',
  structuredData,
  schemaData,
  noIndex = false,
  children
}) => {
  // Build complete title
  const fullTitle = title?.includes(siteConfig.siteName) 
    ? title 
    : `${title} | ${siteConfig.siteName}`;

  // Generate meta tags
  const config = {
    title: fullTitle,
    description: description || siteConfig.defaultDescription,
    keywords: keywords.length > 0 ? keywords : siteConfig.defaultKeywords,
    ogType
  };

  const metaTags = generateMetaTags(config);
  
  // Build URLs
  const canonical = canonicalUrl || siteConfig.baseUrl;
  const ogImageUrl = ogImage || buildOgImageUrl('/', title || siteConfig.defaultTitle);

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      
      {/* Meta Tags */}
      {metaTags.map((tag, index) => {
        if (tag.name) {
          return <meta key={index} name={tag.name} content={tag.content} />;
        }
        if (tag.property) {
          return <meta key={index} property={tag.property} content={tag.content} />;
        }
        if (tag.httpEquiv) {
          return <meta key={index} httpEquiv={tag.httpEquiv} content={tag.content} />;
        }
        return null;
      })}

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Image */}
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || siteConfig.defaultTitle} />
      <meta property="og:url" content={canonical} />
      
      {/* Twitter Image */}
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={title || siteConfig.defaultTitle} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Structured Data */}
      {(structuredData || schemaData) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData || schemaData)
          }}
        />
      )}
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Additional head elements */}
      {children}
    </Head>
  );
};

export default SEOHead;