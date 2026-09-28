const {chromium}=require('C:/Users/AdLink-076/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
const assert=require('assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
 const base=process.env.QA_URL||'http://localhost:4174';
 await page.goto(base+'/products.html');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1200);
 assert.equal(await page.locator('.listing-shortcuts').count(),1);assert.equal(await page.locator('.product-card').count(),9);assert.equal(await page.locator('.listing-campaign').count(),2);assert.equal(await page.locator('.styled-by .social-tile span').count(),4);assert.equal(await page.locator('.quick-add').count(),9);
 const broken=await page.locator('.listing-shell img').evaluateAll(images=>images.filter(image=>!image.complete||image.naturalWidth===0).map(image=>image.src));assert.deepEqual(broken,[]);
 const first=page.locator('.product-card').first();await first.hover();await page.waitForTimeout(450);assert.equal(await first.locator('.quick-add').evaluate(element=>Math.round(new DOMMatrix(getComputedStyle(element).transform).m42)),0);assert.ok(Number(await first.locator('.product-detail').evaluate(element=>getComputedStyle(element).opacity))>.9);
 await first.locator('.quick-add-trigger').hover();await page.waitForTimeout(350);assert.ok((await first.locator('.size-list').evaluate(element=>element.getBoundingClientRect().height))>70);await first.locator('.size-list button:not(:disabled)').first().click();assert.equal(await page.locator('.cart-badge').textContent(),'1');await page.locator('.header-icons .icon').last().click();assert.equal(await page.locator('.cart-badge').isHidden(),true);
 const social=page.locator('.social-tile').first();await social.hover();await page.waitForTimeout(300);assert.ok(Number(await social.locator('span').evaluate(element=>getComputedStyle(element).opacity))>.9);assert.equal(errors.length,0,errors.join('\n'));
 fs.mkdirSync('qa-results',{recursive:true});await page.screenshot({path:'qa-results/listing-hover.png'});
 await page.goto(base+'/products.html?category=dresses');await page.waitForTimeout(400);assert.equal(await page.locator('.listing-shortcuts').count(),0);assert.ok((await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth))<=1);
 await browser.close();console.log('PASS listing interactions');
})().catch(error=>{console.error(error);process.exit(1)});
