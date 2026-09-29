import {renderHeader} from './components/header.js';
import {renderFooter} from './components/footer.js';

const asset=name=>`assets/listing/${name}`;
const categories=[
 {key:'dresses',label:'DRESSES',image:'category-dresses.png'},
 {key:'suits',label:'SUITS',image:'category-suits.png'},
 {key:'knitwear',label:'KNITWEAR',image:'category-knitwear.png'}
];
const products=[
 ['product-new-01.png','Mile Skirt in Black','£395','NEW IN'],
 ['product-new-02.png','Mile Skirt in Black','£395',''],
 ['product-row1-right.png','Mile Skirt in Black','£395','NEW IN','product-row1-right-detail.png'],
 ['product-new-04.png','Mile Skirt in Black','£395','NEW IN'],
 ['product-new-05.png','Mile Skirt in Black','£395','NEW IN'],
 ['product-new-06.png','Mile Skirt in Black','£395','NEW IN'],
 ['product-new-07.png','Mile Skirt in Black','£395','NEW IN'],
 ['product-new-08.png','Mile Skirt in Black','£395','NEW IN'],
 ['product-new-09.png','Mile Skirt in Black','£395','NEW IN']
];
const query=new URLSearchParams(location.search);
const category=query.get('category');
const label=(category||'all products').replaceAll('-',' ').toUpperCase();

const categoryMarkup=category?'':`<section class="listing-shortcuts" aria-label="Shop by category">${categories.map(item=>`<a class="shortcut-card" href="products.html?category=${item.key}"><span class="shortcut-image"><img src="${asset(item.image)}" alt=""></span><span>${item.label}</span></a>`).join('')}</section>`;
const swatches='<button class="swatch is-active" type="button" aria-label="Black" aria-pressed="true"></button><button class="swatch swatch-brown" type="button" aria-label="Brown" aria-pressed="false"></button><button class="swatch swatch-ivory" type="button" aria-label="Ivory" aria-pressed="false"></button>';
const sizes=['2','4','6','8','10','12','14','16','2P','4P','6P','8P','10P'];
const productCard=(item,index)=>`<article class="product-card${item[4]?' has-detail':''}" data-primary="${asset(item[0])}"${item[4]?` data-alternate="${asset(item[4])}"`:''}><div class="product-image" tabindex="0" aria-label="${item[1]}"><span class="product-loader" aria-hidden="true"><span class="loading-logo"></span></span><img class="product-primary" src="${asset(item[0])}" alt="${item[1]}">${item[4]?`<img class="product-detail" src="${asset(item[4])}" alt="Detail of ${item[1]}">`:''}${item[3]?`<span class="product-badge">${item[3]}</span>`:''}<button class="wishlist" type="button" aria-label="Add ${item[1]} to wishlist" aria-pressed="false"><img class="wishlist-default" src="${asset('wishlist-default.svg')}" alt=""><img class="wishlist-active" src="${asset('wishlist-active.svg')}" alt="" hidden></button><div class="quick-add"><button class="quick-add-trigger" type="button">QUICK ADD <span>＋</span></button><div class="size-list" aria-label="Choose a size">${sizes.map((size,i)=>`<button type="button"${i===5||i===7||i===12?' disabled':''}>${size}</button>`).join('')}</div></div></div><div class="product-copy"><h2>${item[1]}</h2><p>${item[2]}</p><div class="swatches" aria-label="Available colours">${swatches}</div></div></article>`;
const campaign=(images,title,split=true,className='')=>`<section class="listing-campaign${split?'':' is-single'}${className?` ${className}`:''}">${images.map(src=>`<div><img src="${asset(src)}" alt=""><span class="campaign-copy"><strong>${title}</strong><span class="text-link">SHOP THE LOOKS</span></span></div>`).join('')}</section>`;
const social=['styled-exact-01.png','styled-exact-02.png','styled-exact-03.png','styled-exact-04.png'];

document.querySelector('#app').innerHTML=`
 ${renderHeader()}
 <div class="listing-shell" data-category="${category||'all'}">
  ${categoryMarkup}
  <section class="listing-toolbar" aria-label="Product controls"><button type="button">FILTERS <span>⌄</span></button><p>${label}</p><button type="button">SORT BY: <span>⌄</span></button></section>
  <section class="product-grid is-first-row">${products.slice(0,3).map(productCard).join('')}</section>
  ${campaign(['campaign-left-raw-1.png','campaign-right-raw-1.png'],'REDEFINING HERITAGE STYLE',true,'is-heritage')}
  <section class="product-grid">${products.slice(3).map(productCard).join('')}</section>
  ${campaign(['campaign-new-03.png'],'REDEFINING HERITAGE STYLE',false)}
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
const wireCards=root=>{
 root.querySelectorAll('.quick-add-trigger').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();button.closest('.quick-add').classList.toggle('is-open')}));
 root.querySelectorAll('.size-list button:not(:disabled)').forEach(button=>button.addEventListener('click',()=>{unseen+=1;updateBadge();button.closest('.quick-add').classList.remove('is-open')}));
 root.querySelectorAll('.wishlist').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();const selected=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(selected));button.querySelector('.wishlist-default').hidden=selected;button.querySelector('.wishlist-active').hidden=!selected}));
 root.querySelectorAll('.swatch').forEach(button=>button.addEventListener('click',()=>{const card=button.closest('.product-card');const image=card.querySelector('.product-primary');card.querySelectorAll('.swatch').forEach(item=>{item.classList.toggle('is-active',item===button);item.setAttribute('aria-pressed',String(item===button))});card.classList.add('is-loading');window.setTimeout(()=>{image.src=card.dataset.primary;card.classList.remove('is-loading')},360)}));
};
wireCards(document);
cart.addEventListener('click',()=>{unseen=0;updateBadge()});
const loadMore=document.querySelector('.load-more');
loadMore.querySelector('button').addEventListener('click',()=>{const grid=document.createElement('section');grid.className='product-grid loaded-products';grid.innerHTML=Array.from({length:24},(_,index)=>productCard(products[index%products.length],index)).join('');loadMore.before(grid);wireCards(grid);loadMore.hidden=true});
