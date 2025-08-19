import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject, text, html } = req.body;

  try {
    await sendgrid.send({
      to,
      from: `"SiteOptz AI" <${process.env.SENDGRID_SENDER}>`, // must match verified sender
      subject,
      text,
      html,
    });

    return res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("SendGrid error:", error);
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error sending email" });
  }
}