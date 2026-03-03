export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, leadData } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 🔎 Aqui podes integrar envio real de email depois
    console.log("New Engineering Lead:");
    console.log({ name, email, leadData });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}