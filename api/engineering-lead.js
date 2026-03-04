import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {

    const { name, email, leadData } = req.body;

    const formattedLead = `
NEW ENGINEERING LEAD

Name: ${name}
Email: ${email}

Industry: ${leadData.industry}
Project Stage: ${leadData.stage}

Challenge:
${leadData.challenge}

Context:
${leadData.context}
`;

    await resend.emails.send({
      from: "Craft⁴ Engineering <no-reply@craftfour.com>",
      to: "contact@craftfour.com",
      reply_to: email,
      subject: `New Engineering Lead – ${name}`,
      text: formattedLead,
    });

    return res.status(200).json({ success: true });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Email sending failed"
    });

  }
}
