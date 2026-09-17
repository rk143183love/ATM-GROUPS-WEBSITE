const C=window.ATM_CONTENT||{};
const serviceGrid=document.getElementById('serviceGrid');
if(serviceGrid)(C.services||[]).forEach((s,i)=>{const el=document.createElement('div');el.className='service';el.innerHTML=`<i>${String(i+1).padStart(2,'0')}</i><span>${s}</span>`;serviceGrid.appendChild(el)});
const clientsGrid=document.getElementById('clientsGrid');
if(clientsGrid)(C.clients||[]).forEach((s,i)=>{const el=document.createElement('div');el.className='client';el.innerHTML=`${String(i+1).padStart(2,'0')} &nbsp; ${s}`;clientsGrid.appendChild(el)});
document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav'); if(menu)menu.addEventListener('click',()=>{nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.flexDirection='column';nav.style.position='absolute';nav.style.top='68px';nav.style.right='4%';nav.style.background='#fff';nav.style.padding='18px';nav.style.border='1px solid #e5e9ef';nav.style.borderRadius='10px';nav.style.boxShadow='0 15px 40px #0002'});
