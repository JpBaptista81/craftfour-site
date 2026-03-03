import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, leadData } = req.body;

    const formattedLead = `
New Engineering Lead

Name: ${name}
Email: ${email}

Context: ${leadData.context}
Industry: ${leadData.industry}
Stage: ${leadData.stage}
Challenge: ${leadData.challenge}
    `;

    await resend.emails.send({
      from: 'Craft4 Copilot <onboarding@resend.dev>',
      to: 'joao.baptista@craftfour.com',
      subject: 'New Engineering Lead - Craft4',
      text: formattedLead,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Email sending failed' });
  }
}
