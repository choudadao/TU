import {renderProductCard} from './product-card.js';
const base='assets/outfits/';
const sets=[
 {key:'black',hero:'current/05.jpg',products:[
  ['current/01.png','outfit-black-hover-01.jpg','Mile Skirt in Black','£395','cell-a'],
  ['current/07.png','outfit-black-hover-03.jpg','Mile Skirt in Black','£395','cell-b'],
  ['current/04.png','outfit-black-hover-04.jpg','Mile Skirt in Black','£395','cell-d']
 ]},
 {key:'white',hero:'outfit-main-04.jpg',products:[
  ['outfit-base-01.png','outfit-white-hover-01.jpg','Mile Skirt in Black','£395','cell-a'],
  ['outfit-base-05.png','outfit-white-hover-05.jpg','Mile Skirt in Black','£395','cell-b'],
  ['outfit-base-11.png','outfit-white-hover-06.jpg','Mile Skirt in Black','£395','cell-c'],
  ['outfit-base-09.png','outfit-white-hover-08.jpg','Mile Skirt in Black','£395','cell-d']
 ]}
];
const card=([image,hover,title,price,cell])=>renderProductCard({image:base+image,hover:base+hover,title,price,cell,className:'outfit-card'});
export function renderOutfit(){return `<div class="outfit-stage" data-state="0"><div class="outfit-hero"><div class="outfit-hero-track">${sets.map(set=>`<figure><img src="${base+set.hero}" alt=""></figure>`).join('')}</div></div><div class="outfit-groups">${sets.map((set,index)=>`<div class="outfit-grid outfit-grid-${set.key}${index===0?' is-active':''}" aria-hidden="${index!==0}">${set.products.map(card).join('')}</div>`).join('')}</div></div>`}
export function initOutfit(){
 const root=document.querySelector('#classic .outfit-stage');
 if(!root)return()=>false;
 let state=0;
 let changing=false;
 const setState=next=>{
  if(next===state||changing)return false;
  changing=true;state=next;root.dataset.state=String(state);
  root.querySelectorAll('.outfit-grid').forEach((grid,index)=>{grid.classList.toggle('is-active',index===state);grid.setAttribute('aria-hidden',String(index!==state))});
  window.setTimeout(()=>{changing=false},720);
  return true;
 };
 return(section,direction)=>{
  if(section?.id!=='classic')return false;
  if(changing)return true;
  if(direction>0&&state===0)return setState(1);
  if(direction<0&&state===1)return setState(0);
  return false;
 };
}
