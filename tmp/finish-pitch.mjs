import fs from 'node:fs/promises';
import vm from 'node:vm';
let html = await fs.readFile('pitch/index.html','utf8');
html = html.replace(/(<h[12] id="title-\d+">)([\s\S]*?)(<\/h[12]>)/g, (_, open, title, close) => open + title.replace(/\.(<\/em>)?$/, '$1') + close);
await fs.writeFile('pitch/index.html', html);
const context = {window:{}};
vm.runInNewContext(await fs.readFile('pitch/notes.js','utf8'), context);
for (const note of context.window.PITCH_NOTES) note.title = note.title.replace(/\.$/, '');
await fs.writeFile('pitch/notes.js', 'window.PITCH_NOTES = ' + JSON.stringify(context.window.PITCH_NOTES,null,2) + ';\n');
let notes = await fs.readFile('pitch/SPEAKER_NOTES.md', 'utf8');
notes = notes.replace(/^(## Slide \d+ - .*)\.$/gm, '$1');
await fs.writeFile('pitch/SPEAKER_NOTES.md',notes);
for (const name of await fs.readdir('pitch/qa')) {
  if (/^2466-slide-\d+\.png$/.test(name)) await fs.unlink(`pitch/qa/${name}`);
}
