/* Fonthill sound design v03. Procedural Web Audio, no audio files. Warm marimba/kalimba plucks on a D-major pentatonic
   scale that climbs with the story, a quiet evolving pad that changes chord per scene, a tactile print-head texture,
   friction while turning the model, and soft room reverb. Sound is on by default; the visitor's mute choice is remembered. */
(()=>{
const KEY='fonthill-sound',PEAK=.9;
let ctx=null,master,dry,send,meterNode,padGain,padFilter,padVoices=[],noiseBuf,fric,printVoice=null,mode='story',padBase=.03,lastChord=null,sceneIndex=0;
let on=(()=>{try{return localStorage.getItem(KEY)!=='off'}catch{return true}})();
const mtof=m=>440*Math.pow(2,(m-69)/12);
// D major pentatonic: one note per story scene, rising as the visitor goes deeper.
const SCALE=[62,64,66,69,71,74,76,78,81];
// Pad chords per scene (MIDI), all inside D major so every change sounds related.
const CHORDS=[[50,57,64],[50,57,66,69],[47,54,62,66],[43,50,59,62],[50,57,66,73],[55,62,71,74],[45,52,61,64],[52,59,62,67],[50,57,62,66,69]];
const TITLE_CHORD=[50,57,64];
const PRINT_NOTES=[74,76,78,81,83,86,88,90,93];

function impulse(seconds,decay){const rate=ctx.sampleRate,len=Math.floor(rate*seconds),buf=ctx.createBuffer(2,len,rate);for(let c=0;c<2;c++){const d=buf.getChannelData(c);let lp=0;for(let i=0;i<len;i++){const n=(Math.random()*2-1)*Math.pow(1-i/len,decay);lp+=(n-lp)*.3;d[i]=i<rate*.012?0:lp}}return buf}
function init(){
 if(ctx)return true;
 const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;
 try{ctx=new AC({latencyHint:'interactive'})}catch{ctx=null;return false}
 master=ctx.createGain();master.gain.value=0;
 const tone=ctx.createBiquadFilter();tone.type='lowpass';tone.frequency.value=9500;
 const comp=ctx.createDynamicsCompressor();comp.threshold.value=-16;comp.knee.value=22;comp.ratio.value=3;comp.attack.value=.006;comp.release.value=.22;
 dry=ctx.createGain();send=ctx.createGain();send.gain.value=.3;
 const verb=ctx.createConvolver();verb.buffer=impulse(1.9,2.6);const ret=ctx.createGain();ret.gain.value=.85;
 dry.connect(master);send.connect(verb);verb.connect(ret);ret.connect(master);master.connect(tone);tone.connect(comp);comp.connect(ctx.destination);
 meterNode=ctx.createAnalyser();meterNode.fftSize=2048;comp.connect(meterNode);
 noiseBuf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);const nd=noiseBuf.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
 initPad();initFriction();
 return true;
}
function ready(){if(!on)return false;if(!init())return false;if(ctx.state!=='running')ctx.resume().catch(()=>{});master.gain.setTargetAtTime(PEAK,ctx.currentTime,.05);return true}
function route(node,wet){node.connect(dry);if(wet>0){const g=ctx.createGain();g.gain.value=wet;node.connect(g);g.connect(send)}}
function pan(node,p){if(!p||!ctx.createStereoPanner)return node;const s=ctx.createStereoPanner();s.pan.value=p;node.connect(s);return s}
// A struck tone built from decaying partials: marimba (4x overtone), bell (inharmonic), kalimba (5.9x).
function strike(f,partials,{vol=.1,at=0,wet=.35,attack=.003,p=0}={}){
 const t=ctx.currentTime+at,out=ctx.createGain();out.gain.value=vol;
 for(const [ratio,amp,decay] of partials){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f*ratio;g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(amp,t+attack);g.gain.exponentialRampToValueAtTime(.0001,t+decay);o.connect(g);g.connect(out);o.start(t);o.stop(t+decay+.05)}
 route(pan(out,p),wet)}
const MARIMBA=[[1,1,1.3],[4,.32,.28],[10,.07,.08]],KALIMBA=[[1,1,1.0],[5.9,.22,.12],[2,.18,.5]],BELL=[[1,1,3],[2.76,.45,2],[5.4,.2,1.1],[8.93,.1,.6]];
function noiseBurst(dur,{f=2000,to=null,q=1,type='bandpass',vol=.05,at=0,attack=.01,wet=.15,p=0}={}){
 const t=ctx.currentTime+at,s=ctx.createBufferSource(),fl=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noiseBuf;fl.type=type;fl.Q.value=q;fl.frequency.setValueAtTime(f,t);if(to)fl.frequency.exponentialRampToValueAtTime(to,t+dur);
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(attack,dur*.5));g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(fl);fl.connect(g);route(pan(g,p),wet);s.start(t,Math.random()*1.2);s.stop(t+dur+.05)}
function sine(f,to,dur,{vol=.1,at=0,wet=.1}={}){const t=ctx.currentTime+at,o=ctx.createOscillator(),g=ctx.createGain();o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+dur);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);route(g,wet);o.start(t);o.stop(t+dur+.05)}
const tock=(vol=.09,at=0)=>{sine(230,100,.07,{vol,at});noiseBurst(.02,{f:2200,q:1.2,vol:vol*.6,at})};
const thunk=(vol=.14,at=0)=>{sine(135,48,.26,{vol,at,wet:.2});noiseBurst(.09,{f:380,type:'lowpass',vol:vol*.6,at})};
const whoosh=(dur,f0,f1,vol,at=0,p=0)=>noiseBurst(dur,{f:f0,to:f1,q:.9,vol,at,attack:dur*.45,wet:.3,p});

function initPad(){
 padGain=ctx.createGain();padGain.gain.value=0;padFilter=ctx.createBiquadFilter();padFilter.type='lowpass';padFilter.frequency.value=900;padFilter.Q.value=.4;
 const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=.07;lg.gain.value=260;lfo.connect(lg);lg.connect(padFilter.frequency);lfo.start();
 padGain.connect(padFilter);route(padFilter,.9);
 for(let i=0;i<5;i++){const v=ctx.createGain(),a=ctx.createOscillator(),b=ctx.createOscillator();v.gain.value=0;a.type='triangle';b.type='sine';a.detune.value=-7+i*3;b.detune.value=6-i*2;a.frequency.value=b.frequency.value=110;a.connect(v);b.connect(v);v.connect(padGain);a.start();b.start();padVoices.push({a,b,v})}
}
function padChord(notes,glide=1.6){if(!ctx)return;lastChord=notes;const t=ctx.currentTime;padVoices.forEach((p,i)=>{const m=notes[i];if(m==null){p.v.gain.setTargetAtTime(0,t,glide/3);return}const f=mtof(m);p.a.frequency.setTargetAtTime(f,t,glide/3);p.b.frequency.setTargetAtTime(f,t,glide/3);p.v.gain.setTargetAtTime(.22,t,glide/3)})}
function padLevel(level,tc=1.2){if(!ctx)return;padGain.gain.setTargetAtTime(level,ctx.currentTime,tc)}
function padTarget(){return mode==='make'?padBase*.45:printVoice?padBase*.4:padBase}

function initFriction(){
 const s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),hp=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noiseBuf;s.loop=true;bp.type='bandpass';bp.frequency.value=700;bp.Q.value=.7;hp.type='highpass';hp.frequency.value=240;g.gain.value=0;s.connect(bp);bp.connect(hp);hp.connect(g);route(g,.1);s.start();fric={g,bp}
}

// Print head: stepper hum + extruder whirr, brightening as the object grows. Quiet by design.
function printStart(){
 if(!ready())return;printStop(true);const t=ctx.currentTime;
 const g=ctx.createGain(),hum=ctx.createOscillator(),hum2=ctx.createOscillator(),lp=ctx.createBiquadFilter(),n=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),ng=ctx.createGain(),l1=ctx.createOscillator(),l2=ctx.createOscillator(),lg=ctx.createGain();
 g.gain.setValueAtTime(0,t);g.gain.setTargetAtTime(.03,t,.18);hum.type='triangle';hum.frequency.value=56;hum2.type='square';hum2.frequency.value=112;lp.type='lowpass';lp.frequency.value=420;const hg=ctx.createGain();hg.gain.value=.5;
 hum.connect(lp);hum2.connect(hg);hg.connect(lp);lp.connect(g);n.buffer=noiseBuf;n.loop=true;bp.type='bandpass';bp.frequency.value=900;bp.Q.value=3.2;ng.gain.value=.32;n.connect(bp);bp.connect(ng);ng.connect(g);
 l1.frequency.value=5.3;l2.frequency.value=8.1;lg.gain.value=260;l1.connect(lg);l2.connect(lg);lg.connect(bp.frequency);route(g,.12);
 [hum,hum2,n,l1,l2].forEach(x=>x.start(t));printVoice={g,hum,hum2,bp,nodes:[hum,hum2,n,l1,l2],lastTick:-1};padLevel(padTarget(),.8);
}
function printUpdate(p){if(!printVoice||!ctx)return;const t=ctx.currentTime;printVoice.hum.frequency.setTargetAtTime(56+p*34,t,.1);printVoice.hum2.frequency.setTargetAtTime(112+p*68,t,.1);printVoice.bp.frequency.setTargetAtTime(900+p*1000,t,.1);printVoice.g.gain.setTargetAtTime(mode==='make'||!on?0:.03,t,.08)}
function printTick(p){if(!on||!ctx||!printVoice)return;const i=Math.min(PRINT_NOTES.length-1,Math.floor(p*PRINT_NOTES.length));if(i===printVoice.lastTick)return;printVoice.lastTick=i;strike(mtof(PRINT_NOTES[i]),KALIMBA,{vol:.045,wet:.5,p:(Math.random()-.5)*.5})}
function printStop(silent){if(!printVoice||!ctx)return;const v=printVoice,t=ctx.currentTime;printVoice=null;v.g.gain.cancelScheduledValues(t);v.g.gain.setTargetAtTime(0,t,.08);v.nodes.forEach(x=>{try{x.stop(t+.5)}catch{}});padLevel(padTarget(),1.4)}
function printDone(){if(!ready())return;printStop();strike(mtof(86),BELL,{vol:.07,at:.04,wet:.5});strike(mtof(93),BELL,{vol:.04,at:.16,wet:.55,p:.2});thunk(.09,.02);if(navigator.vibrate)try{navigator.vibrate([10,40,10])}catch{}}

// Scene change: a plucked note for the scene, with a fifth above when moving forward and a fourth below when going back.
function scene(i,dir=1,first=false){
 if(!ready())return;sceneIndex=i;const n=SCALE[Math.max(0,Math.min(SCALE.length-1,i))];
 strike(mtof(n),MARIMBA,{vol:.11,wet:.4});
 if(!first){strike(mtof(dir>0?n+7:n-5),MARIMBA,{vol:.06,at:.09,wet:.45,p:dir>0?.25:-.25});whoosh(.34,dir>0?500:1500,dir>0?1700:480,.026,0,dir>0?.4:-.4)}
 padChord(CHORDS[Math.max(0,Math.min(CHORDS.length-1,i))]);padLevel(padTarget(),1.2);
}
const E={
 tap:()=>tock(.08),
 tab:()=>{whoosh(.18,1200,2200,.03);strike(mtof(86),KALIMBA,{vol:.05,wet:.3})},
 start:()=>{[62,66,69,74].forEach((m,i)=>strike(mtof(m),MARIMBA,{vol:.08,at:i*.08,wet:.5}));strike(mtof(81),BELL,{vol:.05,at:.34,wet:.6});padChord(TITLE_CHORD,2.2);padLevel(padTarget(),2.2);whoosh(.9,300,1400,.03,.05)},
 coin:()=>{strike(mtof(81),KALIMBA,{vol:.07,wet:.4});strike(mtof(86),KALIMBA,{vol:.05,at:.08,wet:.4})},
 sw:i=>strike(mtof(PRINT_NOTES[(i|0)%PRINT_NOTES.length]-12),KALIMBA,{vol:.09,wet:.4}),
 flip:()=>{whoosh(.5,380,2000,.05);thunk(.1,.38)},
 lift:()=>{whoosh(.7,300,1500,.05);strike(mtof(74),MARIMBA,{vol:.06,at:.5,wet:.5})},
 assemble:()=>{whoosh(.45,1600,320,.045);thunk(.13,.4);strike(mtof(62),MARIMBA,{vol:.07,at:.42,wet:.4})},
 focus:()=>{strike(mtof(78),KALIMBA,{vol:.07,wet:.4});whoosh(.25,900,1800,.02)},
 chord:()=>{[62,66,69,74,78].forEach((m,i)=>strike(mtof(m),KALIMBA,{vol:.065,at:i*.07,wet:.5,p:(i-2)*.2}))},
 reset:()=>{tock(.07);whoosh(.22,1400,700,.025)},
 restart:()=>{strike(mtof(74),BELL,{vol:.05,wet:.5});padChord(TITLE_CHORD,2)}
};
function setSound(v){
 on=v;try{localStorage.setItem(KEY,v?'on':'off')}catch{}
 document.querySelectorAll('.sndb').forEach(b=>{b.textContent=v?'Sound on':'Sound off';b.setAttribute('aria-pressed',String(v))});
 if(v){if(init()){ctx.resume().catch(()=>{});master.gain.setTargetAtTime(PEAK,ctx.currentTime,.05);if(lastChord){padChord(lastChord,.8);padLevel(padTarget(),1)}E.coin()}}
 else if(ctx){master.gain.setTargetAtTime(0,ctx.currentTime,.06);const c=ctx;setTimeout(()=>{if(!on&&c.state==='running')c.suspend().catch(()=>{})},400)}
}
document.addEventListener('visibilitychange',()=>{if(!ctx)return;if(document.hidden){master.gain.setTargetAtTime(0,ctx.currentTime,.05);setTimeout(()=>{if(document.hidden&&ctx.state==='running')ctx.suspend().catch(()=>{})},200)}else if(on){ctx.resume().catch(()=>{});master.gain.setTargetAtTime(PEAK,ctx.currentTime,.1)}});
// Browsers only allow audio after a gesture: prepare the engine on the first touch so the first sound is not late.
const unlock=()=>{if(on)ready()};addEventListener('pointerdown',unlock,{once:true,capture:true});addEventListener('keydown',unlock,{once:true,capture:true});

window.SFX={
 p(n,a){if(!ready())return;try{E[n]&&E[n](a)}catch(e){}},
 scene(i,dir,first){try{scene(i,dir,first)}catch(e){}},
 print:{start(){try{printStart()}catch(e){}},update(p){try{printUpdate(p)}catch(e){}},tick(p){try{printTick(p)}catch(e){}},done(){try{printDone()}catch(e){}},stop(){try{printStop()}catch(e){}}},
 // Friction hiss follows the finger while the model is turned; detent ticks mark each few degrees.
 drag(speed){if(!on||!ctx||ctx.state!=='running')return;const t=ctx.currentTime,level=Math.min(.06,speed*.045);fric.g.gain.cancelScheduledValues(t);fric.g.gain.setTargetAtTime(level,t,.03);fric.g.gain.setTargetAtTime(0,t+.07,.07);fric.bp.frequency.setTargetAtTime(420+Math.min(1,speed)*1500,t,.05)},
 detent(){if(!on||!ctx||ctx.state!=='running')return;noiseBurst(.012,{f:3200,q:3,vol:.022,wet:.05});sine(1900,1500,.02,{vol:.012,wet:0})},
 mode(m){mode=m;if(!ctx)return;padLevel(padTarget(),.9);if(printVoice)printUpdate(.5)},
 get on(){return on},
 set:setSound,
 // Test hook: peak output level since last call (0..1), null when audio has not started.
 meter(){if(!meterNode)return null;const a=new Float32Array(meterNode.fftSize);meterNode.getFloatTimeDomainData(a);let m=0;for(const x of a)m=Math.max(m,Math.abs(x));return m},
 get state(){return ctx?ctx.state:'none'}
};
addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.sndb').forEach(b=>{b.textContent=on?'Sound on':'Sound off';b.setAttribute('aria-pressed',String(on));b.addEventListener('pointerup',e=>e.stopPropagation());b.onclick=e=>{e.stopPropagation();setSound(!on)}})});
})();

(() => {
 const make=document.getElementById('make'), title=document.getElementById('title'), notes=document.getElementById('notes');
 const sync=()=>{const covered=!make.hidden||!title.hidden||!notes.hidden;document.querySelectorAll('#app>.hud,#app>.rail,#txt,#bot').forEach(e=>e.inert=covered);title.inert=title.hidden||!make.hidden;make.inert=make.hidden;document.getElementById('app').style.setProperty('--hud-height',document.querySelector('.hud').offsetHeight+'px')};
 window.__syncPanels=sync;const startButton=document.getElementById('startBtn');startButton.disabled=true;startButton.textContent='Loading the sculpture…';
 window.__tab=t=>{make.hidden=t!=='make';if(t==='make')make.scrollTop=0;document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===t)));sync();const target=t==='make'?make.querySelector('[data-tab=make]'):title.hidden?document.getElementById('tap'):document.getElementById('startBtn');target.focus({preventScroll:true});window.__pause3D?.(t==='make');SFX.mode(t==='make'?'make':'story')};
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
