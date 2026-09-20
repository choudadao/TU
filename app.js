import {modules,motion} from './content.js';
import {renderHeader} from './components/header.js';
import {renderFooter} from './components/footer.js';
import {renderScreen,renderVideo,renderGrid,renderServices} from './components/sections.js';
import {initMotion} from './motion.js';
import {initSnap} from './snap.js';
import {moduleMap} from './module-map.js';
function render(m){
 const renderers={hero:()=>renderScreen(m,renderHeader()),split:()=>renderScreen(m),campaign:()=>renderScreen(m),video:()=>renderVideo(m),categories:()=>renderGrid(m),products:()=>renderGrid(m),stories:()=>renderGrid(m),services:renderServices,footer:renderFooter};
 return `<section id="${m.id}" data-node-id="${moduleMap[m.id].nodeId}" class="module ${m.layout} ${m.type}" ${m.type==='fullscreen'?'data-fullscreen':''}>${renderers[m.layout]()}${m.type==='fullscreen'?'<div class="shade" aria-hidden="true"></div>':''}</section>`;
}
document.querySelector('#app').innerHTML=`<div class="opening-stack">${modules.slice(0,2).map(render).join('')}</div>${modules.slice(2).map(render).join('')}`;
initMotion(motion);
initSnap();
