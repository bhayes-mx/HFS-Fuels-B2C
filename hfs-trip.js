(function(){
const DET=[[.3,'0 mi'],[2,'<2 mi'],[5,'5 mi'],[10,'10 mi']],MAXW=8;
const ATTR={attraction:'Attraction',museum:'Museum',viewpoint:'Scenic viewpoint',zoo:'Zoo',theme_park:'Theme park',gallery:'Gallery',monument:'Monument',memorial:'Memorial',ruins:'Historic ruins',castle:'Historic site',national_park:'National park'};
const KIND={user:['place','Your stop'],stn:['local_gas_station','Sinclair station'],poi:['attractions','Attraction']};
function fmtDur(s){const h=Math.floor(s/3600),m=Math.round(s%3600/60);return h?`${h} h ${m} min`:`${m} min`}
async function osrm(pts){const u='https://router.project-osrm.org/route/v1/driving/'+pts.map(p=>p[1]+','+p[0]).join(';')+'?overview=full&geometries=geojson';
 try{const r=await fetch(u);const j=await r.json();if(!j.routes||!j.routes.length)throw 0;const R=j.routes[0];return{coords:R.geometry.coordinates.map(c=>[c[1],c[0]]),dist:R.distance/1609.34,dur:R.duration,approx:false}}
 catch(e){const c=[];for(let k=0;k<pts.length-1;k++)for(let i=0;i<=40;i++){const t=i/40;c.push([pts[k][0]+(pts[k+1][0]-pts[k][0])*t,pts[k][1]+(pts[k+1][1]-pts[k][1])*t])}return{coords:c,dist:0,dur:0,approx:true}}}
function mount(el){if(!el||!window.L||!window.HFSLocator)return;const {geocode,reverse,miles,rng,AMEN,FUELS,STREETS,esc}=HFSLocator.util;
 const st={pts:[],me:null,det:5,am:new Set(),fu:new Set(),dino:false,extra:[],sel:null,attr:[],route:null,base:null,total:0,dur:0,stations:[],order:[],prev:null};let uidN=0;
 const chip=(k,v)=>`<button type="button" class="tp-chip" data-k="${k}" data-v="${esc(v)}" aria-pressed="false">${esc(v)}</button>`;
 el.className='tp';
 el.innerHTML=`<aside class="tp-side"><form class="tp-form"><div class="tp-pts"><label class="tp-pt"><span class="tp-dot a" aria-hidden="true"></span><input name="from" placeholder="Starting point" aria-label="Starting point" autocomplete="off"><button type="button" class="tp-ib tp-me" aria-label="Use my location" title="Use my location"><span class="ms">my_location</span></button></label><div class="tp-wps"></div><label class="tp-pt"><span class="tp-dot b" aria-hidden="true"></span><input name="to" placeholder="Destination" aria-label="Destination" autocomplete="off"></label><button type="button" class="tp-swap" aria-label="Reverse trip" title="Reverse trip"><span class="ms">swap_vert</span></button></div><button type="button" class="tp-add"><span class="ms">add_circle</span>Add a stop</button><p class="tp-hint">Addresses, ZIP codes or places like “Arches National Park”.</p><button type="submit" class="tp-go"><span class="ms">route</span>Plan my route</button><button type="button" class="tp-ex">Try Salt Lake City to Denver</button></form>
<div class="tp-sec"><h4>Max detour from route</h4><div class="tp-seg" role="radiogroup" aria-label="Max detour">${DET.map(([v,l])=>`<button type="button" role="radio" data-d="${v}" aria-checked="${v===5}">${l}</button>`).join('')}</div></div>
<div class="tp-sec"><h4>Filter stations<button type="button" class="tp-clr" hidden>Clear</button></h4><button type="button" class="tp-chip tp-dino" aria-pressed="false"><span class="ms">pets</span>DINO statue stops only</button><details class="tp-f"><summary>Fuel type<span class="tp-n" data-k="fu"></span><span class="ms">expand_more</span></summary><div class="tp-chips">${FUELS.filter(f=>f!=='Regular').map(f=>chip('fu',f)).join('')}</div></details><details class="tp-f"><summary>Amenities<span class="tp-n" data-k="am"></span><span class="ms">expand_more</span></summary><div class="tp-chips">${AMEN.map(a=>chip('am',a)).join('')}</div></details></div>
<div class="tp-sec tp-stops" hidden><h4>Your stops</h4><ol class="tp-itin"></ol><p class="tp-mut tp-sh">Add Sinclair stations or nearby attractions from the map and they’ll slot into your trip in order.</p><div class="tp-send"><h5>Send route to</h5><div class="tp-apps"><a data-app="g" target="_blank" rel="noopener" title="Open in Google Maps"><img src="https://www.google.com/s2/favicons?sz=128&domain=maps.google.com" alt=""><span>Google Maps</span></a><a data-app="a" target="_blank" rel="noopener" title="Open in Apple Maps"><img src="https://www.google.com/s2/favicons?sz=128&domain=maps.apple.com" alt=""><span>Apple Maps</span></a><a data-app="w" target="_blank" rel="noopener" title="Open in Waze"><img src="https://www.google.com/s2/favicons?sz=128&domain=waze.com" alt=""><span>Waze</span></a></div><p class="tp-wz" hidden></p></div></div></aside>
<div class="tp-main"><div class="tp-bar"><div class="tp-sum">Enter a start and destination to see Sinclair stations along the way.</div><button type="button" class="tp-vl" hidden><span class="ms">format_list_bulleted</span><span class="tp-vt">View itinerary</span></button></div><div class="tp-stage"><div class="tp-map"></div><div class="tp-list"></div><div class="tp-card" hidden></div></div><p class="loc-note">Prototype: routing by OSRM and map tiles © Esri stand in for Google Maps; stations are sample data; nearby attractions from OpenStreetMap.</p></div>`;
 const q=s=>el.querySelector(s),form=q('.tp-form'),fi=form.from,ti=form.to,wps=q('.tp-wps'),sum=q('.tp-sum'),list=q('.tp-list'),card=q('.tp-card'),vl=q('.tp-vl');
 const dark=document.body.classList.contains('dark');
 const map=L.map(q('.tp-map'),{zoomControl:true,scrollWheelZoom:false}).setView([40.5,-108],5);
 L.tileLayer(dark?'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}':'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:dark?16:19,attribution:'Tiles © Esri, HERE, Garmin, © OpenStreetMap contributors'}).addTo(map);
 const rLayer=L.layerGroup().addTo(map),sLayer=L.layerGroup().addTo(map),aLayer=L.layerGroup().addTo(map);
 function setView(v){el.classList.toggle('list',v==='list');vl.querySelector('.ms').textContent=v==='list'?'map':'format_list_bulleted';vl.querySelector('.tp-vt').textContent=v==='list'?'Back to map':'View itinerary';if(v==='map')setTimeout(()=>map.invalidateSize(),0)}
 vl.onclick=()=>setView(el.classList.contains('list')?'map':'list');
 const err=t=>{sum.className='tp-sum err';sum.textContent=t};
 // waypoint inputs
 function addWp(v){if(wps.children.length>=MAXW)return;const r=document.createElement('label');r.className='tp-pt tp-wp';r.dataset.uid=++uidN;r.innerHTML=`<span class="tp-dot w" aria-hidden="true"></span><input name="wp" placeholder="Add a stop" aria-label="Stop" autocomplete="off"><button type="button" class="tp-ib tp-rm" aria-label="Remove stop" title="Remove stop"><span class="ms">close</span></button>`;r.querySelector('input').value=v||'';wps.appendChild(r);syncAdd();return r}
 const syncAdd=()=>{q('.tp-add').hidden=wps.children.length>=MAXW};
 q('.tp-add').onclick=()=>addWp().querySelector('input').focus();
 wps.addEventListener('click',e=>{const b=e.target.closest('.tp-rm');if(!b)return;e.preventDefault();b.parentElement.remove();syncAdd();if(st.route)form.requestSubmit()});
 const inputs=()=>[fi,...wps.querySelectorAll('input'),ti];
 // geometry
 const T=()=>st.base.cum[st.base.cum.length-1];
 function nearIdx(ll,from){const c=st.base.coords;let bi=from||0,bd=1e9;for(let i=from||0;i<c.length;i++){const d=Math.abs(c[i][0]-ll[0])+Math.abs(c[i][1]-ll[1])*Math.cos(ll[0]*Math.PI/180);if(d<bd){bd=d;bi=i}}return bi}
 const mileAt=i=>st.base.cum[i]*(st.base.total/T());
 function setBase(r){const c=r.coords,cum=[0];for(let i=1;i<c.length;i++)cum.push(cum[i-1]+miles(c[i-1],c[i]));const total=r.dist||cum[cum.length-1]*1.08;st.base={coords:c,cum,total,dur:r.dur||total/58*3600};st.route=r;st.total=total;st.dur=st.base.dur}
 function gen(){const c=st.base.coords,cum=st.base.cum,TT=T(),A=st.pts[0].ll,B=st.pts[st.pts.length-1].ll,R=rng(Math.round(A[0]*100)*31+Math.round(B[1]*100)*17+st.pts.length),out=[];let m=4+R()*12,i=1,n=0;
  while(m<TT-2){while(i<cum.length-1&&cum[i]<m)i++;const a=c[i-1],b=c[i],t=(m-cum[i-1])/Math.max(cum[i]-cum[i-1],1e-6),p=[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
   const k=Math.cos(p[0]*Math.PI/180),dx=(b[1]-a[1])*k,dy=b[0]-a[0],ln=Math.hypot(dx,dy)||1,off=R()<.3?.05+R()*.25:.3+Math.pow(R(),1.6)*9.7,sd=R()<.5?-1:1;
   const ll=[p[0]+sd*(dx/ln)*off/69,p[1]-sd*(dy/ln)*off/(69*k)];
   const am=AMEN.filter(()=>R()<.42);if(!am.length)am.push('Convenience Store');const fu=FUELS.filter((f,j)=>j===0||R()<(j<3?.8:.4));
   out.push({id:'t'+(n++),name:'Sinclair #'+(1000+Math.floor(R()*9000)),addr:(100+Math.floor(R()*9800))+' '+STREETS[Math.floor(R()*STREETS.length)],mi:m*(st.base.total/TT),off,ll,am,fu,dino:R()<.22,hours:am.includes('Open 24/7')?'Open 24 hours':'Open 6 AM – 11 PM'});
   m+=6+R()*20}
  st.stations=out}
 // user stops + added stops, in route order
 function userItems(){let from=0;return st.pts.slice(1,-1).map((p,i)=>{const ix=nearIdx(p.ll,from);from=ix;return{id:'u'+p.uid,kind:'user',name:p.label,q:p.q,me:p.me,ll:p.ll,mi:mileAt(ix)}})}
 function items(){const all=[...userItems(),...st.extra],by=Object.fromEntries(all.map(x=>[x.id,x]));const out=st.order.filter(id=>by[id]).map(id=>by[id]);all.filter(x=>!out.includes(x)).sort((a,b)=>a.mi-b.mi).forEach(x=>{const i=out.findIndex(y=>y.mi>x.mi);out.splice(i<0?out.length:i,0,x)});st.order=out.map(x=>x.id);return out}
 function syncWpDom(){const rows=[...wps.children],u=st.order.filter(id=>id[0]==='u').map(id=>id.slice(1));u.forEach(x=>{const r=rows.find(r=>r.dataset.uid===x);if(r)wps.appendChild(r)});rows.filter(r=>!u.includes(r.dataset.uid)).forEach(r=>wps.appendChild(r))}
 function moveTo(ids){if(ids.join()===st.order.join())return;st.order=ids;syncWpDom();return reroute()}
 const pass=s=>s.off<=st.det&&[...st.am].every(a=>s.am.includes(a))&&[...st.fu].every(f=>s.fu.includes(f))&&(!st.dino||s.dino);
 const isStop=id=>st.extra.some(x=>x.id===id);
 const eta=mi=>fmtDur(st.base.dur*(mi/st.base.total));
 const offTxt=s=>s.off<=.3?'On route':s.off.toFixed(1)+' mi off route';
 const detTxt=()=>st.det<=.3?'right on your route':st.det===2?'within 2 mi of your route':`within ${st.det} mi of your route`;
 const call=(s,on)=>L.divIcon({className:'tp-ci',html:`<div class="tp-call${on?' on':''}${isStop(s.id)?' stop':''}${s.dino?' dn':''}"><span class="ms">${isStop(s.id)?'flag':s.dino?'pets':'local_gas_station'}</span>${Math.round(s.mi)}<small>mi</small></div>`,iconSize:[0,0]});
 const dot=(ch,cls)=>L.divIcon({className:'',html:`<div class="tp-end ${cls}">${ch}</div>`,iconSize:[26,26],iconAnchor:[13,13]});
 function draw(fit){if(!st.route)return;rLayer.clearLayers();sLayer.clearLayers();
  L.polyline(st.route.coords,{color:'#fff',weight:9,opacity:.9}).addTo(rLayer);L.polyline(st.route.coords,{color:getComputedStyle(el).getPropertyValue('--p').trim()||'#008445',weight:5}).addTo(rLayer);
  const P=st.pts,it=items();
  L.marker(P[0].ll,{icon:dot('A','a'),zIndexOffset:900,interactive:false}).addTo(rLayer);L.marker(P[P.length-1].ll,{icon:dot('B','b'),zIndexOffset:900,interactive:false}).addTo(rLayer);
  it.forEach((x,i)=>{if(x.kind==='user')L.marker(x.ll,{icon:dot(i+1,'w'),zIndexOffset:880}).bindTooltip(esc(x.name)).addTo(rLayer);else if(x.kind==='poi')L.marker(x.ll,{icon:L.divIcon({className:'',html:`<div class="tp-poi stop"><span class="ms">attractions</span></div>`,iconSize:[26,26],iconAnchor:[13,13]}),zIndexOffset:870}).bindTooltip(esc(x.name)).addTo(rLayer)});
  const res=st.stations.filter(s=>pass(s)||isStop(s.id));
  res.forEach(s=>{const m=L.marker(s.ll,{icon:call(s,st.sel===s.id),zIndexOffset:st.sel===s.id?1000:isStop(s.id)?500:0}).addTo(sLayer);m.on('click',()=>open(s.id))});
  if(fit)map.fitBounds(L.latLngBounds(st.route.coords).pad(.06));
  const n=res.length;sum.className='tp-sum';sum.innerHTML=`<b>${Math.round(st.total)} mi</b> · ${fmtDur(st.dur)}${it.length?` · ${it.length} stop${it.length>1?'s':''}`:''} · <b>${n} Sinclair station${n===1?'':'s'}</b> ${detTxt()}${st.route.approx?' <span class="tp-ap">(approximate route)</span>':''}`;
  vl.hidden=false;renderList(res,it);renderStops(it);renderSend(it);syncChips()}
 const tags=s=>[...s.fu.filter(f=>f!=='Regular'),...s.am,...(s.dino?['DINO statue']:[])].map(a=>`<span>${esc(a)}</span>`).join('');
 function renderList(res,it){const P=st.pts,rows=[],ev=[...res.map(s=>({t:'s',mi:s.mi,s})),...it.filter(x=>x.kind!=='stn').map((x)=>({t:'x',mi:x.mi,x,n:it.indexOf(x)+1}))].sort((a,b)=>a.mi-b.mi);let prev=0;
  const gap=mi=>{const g=mi-prev;prev=mi;return`<div class="tp-gap"><span class="ms">more_vert</span>${Math.round(g)} mi${g>60?' <em>· long stretch</em>':''}</div>`};
  rows.push(`<div class="tp-ep"><span class="tp-end a">A</span><div><b>${esc(P[0].label)}</b><small>Start</small></div></div>`);
  ev.forEach(e=>{rows.push(gap(e.mi));if(e.t==='x'){const x=e.x;rows.push(`<div class="tp-ep">${x.kind==='user'?`<span class="tp-end w">${e.n}</span>`:'<span class="tp-poi stop"><span class="ms">attractions</span></span>'}<div><b>${esc(x.name)}</b><small>${x.kind==='user'?'Your stop':esc(x.sub||'Attraction')} · mile ${Math.round(x.mi)}</small></div></div>`);return}
   const s=e.s;rows.push(`<article class="tp-row${isStop(s.id)?' stop':''}"><div class="tp-mi"><b>${Math.round(s.mi)}</b><small>mile</small></div><div class="tp-rb"><h3>${esc(s.name)}${isStop(s.id)?'<span class="tp-badge">Stop</span>':''}</h3><div class="addr">${esc(s.addr)} · ${offTxt(s)} · about ${eta(s.mi)} in</div><div class="loc-tags">${tags(s)}</div><div class="tp-ra"><button type="button" class="tp-b2" data-open="${s.id}"><span class="ms">info</span>Details</button><button type="button" class="tp-b2" data-stop="${s.id}"><span class="ms">${isStop(s.id)?'remove':'add'}</span>${isStop(s.id)?'Remove stop':'Add as stop'}</button></div></div></article>`)});
  if(!res.length)rows.push(`<div class="loc-empty">No stations ${detTxt()} match these filters. Try a wider detour or fewer filters.</div>`);
  rows.push(gap(st.base.total)+`<div class="tp-ep"><span class="tp-end b">B</span><div><b>${esc(P[P.length-1].label)}</b><small>Destination · ${Math.round(st.total)} mi · ${fmtDur(st.dur)}</small></div></div>`);
  list.innerHTML=rows.join('')}
 function renderStops(it){const P=st.pts,box=q('.tp-stops');box.hidden=false;
  box.querySelector('.tp-itin').innerHTML=`<li><span class="tp-end a">A</span><div class="tp-sl"><b>${esc(P[0].label)}</b><small>Start</small></div></li>`+it.map((x,i)=>`<li class="k-${x.kind}" data-id="${x.id}"><button type="button" class="tp-drag" data-drag="${x.id}" aria-label="Reorder ${esc(x.name)}. Drag, or use the up and down arrow keys." title="Drag to reorder"><span class="ms">drag_indicator</span></button><span class="tp-sn"><span class="ms">${KIND[x.kind][0]}</span></span><button type="button" class="tp-sl"${x.kind==='stn'?` data-open="${x.id}"`:` data-pan="${x.ll.join(',')}"`}><b>${esc(x.name)}</b><small>${x.kind==='poi'?esc(x.sub||'Attraction'):KIND[x.kind][1]} · mile ${Math.round(x.mi)}${x.off!=null?' · '+offTxt(x):''}</small></button><button type="button" class="tp-x" data-rm="${x.id}" aria-label="Remove ${esc(x.name)}"><span class="ms">close</span></button></li>`).join('')+`<li><span class="tp-end b">B</span><div class="tp-sl"><b>${esc(P[P.length-1].label)}</b><small>Destination · ${Math.round(st.total)} mi · ${fmtDur(st.dur)}</small></div></li>`;
  q('.tp-sh').hidden=st.extra.length>0}
 const ptxt=p=>p.me?p.ll.map(x=>x.toFixed(5)).join(','):p.q;
 function renderSend(it){const P=st.pts,o=ptxt(P[0]),d=ptxt(P[P.length-1]),w=it.map(x=>x.kind==='user'?ptxt(x):x.ll.map(v=>v.toFixed(5)).join(','));
  q('[data-app=g]').href='https://www.google.com/maps/dir/?api=1&travelmode=driving&origin='+encodeURIComponent(o)+'&destination='+encodeURIComponent(d)+(w.length?'&waypoints='+encodeURIComponent(w.join('|')):'');
  q('[data-app=a]').href='https://maps.apple.com/?dirflg=d&saddr='+encodeURIComponent(o)+'&daddr='+[...w,d].map(encodeURIComponent).join('+to:');
  const f=it[0]?it[0].ll:P[P.length-1].ll;q('[data-app=w]').href='https://waze.com/ul?navigate=yes&ll='+f[0].toFixed(5)+','+f[1].toFixed(5);
  const wz=q('.tp-wz');const notes=[];if(it.length)notes.push('Waze takes one destination at a time, so it opens to your first stop.');if(w.length>9)notes.push('Google Maps uses up to 9 stops; the rest are dropped.');wz.hidden=!notes.length;wz.textContent=notes.join(' ')}
 function syncChips(){el.querySelectorAll('.tp-n').forEach(n=>{const c=st[n.dataset.k].size;n.textContent=c?c:''});q('.tp-clr').hidden=!(st.am.size||st.fu.size||st.dino)}
 // details + attractions
 const aCache={};
 async function attractions(s){if(aCache[s.id])return aCache[s.id];const [la,ln]=s.ll,r=12000;
  const qy=`[out:json][timeout:12];(nwr(around:${r},${la},${ln})["tourism"~"^(attraction|museum|viewpoint|zoo|theme_park|gallery)$"]["name"];nwr(around:${r},${la},${ln})["historic"~"^(monument|memorial|ruins|castle)$"]["name"];nwr(around:${r},${la},${ln})["boundary"="national_park"]["name"];);out center 40;`;
  const j=await (await fetch('https://overpass-api.de/api/interpreter?data='+encodeURIComponent(qy))).json();const seen=new Set();
  return aCache[s.id]=(j.elements||[]).map(e=>{const ll=e.lat!=null?[e.lat,e.lon]:e.center?[e.center.lat,e.center.lon]:null;const t=e.tags||{};return ll&&{id:'p'+ll[0].toFixed(4)+'_'+ll[1].toFixed(4),n:t.name,ll,t:ATTR[t.tourism]||ATTR[t.historic]||ATTR[t.boundary]||'Point of interest',d:miles(s.ll,ll)}}).filter(a=>a&&!seen.has(a.n)&&seen.add(a.n)).sort((a,b)=>a.d-b.d).slice(0,6)}
 const stopBtn=id=>`<span class="ms">${isStop(id)?'remove':'add_location'}</span>${isStop(id)?'Remove stop':'Add as stop'}`;
 function renderAttr(){const box=card.querySelector('.tp-al');if(!box)return;const A=st.attr;
  box.innerHTML=A.length?A.map((a,i)=>`<div class="tp-ai"><button type="button" class="tp-aip" data-a="${i}"><span class="ms">attractions</span><span><b>${esc(a.n)}</b><small>${esc(a.t)} · ${a.d.toFixed(1)} mi from station</small></span></button><button type="button" class="tp-aadd${isStop(a.id)?' on':''}" data-addpoi="${i}" aria-label="${isStop(a.id)?'Remove':'Add'} ${esc(a.n)} ${isStop(a.id)?'from':'to'} your stops"><span class="ms">${isStop(a.id)?'check':'add'}</span>${isStop(a.id)?'Added':'Add'}</button></div>`).join(''):'<p class="tp-mut">No listed attractions within about 7 miles.</p>'}
 async function open(id){const s=st.stations.find(x=>x.id===id);if(!s)return;if(!st.prev&&!el.classList.contains('list'))st.prev={c:map.getCenter(),z:map.getZoom()};st.sel=id;st.attr=[];draw(false);aLayer.clearLayers();
  if(!el.classList.contains('list'))map.setView(s.ll,Math.max(map.getZoom(),11));
  card.hidden=false;card.innerHTML=`<button type="button" class="tp-cx" aria-label="Close details"><span class="ms">close</span></button><span class="tp-k">Mile ${Math.round(s.mi)} · ${offTxt(s)}</span><h3>${esc(s.name)}</h3><div class="addr">${esc(s.addr)}<span class="tp-city"></span><br>${esc(s.hours)} · about ${eta(s.mi)} from start</div><div class="loc-tags">${[...s.fu,...s.am,...(s.dino?['DINO statue']:[])].map(a=>`<span>${esc(a)}</span>`).join('')}</div><div class="tp-ca"><button type="button" class="tp-b1" data-stop="${s.id}">${stopBtn(s.id)}</button><a class="tp-b2" href="https://www.google.com/maps/dir/?api=1&destination=${s.ll[0]},${s.ll[1]}" target="_blank" rel="noopener"><span class="ms">directions</span>Directions</a></div><div class="tp-at"><h4>Nearby attractions</h4><div class="tp-al"><p class="tp-mut">Looking for things to see nearby…</p></div></div>`;
  card.querySelector('.tp-cx').onclick=close;
  reverse(s.ll).then(a=>{const c=card.querySelector('.tp-city');if(c&&st.sel===id&&a&&a.city)c.textContent=', '+[a.city,a.state].filter(Boolean).join(', ')}).catch(()=>{});
  try{const A=await attractions(s);if(st.sel!==id)return;st.attr=A;renderAttr();
   A.forEach(a=>L.marker(a.ll,{icon:L.divIcon({className:'',html:'<div class="tp-poi"><span class="ms">attractions</span></div>',iconSize:[24,24],iconAnchor:[12,12]})}).bindTooltip(esc(a.n)).addTo(aLayer));
   if(A.length&&!el.classList.contains('list'))map.fitBounds(L.latLngBounds([s.ll,...A.map(a=>a.ll)]).pad(.25),{maxZoom:13})}
  catch(e){if(st.sel===id)card.querySelector('.tp-al').innerHTML='<p class="tp-mut">Nearby attractions are unavailable right now.</p>'}}
 function close(){st.sel=null;st.attr=[];card.hidden=true;aLayer.clearLayers();draw(false);if(st.prev){if(!el.classList.contains('list'))map.setView(st.prev.c,st.prev.z);st.prev=null}}
 async function reroute(){const it=items(),P=st.pts;const r=await osrm([P[0].ll,...it.map(x=>x.ll),P[P.length-1].ll]);st.route=r.approx?{...st.base,coords:r.coords,approx:true}:r;if(!r.approx){st.total=r.dist;st.dur=r.dur}draw(false)}
 function toggleExtra(x){st.extra=isStop(x.id)?st.extra.filter(e=>e.id!==x.id):[...st.extra,x];return reroute()}
 el.addEventListener('click',async e=>{const t=e.target.closest('[data-stop]'),o=e.target.closest('[data-open]'),rm=e.target.closest('[data-rm]'),pa=e.target.closest('[data-pan]'),ap=e.target.closest('[data-addpoi]'),ai=e.target.closest('.tp-aip');
  if(t){const s=st.stations.find(x=>x.id===t.dataset.stop);if(!s)return;await toggleExtra({id:s.id,kind:'stn',name:s.name,ll:s.ll,mi:s.mi,off:s.off});if(st.sel===s.id){if(isStop(s.id))close();else{const b=card.querySelector('.tp-ca [data-stop]');if(b)b.innerHTML=stopBtn(s.id)}}return}
  if(ap){const a=st.attr[+ap.dataset.addpoi];if(!a)return;await toggleExtra({id:a.id,kind:'poi',name:a.n,sub:a.t,ll:a.ll,mi:mileAt(nearIdx(a.ll))});renderAttr();return}
  if(ai){const a=st.attr[+ai.dataset.a];if(a){setView('map');map.setView(a.ll,13)}return}
  if(rm){const id=rm.dataset.rm;if(id[0]==='u'){const r=wps.querySelector(`[data-uid="${id.slice(1)}"]`);if(r){r.remove();syncAdd();form.requestSubmit()}}else{st.extra=st.extra.filter(x=>x.id!==id);await reroute();if(st.sel)renderAttr()}return}
  if(pa){setView('map');map.setView(pa.dataset.pan.split(',').map(Number),13);return}
  if(o)open(o.dataset.open)});
 const itin=q('.tp-itin'),domIds=()=>[...itin.querySelectorAll('li[data-id]')].map(l=>l.dataset.id);
 itin.addEventListener('pointerdown',e=>{const h=e.target.closest('.tp-drag');if(!h)return;e.preventDefault();const li=h.closest('li');li.classList.add('drag');h.setPointerCapture(e.pointerId);
  const mv=ev=>{const y=ev.clientY,sibs=[...itin.querySelectorAll('li[data-id]')].filter(x=>x!==li);for(const s of sibs){const r=s.getBoundingClientRect();if(y<r.top+r.height/2){if(li.nextElementSibling!==s)itin.insertBefore(li,s);return}}const last=sibs[sibs.length-1];if(last&&last.nextElementSibling!==li)last.after(li)};
  const up=()=>{h.removeEventListener('pointermove',mv);h.removeEventListener('pointerup',up);h.removeEventListener('pointercancel',up);li.classList.remove('drag');moveTo(domIds())};
  h.addEventListener('pointermove',mv);h.addEventListener('pointerup',up);h.addEventListener('pointercancel',up)});
 itin.addEventListener('keydown',async e=>{const h=e.target.closest('.tp-drag');if(!h||(e.key!=='ArrowUp'&&e.key!=='ArrowDown'))return;e.preventDefault();const ids=domIds(),id=h.dataset.drag,i=ids.indexOf(id),k=i+(e.key==='ArrowUp'?-1:1);if(k<0||k>=ids.length)return;ids.splice(i,1);ids.splice(k,0,id);await moveTo(ids);const n=itin.querySelector(`[data-drag="${id}"]`);n&&n.focus()});
 // planning
 const G={};
 async function geo(v){if(v==='My location'&&st.me)return st.me;if(G[v])return G[v];const g=await geocode(v);if(g)G[v]={q:v,ll:g.ll,label:g.label||v};return G[v]}
 form.onsubmit=async e=>{e.preventDefault();if(!fi.value.trim())return fi.focus();if(!ti.value.trim())return ti.focus();
  [...wps.children].forEach(r=>{if(!r.querySelector('input').value.trim())r.remove()});syncAdd();
  sum.className='tp-sum';sum.textContent='Planning your route…';
  try{const P=[];for(const inp of inputs()){const v=inp.value.trim(),g=await geo(v);if(!g)return err(`We couldn't find “${v}”. Try a ZIP code, city or full address.`);const w=inp.closest('.tp-wp');P.push({...g,uid:w?w.dataset.uid:null})}
   st.pts=P;st.extra=[];st.order=[];st.prev=null;st.sel=null;st.attr=[];card.hidden=true;aLayer.clearLayers();setBase(await osrm(P.map(p=>p.ll)));gen();el.classList.add('has');draw(true)}catch(x){err('Route planning is unavailable right now. Please try again.')}};
 q('.tp-me').onclick=()=>{if(!navigator.geolocation)return err('Your browser does not support location sharing.');sum.className='tp-sum';sum.textContent='Finding your location…';
  navigator.geolocation.getCurrentPosition(p=>{st.me={me:true,q:'My location',ll:[p.coords.latitude,p.coords.longitude],label:'My location'};fi.value='My location';sum.textContent='Starting from your location. Now add a destination.';ti.focus()},()=>err('We couldn’t get your location. Check your browser permissions or type a starting point.'),{timeout:10000})};
 q('.tp-swap').onclick=()=>{const I=inputs(),v=I.map(i=>i.value).reverse();I.forEach((i,k)=>i.value=v[k]);if(st.route)form.requestSubmit()};
 q('.tp-ex').onclick=()=>{fi.value='Salt Lake City, UT';ti.value='Denver, CO';form.requestSubmit()};
 el.querySelectorAll('.tp-seg button').forEach(b=>b.onclick=()=>{st.det=+b.dataset.d;el.querySelectorAll('.tp-seg button').forEach(x=>x.setAttribute('aria-checked',x===b));draw(false)});
 el.querySelectorAll('.tp-chip').forEach(b=>b.onclick=()=>{const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);if(b.classList.contains('tp-dino'))st.dino=on;else st[b.dataset.k][on?'add':'delete'](b.dataset.v);syncChips();draw(false)});
 q('.tp-clr').onclick=()=>{st.am.clear();st.fu.clear();st.dino=false;el.querySelectorAll('.tp-chip').forEach(b=>b.setAttribute('aria-pressed','false'));syncChips();draw(false)};
}
window.HFSTrip={mount};
})();
