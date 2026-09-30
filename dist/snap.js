export function initSnap({consumeSectionWheel}={}){
 const sections=[...document.querySelectorAll('.module')];
 const serviceIndex=sections.findIndex(section=>section.id==='services');
 const snapSections=sections.slice(0,serviceIndex);
 const exitSection=sections[serviceIndex];
 const header=document.querySelector('.site-header');
 const navItems=[...document.querySelectorAll('.nav-item')];
 const mega=document.querySelector('.mega-menu');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let locked=false;
 let activeDirection=0;
 let animationToken=0;
 let targets=[];
 const measureTargets=()=>{
   let top=0;
   targets=snapSections.map(section=>{const anchor=top;top+=section.offsetHeight;return anchor});
   targets.push(top);
 };
 measureTargets();
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
   const screen=targets.reduce((best,top,i)=>Math.abs(top-scrollY)<Math.abs(targets[best]-scrollY)?i:best,0);
   const current=sections[Math.min(screen,sections.length-1)];
   const darkIds=['classic','categories','bestsellers','edit','services','stories','footer'];
   const surfaceIds=['bestsellers','edit','services','stories','footer'];
   header.classList.toggle('dark',darkIds.includes(current.id));
   header.classList.toggle('surface',surfaceIds.includes(current.id));
 };
 addEventListener('resize',()=>{measureTargets();updateHeader()},{passive:true});
 addEventListener('scroll',updateHeader,{passive:true});
 updateHeader();
 addEventListener('wheel',event=>{
   if(Math.abs(event.deltaY)<8||event.ctrlKey)return;
   const direction=event.deltaY>0?1:-1;
   if(locked&&direction===activeDirection){event.preventDefault();return}
   const lastSnapIndex=snapSections.length-1;
   const lastSnapTop=targets[lastSnapIndex];
   const belowSnapRange=scrollY>lastSnapTop+2;
   if(belowSnapRange)return;
   const index=targets.reduce((best,top,i)=>Math.abs(top-scrollY)<Math.abs(targets[best]-scrollY)?i:best,0);
   if(index<serviceIndex&&consumeSectionWheel?.(snapSections[index],direction)){event.preventDefault();return}
   if(index===lastSnapIndex&&direction>0)return;
   const next=Math.max(0,Math.min(serviceIndex,index+direction));
   if(next===index)return;
   event.preventDefault();
   locked=true;
   activeDirection=direction;
   const token=++animationToken;
   animateTo(targets[next],token).finally(()=>{if(token===animationToken){locked=false;activeDirection=0}});
 },{passive:false});
}
