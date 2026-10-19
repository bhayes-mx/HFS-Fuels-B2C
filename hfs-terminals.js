(function(){
const T={ref:['Refinery rack','#008445'],term:['Product terminal','#0f1411'],asph:['Asphalt terminal','#EE2F25']};
const S=[
['anacortes','Puget Sound Refinery','Anacortes, WA',[48.49,-122.56],'ref','Gasoline · Diesel · Jet','Truck · Rail · Marine'],
['eldorado','El Dorado Refinery','El Dorado, KS',[37.81,-96.87],'ref','Gasoline · Diesel · Jet','Truck · Pipeline'],
['tulsa','Tulsa Refineries','Tulsa, OK',[36.14,-96.01],'ref','Gasoline · Diesel · Lubricants','Truck · Pipeline'],
['artesia','Navajo Refinery','Artesia, NM',[32.85,-104.41],'ref','Gasoline · Diesel · Asphalt','Truck · Pipeline'],
['woodscross','Woods Cross Refinery','Woods Cross, UT',[40.87,-111.90],'ref','Gasoline · Diesel · Ethanol · Propane','Truck · Pipeline'],
['parco','Parco Refinery','Sinclair, WY',[41.78,-107.11],'ref','Gasoline · Diesel · Renewable diesel','Truck · Pipeline'],
['casper','Casper Refinery','Casper, WY',[42.86,-106.26],'ref','Gasoline · Diesel','Truck'],
['nsl','North Salt Lake Terminal','North Salt Lake, UT',[40.84,-111.93],'term','Gasoline · Diesel · Jet','Truck · Pipeline'],
['cedar','Cedar City Terminal','Cedar City, UT',[37.68,-113.06],'term','Gasoline · Diesel · Jet','Truck · Pipeline'],
['lasvegas','Las Vegas Terminal','Las Vegas, NV',[36.21,-115.04],'term','Gasoline · Diesel · Jet','Truck · Pipeline'],
['cheyenne','Cheyenne Terminal','Cheyenne, WY',[41.11,-104.79],'term','Gasoline · Diesel','Truck · Pipeline'],
['sidney','Sidney Terminal','Sidney, NE',[41.14,-102.98],'term','Gasoline · Diesel · Ethanol','Truck · Pipeline'],
['denver','Denver Terminal','Commerce City, CO',[39.81,-104.93],'term','Gasoline · Diesel','Truck · Pipeline'],
['bloomfield','Bloomfield Terminal','Bloomfield, NM',[36.71,-107.98],'term','Gasoline · Diesel · Jet','Truck · Pipeline'],
['moriarty','Moriarty Terminal','Moriarty, NM',[34.99,-106.05],'term','Gasoline · Diesel · Jet','Truck · Pipeline'],
['elpaso','El Paso Terminal','El Paso, TX',[31.80,-106.33],'term','Gasoline · Diesel · Jet','Truck · Pipeline'],
['orla','Orla Terminal','Orla, TX',[31.83,-103.92],'term','Gasoline · Diesel','Truck · Pipeline'],
['spokane','Spokane Terminal','Spokane, WA',[47.66,-117.34],'term','Gasoline · Diesel','Truck · Pipeline'],
['boise','Boise Terminal','Boise, ID',[43.60,-116.30],'term','Gasoline · Diesel','Truck · Pipeline'],
['burley','Burley Terminal','Burley, ID',[42.54,-113.79],'term','Gasoline · Diesel','Truck · Pipeline'],
['abq','Albuquerque Asphalt Terminal','Albuquerque, NM',[35.04,-106.65],'asph','PG & modified asphalt · Emulsions','Truck'],
['glendale','Glendale Asphalt Terminal','Glendale, AZ',[33.54,-112.19],'asph','PG & modified asphalt · Emulsions','Truck'],
['catoosa','Catoosa Asphalt Terminal','Catoosa, OK',[36.19,-95.75],'asph','PG & modified asphalt · Emulsions','Truck · Marine']
].map(([id,n,c,ll,t,p,m])=>({id,n,c,ll,t,p,m}));
const states=new Set(S.map(s=>s.c.slice(-2))).size;
function render(o){const {href,crumbs}=o;const cnt=k=>S.filter(s=>s.t===k).length;
return `<div class="wrap">${crumbs}
<section class="fp-hero" aria-labelledby="tmH"><div class="fp-hc"><span class="kicker">Distributors</span><h1 id="tmH">Our Terminal Network</h1><p>Load Sinclair-supplied fuel close to your market. Our refinery racks and terminals are linked by about 2,000 miles of HF Sinclair pipeline across the Rockies, Southwest and Plains.</p></div>
<dl class="fp-stats"><div><dt>Loading locations</dt><dd>${S.length}</dd></div><div><dt>States served by a rack</dt><dd>${states}</dd></div><div><dt>Refinery racks</dt><dd>${cnt('ref')}</dd></div><div><dt>Miles of HF Sinclair pipeline</dt><dd>2,000+</dd></div></dl></section>
<section class="fp-map" aria-labelledby="tmMH"><div class="fp-sh"><div><span class="kicker">Terminal map</span><h2 id="tmMH">Find a loading location</h2></div><label class="tm-sel"><span class="sr-only">Filter by type</span><span class="ms" aria-hidden="true">filter_list</span><select id="tm-filter"><option value="all">All locations (${S.length})</option>${Object.entries(T).map(([k,[l]])=>`<option value="${k}">${l}s (${cnt(k)})</option>`).join('')}</select><span class="ms chev" aria-hidden="true">expand_more</span></label></div>
<div class="fp-grid"><div class="fp-canvas"><div id="tm-map" role="region" aria-label="Map of HF Sinclair terminals"></div></div>
<ol class="fp-list" id="tm-list">${S.map(s=>`<li data-t="${s.t}"><button type="button" data-tm="${s.id}"><span class="dot" style="background:${T[s.t][1]}"></span><span class="tx"><b>${s.n}</b><small>${s.c}</small></span><span class="cap"><small>${T[s.t][0]}</small></span></button></li>`).join('')}</ol></div>
<p class="fp-src">Locations compiled from HF Sinclair facility, product and pipeline tariff information. Products and loading modes vary by site; confirm availability, supply agreements and rack access through the B2B Portal. Pin locations are approximate.</p></section>
<section class="fp-x" aria-labelledby="tmXH"><div class="fp-xc"><span class="kicker">Partner with us</span><h2 id="tmXH">Ready to load at a Sinclair rack?</h2><p>Become a Sinclair distributor for branded and unbranded supply, or sign in to the portal for rack pricing and lifting details.</p></div><div class="fp-xa tm-xa"><a class="hbtn red" href="${href('become-a-distributor')}">Become a distributor<span class="ms" aria-hidden="true">arrow_forward</span></a><a class="tm-l" href="https://distributors.hfsinclair.com/s/login/?ec=302&amp;startURL=%2Fs%2F" target="_blank" rel="noopener"><span class="ms" aria-hidden="true">login</span>B2B Portal login<span class="sr-only">(opens in a new tab)</span></a></div></section></div>`}
let map,mk={},filt='all';
function pop(s){return `<div class="fp-pop"><b>${s.n}</b><span>${s.c}</span><em style="color:${T[s.t][1]};font-weight:700">${T[s.t][0]}</em><em>${s.p}</em><span>Loading: ${s.m}</span></div>`}
function sel(id,fly){const s=S.find(x=>x.id===id);if(!s)return;document.querySelectorAll('#tm-list button').forEach(b=>b.classList.toggle('on',b.dataset.tm===id));if(fly)map.flyTo(s.ll,Math.max(map.getZoom(),7),{duration:.6});mk[id].openPopup()}
function apply(){const vis=S.filter(s=>filt==='all'||s.t===filt);S.forEach(s=>{const on=vis.includes(s);if(on&&!map.hasLayer(mk[s.id]))mk[s.id].addTo(map);if(!on&&map.hasLayer(mk[s.id]))map.removeLayer(mk[s.id])});document.querySelectorAll('#tm-list li').forEach(li=>li.hidden=!(filt==='all'||li.dataset.t===filt));const fs=document.getElementById('tm-filter');if(fs)fs.value=filt;map.closePopup();if(vis.length)map.flyToBounds(vis.map(s=>s.ll),{padding:[40,40],duration:.5,maxZoom:7})}
function mount(){const el=document.getElementById('tm-map');if(!el||!window.L)return;if(map){map.remove();map=null;mk={}}filt='all';
map=L.map(el,{scrollWheelZoom:false,zoomSnap:.25});
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',{maxZoom:12,minZoom:3,attribution:'Tiles © Esri, HERE, Garmin, © OpenStreetMap contributors'}).addTo(map);
S.forEach(s=>{const m=L.circleMarker(s.ll,{radius:s.t==='ref'?11:8,color:'#fff',weight:2,fillColor:T[s.t][1],fillOpacity:.95}).addTo(map).bindPopup(pop(s),{autoPanPadding:[24,24]});m.on('click',()=>sel(s.id,false));mk[s.id]=m});
map.fitBounds(S.map(s=>s.ll),{padding:[36,36]});setTimeout(()=>map.invalidateSize(),80)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-tm]');if(b&&map){sel(b.dataset.tm,true);return}});document.addEventListener('change',e=>{if(e.target.id==='tm-filter'&&map){filt=e.target.value;apply()}});
window.HFSTerminals={render,mount};})();
