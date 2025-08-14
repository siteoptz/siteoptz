import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, toolName, selectedPlan, discountCode } = req.body;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    const quotesFile = path.join(process.cwd(), "data", "quotes.json");
    const existingQuotes = fs.existsSync(quotesFile)
      ? JSON.parse(fs.readFileSync(quotesFile, "utf-8"))
      : [];

    const id = Math.random().toString(36).substring(2, 10);

    const newQuote = {
      id,
      email,
      toolName,
      selectedPlan,
      discountCode,
      expiresAt: expiresAt.toISOString(),
      reminded: false,
    };

    existingQuotes.push(newQuote);
    fs.writeFileSync(quotesFile, JSON.stringify(existingQuotes, null, 2));

    const deepLink = `https://siteoptz.ai/pricing?quoteId=${id}`;

    return res.status(200).json({ success: true, deepLink });
  }

  return res.status(405).json({ message: "Method not allowed" });
}