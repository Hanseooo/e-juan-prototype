const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),{spawn,execFileSync}=require('node:child_process');
const P=__dirname,T=require('./timeline.json'),tools=require('../e-juan-product-demo/scripts/tools.json');
const probe=file=>JSON.parse(execFileSync(tools.ffprobe,['-v','error','-show_streams','-show_format','-of','json',file],{windowsHide:true,maxBuffer:8e6}).toString());
const stamp=seconds=>{const ms=Math.round(seconds*1000);return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')},${String(ms%1000).padStart(3,'0')}`;};
function phoneText(spec){
  if(spec.height<=spec.width)return '';
  const title=`,drawbox=x=(iw-840)/2:y=35:w=840:h=100:color=0x0038A8:t=fill,drawtext=fontfile='C\\:/Windows/Fonts/arialbd.ttf':text='E-JUAN / ${spec.title}':fontsize=42:fontcolor=white:x=(w-text_w)/2:y=60`;
  const band=',drawbox=x=48:y=ih-144:w=iw-96:h=100:color=0x0038A8:t=fill';
  return title+band+spec.chapters.map((text,index)=>`,drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='${text}':fontsize=39:fontcolor=white:x=(w-text_w)/2:y=h-115:enable='gte(t,${index*T.chapterSeconds})*lt(t,${(index+1)*T.chapterSeconds})'`).join('');
}
async function ffmpeg(args,label){
  await new Promise((resolve,reject)=>{let error='',last=-1;const process=spawn(tools.ffmpeg,['-hide_banner','-loglevel','error','-y',...args],{windowsHide:true});
    process.stderr.on('data',data=>error+=data);process.stdout.on('data',data=>{const match=data.toString().match(/out_time_us=(\d+)/);if(match){const sec=Math.floor(+match[1]/1e7)*10;if(sec>last){console.log(label,sec+'s');last=sec;}}});
    process.on('error',reject);process.on('exit',code=>code===0?resolve():reject(new Error(label+': '+error)));
  });
}
module.exports={probe,ffmpeg,phoneText};
if(require.main===module)(async()=>{
  const manifest=[];await fs.mkdir(path.join(P,'out','qa'),{recursive:true});
  for(const [kind,spec] of Object.entries(T.clients)){
    const capture=JSON.parse(await fs.readFile(path.join(P,'source',kind,'capture.json'),'utf8'));
    const raw=(await fs.readFile(path.join(P,'source',kind,'video-path.txt'),'utf8')).trim(),source=probe(raw),duration=+source.format.duration;
    assert.ok(duration>=T.duration,'Recording must contain 72 actual seconds');assert.ok(capture.elapsed>=T.duration-.05);
    const lead=duration-T.duration,file=path.join(P,'out',spec.file);
    const title=phoneText(spec);
    console.log('ENCODING',kind,'trim lead',lead.toFixed(3));
    await ffmpeg(['-ss',lead.toFixed(6),'-i',raw,'-t',String(T.duration),'-vf','fps=60,scale=iw:ih:out_color_matrix=bt709,setsar=1'+title,'-an','-c:v','libx264','-preset','fast','-crf','19','-threads','4','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-color_range','tv','-bsf:v','h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0','-movflags','+faststart','-progress','pipe:1',file],kind);
    const srt=spec.chapters.map((text,i)=>`${i+1}\n${stamp(i*T.chapterSeconds)} --> ${stamp((i+1)*T.chapterSeconds)}\n${text}\n`).join('\n');
    await fs.writeFile(file.replace(/\.mp4$/,'.srt'),srt);
    await ffmpeg(['-ss','5','-i',file,'-frames:v','1',file.replace(/\.mp4$/,'.png')],kind+' poster');
    const scale=spec.height>spec.width?'270:480':'640:360';
    await ffmpeg(['-i',file,'-vf',`fps=1/8,scale=${scale},tile=3x3`,'-frames:v','1',path.join(P,'out','qa',`${kind}-contact-sheet.png`)],kind+' contact');
    manifest.push({kind,file:spec.file,source:path.relative(P,raw),sourceFps:source.streams.find(stream=>stream.codec_type==='video').avg_frame_rate,trimLead:lead,seconds:T.duration,width:spec.width,height:spec.height,sourceHashes:capture.sourceHashes});
    await fs.writeFile(path.join(P,'out','qa','manifest.json'),JSON.stringify(manifest,null,2));console.log('EXPORTED',spec.file);
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
