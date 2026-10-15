const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process');
const {chromium}=require('C:/Users/g11ar/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const P=__dirname,ROOT=path.resolve(P,'../..'),T=require('./timeline.json'),tools=require('../e-juan-product-demo/scripts/tools.json');
(async()=>{
  const result={passed:false,files:[],limits:['Silent screen recordings; no narration or music.','Native browser footage is 25 fps; the 60 fps exports repeat frames.','Live device/clinic/SMS/municipal integrations are not validated by these recordings.']};
  const manifest=JSON.parse(await fs.readFile(path.join(P,'out','qa','manifest.json'),'utf8'));
  const browser=await chromium.launch({headless:true,executablePath:tools.browser});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:900}});
    for(const [kind,spec] of Object.entries(T.clients)){
      const file=path.join(P,'out',spec.file);
      const media=JSON.parse(execFileSync(tools.ffprobe,['-v','error','-count_frames','-show_streams','-show_format','-of','json',file],{windowsHide:true,maxBuffer:8e6}).toString());
      const video=media.streams.find(stream=>stream.codec_type==='video');
      assert.equal(video.width,spec.width);assert.equal(video.height,spec.height);assert.equal(video.codec_name,'h264');assert.equal(video.pix_fmt,'yuv420p');assert.equal(video.avg_frame_rate,'60/1');assert.equal(+video.nb_read_frames,T.duration*T.fps);
      for(const name of ['color_space','color_transfer','color_primaries'])assert.equal(video[name],'bt709');
      assert.ok(Math.abs(+media.format.duration-T.duration)<1/60);assert.ok(+media.format.duration>=60);assert.equal(media.streams.filter(stream=>stream.codec_type==='audio').length,0);
      const source=manifest.find(entry=>entry.kind===kind);
      for(const [name,hash] of Object.entries(source.sourceHashes))assert.equal(crypto.createHash('sha256').update(await fs.readFile(path.join(ROOT,name))).digest('hex'),hash,`${name}: source changed`);
      await page.goto('http://127.0.0.1:4173/films/e-juan-feature-recordings/review.html');
      await page.locator('video').evaluate((video,url)=>{video.src=url;video.muted=true;video.load();},'out/'+spec.file);
      await page.waitForFunction(()=>{const v=document.querySelector('video');return v.readyState>=2&&v.videoWidth>0;});
      const playback=await page.locator('video').evaluate(async video=>{video.currentTime=30;await new Promise(resolve=>video.addEventListener('seeked',resolve,{once:true}));const before=video.currentTime;await video.play();await new Promise(resolve=>setTimeout(resolve,1800));video.pause();return {before,after:video.currentTime,error:video.error?.message,ready:video.readyState};});
      assert.ok(playback.after>playback.before+1,'MP4 must play in Chrome');assert.equal(playback.error,undefined);
      result.files.push({name:spec.file,duration:+media.format.duration,width:video.width,height:video.height,frames:+video.nb_read_frames,megabytes:+(+media.format.size/1e6).toFixed(2),playback,sourceUnchanged:true});
      console.log('VERIFIED',spec.file,media.format.duration+'s');
    }
    result.passed=true;await fs.writeFile(path.join(P,'out','qa','verification.json'),JSON.stringify(result,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
