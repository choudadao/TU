// Locked behavior from the original prototype; unchanged by visual calibration.
export function initMotion(motion){
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
}
