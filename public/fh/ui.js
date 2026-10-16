(()=>{let ctx=null,out=null,on=(()=>{try{return localStorage.getItem('fonthill-sound')!=='off'}catch{return true}})();
function init(){if(ctx)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;ctx=new AC();const comp=ctx.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=4;out=ctx.createGain();out.gain.value=.5;out.connect(comp);comp.connect(ctx.destination)}
let nb=null;function noiseBuf(){if(nb)return nb;nb=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return nb}
function tone(f,dur,{type='square',vol=.12,at=0,to=null,att=.004}={}){const t=ctx.currentTime+at,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+dur);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+att);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(out);o.start(t);o.stop(t+dur+.02)}
function noise(dur,{vol=.15,at=0,f=2000,q=1,ft='bandpass',fto=null}={}){const t=ctx.currentTime+at,s=ctx.createBufferSource(),fl=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noiseBuf();fl.type=ft;fl.frequency.setValueAtTime(f,t);if(fto)fl.frequency.exponentialRampToValueAtTime(fto,t+dur);fl.Q.value=q;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(fl);fl.connect(g);g.connect(out);s.start(t,Math.random()*.5);s.stop(t+dur+.02)}
const N=m=>440*Math.pow(2,(m-69)/12);
const arp=(notes,step,o={})=>notes.forEach((m,i)=>tone(N(m),o.dur||.14,{...o,at:(o.at||0)+i*step}));
const S={
tap:()=>tone(1320,.035,{vol:.05,type:'triangle'}),
type:()=>noise(.018,{vol:.03,f:5200,q:2}),
tab:()=>{noise(.05,{vol:.06,f:1800,q:.8});tone(660,.05,{vol:.04,type:'triangle'})},
start:()=>{arp([60,64,67,72],.08,{vol:.08,dur:.16});arp([72],.0,{at:.32,dur:.5,vol:.06,type:'triangle'})},
banner:()=>{tone(N(79),.09,{vol:.07});tone(N(84),.22,{vol:.07,at:.09})},
coin:()=>{tone(N(88),.06,{vol:.06});tone(N(95),.3,{vol:.06,at:.06})},
bars:()=>{for(let i=0;i<12;i++)tone(900+i*60,.02,{vol:.025,at:.35+i*.05,type:'square'})},
st1:()=>{for(let i=0;i<14;i++)noise(.05+Math.random()*.05,{vol:.05,f:2800+Math.random()*2400,q:3,at:.3+i*.065+Math.random()*.02});
noise(1.9,{vol:.05,f:300,fto:4200,q:.9,at:1.2});[60,64,67,71,72,76].forEach((m,i)=>tone(N(m),.22,{type:'triangle',vol:.045,at:1.25+i*.3}));
tone(N(48),.14,{type:'square',vol:.06,at:2.95,to:N(43)});
tone(N(55),.34,{type:'square',vol:.08,at:3.07,to:N(79)});noise(.3,{vol:.04,f:1200,fto:5000,q:2,at:3.07});
[[3.66,72,.3],[3.95,76,.16],[4.11,79,.09]].forEach(([t,m,v])=>{tone(140,.18,{type:'sine',vol:v*1.6,to:55,at:t});tone(N(m),.16,{vol:v*.45,at:t});tone(N(m+12),.12,{type:'triangle',vol:v*.35,at:t+.03})});
arp([72,76,79,84],.06,{at:4.25,vol:.05,dur:.18});tone(N(84),.9,{type:'triangle',vol:.05,at:4.43,att:.02})},
fxUp:()=>{},
st2:()=>{noise(1.3,{vol:.05,f:500,fto:2600,q:.8});for(let i=0;i<8;i++)noise(.012,{vol:.05,f:3000,q:4,at:.1+i*.16});tone(N(67),.12,{vol:.05,at:1.35});tone(N(74),.25,{vol:.05,at:1.45,type:'triangle'});for(let i=0;i<10;i++)tone(600+i*90,.03,{vol:.04,at:1.25+i*.08,type:'square'})},
st3:()=>{tone(180,1.3,{type:'triangle',vol:.09,to:520,at:.2,att:.05});noise(.9,{vol:.05,f:400,fto:2400,q:.7,at:.2})},
st4:()=>{noise(.5,{vol:.07,f:300,fto:1600,q:.8});tone(220,.45,{type:'triangle',vol:.06,to:440});arp([67,71,74,79,83],.07,{at:2.7,vol:.045,dur:.25,type:'triangle'})},
st5:()=>{noise(1.2,{vol:.05,f:2600,fto:500,q:.8});for(let i=0;i<8;i++)noise(.012,{vol:.05,f:3000,q:4,at:.1+i*.15});noise(.7,{vol:.06,f:500,fto:2000,q:.7,at:.3});tone(160,.6,{type:'triangle',vol:.06,to:320})},
st6:()=>{},
fxA:()=>{noise(.35,{vol:.07,f:6000,q:1.5})},
fxR:()=>{tone(N(84),.25,{vol:.05,type:'triangle'})},
fxB:()=>{noise(.4,{vol:.07,f:6500,q:1.2});arp([76,79,83,88],.05,{vol:.05,dur:.14})},
fxC:()=>{noise(.4,{vol:.07,f:6500,q:1.2});arp([72,76,79,84,88],.06,{vol:.05,dur:.16});tone(N(84),.6,{type:'triangle',vol:.05,at:.3})},
fxS:()=>{tone(110,.25,{type:'sine',vol:.35,to:45});noise(.18,{vol:.18,f:260,q:.8,ft:'lowpass'})},
fxS2:()=>{tone(90,.15,{type:'sine',vol:.16,to:50});noise(.1,{vol:.07,f:300,ft:'lowpass'})},
fxB0:()=>{tone(130,.2,{type:'sine',vol:.18,to:60})},
sw:i=>tone(N(72+[0,2,4,7,9,12][i%6]),.08,{vol:.06,type:'square'}),
rat:()=>noise(.012,{vol:.05,f:3000,q:4})};
window.SFX={p(n,a){if(!on)return;try{init()}catch{return}if(!ctx)return;if(ctx.state==='suspended')ctx.resume().catch(()=>{});try{S[n]&&S[n](a)}catch(e){}},get on(){return on},set(v){on=v;try{localStorage.setItem('fonthill-sound',v?'on':'off')}catch{};document.querySelectorAll('.sndb').forEach(b=>{b.textContent=v?'Sound on':'Sound off';b.setAttribute('aria-pressed',String(v))});if(v)this.p('coin')}};
addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.sndb').forEach(b=>{b.textContent=on?'Sound on':'Sound off';b.setAttribute('aria-pressed',String(on));b.addEventListener('pointerup',e=>e.stopPropagation());b.onclick=e=>{e.stopPropagation();SFX.set(!on)}})});})();

(() => {
 const make=document.getElementById('make'), title=document.getElementById('title'), notes=document.getElementById('notes');
 const sync=()=>{const covered=!make.hidden||!title.hidden||!notes.hidden;document.querySelectorAll('#app>.hud,#txt,#bot').forEach(e=>e.inert=covered);title.inert=title.hidden||!make.hidden;make.inert=make.hidden;document.getElementById('app').style.setProperty('--hud-height',document.querySelector('.hud').offsetHeight+'px')};
 window.__syncPanels=sync;const startButton=document.getElementById('startBtn');startButton.disabled=true;startButton.textContent='Loading the sculpture…';
 window.__tab=t=>{make.hidden=t!=='make';if(t==='make')make.scrollTop=0;document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===t)));sync();const target=t==='make'?make.querySelector('[data-tab=make]'):title.hidden?document.getElementById('tap'):document.getElementById('startBtn');target.focus({preventScroll:true});window.__pause3D?.(t==='make')};
 document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=e=>{e.stopPropagation();SFX.p('tab');window.__tab(b.dataset.tab)});
 const pb=[...document.querySelectorAll('[data-part]')];pb.forEach(b=>b.onclick=()=>{const t=document.getElementById(b.dataset.part);make.scrollTo({top:t.offsetTop-130,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})});
 make.addEventListener('scroll',()=>{let cur='p1';for(const id of ['p1','p2','p3'])if(document.getElementById(id).getBoundingClientRect().top-make.getBoundingClientRect().top<170)cur=id;if(make.scrollTop+make.clientHeight>=make.scrollHeight-4)cur='p3';pb.forEach(b=>b.setAttribute('aria-current',String(b.dataset.part===cur)))},{passive:true});
 const begin=document.createElement('button');begin.className='action';begin.textContent='Begin the story';begin.onclick=()=>{window.__tab('story');window.__story?.restart()};document.getElementById('mkcta').append(begin);
 let lastFocus=null;
 window.__notes=open=>{notes.hidden=!open;if(open){lastFocus=document.activeElement;document.getElementById('notesX').focus()}else lastFocus?.focus({preventScroll:true});sync()};
 document.getElementById('notesBtn').onclick=()=>window.__notes(true);document.getElementById('notesX').onclick=()=>window.__notes(false);
 notes.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();window.__notes(false)}if(e.key==='Tab'){e.preventDefault();document.getElementById('notesX').focus()}});
 new ResizeObserver(sync).observe(document.querySelector('.hud'));sync();
 document.getElementById('retry').onclick=()=>location.reload();
 window.__failure=message=>{document.getElementById('load').hidden=true;document.getElementById('failureText').textContent=message;document.getElementById('failure').hidden=false};
})();
