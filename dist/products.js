import {renderHeader} from './components/header.js';
import {renderFooter} from './components/footer.js';

const asset=name=>`assets/listing/${name}`;
const categories=[
 {key:'dresses',label:'DRESSES',image:'product-01.png'},
 {key:'bottoms',label:'BOTTOMS',image:'product-02.jpg'},
 {key:'tops',label:'TOPS',image:'product-03.jpg'}
];
const products=[
 ['product-04.jpg','Wide Leg Tailored Trousers','£495','NEW IN'],
 ['product-05.png','Draped Jersey Dress','£620','NEW IN'],
 ['product-06.png','Checked Wool Jacket','£780',''],
 ['product-07.png','Structured Collar Jacket','£695',''],
 ['product-08.png','Printed Silk Blouse','£540',''],
 ['product-09.png','Relaxed Tailored Trousers','£460',''],
 ['product-10.png','Fluid Ivory Dress','£595',''],
 ['product-11.png','Soft Tailored Set','£730',''],
 ['product-12.png','Classic Evening Dress','£680',''],
 ['product-13.png','Longline Wool Coat','£890',''],
 ['product-01.png','Mile Skirt in Black','£395','NEW IN'],
 ['product-03.jpg','Silk Column Dress','£650','']
];
const query=new URLSearchParams(location.search);
const category=query.get('category');
const label=(category||'all products').replaceAll('-',' ').toUpperCase();

const categoryMarkup=category?'':`<section class="listing-shortcuts" aria-label="Shop by category">${categories.map(item=>`<a class="shortcut-card" href="products.html?category=${item.key}"><span class="shortcut-image"><img src="${asset(item.image)}" alt=""></span><span>${item.label}</span></a>`).join('')}</section>`;
const swatches='<span class="swatch is-active"></span><span class="swatch swatch-brown"></span><span class="swatch swatch-ivory"></span>';
const productCard=(item,index)=>`<article class="product-card"><a class="product-image" href="#" aria-label="${item[1]}"><img src="${asset(item[0])}" alt="${item[1]}">${item[3]?`<span class="product-badge">${item[3]}</span>`:''}<button class="wishlist" type="button" aria-label="Add ${item[1]} to wishlist">♡</button></a><div class="product-copy"><h2>${item[1]}</h2><p>${item[2]}</p><div class="swatches" aria-label="Available colours">${swatches}</div></div></article>`;
const campaign=(a,b,title)=>`<section class="listing-campaign"><div><img src="${asset(a)}" alt=""></div><div><img src="${asset(b)}" alt=""><span class="campaign-copy"><strong>${title}</strong><span class="text-link">SHOP THE LOOKS</span></span></div></section>`;
const social=['social-01.jpg','social-02.jpg','social-03.jpg','social-04.jpg'];

document.querySelector('#app').innerHTML=`
 ${renderHeader()}
 <div class="listing-shell" data-category="${category||'all'}">
  ${categoryMarkup}
  <section class="listing-toolbar" aria-label="Product controls"><button type="button">FILTERS <span>⌄</span></button><p>${label}</p><button type="button">SORT BY: <span>⌄</span></button></section>
  <section class="product-grid">${products.slice(0,6).map(productCard).join('')}</section>
  ${campaign('campaign-01.jpg','campaign-02.jpg','THE ART OF MODERN DRESSING')}
  <section class="product-grid">${products.slice(6).map(productCard).join('')}</section>
  ${campaign('campaign-03.jpg','campaign-01.jpg','REDEFINING HERITAGE STYLE')}
  <div class="load-more"><button type="button">LOAD MORE</button></div>
  <section class="styled-by"><h2>STYLED BY YOU</h2><div>${social.map((src,i)=>`<a href="#" class="social-tile"><img src="${asset(src)}" alt="">${i===1?'<span>LEARN MORE</span>':''}</a>`).join('')}</div></section>
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
