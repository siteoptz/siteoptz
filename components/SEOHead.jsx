import React from 'react';
import Head from 'next/head';

const SEOHead = ({ 
  title, 
  description, 
  canonicalUrl,
  ogImage = '/images/og-default.png',
  schemaData,
  keywords = []
}) => {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="SiteOptz" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* JSON-LD Structured Data */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData)
          }}
        />
      )}
    </Head>
  );
};

export default SEOHead;