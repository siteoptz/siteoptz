const fs = require('fs');
const path = require('path');

// List of B12 SEO component files to update
const b12Components = [
  '_6senseAidrivenRevenueGrowthOptimizationReviewPage.tsx',
  'AiActionsByZapierGptReviewPage.tsx',
  'BottrYourPersonalAiAssistantReviewPage.tsx',
  'BrainybearEasilyBuildAiChatbotsReviewPage.tsx',
  'ConsensusAiResearchAssistantReviewPage.tsx',
  'ConvertfilesaiFreeImageFileConverterReviewPage.tsx',
  'CozeBuildAiChatbotsEffortlesslyReviewPage.tsx',
  'DivedeckAipoweredDeckBuilderReviewPage.tsx',
  'SitekickPowerfulLandingPageBuilderReviewPage.tsx',
  'SpeechkiTexttospeechAiReviewPage.tsx',
  'TellersaiAutomaticTexttovideoToolReviewPage.tsx',
  'TexttovideoStunningVideoCreationReviewPage.tsx',
  'ThereRevolutionizingReportsWithAiReviewPage.tsx',
  'TopicalAuthorityForSeoGptGeneratorReviewPage.tsx',
  'TranslateGptForConvenientTranslationReviewPage.tsx',
  'UnbounceAiLandingPageBuilderReviewPage.tsx',
  'UniverseNocodeCustomWebsiteBuilderReviewPage.tsx',
  'UnrealSpeechCosteffectiveTexttospeechApiReviewPage.tsx',
  'VideoGeneratorMetaAiReviewPage.tsx',
  'VideoGptAiVideoMakerReviewPage.tsx',
  'WebbotifyAipoweredChatbotPlatformReviewPage.tsx',
  'WebliumConvenientAiWebsiteBuilderReviewPage.tsx',
  'WebsiteGeneratorMetaAiReviewPage.tsx',
  'ZaptPowerfulAiAppBuilderReviewPage.tsx'
];

const componentsDir = 'seo-optimization/production-components';

const oldCTAPattern = /(\s+{\/\* Ready to Get Started CTA \*\/}\s+<section className="py-20 relative z-10">\s+<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 bg-black border border-gray-800 rounded-2xl p-12">\s+<h2 className="text-4xl font-bold text-white mb-6">\s+Ready to Get Started with [^?]+\?\s+<\/h2>\s+<p className="text-xl text-gray-300 mb-8">\s+[^<]+<\/p>)/;

const newCTAContent = `        {/* Ready to Get Started CTA */}
        <section className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 bg-black border border-gray-800 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Work Directly With Experts Who've Helped Businesses Scale With AI
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Not Another Demo. A Real Strategy Session For Your Business.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Get Your Custom AI Roadmap in 30 Minutes
            </p>`;

function updateCTAInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Look for the generic CTA pattern and replace it
    const ctaRegex = /(\s+<h2 className="text-4xl font-bold text-white mb-6">\s+Ready to Get Started with [^?]+\?\s+<\/h2>\s+<p className="text-xl text-gray-300 mb-8">\s+[^<]+<\/p>)/;
    
    if (ctaRegex.test(content)) {
      content = content.replace(ctaRegex, `            <h2 className="text-4xl font-bold text-white mb-6">
              Work Directly With Experts Who've Helped Businesses Scale With AI
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Not Another Demo. A Real Strategy Session For Your Business.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Get Your Custom AI Roadmap in 30 Minutes
            </p>`);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated CTA in ${path.basename(filePath)}`);
      return true;
    } else {
      console.log(`⚠️  CTA pattern not found in ${path.basename(filePath)}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Update all B12 component files
let updatedCount = 0;
b12Components.forEach(component => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    if (updateCTAInFile(filePath)) {
      updatedCount++;
    }
  } else {
    console.log(`⚠️  File not found: ${component}`);
  }
});

console.log(`\n🎉 Successfully updated CTA sections in ${updatedCount} B12 component files`);