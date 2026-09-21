// 换图或文字只修改这里。fullscreen 模块自动继承明暗效果。
export const motion = { maximumDim: 0.55 };
export const modules = [
 { id:'hero', type:'fullscreen', layout:'hero', image:'assets/hero-new.png', title:'TU AUTUMn WINTER 2026 CAMPAIGN', link:'DISCOVER', captionStyle:'arrow' },
 { id:'identity', type:'fullscreen', layout:'split', panels:[
   {image:'assets/material.png',title:'Material & Form',link:'EXPLORE'},
   {image:'assets/women.png',title:'The TU Perspective',link:'OUR PHILOSOPHY'}]},
 { id:'classic', type:'fullscreen', layout:'campaign', image:'assets/classic.png', title:'TU CLASSIC',link:'DISCOVER THE ICONS' },
 { id:'categories', type:'standard', layout:'categories', items:[
   {image:'assets/city.png',title:'City & Work'},
   {image:'assets/everyday.png',title:'Everyday Ease'},
   {image:'assets/evening.png',title:'Evening & Occasion'},
   {image:'assets/weekend.png',title:'Weekend & Travel'}] },
 { id:'video', type:'fullscreen', layout:'video', video:'assets/tu-campaign.mp4', poster:'assets/video-poster.png', title:'Effortless, Beyond One Occasion',link:'EXPLORE THE COLLECTION' },
 { id:'edit', type:'standard', layout:'products', items:[
   {image:'assets/suits.png',title:'SUITS'}, {image:'assets/knitwear.png',title:'KNITWEAR'},
   {image:'assets/dresses.png',title:'DRESSES'}, {image:'assets/coats.png',title:'COATS'}] },
 { id:'services', type:'standard', layout:'services' },
 { id:'stories', type:'standard', layout:'stories', items:[
   {image:'assets/story-one.png',title:'TU SPACES',link:'FIND US'},
   {image:'assets/story-two.png',title:'A Sense of Place',link:'READ MORE'},
   {image:'assets/story-three.png',title:'Our Story',link:'DISCOVER'}] },
 { id:'footer', type:'standard', layout:'footer' }
];
