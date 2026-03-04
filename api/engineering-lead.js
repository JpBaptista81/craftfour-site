import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, leadData } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {

    await Promise.all([

      /* EMAIL INTERNO */

      resend.emails.send({
        from: "Craft⁴ Engineering Copilot <copilot@craftfour.com>",
        to: "contact@craftfour.com",
        subject: "New Engineering Lead",
        html: `
        <h3>New Engineering Lead</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Industry:</b> ${leadData?.industry || "-"}</p>
        <p><b>Context:</b> ${leadData?.context || "-"}</p>
        <p><b>Challenge:</b> ${leadData?.challenge || "-"}</p>
        `
      }),

      /* AUTO REPLY */

      resend.emails.send({
        from: "Craft⁴ Engineering Team <copilot@craftfour.com>",
        to: email,
        subject: "Engineering request received",
        html: `
        <p>Hello ${name},</p>
        <p>Our engineering team received your request.</p>
        <p>We will review your context and reply shortly.</p>
        <br>
        <p>Craft⁴ Engineering</p>
        `
      })

    ]);

    return res.status(200).json({ success: true });

  } catch (err) {

    console.error("Resend error:", err);

    return res.status(500).json({
      error: "Email failed"
    });

  }

}
