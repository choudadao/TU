import {renderProductCard} from './product-card.js';

const base='assets/outfits/';
const sets={
 white:{hero:'new-white/01.jpeg',products:[
  ['new-white/04.png','outfit-white-hover-01.jpg','Mile Skirt in Black','£395','cell-a'],
  ['new-white/08.png','outfit-white-hover-05.jpg','Mile Skirt in Black','£395','cell-b'],
  ['new-white/15.png','outfit-white-hover-06.jpg','Mile Skirt in Black','£395','cell-c'],
  ['new-white/10.png','outfit-white-hover-08.jpg','Mile Skirt in Black','£395','cell-d']
 ]},
 black:{hero:'new-black/01.jpeg',products:[
  ['new-black/03.png','outfit-black-hover-01.jpg','Mile Skirt in Black','£395','cell-a'],
  ['new-black/05.png','outfit-black-hover-03.jpg','Mile Skirt in Black','£395','cell-b'],
  ['new-black/06.png','outfit-black-hover-04.jpg','Mile Skirt in Black','£395','cell-d']
 ]}
};

const card=([image,hover,title,price,cell])=>renderProductCard({image:base+image,hover:base+hover,title,price,className:`outfit-card ${cell||''}`});

export function renderOutfit(module){
 const set=sets[module.variant]||sets.white;
 return `<div class="outfit-stage outfit-${module.variant}"><img class="outfit-background" src="${base+set.hero}" alt=""><div class="outfit-product-scroll" tabindex="0" aria-label="Outfit products"><div class="outfit-grid">${set.products.map(card).join('')}</div></div></div>`;
}

export function initOutfit(){
 const state=new WeakMap();
 return(section,direction)=>{
  if(!section?.classList.contains('outfit'))return false;
  const scroller=section.querySelector('.outfit-product-scroll');
  if(!scroller)return false;
  const max=Math.max(0,scroller.scrollHeight-scroller.clientHeight);
  const current=scroller.scrollTop;
  const record=state.get(scroller)||{locked:false};
  if(record.locked)return true;
  const canMove=direction>0?current<max-2:current>2;
  if(!canMove)return false;
  record.locked=true;
  state.set(scroller,record);
  scroller.scrollTo({top:direction>0?max:0,behavior:'smooth'});
  window.setTimeout(()=>{record.locked=false},650);
  return true;
 };
}
