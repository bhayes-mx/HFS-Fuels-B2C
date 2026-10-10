(function(){
const COLS={campaigns:['Campaigns & Ads','campaign'],products:['Vintage Products','oil_barrel'],roadtrips:['Road Trips','directions_car'],stations:['Stations','local_gas_station'],dino:['DINO','pets'],events:['Parades & Events','celebration']};
const CH=[
{id:'c1',yr:'',rl:'1920\'s',era:[1910,1920],t:'Shaping the Fuels Industry',p:'Harry F. Sinclair founds Sinclair Oil just as the automobile is turning America into a nation of drivers. Early stations, signs and cans set out the look the company would keep for a century.',arts:['i01','i02','i03']},
{id:'c2',yr:'1930',rl:'1930\'s',rt:'Enter the DINO',era:[1930],t:'Enter the dinosaur',p:'Advertising ties crude oil to the age of the dinosaurs, and a green brontosaurus starts appearing on ads, giveaways and signs. Before long, DINO is the brand.',arts:['i05','i06','i07']},
{id:'c3',yr:'1950',era:[1950,1960],t:'Road trip America',p:'New highways send families across the country. Sinclair stations, road maps and souvenir stamps become part of the trip, often in the background of photos from millions of vacations.',arts:['i10','i11','i13']},
{id:'c4',yr:'1964',rl:'1960\'s',era:[1960],t:'Dinoland',p:'At the New York World’s Fair, life-size dinosaurs fill Sinclair’s Dinoland pavilion. Visitors leave with figurines and photos, and the dinosaurs go on tour afterwards.',arts:['i15','i16','i17']},
{id:'c5',yr:'1970',rl:'1990\'s',era:[1970,1980],t:'On parade',p:'DINO goes giant as a parade balloon over city streets, while ad campaigns keep the brand close to home for drivers across the West and Midwest.',arts:['i19','i20','i21']},
{id:'c6',yr:'Today',era:[2000,2010,2020],t:'Still leading the way',p:'DINO statues stand guard at stations across the network, and travelers still stop to take a picture with one. Got one of your own? Share it.',arts:['i23','i24','i22'],share:true}];
const IT=[
['i01','Oil Fields and Pipelines','products',1916,'Oklahoma',1.3,'c1'],['i02','Leaders in Premium Gasoline','stations',1926,'',1,'c1'],['i03','Moving the Market Forward','campaigns',1928,'New York',1.4,'c1'],['i04','Porcelain station sign','stations',1926,'Kansas',.8,''],
['i05','Dinosaur magazine ad series','campaigns',1932,'',1.35,'c2'],['i06','DINO stamp album giveaway','dino',1935,'',1.2,'c2'],['i07','Brontosaurus sign over a service bay','stations',1938,'Missouri',.9,'c2'],['i08','Gasoline pump globe','products',1939,'',1,''],
['i09','Wartime conservation poster','campaigns',1943,'',1.4,''],['i10','Family vacation at a roadside station','roadtrips',1955,'Wyoming',.75,'c3'],['i11','Fold-out highway road map','products',1957,'Colorado',1.1,'c3'],['i12','Station attendant uniform','products',1958,'',1.3,''],
['i13','Station on a two-lane highway','roadtrips',1961,'Utah',.8,'c3'],['i14','Television commercial stills','campaigns',1962,'',.75,''],['i15','Dinoland pavilion at the World’s Fair','events',1964,'New York',.8,'c4'],['i16','Souvenir dinosaur figurine','dino',1964,'New York',1.25,'c4'],
['i17','Dinosaur exhibit on tour','events',1966,'Texas',.85,'c4'],['i18','Station grand-opening photo','stations',1968,'Idaho',1.2,''],['i19','DINO parade balloon','events',1972,'New York',.7,'c5'],['i20','Regional newspaper campaign','campaigns',1976,'Montana',1.4,'c5'],
['i21','Cross-country trip snapshot','roadtrips',1984,'Nebraska',.9,'c5'],['i22','Classic station restoration','stations',2008,'Wyoming',.8,'c6'],['i23','DINO statue at a station','dino',2016,'Utah',1.2,'c6'],['i24','Traveler photo with DINO statue','roadtrips',2021,'Colorado',.75,'c6'],
['s01','“Dad’s first car, first fill-up”','roadtrips',1959,'Kansas',1.2,'','Submitted by Linda R.'],['s02','“Me and the DINO statue”','roadtrips',1997,'Wyoming',.8,'','Submitted by the Ortega family'],['s03','“Route 66, summer of ’78”','roadtrips',1978,'New Mexico',1.25,'','Submitted by Mark T.']
].map(([id,t,c,y,pl,ar,ch,by])=>({id,t,c,y,pl,ar,ch,by,d:Math.floor(y/10)*10}));
const byId=Object.fromEntries(IT.map(i=>[i.id,i]));
const DECS=[...new Set(IT.map(i=>i.d))].sort((a,b)=>a-b),PLACES=[...new Set(IT.map(i=>i.pl).filter(Boolean))].sort();
const STATES=['Arizona','Arkansas','California','Colorado','Idaho','Illinois','Iowa','Kansas','Minnesota','Missouri','Montana','Nebraska','Nevada','New Mexico','North Dakota','Oklahoma','Oregon','South Dakota','Texas','Utah','Washington','Wisconsin','Wyoming','Other / outside the U.S.'];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TABS=[['tour','auto_stories','Guided Tour','Six chapters of the Sinclair Story'],['archive','photo_library','The Archive','Search ads, products & photos'],['share','add_a_photo','Share Your Story','Send us your road trip']];
let root,src=()=>'',cur=0,timer=null,last=0,el=0,dur=9000,playing=false,spk=null,spkDone=false,aud=null,narr=localStorage.getItem('galNarr')!=='off',lbList=[],lbI=0,moved=null,home=null,files=[];
const nImg=c=>c.imgs||3,imgId=(c,k)=>k?`gal-${c.id}-${k+1}`:'gal-'+c.id;
const USER=['User Submitted','groups'];const TR=1500;let tr=-1;
const SPEECH='speechSynthesis' in window,narrText=c=>c.t+'. '+c.p,estDur=c=>Math.max(9000,narrText(c).split(/\s+/).length/2.4*1000+1500);
const st={q:'',cols:new Set(),decs:new Set(),place:'',sort:'old'};
const ph=(i,big)=>`<div class="gal-ph c-${i.c}${big?' big':''}" style="--r:${(parseInt(i.id.slice(1))*37)%180}deg" role="img" aria-label="${esc(i.t)} (placeholder image)"><span class="ms">${COLS[i.c][1]}</span><b>${i.y}</b>${big?`<small>${esc(i.t)}</small>`:''}</div>`;
const $=s=>root.querySelector(s),slot=(id,ph)=>`<image-slot id="${id}" shape="rect"${src(id)} placeholder="${esc(ph)}"></image-slot>`;
function mount(el,opt={}){
 root=el;src=opt.src||(()=>'');halt();cur=0;files=[];
 root.innerHTML=`<div class="gal"><div class="gal-tabs" role="tablist" aria-label="Gallery sections">${TABS.map(([k,ic,n,s])=>`<button class="gal-tab" role="tab" id="gt-${k}" aria-controls="gp-${k}" data-tab="${k}"><span class="ms">${ic}</span><span><b>${n}</b><small>${s}</small></span></button>`).join('')}</div>
 <section class="gal-panel" id="gp-tour" role="tabpanel" aria-labelledby="gt-tour">${tourHTML()}</section>
 <section class="gal-panel" id="gp-archive" role="tabpanel" aria-labelledby="gt-archive" hidden>${archHTML()}</section>
 <section class="gal-panel" id="gp-share" role="tabpanel" aria-labelledby="gt-share" hidden>${shareHTML()}</section></div>`;
 if(!document.getElementById('galLb')){const lb=document.createElement('div');lb.className='gal-lb';lb.id='galLb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.innerHTML='<div class="view"><span class="pos"></span><div class="frame"></div><button class="nav prev" aria-label="Previous"><span class="ms">chevron_left</span></button><button class="nav next" aria-label="Next"><span class="ms">chevron_right</span></button><button class="x" aria-label="Close"><span class="ms">close</span></button></div><aside></aside>';document.body.appendChild(lb);wireLb(lb)}
 wire();show(0);render();const go2=sessionStorage.getItem('galOpen');sessionStorage.removeItem('galOpen');if(go2&&byId[go2]){st.cols.add('user');render();tab('archive',false);openLb(go2,visible.map(i=>i.id))}else tab(sessionStorage.getItem('galTab')||'tour',false);
}
function tab(k,scroll=true){if(!TABS.some(t=>t[0]===k))k='tour';sessionStorage.setItem('galTab',k);
 root.querySelectorAll('.gal-tab').forEach(b=>{const on=b.dataset.tab===k;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1});
 root.querySelectorAll('.gal-panel').forEach(p=>p.hidden=p.id!=='gp-'+k);if(k!=='tour')halt();
 if(scroll){const t=$('.gal-tabs').getBoundingClientRect().top+scrollY-90;if(scrollY>t)scrollTo({top:t,behavior:'smooth'})}}
function tourHTML(){return `<div class="gal-tour"><div class="gal-tour-head"><div><h2>The Sinclair Story</h2><p>Press play for a narrated tour, or move through the chapters at your own pace.</p></div><div class="gal-ctrls"><button class="gal-cb narr" data-t="narr" aria-pressed="${narr}" aria-label="Narration" title="Narration on/off"><span class="ms">${narr?'volume_up':'volume_off'}</span></button><button class="gal-cb" data-t="prev" aria-label="Previous chapter"><span class="ms">arrow_back</span></button><button class="gal-cb play" data-t="play"><span class="ms">play_arrow</span><span>Play</span></button><button class="gal-cb" data-t="next" aria-label="Next chapter"><span class="ms">arrow_forward</span></button></div></div>
 <div class="gal-stage">${CH.map((c,i)=>`<article class="gal-ch" aria-hidden="true"><div class="pic">${Array.from({length:nImg(c)},(_,k)=>`<div class="frm${k?'':' on'}">${slot(imgId(c,k),`Chapter ${i+1} · image ${k+1} of ${nImg(c)}`)}</div>`).join('')}${c.yr?`<span class="yr">${c.yr}</span>`:''}${nImg(c)>1?`<div class="dots" role="group" aria-label="Chapter images">${Array.from({length:nImg(c)},(_,k)=>`<button data-img="${k}" class="${k?'':'on'}" aria-label="Image ${k+1}"><i></i></button>`).join('')}</div>`:''}</div><div class="txt"><span class="num">Chapter ${i+1} of ${CH.length}</span><h3>${esc(c.t)}</h3><p>${esc(c.p)}</p><div class="gal-arts"><h4>Artifacts in this chapter</h4>${c.arts.map(a=>{const it=byId[a];return `<div class="gal-art"><span class="ib"><span class="ms">${COLS[it.c][1]}</span></span><span>${esc(it.t)}</span><em>${it.y}</em><span class="pb"><i></i></span></div>`}).join('')}</div>${c.share?`<button class="gal-bridge" data-tabgo="share"><span class="ms">add_a_photo</span>Share your road trip story</button>`:`<button class="gal-bridge" data-era="${i}">Explore the ${c.era.map(d=>d+'s').join(' & ')} in the archive<span class="ms">arrow_forward</span></button>`}</div></article>`).join('')}<div class="gal-trans" aria-hidden="true"><span class="k"></span><b></b><small></small></div></div>
 <div class="gal-rail">${CH.map((c,i)=>`<button class="gal-tick" data-tick="${i}" aria-label="Chapter ${i+1}: ${esc(c.t)}"><span class="bar"><i></i></span><b>${c.rl||c.yr}</b><small>${esc(c.rt||c.t)}</small></button>`).join('')}</div></div>`}
function archHTML(){return `<div class="gal-tools"><div class="gal-row"><label class="gal-search"><span class="ms">search</span><input type="search" data-f="q" placeholder="Search ads, products, places, years…" aria-label="Search the archive"></label><select class="gal-sel" data-f="place" aria-label="Filter by place"><option value="">All places</option>${PLACES.map(p=>`<option>${p}</option>`).join('')}</select><select class="gal-sel" data-f="sort" aria-label="Sort"><option value="old">Oldest first</option><option value="new">Newest first</option></select></div><div class="gal-chips"></div><div class="gal-decs"></div></div>
 <div class="gal-meta"><span class="gal-count"></span><span class="gal-act"></span></div>
 <div class="gal-grid">${IT.map(i=>`<div class="gal-card" data-id="${i.id}"><div class="im" style="aspect-ratio:${1/i.ar}">${ph(i)}<button class="open" data-open="${i.id}" aria-label="Open ${esc(i.t)}"><span class="ms">open_in_full</span></button></div><div class="cap" data-open="${i.id}"><span class="tag">${COLS[i.c][0]}</span><h3>${esc(i.t)}</h3><small>${i.y}${i.pl?' · '+i.pl:''}</small>${i.by?`<span class="comm"><span class="ms">favorite</span>Community story</span>`:''}</div></div>`).join('')}</div>
 <div class="gal-empty" hidden><span class="ms">image_search</span><p>Nothing matches those filters.</p><button class="gal-clear" data-clear>Clear all filters</button></div>`}
function shareHTML(){const comm=IT.filter(i=>i.by);const yrs=[];for(let y=2026;y>=1920;y--)yrs.push(y);
 return `<div class="gal-share"><form class="gal-form" novalidate><div><h2>Share your road trip story</h2><p>Old snapshots, a favorite stop, a DINO statue selfie. Send us your Sinclair memories and they could be featured in the gallery.</p></div>
 <div class="gal-steps"><span><i>1</i>Add photos</span><span><i>2</i>Tell the story</span><span><i>3</i>Submit for review</span></div>
 <div class="gal-f wide"><label>Photos <em>(up to 5 · JPG, PNG or HEIC · 20 MB each)</em></label><label class="gal-drop" tabindex="0"><span class="ms">add_photo_alternate</span><b>Drag photos here or click to browse</b><small>Scans of prints are welcome</small><input type="file" accept="image/*" multiple hidden></label><div class="gal-thumbs"></div><span class="gal-msg" data-m="photos">Add at least one photo.</span></div>
 <div class="gal-fg"><div class="gal-f wide" data-req><label for="gs-title">Give it a title</label><input id="gs-title" name="title" maxlength="80" placeholder="e.g. Our first trip to Yellowstone"><span class="msg">Add a title.</span></div>
 <div class="gal-f"><label for="gs-year">Year <em>(approximate is fine)</em></label><select id="gs-year" name="year"><option value="">Not sure</option>${yrs.map(y=>`<option>${y}</option>`).join('')}</select></div>
 <div class="gal-f"><label for="gs-place">Where was it taken?</label><select id="gs-place" name="place"><option value="">Choose a state</option>${STATES.map(s=>`<option>${s}</option>`).join('')}</select></div>
 <div class="gal-f wide" data-req><label for="gs-story">Your story</label><textarea id="gs-story" name="story" maxlength="600" placeholder="Who’s in the photo? Where were you headed? What do you remember about the stop?"></textarea><span class="cnt">0 / 600</span><span class="msg">Tell us a little about the photo.</span></div>
 <div class="gal-f" data-req><label for="gs-name">Name to display</label><input id="gs-name" name="name" autocomplete="name" placeholder="e.g. Linda R."><span class="msg">Add a display name.</span></div>
 <div class="gal-f" data-req><label for="gs-email">Email <em>(not shown publicly)</em></label><input id="gs-email" name="email" type="email" autocomplete="email" placeholder="you@example.com"><span class="msg">Enter a valid email.</span></div></div>
 <label class="gal-chk" data-chk><input type="checkbox" name="rights"><span>I took these photos or have permission to share them, and I agree to the <a href="#/terms-of-use">submission terms</a>.</span></label>
 <label class="gal-chk"><input type="checkbox" name="news"><span>Email me Sinclair news and offers.</span></label>
 <div class="gal-submit"><button type="submit" class="gal-btn"><span class="ms">send</span>Submit your story</button><small>Our team reviews every submission before it’s published.</small></div></form>
 <aside class="gal-aside"><div class="gal-box"><h3>What we’re looking for</h3><ul><li><span class="ms">directions_car</span>Road trips with a Sinclair stop along the way</li><li><span class="ms">local_gas_station</span>Historic stations, signs and pumps in your town</li><li><span class="ms">pets</span>Photos with DINO statues, toys and giveaways</li><li><span class="ms">inventory_2</span>Vintage cans, maps, stamps and other keepsakes</li></ul></div>
 <div class="gal-box"><h3>Recently featured</h3><div class="gal-feat">${comm.map(i=>`<button data-open="${i.id}" data-list="${comm.map(c=>c.id)}"><span class="im">${slot('gal-feat-'+i.id,i.t)}</span><b>${esc(i.t)}</b><small>${esc(i.by)} · ${i.y}</small></button>`).join('')}</div><button class="more" data-community><span class="ms">arrow_forward</span>See all community stories</button></div>
 <div class="gal-box"><h3>Good to know</h3><ul><li><span class="ms">schedule</span>Reviews usually take 5–10 business days. We’ll email you either way.</li><li><span class="ms">lock</span>We never publish your email, and you can ask us to remove your story at any time.</li></ul></div></aside></div>`}
const chEl=()=>root.querySelectorAll('.gal-ch')[cur];let curImg=0;
function setImg(k,kb){curImg=k;const e=chEl();e.querySelectorAll('.frm').forEach((f,n)=>{f.classList.toggle('on',n===k);if(n!==k&&!kb)f.classList.remove('kb')});e.querySelectorAll('.dots button').forEach((d,n)=>d.classList.toggle('on',n===k));if(kb)startKB()}
function setArt(i,f){chEl().querySelectorAll('.gal-art').forEach((r,k)=>{r.classList.toggle('on',k===i);r.classList.toggle('done',k<i);r.querySelector('.pb i').style.width=k<i?'100%':k===i?f*100+'%':'0'})}
function show(i){cur=(i+CH.length)%CH.length;el=0;root.querySelectorAll('.gal-ch').forEach((e,k)=>{e.classList.toggle('on',k===cur);e.querySelectorAll('.frm').forEach((f,n)=>{f.classList.toggle('on',n===0);f.classList.remove('kb')});e.querySelectorAll('.dots button').forEach((d,n)=>d.classList.toggle('on',n===0));e.setAttribute('aria-hidden',k!==cur)});curImg=0;root.querySelectorAll('.gal-tick').forEach((e,k)=>{e.classList.toggle('on',k===cur);e.classList.toggle('done',k<cur);e.querySelector('i').style.width=k<cur?'100%':'0'});setArt(-1,0)}
function startTr(){tr=0;const n=CH[cur+1],o=root.querySelector('.gal-trans');o.querySelector('.k').textContent=`Chapter ${cur+2} of ${CH.length}`;o.querySelector('b').textContent=n.rl||n.yr;o.querySelector('small').textContent=n.rt||n.t;o.classList.remove('on');void o.offsetWidth;o.classList.add('on')}
function endTr(){tr=-1;root&&root.querySelector('.gal-trans')?.classList.remove('on')}
function go(i){endTr();stopNarr();show(i);if(playing)beginChapter()}
function startKB(){const f=chEl().querySelectorAll('.frm')[curImg];if(!f)return;f.style.setProperty('--kb',dur/nImg(CH[cur])+'ms');f.classList.remove('kb');void f.offsetWidth;f.classList.add('kb')}
function speak(c){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(narrText(c));u.rate=.95;u.onend=()=>{if(spk===u)spkDone=true};u.onerror=()=>{if(spk===u)spk=null};spk=u;speechSynthesis.speak(u)}
function stopNarr(){if(SPEECH)speechSynthesis.cancel();spk=null;spkDone=false;if(aud){aud.onended=aud.onerror=aud.onloadedmetadata=null;aud.pause()}}
function beginChapter(){const c=CH[cur];stopNarr();el=0;dur=estDur(c);
 if(narr&&c.audio){aud=aud||new Audio();aud.onloadedmetadata=()=>{dur=aud.duration*1000;startKB()};aud.onended=()=>spkDone=true;aud.onerror=()=>{aud.onerror=null;if(SPEECH)speak(c);startKB()};aud.src=c.audio;aud.play().catch(()=>{})}
 else{if(narr&&SPEECH)speak(c);startKB()}}
function frame(now){if(!playing||!root.isConnected){halt();return}const dt=now-last;last=now;if(tr>=0){tr+=dt;if(tr>=TR)go(cur+1);timer=requestAnimationFrame(frame);return}el+=dt;
 const c=CH[cur],useAud=narr&&c.audio&&aud&&aud.duration;let p=useAud?aud.currentTime*1000/dur:el/dur;
 if(narr&&(spk||useAud)&&!spkDone)p=Math.min(p,.98);if(spkDone&&el>2000)p=1;p=Math.min(1,p);
 root.querySelector('.gal-tick.on i').style.width=p*100+'%';const n=c.arts.length,ai=Math.min(n-1,Math.floor(p*n));setArt(ai,Math.min(1,p*n-ai));const ni=nImg(c),ii=Math.min(ni-1,Math.floor(p*ni));if(ii!==curImg)setImg(ii,true);
 if(p>=1){if(cur===CH.length-1){stopPlay();stopNarr();el=dur;return}stopNarr();root.querySelector('.gal-tick.on i').style.width='100%';setArt(c.arts.length,0);startTr()}timer=requestAnimationFrame(frame)}
function setPlay(on){const b=root&&root.querySelector('[data-t="play"]');if(b)b.innerHTML=on?'<span class="ms">pause</span><span>Pause</span>':'<span class="ms">play_arrow</span><span>Play</span>';const t=root&&root.querySelector('.gal-tour');if(t){t.classList.toggle('playing',on);t.classList.toggle('paused',!on)}}
function startPlay(){if(playing)return;playing=true;last=performance.now();
 if(tr>=0){}else if(el>0&&el<dur){if(SPEECH&&spk)speechSynthesis.resume();if(aud&&CH[cur].audio&&narr)aud.play().catch(()=>{})}
 else{if(cur===CH.length-1&&el>=dur)show(0);beginChapter()}
 setPlay(true);timer=requestAnimationFrame(frame)}
function stopPlay(){playing=false;cancelAnimationFrame(timer);timer=null;if(SPEECH&&spk)speechSynthesis.pause();if(aud)aud.pause();setPlay(false)}
function halt(){if(!root)return;stopPlay();endTr();stopNarr();if(root.querySelector('.gal-ch'))show(cur);root.querySelector('.gal-tour')?.classList.remove('paused')}
function toggleNarr(b){narr=!narr;localStorage.setItem('galNarr',narr?'on':'off');b.setAttribute('aria-pressed',narr);b.querySelector('.ms').textContent=narr?'volume_up':'volume_off';
 if(playing){if(narr)beginChapter();else stopNarr()}else if(el>0)stopNarr()}
const match=(i,skip)=>{const q=st.q.toLowerCase().trim();return(!q||[i.t,COLS[i.c][0],i.pl,i.y,i.by||''].join(' ').toLowerCase().includes(q))&&(skip==='c'||!st.cols.size||st.cols.has(i.c)||(!!i.by&&st.cols.has('user')))&&(skip==='d'||!st.decs.size||st.decs.has(i.d))&&(!st.place||i.pl===st.place)};
let visible=[];
function render(){
 $('.gal-chips').innerHTML=`<button class="gal-chip${st.cols.size?'':' on'}" data-c="">All</button>`+Object.entries(COLS).map(([k,[n,ic]])=>`<button class="gal-chip${st.cols.has(k)?' on':''}" data-c="${k}" aria-pressed="${st.cols.has(k)}"><span class="ms">${ic}</span>${n} <i>${IT.filter(i=>i.c===k&&match(i,'c')).length}</i></button>`).join('')+`<button class="gal-chip${st.cols.has('user')?' on':''}" data-c="user" aria-pressed="${st.cols.has('user')}"><span class="ms">${USER[1]}</span>${USER[0]} <i>${IT.filter(i=>i.by&&match(i,'c')).length}</i></button>`;
 const mx=Math.max(1,...DECS.map(d=>IT.filter(i=>i.d===d).length)),de=$('.gal-decs');de.style.setProperty('--n',DECS.length);
 de.innerHTML=DECS.map(d=>{const n=IT.filter(i=>i.d===d&&match(i,'d')).length;return `<button class="gal-dec${st.decs.has(d)?' on':''}" data-d="${d}" aria-pressed="${st.decs.has(d)}" title="${n} items"><span class="h"><span style="height:${Math.max(3,n/mx*100)}%"></span></span><b>${String(d).slice(2)}s</b></button>`}).join('');
 visible=IT.filter(i=>match(i)).sort((a,b)=>st.sort==='old'?a.y-b.y:b.y-a.y);
 const g=$('.gal-grid');g.querySelectorAll('.gal-card').forEach(c=>c.hidden=true);visible.forEach(i=>{const c=g.querySelector(`[data-id="${i.id}"]`);c.hidden=false;g.appendChild(c)});
 $('.gal-count').textContent=`${visible.length} of ${IT.length} items`;
 const act=[...[...st.cols].map(c=>['c',c,(COLS[c]||USER)[0]]),...[...st.decs].map(d=>['d',d,d+'s']),...(st.place?[['p','',st.place]]:[]),...(st.q?[['q','','“'+st.q+'”']]:[])];
 $('.gal-act').innerHTML=act.map(([t,v,l])=>`<span class="gal-px">${esc(l)}<button data-rm="${t}" data-v="${v}" aria-label="Remove ${esc(l)}"><span class="ms">close</span></button></span>`).join('')+(act.length?'<button class="gal-clear" data-clear>Clear all</button>':'');
 $('.gal-empty').hidden=!!visible.length}
function reset(){st.q='';st.cols.clear();st.decs.clear();st.place='';$('[data-f="q"]').value='';$('[data-f="place"]').value=''}
function wire(){
 const tabs=$('.gal-tabs');tabs.onclick=e=>{const b=e.target.closest('.gal-tab');if(b)tab(b.dataset.tab)};
 tabs.onkeydown=e=>{if(!/Arrow(Left|Right)/.test(e.key))return;const bs=[...tabs.children],i=bs.indexOf(document.activeElement),n=bs[(i+(e.key==='ArrowRight'?1:-1)+bs.length)%bs.length];n.focus();tab(n.dataset.tab,false)};
 root.addEventListener('click',e=>{const t=e.target.closest('[data-t]');if(t){const a=t.dataset.t;if(a==='narr')toggleNarr(t);else if(a==='play')playing?stopPlay():startPlay();else go(cur+(a==='next'?1:-1));return}
  const im=e.target.closest('[data-img]');if(im){if(playing)stopPlay();setImg(+im.dataset.img,false);return}
  const k=e.target.closest('[data-tick]');if(k){go(+k.dataset.tick);return}
  const o=e.target.closest('[data-open]');if(o){halt();openLb(o.dataset.open,o.dataset.list?o.dataset.list.split(','):visible.map(i=>i.id));return}
  const er=e.target.closest('[data-era]');if(er){halt();reset();CH[+er.dataset.era].era.forEach(d=>DECS.includes(d)&&st.decs.add(d));render();tab('archive');return}
  const tg=e.target.closest('[data-tabgo]');if(tg){tab(tg.dataset.tabgo);return}
  if(e.target.closest('[data-community]')){reset();st.cols.add('user');render();tab('archive');return}
  if(e.target.closest('[data-clear]')){reset();render();return}
  const c=e.target.closest('.gal-chip');if(c){const v=c.dataset.c;if(!v)st.cols.clear();else st.cols.has(v)?st.cols.delete(v):st.cols.add(v);render();return}
  const d=e.target.closest('.gal-dec');if(d){const v=+d.dataset.d;st.decs.has(v)?st.decs.delete(v):st.decs.add(v);render();return}
  const r=e.target.closest('[data-rm]');if(r){const{rm,v}=r.dataset;if(rm==='c')st.cols.delete(v);if(rm==='d')st.decs.delete(+v);if(rm==='p'){st.place='';$('[data-f="place"]').value=''}if(rm==='q'){st.q='';$('[data-f="q"]').value=''}render()}});
 $('[data-f="q"]').oninput=e=>{st.q=e.target.value;render()};$('[data-f="place"]').onchange=e=>{st.place=e.target.value;render()};$('[data-f="sort"]').onchange=e=>{st.sort=e.target.value;render()};
 wireShare()}
function wireShare(){const f=$('.gal-form'),drop=$('.gal-drop'),inp=drop.querySelector('input'),th=$('.gal-thumbs');
 const draw=()=>{th.innerHTML=files.map((x,i)=>`<div class="gal-th"><img src="${x.url}" alt="${esc(x.f.name)}"><button type="button" data-rmf="${i}" aria-label="Remove ${esc(x.f.name)}"><span class="ms">close</span></button></div>`).join('');drop.style.display=files.length>=5?'none':''};
 const add=list=>{[...list].filter(x=>x.type.startsWith('image/')).slice(0,5-files.length).forEach(x=>files.push({f:x,url:URL.createObjectURL(x)}));draw();drop.classList.remove('err');$('[data-m="photos"]').classList.remove('on')};
 inp.onchange=()=>{add(inp.files);inp.value=''};drop.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();inp.click()}};
 ['dragenter','dragover'].forEach(t=>drop.addEventListener(t,e=>{e.preventDefault();drop.classList.add('over')}));['dragleave','drop'].forEach(t=>drop.addEventListener(t,e=>{e.preventDefault();drop.classList.remove('over')}));drop.addEventListener('drop',e=>add(e.dataTransfer.files));
 th.onclick=e=>{const b=e.target.closest('[data-rmf]');if(b){URL.revokeObjectURL(files[+b.dataset.rmf].url);files.splice(+b.dataset.rmf,1);draw()}};
 const ta=f.story,cnt=f.querySelector('.cnt');ta.oninput=()=>cnt.textContent=`${ta.value.length} / 600`;
 f.addEventListener('input',e=>{const g=e.target.closest('.gal-f,.gal-chk');g&&g.classList.remove('err')});
 f.onsubmit=e=>{e.preventDefault();let first=null;const bad=el=>{el.classList.add('err');first=first||el};
  if(!files.length){drop.classList.add('err');$('[data-m="photos"]').classList.add('on');first=drop}
  f.querySelectorAll('[data-req]').forEach(g=>{const i=g.querySelector('input,textarea');if(!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value)))bad(g)});
  if(!f.rights.checked)bad(f.querySelector('[data-chk]'));
  if(first){scrollTo({top:first.getBoundingClientRect().top+scrollY-120,behavior:'smooth'});(first.querySelector&&first.querySelector('input,textarea'))?.focus({preventScroll:true});return}
  const n=files.length;f.innerHTML=`<div class="gal-done" role="status"><span class="ok"><span class="ms">check</span></span><h2>Thanks, ${esc(f.name.value.split(' ')[0])}! Your story is in.</h2><p>We received ${n} photo${n>1?'s':''} for “${esc(f.title.value)}”. Our team reviews every submission, and we’ll email ${esc(f.email.value)} once it’s been reviewed.</p><div class="gal-submit"><button type="button" class="gal-btn" data-again><span class="ms">add_a_photo</span>Share another</button><button type="button" class="gal-btn ghost" data-tabgo="archive">Browse the archive</button></div></div>`;
  f.querySelector('[data-again]').onclick=()=>{files=[];$('#gp-share').innerHTML=shareHTML();wireShare()}}}
function putBack(){if(moved){home.appendChild(moved);moved=null}}
function openLb(id,list){lbList=list.includes(id)?list:[id];lbI=lbList.indexOf(id);const lb=document.getElementById('galLb');lb.classList.add('on');document.body.style.overflow='hidden';drawLb();lb.querySelector('.x').focus()}
function drawLb(){const lb=document.getElementById('galLb');const it=byId[lbList[lbI]];lb.querySelector('.frame').innerHTML=ph(it,true);
 const ch=CH.find(c=>c.id===it.ch),rel=IT.filter(i=>i.id!==it.id&&(i.c===it.c||i.d===it.d)).slice(0,3);
 lb.querySelector('.pos').textContent=`${lbI+1} / ${lbList.length}`;lb.querySelectorAll('.nav').forEach(n=>n.style.visibility=lbList.length>1?'visible':'hidden');
 lb.querySelector('aside').innerHTML=`<span class="tag">${it.by?'Community story':COLS[it.c][0]}</span><h3>${esc(it.t)}</h3><p>${it.by?'Story placeholder: the submitter’s own words about the photo, lightly edited for length.':'Caption placeholder: two or three sentences on what this is, where and when it was made, and why it matters to the Sinclair story.'}</p><dl><dt>Date</dt><dd>${it.y}</dd><dt>Place</dt><dd>${it.pl||'—'}</dd><dt>Collection</dt><dd>${COLS[it.c][0]}</dd><dt>Source</dt><dd>${it.by?esc(it.by):'Sinclair corporate archive'}</dd><dt>Rights</dt><dd>${it.by?'Shared with permission of the submitter.':'© Sinclair. Do not reproduce without permission.'}</dd></dl>${ch?`<div class="story"><small>Part of the guided tour</small><button data-ch="${CH.indexOf(ch)}"><span class="ms">auto_stories</span>Chapter ${CH.indexOf(ch)+1}: ${esc(ch.t)}</button></div>`:''}${it.by?`<div class="story"><small>Have one like it?</small><button data-tabgo="share"><span class="ms">add_a_photo</span>Share your road trip story</button></div>`:''}<div class="rel"><h4>Related</h4>${rel.map(r=>`<button data-rel="${r.id}"><span>${esc(r.t)}</span><em>${r.y}</em></button>`).join('')}</div><div class="acts"><button><span class="ms">share</span>Share</button>${it.by?'':'<button><span class="ms">download</span>Download</button>'}</div>`}
function stepLb(d){lbI=(lbI+d+lbList.length)%lbList.length;drawLb()}
function closeLb(){putBack();document.getElementById('galLb').classList.remove('on');document.body.style.overflow=''}
function wireLb(lb){lb.querySelector('.x').onclick=closeLb;lb.querySelector('.prev').onclick=()=>stepLb(-1);lb.querySelector('.next').onclick=()=>stepLb(1);
 lb.querySelector('.view').onclick=e=>{if(e.target.classList.contains('view'))closeLb()};
 lb.querySelector('aside').onclick=e=>{const c=e.target.closest('[data-ch]');if(c){closeLb();tab('tour');go(+c.dataset.ch);return}const t=e.target.closest('[data-tabgo]');if(t){closeLb();tab(t.dataset.tabgo);return}const r=e.target.closest('[data-rel]');if(r){lbList=[r.dataset.rel];lbI=0;drawLb()}};
 document.addEventListener('keydown',e=>{if(lb.classList.contains('on')){if(e.key==='Escape'){e.stopPropagation();closeLb()}if(e.key==='ArrowRight')stepLb(1);if(e.key==='ArrowLeft')stepLb(-1);return}
  if(!root||!root.isConnected)return;const p=root.querySelector('#gp-tour');if(p.hidden||/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)||document.activeElement.closest('.gal-tabs'))return;if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)},true);
 addEventListener('hashchange',()=>{if(lb.classList.contains('on'))closeLb();halt()})}
window.HFSGallery={mount,featured:()=>IT.filter(i=>i.by).map(i=>({id:i.id,t:i.t,by:i.by,y:i.y,pl:i.pl}))};
})();
