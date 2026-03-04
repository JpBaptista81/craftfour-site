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

    /* EMAIL PARA A CRAFT⁴ */

    await resend.emails.send({
      from: "Craft⁴ Engineering Team <contact@craftfour.com>",
      to: "contact@craftfour.com",
      reply_to: email,
      subject: `New Engineering Lead – ${name}`,
      text: formattedLead
    });

    /* AUTO-RESPOSTA PARA O VISITANTE */

    await resend.emails.send({
      from: "Craft⁴ Engineering Team <contact@craftfour.com>",
      to: email,
      subject: "Engineering request received",
      text: `
Hello ${name},

Thank you for contacting Craft⁴ Engineering.

Our engineering team has received your request and will review your project context shortly.

We will get back to you as soon as possible.

Best regards,

Craft⁴ Engineering
https://craftfour.com
`
    });

    return res.status(200).json({ success: true });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Email sending failed"
    });

  }

}
