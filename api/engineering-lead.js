import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {

    const { name, email, leadData = {} } = req.body;

    const formattedLead = `
New Engineering Lead — Craft⁴

Name: ${name}
Email: ${email}

Context: ${leadData.context || "Not provided"}
Industry: ${leadData.industry || "Not provided"}
Stage: ${leadData.stage || "Not provided"}
Challenge: ${leadData.challenge || "Not provided"}
`;

await resend.emails.send({
  from: 'Craft⁴ Engineering <no-reply@craftfour.com>',
  to: 'contact@craftfour.com',
  reply_to: email,
  subject: `New Engineering Lead – ${name}`,
  text: formattedLead,
});

    return res.status(200).json({ success: true });

  } catch (error) {

    console.error("Email error:", error);

    return res.status(500).json({
      success: false,
      message: "Email sending failed"
    });

  }
}

