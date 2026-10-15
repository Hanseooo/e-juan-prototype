const fs=require('node:fs/promises'),path=require('node:path'),{probe,ffmpeg,phoneText}=require('./export.cjs'),T=require('./timeline.json'),P=__dirname;
(async()=>{
  for(const kind of ['citizen','sms']){
    const spec=T.clients[kind],raw=(await fs.readFile(path.join(P,'source',kind,'video-path.txt'),'utf8')).trim(),lead=+probe(raw).format.duration-T.duration,file=path.join(P,'out',spec.file);
    await ffmpeg(['-ss',lead.toFixed(6),'-i',raw,'-t',String(T.duration),'-vf','fps=60,scale=iw:ih:out_color_matrix=bt709,setsar=1'+phoneText(spec),'-an','-c:v','libx264','-preset','veryfast','-crf','18','-threads','4','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-color_range','tv','-movflags','+faststart','-progress','pipe:1',file],kind+' caption finish');
    await ffmpeg(['-ss','5','-i',file,'-frames:v','1',file.replace(/\.mp4$/,'.png')],kind+' poster');
    await ffmpeg(['-i',file,'-vf','fps=1/8,scale=270:480,tile=3x3','-frames:v','1',path.join(P,'out','qa',`${kind}-contact-sheet.png`)],kind+' contact');
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
