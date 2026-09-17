let C=window.ATM_CONTENT||{};
const $=s=>document.querySelector(s);
const safe=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]||m));

function render(){
 const c=C.company||{};
 const hero=$('#home h1');
 if(hero) hero.innerHTML=safe(c.tagline||'People, logistics & operations — handled.').replace('handled.','<em>handled.</em>');
 const hp=$('#home .hero-copy>p'); if(hp) hp.textContent=c.heroText||'Reliable contract manpower and cargo transport solutions built for industrial and corporate environments.';
 const ws=document.querySelector('#home .stats div:first-child strong'); if(ws) ws.textContent=c.workforce||'150–200+';
 const est=document.querySelector('#home .stats div:nth-child(2) strong'); if(est) est.textContent=(c.established||'August 2022').replace('August ','');
 const about=$('#about .lead'); if(about) about.textContent=C.about||'';
 const divGrid=document.querySelector('.division-grid'); if(divGrid&&Array.isArray(C.divisions)) divGrid.innerHTML=C.divisions.map((d,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><h3>${safe(d.name||d.title)}</h3><p>${safe(d.description||d.text)}</p></article>`).join('');
 const sg=$('#serviceGrid'); if(sg) sg.innerHTML=(C.services||[]).map((s,i)=>`<div class="service"><i>${String(i+1).padStart(2,'0')}</i><span>${safe(s)}</span></div>`).join('');
 const cg=$('#clientsGrid'); if(cg) cg.innerHTML=(C.clients||[]).map((s,i)=>`<div class="client"><b>${String(i+1).padStart(2,'0')}</b>&nbsp; ${safe(s)}</div>`).join('');
 const why=document.querySelector('.why-grid'); if(why&&Array.isArray(C.whyUs)) why.innerHTML=C.whyUs.map((x,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><h3>${safe(x)}</h3><p>Operational capability supporting dependable project execution.</p></div>`).join('');
 const v=$('#vision .quote-card p'); if(v) v.textContent=C.vision||'';
 const m=$('#vision .mission-card p'); if(m) m.textContent=C.mission||'';
 const phones=c.phones||[]; const links=document.querySelectorAll('.contact-details a[href^="tel:"]'); phones.forEach((p,i)=>{if(links[i]){links[i].href='tel:'+p;const b=links[i].querySelector('b');if(b)b.textContent=p;}});
 const email=document.querySelector('.contact-details a[href^="mailto:"]'); if(email&&c.email){email.href='mailto:'+c.email;const b=email.querySelector('b');if(b)b.textContent=c.email;}
 const enquiry=document.querySelector('.contact-card a[href^="mailto:"]'); if(enquiry&&c.email) enquiry.href='mailto:'+c.email;
 const addr=document.querySelector('.contact-details div b'); if(addr&&c.address) addr.textContent=c.address;
 const logo=C.images?.logo||'assets/atm-logo.svg'; document.querySelectorAll('img[src*="atm-logo"],img[alt*="ATM GROUPS"]').forEach(img=>{img.src=logo;});
 const year=$('#year'); if(year) year.textContent=new Date().getFullYear();
}

function showTab(id,updateHash=true){
 const target=document.getElementById(id)||document.getElementById('home');
 if(!target) return;
 document.querySelectorAll('#nav a[href^="#"]').forEach(a=>a.classList.toggle('active',a.hash.slice(1)===target.id));
 if(updateHash) history.replaceState(null,'','#'+target.id);
 target.scrollIntoView({behavior:'smooth',block:'start'});
}

function setupTabs(){
 document.querySelectorAll('#nav a[href^="#"],a.btn[href^="#"],.brand[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
   const id=a.getAttribute('href').slice(1); if(!document.getElementById(id)) return;
   e.preventDefault(); showTab(id,true);
   const nav=$('#nav'); if(nav) nav.classList.remove('open');
 }));
 const initial=location.hash.slice(1)||'home';
 const target=document.getElementById(initial)||document.getElementById('home');
 if(target) target.scrollIntoView({behavior:'auto',block:'start'});
 document.querySelectorAll('#nav a[href^="#"]').forEach(a=>a.classList.toggle('active',a.hash.slice(1)===(target?.id||'home')));
 window.addEventListener('hashchange',()=>showTab(location.hash.slice(1)||'home',false));
}

function setupTheme(){
 const button=$('#themeToggle'), icon=$('#themeIcon'), text=$('#themeText');
 const saved=localStorage.getItem('atm-theme');
 const prefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
 const setTheme=dark=>{document.body.classList.toggle('dark-theme',dark);localStorage.setItem('atm-theme',dark?'dark':'light');if(icon)icon.textContent=dark?'☀':'☾';if(text)text.textContent=dark?'Day':'Night';button?.setAttribute('aria-label',dark?'Switch to day theme':'Switch to night theme');};
 setTheme(saved?saved==='dark':prefersDark);
 button?.addEventListener('click',()=>setTheme(!document.body.classList.contains('dark-theme')));
}

async function load(){
 try{const r=await fetch('/content.json?version='+Date.now(),{cache:'no-store'});if(r.ok){const fresh=await r.json();if(fresh&&typeof fresh==='object')C=fresh;}}catch(e){console.warn('Using fallback content',e);}
 render(); setupTabs(); setupTheme();
}

document.addEventListener('DOMContentLoaded',()=>{
 const menu=$('.menu'),nav=$('#nav'); if(menu&&nav)menu.addEventListener('click',()=>nav.classList.toggle('open'));
 load();
});