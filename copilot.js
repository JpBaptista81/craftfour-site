
(function(){

const AUTO_OPEN_DELAY = 22000;

let currentStep = 1;
const totalSteps = 4;
let leadData = {};
let isOpen = false;
let currentLang = document.documentElement.lang || "en";

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

.c4-overlay{
position:fixed;inset:0;
backdrop-filter:blur(8px);
background:rgba(0,0,0,0.25);
opacity:0;transition:opacity var(--motion-slow);
pointer-events:none;z-index:9998;
}
.c4-overlay.active{opacity:1;pointer-events:auto;}

.c4-bubble{
position:fixed;bottom:25px;right:25px;
width:60px;height:60px;
display:flex;align-items:center;justify-content:center;
cursor:pointer;background:none;border:none;
z-index:10001;
}
.c4-bubble svg{width:100%;height:100%;fill:#C7C9CF;}
.c4-bubble.hidden{opacity:0;pointer-events:none;}

.c4-panel{
position:fixed;bottom:25px;right:25px;
width:374px;max-width:95%;height:520px;
background:var(--panel-bg);
backdrop-filter:blur(12px);
color:var(--text-main);
border-radius:var(--radius);
display:flex;flex-direction:column;
overflow:hidden;
opacity:0;transform:translateY(10px);
transition:opacity var(--motion-slow),transform var(--motion-slow);
z-index:10000;
box-shadow:0 40px 90px rgba(0,0,0,0.55),
0 0 0 1px rgba(255,255,255,0.04);
}
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

.c4-option-btn:hover{
background:#1c1f22;border-color:rgba(255,255,255,0.12);}

.c4-input{
width:100%;padding:10px;margin-bottom:10px;border-radius:8px;
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

.c4-success{
display:flex;flex-direction:column;align-items:center;justify-content:center;
height:100%;text-align:center;
animation:fadeIn .4s ease forwards;
}

@keyframes fadeIn{
from{opacity:0;transform:translateY(10px);}
to{opacity:1;transform:translateY(0);}
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
<div class="c4-progress" id="c4-progress">01 / 04</div>
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

function formatStep(n){
return String(n).padStart(2,'0')+" / "+String(totalSteps).padStart(2,'0');
}
function updateProgress(){progress.innerText=formatStep(currentStep);}

function animateTransition(callback){
content.classList.add("fade-out");
setTimeout(()=>{callback();content.classList.remove("fade-out");},90);
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
animateTransition(()=>{
renderQuestion("Tell us about your engineering context",[
{label:"Independent project",action:()=>{leadData.context="independent";step2();}},
{label:"Startup (1–5 engineers)",action:()=>{leadData.context="startup";step2();}},
{label:"Small technical team (5–20)",action:()=>{leadData.context="small";step2();}},
{label:"Mid-size engineering team (20–100)",action:()=>{leadData.context="mid";step2();}},
{label:"Large engineering organization (100+)",action:()=>{leadData.context="large";step2();}}
]);
});
}

function step2(){
currentStep=2;
animateTransition(()=>{
renderQuestion("Which industry are you working in?",[
{label:"Automotive",action:()=>{leadData.industry="automotive";step3();}},
{label:"Tooling & Molds",action:()=>{leadData.industry="molds";step3();}},
{label:"Protective Equipment (Helmets & Safety)",action:()=>{leadData.industry="protective";step3();}},
{label:"Aerospace",action:()=>{leadData.industry="aerospace";step3();}},
{label:"Consumer Products",action:()=>{leadData.industry="consumer";step3();}},
{label:"Industrial Systems & Industry 4.0",action:()=>{leadData.industry="industry4";step3();}},
{label:"Other industrial sector",action:()=>{leadData.industry="other";step3();}}
]);
});
}

function step3(){
currentStep=3;
animateTransition(()=>{
renderQuestion("What is the current focus of your project?",[
{label:"Concept validation",action:()=>{leadData.stage="concept";step4();}},
{label:"Detailed simulation & testing",action:()=>{leadData.stage="simulation";step4();}},
{label:"Performance optimization",action:()=>{leadData.stage="optimization";step4();}},
{label:"Platform development support",action:()=>{leadData.stage="platform";step4();}}
]);
});
}

function step4(){
currentStep=4;
animateTransition(()=>{
renderQuestion("What type of technical challenge are you facing?",[
{label:"Structural simulation",action:()=>{leadData.challenge="structural";stepContact();}},
{label:"Impact analysis",action:()=>{leadData.challenge="impact";stepContact();}},
{label:"Thermal / CFD analysis",action:()=>{leadData.challenge="thermal";stepContact();}},
{label:"Optimization & weight reduction",action:()=>{leadData.challenge="weight";stepContact();}},
{label:"Design validation strategy",action:()=>{leadData.challenge="validation";stepContact();}}
]);
});
}

function stepContact(){
animateTransition(()=>{
content.innerHTML=`<strong>We can support your engineering validation strategy.</strong>
<div style="margin-top:15px;">
<input type="text" class="c4-input" placeholder="Your name" id="c4-name">
<input type="email" class="c4-input" placeholder="Your email" id="c4-email">
<button class="c4-submit-btn" onclick="submitLead()">Submit</button>
</div>`;
});
}

window.submitLead=function(){
let name=document.getElementById("c4-name").value;
let email=document.getElementById("c4-email").value;

if(!name || !email){
alert("Please fill in both fields.");
return;
}

animateTransition(()=>{
content.innerHTML=`
<div class="c4-success">
<h3 style="margin-bottom:10px;">✓ Request received</h3>
<p style="opacity:0.7;">Our engineering team will contact you shortly.</p>
</div>`;
});
}

setTimeout(()=>{
if(!isOpen) toggle();
},AUTO_OPEN_DELAY);

new MutationObserver(()=>{
let newLang=document.documentElement.lang;
if(newLang!==currentLang){
currentLang=newLang;
currentStep=1;
leadData={};
if(isOpen) startFlow();
}
}).observe(document.documentElement,{attributes:true});

}

})();
