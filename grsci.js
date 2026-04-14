(function(){
if(document.getElementById('grsci-div0'))return;
var items=[],nextId=1,shown=true,originalTitle=document.title,dragSrcId=null;

var style=document.createElement('style');
style.textContent='@import url(https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap);'
+'.grsci-panel{position:fixed;z-index:10000;font-family:Roboto Mono,monospace;background:rgba(0,129,178,1);color:#fff;border-radius:6px;padding:10px;margin:10px;box-shadow:0 2px 8px rgba(0,0,0,.25);transition:.4s;overflow:hidden;}'
+'#grsci-div0{top:40px;width:270px;right:0;}'
+'#grsci-div1{top:40px;width:270px;left:0;max-height:70vh;overflow-y:auto;scrollbar-width:none;}'
+'#grsci-div1::-webkit-scrollbar{display:none;}'
+'.grsci-bar{position:fixed;z-index:10000;bottom:0;font-family:Roboto Mono,monospace;background:rgba(0,129,178,1);color:#fff;border-radius:6px 6px 0 0;padding:6px 10px;cursor:pointer;user-select:none;font-size:13px;transition:.4s;box-shadow:0 -2px 6px rgba(0,0,0,.15);}'
+'#grsci-btn-hide{right:0;}'
+'#grsci-btn-reset{right:70px;background:#c72c48;}'
+'#grsci-btn-count{left:0;cursor:default;}'
+'#grsci-btn-export{right:140px;background:#1a7a4a;}'
+'.grsci-bar:hover{filter:brightness(1.15);}'
+'#grsci-div0 h3{margin:0 0 6px;font-size:15px;}'
+'#grsci-div0 hr{border:none;border-top:.5px solid rgba(255,255,255,.4);margin:6px 0;}'
+'.grsci-query{font-size:12px;word-break:break-all;line-height:1.6;}'
+'.grsci-actions{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;}'
+'.grsci-actions button{flex:1;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:4px;padding:4px 6px;cursor:pointer;font-family:Roboto Mono,monospace;font-size:11px;transition:.2s;}'
+'.grsci-actions button:hover{background:rgba(255,255,255,.3);}'
+'#grsci-copy-toast{position:fixed;bottom:60px;left:50%;transform:translateX(-50%);background:#1a7a4a;color:#fff;padding:8px 18px;border-radius:20px;font-family:Roboto Mono,monospace;font-size:13px;z-index:20000;opacity:0;transition:opacity .3s;pointer-events:none;}'
+'.grsci-item{display:flex;align-items:center;gap:6px;padding:4px 2px;border-bottom:.5px solid rgba(255,255,255,.15);font-size:12px;cursor:grab;transition:background .2s;border-radius:3px;}'
+'.grsci-item:last-child{border-bottom:none;}'
+'.grsci-item:hover{background:rgba(255,255,255,.12);}'
+'.grsci-item.dragging{opacity:.4;}'
+'.grsci-item.drag-over{background:rgba(255,255,255,.3);}'
+'.grsci-handle{cursor:grab;opacity:.5;flex-shrink:0;}'
+'.grsci-label{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
+'.grsci-remove{flex-shrink:0;cursor:pointer;opacity:.6;font-size:14px;line-height:1;padding:0 2px;transition:opacity .2s;}'
+'.grsci-remove:hover{opacity:1;color:#ffaaaa;}'
+'.grsci-empty{font-size:12px;opacity:.7;font-style:italic;padding:4px 0;}'
+'.grsci-token{transition:background .2s;border-radius:2px;padding:0 1px;cursor:pointer;}'
+'.grsci-token:hover{background:rgba(255,255,255,.4);}'
+'.grsci-hidden-right{right:-320px!important;}'
+'.grsci-hidden-left{left:-320px!important;}';
document.head.appendChild(style);

function mk(tag,props){
  var e=document.createElement(tag);
  for(var k in props){
    if(k==='text')e.textContent=props[k];
    else if(k==='html')e.innerHTML=props[k];
    else e.setAttribute(k,props[k]);
  }
  return e;
}
function qs(s){return document.querySelector(s);}
function ap(p,c){p.appendChild(c);return c;}

var div0=mk('div',{id:'grsci-div0','class':'grsci-panel'});
ap(div0,mk('h3',{html:'\uD83D\uDC49 GRSCI\u2122 v8'}));
var sm=mk('small');
sm.appendChild(document.createTextNode('G\u00e9n\u00e9rateur de Requ\u00eate de S\u00e9lection sur '));
var acat=mk('a',{href:'https://www.mediatheque-rueilmalmaison.fr/',target:'_blank',style:'color:white'});
ap(acat,mk('u',{text:'Catalogue InMedia'}));
ap(sm,acat);
ap(div0,sm);
ap(div0,mk('hr'));
var info=mk('div',{style:'font-size:12px;margin-bottom:6px;'});
info.appendChild(document.createTextNode('Survolez les titres pour g\u00e9n\u00e9rer la requ\u00eate. Ne fonctionne pas avec les ressources en ligne.'));
ap(info,mk('br'));
ap(info,mk('br'));
var ahelp=mk('a',{href:'http://leblog92.github.io/grsci/recherche.html',target:'_blank',style:'color:white;text-decoration:none'});
ahelp.appendChild(document.createTextNode('\uD83D\uDC49 Aide '));
ap(ahelp,mk('u',{text:'op\u00e9rateurs de recherche'}));
ap(info,ahelp);
ap(div0,info);
ap(div0,mk('hr'));
var qDiv=ap(div0,mk('div',{id:'grsci-query-text','class':'grsci-query'}));
var actDiv=ap(div0,mk('div',{'class':'grsci-actions'}));
var btnCopy=ap(actDiv,mk('button',{id:'grsci-btn-copy',text:'\uD83D\uDCCB Copier'}));

var div1=mk('div',{id:'grsci-div1','class':'grsci-panel'});
ap(div1,mk('div',{style:'font-weight:bold;margin-bottom:6px;font-size:13px;',html:'\uD83D\uDCDA Titres s\u00e9lectionn\u00e9s'}));
var listDiv=ap(div1,mk('div',{id:'grsci-list'}));

var btnHide  =mk('div',{id:'grsci-btn-hide',  'class':'grsci-bar',text:'Hide'});
var btnReset =mk('div',{id:'grsci-btn-reset', 'class':'grsci-bar',text:'Reset'});
var btnCount =mk('div',{id:'grsci-btn-count', 'class':'grsci-bar',text:'0 document'});
var btnExport=mk('div',{id:'grsci-btn-export','class':'grsci-bar',text:'\uD83D\uDCBE Export .txt'});
var toast    =mk('div',{id:'grsci-copy-toast',text:'\u2713 Requ\u00eate copi\u00e9e !'});

[div0,div1,btnHide,btnReset,btnCount,btnExport,toast].forEach(function(e){document.body.appendChild(e);});

function getQuery(){
  return items.map(function(it,i){return(i===0?'':' OR ')+'LocalNumber:'+it.localNumber;}).join('');
}
function updateTitle(){
  document.title=items.length>0?'['+items.length+' doc'+(items.length>1?'s':'')+'] '+originalTitle:originalTitle;
}

function render(){
  var n=items.length;
  btnCount.textContent=n+' document'+(n>1?'s':'');
  updateTitle();

  while(qDiv.firstChild)qDiv.removeChild(qDiv.firstChild);
  if(n===0){
    ap(qDiv,mk('em',{style:'opacity:.6',text:'Aucun document s\u00e9lectionn\u00e9.'}));
  } else {
    for(var i=0;i<items.length;i++){
      if(i>0) ap(qDiv,mk('span',{style:'opacity:.6',text:' OR '}));
      ap(qDiv,mk('span',{'class':'grsci-token','data-id':items[i].id,text:'LocalNumber:'+items[i].localNumber}));
    }
  }

  while(listDiv.firstChild)listDiv.removeChild(listDiv.firstChild);
  if(n===0){
    ap(listDiv,mk('div',{'class':'grsci-empty',text:'Survolez un titre sur le catalogue\u2026'}));
  } else {
    for(var j=0;j<items.length;j++){
      var it=items[j];
      var row=mk('div',{'class':'grsci-item','data-id':it.id});
      row.draggable=true;
      ap(row,mk('span',{'class':'grsci-handle',title:'D\u00e9placer',text:'\u2807'}));
      ap(row,mk('span',{'class':'grsci-label',title:it.title,text:it.title}));
      ap(row,mk('span',{'class':'grsci-remove',title:'Supprimer','data-id':it.id,text:'\u00d7'}));
      ap(listDiv,row);
    }
    setupDrag();
  }

  btnReset.style.display=n>0?'':'none';
  btnExport.style.display=n>0?'':'none';
}

function setupDrag(){
  var rows=document.querySelectorAll('.grsci-item');
  rows.forEach(function(row){
    row.addEventListener('dragstart',function(e){
      dragSrcId=parseInt(this.getAttribute('data-id'));
      this.classList.add('dragging');
      e.dataTransfer.effectAllowed='move';
    });
    row.addEventListener('dragend',function(){
      this.classList.remove('dragging');
      document.querySelectorAll('.grsci-item').forEach(function(r){r.classList.remove('drag-over');});
    });
    row.addEventListener('dragover',function(e){
      e.preventDefault();
      document.querySelectorAll('.grsci-item').forEach(function(r){r.classList.remove('drag-over');});
      this.classList.add('drag-over');
      e.dataTransfer.dropEffect='move';
    });
    row.addEventListener('drop',function(e){
      e.preventDefault();
      var targetId=parseInt(this.getAttribute('data-id'));
      if(dragSrcId===targetId)return;
      var si=-1,ti=-1;
      for(var k=0;k<items.length;k++){
        if(items[k].id===dragSrcId)si=k;
        if(items[k].id===targetId)ti=k;
      }
      var moved=items.splice(si,1)[0];
      items.splice(ti,0,moved);
      render();
    });
  });
}

document.addEventListener('click',function(e){
  var rm=e.target.closest?e.target.closest('.grsci-remove'):null;
  if(!rm&&e.target.className==='grsci-remove')rm=e.target;
  if(rm){
    var id=parseInt(rm.getAttribute('data-id'));
    items=items.filter(function(i){return i.id!==id;});
    render();return;
  }
  var tok=e.target.closest?e.target.closest('.grsci-token'):null;
  if(!tok&&e.target.className==='grsci-token')tok=e.target;
  if(tok&&tok.closest&&tok.closest('#grsci-query-text')){
    var id2=parseInt(tok.getAttribute('data-id'));
    items=items.filter(function(i){return i.id!==id2;});
    render();
  }
});

btnCopy.addEventListener('click',function(){
  if(!items.length)return;
  navigator.clipboard.writeText(getQuery()).then(function(){
    toast.style.opacity='1';
    setTimeout(function(){toast.style.opacity='0';},2000);
  });
});

btnExport.addEventListener('click',function(){
  if(!items.length)return;
  var lines=['GRSCI\u2122 v8 \u2014 Export s\u00e9lection','========================================',''];
  for(var i=0;i<items.length;i++){
    lines.push((i+1)+'. '+items[i].title);
    lines.push('   LocalNumber:'+items[i].localNumber);
    lines.push('');
  }
  lines.push('----------------------------------------');
  lines.push('Requ\u00eate compl\u00e8te :');
  lines.push(getQuery());
  var blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='grsci-selection.txt';
  a.click();
});

btnReset.addEventListener('click',function(){
  items=[];nextId=1;
  while(qDiv.firstChild)qDiv.removeChild(qDiv.firstChild);
  while(listDiv.firstChild)listDiv.removeChild(listDiv.firstChild);
  var img0=document.createElement('img');
  img0.src='https://leblog92.github.io/grsci/smith.gif';
  img0.style.cssText='border-radius:4px;width:100%';
  qDiv.appendChild(img0);
  var img1=document.createElement('img');
  img1.src='https://leblog92.github.io/grsci/jedi.gif';
  img1.style.cssText='border-radius:4px;width:100%';
  listDiv.appendChild(img1);
  setTimeout(function(){render();},1920);
});

btnHide.addEventListener('click',function(){
  shown=!shown;
  div0.classList.toggle('grsci-hidden-right',!shown);
  div1.classList.toggle('grsci-hidden-left',!shown);
  btnHide.textContent=shown?'Hide':'Show';
  btnHide.style.opacity=shown?'1':'0.5';
  if(!shown){btnReset.style.display='none';btnExport.style.display='none';}
  else render();
});

var origin=window.location.origin;
document.addEventListener('mouseenter',function(e){
  if(!shown)return;
  var a=e.target.closest?e.target.closest('a'):(e.target.tagName==='A'?e.target:null);
  if(!a)return;
  var href=a.getAttribute('href')||'';
  var title=a.getAttribute('title')||'';
  if(href.indexOf('/notice?id=p%3A%3Ausmarcdef_')===-1)return;
  var localNum=href;
  if(origin==='https://www.mediatheque-rueilmalmaison.fr'){
    localNum=localNum.slice(28);
  } else {
    localNum=localNum.slice(69);
  }
  localNum=localNum.substring(0,10);
  title=title.substring(0,40);
  for(var k=0;k<items.length;k++){if(items[k].localNumber===localNum)return;}
  items.push({id:nextId++,localNumber:localNum,title:title});
  render();
},true);

render();
btnReset.style.display='none';
btnExport.style.display='none';
})();