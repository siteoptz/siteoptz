import Head from "next/head";
import fs from "fs";
import path from "path";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ToolComparisonTable from "../components/ToolComparisonTable";
import PricingCalculator from "../components/PricingCalculator";
import FAQSection from "../components/FAQSection";

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

export default function PricingPage({ tools, faqs }: { tools: any[], faqs: any }) {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Handle URL parameters for deep linking
  useEffect(() => {
    const { tool: toolParam, plan: planParam } = router.query;
    
    if (toolParam) {
      const foundTool = tools.find((t) => t.name === toolParam);
      if (foundTool) {
        setSelectedTool(foundTool);
        
        // If plan parameter is provided, set it as well
        if (planParam && foundTool.pricing) {
          const foundPlan = foundTool.pricing.find((p: any) => p.plan === planParam);
          if (foundPlan) {
            setSelectedPlan(foundPlan);
          }
        }
      }
    }

    // Load saved selection from localStorage if no URL params
    if (!toolParam) {
      const savedToolName = localStorage.getItem("selectedTool");
      if (savedToolName) {
        const savedTool = tools.find((t) => t.name === savedToolName);
        if (savedTool) setSelectedTool(savedTool);
      }
    }
  }, [router.query, tools]);

  // Save selection when user changes tool
  const handleToolChange = (toolName) => {
    const tool = tools.find((t) => t.name === toolName);
    setSelectedTool(tool);
    setSelectedPlan(null); // Reset plan selection when tool changes
    localStorage.setItem("selectedTool", toolName);
    
    // Update URL without page refresh
    router.push({
      pathname: '/pricing',
      query: { tool: toolName }
    }, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>AI Tools Pricing Calculator | SiteOptz.ai</title>
        <meta
          name="description"
          content="Calculate pricing for top AI tools. Compare plans, get quotes, and find the best AI solution for your budget."
        />
        <meta name="keywords" content="AI tools pricing, AI calculator, AI tool costs, SiteOptz" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section>
          <h1 className="text-3xl font-bold mb-6">AI Tools Pricing Calculator</h1>
          <p className="text-gray-600 mb-8">
            Select an AI tool below to calculate pricing and get personalized quotes.
          </p>

          {/* Tool Selector */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Select AI Tool:</label>
            <select
              value={selectedTool.name}
              onChange={(e) => handleToolChange(e.target.value)}
              className="border rounded px-3 py-2 text-lg"
            >
              {tools.map((tool) => (
                <option key={tool.name} value={tool.name}>
                  {tool.name}
                </option>
              ))}
            </select>
          </div>

          {/* Show current deep link */}
          {router.query.tool && (
            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-700">
                📎 <strong>Shareable Link:</strong> 
                <code className="ml-2 text-blue-800">
                  {`https://siteoptz.ai/pricing?tool=${encodeURIComponent(selectedTool.name)}${router.query.plan ? `&plan=${encodeURIComponent(router.query.plan)}` : ''}`}
                </code>
              </p>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Compare All Tools</h2>
          <ToolComparisonTable tools={tools} highlight={selectedTool.name} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            {selectedTool.name} Pricing Calculator
          </h2>
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