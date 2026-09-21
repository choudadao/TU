export function initSnap(){
 const sections=[...document.querySelectorAll('.module')];
 const snapSections=sections.slice(0,6);
 const header=document.querySelector('.site-header');
 const navItems=[...document.querySelectorAll('.nav-item')];
 const mega=document.querySelector('.mega-menu');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let locked=false;
 let activeDirection=0;
 let animationToken=0;
 const easeOutQuart=t=>1-Math.pow(1-t,4);
 const animateTo=(target,token,duration=920)=>{
   if(reduce.matches){scrollTo(0,target);return Promise.resolve()}
   const start=scrollY;
   const distance=target-start;
   const started=performance.now();
   return new Promise(resolve=>{
     const frame=now=>{
       if(token!==animationToken){resolve();return}
       const progress=Math.min(1,(now-started)/duration);
       scrollTo(0,start+distance*easeOutQuart(progress));
       if(progress<1)requestAnimationFrame(frame);else{scrollTo(0,target);resolve()}
     };
     requestAnimationFrame(frame);
   });
 };
 const openNav=item=>{header.classList.add('nav-open');mega.setAttribute('aria-hidden','false');navItems.forEach(link=>link.setAttribute('aria-expanded',String(link===item)))};
 const closeNav=()=>{header.classList.remove('nav-open');mega.setAttribute('aria-hidden','true');navItems.forEach(link=>link.setAttribute('aria-expanded','false'))};
 navItems.forEach(item=>{item.addEventListener('pointerenter',()=>openNav(item));item.addEventListener('focus',()=>openNav(item))});
 header.addEventListener('pointerleave',closeNav);
 header.addEventListener('keydown',event=>{if(event.key==='Escape'){closeNav();navItems[0]?.focus()}});
 const updateHeader=()=>{
   const screen=Math.round(scrollY/innerHeight);
   header.classList.toggle('dark',screen===3||screen>=5);
 };
 addEventListener('scroll',updateHeader,{passive:true});
 updateHeader();
 addEventListener('wheel',event=>{
   if(Math.abs(event.deltaY)<8||event.ctrlKey)return;
   const direction=event.deltaY>0?1:-1;
   if(locked&&direction===activeDirection){event.preventDefault();return}
   const snapTops=snapSections.map((_,index)=>index*innerHeight);
   const sixthTop=snapTops[5];
   const belowSnapRange=scrollY>sixthTop+2;
   if(belowSnapRange)return;
   const index=snapTops.reduce((best,top,i)=>Math.abs(top-scrollY)<Math.abs(snapTops[best]-scrollY)?i:best,0);
   if(index===5&&event.deltaY>0)return;
   const next=Math.max(0,Math.min(5,index+direction));
   if(next===index)return;
   event.preventDefault();
   locked=true;
   activeDirection=direction;
   const token=++animationToken;
   animateTo(snapTops[next],token).finally(()=>{if(token===animationToken){locked=false;activeDirection=0}});
 },{passive:false});
}
