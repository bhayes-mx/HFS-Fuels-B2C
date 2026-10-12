(function(){
const ORDER=['spring','summer','fall','winter'];
const S={
spring:{name:'Spring',ic:'local_florist',c:'#2f7d3a',lede:'Thawed roads and longer days. Time to shake off winter and get your car ready for the miles ahead.',
 fun:[['Wildflower drives','Take the scenic route through valleys in bloom.'],['Opening day road trip','Catch a ballgame a few hours from home.',1],['National park season','Arches, Zion and Yellowstone start to come back to life.']],
 tips:[['Wash off the road salt','Rinse the undercarriage to stop rust before it starts.'],['Swap your wiper blades','Winter ice wears them out; spring showers find out.'],['Check alignment','Potholes knock wheels out of line and wear tires unevenly.'],['Test the A/C','Find a problem now, before the first hot day.']],
 spot:{k:'Fuel spotlight',t:'Top Tier gas with DINOCARE®',d:'Deposits from short, cold winter trips build up in your engine. DINOCARE® cleans them out and helps your engine run smooth again.',to:'dinocare'}},
summer:{name:'Summer',ic:'wb_sunny',c:'#EE2F25',lede:'Road trip season is here. Keep cool, stay hydrated and keep your car running strong in the heat.',
 fun:[['The great American road trip','Hit the open road and find Sinclair stops along the way.',1],['Lake days','Pack the cooler, the paddleboard and the sunscreen.'],['County fairs and rodeos','Small-town summer at its best.']],
 tips:[['Top off coolant','Heat is the top cause of summer breakdowns.'],['Check tire pressure cold','Hot pavement raises pressure. Check before you drive.'],['Test your battery','High heat drains batteries faster than cold.'],['Pack a hot-weather kit','Water, sunscreen, a phone charger and jumper cables.']],
 spot:{k:'Fuel spotlight',t:'Summer blend gasoline',d:'From June to mid-September, Sinclair gas switches to a summer blend made to evaporate less in the heat, which means cleaner air on hot, smoggy days.',to:'quality-fuels'}},
fall:{name:'Fall',ic:'eco',c:'#a3431a',lede:'Cooler air, shorter days and wet leaves on the road. A little prep now makes winter easier.',
 fun:[['Leaf-peeping drives','Mountain byways are at their brightest in early October.',1],['Pumpkin patches and corn mazes','Load up the family and the trunk.'],['Game-day tailgates','Gas up early and claim the best spot.']],
 tips:[['Check your headlights','Darker commutes need clear lenses and working bulbs.'],['Inspect tire tread','Wet leaves and early frost need good grip.'],['Test the heater and defroster','Make sure both work before the first cold morning.'],['Replace the cabin air filter','Clear out summer dust and pollen.']],
 spot:{k:'Fuel spotlight',t:'Top Tier gas with DINOCARE®',d:'Get your engine ready for cold starts. Sinclair Top Tier gas with DINOCARE® keeps intake valves and fuel injectors clean all season.',to:'top-tier'}},
winter:{name:'Winter',ic:'ac_unit',c:'#2a5b8c',lede:'Snow, ice and cold starts. Be prepared so you can enjoy the season instead of fighting it.',
 fun:[['Ski and snowboard trips','Fresh powder is just a drive away.',1],['Holiday light tours','Make a hot cocoa stop at your favorite DINO station.'],['Ice fishing','Bundle up and find a frozen lake.']],
 tips:[['Keep your tank half full','It prevents fuel-line freeze and keeps you covered if you’re stuck.'],['Use winter washer fluid','Regular fluid can freeze on the windshield.'],['Check tread or switch tires','Snow tires grip better below 45°F.'],['Pack a winter kit','Blanket, ice scraper, shovel, flashlight and snacks.']],
 spot:{k:'Fuel spotlight',t:'Winter blend gasoline',d:'Sinclair winter blend vaporizes more easily in the cold, so your engine starts faster and runs smoother on freezing mornings.',to:'quality-fuels'}}};
const curSeason=()=>{const m=new Date().getMonth();return m>=2&&m<=4?'spring':m<=7&&m>=5?'summer':m>=8&&m<=10?'fall':'winter'};
function mount(el,opt){if(!el)return;opt=opt||{};const href=opt.href||(()=>'#'),src=opt.src||(()=>''),esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
 const N=ORDER.length,mod=n=>(n%N+N)%N;let i=ORDER.indexOf(curSeason()),busy=false;
 const pageL=(k,m)=>{const s=S[k],n=ORDER.indexOf(k)*2+1;return `<div class="gp gp-l" style="--sa:${s.c}"><div class="gp-top"><span class="gp-k"><span class="ms">${s.ic}</span>${s.name}</span><span class="gp-n">${n}</span></div><h2>${s.name} Guide for Car Care</h2><p class="gp-lede">${esc(s.lede)}</p><div class="gp-img">${m?'':`<image-slot id="sg-${k}"${src('sg-'+k)} shape="rounded" radius="10" placeholder="${s.name} driving photo (12:5)"></image-slot>`}</div><h3>Fun things to do</h3><ol class="gp-fun">${s.fun.map(([t,d,tp])=>`<li><div><b>${esc(t)}.</b> <span>${esc(d)}</span>${tp?` <a class="gp-tp" href="${href('trip-planner')}">Use Our Trip Planner<span class="ms">arrow_forward</span></a>`:''}</div></li>`).join('')}</ol></div>`};
 const pageR=k=>{const s=S[k],n=ORDER.indexOf(k)*2+2;return `<div class="gp gp-r" style="--sa:${s.c}"><div class="gp-top"><span class="gp-k gp-k2">Car care checklist</span><span class="gp-n">${n}</span></div><ul class="gp-tips">${s.tips.map(([t,d])=>`<li><span class="ms">check_circle</span><div><b>${esc(t)}</b><span>${esc(d)}</span></div></li>`).join('')}</ul><div class="gp-spot"><span class="gp-sk">${s.spot.k}</span><h4>${esc(s.spot.t)}</h4><p>${esc(s.spot.d)}</p><a href="${href(s.spot.to)}">Learn more<span class="ms">arrow_forward</span></a></div><div class="gp-foot"><span>Sinclair Seasonal Guides</span><span>${s.name}</span></div></div>`};
 const cover=()=>`<div class="gc"><img class="gc-logo" src="design-files/HFS Logo Dark.png" alt="HF Sinclair"><div class="gc-t"><span class="gc-k">${new Date().getFullYear()} Edition</span><h2>Sinclair Seasonal Care Guide</h2><p>Road trip ideas, car care checklists and the right fuel for every season.</p></div><div class="gc-s">${ORDER.map(k=>`<span style="--sa:${S[k].c}"><span class="ms">${S[k].ic}</span>${S[k].name}</span>`).join('')}</div><span class="gc-open"><span class="ms">menu_book</span>Open the guide</span></div>`;
 const intro=()=>`<div class="gi"><span class="gi-k"><span class="ms">auto_stories</span>How it works</span><h2>Car care for every time of year</h2><p>Each season gets its own two-page spread: things to do, a car care checklist and the Sinclair fuel that fits the weather.</p><ol><li><span><b>Open the guide.</b> Click or drag the cover. It opens to ${S[ORDER[i]].name}, the season we’re in now.</span></li><li><span><b>Turn the pages.</b> Drag a page corner, use the arrows or jump to any season.</span></li><li><span><b>Plan ahead.</b> Tap a fuel spotlight to learn more.</span></li></ol></div>`;
 let closed=true;
 el.className='gb-wrap closed';
 el.innerHTML=`<div class="gb-ctl"><div class="gb-tabs" role="tablist" aria-label="Choose a season">${ORDER.map((k,j)=>`<button type="button" role="tab" data-j="${j}"><span class="ms">${S[k].ic}</span>${S[k].name}</button>`).join('')}</div><div class="gb-arrows"><button type="button" class="gb-ar" data-d="-1" aria-label="Previous season"><span class="ms">arrow_back</span></button><button type="button" class="gb-ar" data-d="1" aria-label="Next season"><span class="ms">arrow_forward</span></button></div></div>
<div class="gb" tabindex="0" aria-roledescription="brochure" aria-label="Seasonal car care guide. Drag a page or use the arrow keys to turn."><div class="gb-book"><div class="gb-pg gb-L"></div><div class="gb-pg gb-R"></div><div class="gb-leaf" hidden><div class="gb-face gb-f"><div class="gb-c"></div><i class="gb-sh"></i></div><div class="gb-face gb-b"><div class="gb-c"></div><i class="gb-sh"></i></div></div><i class="gb-spine" aria-hidden="true"></i></div></div>
<p class="gb-hint"><span class="ms">swipe</span><span class="gb-ht"></span></p>`;
 const q=s=>el.querySelector(s),book=q('.gb'),bk=q('.gb-book'),L=q('.gb-L'),R=q('.gb-R'),leaf=q('.gb-leaf'),lf=q('.gb-f .gb-c'),lb=q('.gb-b .gb-c'),sf=q('.gb-f .gb-sh'),sb=q('.gb-b .gb-sh');
 const narrow=()=>matchMedia('(max-width:760px)').matches;
 function measure(){if(narrow()){bk.style.minHeight='';return}const m=document.createElement('div');m.className='gb-book';m.style.cssText=`position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:${bk.offsetWidth}px;min-height:0`;el.appendChild(m);let mx=0;m.innerHTML=`<div class="gb-pg gb-L gb-intro">${intro()}</div><div class="gb-pg gb-R">${cover()}</div>`;mx=m.offsetHeight;ORDER.forEach(k=>{m.innerHTML=`<div class="gb-pg gb-L">${pageL(k,1)}</div><div class="gb-pg gb-R">${pageR(k)}</div>`;mx=Math.max(mx,m.offsetHeight)});m.remove();bk.style.minHeight=mx+'px'}
 let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(el.isConnected)measure()},150)});
 function ui(){el.querySelectorAll('.gb-tabs button').forEach((b,j)=>{b.setAttribute('aria-selected',j===i);b.style.setProperty('--sa',S[ORDER[j]].c)})}
 function hint(){q('.gb-ht').textContent=closed?'Click or drag the cover to open the guide':'Drag a page corner or use the arrows to turn the page'}
 function showClosed(){L.classList.add('gb-intro');L.innerHTML=intro();R.innerHTML=cover();leaf.hidden=true;L.style.opacity='';hint();ui()}
 function openPrep(){R.innerHTML=pageR(ORDER[i]);lf.innerHTML=cover();lb.innerHTML=pageL(ORDER[i]);leaf.hidden=false}
 function openDone(){closed=false;el.classList.remove('closed');L.classList.remove('gb-intro');L.style.opacity='';show();hint()}
 function open(j){if(!closed||busy)return;if(j!=null)i=j;if(narrow()){openDone();return}busy=true;openPrep();setA(0);tween(0,-180,950,setA,()=>{openDone();busy=false})}
 function show(){L.innerHTML=pageL(ORDER[i]);R.innerHTML=pageR(ORDER[i]);leaf.hidden=true;bk.style.transform='';bk.style.opacity='';ui()}
 function prep(dir,j){if(dir>0){R.innerHTML=pageR(ORDER[j]);lf.innerHTML=pageR(ORDER[i]);lb.innerHTML=pageL(ORDER[j])}else{L.innerHTML=pageL(ORDER[j]);lf.innerHTML=pageR(ORDER[j]);lb.innerHTML=pageL(ORDER[i])}leaf.hidden=false}
 function setA(a){if(closed)L.style.opacity=Math.max(0,1+a/90).toFixed(3);leaf.style.transform=`rotateY(${a}deg)`;const p=-a/180;sf.style.opacity=(p*.55).toFixed(3);sb.style.opacity=((1-p)*.55).toFixed(3);leaf.style.zIndex=3}
 function tween(from,to,ms,step,done){const t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/ms),e=1-Math.pow(1-k,3);step(from+(to-from)*e);if(k<1)requestAnimationFrame(f);else done()};requestAnimationFrame(f)}
 function slide(dir,j){busy=true;tween(0,1,220,p=>{bk.style.transform=`translateX(${-dir*p*40}px)`;bk.style.opacity=1-p},()=>{i=j;show();bk.style.opacity=0;tween(0,1,260,p=>{bk.style.transform=`translateX(${dir*(1-p)*40}px)`;bk.style.opacity=p},()=>{bk.style.transform='';busy=false})})}
 function go(dir,j){if(closed)return open(j);if(busy)return;j=j==null?mod(i+dir):j;if(j===i)return;if(narrow())return slide(dir,j);busy=true;prep(dir,j);const a0=dir>0?0:-180,a1=dir>0?-180:0;setA(a0);tween(a0,a1,700,setA,()=>{i=j;show();busy=false})}
 el.querySelectorAll('.gb-ar').forEach(b=>b.onclick=()=>go(+b.dataset.d));
 el.querySelectorAll('.gb-tabs button').forEach(b=>b.onclick=()=>{const j=+b.dataset.j;if(closed)return open(j);if(j===i)return;const fw=mod(j-i);go(fw<=N/2?1:-1,j)});
 book.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(1)}else if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});
 // drag to turn
 let d=null,eat=false;
 bk.addEventListener('pointerdown',e=>{if(busy||e.button>0||e.target.closest('image-slot[data-editable]'))return;const r=bk.getBoundingClientRect();if(closed&&(narrow()||e.clientX<r.left+r.width/2))return;d={x0:e.clientX,r,dir:narrow()?0:(e.clientX>r.left+r.width/2?1:-1),on:false,id:e.pointerId,op:closed}});
 bk.addEventListener('pointermove',e=>{if(!d)return;const dx=e.clientX-d.x0;
  if(!d.on){if(Math.abs(dx)<8)return;if(d.dir&&Math.sign(dx)===d.dir)return;d.on=true;eat=true;bk.setPointerCapture(d.id);if(d.op)openPrep();else if(d.dir){d.j=mod(i+d.dir);prep(d.dir,d.j)}}
  if(!d.dir){bk.style.transform=`translateX(${dx*.6}px)`;bk.style.opacity=1-Math.min(Math.abs(dx)/400,.5);return}
  const half=d.r.width/2,sp=d.r.left+half,c=Math.max(-1,Math.min(1,(e.clientX-sp)/half));d.a=-Math.acos(c)*180/Math.PI;setA(d.a)});
 const end=e=>{if(!d)return;const D=d;d=null;if(!D.on)return;
  if(!D.dir){const dx=e.clientX-D.x0;if(Math.abs(dx)>60){bk.style.transform='';bk.style.opacity='';slide(dx<0?1:-1,mod(i+(dx<0?1:-1)))}else{bk.style.transform='';bk.style.opacity=''}return}
  const a=D.a==null?(D.dir>0?0:-180):D.a,done=D.dir>0?a<-80:a>-100,to=done?(D.dir>0?-180:0):(D.dir>0?0:-180);busy=true;
  tween(a,to,Math.max(160,Math.abs(to-a)/180*600),setA,()=>{if(D.op){done?openDone():showClosed()}else{if(done)i=D.j;show()}busy=false})};
 bk.addEventListener('pointerup',end);bk.addEventListener('pointercancel',end);
 bk.addEventListener('click',e=>{if(eat){e.preventDefault();e.stopPropagation();eat=false;return}if(closed&&e.target.closest('.gc'))open()},true);
 showClosed();measure();if(document.fonts)document.fonts.ready.then(()=>el.isConnected&&measure())}
window.HFSGuides={mount};
})();
