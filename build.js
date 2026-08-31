import {mkdir,readFile,writeFile,copyFile,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
for(const dir of ['signallock','mobileutopia'])await mkdir('dist/'+dir,{recursive:true});
for(const p of ['index.html','.nojekyll','signallock/index.html','signallock/style.css','signallock/app.js','signallock/engine.js','mobileutopia/index.html','mobileutopia/style.css','mobileutopia/engine.js','mobileutopia/app.js'])await copyFile(p,'dist/'+p);
const [html,css,engine,app]=await Promise.all(['signallock/index.html','signallock/style.css','signallock/engine.js','signallock/app.js'].map(p=>readFile(p,'utf8')));
const combined=engine.replace(/^export /gm,'')+'\n'+app.replace(/^import .*?;\n/,'');
const standalone=html.replace(/<link rel="stylesheet" href="\.\/style\.css(?:\?[^"]*)?">/,'<style>'+css+'</style>').replace(/<script type="module" src="\.\/app\.js(?:\?[^"]*)?"><\/script>/,'<script type="module">\n'+combined+'\n</script>').replace('href="../" aria-label="返回Y.29企划入口"','href="https://github.com/fivsevn/y29" aria-label="查看Y.29仓库"');
await writeFile('dist/signallock-preview.html',standalone);
console.log('Built static site and standalone preview. No external dependencies.');
