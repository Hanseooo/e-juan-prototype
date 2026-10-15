const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('C:/Users/g11ar/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {ffmpeg}=require('./export.cjs'),T=require('./timeline.json'),P=__dirname,FAST=path.join(P,'out','fast'),OUT=path.join(FAST,'transparent');
async function prepareMasks(){
  await fs.mkdir(path.join(OUT,'qa'),{recursive:true});
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try{
    for(const [kind,spec] of Object.entries(T.clients)){
      const page=await browser.newPage({viewport:{width:spec.width,height:spec.height}});
      await page.goto('http://127.0.0.1:4173/');if(kind!=='citizen')await page.locator(`.portal-links [data-preview="${kind}"]`).click();
      await page.addStyleTag({content:await fs.readFile(path.join(P,'stage.css'),'utf8')});await page.waitForTimeout(500);
      const shape=await page.evaluate(kind=>{
        const read=selector=>{const node=document.querySelector(selector),r=node.getBoundingClientRect(),s=getComputedStyle(node);return {x:r.x,y:r.y,w:r.width,h:r.height,radii:[s.borderTopLeftRadius,s.borderTopRightRadius,s.borderBottomRightRadius,s.borderBottomLeftRadius].map(value=>parseFloat(value)*r.width/node.offsetWidth),clip:s.clipPath};};
        return {body:read(kind==='citizen'?'#device':kind==='sms'?'#sms-device':'.workspace-bezel'),stand:kind==='lgu'?read('.monitor-stand'):null};
      },kind);
      const {body:b,stand}=shape,[tl,tr,br,bl]=b.radii,x=b.x+.5,y=b.y+.5,w=b.w-1,h=b.h-1;
      const rounded=`M${x+tl},${y}H${x+w-tr}Q${x+w},${y} ${x+w},${y+tr}V${y+h-br}Q${x+w},${y+h} ${x+w-br},${y+h}H${x+bl}Q${x},${y+h} ${x},${y+h-bl}V${y+tl}Q${x},${y} ${x+tl},${y}Z`;
      let standSvg='';
      if(stand){const values=stand.clip.match(/polygon\((.*)\)/)[1].split(',').map(pair=>pair.trim().split(/\s+/).map(parseFloat));standSvg=`<polygon fill="white" points="${values.map(([px,py])=>`${stand.x+px/100*stand.w},${stand.y+py/100*stand.h}`).join(' ')}"/>`;}
      const left=Math.floor((b.x-16)/2)*2,top=Math.floor((b.y-16)/2)*2,right=Math.ceil((b.x+b.w+16)/2)*2,bottom=Math.ceil((Math.max(b.y+b.h,stand?stand.y+stand.h:0)+16)/2)*2;
      const crop={x:left,y:top,w:right-left,h:bottom-top};assert.ok(left>=0&&top>=0&&right<=spec.width&&bottom<=spec.height);
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${spec.width}" height="${spec.height}" viewBox="0 0 ${spec.width} ${spec.height}"><rect width="100%" height="100%" fill="black"/><path d="${rounded}" fill="white"/>${standSvg}</svg>`;
      await fs.writeFile(path.join(OUT,'qa',kind+'-mask.svg'),svg);
      await page.setContent(`<style>html,body{margin:0;overflow:hidden}</style>${svg}`);await page.screenshot({path:path.join(OUT,'qa',kind+'-mask.png')});
      await fs.writeFile(path.join(OUT,'qa',kind+'-geometry.json'),JSON.stringify({...shape,crop},null,2));await page.close();console.log('MATTE READY',kind,crop);
    }
  }finally{await browser.close();}
}
async function encode(kind){
  const edit=JSON.parse(await fs.readFile(path.join(FAST,'qa',kind+'-edit.json'),'utf8')),geometry=JSON.parse(await fs.readFile(path.join(OUT,'qa',kind+'-geometry.json'),'utf8')),c=geometry.crop;
  const input=path.join(FAST,edit.name),mask=path.join(OUT,'qa',kind+'-mask.png'),name=edit.name.replace('-Fast.mp4','-Transparent.webm'),file=path.join(OUT,name);
  const filter=`[0:v]fps=60,crop=${c.w}:${c.h}:${c.x}:${c.y},setpts=PTS-STARTPTS,format=yuv420p[v];[1:v]crop=${c.w}:${c.h}:${c.x}:${c.y},format=gray[m];[v][m]alphamerge,format=yuva420p[out]`;
  await ffmpeg(['-i',input,'-loop','1','-framerate','60','-i',mask,'-filter_complex',filter,'-map','[out]','-frames:v',String(edit.frames),'-an','-c:v','libvpx-vp9','-pix_fmt','yuva420p','-b:v','0','-crf','25','-deadline','realtime','-cpu-used','6','-row-mt','1','-threads','4','-auto-alt-ref','0','-metadata:s:v:0','alpha_mode=1','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-progress','pipe:1',file],kind+' transparent');
  await ffmpeg(['-c:v','libvpx-vp9','-ss','1','-i',file,'-frames:v','1','-pix_fmt','rgba',file.replace('.webm','.png')],kind+' alpha poster');
  await fs.writeFile(path.join(OUT,'qa',kind+'-export.json'),JSON.stringify({kind,name,frames:edit.frames,duration:edit.duration,width:c.w,height:c.h,source:edit.name,geometry,chapters:edit.scenes.map(scene=>scene.caption)},null,2));console.log('TRANSPARENT READY',name);
}
(async()=>{const args=process.argv.slice(2);if(args.includes('--prepare'))await prepareMasks();for(const kind of args.filter(arg=>!arg.startsWith('--')))await encode(kind);})().catch(error=>{console.error(error);process.exitCode=1;});
