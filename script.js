let C=window.ATM_CONTENT||{};
const $=s=>document.querySelector(s);
function safe(v=''){return String(v).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]||m));}
function renderList(id,items,kind){const el=document.getElementById(id);if(!el)return;el.innerHTML=(items||[]).map((x,i)=>{if(kind==='services')return `<div class="service"><i>${String(i+1).padStart(2,'0')}</i><span>${safe(x)}</span></div>`;return `<div class="client">${String(i+1).padStart(2,'0')} &nbsp; ${safe(x)}</div>`}).join('')}
function render(){
 const c=C.company||{}, a=C.about||'';
 const hero=$('#home h1'); if(hero&&c.tagline)hero.innerHTML=safe(c.tagline).replace('handled.','<em>handled.</em>');
 const hp=$('#home .hero-copy>p'); if(hp&&c.description)hp.textContent=c.description;
 const about=$('#about .lead'); if(about)about.textContent=a;
 const established=document.querySelector('#home .stats div:nth-child(2) strong'); if(established)established.textContent=(c.established||'August 2022').replace('August ','');
 const workforce=document.querySelector('#home .stats div:first-child strong'); if(workforce)workforce.textContent=c.workforce||'150–200+';
 renderList('serviceGrid',C.services,'services'); renderList('clientsGrid',C.clients,'clients');
 const v=$('#vision .quote-card p'); if(v&&C.vision)v.textContent=C.vision;
 const m=$('#vision .mission-card p'); if(m&&C.mission)m.textContent=C.mission;
 const phoneLinks=document.querySelectorAll('.contact-details a[href^="tel:"]'); (c.phones||[]).forEach((p,i)=>{if(phoneLinks[i]){phoneLinks[i].href='tel:'+p;phoneLinks[i].querySelector('b').textContent=p}});
 const email=document.querySelector('.contact-details a[href^="mailto:"]');if(email&&c.email){email.href='mailto:'+c.email;email.querySelector('b').textContent=c.email}
 const addr=document.querySelector('.contact-details div b');if(addr&&c.address)addr.innerHTML=safe(c.address).replace(/, /g,',<br>');
 const logo=C.images&&C.images.logo; if(logo)document.querySelectorAll('img[src*="atm-logo"]').forEach(img=>img.src=logo);
 document.querySelector('#year').textContent=new Date().getFullYear();
}
async function load(){try{const r=await fetch('content.json?'+Date.now());if(r.ok)C=await r.json()}catch(e){}render()}
function setupTabs(){const sections=[...document.querySelectorAll('main>section[id]')];const nav=document.querySelector('#nav');if(!nav)return;nav.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const id=a.getAttribute('href').slice(1);sections.forEach(s=>s.style.display=s.id===id?'block':'none');nav.querySelectorAll('a').forEach(x=>x.classList.remove('active'));a.classList.add('active');history.replaceState(null,'','#'+id);window.scrollTo({top:0,behavior:'smooth'});nav.style.display=''}));const initial=location.hash.slice(1)||'home';const target=sections.find(s=>s.id===initial)||sections[0];sections.forEach(s=>s.style.display=s===target?'block':'none');const active=nav.querySelector(`a[href="#${target.id}"]`);if(active)active.classList.add('active')}
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');if(menu&&nav)menu.addEventListener('click',()=>nav.classList.toggle('open'));
load().then(setupTabs);
