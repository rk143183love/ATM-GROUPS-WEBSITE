let C=window.ATM_CONTENT||{};
const $=s=>document.querySelector(s);
const safe=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]||m));
function render(){
 const c=C.company||{}, hero=$('#home h1');
 if(hero&&c.tagline)hero.innerHTML=safe(c.tagline).replace('handled.','<em>handled.</em>');
 const hp=$('#home .hero-copy>p');if(hp&&c.aboutHero)hp.textContent=c.aboutHero;
 const ws=document.querySelector('#home .stats div:first-child strong');if(ws)ws.textContent=c.workforce||'150–200+';
 const est=document.querySelector('#home .stats div:nth-child(2) strong');if(est)est.textContent=(c.established||'August 2022').replace('August ','');
 const about=$('#about .lead');if(about)about.textContent=C.about||'';
 const divGrid=document.querySelector('.division-grid');if(divGrid&&Array.isArray(C.divisions))divGrid.innerHTML=C.divisions.map((d,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><h3>${safe(d.name||d.title)}</h3><p>${safe(d.description||d.text)}</p></article>`).join('');
 const sg=document.getElementById('serviceGrid');if(sg)sg.innerHTML=(C.services||[]).map((s,i)=>`<div class="service"><i>${String(i+1).padStart(2,'0')}</i><span>${safe(s)}</span></div>`).join('');
 const cg=document.getElementById('clientsGrid');if(cg)cg.innerHTML=(C.clients||[]).map((s,i)=>`<div class="client">${String(i+1).padStart(2,'0')} &nbsp; ${safe(s)}</div>`).join('');
 const why=document.querySelector('.why-grid');if(why&&Array.isArray(C.whyUs))why.innerHTML=C.whyUs.map((x,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><h3>${safe(x)}</h3><p>Operational capability supporting dependable project execution.</p></div>`).join('');
 const v=$('#vision .quote-card p');if(v)v.textContent=C.vision||'';const m=$('#vision .mission-card p');if(m)m.textContent=C.mission||'';
 const links=document.querySelectorAll('.contact-details a[href^="tel:"]');(c.phones||[]).forEach((p,i)=>{if(links[i]){links[i].href='tel:'+p;links[i].querySelector('b').textContent=p}});
 const email=document.querySelector('.contact-details a[href^="mailto:"]');if(email&&c.email){email.href='mailto:'+c.email;email.querySelector('b').textContent=c.email}
 const addr=document.querySelector('.contact-details div b');if(addr&&c.address)addr.textContent=c.address;
 const logo=C.images&&C.images.logo;if(logo)document.querySelectorAll('img[src*="atm-logo"],img[alt*="ATM GROUPS"]').forEach(img=>img.src=logo);
 const year=$('#year');if(year)year.textContent=new Date().getFullYear();
}
async function load(){try{const r=await fetch('content.json?'+Date.now());if(r.ok)C=await r.json()}catch(e){}render()}
function setupTabs(){const sections=[...document.querySelectorAll('main>section[id]')],nav=document.querySelector('#nav');if(!nav)return;nav.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const id=a.hash.slice(1),target=sections.find(s=>s.id===id);if(!target)return;sections.forEach(s=>s.hidden=s!==target);nav.querySelectorAll('a').forEach(x=>x.classList.remove('active'));a.classList.add('active');history.replaceState(null,'','#'+id);window.scrollTo(0,0);nav.classList.remove('open')}));const initial=location.hash.slice(1)||'home',target=sections.find(s=>s.id===initial)||sections[0];sections.forEach(s=>s.hidden=s!==target);const active=nav.querySelector(`a[href="#${target.id}"]`);if(active)active.classList.add('active')}
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');if(menu&&nav)menu.addEventListener('click',()=>nav.classList.toggle('open'));
load().then(setupTabs);
