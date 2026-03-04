(function(){

let currentStep = 1;
const totalSteps = 5;
let leadData = {};
let isOpen = false;

let currentLang = (document.documentElement.lang || navigator.language || "en").slice(0,2);

/* ================= I18N ================= */

const I18N = {

en:{
step1_title:"Tell us about your engineering context",
step1_1:"Independent project",
step1_2:"Startup (1–5 engineers)",
step1_3:"Small technical team (5–20)",
step1_4:"Mid-size engineering team (20–100)",
step1_5:"Large engineering organization (100+)",

step2_title:"Which industry are you working in?",
step2_1:"Automotive",
step2_2:"Tooling & Molds",
step2_3:"Protective Equipment (Helmets & Safety)",
step2_4:"Aerospace",
step2_5:"Consumer Products",
step2_6:"Industrial Systems & Industry 4.0",
step2_7:"Other industrial sector",

step3_title:"What is the current focus of your project?",
step3_1:"Concept validation",
step3_2:"Detailed simulation & testing",
step3_3:"Performance optimization",
step3_4:"Platform development support",

step4_title:"What type of technical challenge are you facing?",
step4_1:"Structural simulation",
step4_2:"Impact analysis",
step4_3:"Thermal / CFD analysis",
step4_4:"Optimization & weight reduction",
step4_5:"Design validation strategy",

step5_title:"How would you like to proceed?",
step5_1:"Request technical follow-up",
step5_2:"Continue technical discussion",

copilot_title:"Describe your technical question",
copilot_placeholder:"Enter your technical question",
copilot_submit:"Submit question",
copilot_received:"Technical query received",
copilot_review:"Submit for engineering review",

contact_title:"Engineering follow-up coordination",
contact_name:"Your name",
contact_email:"Your email",
contact_submit:"Submit request",

success_title:"✓ Request submitted",
success_text:"Our engineering team will review your context and respond shortly.",

alert_fields:"Please fill in both fields.",
alert_error:"Submission failed. Please try again."
},

pt:{
step1_title:"Fale-nos sobre o seu contexto de engenharia",
step1_1:"Projeto independente",
step1_2:"Startup (1–5 engenheiros)",
step1_3:"Pequena equipa técnica (5–20)",
step1_4:"Equipa de engenharia média (20–100)",
step1_5:"Grande organização de engenharia (100+)",

step2_title:"Em que indústria está a trabalhar?",
step2_1:"Automóvel",
step2_2:"Ferramentaria e Moldes",
step2_3:"Equipamento de proteção (capacetes e segurança)",
step2_4:"Aeroespacial",
step2_5:"Produtos de consumo",
step2_6:"Sistemas industriais e Indústria 4.0",
step2_7:"Outro setor industrial",

step3_title:"Qual é o foco atual do seu projeto?",
step3_1:"Validação de conceito",
step3_2:"Simulação detalhada e testes",
step3_3:"Otimização de desempenho",
step3_4:"Suporte ao desenvolvimento de plataforma",

step4_title:"Que tipo de desafio técnico está a enfrentar?",
step4_1:"Simulação estrutural",
step4_2:"Análise de impacto",
step4_3:"Análise térmica / CFD",
step4_4:"Otimização e redução de peso",
step4_5:"Estratégia de validação de design",

step5_title:"Como gostaria de avançar?",
step5_1:"Solicitar acompanhamento técnico",
step5_2:"Continuar discussão técnica",

copilot_title:"Descreva a sua questão técnica",
copilot_placeholder:"Introduza a sua questão técnica",
copilot_submit:"Submeter pergunta",
copilot_received:"Questão técnica recebida",
copilot_review:"Enviar para análise de engenharia",

contact_title:"Coordenação de acompanhamento técnico",
contact_name:"O seu nome",
contact_email:"O seu email",
contact_submit:"Submeter pedido",

success_title:"✓ Pedido submetido",
success_text:"A nossa equipa de engenharia irá analisar o seu contexto e responder brevemente.",

alert_fields:"Por favor preencha ambos os campos.",
alert_error:"Falha no envio. Tente novamente."
}

};

const t = I18N[currentLang] || I18N.en;

/* ================= CSS ================= */

const style = document.createElement("style");
style.innerHTML = `
:root{
--panel-bg:rgba(17,19,20,0.92);
--accent:#1C6089;
--accent-soft:#2F7BA8;
--text-main:#C7C9CF;
--status:#4CAF50;
--radius:18px;
--motion-fast:90ms ease;
--motion-slow:180ms ease;
font-family:"Inter",sans-serif;
}
.c4-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.25);opacity:0;transition:opacity var(--motion-slow);pointer-events:none;z-index:9998;}
.c4-overlay.active{opacity:1;pointer-events:auto;}
.c4-bubble{position:fixed;bottom:25px;right:25px;width:60px;height:60px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:none;border:none;z-index:10001;}
.c4-bubble svg{width:100%;height:100%;fill:#C7C9CF;}
.c4-bubble.hidden{opacity:0;pointer-events:none;}
.c4-panel{position:fixed;bottom:25px;right:25px;width:374px;max-width:95%;height:520px;background:var(--panel-bg);color:var(--text-main);border-radius:var(--radius);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(10px);transition:opacity var(--motion-slow),transform var(--motion-slow);z-index:10000;}
.c4-panel.active{opacity:1;transform:translateY(0);}
.c4-header{padding:18px 20px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;}
.c4-content{flex:1;padding:20px;overflow-y:auto;}
.c4-options{display:flex;flex-direction:column;gap:8px;margin-top:15px;}
.c4-option-btn{padding:12px 14px;background:#16181a;border-radius:8px;color:white;text-align:left;cursor:pointer;}
.c4-input{width:100%;padding:10px;margin-bottom:10px;border-radius:8px;background:#141618;color:#C7C9CF;}
`;
document.head.appendChild(style);

/* ================= UI ================= */

document.addEventListener("DOMContentLoaded",()=>{

document.body.insertAdjacentHTML("beforeend",`
<div class="c4-overlay" id="c4-overlay"></div>

<div class="c4-panel" id="c4-panel">
<div class="c4-header">
<div>Craft⁴ Engineering Copilot</div>
<div id="c4-progress">01 / 05</div>
</div>
<div class="c4-content" id="c4-content"></div>
</div>

<div class="c4-bubble" id="c4-bubble">
<svg viewBox="0 0 24 24">
<path d="M12 3C6.5 3 2 6.9 2 11.5c0 2.4 1.2 4.6 3.2 6.2L4 21l4.2-2.1c1.2.3 2.4.5 3.8.5 5.5 0 10-3.9 10-8.5S17.5 3 12 3z"/>
</svg>
</div>
`);

initLogic();

});

/* ================= LOGIC ================= */

function initLogic(){

const panel=document.getElementById("c4-panel");
const bubble=document.getElementById("c4-bubble");
const overlay=document.getElementById("c4-overlay");
const content=document.getElementById("c4-content");
const progress=document.getElementById("c4-progress");

function formatStep(n){
return String(n).padStart(2,'0')+" / "+String(totalSteps).padStart(2,'0');
}

function updateProgress(){
progress.innerText=formatStep(currentStep);
}

function toggle(){

if(!panel.classList.contains("active")){
panel.classList.add("active");
overlay.classList.add("active");
bubble.classList.add("hidden");
startFlow();
}else{
panel.classList.remove("active");
overlay.classList.remove("active");
bubble.classList.remove("hidden");
}

}

bubble.onclick=toggle;
overlay.onclick=toggle;

function renderQuestion(title,options){

updateProgress();

content.innerHTML="<strong>"+title+"</strong>";

let container=document.createElement("div");
container.className="c4-options";

options.forEach(opt=>{

let btn=document.createElement("button");
btn.className="c4-option-btn";
btn.innerText=opt.label;
btn.onclick=opt.action;

container.appendChild(btn);

});

content.appendChild(container);

}

function startFlow(){step1();}

function step1(){

currentStep=1;

renderQuestion(t.step1_title,[

{label:t.step1_1,action:()=>{leadData.context="independent";step2();}},
{label:t.step1_2,action:()=>{leadData.context="startup";step2();}},
{label:t.step1_3,action:()=>{leadData.context="small";step2();}},
{label:t.step1_4,action:()=>{leadData.context="mid";step2();}},
{label:t.step1_5,action:()=>{leadData.context="large";step2();}}

]);

}

function step2(){

currentStep=2;

renderQuestion(t.step2_title,[

{label:t.step2_1,action:()=>{leadData.industry="automotive";step3();}},
{label:t.step2_2,action:()=>{leadData.industry="molds";step3();}},
{label:t.step2_3,action:()=>{leadData.industry="protective";step3();}},
{label:t.step2_4,action:()=>{leadData.industry="aerospace";step3();}},
{label:t.step2_5,action:()=>{leadData.industry="consumer";step3();}},
{label:t.step2_6,action:()=>{leadData.industry="industry4";step3();}},
{label:t.step2_7,action:()=>{leadData.industry="other";step3();}}

]);

}

function step3(){

currentStep=3;

renderQuestion(t.step3_title,[

{label:t.step3_1,action:()=>{leadData.stage="concept";step4();}},
{label:t.step3_2,action:()=>{leadData.stage="simulation";step4();}},
{label:t.step3_3,action:()=>{leadData.stage="optimization";step4();}},
{label:t.step3_4,action:()=>{leadData.stage="platform";step4();}}

]);

}

function step4(){

currentStep=4;

renderQuestion(t.step4_title,[

{label:t.step4_1,action:()=>{leadData.challenge="structural";step5();}},
{label:t.step4_2,action:()=>{leadData.challenge="impact";step5();}},
{label:t.step4_3,action:()=>{leadData.challenge="thermal";step5();}},
{label:t.step4_4,action:()=>{leadData.challenge="weight";step5();}},
{label:t.step4_5,action:()=>{leadData.challenge="validation";step5();}}

]);

}

function step5(){

currentStep=5;

renderQuestion(t.step5_title,[

{label:t.step5_1,action:()=>{stepContact();}},
{label:t.step5_2,action:()=>{activateCopilot();}}

]);

}

function activateCopilot(){

content.innerHTML=`
<strong>${t.copilot_title}</strong>
<div style="margin-top:15px;">
<input type="text" class="c4-input" id="c4-question" placeholder="${t.copilot_placeholder}">
<button class="c4-option-btn" onclick="respondCopilot()">${t.copilot_submit}</button>
</div>
`;

}

window.respondCopilot=function(){

let q=document.getElementById("c4-question").value;

if(!q) return;

content.innerHTML=`
<strong>${t.copilot_received}</strong>
<div class="c4-options">
<button class="c4-option-btn" onclick="stepContact()">${t.copilot_review}</button>
</div>
`;

}

function stepContact(){

content.innerHTML=`
<strong>${t.contact_title}</strong>

<input class="c4-input" id="c4-name" placeholder="${t.contact_name}">
<input class="c4-input" id="c4-email" placeholder="${t.contact_email}">

<button class="c4-option-btn" onclick="submitLead()">${t.contact_submit}</button>
`;

}

window.submitLead=function(){

let name=document.getElementById("c4-name").value;
let email=document.getElementById("c4-email").value;

if(!name||!email){
alert(t.alert_fields);
return;
}

fetch("/api/engineering-lead",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,email,leadData})
})
.then(()=>{

content.innerHTML=`
<div>
<h3>${t.success_title}</h3>
<p>${t.success_text}</p>
</div>
`;

})
.catch(()=>{

alert(t.alert_error);

});

}

}

})();
