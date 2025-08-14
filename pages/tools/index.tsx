import Head from "next/head";
import fs from "fs";
import path from "path";
import { useState, useEffect } from "react";
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

export default function ToolsPage({ tools, faqs }) {
  const [selectedTool, setSelectedTool] = useState(tools[0]);

  // Load saved selection from localStorage
  useEffect(() => {
    const savedToolName = localStorage.getItem("selectedTool");
    if (savedToolName) {
      const savedTool = tools.find((t) => t.name === savedToolName);
      if (savedTool) setSelectedTool(savedTool);
    }
  }, [tools]);

  // Save selection when user changes
  const handleToolChange = (toolName) => {
    const tool = tools.find((t) => t.name === toolName);
    setSelectedTool(tool);
    localStorage.setItem("selectedTool", toolName);
  };

  return (
    <>
      <Head>
        <title>Best AI Tools Comparison | SiteOptz.ai</title>
        <meta
          name="description"
          content="Compare top AI tools with benchmarks, pricing, and features. Find the best AI solution for your business."
        />
        <meta name="keywords" content="AI tools, AI comparison, pricing, benchmarks, SiteOptz" />
      </Head>

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

