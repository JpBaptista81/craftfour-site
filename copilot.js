(function () {

const AUTO_OPEN_DELAY = 22000;

let currentStep = 1;
const totalSteps = 5;
let leadData = {};
let isOpen = false;

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
.c4-panel{position:fixed;bottom:25px;right:25px;width:374px;max-width:95%;height:520px;background:var(--panel-bg);color:var(--text-main);border-radius:var(--radius);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(10px);transition:opacity var(--motion-slow),transform var(--motion-slow);z-index:10000;box-shadow:0 40px 90px rgba(0,0,0,0.55);}
.c4-panel.active{opacity:1;transform:translateY(0);}
.c4-header{padding:18px 20px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;}
.c4-title{font-weight:600;background:linear-gradient(90deg,var(--accent),var(--accent-soft));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.c4-content{flex:1;padding:20px;font-size:13.5px;overflow-y:auto;}
.c4-options{display:flex;flex-direction:column;gap:8px;margin-top:15px;}
.c4-option-btn,.c4-submit-btn{width:100%;padding:12px;background:#16181a;border:1px solid rgba(255,255,255,0.05);border-radius:8px;color:white;text-align:left;cursor:pointer;}
.c4-input{width:100%;padding:10px;margin-bottom:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:#141618;color:var(--text-main);}
.c4-success{text-align:center;padding-top:40px;}
`;
document.head.appendChild(style);

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", function () {

document.body.insertAdjacentHTML("beforeend", `
<div class="c4-overlay" id="c4-overlay"></div>
<div class="c4-panel" id="c4-panel">
<div class="c4-header">
<div class="c4-title">Craft<sup>4</sup> Engineering Copilot</div>
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

const panel = document.getElementById("c4-panel");
const bubble = document.getElementById("c4-bubble");
const overlay = document.getElementById("c4-overlay");
const content = document.getElementById("c4-content");

function toggle(){
if(!panel.classList.contains("active")){
panel.classList.add("active");
overlay.classList.add("active");
bubble.classList.add("hidden");
isOpen = true;
startFlow();
}else{
panel.classList.remove("active");
overlay.classList.remove("active");
bubble.classList.remove("hidden");
isOpen = false;
}
}

bubble.onclick = toggle;
overlay.onclick = toggle;

function renderQuestion(title, options){
content.innerHTML = "<strong>"+title+"</strong>";
let container = document.createElement("div");
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

function startFlow(){ step1(); }

function step1(){
renderQuestion("Tell us about your engineering context",[
{label:"Independent project",action:()=>{leadData.context="independent";step2();}},
{label:"Startup (1–5 engineers)",action:()=>{leadData.context="startup";step2();}}
]);
}

function step2(){
renderQuestion("Which industry are you working in?",[
{label:"Automotive",action:()=>{leadData.industry="automotive";stepContact();}},
{label:"Aerospace",action:()=>{leadData.industry="aerospace";stepContact();}}
]);
}

function stepContact(){
content.innerHTML=`
<strong>Engineering follow-up coordination</strong>
<div style="margin-top:15px;">
<input type="text" class="c4-input" placeholder="Your name" id="c4-name">
<input type="email" class="c4-input" placeholder="Your email" id="c4-email">
<button class="c4-submit-btn" onclick="submitLead()">Submit request</button>
</div>`;
}

window.submitLead = async function(){

let name = document.getElementById("c4-name").value;
let email = document.getElementById("c4-email").value;

if(!name || !email){
alert("Please fill in both fields.");
return;
}

try {

const response = await fetch("/api/engineering-lead", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ name, email, leadData })
});

if(!response.ok){
throw new Error("Server error");
}

content.innerHTML=`
<div class="c4-success">
<h3>✓ Request submitted</h3>
<p>Our engineering team will review your context and respond shortly.</p>
</div>`;

} catch (error) {
console.error(error);
alert("Submission failed. Please try again.");
}

};

setTimeout(()=>{
if(!isOpen) toggle();
},AUTO_OPEN_DELAY);

}

})();