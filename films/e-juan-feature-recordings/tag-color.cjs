const fs=require('node:fs/promises'),path=require('node:path'),{ffmpeg}=require('./export.cjs'),T=require('./timeline.json'),P=__dirname;
(async()=>{
  for(const [kind,spec] of Object.entries(T.clients)){
    const file=path.join(P,'out',spec.file),temporary=path.join(P,'out','qa',kind+'-tagged.mp4');
    await ffmpeg(['-i',file,'-map','0','-c','copy','-bsf:v','h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-color_range','tv','-movflags','+faststart',temporary],kind+' color metadata');
    await fs.rename(temporary,file);console.log('COLOR TAGS VERIFIED IN BITSTREAM',kind);
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
