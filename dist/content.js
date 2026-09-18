// 换图或文字只修改这里。fullscreen 模块自动继承明暗效果。
export const motion = { maximumDim: 0.55 };
const portrait = 'assets/portrait.png';
export const modules = [
 { id:'hero', type:'fullscreen', layout:'hero', image:'assets/hero.png', title:'WOMENS WINTER 26', link:'DISCOVER', target:'#collection' },
 { id:'identity', type:'fullscreen', layout:'split', panels:[
   {image:portrait,title:'Material & Form',link:'Discover the Craft',target:'#stories'},
   {image:portrait,title:'Women of TU',link:'Meet the Women',target:'#stories'}]},
 { id:'categories', type:'standard', layout:'categories', items:['City & Work','Everyday Ease','Evening & Occasion','Weekend & Travel'].map(title=>({image:portrait,title})) },
 { id:'collection', type:'fullscreen', layout:'campaign', image:portrait, title:'WOMENS WINTER 26',link:'DISCOVER',target:'#edit' },
 { id:'edit', type:'standard', layout:'products', items:Array.from({length:4},()=>({image:portrait,title:'WOMENS WINTER 26'})) },
 { id:'services', type:'standard', layout:'services' },
 { id:'stories', type:'standard', layout:'stories', items:Array.from({length:3},()=>({image:portrait,title:'WOMENS WINTER 26'})) },
 { id:'footer', type:'standard', layout:'footer' }
];
