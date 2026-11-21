(function(){
var D=window.DESTS,$=function(s,r){return (r||document).querySelector(s)};
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function faqHtml(list){return list.map(function(q){return '<details><summary>'+esc(q[0])+'</summary><p>'+esc(q[1])+'</p></details>'}).join('')}

/* HOME */
$('#destcards').innerHTML=['chile','inglaterra','malta'].map(function(k){var d=D[k];
 return '<article class="dcard"><div class="ph"><img src="'+d.card+'" alt="" loading="lazy" style="object-position:'+(d.cardPos||'50% 50%')+'"><span class="badge">'+d.pill.charAt(0)+d.pill.slice(1).toLowerCase()+'</span></div><div class="b"><small>'+d.cont+'</small><h3>'+d.name+'</h3><p>'+d.sum+'</p><div class="q">'+d.quick.map(function(x){return '<div><span>'+x[0]+'</span><b>'+x[1]+'</b></div>'}).join('')+'</div><a class="btn go" href="#'+k+'">Conhecer o destino</a></div></article>'}).join('');
$('#difgrid').innerHTML=window.DIF.map(function(x,i){return '<div class="c">'+ico(x[0],x[3])+'<span class="big">0'+(i+1)+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p></div>'}).join('');
$('#homefaq').innerHTML=faqHtml(window.HOMEFAQ);
function galHtml(list){return list.map(function(p){return '<figure><img src="'+p[0]+'" alt="'+esc(p[1])+'" loading="lazy"><figcaption>'+p[1]+'</figcaption></figure>'}).join('')}
$('#galhome').innerHTML=galHtml(window.REAL);
$('#galcasa').innerHTML=galHtml(window.CASA);

/* MALTA PRECO */
var MES=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
function brl(v){return 'R$ '+v.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
function sched(price,y,m){var r=[];while(y<2028||(y===2028&&m<=6)){var n=(2028-y)*12+(6-m)+1,p=Math.floor(price*100/n)/100,last=Math.round((price-p*(n-1))*100)/100;r.push({y:y,m:m,n:n,p:p,last:last});m++;if(m>12){m=1;y++}}return r}
var PH={A:{price:12490.90,y:2026,m:11,count:2,tag:'Preço de lançamento',desc:'Condição válida para inscrições até dezembro de 2026. Valor por participante, com 2 semanas de programa em julho de 2028.'},
        B:{price:12990.90,y:2027,m:1,count:99,tag:'Investimento',desc:'Condição válida para inscrições a partir de janeiro de 2027. Valor por participante, com 2 semanas de programa em julho de 2028.'}};
function renderPrice(k){var c=PH[k],rows=sched(c.price,c.y,c.m).slice(0,c.count),f=rows[0];
 $('#ptag').textContent=c.tag;$('#pval').textContent=brl(c.price);$('#pdesc').textContent=c.desc;
 $('#imain').textContent=f.n+'× de '+brl(f.p)+(f.last!==f.p?'*':'');
 $('#inote').textContent=f.last!==f.p?('*'+(f.n-1)+' parcelas de '+brl(f.p)+' e a última de '+brl(f.last)+', para inscrições em '+MES[f.m-1].toLowerCase()+'/'+f.y+'.'):('Para inscrições em '+MES[f.m-1].toLowerCase()+'/'+f.y+'.');
 $('#tb').innerHTML=rows.map(function(r,i){return '<tr'+(i===0?' class="hl"':'')+'><td>'+MES[r.m-1]+'/'+r.y+'</td><td>'+r.n+'× '+brl(r.p)+'</td></tr>'}).join('');
 $('#bA').setAttribute('aria-pressed',k==='A');$('#bB').setAttribute('aria-pressed',k==='B')}

/* DESTINO */
function destPage(d){
 var h='';
 h+='<div class="dhero"><img class="bg" src="'+d.hero+'" alt="" style="object-position:'+d.heroPos+'"><div class="wrap"><h1>'+d.name+'</h1><span class="pill">'+d.pill+'</span><span class="pill o">'+d.dates+'</span><p class="l">'+d.phrase+'</p><div class="btns"><a class="btn" href="#formulario" data-form="'+d.form+'">Quero participar</a><a class="btn ghost" href="#incluido">Ver o que está incluído</a></div></div></div><div class="band"></div>';
 h+='<section><div class="wrap"><div class="eyebrow">Ficha do país</div><h2 class="t">'+d.name+' <em>em resumo</em>.</h2><div class="facts" style="margin-top:2rem">'+d.facts.map(function(f){return '<div class="f1"><div class="k">'+f[0]+'</div><div class="v">'+f[1]+'</div></div>'}).join('')+'</div><div class="alertbox"><b>'+d.aviso[0]+'</b> '+d.aviso[1]+'</div>';
 h+='<h3 style="margin-top:3rem;font-size:1.3rem;color:var(--navy)">O que você precisa saber antes de ir</h3><div class="sabergrid">'+d.saber.map(function(s,i){return '<div class="sb"><div class="n">0'+(i+1)+'</div><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>'}).join('')+'</div></div></section>';
 h+='<section class="bg-soft"><div class="wrap"><div class="eyebrow">O destino</div><h2 class="t">'+d.whyTitle+'.</h2><p class="lead">'+d.whyIntro+'</p><div class="why">'+d.why.map(function(w){return '<div class="w">'+ico(w[0])+'<div><h3>'+w[1]+'</h3><p>'+w[2]+'</p></div></div>'}).join('')+'</div>';
 if(d.photos&&d.photos.length&&d.key!=='chile')h+='<div class="photos">'+d.photos.map(function(p){return '<figure><img src="'+p[0]+'" alt="'+esc(p[1])+'" loading="lazy"><figcaption>'+p[1]+'</figcaption></figure>'}).join('')+'</div>';
 if(d.mapa)h+='<div class="two-img" style="margin-top:2.6rem"><div><h2 class="t">'+d.mapa.title+'</h2><p class="lead">'+d.mapa.text+'</p></div><div class="mapimg" style="border:0"><img src="'+d.mapa.img+'" alt="'+d.mapa.alt+'" loading="lazy"></div></div>';
 if(d.map)h+='<div class="two-img" style="margin-top:2.6rem"><div><div class="eyebrow">Onde fica</div><h2 class="t">Uma ilha no meio <em>do Mediterrâneo</em>.</h2><p class="lead">'+d.mapText+'</p></div><div class="mapimg"><img src="'+d.map+'" alt="Mapa de Malta entre a Sicília e a Tunísia, com Gozo e Valletta" loading="lazy"></div></div>';
 if(d.key==='chile')h+='<div class="gal">'+galHtml(window.REAL.slice(0,8))+'</div>';
 h+='</div></section>';
 var s=d.school;
 h+='<section class="navyband"><div class="wrap"><div class="eyebrow">'+s.eyebrow+'</div><h2 class="t">'+s.title+'</h2>';
 if(s.pano)h+='<div class="panorama" style="margin-top:2rem"><img src="'+s.pano+'" alt="" loading="lazy"></div>'+(s.panoCap?'<p class="small" style="color:var(--onNavy);margin:-1.2rem 0 2rem">'+s.panoCap+'</p>':'');
 h+='<div class="'+(s.photo?'schoolgrid':'')+'" style="margin-top:1.4rem">';
 if(s.photo)h+='<img class="ph" src="'+s.photo+'" alt="'+(s.photoAlt||'Certificado da escola')+'" loading="lazy">';
 h+='<div>'+(s.logo?'<div class="logobox"><img src="'+s.logo+'" alt="'+s.logoAlt+'"></div>':'')+'<p class="lead" style="margin-top:0">'+s.text+'</p>';
 if(s.stats)h+='<div class="stats">'+s.stats.map(function(x){return '<div class="s"><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join('')+'</div>';
 h+='</div></div>';
 if(s.blocks&&s.blocks.length)h+='<div class="infoblocks">'+s.blocks.map(function(b){return '<div class="ib"><h3>'+b[0]+'</h3><p>'+b[1]+'</p></div>'}).join('')+'</div>';
 h+='</div></section>';
 var c=d.cultura;
 h+='<section><div class="wrap"><div class="eyebrow">Cultura e passeios</div><h2 class="t">O que você vai viver <em>fora da sala de aula</em>.</h2><p class="lead">'+c.intro+'</p><div class="cult">'+c.cards.map(function(x){return '<div class="cc"><img src="'+x[2]+'" alt="" loading="lazy"><div><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div></div>'}).join('')+'</div><p class="also"><b style="color:var(--navy)">Também no roteiro.</b> '+c.also+'</p></div></section>';
 var p=d.proposito,f=d.fam;
 h+='<section class="bg-soft"><div class="wrap"><div class="eyebrow">O propósito</div><h2 class="t">'+p.title+'</h2>'+(p.intro?'<p class="lead">'+p.intro+'</p>':'')+'<div class="two-col">'+p.cards.map(function(x,i){return '<div class="pcard '+(i?'s':'n')+'"><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div>'}).join('')+'</div><div class="fam"><h3>'+f.title+'</h3><p>'+f.intro+'</p><div class="famlist">'+f.items.map(function(i){return '<div><b>'+i[0]+'</b> '+i[1]+'</div>'}).join('')+'</div></div></div></section>';
 h+='<section id="incluido"><div class="wrap"><div class="eyebrow">O pacote</div><h2 class="t">O que está <em>incluído</em>.</h2>';
 if(d.mods)h+='<div class="mods">'+d.mods.map(function(m){return '<div class="mod"><h3>'+m[0]+'<small>'+m[1]+'</small></h3><p>'+m[2]+'</p>'+(m[3]?'<div class="al">'+m[3]+'</div>':'')+'</div>'}).join('')+'</div>';
 h+='<div class="inc"><div class="col"><h3>Está incluído</h3><ul>'+d.inc.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div><div class="col no"><h3>Não está incluído</h3><ul>'+d.exc.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div></div><div class="alertbox"><b>Divisão de quartos.</b> '+d.quartos+'</div><div class="alertbox" style="margin-top:12px"><b>Vagas limitadas por grupo.</b> Datas exatas e roteiro completo são passados por um consultor.</div></div></section>';
 h+='<section class="bg-soft"><div class="wrap"><div class="eyebrow">Dúvidas frequentes</div><h2 class="t">As perguntas <em>mais frequentes</em>.</h2><div class="faq" style="margin-top:2rem">'+faqHtml(d.faq)+'</div></div></section>';
 h+='<section id="investimento"><div class="wrap"><div class="eyebrow">Investimento</div><h2 class="t">Quanto custa <em>e como pagar</em>.</h2>';
 if(d.invest==='proposta'){
  h+='<div class="invgrid"><div class="ib2 a"><small style="color:var(--yellow)">Individual</small><h3>Valores sob consulta</h3><p>Um consultor apresenta a proposta com valores e condições do seu perfil.</p><a class="btn" href="#formulario" data-form="'+d.form+'">Pedir proposta</a></div><div class="ib2 b"><small>Condição grupo</small><h3>Desconto por participante</h3><p>Na contratação conjunta de três ou mais intercambistas, cada participante tem desconto.</p><a class="btn" href="#formulario" data-form="'+d.form+'">Pedir proposta</a></div></div>';
  h+='<table class="cond"><thead><tr><th>Condição</th><th>Como funciona</th></tr></thead><tbody>'+d.cond.map(function(x){return '<tr><td>'+x[0]+'</td><td>'+x[1]+'</td></tr>'}).join('')+'</tbody></table>';
 }else if(d.invest==='preco'){
  var pr=d.price,sc=pr.sched;
  h+='<div class="invgrid"><div class="ib2 a"><small style="color:var(--yellow)">'+pr.mainLabel+'</small><h3>'+pr.main+'</h3><p>'+pr.mainNote+'</p><a class="btn" href="#formulario" data-form="'+d.form+'">Quero garantir minha vaga</a></div>'+(pr.group?'<div class="ib2 b"><small>'+pr.groupLabel+'</small><h3>'+pr.group+'</h3><p>'+pr.groupNote+'</p><a class="btn" href="#formulario" data-form="'+d.form+'">Falar com um consultor</a></div>':'')+'</div>';
  h+='<p class="lead" style="margin-top:1.4rem"><b style="color:var(--navy)">Como pagar.</b> '+pr.pay+'</p>';
  var rows=[],y=sc.start[0],m=sc.start[1];
  var now=new Date();if(now.getFullYear()*12+now.getMonth()>y*12+(m-1)){y=now.getFullYear();m=now.getMonth()+1}
  while(rows.length<14){var n=(sc.end[0]-y)*12+(sc.end[1]-m)+1;if(n<1)break;var nn=Math.min(n,sc.cap||99);var p=Math.floor(sc.total*100/nn)/100;rows.push([MES[m-1]+'/'+y,nn+'× '+brl(p)]);m++;if(m>12){m=1;y++}}
  h+='<div class="tablewrap" style="margin-top:1.2rem;max-width:560px"><table><thead><tr><th>Mês da inscrição</th><th>'+(d.key==='chile'?'Parcelas (individual)':'Parcelas (Home Experience)')+'</th></tr></thead><tbody>'+rows.map(function(r,i){return '<tr'+(i===0?' class="hl"':'')+'><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>'}).join('')+'</tbody></table></div><p class="small">Centavos de diferença são ajustados na última parcela. A última parcela vence antes do embarque.</p>';
  h+='<table class="cond"><thead><tr><th>Condição</th><th>Como funciona</th></tr></thead><tbody>'+d.cond.map(function(x){return '<tr><td>'+x[0]+'</td><td>'+x[1]+'</td></tr>'}).join('')+'</tbody></table>';
 }else{
  h+='<p class="lead">O valor depende do mês da inscrição. Escolha a fase para ver o preço e a tabela de parcelas.</p><div class="seg" role="group" aria-label="Fase de preço"><button id="bA" type="button" aria-pressed="false">Lançamento, até dez/2026</button><button id="bB" type="button" aria-pressed="false">A partir de jan/2027</button></div><div class="price"><div class="pbox"><span class="tag" id="ptag"></span><div class="val" id="pval"></div><p id="pdesc"></p><div class="inst">Parcele em até<b id="imain"></b><span id="inote"></span></div></div><div><div class="tablewrap"><table><thead><tr><th>Mês da inscrição</th><th>Parcelas</th></tr></thead><tbody id="tb"></tbody></table></div><p class="small">A última parcela vence em junho de 2028, antes do embarque. Centavos de diferença são ajustados na última parcela.</p></div></div><div style="margin-top:1.6rem"><a class="btn" href="#formulario" data-form="'+d.form+'">Quero garantir minha vaga</a></div>';
 }
 if(d.vagas)h+='<div class="vagas"><div class="n">'+d.vagas+'</div><p><b>vagas para esta temporada.</b> O grupo é fechado assim que as vagas são preenchidas, e a reserva só é garantida com contrato assinado e entrada paga.</p></div>';
 h+='<div class="alertbox"><b>Processo seletivo.</b> '+d.proc.replace('Antes da matrícula, ','Antes da matrícula, ')+'</div><h3 style="margin:2.4rem 0 1.4rem;font-size:1.2rem;color:var(--navy)">Como garantir sua vaga</h3><div class="steps"><div class="st"><i>1</i>Conversa com um consultor</div><div class="st"><i>2</i>Entrevista de seleção</div><div class="st"><i>3</i>Contrato e entrada</div><div class="st"><i>4</i>Documentação</div><div class="st"><i>5</i>Encontros preparatórios</div><div class="st"><i>6</i>Embarque</div></div></div></section>';
 return h;
}

/* ROUTER */
var cur=null,started=false;
function show(route,anchor){
 var home=$('#p-home'),dest=$('#p-dest');
 if(D[route]){
  if(cur!==route){dest.innerHTML=destPage(D[route]);cur=route;
   if(route==='malta'){$('#bA').onclick=function(){renderPrice('A')};$('#bB').onclick=function(){renderPrice('B')};renderPrice(new Date().getFullYear()<2027?'A':'B')}}
  home.classList.remove('on');dest.classList.add('on');
  document.title=D[route].name+' | Jinas International Experience';
  $('#f-dest').value=D[route].form;
  if(!anchor)window.scrollTo(0,0);
 }else{
  dest.classList.remove('on');home.classList.add('on');cur=null;
  document.title='Jinas International Experience';
  if(!anchor)window.scrollTo(0,0);
 }
}
function route(){
 var h=decodeURIComponent((location.hash||'#home').slice(1))||'home';
 closeNav();
 if(h==='home'){show('home');return}
 if(D[h]){show(h);return}
 /* âncora: dentro da home, dentro da página atual ou global (formulário) */
 var el=document.getElementById(h);
 if(!el){show('home');return}
 var inDest=$('#p-dest').contains(el),isGlobal=!$('#p-home').contains(el)&&!inDest;
 if(inDest){/* já visível */}
 else if(!isGlobal){show('home',true)}
 setTimeout(function(){var e=document.getElementById(h);if(e)e.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})},30);
}
window.addEventListener('hashchange',route);
document.addEventListener('click',function(e){var a=e.target.closest('a[data-form]');if(a)$('#f-dest').value=a.getAttribute('data-form')});
route();

/* NAV */
function closeNav(){$('#nav').classList.remove('open');$('#burger').setAttribute('aria-expanded','false')}
$('#burger').onclick=function(){var o=$('#nav').classList.toggle('open');this.setAttribute('aria-expanded',o)};

/* FORM */
var f={nome:$('#f-nome'),wpp:$('#f-wpp'),mail:$('#f-mail'),cid:$('#f-cid'),idade:$('#f-idade'),dest:$('#f-dest'),resp:$('#f-resp')};
$('#f-wpp').addEventListener('input',function(){var v=this.value.replace(/\D/g,'').slice(0,11),o=v;if(v.length>2)o='('+v.slice(0,2)+') '+v.slice(2);if(v.length>7)o='('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7);this.value=o});
function checkResp(){var i=parseInt(f.idade.value,10),mn=!isNaN(i)&&i<18,box=$('#resp');box.hidden=!mn;f.resp.required=mn}
f.idade.addEventListener('input',checkResp);
function mark(el,ok){var p=el.closest('.fld');if(p)p.classList.toggle('bad',!ok);return ok}
function radioVal(n){var r=document.querySelector('input[name='+n+']:checked');return r?r.value:''}
$('#form').addEventListener('submit',function(ev){ev.preventDefault();checkResp();
 var ok=true;
 ok=mark(f.nome,f.nome.value.trim().length>2)&&ok;
 ok=mark(f.wpp,f.wpp.value.replace(/\D/g,'').length>=10)&&ok;
 ok=mark(f.mail,/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.mail.value))&&ok;
 ok=mark(f.cid,f.cid.value.trim().length>2)&&ok;
 ok=mark(f.idade,f.idade.value!=='')&&ok;
 ok=mark(f.dest,f.dest.value!=='')&&ok;
 var al=radioVal('aluno'),qm=radioVal('quem');
 ok=mark(document.getElementsByName('aluno')[0],al!=='')&&ok;
 ok=mark(document.getElementsByName('quem')[0],qm!=='')&&ok;
 if(!$('#resp').hidden)ok=mark(f.resp,f.resp.value.trim().length>2)&&ok;
 var c=$('#f-ok').checked;$('#e-ok').style.display=c?'none':'block';ok=ok&&c;
 if(!ok){var b=$('#form .bad');if(b)b.scrollIntoView({block:'center'});return}
 var m='Olá! Tenho interesse na Jinas International Experience.\n\nNome: '+f.nome.value.trim()+'\nWhatsApp: '+f.wpp.value+'\nE-mail: '+f.mail.value.trim()+'\nCidade e estado: '+f.cid.value.trim()+'\nDestino de interesse: '+f.dest.value+'\nIdade do participante: '+f.idade.value+'\nAluno da Jinas School: '+al+'\nQuem está preenchendo: '+qm;
 if(!$('#resp').hidden)m+='\nResponsável: '+f.resp.value.trim();
 if($('#f-como').value)m+='\nComo conheceu a Jinas: '+$('#f-como').value;
 if($('#f-msg').value.trim())m+='\nMensagem: '+$('#f-msg').value.trim();
 $('#msgtxt').value=m;var url='https://wa.me/5513997915105?text='+encodeURIComponent(m);
 var wl=$('#wlink');wl.href=url;wl.target='_blank';wl.rel='noopener';
 $('#result').classList.add('on');$('#result').scrollIntoView({block:'center'});
 try{wl.click()}catch(e){}
});
$('#copybtn').onclick=function(){var t=$('#msgtxt');t.select();var b=this;try{navigator.clipboard.writeText(t.value).then(function(){b.textContent='Copiado'},function(){document.execCommand&&document.execCommand('copy');b.textContent='Copiado'})}catch(e){try{document.execCommand('copy');b.textContent='Copiado'}catch(_){}}};
})();
