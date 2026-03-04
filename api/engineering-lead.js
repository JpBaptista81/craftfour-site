```javascript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


/* CLASSIFICAÇÃO DO PROJETO */

function classifyLead(leadData){

let projectType = "Independent";
let priority = "C";

if(["startup","small","mid","large"].includes(leadData.context)){
projectType = "Industrial";
}

if(projectType === "Industrial"){

if(["simulation","optimization"].includes(leadData.stage)){
priority = "A";
}

else if(leadData.stage === "concept"){
priority = "B";
}

}

return {projectType, priority};

}


/* DETEÇÃO DO PERFIL DO VISITANTE */

function detectProfile(email, leadData){

let profile = "Unknown";

const academicDomains = [".edu",".ac",".student",".university"];
const freeDomains = ["gmail","hotmail","outlook","icloud","yahoo"];

const domain = email.split("@")[1].toLowerCase();

/* estudante */

if(academicDomains.some(d => domain.includes(d))){
profile = "Student";
}

/* engenheiro / empresa */

else if(["startup","small","mid","large"].includes(leadData.context)){
profile = "Engineer";
}

/* email pessoal */

else if(freeDomains.some(d => domain.includes(d))){
profile = "Independent";
}

return profile;

}



export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ message: "Method not allowed" });
}

try {

const { name, email, leadData } = req.body;


/* CLASSIFICAR PROJETO */

const classification = classifyLead(leadData);

const projectType = classification.projectType;
const priority = classification.priority;


/* DETETAR PERFIL DO VISITANTE */

const visitorProfile = detectProfile(email, leadData);


/* ENGINEERING BRIEF */

const formattedLead = `
CRAFT⁴ ENGINEERING PROJECT BRIEF
--------------------------------

CLIENT
Name: ${name}
Email: ${email}

PROJECT CLASSIFICATION
Project Type: ${projectType}
Lead Priority: ${priority}

VISITOR PROFILE
${visitorProfile}

ENGINEERING CONTEXT
Organization: ${leadData.context}
Industry: ${leadData.industry}

PROJECT STAGE
${leadData.stage}

TECHNICAL CHALLENGE
${leadData.challenge}

SOURCE
Craft⁴ Engineering Copilot
https://craftfour.com
`;


/* EMAIL PARA A CRAFT⁴ */

await resend.emails.send({
from: "Craft⁴ Engineering Team <contact@craftfour.com>",
to: "contact@craftfour.com",
reply_to: email,
subject: `Engineering Project Brief – ${name}`,
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

Your engineering request has been received by our team.

Our engineers will review your project context and technical challenge and will respond as soon as possible.

Best regards,

Craft⁴ Engineering
Engineering Simulation & Industrial Design
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
```
