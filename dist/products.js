import {renderHeader} from './components/header.js';
import {renderFooter} from './components/footer.js';

const asset=name=>`assets/listing/${name}`;
const categories=[
 {key:'dresses',label:'DRESSES',image:'category.jpg'},
 {key:'bottoms',label:'BOTTOMS',image:'category.jpg'},
 {key:'tops',label:'TOPS',image:'category.jpg'}
];
const products=[
 ['product-01.png','Mile Skirt in Black','£395','NEW IN','detail-01a.jpg'],
 ['figma-product-02.png','Mile Skirt in Black','£395  $202.00','30% OFF'],
 ['figma-product-03.png','Mile Skirt in Black','£395','NEW IN'],
 ['figma-product-04.png','Mile Skirt in Black','£395','NEW IN'],
 ['figma-product-05.png','Mile Skirt in Black','£395','NEW IN'],
 ['figma-product-06.png','Mile Skirt in Black','£395','NEW IN'],
 ['figma-product-07.png','Mile Skirt in Black','£395','NEW IN'],
 ['figma-product-08.png','Mile Skirt in Black','£395','NEW IN'],
 ['figma-product-09.png','Mile Skirt in Black','£395','NEW IN']
];
const query=new URLSearchParams(location.search);
const category=query.get('category');
const label=(category||'all products').replaceAll('-',' ').toUpperCase();

const categoryMarkup=category?'':`<section class="listing-shortcuts" aria-label="Shop by category">${categories.map(item=>`<a class="shortcut-card" href="products.html?category=${item.key}"><span class="shortcut-image"><img src="${asset(item.image)}" alt=""></span><span>${item.label}</span></a>`).join('')}</section>`;
const swatches='<span class="swatch is-active"></span><span class="swatch swatch-brown"></span><span class="swatch swatch-ivory"></span>';
const sizes=['2','4','6','8','10','12','14','16','2P','4P','6P','8P','10P'];
const productCard=(item,index)=>`<article class="product-card"><div class="product-image" tabindex="0" aria-label="${item[1]}"><img class="product-primary" src="${asset(item[0])}" alt="${item[1]}">${item[4]?`<img class="product-detail" src="${asset(item[4])}" alt="Detail of ${item[1]}">`:''}${item[3]?`<span class="product-badge${item[3].includes('%')?' is-sale':''}">${item[3]}</span>`:''}<button class="wishlist" type="button" aria-label="Add ${item[1]} to wishlist">♡</button><div class="quick-add"><button class="quick-add-trigger" type="button">QUICK ADD <span>＋</span></button><div class="size-list" aria-label="Choose a size">${sizes.map((size,i)=>`<button type="button"${i===5||i===7||i===12?' disabled':''}>${size}</button>`).join('')}</div></div></div><div class="product-copy"><h2>${item[1]}</h2><p class="${item[2].includes('$')?'sale-price':''}">${item[2]}</p><div class="swatches" aria-label="Available colours">${swatches}</div></div></article>`;
const campaign=(images,title,split=true)=>`<section class="listing-campaign${split?'':' is-single'}">${images.map((src,index)=>`<div><img src="${asset(src)}" alt="">${index===images.length-1?`<span class="campaign-copy"><strong>${title}</strong><span class="text-link">SHOP THE LOOKS</span></span>`:''}</div>`).join('')}</section>`;
const social=Array(4).fill('figma-social.png');

document.querySelector('#app').innerHTML=`
 ${renderHeader()}
 <div class="listing-shell" data-category="${category||'all'}">
  ${categoryMarkup}
  <section class="listing-toolbar" aria-label="Product controls"><button type="button">FILTERS <span>⌄</span></button><p>${label}</p><button type="button">SORT BY: <span>⌄</span></button></section>
  <section class="product-grid">${products.slice(0,3).map(productCard).join('')}</section>
  ${campaign(['figma-campaign-01.png','figma-campaign-02.png'],'REDEFINING HERITAGE STYLE')}
  <section class="product-grid">${products.slice(3).map(productCard).join('')}</section>
  ${campaign(['figma-campaign-03.png'],'REDEFINING HERITAGE STYLE',false)}
  <div class="load-more"><button type="button">LOAD MORE</button></div>
  <section class="styled-by"><h2>STYLED BY YOU</h2><div>${social.map(src=>`<a href="#" class="social-tile"><img src="${asset(src)}" alt=""><span>LEARN MORE</span></a>`).join('')}</div></section>
 </div>
 <footer class="module footer">${renderFooter()}</footer>`;

const header=document.querySelector('.site-header');
header.classList.add('listing-header','dark','surface');
document.querySelector('.logo').setAttribute('role','link');
document.querySelector('.logo').tabIndex=0;
document.querySelector('.logo').addEventListener('click',()=>location.href='./');
document.querySelector('.logo').addEventListener('keydown',event=>{if(event.key==='Enter')location.href='./'});
const mega=document.querySelector('.mega-menu');
const navItems=[...document.querySelectorAll('.nav-item')];
const open=item=>{header.classList.add('nav-open');mega.setAttribute('aria-hidden','false');navItems.forEach(link=>link.setAttribute('aria-expanded',String(link===item)))};
const close=()=>{header.classList.remove('nav-open');mega.setAttribute('aria-hidden','true');navItems.forEach(link=>link.setAttribute('aria-expanded','false'))};
navItems.forEach(item=>{item.addEventListener('mouseenter',()=>open(item));item.addEventListener('focus',()=>open(item))});
header.addEventListener('mouseleave',close);
document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
document.querySelectorAll('a[href="#"]').forEach(link=>link.addEventListener('click',event=>event.preventDefault()));
let unseen=0;
const cart=document.querySelector('.header-icons .icon:last-child');
const badge=document.createElement('span');badge.className='cart-badge';cart.append(badge);
const updateBadge=()=>{badge.textContent=unseen||'';badge.hidden=!unseen};updateBadge();
document.querySelectorAll('.quick-add-trigger').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();button.closest('.quick-add').classList.toggle('is-open')}));
document.querySelectorAll('.size-list button:not(:disabled)').forEach(button=>button.addEventListener('click',()=>{unseen+=1;updateBadge();button.closest('.quick-add').classList.remove('is-open')}));
cart.addEventListener('click',()=>{unseen=0;updateBadge()});
