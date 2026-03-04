
(function(){

let currentStep = 1;
const totalSteps = 5;
let leadData = {};
let isOpen = false;

let currentLang = "en";

try{

// 1️⃣ usa o idioma do site (index.html)
if(window.currentLang){
  currentLang = window.currentLang.toLowerCase().split("-")[0];
}

// 2️⃣ fallback para browser
else{

  const browserLangs = navigator.languages || [navigator.language];

  for(let l of browserLangs){

    const s = l.toLowerCase().split("-")[0];

    if(["pt","es","fr","de","zh"].includes(s)){
      currentLang = s;
      break;
    }

  }

}

}catch(e){
currentLang = "en";
}

const I18N = {

en:{
step1_title:"Tell us about your engineering context",
step1_1:"Independent project",
step1_2:"Startup (1–5 engineers)",
step1_3:"Small technical team (5–20)",
step1_4:"Mid-size engineering team (20–100)",
step1_5:"Large engineering organization (100+)",
step5_hint:"Select an option to submit your request",
or:"or",


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
step5_hint:"Selecione uma opção antes de submeter o pedido",
or:"ou",

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
},

es:{
step1_title:"Cuéntenos sobre su contexto de ingeniería",
step1_1:"Proyecto independiente",
step1_2:"Startup (1–5 ingenieros)",
step1_3:"Pequeño equipo técnico (5–20)",
step1_4:"Equipo de ingeniería medio (20–100)",
step1_5:"Gran organización de ingeniería (100+)",
step5_hint:"Seleccione una opción antes de enviar la solicitud",
or:"o",

step2_title:"¿En qué industria trabaja?",
step2_1:"Automoción",
step2_2:"Herramientas y moldes",
step2_3:"Equipos de protección",
step2_4:"Aeroespacial",
step2_5:"Productos de consumo",
step2_6:"Sistemas industriales e Industria 4.0",
step2_7:"Otro sector industrial",

step3_title:"¿Cuál es el foco actual de su proyecto?",
step3_1:"Validación de concepto",
step3_2:"Simulación detallada y pruebas",
step3_3:"Optimización de rendimiento",
step3_4:"Soporte de desarrollo de plataforma",

step4_title:"¿Qué desafío técnico enfrenta?",
step4_1:"Simulación estructural",
step4_2:"Análisis de impacto",
step4_3:"Análisis térmico / CFD",
step4_4:"Optimización y reducción de peso",
step4_5:"Estrategia de validación de diseño",

step5_title:"¿Cómo desea continuar?",
step5_1:"Solicitar seguimiento técnico",
step5_2:"Continuar discusión técnica",

copilot_title:"Describa su pregunta técnica",
copilot_placeholder:"Introduzca su pregunta técnica",
copilot_submit:"Enviar pregunta",
copilot_received:"Consulta técnica recibida",
copilot_review:"Enviar para revisión técnica",

contact_title:"Coordinación de seguimiento técnico",
contact_name:"Su nombre",
contact_email:"Su email",
contact_submit:"Enviar solicitud",

success_title:"✓ Solicitud enviada",
success_text:"Nuestro equipo de ingeniería revisará su caso y responderá en breve.",

alert_fields:"Por favor complete ambos campos.",
alert_error:"Error en el envío. Intente nuevamente."
},

fr:{
step1_title:"Parlez-nous de votre contexte d’ingénierie",
step1_1:"Projet indépendant",
step1_2:"Startup (1–5 ingénieurs)",
step1_3:"Petite équipe technique (5–20)",
step1_4:"Équipe d’ingénierie moyenne (20–100)",
step1_5:"Grande organisation d’ingénierie (100+)",
step5_hint:"Sélectionnez une option avant d’envoyer la demande",
or:"ou",

step2_title:"Dans quelle industrie travaillez-vous ?",
step2_1:"Automobile",
step2_2:"Outillage et moules",
step2_3:"Équipements de protection",
step2_4:"Aérospatial",
step2_5:"Produits de consommation",
step2_6:"Systèmes industriels et Industrie 4.0",
step2_7:"Autre secteur industriel",

step3_title:"Quel est l’objectif actuel de votre projet ?",
step3_1:"Validation de concept",
step3_2:"Simulation détaillée et essais",
step3_3:"Optimisation des performances",
step3_4:"Support au développement de plateforme",

step4_title:"Quel défi technique rencontrez-vous ?",
step4_1:"Simulation structurelle",
step4_2:"Analyse d’impact",
step4_3:"Analyse thermique / CFD",
step4_4:"Optimisation et réduction de poids",
step4_5:"Stratégie de validation du design",

step5_title:"Comment souhaitez-vous continuer ?",
step5_1:"Demander un suivi technique",
step5_2:"Continuer la discussion technique",

copilot_title:"Décrivez votre question technique",
copilot_placeholder:"Entrez votre question technique",
copilot_submit:"Envoyer la question",
copilot_received:"Question technique reçue",
copilot_review:"Envoyer pour analyse technique",

contact_title:"Coordination du suivi technique",
contact_name:"Votre nom",
contact_email:"Votre email",
contact_submit:"Envoyer la demande",

success_title:"✓ Demande envoyée",
success_text:"Notre équipe d’ingénierie analysera votre demande et répondra rapidement.",

alert_fields:"Veuillez remplir les deux champs.",
alert_error:"Échec de l’envoi. Veuillez réessayer."
},

de:{
step1_title:"Beschreiben Sie Ihren Engineering-Kontext",
step1_1:"Unabhängiges Projekt",
step1_2:"Startup (1–5 Ingenieure)",
step1_3:"Kleines technisches Team (5–20)",
step1_4:"Mittleres Engineering-Team (20–100)",
step1_5:"Große Engineering-Organisation (100+)",
step5_hint:"Bitte wählen Sie eine Option bevor Sie die Anfrage senden",
or:"oder",

step2_title:"In welcher Branche arbeiten Sie?",
step2_1:"Automobilindustrie",
step2_2:"Werkzeugbau und Formenbau",
step2_3:"Schutzausrüstung",
step2_4:"Luft- und Raumfahrt",
step2_5:"Konsumprodukte",
step2_6:"Industriesysteme und Industrie 4.0",
step2_7:"Andere Industriebranche",

step3_title:"Was ist der aktuelle Fokus Ihres Projekts?",
step3_1:"Konzeptvalidierung",
step3_2:"Detaillierte Simulation und Tests",
step3_3:"Leistungsoptimierung",
step3_4:"Plattformentwicklung",

step4_title:"Welche technische Herausforderung haben Sie?",
step4_1:"Struktursimulation",
step4_2:"Impact-Analyse",
step4_3:"Thermische Analyse / CFD",
step4_4:"Gewichtsoptimierung",
step4_5:"Designvalidierungsstrategie",

step5_title:"Wie möchten Sie fortfahren?",
step5_1:"Technische Rückmeldung anfordern",
step5_2:"Technische Diskussion fortsetzen",

copilot_title:"Beschreiben Sie Ihre technische Frage",
copilot_placeholder:"Geben Sie Ihre technische Frage ein",
copilot_submit:"Frage senden",
copilot_received:"Technische Anfrage erhalten",
copilot_review:"Zur technischen Prüfung senden",

contact_title:"Technische Nachverfolgung",
contact_name:"Ihr Name",
contact_email:"Ihre E-Mail",
contact_submit:"Anfrage senden",

success_title:"✓ Anfrage gesendet",
success_text:"Unser Engineering-Team wird Ihre Anfrage prüfen und sich bald melden.",

alert_fields:"Bitte beide Felder ausfüllen.",
alert_error:"Übermittlung fehlgeschlagen. Bitte erneut versuchen."
},

zh:{
step1_title:"请介绍您的工程背景",
step1_1:"独立项目",
step1_2:"初创公司 (1–5 名工程师)",
step1_3:"小型技术团队 (5–20)",
step1_4:"中型工程团队 (20–100)",
step1_5:"大型工程组织 (100+)",
step5_hint:"请选择一个选项以提交请求",
or:"或",

step2_title:"您所在的行业是？",
step2_1:"汽车",
step2_2:"模具与工具",
step2_3:"防护设备",
step2_4:"航空航天",
step2_5:"消费产品",
step2_6:"工业系统与工业4.0",
step2_7:"其他工业领域",

step3_title:"您项目当前的重点是什么？",
step3_1:"概念验证",
step3_2:"详细仿真与测试",
step3_3:"性能优化",
step3_4:"平台开发支持",

step4_title:"您面临的技术挑战是什么？",
step4_1:"结构仿真",
step4_2:"冲击分析",
step4_3:"热分析 / CFD",
step4_4:"优化与减重",
step4_5:"设计验证策略",

step5_title:"您希望如何继续？",
step5_1:"请求技术跟进",
step5_2:"继续技术讨论",

copilot_title:"描述您的技术问题",
copilot_placeholder:"输入您的技术问题",
copilot_submit:"提交问题",
copilot_received:"已收到技术问题",
copilot_review:"提交工程团队评估",

contact_title:"工程跟进协调",
contact_name:"您的姓名",
contact_email:"您的邮箱",
contact_submit:"提交请求",

success_title:"✓ 请求已提交",
success_text:"我们的工程团队将审核您的需求并尽快回复。",

alert_fields:"请填写所有字段。",
alert_error:"提交失败，请重试。"
}

};

let t = I18N[currentLang] || I18N.en;

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
.c4-cursor{opacity:0.8;margin-right:6px;color:var(--accent);}
.c4-overlay{position:fixed;inset:0;backdrop-filter:blur(8px);
background:rgba(0,0,0,0.25);opacity:0;
transition:opacity var(--motion-slow);
pointer-events:none;z-index:9998;}
.c4-overlay.active{opacity:1;pointer-events:auto;}
.c4-bubble{position:fixed;bottom:25px;right:25px;
width:60px;height:60px;display:flex;
align-items:center;justify-content:center;
cursor:pointer;background:none;border:none;
z-index:10001;}
.c4-bubble svg{width:100%;height:100%;fill:#C7C9CF;}
.c4-bubble.hidden{opacity:0;pointer-events:none;}
.c4-panel{position:fixed;bottom:25px;right:25px;
width:374px;max-width:95%;height:520px;
background:var(--panel-bg);backdrop-filter:blur(12px);
color:var(--text-main);border-radius:var(--radius);
display:flex;flex-direction:column;overflow:hidden;
opacity:0;transform:translateY(10px);
transition:opacity var(--motion-slow),transform var(--motion-slow);
z-index:10000;
box-shadow:0 40px 90px rgba(0,0,0,0.55),
0 0 0 1px rgba(255,255,255,0.04);}
.c4-panel.active{opacity:1;transform:translateY(0);}
.c4-header{padding:18px 20px;border-bottom:1px solid rgba(255,255,255,0.06);
display:flex;justify-content:space-between;align-items:flex-start;}
.c4-title{font-weight:600;
background:linear-gradient(90deg,var(--accent),var(--accent-soft));
-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.c4-subtitle{font-size:9px;opacity:0.35;letter-spacing:0.8px;margin-top:3px;}
.c4-status{font-size:11px;display:flex;align-items:center;gap:6px;opacity:0.6;}
.c4-status-dot{width:8px;height:8px;border-radius:50%;background:var(--status);}
.c4-progress{font-size:9px;opacity:0.25;letter-spacing:1px;}
.c4-content{flex:1;padding:20px;font-size:13.5px;line-height:1.55;
overflow-y:auto;overflow-x:hidden;transition:opacity var(--motion-fast);}
.c4-content.fade-out{opacity:0;}
.c4-options{display:flex;flex-direction:column;gap:8px;margin-top:15px;}
.c4-option-btn{
width:100%;padding:12px 14px 12px 18px;
background:#16181a;border:1px solid rgba(255,255,255,0.05);
border-radius:8px;color:white;font-size:13px;text-align:left;
cursor:pointer;position:relative;
transition:background var(--motion-fast),border var(--motion-fast);}
.c4-option-btn::before{
content:"";position:absolute;left:0;top:0;bottom:0;width:3px;
background:var(--accent);border-top-left-radius:8px;
border-bottom-left-radius:8px;opacity:0.85;}
.c4-option-btn:hover{background:#1c1f22;border-color:rgba(255,255,255,0.12);}
.c4-option-btn.active{
background:#1c1f22;
border-color:var(--accent);
box-shadow:0 0 0 1px var(--accent) inset;
}
.c4-input{
width:100%;padding:10px 10px 10px 22px;margin-bottom:10px;border-radius:8px;
border:1px solid rgba(255,255,255,0.1);
background:#141618;color:var(--text-main);box-sizing:border-box;}
.c4-submit-btn{
width:100%;padding:10px 14px 10px 18px;background:#16181a;
border:1px solid rgba(255,255,255,0.05);
border-radius:8px;color:white;text-align:left;
cursor:pointer;position:relative;}
.c4-submit-btn::before{
content:"";position:absolute;left:0;top:0;bottom:0;width:3px;
background:var(--accent);border-top-left-radius:8px;
border-bottom-left-radius:8px;opacity:0.85;}
.c4-success{display:flex;flex-direction:column;
align-items:center;justify-content:center;height:100%;
text-align:center;animation:fadeIn .4s ease forwards;}
@keyframes fadeIn{
from{opacity:0;transform:translateY(10px);}
to{opacity:1;transform:translateY(0);}
}
@keyframes c4Blink{
0%{opacity:1;}
50%{opacity:0;}
100%{opacity:1;}
}
.c4-input-wrapper{position:relative;}
.c4-input-cursor{
position:absolute;
left:10px;
top:50%;
transform:translateY(-50%);
color:var(--accent);
font-weight:600;
opacity:0;
pointer-events:none;
}
.c4-input-wrapper.blinking .c4-input-cursor{
opacity:1;
animation:c4Blink 1s infinite;
}
.c4-input-wrapper.has-text .c4-input-cursor{
display:none;
}
`;
document.head.appendChild(style);

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

function initLogic(){

const panel=document.getElementById("c4-panel");
const bubble=document.getElementById("c4-bubble");
const overlay=document.getElementById("c4-overlay");
const content=document.getElementById("c4-content");
const progress=document.getElementById("c4-progress");
let aiQuestions = [];

function formatStep(n){
return String(n).padStart(2,'0')+" / "+String(totalSteps).padStart(2,'0');
}
function updateProgress(){progress.innerText=formatStep(currentStep);}

function animateTransition(callback){
content.classList.add("fade-out");
setTimeout(()=>{callback();content.classList.remove("fade-out");},90);
}

function typeText(element, text, speed = 18, done){

let i = 0;
element.innerHTML = "";

function type(){

if(i < text.length){

element.innerHTML += text.charAt(i);
i++;

setTimeout(type, speed);

}else{

if(done) done();

}

}

type();

}

function aiThinking(callback){

animateTransition(()=>{

content.innerHTML=`
<div id="ai-typing" style="opacity:0.7;font-size:13px;white-space:pre-line"></div>
`;

const el = document.getElementById("ai-typing");

typeText(
el,
| Parsing engineering context...
| Evaluating simulation scenario...
| Generating engineering questions...
);

});

}

function generateQuestions(){

let questions=[];

if(leadData.challenge==="impact"){
questions.push("Is the impact scenario related to safety certification or product durability?");
}

if(leadData.industry==="automotive"){
questions.push("Are you currently validating a component or a full vehicle system?");
}

if(leadData.stage==="concept"){
questions.push("Do you already have CAD geometry available for simulation?");
}

if(leadData.challenge==="thermal"){
questions.push("Is the thermal issue related to electronics cooling or fluid flow?");
}

if(questions.length===0){
questions.push("Could you briefly describe the main engineering constraint you are facing?");
}

return questions.slice(0,3);
}

function generateQuestions(){

let questions=[];

if(leadData.challenge==="impact"){
questions.push("Is the impact scenario related to safety certification or product durability?");
}

if(leadData.industry==="automotive"){
questions.push("Are you currently validating a component or a full vehicle system?");
}

if(leadData.stage==="concept"){
questions.push("Do you already have CAD geometry available for simulation?");
}

if(leadData.challenge==="thermal"){
questions.push("Is the thermal issue related to electronics cooling or fluid flow?");
}

if(questions.length===0){
questions.push("Could you briefly describe the main engineering constraint you are facing?");
}

return questions.slice(0,3);
}

function runDiscussion(questions,index){

if(index>=questions.length){

window.submitLead('discussion');
return;

}

animateTransition(()=>{

content.innerHTML=`
<strong><span class='c4-cursor'>|</span>${questions[index]}</strong>

<div style="margin-top:16px">

<textarea id="c4-ai-answer"
style="
width:100%;
height:90px;
border-radius:8px;
background:#141618;
border:1px solid rgba(255,255,255,0.1);
color:#C7C9CF;
padding:10px;
resize:none;
"
placeholder="Type your answer..."
></textarea>

<button class="c4-submit-btn"
style="margin-top:12px"
onclick="submitAIAnswer(${index})">
Continue
</button>

</div>
`;

});

}

function toggle(){
if(!panel.classList.contains("active")){
panel.classList.add("active");
overlay.classList.add("active");
bubble.classList.add("hidden");
isOpen=true;
startFlow();
}else{
panel.classList.remove("active");
overlay.classList.remove("active");
bubble.classList.remove("hidden");
isOpen=false;
}
}

bubble.onclick=toggle;
overlay.onclick=toggle;

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

function startFlow(){

// sincronizar idioma com o site
if(window.currentLang){
currentLang = window.currentLang.toLowerCase().split("-")[0];
}

// atualizar tradução ativa
t = I18N[currentLang] || I18N.en;

step1();

}

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
updateProgress();

animateTransition(()=>{

content.innerHTML=`
<strong><span class='c4-cursor'>|</span>${t.step5_title}</strong>

<div style="font-size:12px;opacity:0.6;margin-top:6px">
${t.step5_hint || ""}
</div>

<div style="margin-top:18px;">

<div class="c4-input-wrapper blinking" id="name-wrapper">
<span class="c4-input-cursor">|</span>
<input type="text" class="c4-input" placeholder="${t.contact_name}" id="c4-name">
</div>

<div class="c4-input-wrapper" id="email-wrapper">
<span class="c4-input-cursor">|</span>
<input type="email" class="c4-input" placeholder="${t.contact_email}" id="c4-email">
</div>

</div>

<div class="c4-options">

<button class="c4-option-btn" onclick="submitLead('followup')">
${t.step5_1}
</button>

<div style="text-align:center;font-size:12px;opacity:0.5;margin:6px 0;">
${t.or}
</div>

<button class="c4-option-btn" onclick="startDiscussion()">
${t.step5_2}
</button>

</div>
`;

setTimeout(attachInputLogic,50);

});

}


function attachInputLogic(){

const nameInput=document.getElementById("c4-name");
const emailInput=document.getElementById("c4-email");
const nameWrapper=document.getElementById("name-wrapper");
const emailWrapper=document.getElementById("email-wrapper");

if(nameInput){
nameInput.focus();

nameInput.addEventListener("input",()=>{

if(nameInput.value.length>0){
nameWrapper.classList.remove("blinking");
nameWrapper.classList.add("has-text");
}else{
nameWrapper.classList.remove("has-text");
nameWrapper.classList.add("blinking");
}

});
}

if(emailInput){

emailInput.addEventListener("focus",()=>{
if(emailInput.value.length===0){
emailWrapper.classList.add("blinking");
}
});

emailInput.addEventListener("input",()=>{

if(emailInput.value.length>0){
emailWrapper.classList.remove("blinking");
emailWrapper.classList.add("has-text");
}else{
emailWrapper.classList.remove("has-text");
}

});

}

}

window.startDiscussion=function(){

leadData.action="discussion";

aiThinking(()=>{

aiQuestions = generateQuestions();
runDiscussion(aiQuestions,0);

});

};

window.submitAIAnswer=function(index){

const answer=document.getElementById("c4-ai-answer").value.trim();

if(!answer)return;

if(!leadData.aiAnswers) leadData.aiAnswers=[];

leadData.aiAnswers.push(answer);

aiThinking(()=>{

runDiscussion(aiQuestions,index+1);

});

};

/* ================= SUBMIT ================= */

window.submitLead=function(action){

const name=document.getElementById("c4-name").value.trim();
const email=document.getElementById("c4-email").value.trim();

if(!name || !email){
alert("Por favor preencha nome e email.");
return;
}

leadData.action = action;

fetch("/api/engineering-lead",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
email,
leadData
})
})

.then(()=>{

animateTransition(()=>{

content.innerHTML=`
<div class="c4-success">
<h3 style="margin-bottom:10px;">${t.success_title}</h3>
<p style="opacity:0.7;">${t.success_text}</p>
</div>
`;

});

})

.catch(()=>{
alert(t.alert_error);
});

};

}

})();
