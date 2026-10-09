/*! Esclerobot v0.0.1 — © 2026 Matheus Mendes. Todos os direitos reservados.
 *  Software proprietário: é proibido modificar, copiar, redistribuir ou fazer engenharia reversa. */
/*ESCLEROBOT_V=56*/
/*ESCLEROBOT_ROTULO=0.0.1*/
/*NOTAS*/[{"v": 56, "rotulo": "0.0.1", "data": "2026-10-09", "titulo": "Primeira versão", "itens": ["Até 4 contas do PokéIdle numa janela só, cada uma com o próprio login, lado a lado, 2 × 2 ou com uma principal.", "Bot por conta: venda automática de pokémon fracos (nunca vende shiny, P4, P5, refinados, equipe nem Coleção), suprimentos e loot, Auto-Passe diário.", "Analisador de Pokémon e Comparar progresso direto no painel ⚙ Esclerobot.", "📺 Twitch/Kick: abre sozinho as lives oficiais com bônus de XP e fecha quando acabam. Bolinha roxa = Twitch, verde = Kick. Modo leve opcional (só o chat).", "⟳ Todas: recarrega as telas de todas as contas de uma vez.", "📊 Central: gráfico de PR, ranking das contas, cores e apelidos, novidades.", "Atualizações sem reinstalar: o app avisa quando há bot, interface ou app novo e você confirma.", "Saída segura: antes de fechar, recarregar ou atualizar, oferece levar as contas ao Centro Pokémon para não perder XP."]}]/*FIM_NOTAS*/;
(function esclerobotBoot(){
  if(!document.body){return void setTimeout(esclerobotBoot,200);}
  (()=>{
// Esclerobot — roda dentro de cada conta do app Esclerobot. Botão ao lado da Wiki + janela com ATIVADO/DESATIVADO
const V=56;
const INICIO=Date.now()+'-'+Math.random().toString(36).slice(2,7); // identifica esta instância do bot (o app não repete avisos)
if(window.__pokebot&&window.__pokebot.v>=V)return;
try{window.__pokebot&&window.__pokebot.parar();}catch(e){}
const CHAVE='pokebotV1';let C={ativo:false,jx:null,jy:null};
try{Object.assign(C,JSON.parse(localStorage.getItem(CHAVE)||'{}'));}catch(e){}
let vivo=true;
// autoria e licença (preenchidas pelo build.py a partir de autoria.json e LICENSE.txt)
const AUTORIA={"autor": "Matheus Mendes", "ano": "2026", "produto": "Esclerobot"};
const LICENCA="Esclerobot — LICENÇA DE USO (SOFTWARE PROPRIETÁRIO)\nCopyright © 2026 Matheus Mendes. Todos os direitos reservados.\n\n1. TITULARIDADE\nO Esclerobot (código-fonte, código distribuído, interface, textos, métodos de análise e de avaliação, documentação e marcas) é obra protegida pela Lei nº 9.610/1998 (Direitos Autorais) e pela Lei nº 9.609/1998 (Programas de Computador). Todos os direitos pertencem a Matheus Mendes.\n\n2. O QUE ESTA LICENÇA PERMITE\nVocê recebe uma licença pessoal, gratuita ou paga conforme a forma de distribuição, não exclusiva, intransferível e revogável para instalar e usar o Esclerobot no seu próprio computador, para uso pessoal, na forma exata em que ele foi distribuído.\n\n3. O QUE É PROIBIDO\nSem autorização prévia e por escrito de Matheus Mendes, é proibido:\n a) modificar, adaptar, traduzir ou criar obras derivadas do Esclerobot;\n b) descompilar, desofuscar, fazer engenharia reversa ou tentar extrair o código-fonte;\n c) copiar, redistribuir, publicar, revender, alugar, sublicenciar ou disponibilizar o Esclerobot, no todo ou em parte, inclusive em outros aplicativos, extensões, scripts ou sites;\n d) remover ou alterar avisos de direitos autorais, esta licença ou a identificação do autor;\n e) usar o nome, o logotipo ou os métodos do Esclerobot para divulgar outro produto.\n\n4. SEM GARANTIA\nO Esclerobot é fornecido \"no estado em que se encontra\", sem garantia de qualquer tipo. Ele é uma ferramenta não oficial, sem vínculo com o jogo PokéIdle, com a Nintendo, a Game Freak, a Creatures ou a The Pokémon Company. O uso de automações pode contrariar as regras do jogo: você é o único responsável por usá-lo e pelas consequências na sua conta, incluindo compras e vendas feitas com as suas configurações.\n\n5. LIMITAÇÃO DE RESPONSABILIDADE\nNa máxima extensão permitida em lei, Matheus Mendes não responde por perdas de itens, moedas, diamantes, gemas, pokémon, contas ou quaisquer danos decorrentes do uso do Esclerobot.\n\n6. ENCERRAMENTO\nEsta licença termina automaticamente se você descumprir qualquer item acima. Nesse caso, você deve desinstalar e apagar todas as cópias do Esclerobot.\n\n7. LEI E FORO\nEsta licença é regida pelas leis do Brasil.\nContato: Matheus Mendes\n";
const TERMOS_V=1,CHT='pokebotTermos';let termosOk=true; // os termos são aceitos no tutorial do app
const liberado=()=>termosOk;
if(!liberado())C.ativo=false;
C.ps=Object.assign({on:false,aberto:false},C.ps||{});C.cap=Object.assign({on:true,aberto:false,r:null,b:null,min:true},C.cap||{});delete C.cap.x;delete C.cap.y;
C.an=Object.assign({modo:'pvp',on:false,aberto:false,intervalo:6,rivais:25,aplicar:true,maxFichas:20},C.an||{});C.an.alvo=Object.assign({on:false,nick:'',seg:2},C.an.alvo||{});
C.pk=Object.assign({on:true,aberto:false,equipe:'pvp'},C.pk||{});
const vdVelho=C.vd&&!C.vd.modo&&C.vd.auto&&C.vd.confirmado;C.vd=Object.assign({on:false,aberto:false,intervalo:30,modo:'confirmar',colecao:true,maxFichas:40,poupar:[],limiar:4},C.vd||{});if(vdVelho)C.vd.modo='auto';if(!/^(auto|confirmar)$/.test(C.vd.modo))C.vd.modo='confirmar';delete C.vd.auto;delete C.vd.confirmado;
C.afk=Object.assign({on:false},C.afk||{});
C.sup=Object.assign({on:false,aberto:false,loot:false,reserva:500000,orcDia:5000000,intervalo:10,itens:[{n:'Ultra Ball',min:1000,lote:5000,on:true},{n:'Ultimate Potion',min:500,lote:2000,on:true}]},C.sup||{});
const salvar=()=>{try{localStorage.setItem(CHAVE,JSON.stringify(C));}catch(e){}};
const LOGO=(px)=>`<svg viewBox="0 0 20 20" width="${px}" height="${px}" aria-hidden="true" style="flex:none"><circle cx="10" cy="10" r="9.5" fill="#f0672a"/><path d="M10 3.2 14.6 10 10 16.8 5.4 10Z" fill="#fff"/><path d="M10 6.1 12.6 10 10 13.9 7.4 10Z" fill="#f0672a"/></svg>`;
const ABAS=[{id:'poke',nome:'Pokémon',ico:'🔍',cards:['pk','vd']},{id:'rotina',nome:'Rotina',ico:'📅',cards:['sup','ps','cap']}];
if(!ABAS.some(a=>a.id===C.aba))C.aba='poke';
const host=document.createElement('div');host.style.cssText='position:fixed;left:0;top:0;z-index:2147483000;display:none;';document.body.append(host);
const R=host.attachShadow({mode:'open'});
R.innerHTML=`<style>:host{all:initial}*{box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
.jan{width:min(500px,calc(100vw - 16px));background:#1d1612;color:#f3ece6;border:1px solid #6b3a22;border-radius:14px;box-shadow:0 24px 80px #000c;overflow:hidden;font-size:13px}
.top{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#2a1d16;border-bottom:1px solid #4a2c1d;cursor:grab;user-select:none;touch-action:none}.top.arr{cursor:grabbing}
.top h2{margin:0;flex:1;font:700 15px/1 ui-monospace,Menlo,monospace;letter-spacing:.06em}.alca{color:#8a6a58;letter-spacing:-2px}
.x{background:#34241b;border:1px solid #6b3a22;color:#f3ece6;cursor:pointer;font-size:17px;line-height:1;width:30px;height:30px;border-radius:8px}.x:hover{background:#43301f}
.corpo{padding:14px;display:flex;flex-direction:column;gap:12px}
.abas{display:grid;grid-template-columns:repeat(5,auto);justify-content:space-between;gap:2px;background:#1a130f;border:1px solid #4a2c1d;border-radius:11px;padding:4px;position:sticky;top:-14px;z-index:2}
.aba{display:flex;align-items:center;justify-content:center;gap:4px;background:none;border:0;border-radius:8px;color:#b8a497;padding:8px 7px;cursor:pointer;font:700 12px/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;min-width:0;white-space:nowrap;overflow:hidden}
.aba:hover{color:#fff;background:#2a1d16}.aba.on{background:#f0672a;color:#fff}.aba-ico{font-size:13px}
.aba-n{font:700 10px/1 inherit;background:#34241b;color:#e6dcd4;border-radius:9px;padding:2px 4px;min-width:15px;text-align:center}.aba.on .aba-n{background:#fff3;color:#fff}.aba-n:empty{display:none}
.aba.rodando .aba-n{background:#2fa56a;color:#fff}
.aba{position:relative}.aba.alerta:after{content:"";position:absolute;top:4px;right:6px;width:8px;height:8px;border-radius:50%;background:#ff4d3a;box-shadow:0 0 0 2px #1a130f}
.al-f{display:flex;flex-direction:column;gap:7px;background:#1a130f;border:1px solid #4a2c1d;border-radius:10px;padding:10px}.al-f>.inp{width:100%;padding:7px 9px;font-size:13px}
.seg{display:grid;grid-template-columns:1fr 1fr;gap:3px;background:#120d0a;border-radius:8px;padding:3px}.seg button{background:none;border:0;border-radius:6px;color:#b8a497;padding:6px;font:600 12px inherit;cursor:pointer}.seg button.on{background:#34241b;color:#fff;box-shadow:inset 0 0 0 1px #f0672a}
.al-r{display:flex;gap:6px;align-items:center}.al-r>.inp{flex:1;min-width:0;padding:6px 8px}.al-x{flex-wrap:wrap;gap:10px;font-size:11px;color:#b8a497}.al-x label{display:flex;align-items:center;gap:5px}
.al-l{display:flex;align-items:center;gap:9px;padding:6px 8px;border:1px solid #33241b;border-radius:8px;font-size:12px}.al-l span{flex:1}.al-l.off span{color:#7d6a5e;text-decoration:line-through}
.sw.sm{width:30px;height:18px}.sw.sm i:before{width:12px;height:12px}.sw.sm input:checked+i:before{transform:translateX(12px)}
.al-avw{display:flex;flex-direction:column;gap:3px;font-size:11px;color:#b8a497}.al-av{display:flex;gap:12px;padding-top:4px}.al-av .op{align-items:center;color:#f3ece6;flex-direction:row!important;gap:5px!important}
.pane{display:none;flex-direction:column;gap:12px}.pane.on{display:flex}
@media (max-width:520px){.aba span:not(.aba-ico){display:none}.aba .aba-n{display:none}}
.bot.afk{padding:9px 14px;border-width:1px}.bot.afk b{font-size:13px}.bot.afk.on{border-color:#f0672a;background:#2a1a10}.bot.afk.on b{color:#ff9a66}.bot.afk.on .chave{background:#f0672a}.bot.afk .chave{width:44px;height:26px}.bot.afk .chave:before{width:18px;height:18px}.bot.afk.on .chave:before{transform:translateX(18px)}
.bot{display:flex;align-items:center;gap:14px;width:100%;text-align:left;border:2px solid #6b3a22;background:#271c16;color:#f3ece6;border-radius:12px;padding:12px 14px;cursor:pointer;font:inherit}
.bot:hover{border-color:#f0672a}.bot.on{border-color:#2fa56a;background:#132a1f}
.bot b{display:block;font:800 16px/1.1 ui-monospace,Menlo,monospace;letter-spacing:.04em}.bot small{display:block;color:#b8a497;font-size:12px;margin-top:3px}.bot.on b{color:#7ff0b4}
.chave{width:52px;height:30px;border-radius:30px;background:#4a3a31;position:relative;flex:none;transition:.15s}
.chave:before{content:"";position:absolute;width:22px;height:22px;left:4px;top:4px;background:#fff;border-radius:50%;transition:.15s}
.bot.on .chave{background:#2fa56a}.bot.on .chave:before{transform:translateX(22px)}
.sec{font:700 11px ui-monospace,Menlo,monospace;color:#b8a497;letter-spacing:.08em;text-transform:uppercase}
.vazio{font-size:12px;color:#9c877a;border:1px dashed #4a2c1d;border-radius:10px;padding:14px;text-align:center}
.rod{padding:9px 14px;border-top:1px solid #4a2c1d;color:#8a6a58;font-size:11px;display:flex;justify-content:space-between;gap:8px}
.card{background:#261b15;border:1px solid #4a2c1d;border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:10px}.card.off{opacity:.55}
.lin{display:flex;align-items:center;gap:10px}.lin b{font-size:14px}.lin small{color:#b8a497;font-size:11.5px;display:block}
.sw{position:relative;width:38px;height:22px;flex:none}.sw input{opacity:0;width:0;height:0;position:absolute}
.sw i{position:absolute;inset:0;background:#4a3a31;border-radius:22px;cursor:pointer;transition:.15s}
.sw i:before{content:"";position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.15s}
.sw input:checked+i{background:#f0672a}.sw input:checked+i:before{transform:translateX(16px)}
.st{font-size:12px;color:#e6dcd4;background:#1d1612;border-radius:8px;padding:7px 9px;min-height:30px}
.corpo2{display:flex;flex-direction:column;gap:10px}.corpo2[hidden]{display:none}
.chips{display:grid;gap:5px}.chips.c4{grid-template-columns:repeat(4,1fr)}.chips.c2{grid-template-columns:1fr 1fr}.ops{display:flex;flex-direction:column;gap:6px}.op{display:flex;gap:8px;align-items:flex-start;font-size:12px;cursor:pointer}.op input{margin-top:2px;accent-color:#f0672a}.op b{display:block;font-weight:600}.op small{display:block;color:#b8a497;font-size:11px}.lg{font-size:11px;color:#e6dcd4;display:flex;flex-direction:column;gap:3px}.lg time{color:#9c877a}
.chip{border:1px solid #6b3a22;background:#271c16;color:#e6dcd4;border-radius:9px;padding:6px 4px;cursor:pointer;font:600 12px/1.2 inherit}.chip.on{background:#f0672a;border-color:#f0672a;color:#fff}
.btns{display:flex;gap:6px}.btn{flex:1;border:1px solid #6b3a22;background:#34241b;color:#fff;border-radius:8px;padding:7px 8px;font:600 12px inherit;cursor:pointer}.btn.pri{background:#f0672a;border-color:#f0672a}.btn:disabled{opacity:.5;cursor:default}
.nota{font-size:11px;color:#9c877a;line-height:1.4}
.time{display:flex;flex-wrap:wrap;gap:5px}.tm{font-size:11.5px;background:#1d1612;border:1px solid #6b3a22;border-radius:7px;padding:4px 7px}.tm b{color:#ff9a66;margin-right:3px}.tm small{color:#b8a497}
.ord{font-size:11px;color:#9c877a}.lnk{background:none;border:0;color:#b8a497;cursor:pointer;font:600 11px inherit;padding:0;text-decoration:underline}.lnk.on{color:#ff9a66}
.tb{max-height:340px;overflow:auto;border:1px solid #3a261b;border-radius:8px}
table{width:100%;border-collapse:collapse;font-size:11.5px;font-variant-numeric:tabular-nums}
th{position:sticky;top:0;background:#2a1d16;text-align:right;color:#b8a497;font-weight:600;font-size:10.5px;padding:4px}th:first-child,td:first-child{text-align:left}
td{text-align:right;padding:4px;border-bottom:1px solid #33241b}.tag{font-size:9.5px;color:#9c877a;font-weight:400}
.ok{color:#7ff0b4;font-weight:700}.ok2{color:#b6e38a}.mid{color:#f2c94c}.no{color:#ff8270}.warn{color:#f2c94c}.meta{color:#ff9a66}
.seta{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;background:none;border:0;border-top:1px solid #4a2c1d;color:#b8a497;padding:8px 0 0;cursor:pointer;font:600 11.5px inherit}.seta:hover{color:#fff}
.jan{max-height:calc(100vh - 16px);display:flex;flex-direction:column}.corpo{overflow:auto}
.inp{background:#1d1612;color:#f3ece6;border:1px solid #6b3a22;border-radius:7px;padding:4px 6px;font:12px inherit;box-sizing:border-box}.inp:focus{outline:1px solid #f0672a}
.cfg2{display:grid;grid-template-columns:1fr 1fr;gap:6px 10px}.cfg2 label{display:flex;flex-direction:column;gap:3px;font-size:11px;color:#b8a497}.cfg2 .inp{width:100%!important}
button:focus-visible{outline:2px solid #ff9a66;outline-offset:2px}
.termos{padding:14px;display:flex;flex-direction:column;gap:10px;overflow:auto;font-size:12.5px;line-height:1.45}.termos[hidden]{display:none}.jan.vtermos .corpo{display:none}
.termos pre{white-space:pre-wrap;font:11px/1.5 ui-monospace,Menlo,monospace;background:#1a130f;border:1px solid #4a2c1d;border-radius:8px;padding:10px;max-height:260px;overflow:auto;color:#e6dcd4;margin:6px 0 0}
.termos ul{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:4px}.termos summary{cursor:pointer;color:#ff9a66;font-weight:600}.termos .cr{font:700 13px ui-monospace,Menlo,monospace;color:#ffb088}</style>
<div class="jan" role="dialog" aria-labelledby="tit">
 <div class="top">${LOGO(22)}<h2 id="tit">ESCLEROBOT</h2><span class="alca" title="Arraste para mover" aria-hidden="true">⠿⠿</span><button class="x" id="fechar" title="Fechar (Esc)" aria-label="Fechar">×</button></div>
 <div class="termos" id="termosV" hidden></div>
 <div class="corpo">
  <button class="bot" id="bot" aria-pressed="false"><span class="chave"></span><span><b id="botT">DESATIVADO</b><small id="botS"></small></span></button>
  <button class="bot afk" id="afk" aria-pressed="false"><span class="chave"></span><span><b id="afkT">ANTI-AFK · LOCK SCREEN</b><small id="afkS">Desligado: o computador pode bloquear a tela.</small></span></button>
  <div class="abas" role="tablist" aria-label="Opções do bot">${ABAS.map(a=>`<button class="aba" role="tab" id="aba-${a.id}" data-aba="${a.id}" aria-controls="pane-${a.id}"><span class="aba-ico" aria-hidden="true">${a.ico}</span><span>${a.nome}</span><b class="aba-n" id="abaN-${a.id}"></b></button>`).join('')}</div>
  ${ABAS.map(a=>`<div class="pane" role="tabpanel" id="pane-${a.id}" aria-labelledby="aba-${a.id}">${a.cards.map(c=>`<div class="card" id="${c}Card"></div>`).join('')}</div>`).join('')}
 </div>
 <div class="rod"><span>${AUTORIA.produto} v${V} · © ${AUTORIA.ano} ${AUTORIA.autor} · <button class="lnk" id="sobreBtn">Sobre / Termos</button></span><span title="Arraste pelo topo para mover · 2 cliques no topo centraliza">Esc fecha</span></div>
</div>`;
const $=id=>R.getElementById(id);
const S_=ms=>new Promise(r=>setTimeout(r,ms));
function esperar(cond,ms){return new Promise(res=>{if(cond())return res(true);let fim=false;const ob=new MutationObserver(()=>{if(!fim&&cond()){fim=true;ob.disconnect();clearTimeout(to);res(true);}});
 ob.observe(document.body,{subtree:true,childList:true,attributes:true,characterData:true});const to=setTimeout(()=>{if(!fim){fim=true;ob.disconnect();res(cond());}},ms);});}
const num=s=>parseFloat(String(s??'0').replace(/\./g,'').replace(',','.'))||0;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const modais=()=>[...document.querySelectorAll('.modal-caixa')].filter(m=>m.offsetParent);
const fichaAberta=()=>{const f=document.querySelector('.caixa-ficha');return f&&f.offsetParent?f:null;};
const fmtF=n=>n>=1e6?(n/1e6).toFixed(1).replace('.',',')+' mi':n>=1e3?Math.round(n/1e3)+' mil':String(Math.round(n));
const aberto=()=>host.style.display!=='none';
// =====================================================================
// MÓDULOS — Auto-Passe e Suprimentos
// =====================================================================
const CHM='pokebotMods';
let MD={mud:{falhas:{},pausa:{}},shiny:{lista:[]},cap:{base:null,ult:null},ps:{hist:[]},sup:{hist:[],gastoDia:{d:'',v:0}},an:{res:null,rivais:null},pk:{eq:{},meta:null,ult:null},vd:{hist:[],ult:null}};
try{const x=JSON.parse(localStorage.getItem(CHM)||'{}');for(const k in MD)MD[k]=Object.assign(MD[k],x[k]||{});}catch(e){}
const salvarM=()=>{try{MD.ps.hist=MD.ps.hist.slice(-30);MD.sup.hist=MD.sup.hist.slice(-40);let x={};try{x=JSON.parse(localStorage.getItem(CHM)||'{}');}catch(e){}delete x.hu;delete x.mc;delete x.al;if(x.pk)delete x.pk.pvp;delete MD.pk.pvp;if(x.an)x.an={res:x.an.res||null,rivais:x.an.rivais||null};localStorage.setItem(CHM,JSON.stringify(Object.assign(x,MD)));}catch(e){}};
const hoje=()=>new Date().toISOString().slice(0,10);
// ============================ DETECTOR DE MUDANÇA NO JOGO (v44) ============================
// Cada função confere se achou na tela o que precisa (botão, aba, campo). Se o MESMO elemento faltar 3 rodadas seguidas,
// o jogo provavelmente mudou: a função pausa sozinha e avisa, em vez de ficar clicando no escuro. Achar de novo zera a contagem.
const MUDOU_LIMITE=3,NOME_MOD={sup:'Suprimentos',ps:'Auto-Passe',vd:'Venda de Pokémon'};
function achou(mod,oque,ok){const f=MD.mud.falhas,k=mod+'|'+oque;
 if(ok){if(f[k]){delete f[k];salvarM();}return true;}
 f[k]=(f[k]||0)+1;
 if(f[k]>=MUDOU_LIMITE&&!MD.mud.pausa[mod]){MD.mud.pausa[mod]={oque,t:Date.now(),v:V};
  if(MD[mod]&&MD[mod].hist)MD[mod].hist.push({t:Date.now(),m:`⚠ Pausado: não encontrei ${oque} (${MUDOU_LIMITE} vezes seguidas). O jogo pode ter mudado.`});
  try{avisoPokebot({tipo:'erro',tit:`${NOME_MOD[mod]||mod} pausado`,txt:`O jogo parece ter mudado: não encontrei ${oque} (${MUDOU_LIMITE} vezes seguidas).`,sub:'Pausei só esta função. Ela volta sozinha quando chegar uma versão nova do Esclerobot, ou clique em "Tentar de novo" no painel.'});}catch(e){}}
 salvarM();return false;}
const pausado=mod=>!!MD.mud.pausa[mod];
const txtPausa=mod=>pausado(mod)?`⚠ Pausado: não encontrei ${MD.mud.pausa[mod].oque}. O jogo pode ter mudado.`:'';
function retomar(mod){delete MD.mud.pausa[mod];for(const k of Object.keys(MD.mud.falhas))if(k.startsWith(mod+'|'))delete MD.mud.falhas[k];salvarM();}
// pausa feita por uma versão anterior: a versão nova pode ter corrigido, então tenta de novo
for(const m of Object.keys(MD.mud.pausa||{}))if(MD.mud.pausa[m].v!==V)retomar(m);
// ============================ SHINY (v44) ============================
// Quando alguém captura um shiny, o jogo mostra para todos a faixa #shiny-anuncio ("<b>nick</b> capturou um Shiny <b>nome</b>!").
// Se o nick da faixa for o desta conta, o shiny é seu: guardo e o app avisa. Só lê a tela.
let obsShiny=null;
function lerAnuncioShiny(){const el=document.querySelector('#shiny-anuncio');if(!el||el.classList.contains('hidden'))return null;
 const bs=[...(document.querySelector('#shiny-anuncio-titulo')?.querySelectorAll('b')||[])].map(b=>(b.textContent||'').trim());
 const quem=bs[0]||'',nome=(bs[1]||'').replace(/^✨\s*/,'');const eu=meuNick();
 if(!quem||!nome||!eu||eu==='—'||quem.toLowerCase()!==eu.toLowerCase())return null;
 const L=MD.shiny.lista,ult=L[L.length-1];if(ult&&ult.nome===nome&&Date.now()-ult.t<60e3)return null;
 const reg={t:Date.now(),nome};L.push(reg);MD.shiny.lista=L.slice(-300);salvarM();
 try{avisoPokebot({tipo:'ok',tit:`✨ Shiny capturado: ${nome}!`,txt:`${eu} capturou um ${nome} shiny.`,sub:'Guardado no histórico de shinies do Esclerobot.'});}catch(e){}
 return reg;}
function ligarObsShiny(){if(!vivo||obsShiny)return;const el=document.querySelector('#shiny-anuncio');if(!el){setTimeout(ligarObsShiny,3000);return;}
 obsShiny=new MutationObserver(()=>{lerAnuncioShiny();});obsShiny.observe(el,{attributes:true,attributeFilter:['class'],childList:true,subtree:true,characterData:true});lerAnuncioShiny();}
const hora=t=>new Date(t).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
const dataHora=t=>new Date(t).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
const faltam=ms=>{if(ms==null)return'—';if(ms<=0)return'agora';const m=Math.round(ms/6e4);return m<60?m+' min':Math.floor(m/60)+'h'+String(m%60).padStart(2,'0');};
// ---- comportamento humano: toda interação espera 300–1200 ms antes do clique
const jit=()=>S_(300+Math.floor(Math.random()*901));
// aceita o elemento ou uma função que o encontra de novo (o jogo redesenha a tela durante a espera)
async function clicar(x){if(!x)return false;await jit();const el=typeof x==='function'?x():x;if(!el||!el.isConnected||el.disabled)return false;el.click();return true;}
async function digitarEm(get,v){await jit();const inp=get();if(!inp)return false;inp.value=String(v);inp.dispatchEvent(new Event('input',{bubbles:true}));inp.dispatchEvent(new Event('change',{bubbles:true}));return true;}
// ---- uma função por vez usa as janelas do jogo
let usoTela=null;
const folhaAberta=()=>[...document.querySelectorAll('.cm-folha')].some(f=>f.offsetParent);
const telaLivre=()=>!usoTela&&!modais().length&&!fichaAberta()&&!folhaAberta();
async function fecharTudo(){for(let i=0;i<4;i++){if(fichaAberta()){await jit();document.querySelector('#ficha-fechar')?.click();await S_(200);continue;}
 const fo=[...document.querySelectorAll('.cm-folha')].find(f=>f.offsetParent);if(fo){await jit();fo.querySelector('.cm-fechar')?.click();await S_(300);continue;}
 if(modais().length){await jit();document.querySelector('#modal-fechar')?.click();await esperar(()=>!modais().length,2000);continue;}break;}}
// v48: "Uma sessão por conta" — se a mesma conta for aberta em outro lugar (outra aba, o Chrome, o celular), esta tela
// fica pausada com o aviso "Conta aberta em outro lugar · Jogar aqui" e NADA que o bot clicar chega ao servidor.
// O bot não clica em "Jogar aqui" (tomar a conta de volta é decisão sua): só para e avisa.
const contaEmOutroLugar=()=>{const e=document.querySelector('#sessao-tomada');return !!e&&!e.classList.contains('hidden');};
let avisouSessao=0;
function avisarSessao(){if(Date.now()-avisouSessao<30*60e3)return;avisouSessao=Date.now();const m='A conta está aberta em outro lugar (outra aba, navegador ou celular). Esta tela ficou pausada pelo jogo e o bot não consegue agir aqui. Feche a outra ou clique em "Jogar aqui".';
 for(const k of ['sup','ps','vd'])if(MD[k]&&MD[k].hist)MD[k].hist.push({t:Date.now(),m:'⚠ '+m});salvarM();try{avisoPokebot({tipo:'erro',tit:'Conta aberta em outro lugar',txt:m});}catch(e){}}
// Ir para o Centro Pokémon pelo botão do jogo (saída limpa: sem a perda de XP de fechar/recarregar no meio da hunt).
// O jogo só deixa sair 3 s depois do último dano trocado, então tenta por alguns segundos.
const ondeEsta=()=>{const h=(document.querySelector('#hud-hunt')?.textContent||'').trim();if(/arena|boss|m[ií]stic/i.test(h))return'arena';if(/centro|center|casa|house/i.test(h)||!document.querySelector('#ir-centro')||document.querySelector('#ir-centro').offsetParent===null)return'seguro';return'hunt';};
async function irAoCentro(ms=15000){const fim=Date.now()+ms;if(contaEmOutroLugar())return{ok:true,onde:'outro'};
 while(Date.now()<fim){const o=ondeEsta();if(o!=='hunt')return{ok:o==='seguro',onde:o};const b=document.querySelector('#ir-centro');if(b&&!b.disabled)await clicar(b);await esperar(()=>ondeEsta()!=='hunt',2500);}
 return{ok:ondeEsta()==='seguro',onde:ondeEsta()};}
async function comTela(nome,fn){if(!C.ativo||!telaLivre())return false;if(contaEmOutroLugar()){avisarSessao();return false;}usoTela=nome;try{return await fn();}catch(e){console.warn('[Esclerobot]',nome,e);return false;}finally{await fecharTudo();usoTela=null;}}
async function abrirMenu(modal,cond,ms=7000){const b=document.querySelector(`.menu-topo [data-modal=${modal}]`);if(!b)return null;await clicar(b);await esperar(()=>modais().some(cond),ms);return modais().find(cond)||null;}
const ouroAtual=()=>{const e=[...document.querySelectorAll('.tr-moeda[title]')].find(x=>/^(Ouro|Gold|Oro)\b/i.test(x.title||''));return e?num(e.querySelector('b')?.textContent):null;};
// ============================ MÓDULO 2 — AUTO-PASSE ============================
let psProx=Date.now()+20e3;
const modalPasse=()=>modais().find(m=>m.querySelector('.ps-resgatar'));
function hms(s){const p=String(s||'').split(':').map(Number);return p.length===3&&p.every(n=>!isNaN(n))?(p[0]*3600+p[1]*60+p[2])*1000:null;}
function lerPasse(m){const t=m.innerText,b=m.querySelector('.ps-resgatar'),bt=b?b.innerText.trim():'';const agora=Date.now();
 const libera=hms((bt.match(/(\d+:\d+:\d+)/)||[])[1]),zera=hms((t.match(/zera se você não resgatar em\s*(\d+:\d+:\d+)/i)||[])[1]);
 // o botão liberado vem com id="ps-resgatar"; o único id proibido é o do VIP (#ps-comprar-vip)
 const idOk=b&&(!b.id||b.id==='ps-resgatar');
 const pode=!!(b&&idOk&&!b.disabled&&!/libera|comprar|estender|💎|\+30/i.test(bt+' '+b.className));
 return{lido:agora,dia:num((t.match(/DIA\s+(\d+)\s+DE\s+30/i)||[])[1]),diaBt:num((bt.match(/DIA\s+(\d+)/i)||[])[1]),seq:num((t.match(/Sequência:\s*(\d+)/i)||[])[1]),pode,prox:libera!=null?agora+libera:(pode?agora:null),zera:zera!=null?agora+zera:null,vip:/PASSE VIP ATIVO/i.test(t),vipResta:((t.match(/Faltam\s+([^\n]+)/)||[])[1]||'').trim()};}
async function checarPasse(){return comTela('passe',async()=>{
 const m=await abrirMenu('passe',x=>!!x.querySelector('.ps-resgatar'));if(!achou('ps','o Passe (botão no menu ou o botão de resgate)',!!m)){psProx=Date.now()+5*60e3;return false;}
 let Pp=lerPasse(m);
 if(Pp.pode){const b=m.querySelector('.ps-resgatar');
  // trava: só o botão de resgate. Nunca #ps-comprar-vip nem nada de VIP/diamante.
  if(b&&b.classList.contains('ps-resgatar')&&(!b.id||b.id==='ps-resgatar')&&b.id!=='ps-comprar-vip'&&b!==document.querySelector('#ps-comprar-vip')&&!b.closest('#ps-comprar-vip')){
   const dia=Pp.diaBt||Pp.dia;await clicar(b);
   await esperar(()=>{const mm=modalPasse();const b2=mm&&mm.querySelector('.ps-resgatar');return !b2||b2.disabled||/libera/i.test(b2.innerText);},8000);await S_(400);
   const mm=modalPasse();const P2=mm?lerPasse(mm):null;const ok=P2&&!P2.pode;
   MD.ps.hist.push({t:Date.now(),m:ok?`Dia ${dia||'?'} resgatado`:`Tentei o Dia ${dia||'?'}, o jogo não confirmou`});if(ok)Pp=P2;}}
 MD.ps.ult=Pp;psProx=Pp.prox&&Pp.prox>Date.now()?Pp.prox+15e3:Date.now()+30*60e3;salvarM();return true;});}
function cicloPasse(){if(C.ativo&&C.ps.on&&!pausado('ps')&&Date.now()>=psProx&&telaLivre()){psProx=Date.now()+60e3;checarPasse().then(()=>pintar());}}
function miniPasse(){if(!C.ps.on)return'Desligado.';if(pausado('ps'))return txtPausa('ps');if(!C.ativo)return'Liga junto com o bot.';const p=MD.ps.ult;if(!p)return'Vou abrir o Passe para ler o dia…';
 return `Dia ${p.dia||'?'}/30 · sequência ${p.seq||0}${p.vip?' · VIP':''} · ${p.pode?'resgate liberado':'próximo em '+faltam((p.prox||0)-Date.now())}`;}

// ============================ MÓDULO 3 — SUPRIMENTOS + LOOT ============================
let supProx=Date.now()+30e3;
const CAT_IDX={bolas:0,potions:1,revives:2};
const catDoItem=n=>/ball/i.test(n)?'bolas':/revive/i.test(n)?'revives':'potions';
// nomes de item comparados sem espaço, acento, hífen e maiúsculas: "Ultra Ball" = "Ultraball" = "ultra-ball", "Poké Ball" = "Pokeball"
// (o jogo já escreveu as bolas dos dois jeitos; o bot não pode depender disso)
const normItem=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const mesmoItem=(a,b)=>!!normItem(a)&&normItem(a)===normItem(b);
// o título do chip é "Nome — eficiência ×4" / "Nome você tem 123": confere só o começo, sem engolir outro item mais comprido
function tituloDoItem(titulo,nome){const t=normItem(titulo),n=normItem(nome);if(!n||!t.startsWith(n))return false;
 const resto=String(titulo||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'');let i=0,k=0;while(i<resto.length&&k<n.length){if(/[a-z0-9]/i.test(resto[i]))k++;i++;}
 return !/^[a-z0-9]/i.test(resto.slice(i));}
// texto do aviso flutuante do jogo (#toast), se estiver na tela
const textoAvisoJogo=()=>{const e=document.querySelector('#toast');return e&&e.offsetParent!==null&&!e.classList.contains('hidden')?(e.innerText||'').replace(/\s+/g,' ').trim().slice(0,160):'';};
function contarItem(nome){
 const chip=[...document.querySelectorAll('aside.col.dir .auto-chip, .auto-chip')].find(c=>tituloDoItem((c.title||'').trim(),nome));if(chip)return num(chip.textContent);
 const cb=[...document.querySelectorAll('.caidos-bola')].find(c=>tituloDoItem(c.title||'',nome));if(cb){const m=(cb.title||'').match(/tem\s*([\d.]+)/);if(m)return num(m[1]);}
 return null;}
async function lerBolsaTreinador(){const r={};const m=await abrirMenuBolsa();if(!achou('sup','a janela do Inventário',!!m))return r;
 const abasT=[...m.querySelectorAll('.bolsa-aba')].filter(b=>/treinador|trainer|entrenador/i.test(b.innerText));achou('sup','a aba Treinador do Inventário',abasT.length>0);
 for(const aba of abasT){await clicar(aba);await S_(300);}
 m.querySelectorAll('.bolsa-card').forEach(c=>{const n=(c.querySelector('.mk-nome')?.getAttribute('title')||'').trim();if(n)r[n]=num(c.querySelector('.bolsa-qtd')?.innerText);});
 await fecharTudo();return r;}
async function abrirMenuBolsa(){const b=document.querySelector('.btn-inventario');if(!achou('sup','o botão Inventário',!!b))return null;await clicar(b);await esperar(()=>modais().some(x=>x.querySelector('.bolsa-aba')),6000);return modais().find(x=>x.querySelector('.bolsa-aba'))||null;}
async function rodarSuprimentos(manual){return comTela('suprimentos',async()=>{
 const cfg=C.sup;if(MD.sup.gastoDia.d!==hoje())MD.sup.gastoDia={d:hoje(),v:0};
 // 1) quantidades
 const qt={};let faltaLer=false;for(const it of cfg.itens){const q=contarItem(it.n);if(q==null)faltaLer=true;else qt[it.n]=q;}
 if(faltaLer){const b=await lerBolsaTreinador();for(const it of cfg.itens)if(qt[it.n]==null){const k=Object.keys(b).find(x=>mesmoItem(x,it.n));qt[it.n]=k!=null?b[k]:0;}}
 MD.sup.qt=qt;MD.sup.lido=Date.now();
 const comprar=cfg.itens.filter(it=>it.on!==false&&it.min>0&&it.lote>0&&(qt[it.n]??0)<it.min);
 // 2) compras no NPC
 if(comprar.length){const m=await abrirMenu('market',x=>!!x.querySelector('.mk-aba'));if(achou('sup','o Market (botão no menu ou a janela)',!!m)){
  const mk=()=>modais().find(x=>x.querySelector('.mk-aba'));
  const abaOk=await clicar(()=>[...(mk()?.querySelectorAll('.mk-aba')||[])].find(b=>/^(compra|buy|comprar)$/i.test(b.innerText.trim())));await S_(500);
  for(const it of (achou('sup','a aba Compra do Market',abaOk)?comprar:[])){if(!mk())break;const catOk=await clicar(()=>[...(mk()?.querySelectorAll('.mk-cat')||[])][CAT_IDX[catDoItem(it.n)]]);await S_(500);if(!achou('sup','as categorias da loja (Pokébolas, Poções, Revives)',catOk))break;
   const acharCard=()=>[...(mk()?.querySelectorAll('.mk-card')||[])].find(c=>mesmoItem(c.querySelector('.mk-nome')?.getAttribute('title')||c.querySelector('.mk-nome')?.textContent,it.n));const card=acharCard();
   if(!achou('sup',`o item "${it.n}" na loja do NPC`,!!card)){const tem=[...(mk()?.querySelectorAll('.mk-card .mk-nome')||[])].map(x=>(x.textContent||'').trim()).filter(Boolean).slice(0,12);MD.sup.hist.push({t:Date.now(),m:`Não achei "${it.n}" na loja do NPC${tem.length?` (a loja mostra: ${tem.join(', ')})`:' (a loja apareceu vazia)'}.`});continue;}
   const unit=num(card.querySelector('.mk-preco')?.textContent);const ouroL=ouroAtual();if(!achou('sup','o ouro no topo da tela',ouroL!=null))break;const ouro=ouroL??0;
   let qtd=it.lote;if(unit>0){const podeOuro=Math.floor(Math.max(0,ouro-cfg.reserva)/unit),podeDia=Math.floor(Math.max(0,cfg.orcDia-MD.sup.gastoDia.v)/unit);qtd=Math.min(qtd,podeOuro,podeDia,9999);}
   if(qtd<1){MD.sup.hist.push({t:Date.now(),m:`${it.n}: sem ouro livre (reserva ${fmtF(cfg.reserva)}) ou orçamento do dia acabou.`});continue;}
   const btC=()=>{const c=acharCard();return c?[...c.querySelectorAll('button.mk-acao')].find(b=>/comprar|\bbuy\b/i.test(b.innerText)):null;};
   if(!achou('sup','o campo de quantidade da loja',await digitarEm(()=>acharCard()?.querySelector('.mk-qtd input'),qtd))){continue;}await S_(150);
   if(!achou('sup','o botão Comprar',!!btC()))continue;
   if(btC().disabled){MD.sup.hist.push({t:Date.now(),m:`${it.n}: o jogo não liberou a compra (ouro insuficiente?).`});continue;}
   // confirma pelo ouro (até 12 s: o servidor pode demorar a mandar o saldo novo) e anota o que o jogo responder no aviso (#toast)
   const antes=ouroAtual(),avisoAntes=textoAvisoJogo(),pedido=acharCard()?.querySelector('.mk-qtd input')?.value;let resp='';
   const foi=await clicar(btC);
   const mudou=foi&&await esperar(()=>{const a=textoAvisoJogo();if(a&&a!==avisoAntes)resp=a;return ouroAtual()!==antes;},12000);
   if(!mudou){MD.sup.hist.push({t:Date.now(),m:`${it.n}: ${!foi?'não consegui clicar em Comprar':resp?`cliquei em Comprar (${pedido||qtd} un.) e o jogo respondeu: “${resp}”`:`cliquei em Comprar (${pedido||qtd} un.), mas o ouro não mudou em 12 s${contaEmOutroLugar()?' — a conta está aberta em outro lugar (o jogo pausou esta tela)':''}`} — não confirmei a compra.`});continue;}
   const gasto=unit*qtd;MD.sup.gastoDia.v+=gasto;qt[it.n]=(qt[it.n]||0)+qtd;MD.sup.hist.push({t:Date.now(),m:`Comprei ${qtd.toLocaleString('pt-BR')}× ${it.n} por ${fmtF(gasto)} de ouro (tinha ${(qt[it.n]||0).toLocaleString('pt-BR')}).`});}
  await fecharTudo();}}
 // 3) venda de loot ao NPC (respeita o cadeado nativo: botão desabilitado = lootTravado)
 if(cfg.loot&&!pausado('sup')){const m=await abrirMenu('market',x=>!!x.querySelector('.mk-aba'));if(achou('sup','o Market (botão no menu ou a janela)',!!m)){
  const mk=()=>modais().find(x=>x.querySelector('.mk-aba'));
  const abaV=await clicar(()=>[...(mk()?.querySelectorAll('.mk-aba')||[])].find(b=>/^(venda|sell|venta|vender)$/i.test(b.innerText.trim())));await esperar(()=>!!mk()?.querySelector('#mk-auto-venda'),4000);await S_(300);
  const auto=mk()?.querySelector('#mk-auto-venda');achou('sup','a aba Venda do Market',abaV);achou('sup','a chave Venda Automática do Market',!!auto);MD.sup.autoJogo=auto?auto.checked:null;
  let n=0,tot=0;if(auto&&!auto.checked){
   const chaves=[...mk().querySelectorAll('.mk-card')].map(c=>c.dataset.chave||'').filter(k=>/^v\d+$/.test(k));
   for(const k of chaves){if(!C.ativo||!mk())break;const card=()=>mk()?.querySelector(`.mk-card[data-chave="${k}"]`);const c0=card();if(!c0)continue;
    const bt=()=>{const c=card();return c?[...c.querySelectorAll('button.mk-acao')].find(b=>/vender|\bsell\b/i.test(b.innerText)):null;};
    if(!bt()||bt().disabled||c0.classList.contains('travado'))continue;   // cadeado nativo (lootTravado): o jogo desabilita o botão
    const q=num(c0.querySelector('.mk-qtd input')?.max)||1;const unit=num(c0.querySelector('.mk-preco')?.textContent);
    await digitarEm(()=>card()?.querySelector('.mk-qtd input'),q);if(await clicar(bt)){await esperar(()=>!card()||num(card().querySelector('.mk-qtd input')?.max)<q,3000);n++;tot+=unit*q;}}
   if(n){MD.sup.hist.push({t:Date.now(),m:`Vendi ${n} tipo(s) de loot por ~${fmtF(tot)} de ouro (itens com cadeado ficaram).`});}}
  await fecharTudo();}}
 supProx=Date.now()+cfg.intervalo*60e3;salvarM();return true;});}
function cicloSup(){if(C.ativo&&C.sup.on&&!pausado('sup')&&Date.now()>=supProx&&telaLivre()){supProx=Date.now()+60e3;rodarSuprimentos(false).then(()=>pintar());}}
function miniSup(){if(!C.sup.on)return'Desligado.';if(pausado('sup'))return txtPausa('sup');if(!C.ativo)return'Liga junto com o bot.';const q=MD.sup.qt;if(!q)return'Ainda não conferi a bolsa.';
 return C.sup.itens.filter(i=>i.on!==false).map(i=>`${i.n.replace(/ Ball| Potion/,'')} ${(q[i.n]??0).toLocaleString('pt-BR')}${(q[i.n]??0)<i.min?' ⚠':''}`).join(' · ')+` · gasto hoje ${fmtF(MD.sup.gastoDia.d===hoje()?MD.sup.gastoDia.v:0)}`;}
// ============================ UI dos novos cards ============================
const seta=(id,ab)=>`<button class="seta" id="${id}" aria-expanded="${ab}"><span>${ab?'Minimizar':'Mostrar opções'}</span><svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" style="transform:rotate(${ab?180:0}deg)"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
function cardBase(id,cfg,titulo,sub,mini,corpo){const el=$(id+'Card');if(!el)return null;el.className='card'+(C.ativo?'':' off');
 el.innerHTML=`<div class="lin"><label class="sw"><input type="checkbox" id="${id}On" ${cfg.on?'checked':''}><i></i></label><div style="flex:1"><b>${titulo}</b><small>${sub} ${C.ativo?'':'Só roda com o bot ATIVADO.'}</small></div></div>
 ${cfg.aberto?'':`<div class="st" id="${id}Status">${esc(mini())}</div>`}
 <div class="corpo2" ${cfg.aberto?'':'hidden'}>${cfg.aberto?`<div class="st">${esc(mini())}</div>`:''}${cfg.aberto?corpo():''}</div>${seta(id+'Seta',cfg.aberto)}`;
 const on=(i,ev,f)=>{const e=$(i);if(e)e[ev]=f;};on(id+'On','onchange',e=>{cfg.on=e.target.checked;salvar();pintar();});on(id+'Seta','onclick',()=>{cfg.aberto=!cfg.aberto;salvar();pintar();});return on;}
const lgHtml=arr=>arr.length?`<div class="lg">${arr.slice(-8).reverse().map(l=>`<div><time>${dataHora(l.t)}</time> ${esc(l.m)}</div>`).join('')}</div>`:'<div class="nota">Nada ainda.</div>';
const campoNum=(id,v,w=90)=>`<input type="number" class="inp" id="${id}" value="${v}" min="0" style="width:${w}px">`;
// ============================ MÓDULO — ANALISADOR DE PvP (monta a equipe sozinho) ============================
// Fontes: Tracker oficial (/tracker/api: ladder + times reais dos rivais) · seus pokémon lidos na janela Editar da equipe de PvP.
// Conta: dano da wiki ((2L/5+2)·power·atk/def)/50+2 × STAB 1,5 × tipo × 0,85–1; HP = máx(24, hp×12);
// IV de SPD −0,01 s por ponto (piso 0,4 s); intervalo global 0,9 s; Investida power 30 a cada 2 s;
// nível inteiro até 150 e comprimido acima (régua do ginásio: nv 1.000→352, 3.000→578, 10.000→993).
const CHP='pokebotPvp';
let P={mons:{}};try{Object.assign(P,JSON.parse(localStorage.getItem(CHP)||'{}'));}catch(e){}
if(!P.mons||typeof P.mons!=='object')P.mons={};
const salvarP=()=>{try{localStorage.setItem(CHP,JSON.stringify(P));}catch(e){}};
let ESP=null,ESPN=null;
async function especies(){if(ESP)return ESP;const e={},n={};for(const a of ['creatures','creatures-novos','creatures-outland-novos']){try{const j=await fetch('/assets/'+a+'.json').then(r=>r.json());(j.creatures||j||[]).forEach(c=>{if(c&&c.pokeId!=null){e[c.pokeId]=c;if(c.name)n[String(c.name).toLowerCase()]=c;}});}catch(err){}}ESP=e;ESPN=n;return ESP;}
const espNome=nome=>ESPN?ESPN[String(nome||'').replace(/^✨\s*/,'').replace(/^shiny\s+/i,'').trim().toLowerCase()]||null:null;
const baseDe=c=>c?[c.baseHp,c.baseAtk,c.baseDef,c.baseSpAtk,c.baseSpDef,c.baseSpeed].map(x=>+x||1):null;
const tiposDe=c=>c?[c.type1,c.type2].filter(Boolean).map(t=>String(t).toUpperCase()):[];
const TIPOS={NORMAL:{ROCK:.5,GHOST:0,STEEL:.5},FIRE:{FIRE:.5,WATER:.5,GRASS:2,ICE:2,BUG:2,ROCK:.5,DRAGON:.5,STEEL:2},WATER:{FIRE:2,WATER:.5,GRASS:.5,GROUND:2,ROCK:2,DRAGON:.5},GRASS:{FIRE:.5,WATER:2,GRASS:.5,POISON:.5,GROUND:2,FLYING:.5,BUG:.5,ROCK:2,DRAGON:.5,STEEL:.5},ELECTRIC:{WATER:2,ELECTRIC:.5,GRASS:.5,GROUND:0,FLYING:2,DRAGON:.5},ICE:{FIRE:.5,WATER:.5,GRASS:2,ICE:.5,GROUND:2,FLYING:2,DRAGON:2,STEEL:.5},FIGHTING:{NORMAL:2,ICE:2,POISON:.5,FLYING:.5,PSYCHIC:.5,BUG:.5,ROCK:2,GHOST:0,DARK:2,STEEL:2,FAIRY:.5},POISON:{GRASS:2,POISON:.5,GROUND:.5,ROCK:.5,GHOST:.5,STEEL:0,FAIRY:2},GROUND:{FIRE:2,GRASS:.5,ELECTRIC:2,POISON:2,FLYING:0,BUG:.5,ROCK:2,STEEL:2},FLYING:{GRASS:2,ELECTRIC:.5,FIGHTING:2,BUG:2,ROCK:.5,STEEL:.5},PSYCHIC:{FIGHTING:2,POISON:2,PSYCHIC:.5,DARK:0,STEEL:.5},BUG:{FIRE:.5,GRASS:2,FIGHTING:.5,POISON:.5,FLYING:.5,PSYCHIC:2,GHOST:.5,DARK:2,STEEL:.5,FAIRY:.5},ROCK:{FIRE:2,ICE:2,FIGHTING:.5,GROUND:.5,FLYING:2,BUG:2,STEEL:.5},GHOST:{NORMAL:0,PSYCHIC:2,GHOST:2,DARK:.5},DRAGON:{DRAGON:2,STEEL:.5,FAIRY:0},DARK:{FIGHTING:.5,PSYCHIC:2,GHOST:2,DARK:.5,FAIRY:.5},STEEL:{FIRE:.5,WATER:.5,ELECTRIC:.5,ICE:2,ROCK:2,STEEL:.5,FAIRY:2},FAIRY:{FIRE:.5,FIGHTING:2,POISON:.5,DRAGON:2,DARK:2,STEEL:.5}};
const efet=(tg,defTipos)=>defTipos.reduce((m,d)=>m*((TIPOS[tg]||{})[d]??1),1);
const E_=[.95,.8,.8,.8,.8,.95],POT=[0,1,1.05,1.1,1.25,2];
const nivelPvp=L=>{L=Math.max(1,+L||1);return L<=150?L:150*Math.pow(L/150,0.45);};
// rival típico (o Tracker não mostra IV/qualidade/potência dos outros)
const RIVAL={iv:20,q:1.2,pot:2};
// v48 (Wiki): os golpes de 600 (dois em toda última evolução, um terceiro na Mega, com 30 s) entram na conta
function golpesDaEspecie(c,nv){return((c&&c.attacks)||[]).filter(a=>(+a.power||0)>0&&(a.learnLevel||1)<=Math.max(1,nv)).map(a=>({t:String(a.type||'NORMAL').toUpperCase(),c:/PHYS/i.test(a.category)?'F':'E',p:+a.power,cd:Math.max(0.4,(+a.cooldownMs||20000)/1000)}));}
// lutador: st = stats reais no nível de PvP (HP, ATK, DEF, SpA, SpD)
function lutador(o){const c=o.pokeId!=null&&ESP?ESP[o.pokeId]:espNome(o.nome);if(!c)return null;const nv=Math.max(1,+o.nv||1),Le=nivelPvp(nv);
 let st;if(o.st&&o.st.length>=5&&o.st.every(x=>x>0))st=o.st.slice(0,5).map(x=>x*Le/nv);
 else{const B=baseDe(c),iv=o.iv&&o.iv.length===6?o.iv:[RIVAL.iv,RIVAL.iv,RIVAL.iv,RIVAL.iv,RIVAL.iv,RIVAL.iv],q=o.q||RIVAL.q,pot=POT[o.pot||RIVAL.pot]||1,sh=o.shiny?3:1;st=B.slice(0,5).map((b,i)=>Math.round((b+2*iv[i])*Le/100*Math.pow(q,E_[i])*pot*sh));}
 const ivSpd=o.iv&&o.iv.length===6?o.iv[5]:RIVAL.iv;
 return{id:o.id||null,nome:c.name,pokeId:c.pokeId,nv,Le,shiny:!!o.shiny,tipos:tiposDe(c),spdBase:+c.baseSpeed||0,hp:Math.max(24,Math.round(st[0]*12)),atk:st[1],def:st[2],spa:st[3],spd:st[4],ivSpd,g:golpesDaEspecie(c,nv),o};}
function dano(A,D,power,cat,tipo){const fis=cat==='F';const a=fis?A.atk:A.spa,d=Math.max(1,fis?D.def:D.spd);return(((2*A.Le/5+2)*power*a/d)/50+2)*(A.tipos.includes(tipo)?1.5:1)*efet(tipo,D.tipos)*0.925;}
// Wiki (Combate): o Speed base dá até 7% de desconto na recarga dos golpes (Speed÷20 até 120; +1% a cada 40 acima, teto 7%),
// aproveitado na proporção do IV de SPD (IV 32 = tudo). Investida: física, power 30, no 1º tipo (2º só se o alvo for imune),
// a cada 2 s − 0,01 s por ponto de IV de SPD; intervalo entre golpes 0,9 s − 0,01 s/IV (piso 0,4 s).
const descRecarga=A=>{const s=+A.spdBase||0;const pot=Math.min(7,s<=120?s/20:6+(s-120)/40);return pot*Math.max(0,Math.min(32,+A.ivSpd||0))/32;};
function dps(A,D){const gcd=Math.max(0.4,0.9-0.01*A.ivSpd);let uso=0,tot=0;const k=1-descRecarga(A)/100;
 const gs=A.g.map(g=>{const cd=Math.max(0.4,g.cd*k);return{cd,d:dano(A,D,g.p,g.c,g.t)};}).sort((x,y)=>y.d/y.cd-x.d/x.cd);
 for(const g of gs){const u=gcd/g.cd;if(uso+u>1)continue;uso+=u;tot+=g.d/g.cd;}
 const t0=A.tipos[0]||'NORMAL',tInv=(D.tipos&&D.tipos.length&&efet(t0,D.tipos)===0&&A.tipos[1])?A.tipos[1]:t0;const inv=Math.max(0.4,2-0.01*A.ivSpd);
 tot+=(1-uso)*dano(A,D,30,'F',tInv)/inv;
 return Math.max(0.01,tot);}
// luta em fila: quem cai sai, o próximo entra; o HP que sobra continua
function simular(ia,ib,M,ruido){const [HA,HB]=[ia.map(a=>M.hpA[a]),ib.map(b=>M.hpB[b])];let i=0,j=0,hA=HA[0],hB=HB[0];
 while(i<ia.length&&j<ib.length){let dA=M.ab[ia[i]][ib[j]],dB=M.ba[ib[j]][ia[i]];if(ruido){dA*=ruido();dB*=ruido();}const tA=hB/dA,tB=hA/dB;
  if(tA<=tB){hA-=dB*tA;j++;hB=HB[j];}else{hB-=dA*tB;i++;hA=HA[i];}}
 const sobra=(ia.length-i)-(i<ia.length?1-hA/HA[i]:0),sobraB=(ib.length-j)-(j<ib.length?1-hB/HB[j]:0);return{ganhou:j>=ib.length,margem:sobra-sobraB};}
function permutacoes(a,k){const r=[];const rec=(pre,resto)=>{if(pre.length===k){r.push(pre);return;}resto.forEach((x,i)=>rec(pre.concat(x),resto.slice(0,i).concat(resto.slice(i+1))));};rec([],a);return r;}
// ---------- Tracker
async function tracker(rota,q={},op={}){const u=new URL('/tracker/api/'+rota,location.origin);for(const k in q)u.searchParams.set(k,q[k]);const r=await fetch(u,{credentials:'omit',cache:op.fresco?'no-cache':'default'});if(!r.ok)throw new Error('Tracker '+rota+' '+r.status);return r.json();}
const meuNick=()=>(document.querySelector('#tr-nick')?.textContent||'').trim();
function timeDoJogador(j){const ps=(j.partidas||[]).filter(m=>m&&m.eu&&m.eu.pks&&m.eu.pks.length);
 if(ps.length){const m=ps[0];return m.eu.pks.slice(0,5).map(p=>({nome:p.nome,nv:+p.nivel||150,shiny:!!p.shiny}));}
 const pk=(j.pokemons||[]).slice().sort((a,b)=>(b.entradas||0)-(a.entradas||0)).slice(0,5);return pk.map(p=>({nome:p.nome,nv:150,shiny:false,chute:true}));}
async function lerRivais(forcar){const cache=MD.an.rivais;if(!forcar&&cache&&Date.now()-cache.em<3*36e5&&cache.lista&&cache.lista.length)return cache;
 
 const L=[];for(let p=0;p<12;p++){const d=await tracker('ladder',{pagina:p,limite:50});L.push(...(d.linhas||[]));if(!d.linhas||!d.linhas.length||L.length>=d.total)break;await S_(250);}
 let meuPR=0,nick=meuNick();if(nick){try{const eu=await tracker('jogador',{nick});meuPR=(eu.rank&&eu.rank.pontos)||0;}catch(e){}}
 const perto=L.filter(x=>x.nick!==nick).map(x=>({x,d:Math.abs(x.pontos-meuPR)})).sort((a,b)=>a.d-b.d).slice(0,C.an.rivais).map(o=>o.x);
 const lista=[];const vistos=new Set();
 for(let i=0;i<perto.length;i++){const x=perto[i];if(!vivo||!C.ativo)break;
  try{const j=await tracker('jogador',{nick:x.nick});const t=timeDoJogador(j);if(t.length){lista.push({nick:x.nick,pr:x.pontos,time:t});vistos.add(x.nick);}
   // quem ele enfrentou também joga na sua faixa
   for(const m of (j.partidas||[]).slice(0,6)){if(!m||!m.ele||!m.ele.pks||!m.oponente)continue;const on=m.oponente.nick;if(!on||vistos.has(on)||on===nick)continue;if(Math.abs((m.oponente.pontos||0)-meuPR)>300)continue;
    vistos.add(on);lista.push({nick:on,pr:m.oponente.pontos||0,time:m.ele.pks.slice(0,5).map(p=>({nome:p.nome,nv:+p.nivel||150,shiny:!!p.shiny})),viaPartida:true});}
  }catch(e){}
  await S_(300+Math.floor(Math.random()*400));}
 MD.an.rivais={em:Date.now(),meuPR,nick,total:L.length,lista:lista.slice(0,60)};salvarM();return MD.an.rivais;}
// ---------- Seus pokémon: janela Editar da equipe de PvP
const modalPvp=()=>modais().find(m=>m.querySelector('#pvp-editar-time'));
function lerCards(f){return[...f.querySelectorAll('.cm-pk-escolha[data-id]')].map(c=>{const nomeT=(c.querySelector('.mk-nome')?.textContent||'').trim();const sub=c.querySelector('.mk-sub')?.textContent||'';
 const pot=num(((c.querySelector('.cm-pot')?.className||'').match(/\bp(\d)\b/)||[])[1])||1;const selo=k=>c.querySelector('.pk-selo-'+k)?.textContent||'';
 return{id:c.dataset.id,nome:(c.querySelector('.mk-nome')?.getAttribute('title')||nomeT).replace(/^✨\s*/,'').replace(/^Shiny\s+/i,''),shiny:/✨|shiny/i.test(nomeT),nv:num((sub.match(/Nv\s*([\d.]+)/)||[])[1])||1,local:(sub.split('·')[1]||'').trim(),pot,ivT:num(selo('iv').replace(/\D+/,'')),q:num((selo('q').match(/[\d,]+/)||[])[0]),ordem:num(c.querySelector('.ofrpk-ordem')?.textContent)||0};});}
function lerFicha(f){const t=f.innerText;const esp=t.match(/Espécie\s*\n?\s*#(\d+)\s+([^\n]+)/);
 const at=t.slice(t.indexOf('STATS ATUAIS'));const iv=[],st=[];['HP','ATK','DEF','SP.ATK','SP.DEF','SPD'].forEach(k=>{const m=at.match(new RegExp('\\n'+k.replace('.','\\.')+'\\s*\\n\\s*([\\d.]+)\\s*\\n\\s*IV\\s*(\\d+)'));st.push(m?num(m[1]):0);iv.push(m?+m[2]:0);});
 return{pokeId:esp?+esp[1]:null,especie:esp?esp[2].trim():'',iv,st,hpCombate:num((t.match(/HP de combate\s*\n\s*([\d.]+)/)||[])[1])};}
// nota rápida só com o card (IV somado espalhado por igual) — para escolher quem vale abrir a ficha
// conta rápida só com o card (IV somado espalhado por igual): mesmo método — prioridade dos stats-base + categoria dos golpes, Q e potência
function notaRapida(o){const c=(o.pokeId!=null&&ESP&&ESP[o.pokeId])||espNome(o.nome);if(!c||!o.iv||o.iv.length!==6)return null;const B=baseDe(c),fp=funcaoDe(c,o.nv||100).fp;return notaCombate(B,pesosMetodo(B,fp),o);}
// ---------- Otimização
function otimizarEquipe(meus,rivais){const A=meus.map(lutador).filter(Boolean);if(!A.length)return{erro:'Não achei pokémon seus para montar a equipe.'};
 const RT=rivais.map(r=>({r,f:r.time.map(lutador).filter(Boolean)})).filter(x=>x.f.length);if(!RT.length)return{erro:'O Tracker não trouxe times de rivais.'};
 const B=[];const idx=[];RT.forEach(x=>{idx.push(x.f.map(f=>{B.push(f);return B.length-1;}));});
 const M={hpA:A.map(a=>a.hp),hpB:B.map(b=>b.hp),ab:A.map(a=>B.map(b=>dps(a,b))),ba:B.map(b=>A.map(a=>dps(b,a)))};
 // pré-seleção: 1×1 médio contra todos os pokémon rivais
 // pré-seleção: 60% duelo 1×1 médio contra os rivais + 40% nota do método (prioridade dos stats-base, categoria, Q, potência)
 const um=A.map((a,i)=>{let s=0;B.forEach((b,j)=>{const tA=M.hpB[j]/M.ab[i][j],tB=M.hpA[i]/M.ba[j][i];s+=tB/(tA+tB);});const n=notaRapida(a.o);return{i,s:.6*s/B.length+.4*(n==null?.5:n/10),nota:n};}).sort((x,y)=>y.s-x.s);
 const pool=um.slice(0,Math.min(9,um.length)).map(o=>o.i);const k=Math.min(5,pool.length);
 const w=RT.map(x=>1/(1+Math.abs((x.r.pr||0)-(MD.an.rivais?.meuPR||0))/150));const W=w.reduce((a,b)=>a+b,0);
 const nota=perm=>{let s=0;for(let r=0;r<idx.length;r++){const x=simular(perm,idx[r],M);s+=w[r]*((x.ganhou?1:0)+0.15*Math.tanh(x.margem));}return s/W;};
 let melhor=null;for(const perm of permutacoes(pool,k)){const s=nota(perm);if(!melhor||s>melhor.s)melhor={perm,s};}
 const chance=perm=>{let v=0;const N=40;const ruido=()=>(0.85+Math.random()*0.15)/0.925*(0.9+Math.random()*0.2);const por=idx.map((ib,r)=>{let g=0;for(let t=0;t<N;t++)if(simular(perm,ib,M,ruido).ganhou)g++;v+=w[r]*g/N;return g/N;});return{total:v/W,por};};
 const ch=chance(melhor.perm);
 const avaliarIds=ids=>{const p=ids.map(id=>A.findIndex(a=>String(a.id)===String(id))).filter(i=>i>=0);return p.length?chance(p).total:null;};
 return{t:Date.now(),s:melhor.s,chance:ch.total,time:melhor.perm.map(i=>({id:A[i].id,nome:A[i].nome,nv:A[i].nv,shiny:A[i].shiny,tipos:A[i].tipos,hp:A[i].hp})),
  rivais:RT.map((x,r)=>({nick:x.r.nick,pr:x.r.pr,chance:ch.por[r],time:x.f.map(f=>f.nome+' '+f.nv+(f.shiny?'✨':'')).join(', ')})).sort((a,b)=>a.chance-b.chance),
  nMeus:A.length,nRivais:RT.length,avaliarIds};}
// ---------- Ciclo completo
// ---------- aviso na tela (fora do painel: aparece mesmo com o Esclerobot fechado)
let avisoHost=null,avisoTimer=null;
// v49: no app (window.__esclMulti) o bot não desenha NADA dentro da tela do jogo — os avisos vão para o app,
// que mostra na própria janela com o nome da conta.
const MULTI=!!window.__esclMulti;let AVISOS=[],avisoSeq=0;
function avisoPokebot(a){if(MULTI){AVISOS.push({id:++avisoSeq,t:Date.now(),tipo:a.tipo||'ok',tit:String(a.tit||''),txt:String(a.txt||''),sub:String(a.sub||'')});AVISOS=AVISOS.slice(-15);return;}try{if(!avisoHost){avisoHost=document.createElement('div');avisoHost.setAttribute('data-pokebot-aviso','');avisoHost.style.cssText='position:fixed;left:50%;transform:translateX(-50%);z-index:2147483001;';document.body.append(avisoHost);avisoHost.attachShadow({mode:'open'});}
 // com a janela do Esclerobot aberta o aviso desce para não cobrir o topo dela
 if(aberto()){avisoHost.style.top='';avisoHost.style.bottom='24px';}else{avisoHost.style.bottom='';avisoHost.style.top='78px';}
 const cor=a.tipo==='erro'?'#ff8270':a.tipo==='info'?'#f2c94c':'#2fa56a';
 avisoHost.shadowRoot.innerHTML=`<style>:host{all:initial}*{box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
 .av{display:flex;gap:12px;align-items:flex-start;width:min(440px,calc(100vw - 32px));background:#1d1612;color:#f3ece6;border:1px solid #6b3a22;border-left:4px solid ${cor};border-radius:12px;padding:12px 14px;box-shadow:0 18px 50px #000b;animation:ent .25s ease-out;cursor:pointer}
 .av.sai{animation:sai .3s ease-in forwards}@keyframes ent{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:none}}@keyframes sai{to{opacity:0;transform:translateY(-12px)}}
 b{display:block;font:800 14px/1.25 ui-monospace,Menlo,monospace;letter-spacing:.02em;color:${cor}}p{margin:4px 0 0;font-size:12.5px;line-height:1.4;color:#e6dcd4}small{display:block;margin-top:4px;font-size:11px;color:#9c877a}
 .x{margin-left:auto;background:none;border:0;color:#b8a497;font-size:18px;line-height:1;cursor:pointer;padding:0 0 0 6px}.x:hover{color:#fff}@media (prefers-reduced-motion:reduce){.av,.av.sai{animation:none}}</style>
 <div class="av" role="status" aria-live="polite">${LOGO(26)}<div><b>${esc(a.tit)}</b><p>${esc(a.txt)}</p>${a.sub?`<small>${esc(a.sub)}</small>`:''}</div><button class="x" aria-label="Fechar aviso">×</button></div>`;
 const el=avisoHost.shadowRoot.querySelector('.av');const fechar=()=>{clearTimeout(avisoTimer);el.classList.add('sai');setTimeout(()=>{if(avisoHost)avisoHost.shadowRoot.innerHTML='';},320);};
 el.onclick=fechar;clearTimeout(avisoTimer);avisoTimer=setTimeout(fechar,a.ms||9000);}catch(e){console.warn('[Esclerobot] aviso',e);}}
function forcaHunt(m){const L=lutador(m);if(!L)return null;const k=L.nv/L.Le;const A={...L,Le:L.nv,atk:L.atk*k,spa:L.spa*k,hp:L.hp*k};
 const alvo={tipos:[],def:Math.max(40,L.nv),spd:Math.max(40,L.nv),Le:L.nv,atk:1,spa:1,hp:1,g:[],ivSpd:0};const d=dps(A,alvo);
 const cob=new Set();A.g.forEach(g=>TODOS_TIPOS.forEach(t=>{if(efet(g.t,[t])>=2)cob.add(t);}));return{m,L:A,dps:d,hp:A.hp,score:d*Math.sqrt(A.hp),cob,tipos:A.tipos};}
// ---------- utilidades que ficaram (antes moravam nos módulos removidos na v41)
const modalCm=()=>modais().find(x=>x.querySelector('.cm-filtro'));
const nivelTreinador=()=>{const t=(document.querySelector('.tr-topo')||document.querySelector('#tr-nick')?.parentElement)?.innerText||'';return num((t.match(/Nv\s*([\d.]+)/)||[])[1])||0;};
const dialogoConfirmar=()=>[...document.querySelectorAll('.caixa-confirmar')].find(x=>x.offsetParent)||null;
// ============================ MÓDULO — ANALISADOR DE POKÉMON (ficha) E DE EQUIPE ============================
const TODOS_TIPOS=Object.keys(TIPOS);
const ROMANO={I:1,II:2,III:3,IV:4,V:5};
const pctS=x=>Math.round(x*100)+'%';
const nomeCurto=s=>String(s||'').replace(/^✨\s*/,'');
// ---------- leitura completa de uma ficha aberta (qualquer pokémon: seu ou de outro treinador)
function lerFichaCompleta(f){const t=f.innerText;const b=lerFicha(f);
 const cab=(t.match(/\n\s*(✨\s*)?(?:Shiny\s+)?([^\n]+?)\s+Nv\s*([\d.]+)\s*\n/)||[]);
 return{...b,id:(t.match(/Identidade\s*\n?\s*#(\d+)/)||[])[1]||null,nome:b.especie||(cab[2]||'').trim(),nv:num((t.match(/\bNv\s*([\d.]+)/)||[])[1])||1,
  shiny:/✨|\bSHINY\b/.test(t.slice(0,500)),pot:ROMANO[(t.match(/Potência\s*\n\s*(I{1,3}|IV|V)\s*\n/)||[])[1]]||num(((t.match(/\bP(\d)\b/)||[])[1]))||1,
  q:num((t.match(/\bQ\s*([\d,]+)/)||t.match(/qualidade\s*\n\s*([\d]+,[\d]+)/i)||[])[1])||1,nJogo:num((t.match(/\bN\s*([\d,]+)/)||[])[1]),base:lerBaseFicha(t),ref:refinoDe(f)};}
// selo "+N" de refino que o jogo mostra ao lado do nome (ficha e cards); 0 = nunca refinado
const refinoDe=el=>{const s=el&&el.querySelector('.selo-refino');return s?num((s.textContent||'').replace(/\D/g,''))||0:0;};
// stats-base da espécie como aparecem na ficha (já somam o refino +N, se houver)
function lerBaseFicha(t){const i=t.indexOf('STATS-BASE');if(i<0)return null;const bl=t.slice(i);const r=['HP','ATK','DEF','SP.ATK','SP.DEF','SPD'].map(k=>{const m=bl.match(new RegExp('\\n'+k.replace('.','\\.')+'\\s*\\n\\s*(\\d+)'));return m?+m[1]:0;});return r.slice(0,5).every(x=>x>0)?r:null;}
// ---------- conta do pokémon
// ===== MÉTODO DE ANÁLISE (v13) =====
// 1) Prioridade vem dos stats-base da espécie (barra maior → prioridade maior), SEM a SPD.
// 2) A categoria dos golpes decide o ataque: físico → ATK; especial → Sp.ATK; o outro não conta (misto divide).
//    O ataque da categoria vale tanto quanto o stat-base principal (é PvP: é ele que tira HP do rival).
// 3) Qualidade multiplica os stats exponencialmente (Q^0,95 no HP, Q^0,8 nos outros) e a potência soma % no final.
const NOMES5=['HP','ATK','DEF','Sp.ATK','Sp.DEF'];
function pesosMetodo(B,fp){const maxB=Math.max(...B.slice(0,5));const r=x=>Math.pow(x/maxB,1.5);
 return[r(B[0]),fp*Math.max(1,r(B[1])),r(B[2]),(1-fp)*Math.max(1,r(B[3])),r(B[4]),0];}
 // só para quando não há stats-base
function analiseIVs(B,fp,iv){const w=pesosMetodo(B,fp);const idx=[0,1,2,3,4].filter(i=>w[i]>0.05);
 // prioridade: ordem dos pesos (ataque da categoria incluso), maior primeiro
 const atq=i=>i===1||i===3?1:0;const ordem=idx.slice().sort((a,b)=>(Math.abs(w[b]-w[a])>1e-9?w[b]-w[a]:0)||atq(b)-atq(a)||B[b]-B[a]);/* empate: o ataque da categoria vem primeiro */const prio={};ordem.forEach((i,k)=>prio[i]=k+1);
 const ivs=idx.map(i=>iv[i]),ws=idx.map(i=>w[i]);const real=idx.reduce((s,i)=>s+w[i]*iv[i],0);
 const desc=a=>a.slice().sort((x,y)=>y-x),asc=a=>a.slice().sort((x,y)=>x-y);
 const ideal=desc(ws).reduce((s,x,k)=>s+x*desc(ivs)[k],0),pior=desc(ws).reduce((s,x,k)=>s+x*asc(ivs)[k],0);
 const alocacao=ideal-pior<1e-9?1:(real-pior)/(ideal-pior);
 const aproveitamento=idx.reduce((s,i)=>s+w[i]*iv[i],0)/(32*idx.reduce((s,i)=>s+w[i],0));
 const linhas=[0,1,2,3,4].map(i=>{const usa=w[i]>0.05;let papel=!usa?'não usa':i===(fp>=.5?1:3)?'ataque da categoria':prio[i]===1?'principal':'defesa';if(usa&&(i===1||i===3)&&!(i===(fp>=.5?1:3)))papel='ataque (misto)';
  let st='ok',obs='';if(!usa){if(iv[i]>=20){st='no';obs='IV desperdiçado';}else{st='neutro';obs='não entra na conta';}}
  else{const acima=idx.filter(j=>prio[j]>prio[i]&&iv[j]-iv[i]>=8);if(iv[i]<=10){st='no';obs='IV baixo num stat que ele usa';}else if(acima.length){st='mid';obs=`IV menor que em ${acima.map(j=>NOMES5[j]).join(', ')}, que pesam menos`;}else if(iv[i]>=24)obs='bem alocado';}
  return{i,nome:NOMES5[i],base:B[i],iv:iv[i],peso:w[i],prio:usa?prio[i]:null,papel,st,obs};});
 return{w,alocacao,aproveitamento,linhas,ordem:ordem.map(i=>NOMES5[i])};}
function funcaoDe(c,nv){const gs=golpesDaEspecie(c,nv);let f=0,e=0;gs.forEach(g=>{const v=g.p/Math.max(1,g.cd);if(g.c==='F')f+=v;else e+=v;});
 if(!gs.length)return{fp:.5,rot:'Misto',gs};const fp=f/Math.max(1e-9,f+e);return{fp,rot:fp>.8?'Físico':fp<.2?'Especial':'Misto',gs};}
function somaForca(B,w,iv,q,p,s){let r=0;for(let i=0;i<6;i++)r+=w[i]*(B[i]+2*iv[i])*Math.pow(q,E_[i])*p*s;return r;}
function notaCombate(B,w,M){const lo=somaForca(B,w,[1,1,1,1,1,1],.8,1,1),hi=somaForca(B,w,[32,32,32,32,32,32],1.8,2,3),me=somaForca(B,w,M.iv,M.q||1,POT[M.pot]||1,M.shiny?3:1);
 return Math.max(0,Math.min(10,10*Math.log(me/lo)/Math.log(hi/lo)));}
function defesaTipos(tipos){const r={fraco:[],resiste:[],imune:[]};TODOS_TIPOS.forEach(t=>{const m=efet(t,tipos);if(m===0)r.imune.push(t);else if(m>=2)r.fraco.push({t,m});else if(m<=.5)r.resiste.push({t,m});});return r;}
function coberturaGolpes(gs){const tg=[...new Set(gs.map(g=>g.t))];return TODOS_TIPOS.filter(d=>tg.some(t=>efet(t,[d])>=2));}
function faixaNota(n){return n>=8?['Lendário','ok']:n>=7?['Mítico','ok']:n>=6?['Poderoso','ok']:n>=5?['Forte','ok2']:n>=4?['Bom','ok2']:n>=3?['Razoável','mid']:n>=2?['Mediano','mid']:['Fraco','no'];}
// ---------- meta do Tracker (cache 6 h)
async function lerMeta(){const m=MD.pk.meta;if(m&&Date.now()-m.em<6*36e5&&m.linhas&&m.linhas.length)return m;
 try{const d=await tracker('meta',{limite:60});MD.pk.meta={em:Date.now(),amostra:d.amostra||0,linhas:(d.linhas||[]).map(x=>({nome:x.nome,tipos:(x.tipos||[]).map(String),uso:(x.entradas||x.partidas||0)/Math.max(1,d.amostra||1),win:x.winrate||0,partidas:x.partidas||0}))};salvarM();}catch(e){}
 return MD.pk.meta||{linhas:[]};}
function usoMeta(nome,meta){const n=String(nome).toLowerCase();return(meta.linhas||[]).find(x=>String(x.nome).toLowerCase()===n)||null;}
// 1×1 contínuo: fração do tempo que o outro leva para me derrubar
function umContraUm(A,B){const tA=B.hp/dps(A,B),tB=A.hp/dps(B,A);return tB/(tA+tB);}
// ---------- análise de UM pokémon
async function analisarPokemon(M){await especies();const c=(M.pokeId!=null&&ESP[M.pokeId])||espNome(M.nome);if(!c)return{erro:'Não achei essa espécie nos dados do jogo.'};
 const B=(M.base&&M.base.length>=5?M.base.concat([0]).slice(0,6).map((x,i)=>x||baseDe(c)[i]):baseDe(c)),F=funcaoDe(c,M.nv);const iv=M.iv&&M.iv.length===6&&M.iv.some(x=>x>0)?M.iv:null;
 if(!iv)return{erro:'Não consegui ler os IVs da ficha.'};
 const AI=analiseIVs(B,F.fp,iv),w=AI.w;
 const nota=notaCombate(B,w,{...M,iv});const encaixe=Math.round(100*AI.alocacao);const aproveitamento=Math.round(100*AI.aproveitamento);
 const qMult=Math.pow(M.q||1,0.8),qHp=Math.pow(M.q||1,0.95),potPct=Math.round(((POT[M.pot]||1)-1)*100);
 const tipos=tiposDe(c),def=defesaTipos(tipos),cob=coberturaGolpes(F.gs);
 const L=lutador({...M,pokeId:c.pokeId,iv});const meta=await lerMeta();const riv=MD.an.rivais; // rivais: só do cache (ler o Tracker inteiro deixaria a ficha lenta)
 // contra o meta (top 12 mais usados) e contra os pokémon dos rivais do seu PR
 const metaTop=(meta.linhas||[]).slice(0,12).map(x=>({x,f:lutador({nome:x.nome,nv:150})})).filter(o=>o.f);
 const vsMeta=metaTop.map(o=>({nome:o.x.nome,uso:o.x.uso,s:umContraUm(L,o.f)}));
 const poolR=[];(riv&&riv.lista||[]).forEach(r=>r.time.forEach(p=>{const f=lutador(p);if(f)poolR.push(f);}));
 const vsRivais=poolR.length?poolR.reduce((s,f)=>s+(umContraUm(L,f)>.5?1:0),0)/poolR.length:null;
 const pesoMeta=vsMeta.reduce((s,v)=>s+v.uso,0)||1;const vsMetaPct=vsMeta.length?vsMeta.reduce((s,v)=>s+v.uso*(v.s>.5?1:0),0)/pesoMeta:null;
 const u=usoMeta(c.name,meta);const fin=(()=>{let x=c,n=0;while(x&&x.evolvesToId&&ESP[x.evolvesToId]&&n++<5)x=ESP[x.evolvesToId];return x!==c?x:null;})();
 const notaFinal=fin?(()=>{const Bf=baseDe(fin),ff=funcaoDe(fin,Math.max(M.nv,100)).fp;return notaCombate(Bf,pesosMetodo(Bf,ff),{...M,iv});})():null;
 // pontos fortes / fracos / dicas
 const fortes=[],fracos=[],dicas=[];const [fx,fc]=faixaNota(nota);
 if(nota>=5)fortes.push(`Nasceu bem para a função: nota ${nota.toFixed(1)} (${fx}).`);else if(nota<3)fracos.push(`Nota de combate baixa (${nota.toFixed(1)}): nasceu fraco para a função.`);
 if(encaixe>=85)fortes.push(`IVs bem alocados: os maiores estão nos stats que a espécie e os golpes ${F.rot==='Físico'?'físicos':F.rot==='Especial'?'especiais':'mistos'} priorizam (alocação ${encaixe}%).`);else if(encaixe<60)fracos.push(`IVs mal alocados para a espécie: os maiores não estão nos stats prioritários (alocação ${encaixe}%). Ordem ideal: ${AI.ordem.join(' > ')}.`);
 if(aproveitamento>=70)fortes.push(`IVs altos onde importa (${aproveitamento}% do máximo nos stats que ele usa).`);else if(aproveitamento<45)fracos.push(`IVs baixos nos stats que ele usa (${aproveitamento}% do máximo).`);
 if((M.q||1)>=1.4)fortes.push(`Qualidade ${String(M.q).replace('.',',')}: multiplica os stats por ×${qMult.toFixed(2).replace('.',',')} (HP ×${qHp.toFixed(2).replace('.',',')}).`);else if((M.q||1)<1)fracos.push(`Qualidade ${String(M.q).replace('.',',')} abaixo de 1: corta os stats (×${qMult.toFixed(2).replace('.',',')}).`);
 AI.linhas.filter(l=>l.st==='mid').slice(0,2).forEach(l=>fracos.push(`${l.nome} (prioridade ${l.prio}) com IV ${l.iv}: ${l.obs}.`));
 if(F.fp>.8&&iv[3]>=20)fracos.push(`IV ${iv[3]} em Sp.ATK desperdiçado: os golpes dele são físicos.`);
 if(F.fp<.2&&iv[1]>=20)fracos.push(`IV ${iv[1]} em ATK desperdiçado: os golpes dele são especiais.`);
 if(F.fp>.8&&B[3]>B[1])dicas.push(`A espécie tem Sp.ATK-base maior (${B[3]}) que ATK (${B[1]}), mas os golpes são físicos: para PvP o que vale é o ATK.`);
 if(F.fp<.2&&B[1]>B[3])dicas.push(`A espécie tem ATK-base maior (${B[1]}) que Sp.ATK (${B[3]}), mas os golpes são especiais: para PvP o que vale é o Sp.ATK.`);
 const principal=F.fp>=.5?1:3,nomeP=F.fp>=.5?'ATK':'Sp.ATK';if(iv[principal]<=12)fracos.push(`IV ${iv[principal]} no ${nomeP}, que é o stat que ele usa para bater.`);
 if(iv[0]>=26&&AI.linhas[0].prio&&AI.linhas[0].prio<=2)fortes.push(`HP alto (IV ${iv[0]}) num stat prioritário da espécie.`);
 if(M.shiny)fortes.push('Shiny: ×3 em todos os stats.');if((M.pot||1)>=2)fortes.push(`Potência P${M.pot}: +${potPct}% nos stats finais.`);
 if(vsMetaPct!=null){if(vsMetaPct>=.6)fortes.push(`Ganha 1×1 de ${pctS(vsMetaPct)} do meta (pesado pelo uso).`);else if(vsMetaPct<.35)fracos.push(`Perde 1×1 para a maior parte do meta (ganha só ${pctS(vsMetaPct)}).`);}
 const piores=vsMeta.filter(v=>v.s<.4).sort((a,b)=>b.uso-a.uso).slice(0,3);if(piores.length)fracos.push(`Sofre contra ${piores.map(v=>`${v.nome} (${pctS(v.uso)} do meta)`).join(', ')}.`);
 const melhores=vsMeta.filter(v=>v.s>.6).sort((a,b)=>b.uso-a.uso).slice(0,3);if(melhores.length)fortes.push(`Bate bem em ${melhores.map(v=>v.nome).join(', ')}.`);
 if(def.fraco.some(x=>x.m>=4))fracos.push(`Fraqueza ×4 a ${def.fraco.filter(x=>x.m>=4).map(x=>x.t).join(', ')}.`);
 if(u)(u.win>=.5?fortes:fracos).push(`No PvP da temporada: ${pctS(u.uso)} de presença e ${pctS(u.win)} de vitórias.`);
 if(M.nv<150)dicas.push(`Suba até o Nv 150: no PvP o nível conta inteiro até 150 (hoje Nv ${M.nv}).`);
 else if(M.nv>150)dicas.push(`Acima do Nv 150 o PvP comprime o nível (Nv ${M.nv} conta como ${Math.round(nivelPvp(M.nv))}); refino e potência rendem mais que nível.`);
 if(fin&&notaFinal!=null)dicas.push(`Evolui para ${fin.name}${c.evolveLevel?` no Nv ${c.evolveLevel}`:''}: com os mesmos IVs a nota vira ${notaFinal.toFixed(1)}.`);
 dicas.push(`No refino, priorize ${nomeP}${F.fp>.2&&F.fp<.8?' e o outro ataque':''} e depois HP: é o que mais pesa na função ${F.rot.toLowerCase()}.`);
 if(nota<3&&!M.shiny&&(M.pot||1)<4)dicas.push('Vale mais como material (Oferenda ou venda) do que como lutador.');
 if(cob.length<4)dicas.push(`Pouca cobertura: os golpes dele só batem forte em ${cob.join(', ')||'nenhum tipo'}. Combine com pokémon de outros tipos.`);
 const pvp=vsMetaPct!=null?vsMetaPct:.5;
 // veredito coerente com a nota: nascimento fraco não vira "Excelente" só por ganhar 1×1
 const veredito=nota>=5.5&&pvp>=.55?['Excelente','ok']:(nota>=4&&pvp>=.45)||nota>=5.5?['Bom para PvP','ok2']:nota>=2.5||pvp>=.5?['Serve, mas dá para achar melhor','mid']:['Fraco','no'];
 if(nota<4&&pvp>=.6)fortes.push('Nasceu mediano, mas a espécie e o nível compensam: ganha a maioria dos duelos contra o meta.');
 return{t:Date.now(),id:M.id,nome:c.name,nv:M.nv,shiny:M.shiny,pot:M.pot,q:M.q,tipos,funcao:F.rot,fp:F.fp,nota,faixa:[fx,fc],encaixe,iv,
  base:B,alocacao:encaixe,aproveitamento,linhasIV:AI.linhas,ordemIdeal:AI.ordem,qMult,qHp,potPct,
  hp:L.hp,forca:Math.round(L.atk*F.fp+L.spa*(1-F.fp)),def,cob,vsMeta:vsMeta.sort((a,b)=>b.uso-a.uso),vsMetaPct,vsRivais,uso:u,fin:fin?fin.name:null,notaFinal,veredito,fortes,fracos,dicas};}
// ---------- painel ao lado da ficha
let pkHost=null;
let pkSolto=false;
function fecharPainelPk(){if(pkHost){pkHost.remove();pkHost=null;}pkSolto=false;}
function posPainel(){if(!pkHost)return;const f=pkSolto?null:fichaAberta();if(!f){if(!pkSolto){fecharPainelPk();return;}const W=Math.min(380,innerWidth-24);pkHost.style.left=Math.max(8,innerWidth-W-12)+'px';pkHost.style.top='60px';pkHost.style.width=W+'px';pkHost.style.maxHeight=(innerHeight-68)+'px';return;}const r=f.getBoundingClientRect(),W=Math.min(380,innerWidth-24);
 let x=r.right+10;if(x+W>innerWidth-8)x=r.left-W-10;if(x<8){x=Math.max(8,innerWidth-W-8);}
 pkHost.style.left=x+'px';pkHost.style.top=Math.max(8,r.top)+'px';pkHost.style.width=W+'px';pkHost.style.maxHeight=(innerHeight-Math.max(8,r.top)-8)+'px';}
const CSS_PK=`:host{all:initial}*{box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
.pp{background:#1d1612;color:#f3ece6;border:1px solid #6b3a22;border-radius:14px;box-shadow:0 24px 80px #000c;font-size:12.5px;display:flex;flex-direction:column;max-height:inherit;overflow:hidden}
.tp{display:flex;align-items:center;gap:9px;padding:10px 12px;background:#2a1d16;border-bottom:1px solid #4a2c1d}.tp h3{margin:0;flex:1;font:700 13px/1.2 ui-monospace,Menlo,monospace;letter-spacing:.05em}
.x{background:#34241b;border:1px solid #6b3a22;color:#f3ece6;cursor:pointer;font-size:15px;width:26px;height:26px;border-radius:7px}.x:hover{background:#43301f}
.cp{padding:12px;display:flex;flex-direction:column;gap:11px;overflow:auto}
.big{display:flex;gap:12px;align-items:center}.nt{font:800 30px/1 ui-monospace,Menlo,monospace}.nt small{font-size:13px;color:#9c877a}
.vd{font:700 13px/1.2 inherit}.sub{color:#b8a497;font-size:11.5px;margin-top:3px}
.chips{display:flex;flex-wrap:wrap;gap:4px}.tg{font:700 10px/1 ui-monospace,Menlo,monospace;padding:4px 6px;border-radius:6px;background:#34241b;border:1px solid #4a2c1d}
.sec{font:700 10.5px ui-monospace,Menlo,monospace;color:#b8a497;letter-spacing:.08em;text-transform:uppercase;margin-bottom:5px}
ul{margin:0;padding-left:16px;display:flex;flex-direction:column;gap:4px}li{line-height:1.4}
.ivs{display:grid;grid-template-columns:repeat(6,1fr);gap:4px;text-align:center}.iv{background:#261b15;border:1px solid #3a261b;border-radius:7px;padding:5px 2px}.iv b{display:block;font-size:13px}.iv small{font-size:9.5px;color:#9c877a}.iv.use{border-color:#f0672a}
table{width:100%;border-collapse:collapse;font-size:11.5px}td{padding:3px 4px;border-bottom:1px solid #33241b}td:last-child{text-align:right;font-variant-numeric:tabular-nums}
.ok{color:#7ff0b4}.ok2{color:#b6e38a}.mid{color:#f2c94c}.no{color:#ff8270}.nota{font-size:10.5px;color:#9c877a;line-height:1.4}
.bar{height:6px;background:#34241b;border-radius:6px;overflow:hidden}.bar i{display:block;height:100%;background:#f0672a}
.bt{border:1px solid #6b3a22;background:#34241b;color:#fff;border-radius:8px;padding:6px 9px;font:600 11.5px inherit;cursor:pointer}.bt.pri{background:#f0672a;border-color:#f0672a}.bt:hover{filter:brightness(1.12)}.bt:focus-visible{outline:2px solid #ffb088;outline-offset:1px}`;
function htmlAnalise(a){if(a.erro)return`<div class="cp"><div class="no">${esc(a.erro)}</div></div>`;
 const li=arr=>arr.length?`<ul>${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<div class="nota">Nada a destacar.</div>';
 return`<div class="cp">
 <div class="big"><div class="nt ${a.faixa[1]}">${a.nota.toFixed(1)}<small>/10</small></div><div><div class="vd ${a.veredito[1]}">${esc(a.veredito[0])}</div><div class="sub">${a.shiny?'✨ ':''}${esc(a.nome)} Nv ${a.nv} · P${a.pot} · Q ${String(a.q).replace('.',',')} · ${esc(a.funcao)} · ${esc(a.faixa[0])}</div></div></div>
 <div class="chips">${a.tipos.map(t=>`<span class="tg">${t}</span>`).join('')}<span class="tg">HP ${a.hp.toLocaleString('pt-BR')}</span><span class="tg">alocação ${a.alocacao}%</span></div>
 <div><div class="sec">Stats-base × IVs (sem SPD)</div><table>
  <tr><td class="nota">Stat</td><td class="nota" style="text-align:right">Base</td><td class="nota" style="text-align:center">Prior.</td><td class="nota" style="text-align:right">IV</td><td class="nota">Papel</td></tr>
  ${a.linhasIV.slice().sort((x,y)=>(x.prio||9)-(y.prio||9)).map(l=>`<tr title="${esc(l.obs||'')}"><td>${l.nome}</td><td style="text-align:right">${l.base}<div class="bar" style="margin-top:2px"><i style="width:${Math.round(100*l.base/Math.max(...a.base.slice(0,5)))}%"></i></div></td><td style="text-align:center">${l.prio||'—'}</td><td class="${l.st==='ok'?(l.iv>=24?'ok':'ok2'):l.st==='mid'?'mid':l.st==='no'?'no':'nota'}" style="text-align:right"><b>${l.iv}</b></td><td style="text-align:left">${esc(l.papel)}${l.obs?`<div class="nota">${esc(l.obs)}</div>`:''}</td></tr>`).join('')}
 </table>
 <div class="nota" style="margin-top:5px">Alocação dos IVs: <b class="${a.alocacao>=85?'ok':a.alocacao>=60?'mid':'no'}">${a.alocacao}%</b> · IVs nos stats que usa: <b class="${a.aproveitamento>=70?'ok':a.aproveitamento>=45?'mid':'no'}">${a.aproveitamento}%</b> · Qualidade ×${a.qMult.toFixed(2).replace('.',',')} (HP ×${a.qHp.toFixed(2).replace('.',',')}) · Potência +${a.potPct}%${a.shiny?' · Shiny ×3':''} · SPD fora da conta (IV ${a.iv[5]})</div></div>
 <div><div class="sec">PvP</div><table>
  <tr><td>Ganha 1×1 do meta (pelo uso)</td><td class="${a.vsMetaPct>=.5?'ok':a.vsMetaPct>=.35?'mid':'no'}">${a.vsMetaPct==null?'—':pctS(a.vsMetaPct)}</td></tr>
  <tr><td>Ganha 1×1 dos pokémon dos rivais do seu PR</td><td>${a.vsRivais==null?'—':pctS(a.vsRivais)}</td></tr>
  ${a.uso?`<tr><td>Presença / vitórias da espécie na temporada</td><td>${pctS(a.uso.uso)} / ${pctS(a.uso.win)}</td></tr>`:''}
  ${a.vsMeta.slice(0,8).map(v=>`<tr><td>vs ${esc(v.nome)} <span class="nota">(${pctS(v.uso)} do meta)</span></td><td class="${v.s>.6?'ok':v.s>.45?'mid':'no'}">${v.s>.6?'ganha':v.s>.45?'parelho':'perde'}</td></tr>`).join('')}
 </table></div>
 <div><div class="sec">Tipos</div><div class="nota">Fraco a: <b class="no">${a.def.fraco.map(x=>x.t+(x.m>=4?' ×4':'')).join(', ')||'nada'}</b><br>Resiste: <b class="ok">${a.def.resiste.map(x=>x.t).join(', ')||'nada'}</b>${a.def.imune.length?`<br>Imune: <b class="ok">${a.def.imune.join(', ')}</b>`:''}<br>Golpes batem forte em: <b>${a.cob.join(', ')||'nenhum tipo'}</b></div></div>
 <div><div class="sec">Pontos fortes</div>${li(a.fortes)}</div>
 <div><div class="sec">Pontos fracos</div>${li(a.fracos)}</div>
 <div><div class="sec">Dicas</div>${li(a.dicas)}</div>
 <div class="nota">Nota = (base + 2·IV) × Q^e × potência × shiny, pesada pela prioridade dos stats-base da espécie (sem SPD) e pela categoria dos golpes (ataque físico ou especial). Alocação 100% = os maiores IVs estão exatamente nos stats de maior prioridade. PvP simulado com a fórmula de dano da wiki; rivais sem IV conhecido contam como IV ${RIVAL.iv}, Q ${String(RIVAL.q).replace('.',',')}, P${RIVAL.pot}.</div>
 </div>`;}
function abrirPainelPk(titulo,html){if(!pkHost){pkHost=document.createElement('div');pkHost.setAttribute('data-pokebot-analise','');pkHost.style.cssText='position:fixed;z-index:2147483002;display:flex;';document.body.append(pkHost);pkHost.attachShadow({mode:'open'});}
 pkHost.shadowRoot.innerHTML=`<style>${CSS_PK}</style><div class="pp" role="dialog" aria-label="Análise do Esclerobot"><div class="tp">${LOGO(20)}<h3>${esc(titulo)}</h3><button class="x" aria-label="Fechar análise">×</button></div>${html}</div>`;
 pkHost.shadowRoot.querySelector('.x').onclick=fecharPainelPk;posPainel();}
async function analisarFichaAberta(){const f=fichaAberta();if(!f)return null;pkSolto=false;const M=lerFichaCompleta(f);M.mercado=!!modalCm();
 abrirPainelPk('ANÁLISE · '+nomeCurto(M.nome).toUpperCase(),'<div class="cp"><div class="nota">Analisando… (lendo o meta e os rivais no Tracker)</div></div>');
 let a;try{a=await analisarPokemon(M);}catch(e){a={erro:'Falhou: '+(e&&e.message||e)};}
 const Mn={...M,nome:a&&!a.erro?a.nome:M.nome};
 if(a&&!a.erro){// só guarda como "seu" o que não veio do Mercado da Comunidade (lá são pokémon de outros jogadores)
  if(M.id&&!M.mercado){P.mons[M.id]=Object.assign(P.mons[M.id]||{},{id:M.id,nome:a.nome,pokeId:M.pokeId,nv:M.nv,shiny:M.shiny,pot:M.pot,q:M.q,iv:M.iv,st:M.st,base:M.base,lido:Date.now()});salvarP();}
  const sn=snapMon(Mn,{mercado:M.mercado});MD.pk.vistos=[sn,...(MD.pk.vistos||[]).filter(v=>!mesmoMon(v,sn))].slice(0,12);}
 if(fichaAberta()===f||fichaAberta()){abrirPainelPk('ANÁLISE · '+nomeCurto(M.nome).toUpperCase(),(a&&!a.erro?`<div data-cmp-bar>${barraComparar(Mn)}</div>`:'')+htmlAnalise(a));if(a&&!a.erro)ligarBarraComparar(Mn);}
 MD.pk.ult=a&&!a.erro?{t:a.t,nome:a.nome,nota:a.nota,v:a.veredito[0]}:MD.pk.ult;salvarM();return a;}
// ---------- COMPARAR 2 POKÉMON lado a lado (mesmo método do Analisador: nota, 1×1 contra o meta, duelo direto, hunt)
const snapMon=(M,extra)=>({id:M.id?String(M.id):null,nome:nomeCurto(M.nome),pokeId:M.pokeId??null,nv:M.nv||1,shiny:!!M.shiny,pot:M.pot||1,q:M.q||1,iv:(M.iv||[]).slice(0,6),st:M.st||null,base:M.base||null,t:Date.now(),...(extra||{})});
const rotuloMon=m=>`${m.shiny?'✨':''}${nomeCurto(m.nome)} Nv ${m.nv}${(m.pot||1)>1?' · P'+m.pot:''}${m.mercado?' · Mercado':''}${m.id?' · #'+m.id:''}`;
const mesmoMon=(x,y)=>!!x&&!!y&&(x.id&&y.id?String(x.id)===String(y.id):x.nome===y.nome&&x.nv===y.nv&&String(x.iv)===String(y.iv));
function guardarComparar(M){MD.pk.cmp=MD.pk.cmp||{};MD.pk.cmp.a=snapMon(M,{mercado:!!M.mercado});salvarM();}
function listaComparaveis(){const eu=Object.values(P.mons).filter(monValido).map(m=>snapMon(m));const vist=(MD.pk.vistos||[]).filter(v=>v&&v.iv&&v.iv.some(x=>x>0));
 const S=MD.pk.cmp||{};const extra=[S.a,S.b].filter(Boolean);const todos=[];const ja=new Set();
 [...eu.map(m=>({...m,grupo:'eu'})),...vist.map(m=>({...m,grupo:m.mercado?'mercado':'eu'})),...extra.map(m=>({...m,grupo:m.mercado?'mercado':'eu'}))].forEach(m=>{const k=m.id?'#'+m.id:m.nome+m.nv+m.iv;if(ja.has(k))return;ja.add(k);todos.push(m);});
 return todos.sort((a,b)=>a.nome.localeCompare(b.nome)||b.nv-a.nv);}
async function compararMons(A,B){await especies();const esp=M=>(M.pokeId!=null&&ESP[M.pokeId])||espNome(M.nome);
 const ca=esp(A),cb=esp(B);if(!ca||!cb)return{erro:`Não achei a espécie de ${!ca?A.nome:B.nome} nos dados do jogo.`};
 const a=await analisarPokemon(A),b=await analisarPokemon(B);if(a.erro||b.erro)return{erro:a.erro?`${A.nome}: ${a.erro}`:`${B.nome}: ${b.erro}`};
 const LA=lutador({...A,pokeId:ca.pokeId}),LB=lutador({...B,pokeId:cb.pokeId});
 const duelo=umContraUm(LA,LB);const tA=LB.hp/Math.max(1e-9,dps(LA,LB)),tB=LA.hp/Math.max(1e-9,dps(LB,LA));
 const hA=forcaHunt({...A,pokeId:ca.pokeId}),hB=forcaHunt({...B,pokeId:cb.pokeId});const hMax=Math.max(hA?.score||0,hB?.score||0)||1;
 const pvp=x=>.5*x.nota/10+.5*(x.vsMetaPct==null?.5:x.vsMetaPct);
 const r={t:Date.now(),A,B,a,b,LA,LB,duelo,tA,tB,pvpA:pvp(a),pvpB:pvp(b),huntA:hA?hA.score/hMax:null,huntB:hB?hB.score/hMax:null};
 // veredito
 const quem=(x,y,tol)=>Math.abs(x-y)<tol?0:x>y?1:-1;const nA=nomeCurto(a.nome),nB=nomeCurto(b.nome);const iguais=nA===nB;const lab=w=>w===1?'A':'B';
 const rz=[];const dN=a.nota-b.nota;if(Math.abs(dN)>=.3)rz.push(`nota ${Math.max(a.nota,b.nota).toFixed(1)} contra ${Math.min(a.nota,b.nota).toFixed(1)}`);
 if(a.vsMetaPct!=null&&b.vsMetaPct!=null&&Math.abs(a.vsMetaPct-b.vsMetaPct)>=.08)rz.push(`ganha ${pctS(Math.max(a.vsMetaPct,b.vsMetaPct))} do meta contra ${pctS(Math.min(a.vsMetaPct,b.vsMetaPct))}`);
 if(Math.abs(duelo-.5)>=.08)rz.push(`vence o duelo direto (${pctS(Math.max(duelo,1-duelo))})`);
 const wP=quem(r.pvpA,r.pvpB,.02);const wH=r.huntA!=null&&r.huntB!=null?quem(r.huntA,r.huntB,.03):0;
 const ver=[];
 ver.push(wP?{c:'ok',t:`Para PvP: ${lab(wP)} (${wP===1?nA:nB}) é melhor${rz.length?' — '+rz.slice(0,3).join(', '):''}.`}:{c:'mid',t:'Para PvP: praticamente empatados; escolha pelo tipo que falta na sua equipe.'});
 if(r.huntA!=null&&r.huntB!=null)ver.push(wH?{c:'ok',t:`Para hunt: ${lab(wH)} (${wH===1?nA:nB}) mata mais rápido e aguenta mais (o outro tem só ${Math.round(100*Math.min(r.huntA,r.huntB)/Math.max(r.huntA,r.huntB))}% da força de hunt dele).`}:{c:'mid',t:'Para hunt: parecidos.'});
 if(iguais)ver.push({c:'nota',t:`Mesma espécie: a diferença vem só de nível, IVs, qualidade, potência${A.shiny!==B.shiny?' e do shiny':''}.`});
 const perde=wP===1?{m:B,x:b}:wP===-1?{m:A,x:a}:null;
 if(perde&&iguais&&!perde.m.shiny&&(perde.m.pot||1)<4&&perde.x.nota<3&&!perde.m.mercado)ver.push({c:'nota',t:`${lab(perde===null?0:(perde.m===A?1:-1))} (${nomeCurto(perde.x.nome)} Nv ${perde.m.nv}) ficou bem atrás: serve mais como material (a Venda automática decide com as proteções de sempre).`});
 const merc=[A,B].find(m=>m.mercado),meu=[A,B].find(m=>!m.mercado);if(merc&&meu){const ganha=(merc===A?wP===1:wP===-1);ver.push({c:ganha?'ok':'no',t:ganha?`O do Mercado (${nomeCurto(merc.nome)}) é melhor que o seu para PvP: vale a compra se o preço couber.`:`O seu ${nomeCurto(meu.nome)} já é igual ou melhor para PvP: não precisa comprar esse.`});}
 r.veredito=ver;r.wP=wP;r.wH=wH;return r;}
// ---------- janela da comparação
let cmpHost=null;
const CSS_CMP=`.pp{width:min(680px,calc(100vw - 16px));max-height:calc(100vh - 24px)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.cab{background:#261b15;border:1px solid #3a261b;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:5px;position:relative}
.cab.win{border-color:#2fa56a;box-shadow:inset 0 0 0 1px #2fa56a55}.cab .lt{position:absolute;top:8px;right:10px;font:800 11px ui-monospace,Menlo,monospace;color:#9c877a}
.cab .nm{font:700 14px/1.2 inherit}.cab .nt{font-size:26px}
table.cmp td{padding:5px 6px}table.cmp td:nth-child(2),table.cmp td:nth-child(3){text-align:right;width:26%;font-variant-numeric:tabular-nums}table.cmp tr.h td{font-size:10.5px;color:#9c877a}
td.w{color:#7ff0b4;font-weight:700}td.w:after{content:" ▲";font-size:9px}
.ivrow{display:grid;grid-template-columns:52px repeat(6,1fr);gap:3px;align-items:center;font-size:11px}.ivrow .iv{padding:4px 2px}.ivrow .iv.mais{border-color:#2fa56a}.ivrow .iv.menos{opacity:.65}
.vd2 li{margin-bottom:2px}.duel{background:#261b15;border:1px solid #3a261b;border-radius:10px;padding:9px 10px;font-size:12px}
.duel .br{display:flex;height:10px;border-radius:10px;overflow:hidden;margin:6px 0}.duel .br i{display:block;height:100%}.duel .br i:first-child{background:#f0672a}.duel .br i:last-child{background:#6b8cff}`;
function fecharComparacao(){if(cmpHost){cmpHost.remove();cmpHost=null;}}
function abrirJanelaCmp(html){if(!cmpHost){cmpHost=document.createElement('div');cmpHost.setAttribute('data-pokebot-comparar','');cmpHost.style.cssText='position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:2147483003;display:flex;';document.body.append(cmpHost);cmpHost.attachShadow({mode:'open'});}
 cmpHost.shadowRoot.innerHTML=`<style>${CSS_PK}${CSS_CMP}</style><div class="pp" role="dialog" aria-label="Comparação do Esclerobot"><div class="tp">${LOGO(20)}<h3>⚖ COMPARAR POKÉMON</h3><button class="x" aria-label="Fechar comparação">×</button></div>${html}</div>`;
 cmpHost.shadowRoot.querySelector('.x').onclick=fecharComparacao;}
function htmlComparacao(r){if(r.erro)return`<div class="cp"><div class="no">${esc(r.erro)}</div></div>`;const{a,b,A,B,LA,LB}=r;
 const f1=v=>v.toFixed(1).replace('.',','),f0=v=>Math.round(v).toLocaleString('pt-BR'),pc=v=>v==null?'—':pctS(v);
 const linha=(rot,va,vb,fmt,maior=true,tol=0)=>{let wa='',wb='';if(va!=null&&vb!=null&&Math.abs(va-vb)>tol){const aMelhor=maior?va>vb:va<vb;wa=aMelhor?'w':'';wb=aMelhor?'':'w';}return`<tr><td>${rot}</td><td class="${wa}">${va==null?'—':fmt(va)}</td><td class="${wb}">${vb==null?'—':fmt(vb)}</td></tr>`;};
 const cab=(x,M,lt,win)=>`<div class="cab${win?' win':''}"><span class="lt">${lt}</span><div class="nm">${M.shiny?'✨ ':''}${esc(nomeCurto(x.nome))}</div><div class="sub">Nv ${M.nv} · P${M.pot||1} · Q ${String(M.q||1).replace('.',',')} · ${esc(x.funcao)}${M.mercado?' · do Mercado':''}${M.id?' · #'+esc(M.id):''}</div>
  <div class="chips">${x.tipos.map(t=>`<span class="tg">${t}</span>`).join('')}</div><div class="big"><div class="nt ${x.faixa[1]}">${f1(x.nota)}<small>/10</small></div><div class="vd ${x.veredito[1]}">${esc(x.veredito[0])}</div></div></div>`;
 const K=['HP','ATK','DEF','SpA','SpD','SPD'];const usaA=a.linhasIV.map(l=>l.prio!=null),usaB=b.linhasIV.map(l=>l.prio!=null);
 const ivs=(M,o,usa,lt)=>`<div class="ivrow"><b>${lt}</b>${M.iv.map((v,i)=>`<div class="iv ${i<5&&usa[i]?'use':''} ${v>o.iv[i]?'mais':v<o.iv[i]?'menos':''}"><b>${v}</b><small>${K[i]}</small></div>`).join('')}</div>`;
 const fr=x=>x.def.fraco.length,fr4=x=>x.def.fraco.filter(y=>y.m>=4).length;
 const metas=a.vsMeta.slice(0,8).map(v=>{const w=b.vsMeta.find(y=>y.nome===v.nome);const t=s=>s==null?'—':s>.6?'<span class="ok">ganha</span>':s>.45?'<span class="mid">parelho</span>':'<span class="no">perde</span>';return`<tr><td>vs ${esc(v.nome)} <span class="nota">(${pctS(v.uso)})</span></td><td>${t(v.s)}</td><td>${t(w?w.s:null)}</td></tr>`;}).join('');
 return`<div class="cp">
 <div class="two">${cab(a,A,'A',r.wP===1)}${cab(b,B,'B',r.wP===-1)}</div>
 <div><div class="sec">Veredito</div><ul class="vd2">${r.veredito.map(v=>`<li class="${v.c}">${esc(v.t)}</li>`).join('')}</ul></div>
 <div class="duel"><b>Duelo direto (1×1)</b> — ${r.duelo>=.5?`A (${esc(nomeCurto(a.nome))})`:`B (${esc(nomeCurto(b.nome))})`} leva ${pctS(Math.max(r.duelo,1-r.duelo))}
  <div class="br"><i style="width:${Math.round(r.duelo*100)}%"></i><i style="width:${100-Math.round(r.duelo*100)}%"></i></div>
  <span class="nota">A derruba B em ~${f0(r.tA)} s · B derruba A em ~${f0(r.tB)} s (nível de PvP, fórmula de dano da wiki).</span></div>
 <table class="cmp"><tr class="h"><td></td><td>A</td><td>B</td></tr>
  ${linha('Força PvP (0–100)',r.pvpA*100,r.pvpB*100,f0,true,1)}
  ${linha('Nota de combate',a.nota,b.nota,f1,true,.05)}
  ${linha('Ganha 1×1 do meta',a.vsMetaPct,b.vsMetaPct,pc,true,.01)}
  ${a.vsRivais!=null&&b.vsRivais!=null?linha('Ganha dos rivais do seu PR',a.vsRivais,b.vsRivais,pc,true,.01):''}
  ${linha('HP no PvP',a.hp,b.hp,f0,true)}
  ${linha(`Força de ataque`,a.forca,b.forca,f0,true)}
  ${linha('DEF efetiva',LA.def,LB.def,f0,true)}
  ${linha('Sp.DEF efetiva',LA.spd,LB.spd,f0,true)}
  ${r.huntA!=null&&r.huntB!=null?linha('Força na hunt (100 = o melhor dos dois)',r.huntA*100,r.huntB*100,f0,true,1):''}
  ${linha('Alocação dos IVs',a.alocacao,b.alocacao,v=>v+'%',true)}
  ${linha('IVs nos stats que usa',a.aproveitamento,b.aproveitamento,v=>v+'%',true)}
  ${linha('Nível',A.nv,B.nv,f0,true)}
  ${linha('Qualidade',A.q||1,B.q||1,v=>String(v).replace('.',','),true)}
  ${linha('Potência',A.pot||1,B.pot||1,v=>'P'+v,true)}
  ${linha('Shiny (×3)',A.shiny?1:0,B.shiny?1:0,v=>v?'sim':'não',true)}
  ${linha('Fraquezas de tipo',fr(a),fr(b),f0,false)}
  ${linha('Fraquezas ×4',fr4(a),fr4(b),f0,false)}
  ${linha('Tipos que os golpes batem forte',a.cob.length,b.cob.length,f0,true)}
 </table>
 <div><div class="sec">IVs (borda laranja = stat que ele usa · verde = maior que o do outro)</div>${ivs(A,B,usaA,'A')}${ivs(B,A,usaB,'B')}</div>
 <div><div class="sec">Contra o meta</div><table class="cmp"><tr class="h"><td></td><td>A</td><td>B</td></tr>${metas}</table></div>
 <div class="nota">Força PvP = 50% nota do método + 50% duelos 1×1 contra os 12 mais usados do meta (pelo uso). Hunt = dano por segundo × √HP no nível atual. Mesmo método do botão Analisar.</div></div>`;}
let cmpRodando=false;
async function mostrarComparacao(A,B){if(cmpRodando)return null;cmpRodando=true;abrirJanelaCmp('<div class="cp"><div class="nota">Comparando… (lendo o meta no Tracker)</div></div>');
 let r;try{r=await compararMons(A,B);}catch(e){r={erro:'Falhou: '+(e&&e.message||e)};}finally{cmpRodando=false;}
 if(!r.erro){MD.pk.cmp=MD.pk.cmp||{};MD.pk.cmp.a=snapMon(A,{mercado:!!A.mercado});MD.pk.cmp.b=snapMon(B,{mercado:!!B.mercado});MD.pk.cmp.ult={t:r.t,a:rotuloMon(A),b:rotuloMon(B),v:r.veredito[0].t};salvarM();}
 if(cmpHost)abrirJanelaCmp(htmlComparacao(r));pintar();return r;}
// barra "Comparar" no topo do painel de análise da ficha
function barraComparar(M){const S=(MD.pk.cmp||{}).a;const eu=snapMon(M,{mercado:!!M.mercado});
 if(S&&!mesmoMon(S,eu))return`<div class="cp" style="padding-bottom:0"><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap"><button class="bt pri" data-cmp="ir">⚖ Comparar com ${esc(rotuloMon(S))}</button><button class="bt" data-cmp="guardar" title="Guarda este no lugar do outro">guardar este</button></div></div>`;
 return`<div class="cp" style="padding-bottom:0"><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">${S&&mesmoMon(S,eu)?'<span class="nota">✔ Guardado para comparar. Abra a ficha de outro pokémon e clique em Analisar.</span>':'<button class="bt" data-cmp="guardar">⚖ Guardar para comparar</button><span class="nota">depois abra outra ficha e compare</span>'}</div></div>`;}
function ligarBarraComparar(M){if(!pkHost)return;const R2=pkHost.shadowRoot;
 R2.querySelectorAll('[data-cmp=guardar]').forEach(b=>b.onclick=()=>{guardarComparar(M);const bar=R2.querySelector('[data-cmp-bar]');if(bar){bar.innerHTML=barraComparar(M);ligarBarraComparar(M);}pintar();});
 R2.querySelectorAll('[data-cmp=ir]').forEach(b=>b.onclick=()=>{const S=(MD.pk.cmp||{}).a;if(S)mostrarComparacao(S,snapMon(M,{mercado:!!M.mercado}));});}
// botão "Analisar" dentro da ficha do jogo
function botaoFicha(){const f=fichaAberta();if(!f){if(pkHost&&!pkSolto)fecharPainelPk();return;}if(!liberado()||!C.pk.on||f.querySelector('[data-pokebot-analisar]'))return;if(!/STATS ATUAIS/.test(f.innerText))return;
 const ref=f.querySelector('#fi-baixar-nv')||f.querySelector('.fi-calc');const b=document.createElement('button');b.type='button';b.setAttribute('data-pokebot-analisar','');
 // sem as classes do jogo (evita que algum clique do jogo pegue o nosso botão); copia só a aparência
 const cs=ref?getComputedStyle(ref):null;b.innerHTML=`<span style="display:inline-flex;align-items:center;justify-content:center;gap:6px">${LOGO(14)}Analisar</span>`;
 b.style.cssText=cs?`font:${cs.font};padding:${cs.padding};border-radius:${cs.borderRadius};background:${cs.backgroundColor};color:${cs.color};width:${cs.width};margin:${cs.margin};border:1px solid #f0672a;cursor:pointer;display:block;`:'border:1px solid #f0672a;background:#34241b;color:#fff;border-radius:8px;padding:6px 10px;cursor:pointer;';b.title='Esclerobot: analisa se esse pokémon é bom (nota, IVs, tipos, meta do PvP)';
 b.onclick=e=>{e.preventDefault();e.stopPropagation();analisarFichaAberta();};
 if(ref)ref.after(b);else(f.querySelector('.modal-corpo')||f).prepend(b);}
let obsFicha=null;
function ligarObsFicha(){if(obsFicha||MULTI)return;const alvo=document.getElementById('ficha')||document.body;obsFicha=new MutationObserver(()=>{botaoFicha();if(pkHost)posPainel();});obsFicha.observe(alvo,{childList:true,subtree:true});botaoFicha();}
// ---------- análise de EQUIPE
async function lerFichaPor(abre,id){const antes=fichaAberta()?.innerText||'';if(!await clicar(abre))return null;
 await esperar(()=>{const x=fichaAberta();return x&&/STATS ATUAIS/.test(x.innerText)&&x.innerText!==antes&&(!id||x.innerText.includes('#'+id));},5000);
 const x=fichaAberta();const M=x?lerFichaCompleta(x):null;await clicar(()=>document.querySelector('#ficha-fechar'));await esperar(()=>!fichaAberta(),3000);return M;}
const monValido=m=>m&&m.iv&&m.iv.some(v=>v>0)&&m.st&&m.st[0]>0;
async function membrosEquipe(qual){if(qual==='hunt'){const L=[...document.querySelectorAll('#time .poke-linha[data-id], .poke-linha[data-id]')];const ids=[...new Set(L.map(l=>l.dataset.id))];
  const out=[];for(const id of ids){let m=P.mons[id];const linha=L.find(l=>l.dataset.id===id);const nv=num(((linha?.innerText||'').match(/Nv\s*([\d.]+)/)||[])[1]);
   if(!monValido(m)||(nv&&m.nv!==nv)){if(!C.ativo)throw new Error('Preciso abrir as fichas da equipe: ative o bot (ATIVADO) e tente de novo.');
    const M=await comTelaOu(()=>lerFichaPor(()=>document.querySelector(`.poke-linha[data-id="${id}"] .pl-ficha`),id));if(M){P.mons[id]=Object.assign(P.mons[id]||{},{...M,id});m=P.mons[id];}}
   if(monValido(m))out.push(m);}salvarP();return out;}
 // PvP: lê as casas da equipe de PvP
 if(!C.ativo)throw new Error('Preciso abrir a tela de PvP: ative o bot (ATIVADO) e tente de novo.');
 return await comTelaOu(async()=>{const m=await abrirMenu('pvp',x=>!!x.querySelector('.pvp-slots'));if(!m)throw new Error('A tela de PvP não abriu.');
  const ids=[...(modalPvp()?.querySelectorAll('.pvp-slot[data-pk]')||[])].map(s=>s.dataset.pk);const out=[];
  for(const id of ids){let mm=P.mons[id];if(!monValido(mm)){const M=await lerFichaPor(()=>modalPvp()?.querySelector(`.pvp-slot[data-pk="${id}"]`),id);if(M){P.mons[id]=Object.assign(P.mons[id]||{},{...M,id});mm=P.mons[id];}}if(monValido(mm))out.push(mm);}
  salvarP();return out;});}
// usa comTela se a tela estiver livre; se já estamos dentro de comTela, roda direto
async function comTelaOu(fn){if(usoTela)return fn();let r,erro=null;const ok=await comTela('equipe',async()=>{try{r=await fn();}catch(e){erro=e;}return true;});if(erro)throw erro;if(ok===false)throw new Error('Uma janela do jogo está aberta: feche e tente de novo.');return r;}
async function analisarEquipe(qual){await especies();const mons=await membrosEquipe(qual);if(!mons.length)return{erro:qual==='hunt'?'Não achei a sua equipe de hunt.':'A sua equipe de PvP está vazia.'};
 const meta=await lerMeta();let riv=MD.an.rivais;if(!riv||!riv.lista||!riv.lista.length){try{riv=await lerRivais(false);}catch(e){riv=null;}}
 const A=[];for(const m of mons){const a=await analisarPokemon(m);if(!a.erro)A.push({m,a,L:lutador({...m,iv:m.iv})});}
 const fortes=[],fracos=[],dicas=[];const n=A.length;
 // defesa da equipe
 const porTipo=TODOS_TIPOS.map(t=>{let fr=0,re=0;A.forEach(x=>{const e=efet(t,x.a.tipos);if(e>=2)fr++;else if(e<=.5)re++;});return{t,fr,re};});
 const buracos=porTipo.filter(x=>x.fr>=2&&x.re===0).sort((a,b)=>b.fr-a.fr);const muros=porTipo.filter(x=>x.re>=Math.max(2,Math.ceil(n/2))&&x.fr===0);
 const metaTipos=(meta.linhas||[]).slice(0,15);const ameacas=buracos.map(b=>({...b,meta:metaTipos.filter(x=>x.tipos.map(s=>s.toUpperCase()).includes(b.t)).reduce((s,x)=>s+x.uso,0)})).sort((a,b)=>b.meta-a.meta||b.fr-a.fr);
 ameacas.slice(0,3).forEach(b=>{const quem=TODOS_TIPOS.filter(t=>efet(b.t,[t])<=.5);fracos.push(`${b.fr} de ${n} apanham forte de ${b.t} e ninguém resiste${b.meta>.02?` (${pctS(b.meta)} do meta usa ${b.t})`:''}.`);dicas.push(`Coloque alguém que resista a ${b.t}: tipos ${quem.slice(0,6).join(', ')}.`);});
 if(muros.length)fortes.push(`A equipe segura bem golpes de ${muros.slice(0,5).map(x=>x.t).join(', ')}.`);
 // ataque da equipe
 const cob=new Set();A.forEach(x=>x.a.cob.forEach(t=>cob.add(t)));const semResp=metaTipos.filter(x=>!x.tipos.some(t=>cob.has(String(t).toUpperCase())));
 if(cob.size>=10)fortes.push(`Cobertura larga: os golpes da equipe batem forte em ${cob.size} dos 18 tipos.`);
 const semRespUso=semResp.reduce((s,x)=>s+x.uso,0);if(semResp.length&&semRespUso>.05)fracos.push(`Nenhum golpe bate forte em ${semResp.slice(0,4).map(x=>x.nome).join(', ')} (${pctS(semRespUso)} do meta).`);
 // repetição de tipos e funções
 const cont={};A.forEach(x=>x.a.tipos.forEach(t=>cont[t]=(cont[t]||0)+1));const rep=Object.entries(cont).filter(([,v])=>v>=3);rep.forEach(([t,v])=>{fracos.push(`${v} pokémon ${t}: pouca variedade de tipos.`);});
 const fis=A.filter(x=>x.a.fp>.6).length,esp=A.filter(x=>x.a.fp<.4).length;if(n>=3&&fis===n)dicas.push('Todos batem com ATK físico: um tank de DEF alta do rival segura a equipe inteira. Um atacante especial ajuda.');if(n>=3&&esp===n)dicas.push('Todos batem com Sp.ATK: um tank de Sp.DEF alta segura a equipe inteira. Um atacante físico ajuda.');
 // membros
 const media=A.reduce((s,x)=>s+x.a.nota,0)/Math.max(1,n);(media>=5?fortes:media<3.5?fracos:[]).push(`Nota média da equipe: ${media.toFixed(1)}.`);
 A.filter(x=>x.a.nota>=6).forEach(x=>fortes.push(`${x.a.nome}: nota ${x.a.nota.toFixed(1)} (${x.a.faixa[0]}).`));
 A.filter(x=>x.a.nota<3).forEach(x=>{fracos.push(`${x.a.nome} (Nv ${x.a.nv}) é o elo fraco: nota ${x.a.nota.toFixed(1)}.`);});
 A.forEach(x=>x.a.fracos.filter(s=>/desperdiçado/.test(s)).forEach(s=>dicas.push(`${x.a.nome}: ${s}`)));
 if(n<5)dicas.push(`A equipe tem ${n}/5: cada vaga vazia é um pokémon a menos para o rival derrubar.`);
 const baixos=A.filter(x=>x.a.nv<150);if(qual==='pvp'&&baixos.length)dicas.push(`Suba ${baixos.map(x=>`${x.a.nome} (Nv ${x.a.nv})`).join(', ')} até o Nv 150: no PvP o nível conta inteiro até lá.`);
 // PvP: chance atual, melhor ordem e trocas vindas do depot
 let pvp=null;const rv=riv&&riv.lista||[];
 if(rv.length){const todos=Object.values(P.mons).filter(monValido);const idsEq=new Set(A.map(x=>String(x.m.id)));
  const r=otimizarEquipe(A.map(x=>x.m),rv);if(!r.erro){const chAtual=r.avaliarIds(A.map(x=>String(x.m.id)));const melhorOrdem=r.time.map(x=>x.nome);
   pvp={chance:chAtual,melhor:r.chance,ordem:melhorOrdem,piores:r.rivais.slice(0,3)};
   if(qual==='pvp'&&r.chance-chAtual>=.03&&r.time.map(x=>String(x.id)).join()!==A.map(x=>String(x.m.id)).join())dicas.push(`Trocando a ordem para ${melhorOrdem.join(' → ')} a chance sobe de ${pctS(chAtual)} para ${pctS(r.chance)}.`);
   if(chAtual>=.6)fortes.push(`Contra os rivais do seu PR: ${pctS(chAtual)} de vitória estimada.`);else if(chAtual<.4)fracos.push(`Contra os rivais do seu PR: só ${pctS(chAtual)} de vitória estimada.`);
   // trocas: um de fora entra no lugar de um de dentro
   const fora=todos.filter(m=>!idsEq.has(String(m.id)));const trocas=[];
   for(const c of fora.slice(0,25)){for(const x of A){const ids=A.map(y=>y===x?c:y.m);const rr=otimizarEquipe(ids,rv);if(!rr.erro&&rr.chance-chAtual>=.05)trocas.push({sai:x.a.nome,entra:c.nome,nv:c.nv,ganho:rr.chance-chAtual,ch:rr.chance});}}
   if(n<5)for(const c of fora.slice(0,25)){const rr=otimizarEquipe(A.map(y=>y.m).concat(c),rv);if(!rr.erro&&rr.chance-chAtual>=.03)trocas.push({sai:null,entra:c.nome,nv:c.nv,ganho:rr.chance-chAtual,ch:rr.chance});}
   const usados=new Set();trocas.sort((a,b)=>b.ganho-a.ganho).filter(t=>{const k=t.entra+'|'+t.nv;if(usados.has(k)||(t.sai&&usados.has('sai|'+t.sai)))return false;usados.add(k);if(t.sai)usados.add('sai|'+t.sai);return true;}).slice(0,3).forEach(t=>dicas.push(t.sai?`Troque ${t.sai} por ${t.entra} (Nv ${t.nv}, que você já tem): ${pctS(chAtual)} → ${pctS(t.ch)}.`:`Adicione ${t.entra} (Nv ${t.nv}, que você já tem): ${pctS(chAtual)} → ${pctS(t.ch)}.`));
   pvp.trocas=trocas.length;}}
 const res={t:Date.now(),qual,n,media,membros:A.map(x=>({id:x.m.id,nome:x.a.nome,nv:x.a.nv,shiny:x.a.shiny,tipos:x.a.tipos,funcao:x.a.funcao,nota:x.a.nota,faixa:x.a.faixa,veredito:x.a.veredito,vsMeta:x.a.vsMetaPct})),
  buracos:ameacas.slice(0,5).map(b=>({t:b.t,fr:b.fr})),cob:[...cob],pvp,fortes:[...new Set(fortes)],fracos:[...new Set(fracos)],dicas:[...new Set(dicas)]};
 MD.pk.eq=MD.pk.eq||{};MD.pk.eq[qual]=res;salvarM();return res;}
// ---------- card no painel
function miniPk(){if(pkUmRodando)return'Analisando…';
 return MD.pk.ult?`Último: ${MD.pk.ult.nome} ${MD.pk.ult.nota.toFixed(1)}/10 (${MD.pk.ult.v})`:'Escolha um pokémon e clique em Analisar.';}
function renderPk(){const on=cardBase('pk',C.pk,'Analisador de Pokémon','Analisa um pokémon por vez (nota, stats × IVs, PvP e tipos) e compara dois lado a lado.',miniPk,()=>{
  const LC=listaComparaveis();pkCmpLista=LC;const kA=pkSelA??(MD.pk.cmp&&MD.pk.cmp.a?keyMon(MD.pk.cmp.a):LC[0]&&keyMon(LC[0])),kB=pkSelB??(MD.pk.cmp&&MD.pk.cmp.b?keyMon(MD.pk.cmp.b):LC[1]&&keyMon(LC[1]));
  const opts=k=>{const g=(t,l)=>l.length?`<optgroup label="${t}">${l.map(m=>`<option value="${esc(keyMon(m))}" ${keyMon(m)===k?'selected':''}>${esc(rotuloMon(m))}</option>`).join('')}</optgroup>`:'';return g('Seus pokémon',LC.filter(m=>m.grupo!=='mercado'))+g('Vistos no Mercado',LC.filter(m=>m.grupo==='mercado'));};
  const ult=MD.pk.cmp&&MD.pk.cmp.ult;
  const cmpH=`<div class="sec" style="margin-top:6px">⚖ Comparar 2 pokémon</div>${LC.length>=2?`<div class="cfg2"><label>A<select id="pkCa" class="inp">${opts(kA)}</select></label><label>B<select id="pkCb" class="inp">${opts(kB)}</select></label></div>
   <div class="btns"><button class="btn pri" id="pkCmp" ${cmpRodando?'disabled':''}>⚖ Comparar lado a lado</button></div>`:''}
   <div class="nota">${LC.length>=2?'Aparecem aqui os seus pokémon que o bot já leu (equipes e fichas analisadas) e os que você analisou no Mercado.':'Analise pelo menos 2 fichas (ou monte uma equipe no Criador) para escolher aqui.'} Na ficha, depois de Analisar, use <b>⚖ Guardar para comparar</b> e compare com a próxima ficha.</div>
   ${ult?`<div class="nota">Última: ${esc(ult.a)} × ${esc(ult.b)} — ${esc(ult.v)}</div>`:''}`;
  const kU=pkSelU??(LC[0]&&keyMon(LC[0]));
  const umH=`<div class="sec">🔍 Analisar um pokémon</div>${LC.length?`<div class="cfg2"><label>Pokémon<select id="pkU" class="inp">${opts(kU)}</select></label><label>&nbsp;<button class="btn pri" id="pkUm" ${pkUmRodando?'disabled':''}>Analisar</button></label></div>`:''}
  <div class="nota">${LC.length?'Mostra a tabela completa só desse pokémon. ':''}Ou abra a ficha de qualquer pokémon (seu ou do Mercado) e clique em <b>Analisar</b>, ao lado de "Reduzir o nível". A análise da equipe inteira fica no <b>Criador de Equipes</b> (aba PvP).</div>`;
  return `${umH}${cmpH}`;});
 if(!on)return;on('pkU','onchange',e=>{pkSelU=e.target.value;});on('pkUm','onclick',()=>{const M=pkCmpLista.find(m=>keyMon(m)===($('pkU')?.value));if(M){pkSelU=keyMon(M);analisarUm(M);}});
 on('pkCa','onchange',e=>{pkSelA=e.target.value;});on('pkCb','onchange',e=>{pkSelB=e.target.value;});
 on('pkCmp','onclick',()=>{const A=pkCmpLista.find(m=>keyMon(m)===($('pkCa')?.value)),B=pkCmpLista.find(m=>keyMon(m)===($('pkCb')?.value));
  if(!A||!B)return;if(keyMon(A)===keyMon(B)){avisoPokebot({tipo:'info',tit:'Escolha dois diferentes',txt:'A e B são o mesmo pokémon.'});return;}pkSelA=keyMon(A);pkSelB=keyMon(B);mostrarComparacao(A,B);});}
let pkCmpLista=[],pkSelA=null,pkSelB=null,pkSelU=null,pkUmRodando=false;
async function analisarUm(M){if(pkUmRodando)return null;pkUmRodando=true;pkSolto=true;const tit='ANÁLISE · '+nomeCurto(M.nome).toUpperCase();
 abrirPainelPk(tit,'<div class="cp"><div class="nota">Analisando… (lendo o meta e os rivais no Tracker)</div></div>');
 let a;try{a=await analisarPokemon(M);}catch(e){a={erro:'Falhou: '+(e&&e.message||e)};}finally{pkUmRodando=false;}
 const Mn={...M,nome:a&&!a.erro?a.nome:M.nome};if(pkHost&&pkSolto){abrirPainelPk(tit,(a&&!a.erro?`<div data-cmp-bar>${barraComparar(Mn)}</div>`:'')+htmlAnalise(a));if(a&&!a.erro)ligarBarraComparar(Mn);}
 if(a&&!a.erro){MD.pk.ult={t:a.t,nome:a.nome,nota:a.nota,v:a.veredito[0]};salvarM();}pintar();return a;}const keyMon=m=>m.id?'#'+m.id:`${m.nome}|${m.nv}|${(m.iv||[]).join('.')}`;

// ============================ MÓDULO — VENDA AUTOMÁTICA DE POKÉMON (classificação pelo método v13) ============================
// Lê TODOS os seus pokémon (Equipe, Depot e Coleção) pela janela Editar da equipe de PvP, classifica com a nota do método
// e, no Market › Venda Pokémons (só Depot), manda shiny/P4 para a Coleção e vende MEDIANO, RUIM e PÉSSIMO ao NPC.
// NUNCA vende: shiny, P4, P5, refinado (+N), equipe de hunt, equipe de PvP, Coleção, ou quem você marcou "poupar".
const CLASSES=[['ÓTIMO',5,'ok'],['BOM',4,'ok2'],['MEDIANO',3,'mid'],['RUIM',2,'no'],['PÉSSIMO',-1,'no']]; // faixas do jogo
const classeDe=n=>n==null?null:CLASSES.find(c=>n>=c[1]);
// refinado: algum stat-base da ficha acima do da espécie
// v36: o jogo mostra o refino num selo "+N" (card e ficha) — é a fonte principal. Sem o selo, compara os stats-base da ficha
// com os da espécie, mas só conta como refinado se 2+ stats estiverem acima (o catálogo público do jogo tem espécies com o HP-base
// diferente do servidor, ex.: Torchic e Bagon 45 → 55, e isso marcava TODOS eles como refinados).
function refinado(m){if((m.ref||0)>0)return true;const c=(m.pokeId!=null&&ESP&&ESP[m.pokeId])||espNome(m.nome);if(!c||!m.base)return false;const B=baseDe(c);return m.base.slice(0,6).filter((x,i)=>x>B[i]).length>=2;}
// a nota usada para vender: o N do próprio jogo (selo do card/ficha, "força dentro da espécie" 0–10, a mesma do Auto Coleção N)
// quando existe; senão a do método do bot, com folga de 0,4 para não vender por erro de estimativa
function notaVenda(m){if(m.nJogo>0)return{n:m.nJogo,fonte:'jogo'};const n=notaDoMon(m);return n==null?null:{n,fonte:'bot'};}
const vendePorNota=nv=>!!nv&&nv.n<(C.vd.limiar||4)-(nv.fonte==='bot'?0.4:0);
function notaDoMon(m){const c=(m.pokeId!=null&&ESP&&ESP[m.pokeId])||espNome(m.nome);if(!c||!m.iv||m.iv.length!==6||!m.iv.some(x=>x>0))return null;
 const B=m.base&&m.base.length>=5?m.base.concat([0]).slice(0,6).map((x,i)=>x||baseDe(c)[i]):baseDe(c);const fp=funcaoDe(c,m.nv||100).fp;return notaCombate(B,pesosMetodo(B,fp),m);}
function motivoProtecao(m,pvpIds){if(m.shiny)return'shiny';if((m.pot||1)>=5)return'P5';if((m.pot||1)>=4)return'P4';if(refinado(m))return'refinado';
 if(m.local==='equipe')return'equipe de hunt';if(m.local==='colecao')return'Coleção';if(pvpIds.has(String(m.id)))return'equipe de PvP';if((C.vd.poupar||[]).includes(String(m.id)))return'poupado por você';return null;}
let vdRodando=false,vdProg='',vdProx=Date.now()+90e3;
function pintarVd(){if(aberto()){const e=$(C.vd.aberto?'vdProg':'vdStatus');if(e)e.textContent=C.vd.aberto?vdProg:miniVd();}}
// ---------- fase 1: ler e classificar SÓ o que está no Market › Venda Pokémons (o Depot vendável)
function lerCardMk(c){const t=c.innerText||'';const nomeT=(c.querySelector('.mk-nome')?.textContent||'').trim();const selo=k=>c.querySelector('.pk-selo-'+k)?.textContent||'';
 return{id:String((c.dataset.chave||'').replace(/^p/,'')),nome:(c.querySelector('.mk-nome')?.getAttribute('title')||nomeT).replace(/^✨\s*/,'').replace(/^Shiny\s+/i,''),shiny:/✨|shiny/i.test(nomeT+' '+t.slice(0,60)),
  nv:num((t.match(/Nv\s*([\d.]+)/)||[])[1])||1,pot:num(((c.querySelector('.cm-pot')?.className||'').match(/\bp(\d)\b/)||[])[1])||1,ivT:num(selo('iv').replace(/\D+/,'')),q:num((selo('q').match(/[\d,]+/)||[])[0]),
  preco:num((c.querySelector('.mk-preco')?.innerText||'').replace(/[^\d.,]/g,'')),colecao:!!c.querySelector('.pk-colecao-marca'),
  nJogo:num((selo('n').match(/[\d,]+/)||[])[0])||num(((c.querySelector('.pk-selo-n')?.getAttribute('title')||'').match(/Nota\s*([\d,]+)/)||[])[1])||null,ref:refinoDe(c)};}
// ids da equipe de PvP que já conhecemos (sem abrir outra tela)
function idsPvpConhecidos(){const s=new Set();(MD.an.res&&MD.an.res.time||[]).forEach(x=>s.add(String(x.id)));(MD.pk.eq&&MD.pk.eq.pvp&&MD.pk.eq.pvp.membros||[]).forEach(x=>x.id&&s.add(String(x.id)));return s;}
async function lerMarketParaVenda(){const m=modalMk()&&[...modalMk().querySelectorAll('.mk-aba')].some(b=>/Pok/i.test(b.innerText)&&b.classList.contains('on'))?modalMk():await abrirVendaPokemons();
 if(!m)throw new Error('O Market › Venda Pokémons não abriu.');
 const cards=[...m.querySelectorAll('.mk-card[data-chave^="p"]')].map(lerCardMk).filter(k=>/^\d+$/.test(k.id));const pvpIds=idsPvpConhecidos();let n=0;
 for(const k of cards){if(!vivo||!C.ativo)break;const old=P.mons[k.id];
  const valido=old&&old.iv&&old.iv.some(x=>x>0)&&old.st&&old.st[0]>0&&old.nv===k.nv&&old.pot===k.pot&&(old.ivT==null||!k.ivT||old.ivT===k.ivT);
  P.mons[k.id]=Object.assign(old||{},{id:k.id,nome:k.nome,nv:k.nv,shiny:k.shiny||!!(old&&old.shiny),pot:Math.max(k.pot,(old&&old.pot)||1),q:k.q||(old&&old.q),ivT:k.ivT||(old&&old.ivT),local:k.colecao?'colecao':'depot',ref:Math.max(k.ref||0,(old&&old.ref)||0)});
  if(k.nJogo>0)P.mons[k.id].nJogo=k.nJogo;
  // com o N do jogo no card não preciso abrir a ficha
  if(k.nJogo>0||valido||n>=C.vd.maxFichas)continue;
  // pokémon que nunca é vendido não precisa de ficha para decidir
  if(k.shiny||k.pot>=4||k.colecao)continue;
  n++;vdProg=`Lendo a ficha de ${k.nome} Nv ${k.nv} (${n}/${Math.min(C.vd.maxFichas,cards.length)})…`;pintarVd();
  const antes=fichaAberta()?.innerText||'';const ok=await clicar(()=>cardMk(k.id)?.querySelector('.mk-ficha-btn'));if(!ok)continue;
  await esperar(()=>{const x=fichaAberta();return x&&/STATS ATUAIS/.test(x.innerText)&&x.innerText!==antes&&x.innerText.includes('#'+k.id);},5000);
  const x=fichaAberta();if(x&&x.innerText.includes('#'+k.id)){const M=lerFichaCompleta(x);Object.assign(P.mons[k.id],{pokeId:M.pokeId??P.mons[k.id].pokeId,iv:M.iv,st:M.st,base:M.base,q:M.q||P.mons[k.id].q,shiny:M.shiny||k.shiny,pot:Math.max(M.pot||1,k.pot||1),ref:Math.max(M.ref||0,k.ref||0),lido:Date.now()});if(M.nJogo>0)P.mons[k.id].nJogo=M.nJogo;}
  await clicar(()=>document.querySelector('#ficha-fechar'));await esperar(()=>!fichaAberta(),3000);if(n%5===0)salvarP();}
 salvarP();
 return cards.map(k=>{const mm=P.mons[k.id];const nv=notaVenda(mm);const nota=nv?nv.n:null;const cl=classeDe(nota);const prot=motivoProtecao(mm,pvpIds);
  return{id:k.id,nome:mm.nome,nv:mm.nv,pot:mm.pot||1,q:mm.q,shiny:!!mm.shiny,local:mm.local,preco:k.preco,nota,fonte:nv?nv.fonte:null,ref:mm.ref||0,classe:cl?cl[0]:prot?'PROTEGIDO':'SEM NOTA',cor:cl?cl[2]:prot?'ok':'nota',prot,
   vender:!prot&&vendePorNota(nv),mover:!k.colecao&&(mm.shiny||(mm.pot||1)>=4)&&C.vd.colecao};});}
// ---------- fase 2: Market › Venda Pokémons
const modalMk=()=>modais().find(x=>x.querySelector('.mk-aba'));
async function abrirVendaPokemons(){const m=await abrirMenu('market',x=>!!x.querySelector('.mk-aba'));if(!achou('vd','o Market (botão no menu ou a janela)',!!m))return null;
 const abaOk=await clicar(()=>[...(modalMk()?.querySelectorAll('.mk-aba')||[])].find(b=>/Pok[eé]mons|(sell|vender)\s+pok[eé]mon/i.test(b.innerText)));
 await esperar(()=>!!modalMk()&&[...modalMk().querySelectorAll('.mk-aba')].some(b=>/Pok[eé]mons|(sell|vender)\s+pok[eé]mon/i.test(b.innerText)&&(b.classList.contains('on')||b.classList.contains('ativo')||b.getAttribute('aria-selected')==='true'))||!!modalMk()?.querySelector('.mk-card[data-chave^="p"]'),5000);await S_(500);if(!achou('vd','a aba Venda Pokémons do Market',abaOk))return null;return modalMk();}
const cardMk=id=>modalMk()?.querySelector(`.mk-card[data-chave="p${id}"]`);
// confere o card de novo antes de agir (nome, nível e proteções visíveis)
function cardConfere(card,x){if(!card)return'sumiu da lista';const t=card.innerText||'';const pot=num(((card.querySelector('.cm-pot')?.className||'').match(/\bp(\d)\b/)||[])[1])||1;
 if(/✨|shiny/i.test(t)&&!x.shiny)return'o card mostra shiny';if(pot>=4&&x.pot<4)return`o card mostra P${pot}`;
 if(!t.toLowerCase().includes(String(x.nome).toLowerCase()))return'nome diferente no card';const nv=num((t.match(/Nv\s*([\d.]+)/)||[])[1]);if(nv&&nv!==x.nv)return'nível diferente no card';
 if(card.classList.contains('travado')||/★/.test(t)||card.querySelector('.pk-colecao-marca'))return'marcado/protegido no jogo';if(refinoDe(card)>0)return'o card mostra refino';return null;}
function botaoColecao(card){return card.querySelector('button.mk-colecao')||[...card.querySelectorAll('button')].find(b=>!b.classList.contains('mk-acao')&&!b.classList.contains('mk-ficha-btn')&&/cole[çc][ãa]o|guardar/i.test((b.title||'')+' '+(b.getAttribute('aria-label')||'')+' '+b.innerText));}
// se o jogo abrir a confirmação (#confirmar), só confirma quando o texto fala do MESMO pokémon; senão cancela
async function confirmarSeJogoPedir(nome){await esperar(()=>!!dialogoConfirmar(),1500);const d=dialogoConfirmar();if(!d)return true;
 if(!(d.innerText||'').toLowerCase().includes(String(nome).toLowerCase())){await clicar(()=>document.querySelector('#confirmar-nao'));return false;}
 const ok=await clicar(()=>document.querySelector('#confirmar-sim'));await esperar(()=>!dialogoConfirmar(),4000);return ok;}
async function executarVendas(lista,{vender}){const res={movidos:[],vendidos:[],pulados:[],ouro:0};const m=modalMk()||await abrirVendaPokemons();if(!m){res.erro='O Market › Venda Pokémons não abriu.';return res;}
 // 1) shiny e P4 do Depot → Coleção
 for(const x of lista.filter(x=>x.mover)){if(!vivo||!C.ativo)break;const card=cardMk(x.id);if(!card){res.pulados.push(`${x.nome}: não está no Depot`);continue;}
  const bt=botaoColecao(card);if(!bt){res.pulados.push(`${x.nome}: não achei a setinha da Coleção`);continue;}
  vdProg=`Guardando ${x.shiny?'✨':''}${x.nome} P${x.pot} na Coleção…`;pintarVd();
  if(await clicar(()=>{const c=cardMk(x.id);return c?botaoColecao(c):null;})&&await confirmarSeJogoPedir(x.nome)&&await esperar(()=>!cardMk(x.id),5000))res.movidos.push(`${x.shiny?'✨':''}${x.nome} Nv ${x.nv} P${x.pot}`);else res.pulados.push(`${x.nome}: o jogo não confirmou a ida para a Coleção`);}
 // 2) venda ao NPC
 if(vender)for(const x of lista.filter(x=>x.vender)){if(!vivo||!C.ativo||!C.vd.on)break;const card=cardMk(x.id);const prob=cardConfere(card,x);if(prob){res.pulados.push(`${x.nome} Nv ${x.nv}: ${prob}`);continue;}
  const bt=()=>{const c=cardMk(x.id);return c?[...c.querySelectorAll('button.mk-acao')].find(b=>/vender|\bsell\b/i.test(b.innerText)):null;};if(!bt()||bt().disabled){res.pulados.push(`${x.nome}: o jogo não deixa vender`);continue;}
  const preco=num((card.querySelector('.mk-preco')?.innerText||'').replace(/[^\d.,]/g,''));vdProg=`Vendendo ${x.nome} Nv ${x.nv} (${x.classe}, nota ${x.nota.toFixed(1)})…`;pintarVd();
  if(await clicar(bt)&&await confirmarSeJogoPedir(x.nome)&&await esperar(()=>!cardMk(x.id),5000)){res.vendidos.push(`${x.nome} Nv ${x.nv} (${x.classe} ${x.nota.toFixed(1).replace('.',',')})`);res.ouro+=preco;delete P.mons[x.id];}
  else res.pulados.push(`${x.nome}: o jogo não confirmou a venda`);}
 salvarP();return res;}
// ---------- ciclo
// modo 'auto' = vende sozinho a cada análise · modo 'confirmar' = analisa e espera você clicar em "Confirmar e vender"
async function rodarVenda(manual,{confirmar}={}){if(vdRodando)return false;vdRodando=true;let lista=null,res=null;
 try{return await comTela('venda',async()=>{await especies();vdProg='Abrindo o Market › Venda Pokémons…';pintarVd();
  lista=await lerMarketParaVenda();if(fichaAberta())await clicar(()=>document.querySelector('#ficha-fechar'));
  const cont={};lista.forEach(x=>cont[x.classe]=(cont[x.classe]||0)+1);const aVender=lista.filter(x=>x.vender),aMover=lista.filter(x=>x.mover);
  MD.vd.ult={t:Date.now(),cont,total:lista.length,lista:lista.map(x=>({...x}))};
  const podeVender=C.vd.modo==='auto'||!!confirmar;
  if(!aMover.length&&(!aVender.length||!podeVender)){
   MD.vd.hist.push({t:Date.now(),m:`Market: ${lista.length} pokémon · ${CLASSES.map(c=>`${cont[c[0]]||0} ${c[0]}`).join(' · ')}${aVender.length?` · ${aVender.length} para vender${C.vd.modo==='confirmar'?' (esperando você confirmar)':''}`:''}.`});return true;}
  res=await executarVendas(lista,{vender:podeVender});
  if(res.erro)MD.vd.hist.push({t:Date.now(),m:res.erro});
  if(res.movidos.length)MD.vd.hist.push({t:Date.now(),m:`Guardei na Coleção: ${res.movidos.join(', ')}.`});
  if(res.vendidos.length)MD.vd.hist.push({t:Date.now(),m:`Vendi ${res.vendidos.length} ao NPC por ~${fmtF(res.ouro)} de ouro: ${res.vendidos.slice(0,10).join(', ')}${res.vendidos.length>10?'…':''}.`});
  if(res.pulados.length)MD.vd.hist.push({t:Date.now(),m:`Não mexi em ${res.pulados.length}: ${res.pulados.slice(0,5).join('; ')}${res.pulados.length>5?'…':''}.`});
  if(!podeVender&&aVender.length)MD.vd.hist.push({t:Date.now(),m:`${aVender.length} para vender: confira a lista e clique em "Vender pokémon".`});
  // depois de vender, a lista mostra o que ficou no Market
  // marca na lista o que já saiu do Market (vendido ou guardado)
  if(res.vendidos.length||res.movidos.length)MD.vd.ult.lista.forEach(x=>{if(!cardMk(x.id)){x.feito=x.mover?'guardado na Coleção':x.vender?'vendido':'saiu';x.vender=false;x.mover=false;}});
  MD.vd.ult.feito={movidos:res.movidos.length,vendidos:res.vendidos.length,ouro:res.ouro};return true;});}
 catch(e){MD.vd.hist.push({t:Date.now(),m:'Falhou: '+(e&&e.message||e)});return false;}
 finally{vdRodando=false;vdProg='';MD.vd.hist=MD.vd.hist.slice(-30);salvarM();vdProx=Date.now()+C.vd.intervalo*60e3;
  if(res&&(res.vendidos.length||res.movidos.length))avisoPokebot({tipo:'ok',tit:res.vendidos.length?'Venda de pokémon concluída':'Pokémon guardados na Coleção',txt:[res.vendidos.length?`${res.vendidos.length} vendido(s) ao NPC (~${fmtF(res.ouro)} de ouro)`:'',res.movidos.length?`${res.movidos.length} guardado(s) na Coleção`:''].filter(Boolean).join(' · ')+(!res.vendidos.length&&C.vd.modo==='confirmar'&&lista.some(x=>x.vender)?' · o resto espera você confirmar':''),sub:res.pulados.length?`${res.pulados.length} pulado(s) por segurança`:'Shiny, P4, P5, refinados e Coleção ficaram de fora.'});
  else if(lista){const n=lista.filter(x=>x.vender).length;if(manual||(n&&C.vd.modo==='confirmar'))avisoPokebot({tipo:n?'info':'ok',tit:'Análise do Market pronta',txt:`${lista.length} pokémon no Venda Pokémons · ${n} com N abaixo de ${String(C.vd.limiar).replace('.',',')}`,sub:n?(C.vd.modo==='confirmar'?'Clique em "Vender pokémon" no card para vender.':'Nada vendido.'):'Nada para vender agora.'});}
  pintar();}}
function cicloVd(){if(C.ativo&&C.vd.on&&!pausado('vd')&&!vdRodando&&Date.now()>=vdProx&&telaLivre()){vdProx=Date.now()+5*60e3;rodarVenda(false);}}
function miniVd(){if(!C.vd.on)return'Desligado.';if(pausado('vd'))return txtPausa('vd');if(!C.ativo)return'Liga junto com o bot.';if(vdRodando)return vdProg||'Analisando…';const u=MD.vd.ult;if(!u)return`Primeira análise do Market em ${faltam(vdProx-Date.now())}.`;
 const v=(u.lista||[]).filter(x=>x.vender).length;return `Market: ${u.total} pokémon · ${CLASSES.map(c=>`${u.cont[c[0]]||0} ${c[0]}`).join(' · ')} · ${C.vd.modo==='auto'?'venda automática':'confirmar para vender'}${v&&C.vd.modo==='confirmar'?` (${v} esperando)`:''} · próxima em ${faltam(vdProx-Date.now())}`;}
function renderVd(){const on=cardBase('vd',C.vd,'Venda automática de Pokémon','Analisa só o que está no seu Market › Venda Pokémons e vende ao NPC os de nota N baixa (o N do próprio jogo).',miniVd,()=>{const u=MD.vd.ult;
  const tab=u?`<div class="chips c4" style="grid-template-columns:repeat(5,1fr)">${CLASSES.map(c=>`<div class="tm" style="text-align:center"><b class="${c[2]}">${u.cont[c[0]]||0}</b><small style="display:block">${c[0]}</small></div>`).join('')}</div>
   <div class="tb" style="max-height:260px"><table><thead><tr><th>Pokémon no Market</th><th>N</th><th>Classe</th><th>~Ouro</th><th>Ação</th></tr></thead><tbody>${u.lista.slice().sort((a,b)=>(a.nota??99)-(b.nota??99)).map(x=>`<tr><td>${x.shiny?'✨':''}${esc(x.nome)} <span class="tag">Nv ${x.nv} · P${x.pot}</span></td><td>${x.nota==null?'—':x.nota.toFixed(2).replace('.',',')}${x.fonte==='bot'?' <span class="tag" title="Sem o N do jogo: nota estimada pelo bot (só vende com folga de 0,4)">est.</span>':''}${x.ref?` <span class="tag">+${x.ref}</span>`:''}</td><td class="${x.cor}">${x.classe}</td><td>${x.preco?fmtF(x.preco):'—'}</td><td>${x.feito?`<span class="tag">${esc(x.feito)}</span>`:x.mover?'<span class="ok">→ Coleção</span>':x.vender?`<span class="no">vender</span> <button class="lnk" data-vdp="${x.id}">poupar</button>`:x.prot?`<span class="tag">${esc(x.prot)}</span>`:'fica'}</td></tr>`).join('')}</tbody></table></div>
   <div class="nota">Analisado em ${dataHora(u.t)}${u.feito?` · última rodada: ${u.feito.vendidos} vendido(s), ${u.feito.movidos} para a Coleção`:''}.</div>`:'<div class="nota">Ainda não analisei o Market. Clique em Analisar o Market agora.</div>';
  const pend=u&&C.vd.modo==='confirmar'?u.lista.filter(x=>x.vender):[];const ouroPend=pend.reduce((a,x)=>a+(x.preco||0),0);
  return `<div class="nota" id="vdProg">${esc(vdProg)}</div>
  <div class="cfg2"><label>Venda<select id="vdModo" class="inp"><option value="confirmar" ${C.vd.modo!=='auto'?'selected':''}>Confirmar para vender</option><option value="auto" ${C.vd.modo==='auto'?'selected':''}>Venda automática</option></select></label><label>Tempo entre análises<select id="vdInt" class="inp">${[[10,'10 min'],[30,'30 min'],[60,'1 h'],[180,'3 h'],[360,'6 h'],[720,'12 h']].map(([v,t])=>`<option value="${v}" ${C.vd.intervalo==v?'selected':''}>${t}</option>`).join('')}</select></label>
   <label>Vender se N abaixo de<select id="vdLim" class="inp">${[[2,'2 (só fraco)'],[3,'3 (até mediano)'],[3.5,'3,5'],[4,'4 (até razoável)']].map(([v,t])=>`<option value="${v}" ${C.vd.limiar==v?'selected':''}>${t}</option>`).join('')}</select></label>
   <label>Fichas por rodada<select id="vdMax" class="inp">${[20,40,80].map(n=>`<option value="${n}" ${C.vd.maxFichas==n?'selected':''}>${n}</option>`).join('')}</select></label></div>
  <div class="nota">${C.vd.modo==='auto'?`<b class="warn">Venda automática:</b> a cada análise vende sozinho os de N abaixo de ${String(C.vd.limiar).replace('.',',')}.`:'<b>Confirmar para vender:</b> a cada análise mostra a lista e só vende quando você clicar em <b>Vender pokémon</b>.'}</div>
  <div class="ops"><label class="op"><input type="checkbox" id="vdCol" ${C.vd.colecao?'checked':''}><span><b>Guardar shiny e P4/P5 na Coleção</b><small>Tira do Market pela setinha do card; lá o NPC não compra.</small></span></label></div>
  <div class="btns"><button class="btn pri" id="vdAgora" ${C.ativo&&!vdRodando&&!usoTela?'':'disabled'}>Analisar o Market agora</button>${C.vd.modo==='confirmar'?`<button class="btn" id="vdConf" style="border-color:#ff8270" ${pend.length&&C.ativo&&!vdRodando&&!usoTela?'':'disabled'} title="${pend.length?'Vende ao NPC só os marcados como vender na lista abaixo':'Nada marcado para vender: analise o Market primeiro'}">💰 Vender pokémon${pend.length?` (${pend.length} · ~${fmtF(ouroPend)})`:''}</button>`:''}</div>
  ${tab}
  <div class="nota"><b>N</b> = a nota do próprio jogo (0–10, força dentro da espécie, a mesma do "Auto Coleção N"); quando o card não mostra, uso a do bot (est.) e só vendo com folga de 0,4. Faixas: ÓTIMO ≥ 5 · BOM 4–5 · MEDIANO 3–4 · RUIM 2–3 · PÉSSIMO &lt; 2. Só olho o que aparece em Market › Venda Pokémons. <b>Nunca vende</b>: shiny, P4, P5, refinados (selo +N), Coleção, a sua equipe de PvP e os que você poupar; sem ficha lida = não vende. Cada card é conferido de novo antes do clique; o botão "Vender todo o Depot" nunca é usado. <b>Venda ao NPC não tem volta.</b>${(C.vd.poupar||[]).length?` · ${C.vd.poupar.length} poupado(s) <button class="lnk" id="vdLimpa">limpar</button>`:''}</div>${lgHtml(MD.vd.hist)}`;});
 if(!on)return;on('vdAgora','onclick',()=>{vdProx=0;rodarVenda(true);});on('vdConf','onclick',()=>{rodarVenda(true,{confirmar:true});});
 on('vdModo','onchange',e=>{C.vd.modo=e.target.value;salvar();pintar();});on('vdCol','onchange',e=>{C.vd.colecao=e.target.checked;salvar();});
 on('vdInt','onchange',e=>{C.vd.intervalo=+e.target.value;vdProx=Math.min(vdProx,Date.now()+C.vd.intervalo*60e3);salvar();});on('vdMax','onchange',e=>{C.vd.maxFichas=+e.target.value;salvar();});
 on('vdLim','onchange',e=>{C.vd.limiar=+e.target.value;if(MD.vd.ult)MD.vd.ult.lista.forEach(x=>{if(!x.feito&&!x.prot&&x.nota!=null)x.vender=vendePorNota({n:x.nota,fonte:x.fonte});});salvar();salvarM();pintar();});
 on('vdLimpa','onclick',()=>{C.vd.poupar=[];salvar();pintar();});R.querySelectorAll('[data-vdp]').forEach(b=>b.onclick=()=>{C.vd.poupar=(C.vd.poupar||[]).concat(b.dataset.vdp);if(MD.vd.ult)MD.vd.ult.lista.forEach(x=>{if(x.id===b.dataset.vdp){x.vender=false;x.prot='poupado por você';}});salvar();salvarM();pintar();});}
// ============================ MÓDULO — COMPARAR (botão flutuante: captura agora × captura antes) ============================
// Captura: nível e XP do treinador (painel), posição/pontos no ranking PvP (Tracker) e o nível de cada pokémon da equipe
// (lista #time). 1º clique guarda; os próximos mostram a diferença desde a captura guardada. Só lê a tela e o Tracker.
let capHost=null,capRodando=false;
async function capturarCap(){const t=Date.now();const p=document.querySelector('.painel.treinador')||document.querySelector('#tr-nick')?.closest('.painel')||document.querySelector('#tr-nick')?.parentElement;
 const tx=p?.innerText||'';const folha=re=>[...(p?p.querySelectorAll('*'):[])].find(e=>!e.children.length&&re.test((e.textContent||'').trim()))?.textContent.trim()||'';
 const xp=(folha(/^[\d.]+\s*\/\s*[\d.]+\s*xp$/i)||tx).match(/([\d.]+)\s*\/\s*([\d.]+)\s*xp/i);const nvTxt=folha(/^Nv\s*[\d.]+$/i);const nick=meuNick();
 const mons=[...document.querySelectorAll('#time .poke-linha[data-id]')].map(l=>{const tt=(l.innerText||'').replace(/\s+/g,' ');const m=tt.match(/^(.*?)\s*Nv\s*([\d.]+)/);
  return{id:String(l.dataset.id),nome:(m?m[1]:tt).replace(/^✨\s*/,'').replace(/^Shiny\s+/i,'').replace(/\b(AoE|FIRE|WATER|GRASS|ELECTRIC|ICE|FIGHTING|POISON|GROUND|FLYING|PSYCHIC|BUG|ROCK|GHOST|DRAGON|DARK|STEEL|FAIRY|NORMAL)\b/g,'').replace(/\+\d+\s*$/,'').trim(),nv:num(m?m[2]:0),shiny:/✨|shiny/i.test(tt)};}).filter(x=>x.nv>0);
 // PR: o número do próprio jogo (#tr-rank-pr "1.708 PR", ao lado do emblema) — o Tracker atrasa; posição e V/D vêm do Tracker
 const prJogo=num(((document.querySelector('#tr-rank-pr')?.textContent||'').match(/([\d.]+)\s*PR/i)||[])[1])||null;const tierJogo=(document.querySelector('#tr-rank-nome')?.textContent||'').trim();
 let rank=null;if(nick&&nick!=='—'){try{const j=await tracker('jogador',{nick,_:Date.now()},{fresco:true});if(j&&j.rank)rank={pos:j.rank.posicao??null,pontos:prJogo??j.rank.pontos??null,prTracker:j.rank.pontos??null,rotulo:tierJogo||j.rank.rotulo||'',v:j.rank.vitorias||0,d:j.rank.derrotas||0};}catch(e){}}
 if(!rank&&prJogo!=null)rank={pos:null,pontos:prJogo,rotulo:tierJogo,v:null,d:null,soPR:true};
 return{t,nick,nv:num((nvTxt.match(/([\d.]+)/)||[])[1])||num((tx.match(/Nv\s*([\d.]+)(?:\s|$)/)||[])[1])||nivelTreinador(),xp:xp?num(xp[1]):null,xpMax:xp?num(xp[2]):null,rank,mons};}
const fmtI=n=>Math.round(+n||0).toLocaleString('pt-BR');
const sinal=(d,inv)=>d===0?'<span class="z">=</span>':(inv?d<0:d>0)?`<span class="up">▲ ${fmtI(Math.abs(d))}</span>`:`<span class="dn">▼ ${fmtI(Math.abs(d))}</span>`;
const durTxt=ms=>{const m=Math.round(ms/6e4);return m<60?`${m} min`:`${Math.floor(m/60)} h ${String(m%60).padStart(2,'0')} min`;};
function htmlCap(a,b){const h=Math.max((b.t-a.t)/36e5,1/60);const porH=d=>d?` <i>(${(d/h).toLocaleString('pt-BR',{maximumFractionDigits:1})}/h)</i>`:'';
 const dNv=b.nv-a.nv;const xpL=a.xp!=null&&b.xp!=null&&dNv===0&&b.xp!==a.xp?`<tr><td>XP do treinador</td><td>${fmtI(a.xp)}</td><td>${fmtI(b.xp)}</td><td>${sinal(b.xp-a.xp)}</td></tr>`:'';
 const rA=a.rank,rB=b.rank;const rankL=rA&&rB&&!rA.erro&&!rB.erro?`<tr><td>PR (pontos PvP)</td><td>${fmtI(rA.pontos)}</td><td>${fmtI(rB.pontos)}</td><td>${sinal((rB.pontos||0)-(rA.pontos||0))}${rB.rotulo&&rA.rotulo&&rB.rotulo.toLowerCase()!==rA.rotulo.toLowerCase()?` <i>${esc(rA.rotulo)} → ${esc(rB.rotulo)}</i>`:''}</td></tr>
  ${rA.pos!=null&&rB.pos!=null?`<tr><td>Posição no ranking <i>(Tracker)</i></td><td>#${rA.pos}</td><td>#${rB.pos}</td><td>${sinal(rB.pos-rA.pos,true)}</td></tr>`:''}
  ${rA.v!=null&&rB.v!=null?`<tr><td>Vitórias / derrotas</td><td>${rA.v} / ${rA.d}</td><td>${rB.v} / ${rB.d}</td><td><span class="up">+${rB.v-rA.v}</span> / <span class="dn">+${rB.d-rA.d}</span></td></tr>`:''}`:'<tr><td colspan="4" class="z">PvP: não achei o PR na tela nem no Tracker.</td></tr>';
 const ids=new Set([...a.mons.map(m=>m.id),...b.mons.map(m=>m.id)]);
 const pk=[...ids].map(id=>{const x=a.mons.find(m=>m.id===id),y=b.mons.find(m=>m.id===id);const n=(y||x);const nome=`${n.shiny?'✨':''}${esc(n.nome)}`;
  if(x&&y)return`<tr><td>${nome}</td><td>Nv ${fmtI(x.nv)}</td><td>Nv ${fmtI(y.nv)}</td><td>${sinal(y.nv-x.nv)}${porH(y.nv-x.nv)}</td></tr>`;
  return x?`<tr><td>${nome}</td><td>Nv ${fmtI(x.nv)}</td><td class="z">saiu da equipe</td><td></td></tr>`:`<tr><td>${nome}</td><td class="z">não estava</td><td>Nv ${fmtI(y.nv)}</td><td class="z">entrou</td></tr>`;}).join('');
 return`<table><thead><tr><th></th><th>Antes</th><th>Agora</th><th>Diferença</th></tr></thead><tbody>
 <tr><td>Nível do treinador</td><td>Nv ${fmtI(a.nv)}</td><td>Nv ${fmtI(b.nv)}</td><td>${sinal(dNv)}${porH(dNv)}</td></tr>${xpL}${rankL}
 <tr class="sep"><td colspan="4">Pokémon da equipe</td></tr>${pk||'<tr><td colspan="4" class="z">Não achei a equipe na tela.</td></tr>'}</tbody></table>`;}
const CSS_CAP=`:host{all:initial}*{box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
.w{background:#1d1612;color:#f3ece6;border:1px solid #6b3a22;border-radius:14px;box-shadow:0 18px 50px #000b;font-size:12.5px;width:320px;max-width:calc(100vw - 16px);display:flex;flex-direction:column;max-height:calc(100vh - 16px)}
.w.larga{width:440px}
.tp{display:flex;align-items:center;gap:8px;padding:9px 10px 9px 12px;border-bottom:1px solid #3a2519;cursor:move;user-select:none;touch-action:none}
.tp h3{margin:0;flex:1;font-size:12.5px;letter-spacing:.07em}.tp h3 small{font-weight:500;letter-spacing:0;color:#b8a497;margin-left:4px}
.ib{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;border:1px solid #4a2c1d;background:#2a1d16;color:#f3ece6;cursor:pointer;font-size:15px;line-height:1;padding:0}
.ib:hover{border-color:#f0672a;color:#fff}.ib:focus-visible,.bt:focus-visible,.bl:focus-visible{outline:2px solid #f0672a;outline-offset:2px}
.cp{padding:12px;overflow:auto}.nt{color:#d8c8bd;line-height:1.45;margin:0 0 10px}.nt b{color:#fff}
.res{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px}.res div{background:#241a15;border:1px solid #3a2519;border-radius:9px;padding:7px 8px}.res small{display:block;color:#b8a497;font-size:10.5px}.res b{font-size:14px}
table{width:100%;border-collapse:collapse;font-size:12.5px;color:#f3ece6}th,td{padding:5px 6px;text-align:left;border-bottom:1px solid #2c1f18;vertical-align:top}td+td{white-space:nowrap}th{color:#b8a497;font-weight:600;font-size:11px}
.sep td{color:#f0672a;font-weight:700;font-size:11px;letter-spacing:.05em;text-transform:uppercase;padding-top:10px}
.up{color:#5ee0a0;font-weight:700}.dn{color:#ff8270;font-weight:700}.z{color:#9a8a80}i{color:#b8a497;font-style:normal;font-size:11px}
.bts{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #3a2519}.bl{flex:1;white-space:nowrap;padding:8px 10px;border-radius:9px;border:1px solid #4a2c1d;background:#2a1d16;color:#f3ece6;cursor:pointer;font-weight:600;font-size:12.5px}
.bl:hover{border-color:#f0672a}.bl.pri{background:#f0672a;border-color:#f0672a;color:#fff}.bl:disabled{opacity:.55;cursor:default}
.bo{position:relative;display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:#1d1612;border:2px solid #f0672a;box-shadow:0 8px 24px #000a;cursor:pointer;font-size:20px;user-select:none;touch-action:none}
.bo:hover{background:#2a1d16}.bo .pt{position:absolute;top:-3px;right:-3px;width:12px;height:12px;border-radius:50%;background:#5ee0a0;border:2px solid #1d1612}`;
// estado da janela: C.cap.min (bolinha) · posição ancorada no canto de baixo/direita (C.cap.r, C.cap.b), assim abrir/minimizar não "pula"
function posCap(){if(!capHost)return;const r=Math.max(4,Math.min(C.cap.r??16,innerWidth-50)),b=Math.max(4,Math.min(C.cap.b??90,innerHeight-50));capHost.style.right=r+'px';capHost.style.bottom=b+'px';capHost.style.left='auto';capHost.style.top='auto';
 // se a janela aberta passar da borda de cima/esquerda, encosta
 const q=capHost.getBoundingClientRect();if(q.top<4)capHost.style.bottom=Math.max(4,b-(4-q.top))+'px';if(q.left<4)capHost.style.right=Math.max(4,r-(4-q.left))+'px';}
function arrastavel(el,sh){let a=null;el.addEventListener('pointerdown',e=>{if(e.target.closest('.ib'))return;a={x:e.clientX,y:e.clientY,r:C.cap.r??16,b:C.cap.b??90,mov:false};try{el.setPointerCapture(e.pointerId);}catch(_){}});
 el.addEventListener('pointermove',e=>{if(!a)return;const dx=e.clientX-a.x,dy=e.clientY-a.y;if(!a.mov&&Math.abs(dx)+Math.abs(dy)>4)a.mov=true;if(a.mov){C.cap.r=Math.max(4,Math.min(innerWidth-50,a.r-dx));C.cap.b=Math.max(4,Math.min(innerHeight-50,a.b-dy));posCap();}});
 el.addEventListener('pointerup',()=>{const x=a;a=null;if(x&&x.mov){salvar();el.dataset.arrastou='1';setTimeout(()=>{delete el.dataset.arrastou;},0);}});}
function capMinimizar(v){C.cap.min=!!v;salvar();desenharCap();}
function desenharCap(){if(!capHost)return;const sh=capHost.shadowRoot;const raiz=sh.getElementById('capR');const a=MD.cap.base,u=MD.cap.ult;
 if(C.cap.min){raiz.innerHTML=`<div class="bo" id="capBo" role="button" tabindex="0" title="Comparar progresso — clique para abrir, arraste para mover" aria-label="Abrir Comparar progresso">📸${a?'<span class="pt" title="Há uma captura guardada"></span>':''}</div>`;
  const bo=sh.getElementById('capBo');arrastavel(bo);bo.addEventListener('click',()=>{if(bo.dataset.arrastou)return;capMinimizar(false);});bo.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();capMinimizar(false);}});posCap();return;}
 const temCmp=a&&u&&u.t>a.t;const larga=temCmp;
 let corpo,bts;
 if(capRodando){corpo=`<p class="nt">Lendo o treinador, o PR e a equipe…</p>`;bts='';}
 else if(!a){corpo=`<p class="nt">Guarde um <b>ponto de partida</b> agora. Depois é só abrir de novo e clicar em <b>Comparar</b> para ver quanto subiu o nível do treinador, o PR do PvP e os níveis da equipe.</p>`;
  bts=`<button class="bl pri" id="capCap">📸 Capturar agora</button>`;}
 else{const res=`<div class="res"><div><small>Treinador</small><b>Nv ${fmtI(a.nv)}</b></div><div><small>PR</small><b>${a.rank&&a.rank.pontos!=null?fmtI(a.rank.pontos):'—'}</b></div><div><small>Equipe</small><b>${a.mons.length} pokémon</b></div></div>`;
  corpo=`<p class="nt">Ponto de partida: <b>${dataHora(a.t)}</b> · há ${durTxt(Date.now()-a.t)}</p>${temCmp?`<p class="nt" style="margin-top:-6px">Comparado às <b>${hora(u.t)}</b> (${durTxt(u.t-a.t)} depois da captura)</p>${htmlCap(a,u)}`:res}`;
  bts=`<button class="bl" id="capNova" title="Guarda agora como o novo ponto de partida">Nova captura</button><button class="bl pri" id="capCmp">${temCmp?'Atualizar':'Comparar agora'}</button>`;}
 raiz.innerHTML=`<div class="w${larga?' larga':''}" role="dialog" aria-label="Comparar progresso"><div class="tp" id="capTp" title="Arraste para mover">${LOGO(18)}<h3>COMPARAR${a?`<small>desde ${hora(a.t)}</small>`:''}</h3><button class="ib" id="capMin" title="Minimizar" aria-label="Minimizar">–</button></div>
  <div class="cp">${corpo}</div>${bts?`<div class="bts">${bts}</div>`:''}</div>`;
 arrastavel(sh.getElementById('capTp'));sh.getElementById('capMin').onclick=()=>capMinimizar(true);
 const on=(id,f)=>{const e=sh.getElementById(id);if(e)e.onclick=f;};on('capCap',()=>cliqueCap());on('capCmp',()=>cliqueCap());
 on('capNova',()=>{novaCapturaCap();});posCap();}
async function novaCapturaCap(){if(capRodando)return;capRodando=true;desenharCap();let s;try{s=await capturarCap();}finally{capRodando=false;}MD.cap.base=s;MD.cap.ult=null;salvarM();desenharCap();pintar();
 avisoPokebot({tipo:'ok',tit:'Nova captura guardada',txt:`Treinador Nv ${fmtI(s.nv)}${s.rank&&s.rank.pontos!=null?` · ${fmtI(s.rank.pontos)} PR`:''} · ${s.mons.length} pokémon`,sub:'As comparações partem de agora.'});}
function pintarCapBt(){const mostrar=!MULTI&&vivo&&C.cap.on&&liberado()&&!!document.querySelector('#tr-nick');
 if(!mostrar){if(capHost)capHost.style.display='none';return;}
 if(!capHost){capHost=document.createElement('div');capHost.setAttribute('data-pokebot-cap','');capHost.style.cssText='position:fixed;z-index:2147483001;';document.body.append(capHost);
  capHost.attachShadow({mode:'open'}).innerHTML=`<style>${CSS_CAP}</style><div id="capR"></div>`;capHost.dataset.sig='';}
 if(capHost.style.display==='none')capHost.style.display='';
 // redesenha só quando algo muda (e a cada minuto, para o "há X min")
 const sig=[C.cap.min,capRodando,MD.cap.base&&MD.cap.base.t,MD.cap.ult&&MD.cap.ult.t,Math.floor(Date.now()/6e4)].join('|');if(capHost.dataset.sig!==sig){capHost.dataset.sig=sig;desenharCap();}}
async function cliqueCap(){if(capRodando)return;capRodando=true;if(capHost)desenharCap();let s;try{s=await capturarCap();}finally{capRodando=false;}
 if(C.cap.min){C.cap.min=false;salvar();}
 if(!MD.cap.base){MD.cap.base=s;MD.cap.ult=null;salvarM();pintar();desenharCap();avisoPokebot({tipo:'ok',tit:'Captura guardada',txt:`Treinador Nv ${fmtI(s.nv)}${s.rank&&s.rank.pontos!=null?` · ${fmtI(s.rank.pontos)} PR`:''} · ${s.mons.length} pokémon da equipe`,sub:'Abra de novo e clique em Comparar quando quiser ver o que mudou.'});return;}
 MD.cap.ult=s;salvarM();desenharCap();}
function miniCap(){const b=MD.cap.base;return b?`Captura guardada em ${dataHora(b.t)} · Nv ${fmtF(b.nv)}${b.rank&&b.rank.pos?` · PvP #${b.rank.pos}`:''} · ${b.mons.length} pokémon`:'Clique em 📸 Capturar agora para guardar o ponto de partida.';}
function renderCap(){const on=cardBase('cap',C.cap,'Comparar progresso','Botão flutuante 📸: guarda o nível do treinador, o ranking PvP e o nível da equipe e mostra o que mudou desde então.',miniCap,()=>
  `<div class="nota">Na tela do jogo fica a janelinha <b>Comparar</b>: <b>📸 Capturar agora</b> guarda o ponto de partida; depois <b>Comparar agora</b> mostra o que mudou. Arraste pela barra do título para mover; o <b>–</b> minimiza para a bolinha 📸 (clique nela para abrir). O PR é lido do próprio jogo (ao lado do emblema do ranking); a posição vem do Tracker. Funciona com o bot ativado ou não.</div>
  <div class="btns"><button class="btn" id="capZera" ${MD.cap.base?'':'disabled'}>Apagar a captura guardada</button><button class="btn" id="capPos">Voltar ao canto</button><button class="btn" id="capMin">${C.cap.min?'Abrir a janela':'Minimizar a janela'}</button></div>`);
 if(!on)return;on('capZera','onclick',()=>{MD.cap.base=null;MD.cap.ult=null;salvarM();pintar();desenharCap();});on('capPos','onclick',()=>{C.cap.r=null;C.cap.b=null;salvar();posCap();});on('capMin','onclick',()=>{capMinimizar(!C.cap.min);pintar();});}
function renderPasse(){const on=cardBase('ps',C.ps,'Auto-Passe diário','Resgata o prêmio do Passe de Batalha assim que libera.',miniPasse,()=>{const p=MD.ps.ult;
  return `${p?`<div class="nota">Dia ${p.dia||'?'} de 30 · sequência ${p.seq||0} · ${p.pode?'<span class="no">não resgatado</span>':'<span class="ok">resgatado</span>'} · próximo ${p.prox?hora(p.prox):'—'} · sequência zera ${p.zera?dataHora(p.zera):'—'}${p.vip?' · VIP '+esc(p.vipResta):''}</div>`:''}
  <div class="btns"><button class="btn pri" id="psAgora" ${C.ativo&&!usoTela?'':'disabled'}>Verificar e resgatar agora</button></div>
  <div class="nota">Clico só em <b>.ps-resgatar</b>. Nunca no botão de comprar/estender o VIP. O dia vira à meia-noite de Brasília.</div>${lgHtml(MD.ps.hist)}`;});
 if(on)on('psAgora','onclick',()=>{psProx=0;checarPasse().then(()=>pintar());});}
function renderSup(){const on=cardBase('sup',C.sup,'Suprimentos e loot','Compra bolas/poções no NPC quando acabam e vende o loot.',miniSup,()=>{const q=MD.sup.qt||{};
  return `<div class="tb" style="max-height:200px"><table><thead><tr><th>Item</th><th>Tem</th><th>Comprar se &lt;</th><th>Lote</th><th></th></tr></thead><tbody>${C.sup.itens.map((it,i)=>`<tr><td><label class="op" style="gap:5px"><input type="checkbox" data-supon="${i}" ${it.on!==false?'checked':''}>${esc(it.n)}</label></td><td>${q[it.n]!=null?q[it.n].toLocaleString('pt-BR'):'—'}</td><td>${campoNum('supMin'+i,it.min,80)}</td><td>${campoNum('supLote'+i,it.lote,80)}</td><td><button class="lnk" data-suprm="${i}">tirar</button></td></tr>`).join('')}</tbody></table></div>
  <div class="rota" style="display:flex;gap:6px"><select id="supNovo" class="inp" style="flex:1">${['Poké Ball','Great Ball','Super Ball','Ultra Ball','Small Potion','Great Potion','Ultra Potion','Hyper Potion','Ultimate Potion','Golden Potion','Revive','Max Revive'].filter(n=>!C.sup.itens.some(i=>i.n===n)).map(n=>`<option>${n}</option>`).join('')}</select><button class="btn" id="supAdd" style="flex:none">Adicionar</button></div>
  <div class="ops"><label class="op"><input type="checkbox" id="supLoot" ${C.sup.loot?'checked':''}><span><b>Vender o loot ao NPC</b><small>item com cadeado (lootTravado) fica. Se a Venda Automática do jogo estiver ligada, ela já faz isso.${MD.sup.autoJogo?' <span class="warn">Ela está ligada.</span>':''}</small></span></label></div>
  <div class="cfg2"><label>Guardar sempre (ouro)${campoNum('supRes',C.sup.reserva,110)}</label><label>Gastar no máx. por dia${campoNum('supOrc',C.sup.orcDia,110)}</label><label>Conferir a cada<select id="supInt" class="inp">${[5,10,30,60].map(m=>`<option value="${m}" ${C.sup.intervalo==m?'selected':''}>${m<60?m+' min':'1 h'}</option>`).join('')}</select></label></div>
  <div class="btns"><button class="btn pri" id="supAgora" ${C.ativo&&!usoTela?'':'disabled'}>Conferir agora</button></div>${lgHtml(MD.sup.hist)}`;});
 if(!on)return;const s=C.sup;on('supAgora','onclick',()=>{supProx=0;rodarSuprimentos(true).then(()=>pintar());});on('supLoot','onchange',e=>{s.loot=e.target.checked;salvar();});
 on('supRes','onchange',e=>{s.reserva=Math.max(0,num(e.target.value));salvar();});on('supOrc','onchange',e=>{s.orcDia=Math.max(0,num(e.target.value));salvar();});on('supInt','onchange',e=>{s.intervalo=+e.target.value;salvar();});
 s.itens.forEach((it,i)=>{on('supMin'+i,'onchange',e=>{it.min=Math.max(0,num(e.target.value));salvar();});on('supLote'+i,'onchange',e=>{it.lote=Math.max(0,Math.min(9999,num(e.target.value)));salvar();pintar();});});
 R.querySelectorAll('[data-supon]').forEach(b=>b.onchange=()=>{s.itens[+b.dataset.supon].on=b.checked;salvar();});R.querySelectorAll('[data-suprm]').forEach(b=>b.onclick=()=>{s.itens.splice(+b.dataset.suprm,1);salvar();pintar();});
 on('supAdd','onclick',()=>{const n=$('supNovo')?.value;if(n){s.itens.push({n,min:100,lote:500,on:true});salvar();pintar();}});}
function renderMods(){renderPk();renderVd();renderPasse();renderSup();renderCap();}
function statusMods(){const u=(id,f)=>{const e=R.getElementById(id);if(e)e.textContent=f();};u('psStatus',miniPasse);u('supStatus',miniSup);u('pkStatus',miniPk);u('vdStatus',miniVd);u('capStatus',miniCap);}
function cicloMods(){if(!C.ativo||!vivo)return;cicloPasse();cicloSup();cicloVd();}

// ============================ ABAS DO PAINEL ============================
function cfgDo(card){return C[card]||{};}
function pintarAbas(){ABAS.forEach(a=>{const b=$('aba-'+a.id),p=$('pane-'+a.id);if(!b||!p)return;const on=a.id===C.aba;b.classList.toggle('on',on);b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;p.classList.toggle('on',on);
  const ligados=a.cards.filter(c=>cfgDo(c).on).length;const n=$('abaN-'+a.id);if(n)n.textContent=ligados?String(ligados):'';
  const rod=!!usoTela&&a.cards.some(c=>({sup:['suprimentos'],pk:['equipe'],vd:['venda'],ps:['passe']})[c]?.includes(usoTela));
  b.classList.toggle('rodando',rod);b.title=`${a.nome}: ${ligados} de ${a.cards.length} ligado(s)${rod?' · trabalhando agora':''}`;});}
function irAba(id,foco){if(!ABAS.some(a=>a.id===id))return;C.aba=id;salvar();pintarAbas();if(foco)$('aba-'+id)?.focus();R.querySelector('.corpo').scrollTop=0;}
ABAS.forEach((a,i)=>{const b=$('aba-'+a.id);if(!b)return;b.onclick=()=>irAba(a.id);
 b.onkeydown=e=>{const k=e.key;if(k!=='ArrowRight'&&k!=='ArrowLeft'&&k!=='Home'&&k!=='End')return;e.preventDefault();const j=k==='Home'?0:k==='End'?ABAS.length-1:(i+(k==='ArrowRight'?1:-1)+ABAS.length)%ABAS.length;irAba(ABAS[j].id,true);};});
// ============================ ANTI-AFK · LOCK SCREEN ============================
// 1) App: pede ao Esclerobot para não deixar o computador dormir (ponte do tela-preload.js, por window.postMessage).
// 2) Reforço: Screen Wake Lock da própria página — vale enquanto a tela estiver visível.
// Nada é clicado no jogo e nenhuma tecla é simulada.
let afkErro='',afkWake=null,afkTimer=null,afkPonte=false;
function afkMsg(on){window.postMessage({__pokebotAfk:!!on,v:V},'*');}
function ouvirPonte(e){if(e.source!==window||!e.data||e.data.__pokebotAfkResp==null)return;const r=e.data.__pokebotAfkResp;afkPonte=!!(r&&r.ok);if(r&&r.erro)afkErro=r.erro;pintarAfk();}
addEventListener('message',ouvirPonte);
async function pedirWakeLock(){if(!C.afk.on||afkWake||document.visibilityState!=='visible')return;try{if(!('wakeLock' in navigator))throw new Error('este navegador não tem Wake Lock');
  afkWake=await navigator.wakeLock.request('screen');afkWake.addEventListener('release',()=>{afkWake=null;pintarAfk();});}catch(e){afkWake=null;if(!afkPonte)afkErro=String(e&&e.message||e);}pintarAfk();}
const afkVisivel=()=>{if(C.afk.on&&document.visibilityState==='visible')pedirWakeLock();};document.addEventListener('visibilitychange',afkVisivel);
function afkLigar(){afkErro='';afkMsg(true);pedirWakeLock();clearInterval(afkTimer);afkTimer=setInterval(()=>{if(!C.afk.on)return;afkMsg(true);pedirWakeLock();},60e3);pintarAfk();}
function afkDesligar(){clearInterval(afkTimer);afkTimer=null;afkMsg(false);try{afkWake&&afkWake.release();}catch(e){}afkWake=null;afkPonte=false;pintarAfk();}
function setAfk(v){C.afk.on=!!v;salvar();if(C.afk.on)afkLigar();else afkDesligar();}
function textoAfk(){if(!C.afk.on)return'Desligado: o computador pode bloquear a tela.';
 if(afkPonte)return'Ligado: o Chrome mantém a tela acordada (Mac e Windows), mesmo com a aba minimizada.';
 if(afkWake)return'Ligado pelo navegador: funciona enquanto a aba do jogo estiver visível.';
 return afkErro?`Não consegui segurar a tela: ${afkErro}. Recarregue a conta (⟳).`:'Ligando…';}
function pintarAfk(){const b=$('afk');if(!b)return;const on=C.afk.on;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));$('afkS').textContent=textoAfk();
 const d=document.querySelector('.menu-topo [data-pokebot] .pb-afk');if(d)d.style.display=on?'':'none';}
function mostrarTermos(v){const jan=R.querySelector('.jan'),t=$('termosV');if(!jan||!t)return;jan.classList.toggle('vtermos',!!v);t.hidden=!v;if(!v)return;
 t.innerHTML=`<div class="sec">Sobre</div><div><div class="cr">${esc(AUTORIA.produto)} v${V}</div>© ${esc(AUTORIA.ano)} ${esc(AUTORIA.autor)}. Todos os direitos reservados.</div>
 <ul><li>Uso pessoal, na forma exata em que foi distribuído.</li><li>É proibido modificar, copiar, redistribuir, revender ou tentar extrair o código.</li><li>Ferramenta não oficial, sem vínculo com o PokéIdle, a Nintendo ou a The Pokémon Company. O uso de automações pode contrariar as regras do jogo: você é responsável pelo uso na sua conta.</li></ul>
 <details${termosOk?'':' open'}><summary>Ler a licença completa</summary><pre>${esc(LICENCA)}</pre></details>
 ${termosOk?`<div class="nota ok">✔ Você aceitou os termos de uso.</div><div class="btns"><button class="btn" id="termosVoltar">Voltar</button></div>`
  :`<label class="op"><input type="checkbox" id="termosChk"><span><b>Li e aceito a licença de uso</b><small>Sem aceitar, o bot fica desativado.</small></span></label><div class="btns"><button class="btn pri" id="termosAceitar" disabled>Aceitar e usar o ${esc(AUTORIA.produto)}</button></div>`}`;
 const chk=$('termosChk'),ac=$('termosAceitar');if(chk&&ac)chk.onchange=()=>{ac.disabled=!chk.checked;};
 if(ac)ac.onclick=()=>{if(!chk.checked)return;termosOk=true;try{localStorage.setItem(CHT,String(TERMOS_V));}catch(e){}mostrarTermos(false);pintar();$('bot')?.focus();};
 const vt=$('termosVoltar');if(vt)vt.onclick=()=>{mostrarTermos(false);pintar();};(chk||vt)?.focus();}

function mostrarPortao(){if(!termosOk)mostrarTermos(true);}

function pintar(){pintarAfk();pintarAbas();const on=C.ativo;$('bot').classList.toggle('on',on);$('bot').setAttribute('aria-pressed',String(on));$('botT').textContent=on?'ATIVADO':'DESATIVADO';
 $('botS').textContent=on?'Clique para desativar.':'Clique para ativar.';
 if(aberto()){const ae=R.activeElement;if(!(ae&&/SELECT|INPUT/.test(ae.tagName))){renderMods();}}
 const d=document.querySelector('.menu-topo [data-pokebot] .pb-dot');if(d){d.style.background=on?'#4ad295':'#7a7390';d.title=on?'Bot ativado':'Bot desativado';}}
function setAtivo(v){if(v&&!liberado()){abrir(true);mostrarPortao();return;}C.ativo=!!v;salvar();pintar();window.dispatchEvent(new CustomEvent('pokebot:ativo',{detail:C.ativo}));}
function limitar(x,y){const w=host.offsetWidth||420,h=host.offsetHeight||200;return[Math.min(Math.max(0,x),Math.max(0,innerWidth-w)),Math.min(Math.max(0,y),Math.max(0,innerHeight-Math.min(h,60)))];}
function posicionar(){if(C.jx==null){const w=host.offsetWidth||420,h=host.offsetHeight||240;host.style.left=Math.max(0,(innerWidth-w)/2)+'px';host.style.top=Math.max(0,(innerHeight-h)/2)+'px';return;}const[x,y]=limitar(C.jx,C.jy);host.style.left=x+'px';host.style.top=y+'px';}
function abrir(v){if(window.__esclMulti)v=false;host.style.display=v?'':'none';const b=document.querySelector('.menu-topo [data-pokebot]');if(b){b.setAttribute('aria-expanded',String(v));const pl=b.querySelector('.eb-pill');if(pl)pl.style.boxShadow=v?'0 0 0 2px #2a0a12,0 0 0 4px #ff9a66aa,0 0 14px #f0672a88,inset 0 1px 0 #ffffff1a':'0 0 0 2px #2a0a12,0 3px 0 #0006,inset 0 1px 0 #ffffff1a';}if(v){pintar();posicionar();if(!liberado())mostrarPortao();else $('bot').focus({preventScroll:true});}}
$('bot').onclick=()=>setAtivo(!C.ativo);$('sobreBtn').onclick=()=>mostrarTermos(!$('termosV').hidden?false:true);$('afk').onclick=()=>setAfk(!C.afk.on);$('fechar').onclick=()=>abrir(false);
const topo=R.querySelector('.top');
topo.addEventListener('pointerdown',ev=>{if(ev.button!==0||ev.target.closest('button'))return;ev.preventDefault();const r=host.getBoundingClientRect(),dx=ev.clientX-r.left,dy=ev.clientY-r.top;topo.classList.add('arr');topo.setPointerCapture(ev.pointerId);
 const mv=e=>{const[x,y]=limitar(e.clientX-dx,e.clientY-dy);C.jx=x;C.jy=y;host.style.left=x+'px';host.style.top=y+'px';};
 const up=()=>{topo.classList.remove('arr');topo.removeEventListener('pointermove',mv);topo.removeEventListener('pointerup',up);topo.removeEventListener('pointercancel',up);salvar();};
 topo.addEventListener('pointermove',mv);topo.addEventListener('pointerup',up);topo.addEventListener('pointercancel',up);});
topo.addEventListener('dblclick',e=>{if(e.target.closest('button'))return;C.jx=null;C.jy=null;salvar();posicionar();});
const aoRedim=()=>{if(aberto())posicionar();if(capHost)posCap();if(pkHost)posPainel();};addEventListener('resize',aoRedim);
const tecla=e=>{if(e.key==='Escape'&&cmpHost){e.stopPropagation();fecharComparacao();return;}if(e.key==='Escape'&&aberto()){e.stopPropagation();abrir(false);}};addEventListener('keydown',tecla,true);
const PILL_CSS='display:inline-flex;align-items:center;gap:8px;padding:6px 12px 6px 7px;border-radius:10px;background:linear-gradient(180deg,#34241b,#1d1612);border:1.5px solid #f0672a;box-shadow:0 0 0 2px #2a0a12,0 3px 0 #0006,inset 0 1px 0 #ffffff1a;position:relative;line-height:1;white-space:nowrap;transition:box-shadow .15s,filter .15s';
function botao(){if(window.__esclMulti)return;const menu=document.querySelector('.menu-topo');if(!menu||menu.querySelector('[data-pokebot]'))return;
 const wiki=[...menu.querySelectorAll('button,a')].find(e=>e.innerText.trim()==='Wiki');
 const b=document.createElement('button');b.type='button';b.setAttribute('data-pokebot','');b.title='Esclerobot';b.setAttribute('aria-haspopup','dialog');
 if(wiki&&wiki.className)b.className=wiki.className;
 const img=wiki&&wiki.querySelector('img');const px=img?Math.round(img.getBoundingClientRect().height)||24:24;
 // logo + nome numa caixa só (a moldura de fora é a do próprio jogo, para alinhar com os outros botões do menu)
 const tam=Math.max(18,Math.min(24,px));
 b.innerHTML=`<span class="eb-pill" style="${PILL_CSS}">${LOGO(tam)}<span style="font:inherit;font-size:13px;color:#fff;letter-spacing:.02em;text-shadow:0 1px 0 #0008">Esclero<span style="color:#ff9a66">bot</span></span><i class="pb-dot" style="position:absolute;right:-4px;top:-4px;width:9px;height:9px;border-radius:50%;border:2px solid #1d1612"></i></span>`;
 const pill=b.querySelector('.eb-pill');b.onmouseenter=()=>{pill.style.filter='brightness(1.15)';};b.onmouseleave=()=>{pill.style.filter='';};
 b.onclick=e=>{e.preventDefault();e.stopPropagation();abrir(!aberto());};
 if(wiki)wiki.after(b);else menu.append(b);pintar();}

const tick=setInterval(()=>{botao();try{pintarCapBt();}catch(e){}cicloMods();if(aberto()){statusMods();pintarAbas();}},1000);
function parar(){vivo=false;try{obsShiny&&obsShiny.disconnect();}catch(e){}try{capHost&&capHost.remove();cmpHost&&cmpHost.remove();}catch(e){}clearInterval(tick);clearInterval(afkTimer);removeEventListener('message',ouvirPonte);document.removeEventListener('visibilitychange',afkVisivel);try{afkWake&&afkWake.release();}catch(e){}salvarM();salvarP();obsFicha&&obsFicha.disconnect();fecharPainelPk();document.querySelectorAll('[data-pokebot-analisar]').forEach(b=>b.remove());avisoHost&&avisoHost.remove();removeEventListener('keydown',tecla,true);removeEventListener('resize',aoRedim);host.remove();document.querySelector('.menu-topo [data-pokebot]')?.remove();delete window.__pokebot;}
// v41: resumo da conta para o app de 4 contas (Esclerobot Multi) — só lê a tela
function resumoConta(){const p=document.querySelector('.painel.treinador')||document.querySelector('#tr-nick')?.closest('.painel');const tx=p?.innerText||'';
 const folha=re=>[...(p?p.querySelectorAll('*'):[])].find(e=>!e.children.length&&re.test((e.textContent||'').trim()))?.textContent.trim()||'';
 const xp=(folha(/^[\d.]+\s*\/\s*[\d.]+\s*xp$/i)||tx).match(/([\d.]+)\s*\/\s*([\d.]+)\s*xp/i);const nvF=num((folha(/^Nv\s*[\d.]+$/i).match(/([\d.]+)/)||[])[1]);const campoEl=[...document.querySelectorAll('.painel')].find(x=>/EM CAMPO|ON FIELD|EN CAMPO/i.test(x.innerText||''));
 const campo=campoEl?((campoEl.innerText||'').replace(/\s+/g,' ').match(/(?:EM CAMPO|ON FIELD|EN CAMPO)\s*(.*?(?:Nv|Lv)\s*[\d.]+)/i)||[])[1]||'':'';
 const prog=usoTela?({venda:vdProg||'Vendendo…',suprimentos:'Suprimentos…',passe:'Resgatando o passe…'}[usoTela]||usoTela):'';
 return{v:V,nick:meuNick(),nv:nvF||num((tx.match(/Nv\s*([\d.]+)(?:\s|$)/)||[])[1])||nivelTreinador(),xp:xp?num(xp[1]):null,xpMax:xp?num(xp[2]):null,pr:num(((document.querySelector('#tr-rank-pr')?.textContent||'').match(/([\d.]+)\s*PR/i)||[])[1])||null,
  tier:(document.querySelector('#tr-rank-nome')?.textContent||'').trim(),campo:campo.replace(/^✨\s*/,'✨').trim(),ativo:C.ativo,liberado:liberado(),afk:!!C.afk.on,
  mods:{venda:C.vd.on,sup:C.sup.on,passe:C.ps.on},prog,logado:!!meuNick()&&meuNick()!=='—',t:Date.now(),
  ouro:ouroAtual(),pausas:MD.mud.pausa,shinies:MD.shiny.lista.slice(-30),sessao:contaEmOutroLugar()?'outro':'ok',onde:ondeEsta(),twitch:(()=>{try{return liveResumo('twitch');}catch(e){return null;}})(),kick:(()=>{try{return liveResumo('kick');}catch(e){return null;}})(),avisos:AVISOS,avisoId:avisoSeq,vSessao:INICIO};}
// ============================ LIVES: TWITCH e KICK (v50/v52) ============================
// O jogo dá bônus de XP para quem assiste às lives oficiais (Twitch e Kick). O bot descobre quais estão no ar:
//  1) lendo o bloco "twitch"/"kick" que o próprio jogo decodifica (JSON.parse), sem pedir nada ao servidor;
//  2) pela ficha do treinador: clica em "Twitch ao vivo"/"Kick ao vivo" (abaixo do Passe VIP), lê os canais e fecha.
const minus=x=>String(x??'').trim().toLowerCase();
const PLAT={
 twitch:{nome:'Twitch',chave:'twitch',linha:'.tr-ativo.twitch',re:/twitch/i,link:/twitch\.tv\/([A-Za-z0-9_]+)/,href:'a[href*="twitch.tv/"]',janela:'#tw-corpo',
  reserv:/^(login|signup|directory|settings|videos|p|search|downloads|jobs|turbo|subscriptions|inventory|wallet|friends|messages|drops|popout)$/},
 kick:{nome:'Kick',chave:'kick',linha:'.tr-ativo.kick',re:/\bkick\b/i,link:/kick\.com\/([A-Za-z0-9_-]+)/,href:'a[href*="kick.com/"]',janela:'#kk-corpo',
  reserv:/^(login|signup|register|categories|category|search|browse|following|dashboard|settings|privacy|terms|community-guidelines|security|api|popout)$/}};
function acharBloco(o,k,d){if(!o||typeof o!=='object'||d>6)return null;
 if(o[k]&&typeof o[k]==='object'&&Array.isArray(o[k].oficiais))return o[k];
 for(const x in o){const v=o[x];if(v&&typeof v==='object'){const r=acharBloco(v,k,d+1);if(r)return r;}}return null;}
if(!window.__esclJP){const orig=JSON.parse;window.__esclJP=orig;
 JSON.parse=function(t,r){const v=orig.call(this,t,r);try{if(typeof t==='string'&&t.length>30&&t.indexOf('"oficiais"')>=0){
  const tw=acharBloco(v,'twitch',0);if(tw)window.__esclTw={tw:orig(JSON.stringify(tw)),t:Date.now()};
  const kk=acharBloco(v,'kick',0);if(kk)window.__esclKk={tw:orig(JSON.stringify(kk)),t:Date.now()};}}catch(e){}return v;};}
function blocoNorm(tw,fonte,plat){const noAr=new Map((tw.lives||[]).map(l=>[minus(l.login||l.slug),l]));
 const canais=(tw.oficiais||[]).map(o=>{const id=minus(o.login||o.slug);const l=noAr.get(id);const vivo=plat==='kick'?!!(o.aoVivo||l):!!l;
  return{login:id,nome:String(o.nome||l&&l.nome||id||''),bonus:plat==='kick'?o.ativo!==false:o.bonus===true,aoVivo:vivo,esp:+(l&&l.espectadores||o.espectadores)||0};}).filter(c=>c.login);
 return{fonte,t:Date.now(),login:tw.login?minus(tw.login):(tw.vinculado?'?':null),aoVivo:!!tw.aoVivo||canais.some(c=>c.aoVivo),assistindo:!!tw.assistindo,assistindoEm:(tw.assistindoEm||[]).map(minus),pct:+tw.pctAtual||+tw.pct||0,canais};}
const visivel=e=>!!e&&e.isConnected&&(e.offsetParent!==null||getComputedStyle(e).position==='fixed')&&getComputedStyle(e).visibility!=='hidden';
const LV={twitch:{t:0,res:null,lendo:false,diag:{t:0,txt:'ainda não li'}},kick:{t:0,res:null,lendo:false,diag:{t:0,txt:'ainda não li'}}};
// o botão "Twitch ao vivo"/"Kick ao vivo" da ficha do treinador (logo abaixo do Passe VIP)
function linhaLive(pl){const P=PLAT[pl];let b=document.querySelector(`button${P.linha},${P.linha}`);
 if(!b)b=[...document.querySelectorAll('button,[role=button],a')].find(e=>{const t=(e.textContent||'').trim();return t.length<90&&P.re.test(t)&&visivel(e);});
 if(!b)return null;const txt=(b.textContent||'').toLowerCase(),cls=String(b.className||'');
 const estado=(cls.match(/(?:tw|kk)-(conectar|ativo|aovivo|offline|vinculado)/)||[])[1]||(/conectar|connect|vincular/.test(txt)?'conectar':/offline/.test(txt)?'offline':/ao vivo|en vivo|\blive\b|assista|watch/.test(txt)?'aovivo':/%|resgat/.test(txt)?'ativo':'');
 return{el:b,estado};}
function janelaLive(pl){const P=PLAT[pl];const j=document.querySelector(P.janela);if(j)return j;
 return [...document.querySelectorAll('.modal-caixa,[role=dialog],.modal,#modal')].filter(visivel).find(m=>m.querySelector(P.href)||P.re.test((m.querySelector('h1,h2,h3,.modal-titulo,header')||{}).textContent||''))||null;}
function lerCanais(pl,host){const P=PLAT[pl];const id=a=>minus((String(a.getAttribute('href')).match(P.link)||[])[1]);const porLogin=new Map();
 for(const a of host.querySelectorAll(P.href)){const login=id(a);if(!login||P.reserv.test(login))continue;(porLogin.get(login)||porLogin.set(login,[]).get(login)).push(a);}
 const canais=[];
 for(const [login,as] of porLogin){// a "linha" do canal: o maior bloco em volta do link que não tem link de outro canal
  let linha=as[0];while(linha.parentElement&&linha.parentElement!==host){const pai=linha.parentElement;if([...pai.querySelectorAll(P.href)].some(x=>id(x)!==login))break;linha=pai;}
  const txt=(linha.innerText||linha.textContent||'').replace(/\s+/g,' ').trim();const tl=txt.toLowerCase();const cls=(String(linha.className||'')+' '+[...linha.querySelectorAll('[class]')].map(x=>String(x.className)).join(' ')).toLowerCase();
  const off=/offline|fora do ar|desligad|não está ao vivo|not live|sin directo/.test(tl)||/\boff\b|offline/.test(cls);
  const vivo=!off&&(/ao vivo|en vivo|\blive\b|assistindo|espectador|viewer|watching|\bon\b/.test(tl)||/aovivo|ao-vivo|\blive\b|\bon\b|vivo|noar|no-ar/.test(cls)||/\d[\d.,]*\s*(espectador|viewer|👤)/i.test(txt));
  const semBonus=/sem b[oô]nus|no bonus|sin bono|bônus indispon|sem o b[oô]nus/.test(tl);
  const nome=(as.map(x=>(x.textContent||'').trim()).find(t=>t&&!/twitch|kick|assist|abrir|watch/i.test(t))||login).slice(0,40);
  canais.push({login,nome,bonus:!semBonus,aoVivo:vivo,esp:+((txt.match(/(\d[\d.,]*)\s*(?:espectador|viewer)/i)||[])[1]||'0').replace(/\D/g,'')||0});}
 return canais;}
async function fecharJanelaLive(pl){const f=document.querySelector('#modal-fechar');if(visivel(f)){await clicar(f);return;}
 const j=janelaLive(pl);const x=j&&[...j.querySelectorAll('button')].find(b=>/^[×x✕]$|fechar|close/i.test((b.textContent||b.getAttribute('aria-label')||'').trim()));if(x){await clicar(x);return;}
 document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));}
// abre a janela da live, lê e fecha. Sozinho: a cada 2 min com live no ar (5 min sem saber, 10 min offline); "agora" força.
async function lerJanelaLive(pl,agora){const L=LV[pl],P=PLAT[pl];if(L.lendo)return L.res;const ln=linhaLive(pl);
 if(!ln){L.diag={t:Date.now(),txt:`não achei o botão “${P.nome} ao vivo” na ficha do treinador`};return null;}
 if(ln.estado==='conectar'){L.res={fonte:'tela',t:Date.now(),login:null,aoVivo:false,assistindo:false,assistindoEm:[],pct:0,canais:[]};L.diag={t:Date.now(),txt:`${P.nome} não vinculada nesta conta`};return L.res;}
 const cada=ln.estado==='offline'?10*60e3:/ativo|aovivo/.test(ln.estado)?2*60e3:5*60e3;
 if(!agora&&(usoTela||Date.now()-L.t<cada||LV.twitch.lendo||LV.kick.lendo))return L.res;
 const outra=[...document.querySelectorAll('.modal-caixa,[role=dialog]')].some(visivel);if(outra&&!janelaLive(pl)&&!agora)return L.res;
 L.t=Date.now();L.lendo=true;
 try{let host=janelaLive(pl);const jaAberta=!!host;
  if(!host){if(!(await clicar(()=>linhaLive(pl)&&linhaLive(pl).el)))throw new Error(`não consegui clicar em “${P.nome} ao vivo”`);
   for(let k=0;k<30&&!host;k++){await S_(150);host=janelaLive(pl);}}
  if(!host)throw new Error(`cliquei em “${P.nome} ao vivo”, mas a janela não abriu`);
  let canais=[];for(let k=0;k<12;k++){canais=lerCanais(pl,host);if(canais.length)break;await S_(300);host=janelaLive(pl)||host;}
  await S_(400);canais=lerCanais(pl,janelaLive(pl)||host);
  if(!jaAberta)await fecharJanelaLive(pl);
  const vivos=canais.filter(c=>c.aoVivo);
  L.diag={t:Date.now(),txt:canais.length?`${canais.length} canal(is), ${vivos.length} ao vivo${vivos.length?': '+vivos.map(c=>c.nome).join(', '):''}`:`abri “${P.nome} ao vivo”, mas não achei nenhum link de canal`,amostra:canais.length?'':(host.innerText||'').replace(/\s+/g,' ').slice(0,200)};
  L.res={fonte:'tela',t:Date.now(),login:'?',aoVivo:vivos.length>0||/ativo|aovivo/.test(ln.estado),assistindo:ln.estado==='ativo',assistindoEm:[],pct:0,canais};}
 catch(e){L.diag={t:Date.now(),txt:String(e&&e.message||e)};}
 finally{L.lendo=false;}
 return L.res;}
function liveResumo(pl){const L=LV[pl];const j=pl==='twitch'?window.__esclTw:window.__esclKk;const ln=linhaLive(pl);let r=null;
 if(j&&Date.now()-j.t<5*60e3)r=blocoNorm(j.tw,'jogo',pl);
 else{if(!contaEmOutroLugar())lerJanelaLive(pl,false).catch(()=>{});
  r=L.res&&Date.now()-L.res.t<12*60e3?L.res:(ln?{fonte:'linha',t:0,login:ln.estado==='conectar'?null:'?',aoVivo:/ativo|aovivo/.test(ln.estado),assistindo:ln.estado==='ativo',assistindoEm:[],pct:0,canais:[]}:null);}
 return r?{...r,estadoLinha:ln?ln.estado:'sem botão',diag:L.diag}:{fonte:'nada',t:0,login:null,canais:[],estadoLinha:'sem botão',diag:L.diag};}
// v42: controle remoto para o painel único do app Multi (lê o estado e muda as opções desta conta)
const PAINEL_SET={'vd.on':'b','vd.modo':['confirmar','auto'],'vd.limiar':[2,3,3.5,4],'vd.intervalo':[10,30,60,180,360,720],'vd.maxFichas':[20,40,80],'vd.colecao':'b',
 'sup.on':'b','sup.loot':'b','sup.reserva':'n','sup.orcDia':'n','sup.intervalo':[5,10,30,60],'ps.on':'b','pk.on':'b','cap.on':'b','cap.min':'b'};
// v48: Analisador e Comparar progresso direto no painel do app (sem abrir janela dentro da conta)
function pkPainelInfo(){let LC=[];try{LC=listaComparaveis();}catch(e){}const S=MD.pk.cmp||{};
 return{lista:LC.slice(0,300).map(m=>({k:keyMon(m),r:rotuloMon(m),g:m.grupo})),selA:S.a?keyMon(S.a):null,selB:S.b?keyMon(S.b):null,ult:MD.pk.ult||null,cmpUlt:S.ult||null,ficha:!!fichaAberta(),rodando:pkUmRodando||cmpRodando};}
const resP=(titulo,html,css)=>({...painelEstado(),resultado:{titulo,html,css:css||CSS_PK}});
async function acaoAnaliseCap(nome,arg){
 if(nome==='pkAnalisar'||nome==='pkFicha'){if(pkUmRodando)return{erro:'já estou analisando'};let M=null,ficha=false;
  if(nome==='pkFicha'){const f=fichaAberta();if(!f)return resP('ANÁLISE','<div class="cp"><div class="nota">Abra a ficha de um pokémon na tela desta conta (seu ou do Mercado) e clique de novo.</div></div>');M=lerFichaCompleta(f);M.mercado=!!modalCm();ficha=true;}
  else M=listaComparaveis().find(m=>keyMon(m)===String(arg));
  if(!M)return{erro:'pokémon não encontrado'};pkUmRodando=true;let a;try{a=await analisarPokemon(M);}catch(e){a={erro:'Falhou: '+(e&&e.message||e)};}finally{pkUmRodando=false;}
  if(a&&!a.erro){const Mn={...M,nome:a.nome};
   if(ficha){if(M.id&&!M.mercado){P.mons[M.id]=Object.assign(P.mons[M.id]||{},{id:M.id,nome:a.nome,pokeId:M.pokeId,nv:M.nv,shiny:M.shiny,pot:M.pot,q:M.q,iv:M.iv,st:M.st,base:M.base,lido:Date.now()});salvarP();}
    const sn=snapMon(Mn,{mercado:M.mercado});MD.pk.vistos=[sn,...(MD.pk.vistos||[]).filter(v=>!mesmoMon(v,sn))].slice(0,12);}
   MD.pk.ult={t:a.t,nome:a.nome,nota:a.nota,v:a.veredito[0]};salvarM();pintar();}
  return resP('ANÁLISE · '+nomeCurto(a&&!a.erro?a.nome:M.nome).toUpperCase(),htmlAnalise(a));}
 if(nome==='pkComparar'){if(cmpRodando)return{erro:'já estou comparando'};const LC=listaComparaveis();const A=LC.find(m=>keyMon(m)===String(arg&&arg.a)),B=LC.find(m=>keyMon(m)===String(arg&&arg.b));
  if(!A||!B)return{erro:'escolha os dois pokémon'};if(keyMon(A)===keyMon(B))return{erro:'A e B são o mesmo pokémon'};
  cmpRodando=true;let r;try{r=await compararMons(A,B);}catch(e){r={erro:'Falhou: '+(e&&e.message||e)};}finally{cmpRodando=false;}
  if(!r.erro){MD.pk.cmp=MD.pk.cmp||{};MD.pk.cmp.a=snapMon(A,{mercado:!!A.mercado});MD.pk.cmp.b=snapMon(B,{mercado:!!B.mercado});MD.pk.cmp.ult={t:r.t,a:rotuloMon(A),b:rotuloMon(B),v:r.veredito[0].t};salvarM();pintar();}
  return resP('⚖ COMPARAR POKÉMON',htmlComparacao(r),CSS_PK+CSS_CMP);}
 if(nome==='capCapturar'||nome==='capComparar'){if(capRodando)return{erro:'já estou capturando'};if(nome==='capComparar'&&!MD.cap.base)return{erro:'faça a primeira captura antes'};
  capRodando=true;let sn;try{sn=await capturarCap();}finally{capRodando=false;}
  if(nome==='capCapturar'){MD.cap.base=sn;MD.cap.ult=null;salvarM();if(capHost){capHost.dataset.sig='';desenharCap();}pintar();
   return resP('📸 CAPTURA GUARDADA',`<div class="cp"><div class="nota">Ponto de partida guardado em ${dataHora(sn.t)}: treinador Nv ${fmtI(sn.nv)}${sn.rank&&sn.rank.pontos!=null?` · ${fmtI(sn.rank.pontos)} PR`:''}${sn.rank&&sn.rank.pos!=null?` · #${sn.rank.pos} no ranking`:''} · ${sn.mons.length} pokémon na equipe. Quando quiser ver o que mudou, clique em <b>Comparar agora</b>.</div></div>`,CSS_CAP);}
  MD.cap.ult=sn;salvarM();if(capHost){capHost.dataset.sig='';desenharCap();}pintar();
  return resP(`📸 PROGRESSO DESDE ${dataHora(MD.cap.base.t)}`,`<div class="cap-res">${htmlCap(MD.cap.base,sn)}</div>`,CSS_CAP);}
 return null;}
function painelEstado(){const u=MD.vd.ult;const cl=x=>({id:x.id,nome:x.nome,nv:x.nv,pot:x.pot,shiny:x.shiny,nota:x.nota,fonte:x.fonte,ref:x.ref,classe:x.classe,cor:x.cor,prot:x.prot,vender:x.vender,mover:x.mover,feito:x.feito,preco:x.preco});
 return{v:V,nick:meuNick(),ativo:C.ativo,liberado:liberado(),termosOk,usoTela:usoTela||null,
  C:{vd:{on:C.vd.on,modo:C.vd.modo,limiar:C.vd.limiar,intervalo:C.vd.intervalo,maxFichas:C.vd.maxFichas,colecao:C.vd.colecao,poupados:(C.vd.poupar||[]).length},
   sup:{on:C.sup.on,loot:C.sup.loot,reserva:C.sup.reserva,orcDia:C.sup.orcDia,intervalo:C.sup.intervalo,itens:C.sup.itens.map(i=>({n:i.n,min:i.min,lote:i.lote,on:i.on!==false}))},
   ps:{on:C.ps.on},pk:{on:C.pk.on,...pkPainelInfo()},cap:{on:C.cap.on,min:!!C.cap.min,temCaptura:!!MD.cap.base,base:MD.cap.base?{t:MD.cap.base.t,nv:MD.cap.base.nv,pr:MD.cap.base.rank&&MD.cap.base.rank.pontos,n:MD.cap.base.mons.length}:null}},
  mini:{vd:miniVd(),sup:miniSup(),ps:miniPasse(),pk:miniPk(),cap:miniCap()},rodando:{vd:vdRodando,sup:usoTela==='suprimentos',ps:usoTela==='passe'},vdProg,
  vd:u?{t:u.t,cont:u.cont,total:u.total,lista:(u.lista||[]).slice().sort((a,b)=>(a.nota??99)-(b.nota??99)).slice(0,120).map(cl),feito:u.feito||null}:null,
  supQt:MD.sup.qt||null,psUlt:MD.ps.ult||null,pausas:MD.mud.pausa,hist:{vd:(MD.vd.hist||[]).slice(-6),sup:(MD.sup.hist||[]).slice(-6),ps:(MD.ps.hist||[]).slice(-6)}};}
function painelSet(caminho,valor){const tipo=PAINEL_SET[caminho];if(!tipo)return{erro:'opção desconhecida'};const[g,k]=caminho.split('.');let v=valor;
 if(tipo==='b')v=!!v;else if(tipo==='n'){v=Math.max(0,num(String(v)));}else{v=tipo.find(x=>String(x)===String(v));if(v===undefined)return{erro:'valor inválido'};}
 C[g][k]=v;if(caminho==='vd.limiar'&&MD.vd.ult)MD.vd.ult.lista.forEach(x=>{if(!x.feito&&!x.prot&&x.nota!=null)x.vender=vendePorNota({n:x.nota,fonte:x.fonte});});
 if(caminho==='vd.intervalo')vdProx=Math.min(vdProx,Date.now()+C.vd.intervalo*60e3);if(g==='cap'&&typeof pintarCapBt==='function'){if(capHost)capHost.dataset.sig='';pintarCapBt();}
 salvar();salvarM();pintar();return painelEstado();}
async function painelAcao(nome,arg){
 if(nome==='ativar'){setAtivo(!!arg);return painelEstado();}
 if(nome==='abrir'){if(!MULTI){abrir(true);if(!liberado())mostrarPortao();}return painelEstado();}
 if(nome==='retomar'){const m=String(arg);if(!NOME_MOD[m])return{erro:'função desconhecida'};retomar(m);if(m==='sup'){supProx=0;rodarSuprimentos(true).then(()=>pintar());}else if(m==='ps'){psProx=0;checarPasse().then(()=>pintar());}else{vdProx=0;rodarVenda(true);}return painelEstado();}
 if(nome==='vdAnalisar'){retomar('vd');vdProx=0;rodarVenda(true);return painelEstado();}
 if(nome==='vdVender'){rodarVenda(true,{confirmar:true});return painelEstado();}
 if(nome==='vdPoupar'){const id=String(arg);C.vd.poupar=[...new Set([...(C.vd.poupar||[]),id])];if(MD.vd.ult)MD.vd.ult.lista.forEach(x=>{if(x.id===id){x.vender=false;x.prot='poupado por você';}});salvar();salvarM();pintar();return painelEstado();}
 if(nome==='vdLimparPoupados'){C.vd.poupar=[];salvar();pintar();return painelEstado();}
 if(nome==='supAgora'){retomar('sup');supProx=0;rodarSuprimentos(true).then(()=>pintar());return painelEstado();}
 if(nome==='supItem'){const it=C.sup.itens[+arg.i];if(it){if('on' in arg)it.on=!!arg.on;if('min' in arg)it.min=Math.max(0,num(String(arg.min)));if('lote' in arg)it.lote=Math.max(0,Math.min(9999,num(String(arg.lote))));salvar();pintar();}return painelEstado();}
 if(nome==='supAdd'){if(arg&&!C.sup.itens.some(i=>i.n===arg)){C.sup.itens.push({n:String(arg),min:100,lote:500,on:true});salvar();pintar();}return painelEstado();}
 if(nome==='supRm'){C.sup.itens.splice(+arg,1);salvar();pintar();return painelEstado();}
 if(nome==='psAgora'){retomar('ps');psProx=0;checarPasse().then(()=>pintar());return painelEstado();}
 if(nome==='capZerar'){MD.cap.base=null;MD.cap.ult=null;salvarM();if(capHost)desenharCap();pintar();return painelEstado();}
 if(nome==='twitchLer'||nome==='livesLer'){const t=await lerJanelaLive('twitch',true);const k=await lerJanelaLive('kick',true);return{ok:!!(t||k),diag:{twitch:LV.twitch.diag,kick:LV.kick.diag}};}
 if(nome==='centro'){const r=await irAoCentro(+arg||15000);return{...painelEstado(),centro:r};}
 const r=await acaoAnaliseCap(nome,arg);if(r)return r;
 if(nome==='capCanto'){C.cap.r=null;C.cap.b=null;salvar();posCap();return painelEstado();}
 return{erro:'ação desconhecida'};}
window.__pokebot={v:V,ativo:()=>C.ativo,resumo:resumoConta,painel:{estado:painelEstado,set:painelSet,acao:painelAcao},setAtivo,alternar(){abrir(!aberto());},abrir:()=>abrir(true),fechar:()=>abrir(false),parar,_:{MD,P,resumoConta,contaEmOutroLugar,irAoCentro,ondeEsta,achou,pausado,retomar,lerAnuncioShiny,checarPasse,rodarSuprimentos,contarItem,lerRivais,lutador,dps,efet,nivelPvp,especies,lerCards,avisoPokebot,analisarPokemon,analisarFichaAberta,analisarEquipe,lerFichaCompleta,lerMeta,rodarVenda,lerMarketParaVenda,forcaHunt,irAba,setAfk,afkEstado:()=>({on:C.afk.on,ponte:afkPonte,wake:!!afkWake,erro:afkErro}),compararMons,mostrarComparacao,termosOk:()=>termosOk,mostrarTermos,AUTORIA,guardarComparar,listaComparaveis,fecharComparacao,capturarCap,cliqueCap,htmlCap,notaDoMon,classeDe,motivoProtecao}};
salvar();botao();pintar();ligarObsShiny();especies().then(()=>pintar());if(C.afk.on)afkLigar();ligarObsFicha();
})();
})();
