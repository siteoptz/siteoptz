import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { quoteId } = req.query;

  const quotesFile = path.join(process.cwd(), "data", "quotes.json");
  if (!fs.existsSync(quotesFile)) {
    return res.status(404).json({ message: "Quote not found" });
  }

  const quotes = JSON.parse(fs.readFileSync(quotesFile, "utf-8"));
  const quote = quotes.find((q) => q.id === quoteId);

  if (!quote) {
    return res.status(404).json({ message: "Quote not found" });
  }

  const now = new Date();
  const expiryDate = new Date(quote.expiresAt);

  const expired = now > expiryDate;

  res.status(200).json({
    ...quote,
    expired,
  });
}