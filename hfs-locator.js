(function(){
const AMEN=['Car Wash','Open 24/7','Convenience Store','EV Charging','Truck Parking','Hot Food','Fresh Coffee','Restrooms'];
const FUELS=['Regular','Mid-Grade','Premium','Diesel','E15','E85','Ethanol-Free'];
const STREETS=['Main St','Broadway','N Highway 89','Center St','W State St','E 4th Ave','Frontage Rd','Commerce Blvd','Lincoln Way','S Grand Ave','Railroad Ave','Interstate Dr'];
const RADIUS=25;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function miles(a,b){const R=3958.8,r=x=>x*Math.PI/180,dl=r(b[0]-a[0]),dn=r(b[1]-a[1]);const h=Math.sin(dl/2)**2+Math.cos(r(a[0]))*Math.cos(r(b[0]))*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(h))}
// Sample stations, deterministic per area. Replace with real station feed.
function stationsNear(c,city,state){const R=rng(Math.round(c[0]*10)*7919+Math.round(c[1]*10));const n=9+Math.floor(R()*8),out=[];
 for(let i=0;i<n;i++){const d=0.6+Math.pow(R(),.85)*(RADIUS-1),b=R()*Math.PI*2;const lat=c[0]+d/69*Math.cos(b),lng=c[1]+d/(69*Math.cos(c[0]*Math.PI/180))*Math.sin(b);
  const am=AMEN.filter(()=>R()<.42);if(!am.length)am.push('Convenience Store');
  const fu=FUELS.filter((f,k)=>k===0||R()<(k<3?.8:.4));
  out.push({id:'s'+i,name:'Sinclair #'+(1000+Math.floor(R()*9000)),addr:(100+Math.floor(R()*9800))+' '+STREETS[Math.floor(R()*STREETS.length)],city:[city,state].filter(Boolean).join(', '),ll:[lat,lng],am,fu,dino:R()<.3,hours:am.includes('Open 24/7')?'Open 24 hours':'Open 6 AM – 11 PM'})}
 return out}
async function geocode(q){const u='https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&countrycodes=us&q='+encodeURIComponent(q);const r=await fetch(u,{headers:{'Accept-Language':'en'}});const j=await r.json();if(!j.length)return null;const a=j[0].address||{};
 return{ll:[+j[0].lat,+j[0].lon],label:[a.city||a.town||a.village||a.hamlet||a.county||j[0].name,a.state].filter(Boolean).join(', ')||j[0].display_name,city:a.city||a.town||a.village||a.county||'',state:a.state||''}}
async function reverse(ll){try{const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${ll[0]}&lon=${ll[1]}&zoom=10`);const j=await r.json();const a=j.address||{};return{city:a.city||a.town||a.village||a.county||'',state:a.state||''}}catch(e){return{city:'',state:''}}}
const dirUrl=s=>'https://www.google.com/maps/dir/?api=1&destination='+s.ll[0]+','+s.ll[1];
// Filter groups — keyed to the Find a Station L3 pages
const GROUPS={'search-locate':{key:'am',opts:AMEN},'search-fuel-type':{key:'fu',opts:FUELS},'find-a-dino-statue':{key:'dino',opts:['Only stations with a DINO statue']}};

function mount(el,opt){if(!el||!window.L)return;opt=opt||{};
 const groups=(opt.groups||[{id:'search-locate',name:'Search by Amenities'},{id:'search-fuel-type',name:'Search by Fuel Type'},{id:'find-a-dino-statue',name:'Find a DINO Statue'}]).filter(g=>GROUPS[g.id]);
 const sel={am:new Set(),fu:new Set(),dino:new Set()};
 el.className='loc';
 el.innerHTML=`<form class="loc-bar"><label class="loc-in"><span class="ms">search</span><input type="search" placeholder="ZIP code, address, city or destination" aria-label="Search location"></label><button type="submit" class="loc-go">Search</button><button type="button" class="loc-me"><span class="ms">my_location</span>Use my location</button></form>
<div class="loc-head"><div class="loc-sum init">View all locations <a href="https://stations.sinclairoil.com/index.html" target="_blank" rel="noopener">by state</a></div><div class="loc-ctl"><div class="loc-seg" role="tablist"><button type="button" data-v="map" class="on"><span class="ms">map</span>Map</button><button type="button" data-v="list" disabled><span class="ms">format_list_bulleted</span>List</button></div><button type="button" class="loc-fbtn"><span class="ms">tune</span>Apply Filters<span class="loc-fn"></span></button></div></div>
<div class="loc-body"><aside class="loc-rail" aria-label="Filters"><div class="loc-rail-h"><span>Filter results</span><button type="button" class="loc-clear" hidden>Clear all</button><button type="button" class="loc-x" aria-label="Close filters"><span class="ms">close</span></button></div>${groups.map(g=>{const G=GROUPS[g.id];return `<div class="loc-acc" data-k="${G.key}"><button type="button" class="loc-acch" aria-expanded="false"><span>${esc(g.name)}</span><span class="loc-cnt"></span><span class="ms">expand_more</span></button><div class="loc-accb"><div>${G.opts.map(o=>`<label class="loc-chk"><input type="checkbox" value="${esc(o)}"><span>${esc(o)}</span></label>`).join('')}</div></div></div>`}).join('')}<div class="loc-rail-f"><button type="button" class="loc-done">Show results</button></div></aside><div class="loc-main"><div class="loc-map"></div><div class="loc-list"></div></div></div>
<p class="loc-note">Prototype: map tiles © Esri stand in for Google Maps; station locations are sample data.</p>`;
 const q=s=>el.querySelector(s),input=q('input[type=search]'),sum=q('.loc-sum'),list=q('.loc-list'),seg=el.querySelectorAll('.loc-seg button'),clr=q('.loc-clear');
 const dark=document.body.classList.contains('dark');
 const map=L.map(q('.loc-map'),{zoomControl:true,scrollWheelZoom:false}).setView([39.5,-98.35],4);
 L.tileLayer(dark?'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}':'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:dark?16:19,attribution:'Tiles © Esri, HERE, Garmin, © OpenStreetMap contributors'}).addTo(map);
 const layer=L.layerGroup().addTo(map);let markers={},all=[],origin=null,label='',isMe=false;
 function setView(v){el.classList.toggle('list',v==='list');seg.forEach(b=>b.classList.toggle('on',b.dataset.v===v));if(v==='map')setTimeout(()=>map.invalidateSize(),0)}
 seg.forEach(b=>b.onclick=()=>!b.disabled&&setView(b.dataset.v));
 el.querySelectorAll('.loc-acch').forEach(b=>b.onclick=()=>{const o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',o);b.parentElement.classList.toggle('open',o)});
 el.querySelectorAll('.loc-acc').forEach(acc=>{const k=acc.dataset.k;acc.querySelectorAll('input').forEach(i=>i.onchange=()=>{i.checked?sel[k].add(i.value):sel[k].delete(i.value);syncCounts();render(true)})});
 clr.onclick=()=>{Object.values(sel).forEach(s=>s.clear());el.querySelectorAll('.loc-chk input').forEach(i=>i.checked=false);syncCounts();render(true)};
 const fbtn=q('.loc-fbtn'),done=q('.loc-done');
 function fopen(o){el.classList.toggle('fopen',o);document.body.style.overflow=o?'hidden':''}
 fbtn.onclick=()=>fopen(true);q('.loc-x').onclick=()=>fopen(false);done.onclick=()=>fopen(false);
 function syncCounts(){let tot=0;el.querySelectorAll('.loc-acc').forEach(acc=>{const n=sel[acc.dataset.k].size;tot+=n;acc.querySelector('.loc-cnt').textContent=n?n:''});clr.hidden=!tot;q('.loc-fn').textContent=tot?' ('+tot+')':''}
 const pass=s=>[...sel.am].every(a=>s.am.includes(a))&&[...sel.fu].every(f=>s.fu.includes(f))&&(!sel.dino.size||s.dino);
 const pin=(n,hl)=>L.divIcon({className:'',html:`<div class="loc-pin${hl?' hl':''}"><b>${n}</b></div>`,iconSize:[30,30],iconAnchor:[15,30],popupAnchor:[0,-28]});
 const pop=s=>`<div class="pop"><h4>${esc(s.name)}</h4><div class="addr">${esc(s.addr)}<br>${esc(s.city)}</div><div class="d">${s.d.toFixed(1)} mi · ${esc(s.hours)}</div><a class="dir" href="${dirUrl(s)}" target="_blank" rel="noopener"><span class="ms" style="font-size:16px">directions</span>Directions</a></div>`;
 function focus(id){setView('map');const m=markers[id];if(!m)return;map.setView(m.getLatLng(),14);m.openPopup()}
 function render(keepView){if(!origin)return;const res=all.filter(pass);layer.clearLayers();markers={};
  L.marker(origin,{icon:L.divIcon({className:'',html:`<div class="${isMe?'loc-me-dot':'loc-ctr'}"></div>`,iconSize:[18,18],iconAnchor:[9,9]}),zIndexOffset:-100,interactive:false}).addTo(layer);
  res.forEach((s,i)=>{const m=L.marker(s.ll,{icon:pin(i+1)}).bindPopup(pop(s)).addTo(layer);m.on('popupopen',()=>m.setIcon(pin(i+1,true)));m.on('popupclose',()=>m.setIcon(pin(i+1)));markers[s.id]=m});
  map.invalidateSize();if(!keepView||res.length)map.fitBounds(L.latLngBounds([origin,...res.map(s=>s.ll)]).pad(.12));
  const filtered=res.length!==all.length;
  sum.className='loc-sum';sum.innerHTML=res.length?`<b>${res.length} station${res.length>1?'s':''}</b> within ${RADIUS} miles of <b>${esc(label)}</b>${filtered?` <span class="loc-of">(filtered from ${all.length})</span>`:''}`:`<b>No stations</b> within ${RADIUS} miles of <b>${esc(label)}</b> match these filters.`;
  seg[1].disabled=false;done.textContent=res.length?'Show '+res.length+' result'+(res.length>1?'s':''):'No matching stations';
  list.innerHTML=res.length?res.map((s,i)=>`<article class="loc-item"><span class="loc-num">${i+1}</span><div><h3>${esc(s.name)}</h3><div class="addr">${esc(s.addr)}, ${esc(s.city)} · ${esc(s.hours)}</div><div class="loc-tags">${[...s.fu.filter(f=>f!=='Regular'),...s.am,...(s.dino?['DINO statue']:[])].map(a=>`<span>${esc(a)}</span>`).join('')}</div></div><div class="loc-dist">${s.d.toFixed(1)} mi<small>away</small></div><div class="loc-acts"><a class="dir" href="${dirUrl(s)}" target="_blank" rel="noopener"><span class="ms">directions</span>Directions</a><button type="button" class="show" data-id="${s.id}"><span class="ms">location_on</span>Show on map</button></div></article>`).join(''):`<div class="loc-empty">No stations match these filters. <button type="button">Clear filters</button></div>`;
  list.querySelectorAll('.show').forEach(b=>b.onclick=()=>focus(b.dataset.id));const ce=list.querySelector('.loc-empty button');if(ce)ce.onclick=()=>clr.onclick()}
 function run(o,l,city,state,me){origin=o;label=l;isMe=me;all=stationsNear(o,city,state).map(s=>(s.d=miles(o,s.ll),s)).sort((a,b)=>a.d-b.d);el.classList.add('has');render(false)}
 function err(t){sum.className='loc-sum err';sum.textContent=t}
 q('form').onsubmit=async e=>{e.preventDefault();const v=input.value.trim();if(!v)return input.focus();sum.className='loc-sum';sum.textContent='Searching…';
  try{const g=await geocode(v);if(!g)return err(`We couldn't find “${v}”. Try a ZIP code, city or full address.`);run(g.ll,g.label,g.city,g.state,false)}catch(x){err('Location search is unavailable right now. Please try again.')}};
 q('.loc-me').onclick=()=>{if(!navigator.geolocation)return err('Your browser does not support location sharing.');sum.className='loc-sum';sum.textContent='Finding your location…';
  navigator.geolocation.getCurrentPosition(async p=>{const ll=[p.coords.latitude,p.coords.longitude];const a=await reverse(ll);input.value='';run(ll,'your location',a.city,a.state,true)},()=>err('We couldn’t get your location. Check your browser permissions or enter a ZIP code.'),{timeout:10000})};
 const P=opt.preset;if(P){(P.f||[]).forEach(([k,v])=>{const c=[...el.querySelectorAll(`.loc-acc[data-k="${k}"] input`)].find(x=>x.value===v);if(c){c.checked=true;sel[k].add(v)}});syncCounts();if(P.me)q('.loc-me').click();else if(P.q){input.value=P.q;q('form').requestSubmit()}}
}
const STAT=[['Sinclair','WY',41.78,-107.11],['Salt Lake City','UT',40.76,-111.89],['Vernal','UT',40.455,-109.53],['Dinosaur','CO',40.243,-109.015],['Denver','CO',39.74,-104.99],['Grand Junction','CO',39.064,-108.55],['Casper','WY',42.85,-106.32],['Cheyenne','WY',41.14,-104.82],['Cody','WY',44.526,-109.056],['Billings','MT',45.78,-108.5],['Bozeman','MT',45.68,-111.04],['Boise','ID',43.615,-116.2],['Idaho Falls','ID',43.49,-112.03],['Rapid City','SD',44.08,-103.23],['Omaha','NE',41.26,-95.94],['Wichita','KS',37.69,-97.34],['Albuquerque','NM',35.08,-106.65],['Flagstaff','AZ',35.2,-111.65],['Las Vegas','NV',36.17,-115.14],['Kansas City','MO',39.1,-94.58]];
// Sample statue sites. Replace with real DINO statue feed.
function statues(el){if(!el||!window.L)return;const Rn=rng(4242);
 const all=STAT.map(([c,st,la,ln],i)=>({id:'d'+i,name:'Sinclair #'+(1000+Math.floor(Rn()*9000)),addr:(100+Math.floor(Rn()*9800))+' '+STREETS[Math.floor(Rn()*STREETS.length)],city:c+', '+st,st,ll:[la+(Rn()-.5)*.04,ln+(Rn()-.5)*.04],d:null,hours:'Statue viewable 24/7'})).sort((a,b)=>a.st.localeCompare(b.st)||a.city.localeCompare(b.city));
 const nSt=new Set(all.map(s=>s.st)).size;
 el.className='loc loc-st has';
 el.innerHTML=`<form class="loc-bar"><label class="loc-in"><span class="ms">search</span><input type="search" placeholder="Find the statue closest to a ZIP, city or destination" aria-label="Search location"></label><button type="submit" class="loc-go">Search</button><button type="button" class="loc-me"><span class="ms">my_location</span>Closest to me</button></form>
<div class="loc-head"><div class="loc-sum"></div><div class="loc-ctl"><div class="loc-seg" role="tablist"><button type="button" data-v="map" class="on"><span class="ms">map</span>Map</button><button type="button" data-v="list"><span class="ms">format_list_bulleted</span>List</button></div></div></div>
<div class="loc-body"><div class="loc-main"><div class="loc-map"></div><div class="loc-list"></div></div></div>
<p class="loc-note">Prototype: map tiles © Esri stand in for Google Maps; statue locations are sample data.</p>`;
 const q=s=>el.querySelector(s),input=q('input[type=search]'),sum=q('.loc-sum'),list=q('.loc-list'),seg=el.querySelectorAll('.loc-seg button');
 const dark=document.body.classList.contains('dark');
 const map=L.map(q('.loc-map'),{zoomControl:true,scrollWheelZoom:false}).setView([40,-105],5);
 L.tileLayer(dark?'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}':'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:dark?16:19,attribution:'Tiles © Esri, HERE, Garmin, © OpenStreetMap contributors'}).addTo(map);
 const layer=L.layerGroup().addTo(map);let markers={},origin=null,label='',isMe=false;
 function setView(v){el.classList.toggle('list',v==='list');seg.forEach(b=>b.classList.toggle('on',b.dataset.v===v));if(v==='map')setTimeout(()=>map.invalidateSize(),0)}
 seg.forEach(b=>b.onclick=()=>setView(b.dataset.v));
 const pin=(n,hl)=>L.divIcon({className:'',html:`<div class="loc-pin${hl?' hl':''}"><b>${n}</b></div>`,iconSize:[30,30],iconAnchor:[15,30],popupAnchor:[0,-28]});
 const dtx=s=>s.d==null?esc(s.hours):s.d.toFixed(0)+' mi · '+esc(s.hours);
 const pop=s=>`<div class="pop"><h4>${esc(s.city)}</h4><div class="addr">${esc(s.name)}<br>${esc(s.addr)}</div><div class="d">${dtx(s)}</div><a class="dir" href="${dirUrl(s)}" target="_blank" rel="noopener"><span class="ms" style="font-size:16px">directions</span>Directions</a></div>`;
 function focus(id){setView('map');const m=markers[id];if(!m)return;map.setView(m.getLatLng(),13);m.openPopup()}
 function render(){const res=origin?all.map(s=>(s.d=miles(origin,s.ll),s)).slice().sort((a,b)=>a.d-b.d):all;layer.clearLayers();markers={};
  if(origin)L.marker(origin,{icon:L.divIcon({className:'',html:`<div class="${isMe?'loc-me-dot':'loc-ctr'}"></div>`,iconSize:[18,18],iconAnchor:[9,9]}),zIndexOffset:-100,interactive:false}).addTo(layer);
  res.forEach((s,i)=>{const m=L.marker(s.ll,{icon:pin(i+1)}).bindPopup(pop(s)).addTo(layer);m.on('popupopen',()=>m.setIcon(pin(i+1,true)));m.on('popupclose',()=>m.setIcon(pin(i+1)));markers[s.id]=m});
  map.invalidateSize();map.fitBounds(L.latLngBounds(origin?[origin,...res.slice(0,3).map(s=>s.ll)]:res.map(s=>s.ll)).pad(.12));
  const c=res[0];sum.innerHTML=origin?`Closest DINO statue to <b>${esc(label)}</b>: <b>${esc(c.city)}</b>, ${c.d.toFixed(0)} miles away`:`<b>${all.length} DINO statues</b> across ${nSt} states. Search to find the one closest to you.`;
  list.innerHTML=res.map((s,i)=>`<article class="loc-item"><span class="loc-num">${i+1}</span><div><h3>${esc(s.city)}</h3><div class="addr">${esc(s.name)} · ${esc(s.addr)}</div></div><div class="loc-dist">${s.d==null?esc(s.st):s.d.toFixed(0)+' mi<small>away</small>'}</div><div class="loc-acts"><a class="dir" href="${dirUrl(s)}" target="_blank" rel="noopener"><span class="ms">directions</span>Directions</a><button type="button" class="show" data-id="${s.id}"><span class="ms">location_on</span>Show on map</button></div></article>`).join('');
  list.querySelectorAll('.show').forEach(b=>b.onclick=()=>focus(b.dataset.id))}
 function err(t){sum.className='loc-sum err';sum.textContent=t}
 q('form').onsubmit=async e=>{e.preventDefault();const v=input.value.trim();if(!v)return input.focus();sum.className='loc-sum';sum.textContent='Searching…';
  try{const g=await geocode(v);if(!g)return err(`We couldn't find “${v}”. Try a ZIP code, city or full address.`);origin=g.ll;label=g.label;isMe=false;render()}catch(x){err('Location search is unavailable right now. Please try again.')}};
 q('.loc-me').onclick=()=>{if(!navigator.geolocation)return err('Your browser does not support location sharing.');sum.className='loc-sum';sum.textContent='Finding your location…';
  navigator.geolocation.getCurrentPosition(p=>{origin=[p.coords.latitude,p.coords.longitude];label='your location';isMe=true;input.value='';render()},()=>err('We couldn’t get your location. Check your browser permissions or enter a ZIP code.'),{timeout:10000})};
 render()}
window.HFSLocator={mount,statues,util:{geocode,reverse,miles,rng,AMEN,FUELS,STREETS,esc}};
})();
