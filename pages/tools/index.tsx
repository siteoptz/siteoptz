import fs from "fs";
import path from "path";
import { useState, useEffect } from "react";
import SEOHead from "../../components/SEOHead";
import { getPageConfig, buildCanonicalUrl } from "../../seo/meta-config.js";
import ToolComparisonTable from "../../components/ToolComparisonTable";
import PricingCalculator from "../../components/PricingCalculator";
import FAQSection from "../../components/FAQSection";

export async function getStaticProps() {
  const toolsPath = path.join(process.cwd(), "data", "tool_data.json");
  const faqPath = path.join(process.cwd(), "data", "faq_data.json");

  const toolsData = JSON.parse(fs.readFileSync(toolsPath, "utf-8"));
  const faqData = JSON.parse(fs.readFileSync(faqPath, "utf-8"));

  return {
    props: {
      tools: toolsData,
      faqs: faqData,
    },
  };
}

export default function ToolsPage({ tools, faqs }: { tools: any[], faqs: any }) {
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const pageConfig = getPageConfig('tools');

  // Load saved selection from localStorage
  useEffect(() => {
    const savedToolName = localStorage.getItem("selectedTool");
    if (savedToolName) {
      const savedTool = tools.find((t) => t.name === savedToolName);
      if (savedTool) setSelectedTool(savedTool);
    }
  }, [tools]);

  // Save selection when user changes
  const handleToolChange = (toolName: string) => {
    const tool = tools.find((t: any) => t.name === toolName);
    setSelectedTool(tool);
    localStorage.setItem("selectedTool", toolName);
  };

  // Generate structured data for the tools directory
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageConfig.title,
    "description": pageConfig.description,
    "url": buildCanonicalUrl('/tools'),
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": tools.length,
      "itemListElement": tools.map((tool, index) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": tool.name,
        "description": tool.overview?.description || tool.description,
        "url": `${buildCanonicalUrl('/tools')}/${tool.slug}`
      }))
    }
  };

  return (
    <>
      <SEOHead
        title={pageConfig.title}
        description={pageConfig.description}
        keywords={pageConfig.keywords}
        canonicalUrl={buildCanonicalUrl('/tools')}
        schemaData={structuredData}
      />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section>
          <h1 className="text-3xl font-bold mb-6">AI Tools Comparison</h1>

          {/* Tool Selector */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Tool:</label>
            <select
              value={selectedTool.name}
              onChange={(e) => handleToolChange(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {tools.map((tool) => (
                <option key={tool.name} value={tool.name}>
                  {tool.name}
                </option>
              ))}
            </select>
          </div>

          <ToolComparisonTable tools={tools} highlight={selectedTool.name} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Pricing Calculator for {selectedTool.name}</h2>
          <PricingCalculator
            plans={selectedTool.pricing}
            toolName={selectedTool.name}
            enablePersistence={true}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <FAQSection faqs={faqs} />
        </section>
      </main>
    </>
  );
}

