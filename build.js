import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
await mkdir('dist/arashi',{recursive:true});
for(const p of ['index.html','.nojekyll','arashi/index.html','arashi/style.css','arashi/app.js','arashi/engine.js'])await copyFile(p,'dist/'+p);
const [html,css,engine,app]=await Promise.all(['arashi/index.html','arashi/style.css','arashi/engine.js','arashi/app.js'].map(p=>readFile(p,'utf8')));
const combined=engine.replace(/^export /gm,'')+'\n'+app.replace(/^import .*?;\n/,'');
const standalone=html.replace('<link rel="stylesheet" href="./style.css">','<style>'+css+'</style>').replace('<script type="module" src="./app.js"></script>','<script type="module">\n'+combined+'\n</script>').replace('href="../" aria-label="返回Y.29企划入口"','href="https://github.com/fivsevn/y29" aria-label="查看Y.29仓库"');
await writeFile('dist/arashi-preview.html',standalone);
console.log('Built static site and standalone preview. No external dependencies.');
