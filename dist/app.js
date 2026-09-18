import {modules,motion} from './content.js';
const image=(src,alt='',eager=false)=>`<img src="${src}" alt="${alt}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
const caption=(m)=>`<div class="caption"><h2>${m.title}</h2><a href="${m.target||'#edit'}">${m.link||'DISCOVER'}</a></div>`;
const header=`<header><a class="logo" href="#hero" aria-label="TU home">${image('assets/logo.png','TU',true)}</a><nav aria-label="Main"><a href="#collection">NEW IN</a><a href="#categories">SHOP</a><a href="#identity">WORLD OF TU</a></nav><a class="explore" href="#categories">EXPLORE</a></header>`;
function render(m){
 let content='';
 if(m.layout==='hero') content=image(m.image,'TU winter collection',true)+header+caption(m);
 if(m.layout==='split') content=m.panels.map(p=>`<div class="panel">${image(p.image,p.title,true)}${caption(p)}</div>`).join('');
 if(m.layout==='campaign') content=image(m.image,'Womens winter collection')+caption(m);
 if(['categories','products','stories'].includes(m.layout)) content=`<div class="grid">${m.items.map(p=>`<a class="card" href="#${m.layout==='categories'?'edit':'collection'}">${image(p.image,p.title)}<div class="card-label">${p.title}${m.layout!=='categories'?'<span>DISCOVER</span>':''}</div></a>`).join('')}</div>${m.layout==='products'?'<a class="view-more" href="#collection">VIEW MORE</a>':''}`;
 if(m.layout==='services') content=Array.from({length:3},()=>`<div class="service">${image('assets/shipping.svg')}<h3>Free Returns</h3><p>All full-priced orders can be returned or exchanged within 14 days</p></div>`).join('');
 if(m.layout==='footer') content=`<div class="footer-grid"><div>SHIPPING TO<br>SINGAPORE S$ / EN</div><div>CLIENT SERVICE<br>SHIPPING & RETURNS<br>TRACK ORDER<br>+65 6983 1019<br>RETURN YOUR ORDER<br>MAKE AN APPOINTMENT</div><div>LEGAL NOTICES<br>COOKIE SETTINGS<br>COOKIE POLICY<br>ACCESSIBILITY<br>CAREER</div><div>SUBSCRIBE TO THE<br>NEWSLETTER</div></div><p class="signature">C’EST SI BON</p><p class="prototype-note">INTERACTION PREVIEW · Service copy and commerce functions are for presentation only.</p>`;
 return `<section id="${m.id}" class="module ${m.layout} ${m.type}" ${m.type==='fullscreen'?'data-fullscreen':''}>${content}${m.type==='fullscreen'?'<div class="shade" aria-hidden="true"></div>':''}</section>`;
}
// 仅开场的两个模块拥有覆盖关系；后续模块不参与粘性堆叠。
document.querySelector('#app').innerHTML=`<div class="opening-stack">${modules.slice(0,2).map(render).join('')}</div>${modules.slice(2).map(render).join('')}`;
const screens=[...document.querySelectorAll('[data-fullscreen]')];
const opening=document.querySelector('.opening-stack');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let queued=false;
function paint(){
 queued=false;
 const h=document.documentElement.clientHeight;
 const openingTop=opening.getBoundingClientRect().top;
 const measurements=screens.map(el=>({el,rect:el.getBoundingClientRect()}));
 for(const {el,rect} of measurements){
   let d=Math.min(1,Math.abs(rect.top+rect.height/2-h/2)/((h+rect.height)/2));
   if(el===screens[0]) d=Math.min(1,Math.max(0,-openingTop/rect.height));
   const smooth=d*d*(3-2*d);
   el.style.setProperty('--dim',reduce.matches?'0':(motion.maximumDim*smooth).toFixed(4));
 }
}
function schedule(){if(!queued){queued=true;requestAnimationFrame(paint)}}
addEventListener('scroll',schedule,{passive:true});
addEventListener('resize',schedule);
reduce.addEventListener('change',schedule);
new ResizeObserver(schedule).observe(document.querySelector('#app'));
paint();
