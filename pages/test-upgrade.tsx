import React from 'react';
import Head from 'next/head';
import UpgradeExample from '../components/UpgradeExample';

/**
 * Test page for the upgrade system
 * Visit /test-upgrade to see the complete upgrade flow in action
 */
export default function TestUpgradePage() {
  return (
    <>
      <Head>
        <title>Test Upgrade System - SiteOptz</title>
        <meta name="description" content="Test the complete upgrade system with dynamic buttons and Stripe integration" />
      </Head>
      
      <UpgradeExample />
    </>
  );
}
