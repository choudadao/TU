export function initSnap(){
 const sections=[...document.querySelectorAll('.module')];
 const header=document.querySelector('.site-header');
 const navItems=[...document.querySelectorAll('.nav-item')];
 const mega=document.querySelector('.mega-menu');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let locked=false;
 const openNav=item=>{header.classList.add('nav-open');mega.setAttribute('aria-hidden','false');navItems.forEach(link=>link.setAttribute('aria-expanded',String(link===item)))};
 const closeNav=()=>{header.classList.remove('nav-open');mega.setAttribute('aria-hidden','true');navItems.forEach(link=>link.setAttribute('aria-expanded','false'))};
 navItems.forEach(item=>{item.addEventListener('pointerenter',()=>openNav(item));item.addEventListener('focus',()=>openNav(item))});
 header.addEventListener('pointerleave',closeNav);
 header.addEventListener('keydown',event=>{if(event.key==='Escape'){closeNav();navItems[0]?.focus()}});
 addEventListener('wheel',event=>{
   if(Math.abs(event.deltaY)<8||locked||event.ctrlKey)return;
   event.preventDefault();
   const center=innerHeight/2;
   const current=sections.reduce((best,section)=>Math.abs(section.getBoundingClientRect().top+section.getBoundingClientRect().height/2-center)<Math.abs(best.getBoundingClientRect().top+best.getBoundingClientRect().height/2-center)?section:best,sections[0]);
   const index=sections.indexOf(current);
   const next=Math.max(0,Math.min(sections.length-1,index+(event.deltaY>0?1:-1)));
   if(next===index)return;
   locked=true;
   sections[next].scrollIntoView({behavior:reduce.matches?'auto':'smooth',block:'start'});
   setTimeout(()=>locked=false,760);
 },{passive:false});
}
