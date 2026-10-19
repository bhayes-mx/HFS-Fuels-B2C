(function(){
const U='https://www.hfsinclair.com/operations/facilities/us/';
const ext='<span class="sr-only">(opens in a new tab)</span>';
const SITES=[
{id:'eldorado',n:'El Dorado Refinery',c:'El Dorado, KS',ll:[37.81,-96.87],cap:162000,t:'ref',tags:['Crude refining'],u:'el-dorado-ks'},
{id:'tulsa',n:'Tulsa Refineries (East & West)',c:'Tulsa, OK',ll:[36.14,-96.01],cap:155300,t:'ref',tags:['Crude refining','Lubricants & specialties'],u:'tulsa-ok'},
{id:'pugetsound',n:'Puget Sound Refinery',c:'Anacortes, WA',ll:[48.49,-122.56],cap:145000,t:'ref',tags:['Crude refining'],u:'anacortes-wa'},
{id:'navajo',n:'Navajo Refinery',c:'Artesia / Lovington, NM',ll:[32.85,-104.41],cap:110000,t:'ref',tags:['Crude refining','Renewable diesel'],u:'artesia-lovington-nm'},
{id:'parco',n:'Sinclair Refinery (Parco)',c:'Sinclair, WY',ll:[41.78,-107.11],cap:75000,t:'ref',tags:['Crude refining','Renewable diesel'],u:'sinclair-wy-parco'},
{id:'woodscross',n:'Woods Cross Refinery',c:'Woods Cross, UT',ll:[40.87,-111.90],cap:41705,t:'ref',tags:['Crude refining'],u:'woods-cross-ut'},
{id:'casper',n:'Casper Refinery',c:'Casper, WY',ll:[42.86,-106.26],cap:31000,t:'ref',tags:['Crude refining'],u:'casper-wy'},
{id:'cheyenne',n:'Cheyenne Renewable Diesel',c:'Cheyenne, WY',ll:[41.11,-104.79],t:'alt',tags:['Renewable diesel'],u:'cheyenne-wy'},
{id:'petrolia',n:'Petrolia Facility',c:'Petrolia, PA',ll:[41.02,-79.72],t:'alt',tags:['Lubricants & specialties'],u:'petrolia-pa'}];
const fmt=n=>n.toLocaleString('en-US');
const STATS=[['7','Crude oil refineries'],['720K','Barrels per day of crude capacity'],['3','Sites producing renewable diesel'],['7','States with HF Sinclair facilities']];
function render(o){const {crumbs}=o;
return `<div class="wrap">${crumbs}
<section class="fp-hero" aria-labelledby="fpH"><div class="fp-hc"><span class="kicker">Our Footprint</span><h1 id="fpH">Refining the fuel that keeps the West moving</h1><p>From the Pacific Northwest to the Plains, HF Sinclair refineries turn crude oil into the gasoline, diesel and jet fuel that supply Sinclair stations and communities across the country.</p></div>
<dl class="fp-stats">${STATS.map(([v,l])=>`<div><dt>${l}</dt><dd>${v}</dd></div>`).join('')}</dl></section>
<section class="fp-map" aria-labelledby="fpMH"><div class="fp-sh"><div><span class="kicker">Facilities map</span><h2 id="fpMH">HF Sinclair facilities across the U.S.</h2></div><ul class="fp-key" aria-label="Map key"><li><i class="ref"></i>Crude refinery <small>(sized by capacity)</small></li><li><i class="alt"></i>Renewable diesel or lubricants</li></ul></div>
<div class="fp-grid"><div class="fp-canvas"><div id="fp-map" role="region" aria-label="Map of HF Sinclair facilities"></div></div>
<ol class="fp-list">${SITES.map(s=>`<li><button type="button" data-fp="${s.id}"><span class="dot ${s.t}"></span><span class="tx"><b>${s.n}</b><small>${s.c}</small></span><span class="cap">${s.cap?`${fmt(s.cap)}<small>b/d</small>`:`<small>${s.tags[0]}</small>`}</span></button></li>`).join('')}</ol></div>
<p class="fp-src">Crude capacity: U.S. EIA Refinery Capacity Report, Jan. 1, 2026 (barrels per calendar day). Facility list: HFSinclair.com. Pin locations are approximate.</p></section>
<section class="fp-x" aria-labelledby="fpXH"><div class="fp-xc"><span class="kicker">Operations</span><h2 id="fpXH">Explore each facility</h2><p>Get operations, products and community details for every HF Sinclair site, including lubricant plants in Canada and the Netherlands.</p></div><div class="fp-xa"><a class="hbtn red" href="https://www.hfsinclair.com/operations/facilities/default.aspx" target="_blank" rel="noopener">Visit HFSinclair.com<span class="ms" aria-hidden="true">open_in_new</span>${ext}</a></div></section></div>`}
let map,mk={};
function pop(s){return `<div class="fp-pop"><b>${s.n}</b><span>${s.c}</span>${s.cap?`<strong>${fmt(s.cap)} <small>barrels/day</small></strong>`:''}<em>${s.tags.join(' · ')}</em><a href="${U}${s.u}/default.aspx" target="_blank" rel="noopener">Facility details<span class="ms" aria-hidden="true">open_in_new</span>${ext}</a></div>`}
function sel(id,fly){const s=SITES.find(x=>x.id===id);if(!s)return;document.querySelectorAll('.fp-list button').forEach(b=>b.classList.toggle('on',b.dataset.fp===id));if(fly)map.flyTo(s.ll,Math.max(map.getZoom(),6),{duration:.6});mk[id].openPopup()}
function mount(){const el=document.getElementById('fp-map');if(!el||!window.L)return;if(map){map.remove();map=null;mk={}}
map=L.map(el,{scrollWheelZoom:false,zoomSnap:.25,attributionControl:true});
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',{maxZoom:12,minZoom:3,attribution:'Tiles © Esri, HERE, Garmin, © OpenStreetMap contributors'}).addTo(map);
SITES.forEach(s=>{const r=s.cap?8+Math.sqrt(s.cap/162000)*14:7;const m=L.circleMarker(s.ll,s.t==='ref'?{radius:r,color:'#fff',weight:2,fillColor:'#008445',fillOpacity:.9}:{radius:r,color:'#fff',weight:2,fillColor:'#EE2F25',fillOpacity:.95}).addTo(map).bindPopup(pop(s),{closeButton:true,autoPanPadding:[24,24]});m.on('click',()=>sel(s.id,false));mk[s.id]=m});
map.fitBounds(SITES.map(s=>s.ll),{padding:[36,36]});
setTimeout(()=>map.invalidateSize(),80)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-fp]');if(b&&map)sel(b.dataset.fp,true)});
window.HFSFootprint={render,mount};})();
