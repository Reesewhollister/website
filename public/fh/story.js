const ROOT=new URL('./',import.meta.url);
async function fetchBuffer(name){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);try{const response=await fetch(new URL(name,ROOT),{signal:controller.signal});if(!response.ok)throw new Error('Asset '+name+': HTTP '+response.status);const buffer=await response.arrayBuffer();const expected={'2in-detail.bin':2459052,'base.bin':342900,'roofmask.bin':136614}[name];if(buffer.byteLength!==expected)throw new Error('Invalid model data: '+name+' ('+buffer.byteLength+' bytes)');return buffer}finally{clearTimeout(timer)}}
async function boot(){const THREE=await import('./three.module.js');



const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const FIL={Ash:'#9B9EA0',White:'#EFECE4',Black:'#2B2A28','Desert Tan':'#CDB48A',Lemon:'#E5D56B',Terracotta:'#B15533','Dark Green':'#3F5A3A'};
const SC=86.5/50.8,U_MINI=156,U_DLX=352,U_RULER=-60;
const STAGES=[
{n:'Drawing',eb:'Stage 01 · The drawing',h:'A house imagined from within.',p:'Mercer recalled planning Fonthill “room by room, entirely from the interior.”<button class="fn" data-n="1" aria-label="Note 1">1</button>'},
{n:'Form',eb:'Stage 02 · The form',h:'Look closer.',p:'His plans began with the rooms and their relationships; clay models helped him assemble the house.<button class="fn" data-n="2" aria-label="Note 2">2</button>',ban:['Stage clear','Drawing to form']},
{n:'Micro',eb:'Stage 03 · 2 in',h:'Fonthill Micro',p:'An architectural sculpture in 3D-printed PLA, in a single colour. Pick one.',sw:1,ban:['Unlocked','Fonthill Micro'],item:{img:'pixel-micro.webp',name:'Fonthill Micro',price:'',acc:'var(--charcoal)',parts:1,cols:6}},
{n:'Mini',eb:'Stage 04 · 3.5 in',h:'Fonthill Mini',p:'Move around it and the arrangement changes. Drag to turn.',ban:['Size up','2 in to 3.5 in'],item:{img:'pixel-mini.webp',name:'Fonthill Mini',price:'',acc:'var(--concrete-dark)',parts:1,cols:1}},
{n:'Deluxe',eb:'Stage 05 · 3.5 in, in colour',h:'Fonthill Mini Deluxe Edition',p:'Gray walls, terracotta-coloured roofs, separate Dark Green base.',ban:['Upgrade','Deluxe Edition'],item:{img:'pixel-deluxe.webp',name:'Mini Deluxe Edition',price:'',acc:'var(--terracotta)',parts:2,cols:3}},
{n:'Together',eb:'Stage 06 · Collection',h:'A place worth looking at closely.',p:'',cta:1,ban:['Collection','3 of 3']}];
{const S0=STAGES[0];document.getElementById('eb').textContent=S0.eb;document.getElementById('h').textContent=S0.h;document.getElementById('p').innerHTML=S0.p}
const stageEl=document.getElementById('app'),sketch=document.getElementById('sketch'),ov=document.getElementById('ov');
const MODELS={"2in-detail": {"n": 136614, "mn": [-44.18667984008789, -26.23514747619629, 0], "mx": [44.746849060058594, 26.352842330932617, 50.79938507080078], "src": "m2"}, "base": {"n": 19050, "mn": [-80.44000244140625, -49.36000061035156, 0], "mx": [80.44000244140625, 49.36000061035156, 11.470474243164062], "src": "m35b"}, "integrated": {"n": 19374, "mn": [-80.44000244140625, -49.36000061035156, 0], "mx": [80.44000244140625, 49.36000061035156, 11.519015312194824], "src": "m35int"}, "terrain": {"n": 16724, "mn": [-80.44000244140625, -49.36000061035156, 0], "mx": [80.44000244140625, 49.36000061035156, 11.65906810760498], "src": "m35ter"}, "relief": {"n": 17138, "mn": [-27.84000015258789, -3.200000047683716, 0], "mx": [27.84000015258789, 3.200000047683716, 31.75], "src": "vC"}, "massing": {"n": 123660, "mn": [-27.760000228881836, -16.719999313354492, 0], "mx": [28.399999618530273, 16.8799991607666, 31.75], "src": "masses"}};
async function bin(id){const m=MODELS[id];const q=new Int16Array(await fetchBuffer(id+'.bin'));const p=new Float32Array(q.length);const cx=(m.mn[0]+m.mx[0])/2,cy=(m.mn[1]+m.mx[1])/2;
for(let i=0;i<q.length;i++){const k=i%3;const v=m.mn[k]+(q[i]+32768)/65535*(m.mx[k]-m.mn[k]);p[i]=k==0?v-cx:k==1?v-cy:v-m.mn[2]}return p}
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0xF4EFE3);renderer.localClippingEnabled=true;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
stageEl.prepend(renderer.domElement);const cv=renderer.domElement;
const scene=new THREE.Scene();const cam=new THREE.OrthographicCamera(-1,1,1,-1,1,5000);
scene.add(new THREE.HemisphereLight(0xfff6e6,0x9a9282,1.7));
const dl=new THREE.DirectionalLight(0xffffff,2.1);dl.castShadow=true;dl.shadow.mapSize.set(1024,1024);Object.assign(dl.shadow.camera,{left:-320,right:320,top:320,bottom:-320,near:1,far:2000});dl.shadow.bias=-.0005;scene.add(dl,dl.target);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000),new THREE.ShadowMaterial({opacity:.09}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const pc=await bin('2in-detail'),pb=await bin('base');
const cg=new THREE.BufferGeometry();cg.setAttribute('position',new THREE.BufferAttribute(pc,3));cg.computeVertexNormals();
{const n=cg.attributes.normal,c=new Float32Array(pc.length);const rm=new Uint8Array(await fetchBuffer('roofmask.bin'));for(let t=0;t<rm.length;t++)if(rm[t])c[t*9]=c[t*9+3]=c[t*9+6]=1;cg.setAttribute('color',new THREE.BufferAttribute(c,3))}
const eg=new THREE.EdgesGeometry(cg,32);
const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.BufferAttribute(pb,3));bg.computeVertexNormals();
document.getElementById('load').hidden=true;
const EL=28*Math.PI/180;let AZ0=-Math.PI/4,PHI=0,KU=1;
const CR=()=>new THREE.Vector3(Math.cos(AZ0),0,-Math.sin(AZ0));
const ROT=Math.PI/4,ELV=[0,0,1,1,1,0],UM_E=93,UD_E=210,RU_E=-46;
const RVe=e=>{const ph=PHI*(1-e),ku=1+(KU-1)*(1-e);return CR().multiplyScalar(Math.cos(ph)*ku).addScaledVector(new THREE.Vector3(Math.sin(AZ0),0,Math.cos(AZ0)),Math.sin(ph)*ku)};
const RV=()=>RVe(V.elev);
const mapU=(u,e)=>{const m1=U_MINI+(UM_E-U_MINI)*e,m2=U_DLX+(UD_E-U_DLX)*e;return u<=U_MINI?u/U_MINI*m1:m1+(u-U_MINI)/(U_DLX-U_MINI)*(m2-m1)};
const rulerU=e=>U_RULER+(RU_E-U_RULER)*e;const rulerP=()=>RV().multiplyScalar(rulerU(V.elev));
const planeA=new THREE.Plane(),planeP=new THREE.Plane(),planeC=new THREE.Plane();
function castleMat(hex,plane){const u={uRoof:{value:new THREE.Color(FIL.Terracotta)},uMix:{value:0}};const m=new THREE.MeshStandardMaterial({color:hex,vertexColors:true,roughness:.95,metalness:0,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1,clippingPlanes:plane?[plane]:null,clipShadows:true});
m.onBeforeCompile=s=>{Object.assign(s.uniforms,u);s.fragmentShader='uniform vec3 uRoof;uniform float uMix;\n'+s.fragmentShader.replace('#include <color_fragment>','diffuseColor.rgb=mix(diffuse,uRoof,vColor.r*uMix);')};m.userData.u=u;return m}
function inst(mat){const h=new THREE.Group(),m=new THREE.Mesh(cg,mat);m.rotation.x=-Math.PI/2;m.castShadow=true;h.add(m);scene.add(h);return{h,m,mat}}
const A=inst(castleMat(FIL.Ash,planeA)),B=inst(castleMat(FIL.Ash)),C=inst(castleMat(FIL.Ash,planeC));
const edgeMat=new THREE.LineBasicMaterial({color:0x2B2A28,transparent:true,opacity:0,depthWrite:false});A.m.add(new THREE.LineSegments(eg,edgeMat));
const plate=new THREE.Mesh(bg,new THREE.MeshStandardMaterial({color:FIL['Dark Green'],roughness:.95,metalness:0,side:THREE.DoubleSide,clippingPlanes:[planeP],clipShadows:true}));plate.rotation.x=-Math.PI/2;plate.castShadow=plate.receiveShadow=true;const PG=new THREE.Group();PG.add(plate);scene.add(PG);
const RH=105;
// state
const V={elev:0,hop:0,sq:0,sketch:1,draw:0,wipe:0,diss:0,ruler:0,Bvis:0,Bu:0,Bk:1,lift:0,settle:0,plate:0,roof:0,Cw:0,lab:0};
const E0={sketch:1,draw:0,wipe:0,diss:0,ruler:0,Bvis:0,Bu:0,Bk:1,lift:0,settle:0,plate:0,roof:0,Cw:0};
const E1={...E0,sketch:0,draw:1,wipe:1,diss:1},E2={...E1,ruler:1,elev:1},E3={...E2,Bvis:1,Bu:U_MINI,Bk:SC},E4={...E3,lift:1,settle:1,plate:1,roof:1},E5={...E4,Bu:U_DLX,Cw:1,elev:0};
const END=[E0,E1,E2,E3,E4,E5];
const SEQ={1:[['sketch',0,.7,0],['draw',1,.9,.3],['wipe',1,1.9,1.2],['diss',1,.9,3.1],['sq',.6,.12,2.95],['sq',-1,.14,3.07],['hop',1,.32,3.07],['sq',0,.3,3.2,'back'],['hop',0,.85,3.39,'bounce'],['sq',1,.06,3.62],['sq',0,.5,3.68,'back']],2:[['elev',1,1.4,0],['ruler',1,1.1,1.2,'back']],3:[['Bvis',1,0,0],['Bu',U_MINI,1.5,.2,'back'],['Bk',SC,1.3,.55,'back']],4:[['lift',1,.6,0,'back'],['plate',1,1.1,.5],['settle',1,1.1,1.6,'bounce'],['roof',1,.9,2.7]],5:[['elev',0,1.3,0],['Bu',U_DLX,1.3,.2,'back'],['Cw',1,1.2,1.1]]};
const FX={1:[[3.0,'Up'],[3.66,'A'],[3.66,'S2']],2:[[2.1,'R']],3:[[1.75,'B']],4:[[1.98,'S'],[2.4,'S2'],[3.3,'B']],5:[[2.2,'C'],[1.1,'B0']]};
let parts=[],shake=0,fxT=[];
function fx(k){SFX.p('fx'+k);if(reduce||k==='Up')return;if(k==='S'){shake=9;return}if(k==='S2'){shake=3;return}
let w,hh;if(k==='A'){w=A.h.position;hh=50.8}else if(k==='R'){w=RV().multiplyScalar(U_RULER);hh=RH}else if(k==='C'){w=C.h.position;hh=50.8*SC}else if(k==='B0'){shake=4;return}else{[w,hh]=topOf('B')}
const [x,y]=proj(new THREE.Vector3(w.x,hh*.6,w.z));const cols=cur===4?['#B15533','#8C4026','#3F5A3A','#E8DBB7']:k==='A'?['#2B2A28',FIL[microCol],'#9B9EA0']:['#2B2A28','#9B9EA0','#E8DBB7','#8C4026'];
shake=Math.max(shake,k==='R'?2:5);parts.push({ring:1,x,y,t:0});
for(let i=0;i<34;i++){const a=Math.random()*Math.PI*2,v=120+Math.random()*260;parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-180,t:0,L:.6+Math.random()*.6,s:Math.random()<.3?6:Math.random()<.5?4:3,c:cols[i%cols.length]})}}
let lastT=performance.now();function stepParts(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;parts=parts.filter(p=>{p.t+=dt;if(p.ring)return p.t<.45;p.vy+=900*dt;p.vx*=.985;p.x+=p.vx*dt;p.y+=p.vy*dt;return p.t<p.L})}
function drawParts(){let s='';for(const p of parts){if(p.ring){const r=Math.round(10+p.t*260),o=1-p.t/.45;s+='<rect x="'+(Math.round(p.x)-r)+'" y="'+(Math.round(p.y)-r)+'" width="'+2*r+'" height="'+2*r+'" fill="none" stroke="#2B2A28" stroke-width="'+(3*o+.5)+'" opacity="'+o+'" shape-rendering="crispEdges"/>';continue}
const o=Math.min(1,(p.L-p.t)*4);s+='<rect x="'+Math.round(p.x)+'" y="'+Math.round(p.y)+'" width="'+p.s+'" height="'+p.s+'" fill="'+p.c+'" opacity="'+o+'" shape-rendering="crispEdges"/>'}return s}
let tw=[];const ease=t=>1-Math.pow(1-t,3);
const EASE={back:t=>{const c=1.9;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)},bounce:t=>{const n=7.5625,d=2.75;return t<1/d?n*t*t:t<2/d?n*(t-=1.5/d)*t+.75:t<2.5/d?n*(t-=2.25/d)*t+.9375:n*(t-=2.625/d)*t+.984375}};
function to(k,v,dur,del,e){tw.push({k,v,dur,del,e,t0:performance.now(),f:null})}
function tick(now){tw=tw.filter(t=>{const s=(now-t.t0)/1000-t.del;if(s<0)return true;if(t.f===null)t.f=V[t.k];const p=t.dur<=0?1:Math.min(1,s/t.dur);V[t.k]=t.f+(t.v-t.f)*(EASE[t.e]||ease)(p);return p<1})}
// layout + camera framing
const rbox=(u,a,b,y0,y1,e)=>{const c=RVe(e).multiplyScalar(mapU(u,e)),ps=ROT*e,cs=Math.cos(ps),sn=Math.sin(ps),P=[];for(const x of[-a,a])for(const z of[-b,b])for(const y of[y0,y1])P.push(new THREE.Vector3(c.x+x*cs+z*sn,y,c.z-x*sn+z*cs));return P};
const castleBox=(u,k,y0,e)=>rbox(u,44.8*k,26.4*k,y0,y0+50.8*k,e),plateBox=(u,e)=>rbox(u,80.5,49.4,0,11.5,e);
const rulerBox=e=>{const c=RVe(e).multiplyScalar(rulerU(e)-10);const c2=RVe(e).multiplyScalar(rulerU(e)-30);return[new THREE.Vector3(c.x,0,c.z),new THREE.Vector3(c.x,RH,c.z),new THREE.Vector3(c2.x,RH,c2.z)]};
const FR=[e=>[castleBox(0,1,0,e)],e=>[castleBox(0,1,0,e)],e=>[rulerBox(e),castleBox(0,1,0,e)],e=>[rulerBox(e),castleBox(0,1,0,e),castleBox(U_MINI,SC,0,e)],e=>[rulerBox(e),castleBox(0,1,0,e),castleBox(U_MINI,SC,2.4,e),plateBox(U_MINI,e)],e=>[rulerBox(e),castleBox(0,1,0,e),castleBox(U_MINI,SC,0,e),castleBox(U_DLX,SC,2.4,e),plateBox(U_DLX,e)]];
const camC=new THREE.Vector3(),camT=new THREE.Vector3();let camH=60,camHT=60,azOff=0,azOffT=0,first=true;
function dirFor(az,el=EL){return new THREE.Vector3(Math.cos(el)*Math.sin(az),Math.sin(el),Math.cos(el)*Math.cos(az))}
function fit(s){const ev=ELV[s],d=dirFor(AZ0,EL*(1-ev)),r=CR(),up=new THREE.Vector3().crossVectors(d,r).normalize().negate();if(up.y<0)up.negate();
let mn=[1e9,1e9],mx=[-1e9,-1e9];const ctr=new THREE.Vector3();let n=0;
for(const P of (exploring&&exploreSelection!=='collection'?[exploreSelection==='micro'?castleBox(0,1,0,ev):exploreSelection==='mini'?castleBox(U_MINI,SC,0,ev):castleBox(U_DLX,SC,2.4,ev),...(exploreSelection==='deluxe'?[plateBox(U_DLX,ev)]:[])]:FR[s](ev))){for(const p of P){const a=p.dot(r),c=p.dot(up);mn[0]=Math.min(mn[0],a);mx[0]=Math.max(mx[0],a);mn[1]=Math.min(mn[1],c);mx[1]=Math.max(mx[1],c)}}
const W=stageEl.clientWidth,H=stageEl.clientHeight,tb=document.getElementById('txt').getBoundingClientRect(),bb=document.getElementById('bot').getBoundingClientRect(),ab=stageEl.getBoundingClientRect();
const landscape=W>=600&&W>H&&H<=500,left=landscape?W*.5:0,right=landscape?W-20:W,top=landscape?document.querySelector('.hud').offsetHeight+16:tb.bottom-ab.top+(ev?40:s>=2?30:16),bot=landscape?H-20:bb.top-ab.top-(ev?30:s>=2?14:10),aw=landscape?right-left-32:W-(ev?64:PHI?60:80),ah=Math.max(80,bot-top);
const ew=mx[0]-mn[0],eh=mx[1]-mn[1],sc=Math.min(aw/ew,ah/eh)*(s<2?.94:1);camHT=H/2/sc;
const cx=(mn[0]+mx[0])/2,cy=(mn[1]+mx[1])/2,dy=((top+bot)/2-H/2)/sc;const dx=landscape?((left+right)/2-W/2)/sc:0;camT.copy(r).multiplyScalar(cx-dx).addScaledVector(up,cy+dy);
if(first){camC.copy(camT);camH=camHT;first=false}}
// callouts
const CALL=[[],[],['A'],['A','B'],['A','B'],[]];
function topOf(k){if(k=='A')return[A.h.position,50.8];if(k=='C')return[C.h.position,50.8*SC];return[B.h.position,50.8*V.Bk+V.lift*(2.4+37.6*(1-V.settle))]}
const pv=new THREE.Vector3();function proj(v){pv.copy(v).project(cam);return[(pv.x+1)/2*stageEl.clientWidth,(1-pv.y)/2*stageEl.clientHeight]}
function drawRuler(){if(V.ruler<.01)return'';const rp=rulerP();const b=proj(new THREE.Vector3(rp.x,0,rp.z)),t=proj(new THREE.Vector3(rp.x,101.6,rp.z));const vy=(b[1]-t[1])/101.6,x=Math.round(b[0])+.5,g=V.ruler;
let s='<g opacity="'+Math.min(1,g*1.4)+'" shape-rendering="crispEdges"><line x1="'+(x-12)+'" y1="'+b[1]+'" x2="'+(x+8)+'" y2="'+b[1]+'" stroke="#2B2A28"/>';const hTop=b[1]-vy*RH*g;s+='<line x1="'+x+'" y1="'+b[1]+'" x2="'+x+'" y2="'+hTop+'" stroke="#2B2A28"/>';
const step=vy*3.175>=3.5?1:vy*6.35>=3.5?2:4;for(let i=step;i<=32;i+=step){const mm=i*3.175;if(mm>RH*g)break;const y=Math.round(b[1]-mm*vy)+.5;const L=i%8==0?10:i%4==0?7:i%2==0?5:3;s+='<line x1="'+(x-L)+'" y1="'+y+'" x2="'+x+'" y2="'+y+'" stroke="#2B2A28"/>';if(i%8==0)s+='<text x="'+(x-14)+'" y="'+(y+3.5)+'" text-anchor="end">'+(i/8)+(i==32?' IN':'')+'</text>'}
const ms=vy>=3?1:5;for(let m=ms;m<=100;m+=ms){if(m>RH*g)break;const y=Math.round(b[1]-m*vy)+.5;const L=m%10==0?5:m%5==0?3:1.5;s+='<line x1="'+x+'" y1="'+y+'" x2="'+(x+L)+'" y2="'+y+'" stroke="#2B2A28" stroke-opacity="'+(m%10==0?1:.6)+'"/>'}
if(g>.98&&vy>=1.6){const y=b[1]-100*vy;s+='<text x="'+(x+8)+'" y="'+(y+3.5)+'">100 MM</text>'}return s+'</g>'}
function drawCallouts(){if(exploring){ov.innerHTML='';return}let s=drawRuler();const L=CALL[cur];if(L.length&&V.lab>.01){const cr=CR(),o=V.lab;
for(const k of L){const[p,hh]=topOf(k);const hw=(k==='A'?26.4:26.4*(k==='C'?SC:V.Bk));const bw=k==='B'&&V.plate>.5?Math.max(hw,49.4):hw;
const b0=proj(p.clone().setY(0).addScaledVector(cr,bw+6)),t0=proj(p.clone().setY(hh).addScaledVector(cr,bw+6));
const x=Math.round(b0[0])+.5,yt=Math.round(t0[1])+.5,yb=Math.round(b0[1])+.5,g=Math.min(1,o*1.25),yy=yb-(yb-yt)*g;
s+='<g shape-rendering="crispEdges" stroke="#2B2A28" stroke-width="1.25"><line x1="'+(x-8)+'" y1="'+yb+'" x2="'+x+'" y2="'+yb+'"/><line x1="'+x+'" y1="'+yb+'" x2="'+x+'" y2="'+yy+'"/>'+(g>=1?'<line x1="'+(x-8)+'" y1="'+yt+'" x2="'+x+'" y2="'+yt+'"/>':'')+'</g>';
if(o>.6){const c=proj(p.clone().setY(hh)),bs=proj(p.clone().setY(0)),val=hh.toFixed(1)+' MM',nm=k==='A'?'MICRO':k==='C'||cur<4?'MINI':'DELUXE',w=val.length*6.6+10,op=Math.min(1,(o-.6)*2.5);
s+='<g opacity="'+op+'"><rect class="bg" x="'+(c[0]-w/2)+'" y="'+(c[1]-22)+'" width="'+w+'" height="15"/><text x="'+c[0]+'" y="'+(c[1]-11)+'" text-anchor="middle">'+val+'</text><text class="mut" x="'+bs[0]+'" y="'+(bs[1]+18)+'" text-anchor="middle">'+nm+'</text></g>'}}}ov.innerHTML=s+drawParts()}
// sketch alignment: fit the drawing's ink box (50,208)-(973,815 of 1024) to the projected silhouette
function alignSketch(){if(V.sketch<.005){sketch.style.opacity=0;return}A.m.updateMatrixWorld();const e=A.m.matrixWorld.elements;let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;const W=stageEl.clientWidth,H=stageEl.clientHeight;
for(let i=0;i<pc.length;i+=27){pv.set(pc[i],pc[i+1],pc[i+2]).applyMatrix4(A.m.matrixWorld).project(cam);const x=(pv.x+1)/2*W,y=(1-pv.y)/2*H;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
const sx=(x1-x0)/923,sy=(y1-y0)/607;sketch.style.top='0';sketch.style.width=1024*sx+'px';sketch.style.height=1024*sy+'px';sketch.style.transform=`translate(${x0-50*sx}px,${y0-208*sy}px)`;sketch.style.opacity=V.sketch}
// apply
function apply(){const r=RV(),cr=CR();
A.h.position.y=V.hop*30;A.h.scale.set(1+.14*V.sq,1-.2*V.sq,1+.14*V.sq);edgeMat.opacity=V.draw*(1-V.diss)*.9;A.m.visible=V.wipe>.002;planeA.normal.copy(cr).negate();planeA.constant=-62+124*V.wipe;
const ry=ROT*V.elev;A.h.rotation.y=B.h.rotation.y=C.h.rotation.y=PG.rotation.y=ry;B.h.visible=V.Bvis>.5;B.h.position.copy(r).multiplyScalar(mapU(V.Bu,V.elev));B.h.scale.setScalar(V.Bk);B.m.position.y=V.lift*(2.4+37.6*(1-V.settle))/V.Bk;B.mat.userData.u.uMix.value=V.roof;
PG.visible=V.plate>.002;PG.position.copy(B.h.position);planeP.normal.copy(cr).negate();planeP.constant=PG.position.dot(cr)-100+200*V.plate;
C.h.visible=V.Cw>.002;C.h.position.copy(r).multiplyScalar(mapU(U_MINI,V.elev));C.h.scale.setScalar(SC);planeC.normal.copy(cr).negate();planeC.constant=C.h.position.dot(cr)-100+200*V.Cw;
}
// copy + game loop
let cur=0;const txt=document.getElementById('txt'),notes=document.getElementById('notes'),pEl=document.getElementById('p'),tapEl=document.getElementById('tap'),cardEl=document.getElementById('card'),banner=document.getElementById('banner'),title=document.getElementById('title'),app=stageEl;
txt.addEventListener('click',e=>{if(e.target.classList.contains('fn'))window.__notes(true)});
document.getElementById('back').onclick=()=>{if(exploring){exploring=false;zoomT=1;azOffT=0;exploreEl=EL;go(5,true)}else go(cur-1)};
const extraEl=document.getElementById('extra');
let microCol='Ash';
let exploring=false,exploreSelection='micro',zoom=1,zoomT=1,exploreEl=EL,spin=false;
function action(text,fn,secondary=false){const b=document.createElement('button');b.className='action'+(secondary?' secondary':'');b.type='button';b.textContent=text;b.onclick=fn;return b}
function renderExtra(){const S=STAGES[cur];extraEl.replaceChildren();
 if(exploring){document.getElementById('h').textContent='Turn it in your hands.';document.getElementById('eb').textContent='Explore the sculpture';const chooser=document.createElement('select');chooser.setAttribute('aria-label','Sculpture edition');for(const [value,text]of [['micro','Micro · 2 in'],['mini','Mini · 3.5 in'],['deluxe','Mini Deluxe'],['collection','The collection']]){const option=document.createElement('option');option.value=value;option.textContent=text;chooser.append(option)}chooser.value=exploreSelection;chooser.onchange=()=>{exploreSelection=chooser.value;zoomT=1;fit(cur)};extraEl.append(chooser);const controls=document.createElement('div');controls.className='explorer';controls.append(action('Turn left',()=>azOffT-=.3,true),action('Turn right',()=>azOffT+=.3,true),action('Reset view',()=>{azOffT=0;zoomT=1;exploreEl=EL;spin=false;extraEl.querySelector('input').value=1},true));const label=document.createElement('label');label.textContent='Zoom';const range=document.createElement('input');range.type='range';range.min='.65';range.max='1.65';range.step='.05';range.value=zoomT;range.setAttribute('aria-label','Sculpture zoom');range.oninput=()=>zoomT=+range.value;label.append(range);controls.append(label);const help=document.createElement('p');help.className='help';help.textContent='Drag to turn · pinch to zoom. The larger editions use scaled preview geometry.';extraEl.append(help,controls);return}
 if(S.sw){const sw=document.createElement('div');sw.className='sw';sw.setAttribute('aria-label','Micro colour');Object.entries(FIL).filter(([k])=>k!=='Dark Green').forEach(([k,c])=>{const b=document.createElement('button');b.style.setProperty('--c',c);b.title=k;b.setAttribute('aria-label',k);b.setAttribute('aria-pressed',String(k===microCol));b.onclick=()=>{microCol=k;A.mat.color.set(c);SFX.p('sw',Object.keys(FIL).indexOf(k));renderExtra();extraEl.querySelector('[aria-label="'+k+'"]')?.focus({preventScroll:true})};sw.append(b)});extraEl.append(sw)}
 if(S.cta){const row=document.createElement('div');row.className='act';row.append(action('Explore the sculpture',()=>{exploring=true;azOffT=0;zoomT=1;go(5,true);setCopy(false);updTap();fit(cur)}),action('How it’s made',()=>window.__tab('make'),true));extraEl.append(row)}
}
const segs=(v,max)=>{const n=Math.round(v/max*12);let s='';for(let i=0;i<12;i++)s+='<i class="'+(i<n?'f':'')+'" style="animation-delay:'+(.35+i*.05)+'s"></i>';return'<span class="bar">'+s+'</span>'};
function renderCard(){const it=STAGES[cur].item;if(!it){cardEl.innerHTML='';return}
if(STAGES[cur].item)setTimeout(()=>SFX.p('bars'),0);cardEl.innerHTML='<div class="card" style="--acc:'+it.acc+'"><img class="px" src="'+it.img+'" alt=""><div class="nm"><b>'+it.name+'</b><span>'+it.price+'</span></div><div class="stats"><span class="k">HEIGHT</span><span class="bar" id="hbar"></span><span class="v" id="hval"></span><span class="k">PARTS</span>'+segs(it.parts,2)+'<span class="v">'+it.parts+'</span><span class="k">COLOURS</span>'+segs(it.cols,6)+'<span class="v">'+it.cols+'</span></div></div>'}
function liveH(){if(cur===2)return 50.8;if(cur>=3)return 50.8*V.Bk+V.lift*(2.4+37.6*(1-V.settle));return 0}
let lastSeg=-1;function hud(){const hv=document.getElementById('hval');if(!hv)return;const v=liveH();hv.textContent=v.toFixed(1)+' MM';const n=Math.round(v/88.9*12);if(n!==lastSeg){lastSeg=n;let s='';for(let i=0;i<12;i++)s+='<i class="'+(i<n?'f':'')+'"></i>';document.getElementById('hbar').innerHTML=s}}
let typing=null;function typeText(html){clearInterval(typing);const plain=html.replace(/<button[^>]*>(.*?)<\/button>/g,'$1').replace(/<[^>]+>/g,'');if(reduce){pEl.innerHTML=html;typing=null;return}let i=0;
typing=setInterval(()=>{i+=2;if(i%6==0)SFX.p('type');if(i>=plain.length){clearInterval(typing);typing=null;pEl.innerHTML=html;updTap();fit(cur);return}pEl.innerHTML=plain.slice(0,i).replace(/</g,'&lt;')+'<span class="caret"></span>'},28);pEl.dataset.full=html}
function finishType(){if(!typing)return false;clearInterval(typing);typing=null;pEl.innerHTML=pEl.dataset.full;return true}
function busy(){return !!typing||tw.some(t=>t.k!=='lab')}
function updTap(){tapEl.textContent=exploring?'Back to the story':cur===STAGES.length-1?'Play again':busy()?'Skip animation':'Continue';tapEl.setAttribute('aria-label',tapEl.textContent)}
function inv(pop){document.querySelectorAll('.slot').forEach(s=>{const on=cur>=+s.dataset.k;const was=s.classList.contains('on');s.classList.toggle('on',on);if(on&&!was&&pop){s.classList.remove('pop');void s.offsetWidth;s.classList.add('pop');setTimeout(()=>SFX.p('coin'),250)}})}
function showBanner(){const b=STAGES[cur].ban;if(!b||reduce)return;banner.style.top=(txt.getBoundingClientRect().bottom-app.getBoundingClientRect().top+8)+'px';document.getElementById('ba').textContent=b[0];document.getElementById('bb').textContent=b[1];banner.classList.remove('show');void banner.offsetWidth;banner.classList.add('show');SFX.p('banner')}
function setCopy(anim){const S=STAGES[cur];document.getElementById('eb').textContent=S.eb;const hh=document.getElementById('h');hh.textContent=S.h;if(anim){hh.classList.remove('in');void hh.offsetWidth;hh.classList.add('in')}anim?typeText(S.p):(pEl.innerHTML=S.p);renderExtra();renderCard();lastSeg=-1;
document.getElementById('back').disabled=cur===0;document.getElementById('count').textContent='Stage 0'+(cur+1)+' / 0'+STAGES.length;requestAnimationFrame(()=>requestAnimationFrame(()=>fit(cur)))}
function go(s,instant){s=Math.max(0,Math.min(STAGES.length-1,s));const prev=cur;cur=s;tw=[];V.lab=0;azOffT=0;const fwd=s===prev+1&&SEQ[s]&&!instant;
if(instant||reduce){Object.assign(V,END[s]);V.lab=1}
fxT.forEach(clearTimeout);fxT=[];
if(fwd&&reduce)for(const[t,k]of FX[s]||[])fxT.push(setTimeout(()=>SFX.p('fx'+k),t*1000));if(fwd)SFX.p('st'+s);
if(fwd&&!reduce)for(const[t,k]of FX[s]||[])fxT.push(setTimeout(()=>fx(k),t*1000));
if(instant||reduce){}else if(fwd){let end=0;for(const[k,v,d,del,e]of SEQ[s]){to(k,v,d,del,e);end=Math.max(end,d+del)}to('lab',1,.4,end-.1)}
else{for(const k in END[s]){if(k==='Bvis'){END[s].Bvis?(V.Bvis=1):to('Bvis',0,0,.8)}else to(k,END[s][k],.8,0)}to('lab',1,.4,.8)}
fit(s);notes.hidden=true;txt.style.opacity=0;inv(fwd);setTimeout(()=>{setCopy(!instant);txt.style.opacity=1;updTap();if(fwd)showBanner()},instant?0:150)}
function advance(){
 if(!document.getElementById('make').hidden||!notes.hidden)return;
 if(exploring){exploring=false;zoomT=1;azOffT=0;exploreEl=EL;go(5,true);setCopy(false);updTap();return}
 if(!title.hidden){title.hidden=true;title.classList.remove('out');window.__syncPanels();go(0,true);setCopy(true);updTap();return}
 if(busy()){finishType();tw=[];Object.assign(V,END[cur]);V.lab=1;updTap();fit(cur);return}
 SFX.p('tap');if(cur===STAGES.length-1){title.hidden=false;window.__syncPanels();document.getElementById('startBtn').focus();return}go(cur+1)
}
document.getElementById('tap').onclick=advance;document.getElementById('startBtn').onclick=()=>{SFX.p('start');advance()};
let pd=null;app.addEventListener('pointerdown',e=>{if(e.target.closest('button,a,input,.sheet,#make'))return;pd={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false}});
app.addEventListener('pointermove',e=>{if(pd&&e.pointerId===pd.id&&Math.hypot(e.clientX-pd.x,e.clientY-pd.y)>8)pd.moved=true});
app.addEventListener('pointerup',e=>{if(!pd||pd.id!==e.pointerId)return;const click=!pd.moved;pd=null;if(click&&!e.target.closest('button,a,input,.sheet,.sw,#make'))advance()});
app.addEventListener('pointercancel',()=>pd=null);
addEventListener('keydown',e=>{if(e.repeat||e.altKey||e.ctrlKey||e.metaKey||!document.getElementById('make').hidden||!notes.hidden||e.target.closest('button,a,input,select,textarea'))return;if(['ArrowRight',' ','Enter'].includes(e.key)){e.preventDefault();advance()}if(e.key==='ArrowLeft'&&title.hidden){e.preventDefault();go(cur-1)}});
let drag=null,lastRat=0;const pointers=new Map();let pinchDistance=0;
cv.setAttribute('aria-label','Interactive Fonthill sculpture. Drag to turn. In Explore, pinch to zoom.');cv.setAttribute('role','img');
cv.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});drag={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId);if(pointers.size>1){if(pd)pd.moved=true;const p=[...pointers.values()];pinchDistance=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)}});
cv.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId)||!drag)return;const old=pointers.get(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size>1){if(pd)pd.moved=true;const p=[...pointers.values()],dist=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);if(exploring&&pinchDistance>0)zoomT=Math.max(.65,Math.min(1.65,zoomT*dist/pinchDistance));pinchDistance=dist;const range=extraEl.querySelector('input');if(range)range.value=zoomT;return}const next=azOffT-(e.clientX-old.x)*.006;azOffT=exploring?next:Math.max(-1.1,Math.min(1.1,next));if(exploring)exploreEl=Math.max(.12,Math.min(1.2,exploreEl+(e.clientY-old.y)*.004));const st=Math.round(azOffT/.09);if(st!==lastRat){lastRat=st;SFX.p('rat')}});
function release(e){pointers.delete(e.pointerId);drag=pointers.size?[...pointers.values()][0]:null;pinchDistance=0;if(e.type!=='pointerup')pd=null}
cv.addEventListener('pointerup',release);cv.addEventListener('pointercancel',release);cv.addEventListener('lostpointercapture',e=>{if(pointers.has(e.pointerId))release(e)});
window.__story={go,V,restart:()=>{exploring=false;zoomT=1;azOffT=0;title.hidden=true;window.__syncPanels();go(0,true);setCopy(false)},start:()=>{if(!title.hidden)advance()},setAz:a=>{AZ0=a;fit(cur)}};
function size(){const w=stageEl.clientWidth,h=stageEl.clientHeight,pt=h/w>1.45;PHI=pt?56*Math.PI/180:0;KU=pt?1.3:1;renderer.setSize(w,h,false);fit(cur)}
new ResizeObserver(size).observe(stageEl);document.fonts.ready.then(size);document.getElementById('startBtn').disabled=false;document.getElementById('startBtn').textContent='Start the story';window.__syncPanels();
first=true;go(0,true);size();
let paused=false;window.__pause3D=v=>paused=v;document.addEventListener('visibilitychange',()=>{paused=document.hidden||!document.getElementById('make').hidden});cv.addEventListener('webglcontextlost',e=>{e.preventDefault();paused=true;window.__failure('The 3D view was interrupted. Your place in the story is preserved. Try 3D again to reload.')});renderer.setAnimationLoop(now=>{if(paused)return;tick(now);apply();updTap();
const k=reduce?1:.07;camC.lerp(camT,k);camH+=(camHT-camH)*k;azOff+=(azOffT-azOff)*(reduce?1:.12);
const w=stageEl.clientWidth,h=stageEl.clientHeight,asp=w/h;zoom+=(zoomT-zoom)*(reduce?1:.15);cam.left=-camH*asp/zoom;cam.right=camH*asp/zoom;cam.top=camH/zoom;cam.bottom=-camH/zoom;cam.updateProjectionMatrix();
stepParts(now);const d=dirFor(AZ0+azOff,exploring?exploreEl:EL*(1-V.elev)),sh=new THREE.Vector3();if(shake>.05){const u=camH*2/h;sh.set((Math.random()-.5)*shake*u,(Math.random()-.5)*shake*u,(Math.random()-.5)*shake*u);shake*=.86}else shake=0;
const cc=camC.clone().add(sh);cam.position.copy(cc).addScaledVector(d,1500);cam.lookAt(cc);
const r=new THREE.Vector3(Math.cos(AZ0+azOff),0,-Math.sin(AZ0+azOff));dl.position.copy(camC).addScaledVector(r,-500).addScaledVector(d,300).add(new THREE.Vector3(0,700,0));dl.target.position.copy(camC);
if(exploring){A.h.visible=exploreSelection==='micro'||exploreSelection==='collection';B.h.visible=exploreSelection==='deluxe'||exploreSelection==='collection';C.h.visible=exploreSelection==='mini'||exploreSelection==='collection';PG.visible=exploreSelection==='deluxe'||exploreSelection==='collection'}else A.h.visible=true;renderer.render(scene,cam);alignSketch();drawCallouts();hud()});

}

function fallback(error){console.error('Fonthill 3D unavailable',error);document.getElementById('load').hidden=true;
 document.getElementById('startBtn').disabled=false;document.getElementById('startBtn').textContent='Start the story';const app=document.getElementById('app'),title=document.getElementById('title'),sketch=document.getElementById('sketch');app.querySelector('canvas')?.remove();sketch.style.cssText='position:absolute;left:5%;top:37%;width:90%;height:auto;opacity:1';
 const titles=['A house imagined from within.','Look closer.','Fonthill Micro','Fonthill Mini','Fonthill Mini Deluxe Edition','A place worth looking at closely.'];
 const copy=['Mercer planned Fonthill from within, room by room.','An architectural study becomes a sculpture.','A 2-inch interpretation, printed in PLA.','At a larger scale, more of the building comes into view.','Gray walls, terracotta-coloured roofs and a separate landscape base.','Continue with the illustrated account of the castle and the sculpture.'];let stage=0;
 function render(){document.getElementById('count').textContent='Stage 0'+(stage+1)+' / 06';document.getElementById('eb').textContent='Illustrated story · 3D unavailable';document.getElementById('h').textContent=titles[stage];document.getElementById('p').textContent=copy[stage];document.getElementById('card').replaceChildren();const extra=document.getElementById('extra');extra.replaceChildren();const made=document.createElement('button');made.className='action secondary';made.textContent='How it’s made';made.onclick=()=>window.__tab('make');extra.append(made);const retry=document.createElement('button');retry.className='action secondary';retry.textContent='Retry 3D';retry.onclick=()=>location.reload();extra.append(retry);document.getElementById('tap').textContent=stage===5?'Play again':'Continue';document.getElementById('back').disabled=stage===0;window.__syncPanels()}
 const start=()=>{title.hidden=true;render()};document.getElementById('startBtn').onclick=start;document.getElementById('tap').onclick=()=>{stage=(stage+1)%6;render()};document.getElementById('back').onclick=()=>{stage=Math.max(0,stage-1);render()};window.__story={start,restart:()=>{stage=0;start()}};
 // Keep the explanation accessible without covering the persistent navigation.
 const status=document.createElement('p');status.className='help';status.textContent='3D is unavailable on this connection or device. The illustrated story and making section remain available.';title.querySelector('.frame').append(status);render();
}
boot().catch(fallback);
