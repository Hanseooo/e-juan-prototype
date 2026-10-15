const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const {chromium}=require('C:/Users/g11ar/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'),tools=require('../e-juan-product-demo/scripts/tools.json'),T=require('./timeline.json'),P=__dirname,OUT=path.join(P,'out','fast','transparent');
(async()=>{
  const report={passed:false,files:[],notes:['VP9 WebM preserves alpha transparency; standard MP4 does not.','Blue stage and outside captions removed; complete device and original UI retained.','Fast edits retain their main feature coverage. Silent footage.']};
  const browser=await chromium.launch({headless:true,executablePath:tools.browser});
  try{
    const page=await browser.newPage({viewport:{width:1200,height:1000}});
    for(const kind of Object.keys(T.clients)){
      const edit=JSON.parse(await fs.readFile(path.join(OUT,'qa',kind+'-export.json'),'utf8')),file=path.join(OUT,edit.name);
      const media=JSON.parse(execFileSync(tools.ffprobe,['-v','error','-count_frames','-show_streams','-show_format','-of','json',file],{windowsHide:true,maxBuffer:8e6}).toString()),video=media.streams.find(stream=>stream.codec_type==='video');
      assert.equal(video.codec_name,'vp9');assert.equal(video.tags.alpha_mode||video.tags.ALPHA_MODE,'1');assert.equal(video.width,edit.width);assert.equal(video.height,edit.height);assert.equal(+video.nb_read_frames,edit.frames);assert.ok(Math.abs(+media.format.duration-edit.duration)<.04);
      const alpha=execFileSync(tools.ffmpeg,['-v','error','-c:v','libvpx-vp9','-ss','1','-i',file,'-vf','alphaextract','-frames:v','1','-f','rawvideo','-pix_fmt','gray','pipe:1'],{windowsHide:true,maxBuffer:8e6});
      assert.equal(alpha.length,edit.width*edit.height);let transparent=0,opaque=0;for(const value of alpha){if(value===0)transparent++;if(value===255)opaque++;}
      assert.ok(transparent/alpha.length>.01,'Background must contain transparent pixels');assert.ok(opaque/alpha.length>.6,'Device UI must stay opaque');assert.equal(alpha[0],0);assert.equal(alpha[Math.floor(edit.height/2)*edit.width+Math.floor(edit.width/2)],255);
      await page.goto('http://127.0.0.1:4173/films/e-juan-feature-recordings/review.html');
      await page.addStyleTag({content:'body{background-color:#fff;background-image:conic-gradient(#ddd 25%,transparent 0 50%,#ddd 0 75%,transparent 0);background-size:32px 32px}video{width:auto;max-width:96vw;max-height:96vh}'});
      await page.locator('video').evaluate((node,name)=>{node.src='out/fast/transparent/'+name;node.muted=true;node.load();},edit.name);
      await page.waitForFunction(()=>document.querySelector('video').readyState>=2);
      const playback=await page.locator('video').evaluate(async node=>{const canvas=document.createElement('canvas');canvas.width=node.videoWidth;canvas.height=node.videoHeight;const ctx=canvas.getContext('2d');ctx.drawImage(node,0,0);const corner=ctx.getImageData(0,0,1,1).data[3];const start=node.currentTime;await node.play();await new Promise(resolve=>setTimeout(resolve,1000));node.pause();return {start,end:node.currentTime,cornerAlpha:corner,error:node.error?.message};});
      assert.equal(playback.cornerAlpha,0,'Chrome must decode real alpha');assert.ok(playback.end>playback.start+.5);assert.equal(playback.error,undefined);
      await page.screenshot({path:path.join(OUT,'qa',kind+'-checkerboard.png')});
      report.files.push({name:edit.name,seconds:+media.format.duration,width:edit.width,height:edit.height,frames:edit.frames,megabytes:+(+media.format.size/1e6).toFixed(2),transparentPixels:transparent,opaquePixels:opaque,playback});console.log('ALPHA VERIFIED',edit.name,(+media.format.duration).toFixed(2)+'s');
    }
    report.passed=true;await fs.writeFile(path.join(OUT,'qa','verification.json'),JSON.stringify(report,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
