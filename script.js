let C=window.ATM_CONTENT||{};
const $=s=>document.querySelector(s);
const safe=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]||m));
function applyBranding(){
 const c=C.company||{}; const name=String(c.name||'ATM GROUPS').trim()||'ATM GROUPS';
 const logo=(C.images&&C.images.logo)||'assets/atm-logo.svg';
 document.querySelectorAll('.brand img,.orbit-core img').forEach(img=>{img.src=logo;img.alt=name+' logo';});
 const fav=document.querySelector('link[rel="icon"]');if(fav)fav.href=logo;
 document.querySelectorAll('.brand b,.hero-panel .panel-label').forEach(el=>el.textContent=name);
 document.querySelectorAll('.brand small').forEach(el=>el.textContent=c.legalName||'LOGISTICS & MANPOWER SOLUTIONS');
 document.querySelectorAll('body *').forEach(el=>{if(el.children.length===0&&el.textContent&&el.textContent.includes('ATM GROUPS'))el.textContent=el.textContent.replaceAll('ATM GROUPS',name);});
 document.title=name+' | Logistics & Manpower Solutions';
 const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=name+' provides contract manpower, logistics, cargo transport, facility management, staffing and industrial support services.';
}
function render(){
 const c=C.company||{}; const hero=$('#home h1');
 if(hero) hero.innerHTML=safe(c.tagline||'People, logistics & operations — handled.').replace('handled.','<em>handled.</em>');
 const hp=$('#home .hero-copy>p'); if(hp) hp.textContent=c.heroText||'Reliable contract manpower and cargo transport solutions built for industrial and corporate environments.';
 const ws=document.querySelector('#home .stats div:first-child strong'); if(ws) ws.textContent=c.workforce||'150–200+';
 const est=document.querySelector('#home .stats div:nth-child(2) strong'); if(est) est.textContent=(c.established||'August 2022').replace('August ','');
 const about=$('#about .lead'); if(about) about.textContent=C.about||'';
 const divGrid=document.querySelector('.division-grid'); if(divGrid&&Array.isArray(C.divisions)) divGrid.innerHTML=C.divisions.map((d,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><h3>${safe(d.name||d.title)}</h3><p>${safe(d.description||d.text)}</p></article>`).join('');
 const sg=$('#serviceGrid'); if(sg) sg.innerHTML=(C.services||[]).map((s,i)=>`<div class="service"><i>${String(i+1).padStart(2,'0')}</i><span>${safe(s)}</span></div>`).join('');
 const cg=$('#clientsGrid'); if(cg) cg.innerHTML=(C.clients||[]).map((s,i)=>`<div class="client"><b>${String(i+1).padStart(2,'0')}</b>&nbsp; ${safe(s)}</div>`).join('');
 const why=document.querySelector('.why-grid'); if(why&&Array.isArray(C.whyUs)) why.innerHTML=C.whyUs.map((x,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><h3>${safe(x)}</h3><p>Operational capability supporting dependable project execution.</p></div>`).join('');
 const v=$('#vision .quote-card p'); if(v) v.textContent=C.vision||''; const m=$('#vision .mission-card p'); if(m) m.textContent=C.mission||'';
 const phones=c.phones||[]; const links=document.querySelectorAll('.contact-details a[href^="tel:"]'); phones.forEach((p,i)=>{if(links[i]){links[i].href='tel:'+p;const b=links[i].querySelector('b');if(b)b.textContent=p;}});
 const email=document.querySelector('.contact-details a[href^="mailto:"]'); if(email&&c.email){email.href='mailto:'+c.email;const b=email.querySelector('b');if(b)b.textContent=c.email;}
 const addr=document.querySelector('.contact-details div b'); if(addr&&c.address) addr.textContent=c.address;
 applyBranding();
 const year=$('#year'); if(year) year.textContent=new Date().getFullYear();
}
function showTab(id,updateHash=true){const target=document.getElementById(id)||document.getElementById('home');if(!target)return;document.querySelectorAll('#nav a[href^="#"]').forEach(a=>a.classList.toggle('active',a.hash.slice(1)===target.id));if(updateHash)history.replaceState(null,'','#'+target.id);target.scrollIntoView({behavior:'smooth',block:'start'});}
function setupTabs(){document.querySelectorAll('#nav a[href^="#"],a.btn[href^="#"],.brand[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1);if(!document.getElementById(id))return;e.preventDefault();showTab(id,true);$('#nav')?.classList.remove('open');}));const initial=location.hash.slice(1)||'home';const target=document.getElementById(initial)||document.getElementById('home');if(target)target.scrollIntoView({behavior:'auto',block:'start'});document.querySelectorAll('#nav a[href^="#"]').forEach(a=>a.classList.toggle('active',a.hash.slice(1)===(target?.id||'home')));window.addEventListener('hashchange',()=>showTab(location.hash.slice(1)||'home',false));}
function setupTheme(){const button=$('#themeToggle'),icon=$('#themeIcon'),text=$('#themeText');const saved=localStorage.getItem('atm-theme');const prefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;const setTheme=dark=>{document.body.classList.toggle('dark-theme',dark);localStorage.setItem('atm-theme',dark?'dark':'light');if(icon)icon.textContent=dark?'☀':'☾';if(text)text.textContent=dark?'Day':'Night';button?.setAttribute('aria-label',dark?'Switch to day theme':'Switch to night theme');};setTheme(saved?saved==='dark':prefersDark);button?.addEventListener('click',()=>setTheme(!document.body.classList.contains('dark-theme')));}
function setupInquiry(){const form=$('#inquiryForm');if(!form)return;form.addEventListener('submit',async e=>{e.preventDefault();const btn=form.querySelector('button[type="submit"]'),status=$('#formStatus'),data=Object.fromEntries(new FormData(form).entries());if(btn)btn.disabled=true;if(status)status.textContent='Sending your enquiry…';try{const r=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const j=await r.json().catch(()=>({}));if(!r.ok)throw Error(j.error||'Could not send enquiry.');form.reset();if(status)status.textContent='✓ Enquiry sent successfully. ATM GROUPS has been notified.';}catch(err){if(status)status.textContent='Unable to send right now. Please call ATM GROUPS directly.';console.error(err);}finally{if(btn)btn.disabled=false;}});}
async function load(){try{const r=await fetch('/content.json?version='+Date.now(),{cache:'no-store'});if(r.ok){const fresh=await r.json();if(fresh&&typeof fresh==='object')C=fresh;}}catch(e){console.warn('Using fallback content',e);}render();setupTabs();setupTheme();setupInquiry();}
document.addEventListener('DOMContentLoaded',()=>{const menu=$('.menu'),nav=$('#nav');if(menu&&nav)menu.addEventListener('click',()=>nav.classList.toggle('open'));load();});