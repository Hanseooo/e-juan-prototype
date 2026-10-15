const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),{probe,ffmpeg}=require('./export.cjs'),T=require('./timeline.json'),E=require('./fast-edit.json');
const P=__dirname,OUT=path.join(P,'out','fast'),font="fontfile='C\\:/Windows/Fonts/arial.ttf'",metadata='h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0';
const stamp=seconds=>{const ms=Math.round(seconds*1000);return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')},${String(ms%1000).padStart(3,'0')}`;};
async function run(kind){
  const spec=T.clients[kind],scenes=E[kind],chunks=path.join(OUT,'qa',kind);await fs.mkdir(chunks,{recursive:true});
  const raw=(await fs.readFile(path.join(P,'source',kind,'video-path.txt'),'utf8')).trim(),lead=+probe(raw).format.duration-T.duration;
  const phone=spec.height>spec.width,rendered=[];let totalFrames=0;
  for(const [index,scene] of scenes.entries()){
    assert.ok(scene.start>=0&&scene.end>scene.start&&scene.end<=T.duration&&scene.speed>=1&&scene.speed<=1.5);
    const frames=Math.round((scene.end-scene.start)/scene.speed*T.fps),caption=scene.caption||spec.chapters[scene.chapter],file=path.join(chunks,String(index).padStart(2,'0')+'.mp4');
    const title=phone?`,drawbox=x=(iw-840)/2:y=35:w=840:h=100:color=0x0038A8:t=fill,drawtext=fontfile='C\\:/Windows/Fonts/arialbd.ttf':text='E-JUAN / ${spec.title}':fontsize=42:fontcolor=white:x=(w-text_w)/2:y=60`:'';
    const captionFilter=phone?`,drawbox=x=48:y=ih-144:w=iw-96:h=100:color=0x0038A8:t=fill,drawtext=${font}:text='${caption}':fontsize=39:fontcolor=white:x=(w-text_w)/2:y=h-115`:` ,drawbox=x=128:y=ih-110:w=iw-256:h=90:color=0x0038A8:t=fill,drawtext=${font}:text='${caption}':fontsize=38:fontcolor=white:x=(w-text_w)/2:y=h-85`;
    const filter=`setpts=(PTS-STARTPTS)/${scene.speed},fps=60,tpad=stop_mode=clone:stop_duration=0.12,trim=end_frame=${frames},setpts=N/(60*TB),scale=iw:ih:out_color_matrix=bt709,setsar=1`+title+captionFilter.trimStart();
    await ffmpeg(['-ss',(lead+scene.start).toFixed(6),'-t',(scene.end-scene.start).toFixed(6),'-i',raw,'-vf',filter,'-frames:v',String(frames),'-an','-c:v','libx264','-preset','veryfast','-crf','18','-threads','3','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-color_range','tv','-bsf:v',metadata,file],kind+' cut '+index);
    const clipDuration=+probe(file).format.duration;assert.ok(Math.abs(clipDuration-frames/T.fps)<.04,'Clip duration must match edit');
    rendered.push({...scene,caption,file,startOut:totalFrames/T.fps,frames});totalFrames+=frames;
    await ffmpeg(['-ss',String(Math.min(.9,frames/T.fps/2)),'-i',file,'-frames:v','1',path.join(chunks,String(index).padStart(2,'0')+'.png')],kind+' frame');
    console.log('CUT',kind,index+1,caption,(frames/T.fps).toFixed(2)+'s');
  }
  const list=path.join(chunks,'concat.txt');await fs.writeFile(list,rendered.map(scene=>`file '${scene.file.replaceAll('\\','/')}'`).join('\n'));
  const name=spec.file.replace('.mp4','-Fast.mp4'),file=path.join(OUT,name);
  await ffmpeg(['-f','concat','-safe','0','-i',list,'-c','copy','-bsf:v',metadata,'-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-color_range','tv','-movflags','+faststart',file],kind+' assemble');
  await fs.writeFile(file.replace('.mp4','.srt'),rendered.map((scene,index)=>`${index+1}\n${stamp(scene.startOut)} --> ${stamp(scene.startOut+scene.frames/T.fps)}\n${scene.caption}\n`).join('\n'));
  await ffmpeg(['-ss','1','-i',file,'-frames:v','1',file.replace('.mp4','.png')],kind+' poster');
  const size=phone?'270:480':'640:360',tile=scenes.length===8?'4x2':'3x3';
  await ffmpeg(['-framerate','1','-i',path.join(chunks,'%02d.png'),'-vf',`scale=${size},tile=${tile}`,'-frames:v','1',path.join(OUT,'qa',kind+'-sheet.png')],kind+' sheet');
  await fs.writeFile(path.join(OUT,'qa',kind+'-edit.json'),JSON.stringify({kind,name,width:spec.width,height:spec.height,duration:totalFrames/T.fps,frames:totalFrames,scenes:rendered},null,2));
  console.log('FAST DEMO READY',name,(totalFrames/T.fps).toFixed(2)+'s');
}
(async()=>{for(const kind of process.argv.slice(2))await run(kind);})().catch(error=>{console.error(error);process.exitCode=1;});
