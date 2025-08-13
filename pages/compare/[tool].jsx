import { useRouter } from "next/router";
import toolsData from "../../data/tool_data.json";
import Head from "next/head";

export default function ToolPage() {
  const router = useRouter();
  const { tool } = router.query;

  if (!tool) return null;

  const toolData = toolsData.find((t) => t.slug === tool);

  if (!toolData) {
    return <div className="p-6">Tool not found.</div>;
  }

  const {
    tool_name,
    description,
    key_features,
    pricing,
    target_keywords,
    meta_description,
    schema_type,
  } = toolData;

  return (
    <>
      <Head>
        <title>{tool_name} Review & Pricing [2025] | SiteOptz</title>
        <meta name="description" content={meta_description} />
        <meta
          name="keywords"
          content={target_keywords?.join(", ")}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": schema_type,
              name: tool_name,
              description,
              applicationCategory: "AI Tool",
              offers: [
                {
                  "@type": "Offer",
                  name: "Free Plan",
                  description: pricing.free,
                  price: 0,
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  name: "Basic Plan",
                  description: pricing.basic,
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  name: "Pro Plan",
                  description: pricing.pro,
                  priceCurrency: "USD",
                }
              ],
            }),
          }}
        />
      </Head>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">{tool_name.charAt(0)}</span>
          </div>
          <h1 className="text-3xl font-bold">{tool_name}</h1>
        </div>
        <p className="mt-4 text-lg">{description}</p>

        {/* Features */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Key Features</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {key_features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </section>

        {/* Pricing */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Pricing Plans</h2>
          <div className="grid sm:grid-cols-3 gap-4 mt-2">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-green-600">Free</h3>
              <p className="text-sm mt-2">{pricing.free}</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-blue-600">Basic</h3>
              <p className="text-sm mt-2">{pricing.basic}</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-purple-600">Pro</h3>
              <p className="text-sm mt-2">{pricing.pro}</p>
            </div>
          </div>
        </section>

        {/* Target Keywords */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Related Keywords</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {target_keywords.map((keyword, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {keyword}
              </span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}


