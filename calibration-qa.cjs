const {chromium}=require('C:/Users/AdLink-076/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('C:/Users/AdLink-076/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs=require('fs');const assert=require('assert/strict');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1920,height:1080}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://localhost:4173');await page.evaluate(()=>document.fonts.ready);fs.mkdirSync('qa-results',{recursive:true});
async function capture(name){const png=await page.screenshot();await sharp(png).resize(960).jpeg({quality:75}).toFile(`qa-results/${name}.jpg`)}
await capture('calibrated-hero');
const layout=await page.evaluate(()=>[...document.querySelectorAll('.module')].map(e=>({id:e.id,node:e.dataset.nodeId,height:e.offsetHeight,top:e.getBoundingClientRect().top})));
assert.equal(layout.length,8);assert.equal(layout.find(x=>x.id==='footer').height,540);assert.equal(layout.find(x=>x.id==='categories').height,880);
for(const [y,dim] of [[0,0],[540,.275],[1080,.55],[540,.275]]){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(80);const v=await page.evaluate(()=>({top:document.querySelector('#hero').getBoundingClientRect().top,dim:+document.querySelector('#hero').style.getPropertyValue('--dim')}));assert.equal(v.top,0);assert.equal(v.dim,dim)}
await capture('calibrated-stack');
await page.evaluate(()=>scrollTo(0,1080));await page.waitForTimeout(80);await capture('calibrated-second');
for(const id of ['categories','edit','services','stories','footer']){await page.locator(`#${id}`).scrollIntoViewIfNeeded();await page.waitForTimeout(100);await page.locator(`#${id}`).screenshot({path:`qa-results/${id}.png`})}
const footer=await page.locator('#footer').screenshot();await sharp(footer).resize(960).jpeg({quality:85}).toFile('qa-results/calibrated-footer.jpg');
assert.equal(await page.locator('.standard .shade').count(),0);assert.equal(await page.locator('.header-icons img').count(),4);assert.equal(await page.locator('.social-nav img').count(),4);
await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});assert.equal(await page.evaluate(()=>[...document.images].filter(x=>!x.naturalWidth).length),0);
const fonts=await page.evaluate(()=>({albert:document.fonts.check('700 22px "Albert Sans"'),footer:getComputedStyle(document.querySelector('#footer')).fontFamily}));
for(const width of [1440,1024,768,390]){await page.setViewportSize({width,height:900});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(80);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow ${width}`)}await capture('calibrated-mobile');
await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('#hero').evaluate(e=>getComputedStyle(e).position),'relative');assert.equal(await page.locator('#hero .shade').evaluate(e=>getComputedStyle(e).opacity),'0');assert.deepEqual(errors,[]);
console.log(JSON.stringify({result:'PASS',layout,fonts,checks:['opening stack unchanged','brightness 0 / .275 / .55 / .275','ordinary sections no shade','all images loaded','four header and social icons','footer 540px','no overflow at 1440/1024/768/390','reduced motion preserved','no runtime errors']},null,2));await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
