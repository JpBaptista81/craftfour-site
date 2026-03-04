(function(){

let currentStep = 1;
const totalSteps = 5;
let leadData = {};
let isOpen = false;

/* Detect language */
let lang = (document.documentElement.lang || "en").toUpperCase();

/* ================= I18N ================= */

const T = {

EN:{
context:"Tell us about your engineering context",
industry:"Which industry are you working in?",
stage:"What is the current focus of your project?",
challenge:"What type of technical challenge are you facing?",
proceed:"How would you like to proceed?",
independent:"Independent project",
startup:"Startup (1–5 engineers)",
small:"Small technical team (5–20)",
mid:"Mid-size engineering team (20–100)",
large:"Large engineering organization (100+)",
automotive:"Automotive",
molds:"Tooling & Molds",
protective:"Protective Equipment",
aerospace:"Aerospace",
consumer:"Consumer Products",
industry4:"Industrial Systems & Industry 4.0",
other:"Other industrial sector",
concept:"Concept validation",
simulation:"Detailed simulation & testing",
optimization:"Performance optimization",
platform:"Platform development support",
structural:"Structural simulation",
impact:"Impact analysis",
thermal:"Thermal / CFD analysis",
weight:"Optimization & weight reduction",
validation:"Design validation strategy",
request:"Request technical follow-up",
discussion:"Continue technical discussion",
name:"Your name",
email:"Your email",
submit:"Submit request",
successTitle:"✓ Request submitted",
successText:"Our engineering team will review your context and respond shortly."
},

PT:{
context:"Fale-nos sobre o contexto do seu projeto de engenharia",
industry:"Em que indústria está a trabalhar?",
stage:"Qual é o foco atual do seu projeto?",
challenge:"Que desafio técnico está a enfrentar?",
proceed:"Como gostaria de prosseguir?",
independent:"Projeto independente",
startup:"Startup (1–5 engenheiros)",
small:"Pequena equipa técnica (5–20)",
mid:"Equipa de engenharia média (20–100)",
large:"Grande organização de engenharia (100+)",
automotive:"Automóvel",
molds:"Ferramentaria e Moldes",
protective:"Equipamentos de Proteção",
aerospace:"Aeroespacial",
consumer:"Produtos de Consumo",
industry4:"Sistemas Industriais e Indústria 4.0",
other:"Outro setor industrial",
concept:"Validação de conceito",
simulation:"Simulação detalhada",
optimization:"Otimização de desempenho",
platform:"Suporte ao desenvolvimento de plataforma",
structural:"Simulação estrutural",
impact:"Análise de impacto",
thermal:"Análise térmica / CFD",
weight:"Otimização e redução de peso",
validation:"Estratégia de validação de design",
request:"Solicitar acompanhamento técnico",
discussion:"Continuar discussão técnica",
name:"O seu nome",
email:"O seu email",
submit:"Enviar pedido",
successTitle:"✓ Pedido enviado",
successText:"A nossa equipa de engenharia irá analisar o seu contexto e responder em breve."
},

ES:{
context:"Cuéntenos sobre el contexto de su proyecto",
industry:"¿En qué industria trabaja?",
stage:"¿Cuál es el enfoque actual de su proyecto?",
challenge:"¿Qué desafío técnico enfrenta?",
proceed:"¿Cómo desea continuar?",
request:"Solicitar seguimiento técnico",
discussion:"Continuar discusión técnica",
name:"Su nombre",
email:"Su correo electrónico",
submit:"Enviar solicitud",
successTitle:"✓ Solicitud enviada",
successText:"Nuestro equipo revisará su contexto y responderá pronto."
},

FR:{
context:"Parlez-nous du contexte de votre projet",
industry:"Dans quelle industrie travaillez-vous ?",
stage:"Quel est le focus actuel de votre projet ?",
challenge:"Quel défi technique rencontrez-vous ?",
proceed:"Comment souhaitez-vous continuer ?",
request:"Demander un suivi technique",
discussion:"Continuer la discussion technique",
name:"Votre nom",
email:"Votre email",
submit:"Envoyer la demande",
successTitle:"✓ Demande envoyée",
successText:"Notre équipe analysera votre contexte et répondra rapidement."
},

DE:{
context:"Erzählen Sie uns über Ihr Engineering-Projekt",
industry:"In welcher Branche arbeiten Sie?",
stage:"Was ist der aktuelle Fokus Ihres Projekts?",
challenge:"Welche technische Herausforderung haben Sie?",
proceed:"Wie möchten Sie fortfahren?",
request:"Technisches Follow-up anfordern",
discussion:"Technische Diskussion fortsetzen",
name:"Ihr Name",
email:"Ihre E-Mail",
submit:"Anfrage senden",
successTitle:"✓ Anfrage gesendet",
successText:"Unser Engineering-Team wird Ihren Kontext prüfen."
},

ZH:{
context:"请介绍您的工程项目背景",
industry:"您所在的行业是什么？",
stage:"您的项目当前重点是什么？",
challenge:"您目前面临什么技术挑战？",
proceed:"您希望如何继续？",
request:"请求技术跟进",
discussion:"继续技术讨论",
name:"您的姓名",
email:"您的邮箱",
submit:"提交请求",
successTitle:"✓ 请求已提交",
successText:"我们的工程团队会尽快联系您。"
}

};

function t(key){
return (T[lang] && T[lang][key]) || T["EN"][key];
}

/* ================= UI ================= */

document.addEventListener("DOMContentLoaded",()=>{

document.body.insertAdjacentHTML("beforeend",`

<div class="c4-overlay" id="c4-overlay"></div>

<div class="c4-panel" id="c4-panel">

<div class="c4-header">
<div>
<div class="c4-title">Craft<sup>4</sup> Engineering Copilot</div>
<div class="c4-subtitle">AI-powered simulation assistant</div>
</div>
<div>
<div class="c4-status"><div class="c4-status-dot"></div> Online</div>
<div class="c4-progress" id="c4-progress">01 / 05</div>
</div>
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

/* ================= Logic ================= */

function initLogic(){

const panel=document.getElementById("c4-panel");
const bubble=document.getElementById("c4-bubble");
const overlay=document.getElementById("c4-overlay");
const content=document.getElementById("c4-content");
const progress=document.getElementById("c4-progress");

function updateProgress(){
progress.innerText=String(currentStep).padStart(2,'0')+" / 05";
}

function renderQuestion(title,options){

updateProgress();

content.innerHTML=`<strong>| ${title}</strong>`;

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

bubble.onclick=toggle;
overlay.onclick=toggle;

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

/* ================= Steps ================= */

function startFlow(){step1();}

function step1(){

currentStep=1;

renderQuestion(t("context"),[

{label:t("independent"),action:()=>{leadData.context="independent";step2();}},
{label:t("startup"),action:()=>{leadData.context="startup";step2();}},
{label:t("small"),action:()=>{leadData.context="small";step2();}},
{label:t("mid"),action:()=>{leadData.context="mid";step2();}},
{label:t("large"),action:()=>{leadData.context="large";step2();}}

]);

}

function step2(){

currentStep=2;

renderQuestion(t("industry"),[

{label:t("automotive"),action:()=>{leadData.industry="automotive";step3();}},
{label:t("molds"),action:()=>{leadData.industry="molds";step3();}},
{label:t("protective"),action:()=>{leadData.industry="protective";step3();}},
{label:t("aerospace"),action:()=>{leadData.industry="aerospace";step3();}},
{label:t("consumer"),action:()=>{leadData.industry="consumer";step3();}},
{label:t("industry4"),action:()=>{leadData.industry="industry4";step3();}},
{label:t("other"),action:()=>{leadData.industry="other";step3();}}

]);

}

function step3(){

currentStep=3;

renderQuestion(t("stage"),[

{label:t("concept"),action:()=>{leadData.stage="concept";step4();}},
{label:t("simulation"),action:()=>{leadData.stage="simulation";step4();}},
{label:t("optimization"),action:()=>{leadData.stage="optimization";step4();}},
{label:t("platform"),action:()=>{leadData.stage="platform";step4();}}

]);

}

function step4(){

currentStep=4;

renderQuestion(t("challenge"),[

{label:t("structural"),action:()=>{leadData.challenge="structural";step5();}},
{label:t("impact"),action:()=>{leadData.challenge="impact";step5();}},
{label:t("thermal"),action:()=>{leadData.challenge="thermal";step5();}},
{label:t("weight"),action:()=>{leadData.challenge="weight";step5();}},
{label:t("validation"),action:()=>{leadData.challenge="validation";step5();}}

]);

}

function step5(){

currentStep=5;

renderQuestion(t("proceed"),[

{label:t("request"),action:()=>{stepContact();}},
{label:t("discussion"),action:()=>{activateCopilot();}}

]);

}

/* ================= Contact ================= */

function stepContact(){

content.innerHTML=`

<strong>| ${t("request")}</strong>

<div style="margin-top:15px;">

<input type="text" class="c4-input" placeholder="${t("name")}" id="c4-name">

<input type="email" class="c4-input" placeholder="${t("email")}" id="c4-email">

<button class="c4-submit-btn" onclick="submitLead()">${t("submit")}</button>

</div>

`;

}

/* ================= Submit ================= */

window.submitLead=function(){

let name=document.getElementById("c4-name").value;
let email=document.getElementById("c4-email").value;

if(!name||!email){
alert("Fill name and email");
return;
}

fetch("/api/engineering-lead",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,email,leadData})

})
.then(()=>{

content.innerHTML=`

<div class="c4-success">

<h3>${t("successTitle")}</h3>

<p>${t("successText")}</p>

</div>

`;

})

.catch(()=>{

alert("Submission failed");

});

}

}

})();
