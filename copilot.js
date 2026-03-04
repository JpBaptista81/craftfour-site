(function(){

let currentStep = 1;
const totalSteps = 5;
let leadData = {};
let isOpen = false;
let currentLang = "en";

/* ================= I18N ================= */

const T = {

en:{
step1:"Tell us about your engineering context",
step2:"Which industry are you working in?",
step3:"What is the current focus of your project?",
step4:"What type of technical challenge are you facing?",
step5:"How would you like to proceed?",

context1:"Independent project",
context2:"Startup (1–5 engineers)",
context3:"Small technical team (5–20)",
context4:"Mid-size engineering team (20–100)",
context5:"Large engineering organization (100+)",

industry1:"Automotive",
industry2:"Tooling & Molds",
industry3:"Protective Equipment (Helmets & Safety)",
industry4:"Aerospace",
industry5:"Consumer Products",
industry6:"Industrial Systems & Industry 4.0",
industry7:"Other industrial sector",

stage1:"Concept validation",
stage2:"Detailed simulation & testing",
stage3:"Performance optimization",
stage4:"Platform development support",

challenge1:"Structural simulation",
challenge2:"Impact analysis",
challenge3:"Thermal / CFD analysis",
challenge4:"Optimization & weight reduction",
challenge5:"Design validation strategy",

proceed1:"Request technical follow-up",
proceed2:"Continue technical discussion",

contact:"Engineering follow-up coordination",
name:"Your name",
email:"Your email",
submit:"Submit request",
successTitle:"✓ Request submitted",
successText:"Our engineering team will review your context and respond shortly."
},

pt:{
step1:"Fale-nos sobre o contexto do seu projeto de engenharia",
step2:"Em que indústria está a trabalhar?",
step3:"Qual é o foco atual do seu projeto?",
step4:"Que desafio técnico está a enfrentar?",
step5:"Como gostaria de prosseguir?",

context1:"Projeto independente",
context2:"Startup (1–5 engenheiros)",
context3:"Pequena equipa técnica (5–20)",
context4:"Equipa de engenharia média (20–100)",
context5:"Grande organização de engenharia (100+)",

industry1:"Automóvel",
industry2:"Ferramentas e Moldes",
industry3:"Equipamento de Proteção (Capacetes e Segurança)",
industry4:"Aeroespacial",
industry5:"Produtos de Consumo",
industry6:"Sistemas Industriais e Indústria 4.0",
industry7:"Outro setor industrial",

stage1:"Validação de conceito",
stage2:"Simulação detalhada e testes",
stage3:"Otimização de desempenho",
stage4:"Suporte ao desenvolvimento de plataforma",

challenge1:"Simulação estrutural",
challenge2:"Análise de impacto",
challenge3:"Análise térmica / CFD",
challenge4:"Otimização e redução de peso",
challenge5:"Estratégia de validação de design",

proceed1:"Solicitar acompanhamento técnico",
proceed2:"Continuar discussão técnica",

contact:"Coordenação de acompanhamento técnico",
name:"O seu nome",
email:"O seu email",
submit:"Enviar pedido",
successTitle:"✓ Pedido enviado",
successText:"A nossa equipa de engenharia irá analisar o seu contexto e responder em breve."
}

};

function t(k){
return (T[currentLang] && T[currentLang][k]) || T.en[k];
}

/* ================= CSS ================= */

const style=document.createElement("style");
style.innerHTML=`
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
`;
document.head.appendChild(style);

/* ================= UI ================= */

document.addEventListener("DOMContentLoaded",()=>{

currentLang=(document.getElementById("langBtn")?.innerText||"EN").toLowerCase();

document.getElementById("langBtn")?.addEventListener("click",()=>{
setTimeout(()=>{
currentLang=(document.getElementById("langBtn")?.innerText||"EN").toLowerCase();
},100);
});

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
<div class="c4-bubble" id="c4-bubble"></div>
`);

initLogic();

});

function initLogic(){

const panel=document.getElementById("c4-panel");
const bubble=document.getElementById("c4-bubble");
const overlay=document.getElementById("c4-overlay");
const content=document.getElementById("c4-content");
const progress=document.getElementById("c4-progress");

function formatStep(n){
return String(n).padStart(2,'0')+" / "+String(totalSteps).padStart(2,'0');
}
function updateProgress(){progress.innerText=formatStep(currentStep);}

function renderQuestion(title,options){
updateProgress();
content.innerHTML="<strong><span class='c4-cursor'>|</span>"+title+"</strong>";
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

/* STEP 1 */

function step1(){
currentStep=1;
renderQuestion(t("step1"),[
{label:t("context1"),action:()=>{leadData.context="independent";step2();}},
{label:t("context2"),action:()=>{leadData.context="startup";step2();}},
{label:t("context3"),action:()=>{leadData.context="small";step2();}},
{label:t("context4"),action:()=>{leadData.context="mid";step2();}},
{label:t("context5"),action:()=>{leadData.context="large";step2();}}
]);
}

/* STEP 2 */

function step2(){
currentStep=2;
renderQuestion(t("step2"),[
{label:t("industry1"),action:()=>{leadData.industry="automotive";step3();}},
{label:t("industry2"),action:()=>{leadData.industry="molds";step3();}},
{label:t("industry3"),action:()=>{leadData.industry="protective";step3();}},
{label:t("industry4"),action:()=>{leadData.industry="aerospace";step3();}},
{label:t("industry5"),action:()=>{leadData.industry="consumer";step3();}},
{label:t("industry6"),action:()=>{leadData.industry="industry4";step3();}},
{label:t("industry7"),action:()=>{leadData.industry="other";step3();}}
]);
}

/* STEP 3 */

function step3(){
currentStep=3;
renderQuestion(t("step3"),[
{label:t("stage1"),action:()=>{leadData.stage="concept";step4();}},
{label:t("stage2"),action:()=>{leadData.stage="simulation";step4();}},
{label:t("stage3"),action:()=>{leadData.stage="optimization";step4();}},
{label:t("stage4"),action:()=>{leadData.stage="platform";step4();}}
]);
}

/* STEP 4 */

function step4(){
currentStep=4;
renderQuestion(t("step4"),[
{label:t("challenge1"),action:()=>{leadData.challenge="structural";step5();}},
{label:t("challenge2"),action:()=>{leadData.challenge="impact";step5();}},
{label:t("challenge3"),action:()=>{leadData.challenge="thermal";step5();}},
{label:t("challenge4"),action:()=>{leadData.challenge="weight";step5();}},
{label:t("challenge5"),action:()=>{leadData.challenge="validation";step5();}}
]);
}

/* STEP 5 */

function step5(){
currentStep=5;
renderQuestion(t("step5"),[
{label:t("proceed1"),action:()=>{stepContact();}},
{label:t("proceed2"),action:()=>{}}
]);
}

/* CONTACT */

function stepContact(){
content.innerHTML=`
<strong><span class='c4-cursor'>|</span>${t("contact")}</strong>
<div style="margin-top:15px;">
<input type="text" class="c4-input" placeholder="${t("name")}" id="c4-name">
<input type="email" class="c4-input" placeholder="${t("email")}" id="c4-email">
<button class="c4-submit-btn" onclick="submitLead()">${t("submit")}</button>
</div>`;
}

window.submitLead=function(){

let name=document.getElementById("c4-name").value;
let email=document.getElementById("c4-email").value;

if(!name||!email){
alert("Please fill in both fields.");
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
</div>`;
});

}

}

})();
