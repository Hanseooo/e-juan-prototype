const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/g11ar/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const P=__dirname,ROOT=path.resolve(P,'../..'),T=require('./timeline.json'),sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const sourceFiles=['index.html','app.js','v6-citizen.js','citizen.css','v6.css','styles.css','portal.js','offline-store.js','portal.css','sms-demo.js','sms-demo.css','showcase.js'];
async function hashes(){const result={};for(const file of sourceFiles)result[file]=crypto.createHash('sha256').update(await fs.readFile(path.join(ROOT,file))).digest('hex');return result;}
async function run(kind,{dry=false}={}){
  const spec=T.clients[kind],events=[],errors=[];
  await fs.mkdir(path.join(P,'source',kind),{recursive:true});await fs.mkdir(path.join(P,'out','qa'),{recursive:true});
  const before=await hashes(),browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const context=await browser.newContext({viewport:{width:spec.width,height:spec.height},deviceScaleFactor:1,hasTouch:true,...(!dry?{recordVideo:{dir:path.join(P,'source',kind),size:{width:spec.width,height:spec.height}}}:{})});
  const page=await context.newPage();page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  let origin;
  async function tap(target){
    await target.first().evaluate(el=>el.scrollIntoView({block:'nearest',behavior:'smooth'}));await sleep(dry?20:350);
    const box=await target.first().boundingBox();assert.ok(box,'Tap target is visible');
    await page.evaluate(box=>{const marker=document.querySelector('.record-tap');marker.style.transform=`translate(${box.x+box.width/2-23}px,${box.y+box.height/2-23}px)`;marker.style.opacity='1';},box);
    await target.first().tap();await sleep(dry?20:260);await page.evaluate(()=>{document.querySelector('.record-tap').style.opacity='0';});
    events.push({type:'tap',at:origin?(Date.now()-origin)/1000:0,point:{x:box.x+box.width/2,y:box.y+box.height/2},label:(await target.first().count())?await target.first().getAttribute('aria-label').catch(()=>null):null});
  }
  async function type(target,text){await target.fill('');await target.pressSequentially(text,{delay:dry?1:36});}
  async function scroll(target,top){await target.evaluate((el,top)=>el.scrollTo({top,behavior:'smooth'}),top);await sleep(dry?25:1000);}
  const nav=id=>tap(page.locator(`#bottom-nav [data-nav="${id}"]`));
  let ui=page;
  const staff=id=>tap(ui.locator(`.portal-nav [data-page="${id}"]`));
  async function chapter(index,action){
    const goal=index*T.chapterSeconds*1000;
    if(!dry)await sleep(Math.max(0,goal-(Date.now()-origin)));
    if(!dry)assert.ok(Date.now()-origin<goal+1800,`${kind}: chapter ${index} started late`);
    await page.locator('.record-caption').evaluate((el,text)=>{el.textContent=text;},spec.chapters[index]);
    events.push({type:'chapter',index,at:(Date.now()-origin)/1000,title:spec.chapters[index]});
    await action();await sleep(dry?50:300);
    const box=await page.locator(spec.device).boundingBox();assert.ok(box.x>=0&&box.y>=110&&box.x+box.width<=spec.width&&box.y+box.height<=spec.height-100,'Whole device remains in frame');
    await page.screenshot({path:path.join(P,'out','qa',`${kind}-${dry?'preview':'capture'}-${index}.png`)});
    console.log(kind,'chapter',index+1,spec.chapters[index]);
  }
  try{
    await page.goto('http://127.0.0.1:4173/');
    if(kind!=='citizen'){await page.locator(`.portal-links [data-preview="${kind}"]`).click();ui=page.frameLocator(`#${kind}-preview`);await ui.locator('body').waitFor();}
    else{await page.getByRole('button',{name:'Next',exact:true}).click();await page.getByRole('button',{name:'Skip',exact:true}).click();}
    await page.addStyleTag({content:await fs.readFile(path.join(P,'stage.css'),'utf8')});
    await page.evaluate(({kind,title,caption})=>{document.body.dataset.recordKind=kind;for(const [name,text] of [['title','E-JUAN / '+title],['caption',caption],['tap','']]){const node=document.createElement('div');node.className='record-'+name;node.textContent=text;document.body.append(node);}}, {kind,title:spec.title,caption:spec.chapters[0]});
    await page.locator('img').evaluateAll(images=>Promise.all(images.map(img=>img.decode().catch(()=>{}))));
    if(kind==='bhw'||kind==='lgu')await ui.locator('#access-form').waitFor();
    if(kind==='sms')await ui.locator('#sms-thread').waitFor();
    await sleep(800);origin=Date.now();
    if(kind==='citizen'){
      await chapter(0,async()=>{});
      await chapter(1,async()=>{await nav('ask');await sleep(dry?0:1800);await type(page.locator('#ask-input'),'I have had a cough for two days.');await tap(page.locator('.ask-send'));await page.locator('.question-card').waitFor();});
      await chapter(2,async()=>{for(const answer of ['Myself','2–3 days','None of these','Poblacion']){await tap(page.locator(`[data-v6-answer="${answer}"]`));await sleep(dry?10:450);}});
      await chapter(3,async()=>{await tap(page.locator('.guidance-card [data-v6-center]'));});
      await chapter(4,async()=>{await scroll(page.locator('#screen'),550);});
      await chapter(5,async()=>{await nav('medicines');await tap(page.locator('[data-v6-medicine="paracetamol"]'));await scroll(page.locator('#screen'),430);});
      await chapter(6,async()=>{await nav('citizenProfile');await tap(page.locator('.profile-actions [data-nav="reports"]'));await tap(page.locator('[data-v6-report]'));});
      await chapter(7,async()=>{await nav('home');await tap(page.locator('.home-emergency'));});
      await chapter(8,async()=>{await nav('centers');await ui.locator('#center-service').selectOption('Maternal care');await tap(page.locator('[data-v6-map="map"]'));await scroll(page.locator('#screen'),190);});
    }
    if(kind==='sms'){
      await chapter(0,async()=>{});
      await chapter(1,async()=>{await scroll(ui.locator('#sms-thread'),210);});
      await chapter(2,async()=>{await scroll(ui.locator('#sms-thread'),500);});
      await chapter(3,async()=>{await tap(ui.locator('[data-reply="STOP"]'));});
      await chapter(4,async()=>{await tap(ui.locator('[data-reply="START"]'));});
      await chapter(5,async()=>{await tap(ui.locator('[data-scenario="urgent"]'));});
      await chapter(6,async()=>{await scroll(ui.locator('#sms-thread'),600);});
      await chapter(7,async()=>{await tap(ui.locator('[data-reply="EMERGENCY"]'));});
      await chapter(8,async()=>{await tap(ui.locator('#sms-info'));});
    }
    if(kind==='bhw'){
      await chapter(0,async()=>{});
      await chapter(1,async()=>{await tap(ui.getByRole('button',{name:'Open demo workspace',exact:true}));await ui.getByRole('heading',{name:'Ready for your next visit?',exact:true}).waitFor();});
      await chapter(2,async()=>{await staff('residents');for(const [name,value] of [['name','Demo Resident'],['household','Demo Household 001'],['barangay','Poblacion']])await type(ui.locator(`#resident-form [name="${name}"]`),value);await tap(ui.locator('#resident-form button'));});
      await chapter(3,async()=>{await staff('newReport');await type(ui.locator('[name="symptoms"]'),'Fictional headache since yesterday');await type(ui.locator('[name="duration"]'),'1 day');await ui.locator('#report-warning').selectOption('none');});
      await chapter(4,async()=>{await tap(ui.getByRole('button',{name:'Save locally & queue'}));await ui.getByRole('status').filter({hasText:'Pending Sync'}).waitFor();});
      await chapter(5,async()=>{await tap(ui.getByRole('button',{name:'Back to all records'}));});
      await chapter(6,async()=>{await staff('sync');await tap(ui.locator('.demo-controls summary'));await ui.locator('#sync-adapter').selectOption('demo');await tap(ui.locator('[data-action="sync-now"]'));await ui.getByRole('status').filter({hasText:'1 demo acknowledgment'}).waitFor();});
      await chapter(7,async()=>{await context.setOffline(true);await staff('dashboard');assert.match(await ui.locator('.portal-tools').innerText(),/Offline Mode/);});
      await chapter(8,async()=>{await context.setOffline(false);await staff('records');assert.match(await ui.locator('tbody').innerText(),/Demo Resident/);});
    }
    if(kind==='lgu'){
      await chapter(0,async()=>{await ui.locator('#access-role').selectOption('admin');});
      await chapter(1,async()=>{await tap(ui.locator('#access-form button'));});
      await chapter(2,async()=>{await staff('review');await tap(ui.locator('[data-review]').first());assert.match(await ui.locator('tbody').innerText(),/Reviewed/);});
      await chapter(3,async()=>{await staff('centers');});
      await chapter(4,async()=>{await staff('inventory');await scroll(ui.locator('html'),400);await type(ui.locator('#inventory-form [name="quantity"]'),'20');await type(ui.locator('#inventory-form [name="reason"]'),'Demo restock');await tap(ui.locator('#inventory-form button'));await scroll(ui.locator('html'),0);});
      await chapter(5,async()=>{await staff('map');});
      await chapter(6,async()=>{await staff('trends');await ui.locator('#report-range').selectOption('1');});
      await chapter(7,async()=>{await staff('bhw');});
      await chapter(8,async()=>{await staff('analytics');const download=page.waitForEvent('download');await tap(ui.locator('[data-action="export"]'));const file=await download;await file.saveAs(path.join(P,'source','sample-aggregate.csv'));});
    }
    if(!dry)await sleep(Math.max(0,T.duration*1000-(Date.now()-origin)));
    assert.deepEqual(errors,[]);const after=await hashes();assert.deepEqual(after,before,'Application source must not change');
    const video=page.video();const elapsed=(Date.now()-origin)/1000;
    // Record timing relative to the browser recording before closing its context.
    await fs.writeFile(path.join(P,'source',kind,`${dry?'dry-run':'capture'}.json`),JSON.stringify({kind,spec,elapsed,events,errors,sourceHashes:after,recordingStart:origin},null,2));
    if(!dry){const rawPath=await video.path();await fs.writeFile(path.join(P,'source',kind,'video-path.txt'),rawPath);}
    await context.close();console.log(kind,dry?'DRY RUN PASS':'RECORDED',elapsed.toFixed(2));
  }catch(error){await page.screenshot({path:path.join(P,'out','qa',`${kind}-error.png`)}).catch(()=>{});throw error;}
  finally{await browser.close();}
}
const args=process.argv.slice(2),dry=args.includes('--dry'),kinds=args.filter(arg=>!arg.startsWith('--'));
(async()=>{for(const kind of kinds)await run(kind,{dry});})().catch(error=>{console.error(error);process.exitCode=1;});
