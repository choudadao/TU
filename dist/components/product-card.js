const swatchesMarkup=(colors=[])=>colors.length?`<div class="product-swatches" aria-label="Available colors">${colors.map((color,index)=>`<i style="--swatch:${color}"${index===0?' class="is-selected"':''}></i>`).join('')}</div>`:'';

export function renderProductCard({image,hover='',title='Mile Skirt in Black',price='£395',cell='',colors=[],badge='',className=''}){
 const hoverImage=hover?`<img class="product-image-hover" src="${hover}" alt="">`:'';
 return `<article class="product-card ${hover?'has-hover ':''}${className} ${cell}"><div class="product-image"><img class="product-image-base" src="${image}" alt="${title}">${hoverImage}<span class="product-wishlist"><img src="assets/listing/wishlist-default.svg" alt=""></span>${badge?`<span class="product-badge">${badge}</span>`:''}</div><div class="product-copy"><h3>${title}</h3><p>${price}</p>${swatchesMarkup(colors)}</div></article>`;
}
