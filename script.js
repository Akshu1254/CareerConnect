const jobs=[
{id:1,title:"Senior Product Designer",company:"Northstar Labs",logo:"N",category:"Design",location:"Bengaluru, India",type:"Hybrid",salary:"₹18–24 LPA",level:"4+ years",color:"#e8f0ea"},
{id:2,title:"Frontend Developer",company:"Vertex Digital",logo:"V",category:"Engineering",location:"Remote · India",type:"Remote",salary:"₹8–14 LPA",level:"2+ years",color:"#e9edf7"},
{id:3,title:"Growth Marketing Lead",company:"Cloudnine",logo:"C",category:"Marketing",location:"Mumbai, India",type:"On-site",salary:"₹12–18 LPA",level:"3+ years",color:"#f5eee5"},
{id:4,title:"Data Analyst",company:"Orbit Systems",logo:"O",category:"Data",location:"Pune, India",type:"Hybrid",salary:"₹7–11 LPA",level:"1–3 years",color:"#eeeafa"},
{id:5,title:"UI/UX Designer",company:"Monogram Studio",logo:"M",category:"Design",location:"Remote · India",type:"Remote",salary:"₹6–10 LPA",level:"1+ years",color:"#f8ecee"},
{id:6,title:"Full Stack Engineer",company:"Brightside Tech",logo:"B",category:"Engineering",location:"Gurugram, India",type:"Hybrid",salary:"₹14–20 LPA",level:"3+ years",color:"#eaf2f5"}
];
let activeCategory="All", searchTerm="";
const grid=document.getElementById("jobGrid"),empty=document.getElementById("emptyState");
function render(){
 const place=document.getElementById("location").value.toLowerCase(),type=document.getElementById("typeFilter").value;
 const filtered=jobs.filter(j=>(activeCategory==="All"||j.category===activeCategory)&&(!searchTerm||`${j.title} ${j.company} ${j.category} ${j.location}`.toLowerCase().includes(searchTerm))&&(!place||j.location.toLowerCase().includes(place)|| (place.includes("remote")&&j.type==="Remote"))&&(type==="All"||j.type===type));
 grid.innerHTML=filtered.map(j=>`<article class="job-card"><div class="job-card-top"><div class="company-logo" style="background:${j.color}">${j.logo}</div><button class="save" aria-label="Save job" data-save="${j.id}">♡</button></div><h3>${j.title}</h3><div class="company">${j.company}</div><div class="job-meta"><span>⌖ ${j.location}</span><span>${j.type}</span><span>${j.level}</span></div><div class="job-foot"><div class="salary">${j.salary}<small>Estimated salary</small></div><button class="apply" data-apply="${j.id}">View role ↗</button></div></article>`).join("");
 empty.classList.toggle("hidden",filtered.length>0);
}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeCategory=b.dataset.filter;render()}));
document.getElementById("searchBtn").onclick=()=>{searchTerm=document.getElementById("keyword").value.trim().toLowerCase();render()};
document.getElementById("keyword").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("searchBtn").click()});
document.querySelectorAll(".popular button").forEach(b=>b.onclick=()=>{document.getElementById("keyword").value=b.dataset.term;searchTerm=b.dataset.term.toLowerCase();render()});
document.getElementById("typeFilter").onchange=render;
grid.addEventListener("click",e=>{const save=e.target.closest("[data-save]");if(save){save.classList.toggle("saved");save.textContent=save.classList.contains("saved")?"♥":"♡";toast(save.classList.contains("saved")?"Job saved to your shortlist":"Removed from saved jobs")}const apply=e.target.closest("[data-apply]");if(apply){const j=jobs.find(x=>x.id===Number(apply.dataset.apply));openModal("Apply for "+j.title,"Enter your details to register your interest. This demo stores no personal data.");}});
const modal=document.getElementById("modal");function openModal(title,desc){document.getElementById("modalTitle").textContent=title;document.getElementById("modalText").textContent=desc;modal.classList.remove("hidden")}
document.getElementById("closeModal").onclick=()=>modal.classList.add("hidden");modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};
document.getElementById("profileBtn").onclick=()=>openModal("Create your profile","Share your details to get started. This front-end demo does not submit data to a server.");
document.getElementById("postBtn").onclick=()=>openModal("Post a new role","Recruiter dashboard preview — connect a backend to publish jobs.");
document.getElementById("modalForm").onsubmit=e=>{e.preventDefault();modal.classList.add("hidden");toast("Thanks! This is a front-end demo — no data was sent.")};
document.getElementById("menuToggle").onclick=()=>document.querySelector(".topbar").classList.toggle("nav-open");
document.getElementById("viewAll").onclick=()=>{activeCategory="All";searchTerm="";document.getElementById("keyword").value="";document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter==="All"));render()};
render();