// 换图或文字只修改这里。fullscreen 模块自动继承明暗效果。
export const motion = { maximumDim: 0.55 };
export const modules = [
 { id:'hero', type:'fullscreen', layout:'hero', image:'assets/hero-new.png', title:'TU AUTUME WINTER 2026 CAMPAIGN', link:'DISCOVER', target:'#classic', captionStyle:'arrow' },
 { id:'identity', type:'fullscreen', layout:'split', panels:[
   {layers:['assets/identity-base.png','assets/material.png'],title:'Material & Form',link:'Discover the Craft',target:'#stories'},
   {layers:['assets/identity-base.png','assets/women.png'],title:'Women of TU',link:'Meet the Women',target:'#stories'}]},
 { id:'classic', type:'fullscreen', layout:'campaign', image:'assets/classic.png', title:'TU CLASSIC',link:'SHOP NOW',target:'#categories' },
 { id:'categories', type:'standard', layout:'categories', items:[
   {layers:['assets/weekend-base-a.png','assets/weekend-base-b.png','assets/weekend.png'],title:'Weekend & Travel'},
   {image:'assets/everyday.png',title:'Everyday Ease'},
   {layers:['assets/evening-base-a.png','assets/evening-base-b.png','assets/evening.png'],title:'Evening & Occasion'},
   {layers:['assets/city-base.png','assets/city.png'],title:'City & Work'}] },
 { id:'video', type:'fullscreen', layout:'video', video:'assets/tu-campaign.mp4', poster:'assets/video-poster.png', title:'Effortless, Beyond One Occasion',link:'EXPLORE THE COLLECTION',target:'#edit' },
 { id:'edit', type:'standard', layout:'products', items:[
   {image:'assets/suits.png',title:'SUITS'}, {image:'assets/knitwear.png',title:'KNITWEAR'},
   {image:'assets/dresses.png',title:'DRESSES'}, {image:'assets/coats.png',title:'COATS'}] },
 { id:'services', type:'standard', layout:'services' },
 { id:'stories', type:'standard', layout:'stories', items:[
   {layers:['assets/classic.png','assets/story-one.png'],title:'WOMENS WINTER 26'},
   {layers:['assets/classic.png','assets/story-two-base.png','assets/story-two.png'],title:'WOMENS WINTER 26'},
   {image:'assets/story-three.png',title:'WOMENS WINTER 26'}] },
 { id:'footer', type:'standard', layout:'footer' }
];
