const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const {chromium}=require('C:/Users/g11ar/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'),tools=require('../e-juan-product-demo/scripts/tools.json'),T=require('./timeline.json'),P=__dirname,OUT=path.join(P,'out','fast');
(async()=>{
  const report={passed:false,files:[],review:'Fast edits remove idle holds and use 1.0–1.5x action playback; the original device-framed recordings remain the source.'};
  const browser=await chromium.launch({headless:true,executablePath:tools.browser});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:900}});
    for(const kind of Object.keys(T.clients)){
      const edit=JSON.parse(await fs.readFile(path.join(OUT,'qa',kind+'-edit.json'),'utf8')),file=path.join(OUT,edit.name);
      const media=JSON.parse(execFileSync(tools.ffprobe,['-v','error','-count_frames','-show_streams','-show_format','-of','json',file],{windowsHide:true,maxBuffer:8e6}).toString()),video=media.streams.find(stream=>stream.codec_type==='video');
      assert.equal(video.width,edit.width);assert.equal(video.height,edit.height);assert.equal(video.codec_name,'h264');assert.equal(video.pix_fmt,'yuv420p');const [numerator,denominator]=video.avg_frame_rate.split('/').map(Number);assert.ok(Math.abs(numerator/denominator-60)<.01);assert.equal(+video.nb_read_frames,edit.frames);
      assert.ok(Math.abs(+media.format.duration-edit.duration)<.04);assert.ok(+media.format.duration<35,'Fast demo must remove the long holds');
      for(const key of ['color_space','color_transfer','color_primaries'])assert.equal(video[key],'bt709');
      assert.equal(edit.scenes.length,kind==='sms'?8:9);assert.equal(new Set(edit.scenes.map(scene=>scene.chapter)).size,edit.scenes.length);
      for(const scene of edit.scenes)assert.ok(scene.frames>=80&&scene.speed<=1.5);
      await page.goto('http://127.0.0.1:4173/films/e-juan-feature-recordings/review.html');
      await page.locator('video').evaluate((node,name)=>{node.src='out/fast/'+name;node.muted=true;node.load();},edit.name);
      await page.waitForFunction(()=>document.querySelector('video').readyState>=2);
      const playback=await page.locator('video').evaluate(async node=>{const start=node.currentTime;await node.play();await new Promise(resolve=>setTimeout(resolve,1100));node.pause();return {start,end:node.currentTime,error:node.error?.message};});
      assert.ok(playback.end>playback.start+.6);assert.equal(playback.error,undefined);
      report.files.push({name:edit.name,seconds:+media.format.duration,frames:+video.nb_read_frames,megabytes:+(+media.format.size/1e6).toFixed(2),chapters:edit.scenes.map(scene=>scene.caption),playback});console.log('FAST VERIFIED',edit.name,(+media.format.duration).toFixed(2)+'s');
    }
    report.passed=true;await fs.writeFile(path.join(OUT,'qa','verification.json'),JSON.stringify(report,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
