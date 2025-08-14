interface Tool {
  id: string;
  name: string;
  benchmarks?: Record<string, number>;
  pricing?: Array<{
    price_per_month: number;
    plan_name?: string;
  }>;
  [key: string]: any;
}

interface ToolComparisonTableProps {
  tools: Tool[];
  highlight?: string;
  defaultSelected?: string[];
}

export default function ToolComparisonTable({ tools, highlight, defaultSelected }: ToolComparisonTableProps) {
  // Calculate overall rating from benchmarks
  const getOverallRating = (tool: Tool) => {
    if (!tool.benchmarks) return 'N/A';
    const scores = Object.values(tool.benchmarks);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    return average.toFixed(1);
  };

  // Get starting price
  const getStartingPrice = (tool: Tool) => {
    if (!tool.pricing || !Array.isArray(tool.pricing)) return 'N/A';
    const freePlan = tool.pricing.find(p => p.price_per_month === 0);
    if (freePlan) return 'Free';
    const lowestPrice = Math.min(...tool.pricing.map(p => p.price_per_month).filter(p => p > 0));
    return lowestPrice > 0 ? `$${lowestPrice}/mo` : 'N/A';
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tool</th>
            <th className="border px-4 py-2">Features</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr
              key={tool.name}
              className={tool.name === highlight ? "bg-yellow-100 font-semibold" : ""}
            >
              <td className="border px-4 py-2">{tool.name}</td>
              <td className="border px-4 py-2">
                {tool.features && Array.isArray(tool.features) 
                  ? tool.features.slice(0, 3).join(", ") + (tool.features.length > 3 ? "..." : "")
                  : "No features listed"
                }
              </td>
              <td className="border px-4 py-2">{getStartingPrice(tool)}</td>
              <td className="border px-4 py-2">{getOverallRating(tool)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}