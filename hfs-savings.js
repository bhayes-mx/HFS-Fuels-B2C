(function(){
// Sample cents-per-gallon values — confirm with program owners.
const PROGS=[
 {id:'dinopay',name:'DINOPAY',cpg:10,d:'Pay at the pump from your phone'},
 {id:'mydino',name:'MyDINO Rewards',cpg:5,d:'Earn points on every gallon, redeemed as cents off'}];
const FLEET={gas:5,diesel:8};// Sinclair Fleet Card ¢/gal, sample
const FREQ=[[2,'Twice a week'],[1,'Weekly'],[.5,'Every 2 weeks'],[12/52,'Monthly']];
const FUEL=[['gas','Gasoline'],['diesel','Diesel'],['mixed','Mixed fleet']];
const $m=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const $r=n=>'$'+Math.round(n).toLocaleString('en-US');
const fill=r=>r.style.setProperty('--v',((r.value-r.min)/(r.max-r.min)*100)+'%');
const num=(v,lo,hi,d)=>{v=parseFloat(v);return isFinite(v)?Math.min(hi,Math.max(lo,v)):d};
const field=(id,label,min,max,step,unit)=>`<div class="sc-f"><label for="${id}">${label}</label><div class="sc-row"><input type="range" id="${id}R" min="${min}" max="${max}" step="${step}" aria-label="${label}"><span class="sc-num"><input type="number" id="${id}" min="1" inputmode="numeric"><span>${unit}</span></span></div></div>`;
const seg=(cls,lab,opts,cur)=>`<div class="sc-f"><span class="sc-l" id="${cls}L">${lab}</span><div class="sc-seg ${cls}" role="radiogroup" aria-labelledby="${cls}L">${opts.map(([v,l])=>`<button type="button" role="radio" data-v="${v}" aria-checked="${v===cur}">${l}</button>`).join('')}</div></div>`;
const outHTML=(k,cta,ic,stats)=>`<aside class="sc-out" aria-live="polite"><div class="sc-per" role="radiogroup" aria-label="Show savings"><button type="button" role="radio" data-v="mo" aria-checked="false">Monthly</button><button type="button" role="radio" data-v="yr" aria-checked="true">Annual</button></div><div class="sc-big"><span class="sc-k">${k}</span><b class="sc-amt"></b><span class="sc-pp"></span></div><div class="sc-bd"></div><dl class="sc-stats">${stats.map(([c,l])=>`<div><dt>${l}</dt><dd class="${c}"></dd></div>`).join('')}</dl><a class="sc-cta" href="${cta[0]}"><span class="ms">${ic}</span><span class="sc-ctat">${cta[1]}</span></a><p class="sc-fine">Estimates only. Uses sample cents-per-gallon values; actual savings depend on program terms, purchase limits and participating locations.</p></aside>`;
function bindRange(p,id,lim,get,set,calc){const n=p.querySelector('#'+id),r=p.querySelector('#'+id+'R');const sync=()=>{n.value=get();r.value=Math.min(get(),r.max);fill(r)};
 r.oninput=()=>{set(+r.value);sync();calc()};n.oninput=()=>{set(num(n.value,lim[0],lim[1],get()));r.value=Math.min(get(),r.max);fill(r);calc()};n.onblur=sync;sync()}
function bindSeg(p,cls,set,calc){p.querySelectorAll('.'+cls+' button').forEach(b=>b.onclick=()=>{set(b.dataset.v);p.querySelectorAll('.'+cls+' button').forEach(x=>x.setAttribute('aria-checked',x===b));calc()})}
function consumer(p,href){const st={mi:300,mpg:25,fq:1,on:new Set(PROGS.map(x=>x.id)),per:'yr'};
 p.innerHTML=`<div class="sc-in"><section class="sc-card"><h2>Your driving</h2>${field('scMi','Miles driven per week',25,1500,25,'mi')}${field('scMpg','Vehicle’s average MPG',8,60,1,'mpg')}${seg('sc-fq','How often you fill up',FREQ,1)}</section>
<section class="sc-card"><h2>Programs</h2><p class="sc-sub">Turn on the programs you use. Discounts stack at the pump.</p><div class="sc-progs">${PROGS.map(x=>`<label class="sc-prog"><input type="checkbox" value="${x.id}" checked><span class="sc-sw" aria-hidden="true"></span><span class="sc-pt"><b>${x.name}</b><small>${x.d}</small></span><span class="sc-cpg">${x.cpg}¢<small>/gal</small></span></label>`).join('')}</div></section></div>`+outHTML('You could save',[href('dinopay-app'),'Enroll and start saving'],'how_to_reg',[['sc-gal','Gallons'],['sc-fill','Per fill-up'],['sc-tot','Combined']]);
 const q=s=>p.querySelector(s);
 function calc(){const galWk=st.mi/Math.max(st.mpg,1),k=st.per==='yr'?52:52/12,gal=galWk*k,on=PROGS.filter(x=>st.on.has(x.id)),cpg=on.reduce((a,x)=>a+x.cpg,0),amt=gal*cpg/100,mx=Math.max(...PROGS.map(x=>x.cpg));
  q('.sc-amt').textContent=st.per==='yr'?$r(amt):$m(amt);q('.sc-pp').textContent=st.per==='yr'?'per year':'per month';
  q('.sc-bd').innerHTML=on.length?on.map(x=>`<div class="sc-b"><span>${x.name}</span><i style="--w:${x.cpg/mx*100}%"></i><b>${$m(gal*x.cpg/100)}</b></div>`).join(''):'<p class="sc-none">Turn on a program to see your savings.</p>';
  q('.sc-gal').textContent=Math.round(gal).toLocaleString('en-US')+' gal';q('.sc-fill').textContent=$m(galWk/st.fq*cpg/100);q('.sc-tot').textContent=cpg+'¢/gal';
  const cta=q('.sc-cta');cta.href=href(st.on.has('dinopay')?'dinopay-app':st.on.has('mydino')?'mydino-rewards':'dinopay');q('.sc-ctat').textContent=on.length?'Enroll and start saving':'Learn more about our programs'}
 bindRange(p,'scMi',[1,5000],()=>st.mi,v=>st.mi=v,calc);bindRange(p,'scMpg',[1,150],()=>st.mpg,v=>st.mpg=v,calc);
 bindSeg(p,'sc-fq',v=>st.fq=+v,calc);bindSeg(p,'sc-per',v=>st.per=v,calc);
 p.querySelectorAll('.sc-prog input').forEach(c=>c.onchange=()=>{st.on[c.checked?'add':'delete'](c.value);calc()});calc()}
function fleet(p,href){const st={veh:25,mi:800,mpg:12,fuel:'mixed',dsl:60,per:'yr'};
 p.innerHTML=`<div class="sc-in"><section class="sc-card"><h2>Your fleet</h2>${field('fvVeh','Number of vehicles',1,500,1,'vehicles')}${field('fvMi','Miles per vehicle per week',50,3000,50,'mi')}${field('fvMpg','Fleet average MPG',4,40,1,'mpg')}</section>
<section class="sc-card"><h2>Fuel types</h2>${seg('fv-fuel','What your fleet runs on',FUEL,'mixed')}<div class="sc-f fv-mix"><label for="fvDsl">Share of vehicles running on diesel</label><div class="sc-row"><input type="range" id="fvDslR" min="0" max="100" step="5" aria-label="Diesel share"><span class="sc-num"><input type="number" id="fvDsl" min="0" max="100" inputmode="numeric"><span>%</span></span></div></div><div class="sc-progs"><div class="sc-prog on"><span class="ms sc-pi">local_shipping</span><span class="sc-pt"><b>Sinclair Fleet Card</b><small>Discount on every gallon, plus purchase controls and fleet reporting</small></span><span class="sc-cpg fv-cpg"></span></div></div></section></div>`+outHTML('Your fleet could save',[href('sinclair-fleet-card'),'Apply for a Sinclair Fleet Card'],'credit_card',[['fv-gal','Gallons'],['fv-veh','Per vehicle'],['fv-tot','Avg. discount']]);
 const q=s=>p.querySelector(s);
 function calc(){const share=st.fuel==='gas'?0:st.fuel==='diesel'?100:st.dsl,k=st.per==='yr'?52:52/12,gal=st.veh*st.mi/Math.max(st.mpg,1)*k,gD=gal*share/100,gG=gal-gD,sG=gG*FLEET.gas/100,sD=gD*FLEET.diesel/100,amt=sG+sD;
  q('.fv-mix').hidden=st.fuel!=='mixed';
  q('.fv-cpg').innerHTML=st.fuel==='gas'?`${FLEET.gas}¢<small>/gal</small>`:st.fuel==='diesel'?`${FLEET.diesel}¢<small>/gal</small>`:`${FLEET.gas}–${FLEET.diesel}¢<small>/gal</small>`;
  q('.sc-amt').textContent=$r(amt);q('.sc-pp').textContent=st.per==='yr'?'per year':'per month';
  const rows=[];if(gG>0)rows.push(['Gasoline',FLEET.gas,sG]);if(gD>0)rows.push(['Diesel',FLEET.diesel,sD]);
  q('.sc-bd').innerHTML=rows.map(([n,c,s])=>`<div class="sc-b"><span>${n} · ${c}¢/gal</span><i style="--w:${amt?s/amt*100:0}%"></i><b>${$r(s)}</b></div>`).join('');
  q('.fv-gal').textContent=Math.round(gal).toLocaleString('en-US')+' gal';q('.fv-veh').textContent=$r(amt/st.veh);q('.fv-tot').textContent=(gal?(amt/gal*100).toFixed(1):0)+'¢/gal'}
 bindRange(p,'fvVeh',[1,10000],()=>st.veh,v=>st.veh=v,calc);bindRange(p,'fvMi',[1,10000],()=>st.mi,v=>st.mi=v,calc);bindRange(p,'fvMpg',[1,100],()=>st.mpg,v=>st.mpg=v,calc);bindRange(p,'fvDsl',[0,100],()=>st.dsl,v=>st.dsl=v,calc);
 bindSeg(p,'fv-fuel',v=>st.fuel=v,calc);bindSeg(p,'sc-per',v=>st.per=v,calc);calc()}
function mount(el,opt){if(!el)return;const href=(opt&&opt.href)||(()=>'#');
 const T=[['consumer','Consumer Savings','directions_car'],['fleet','Fleet Savings','local_shipping']];
 el.className='sc-wrap';
 el.innerHTML=`<div class="sc-tabs" role="tablist" aria-label="Savings calculator">${T.map(([id,l,ic],i)=>`<button type="button" role="tab" id="sct-${id}" aria-controls="scp-${id}" aria-selected="${i===0}" tabindex="${i?-1:0}"><span class="ms">${ic}</span>${l}</button>`).join('')}</div>${T.map(([id],i)=>`<div class="sc" role="tabpanel" id="scp-${id}" aria-labelledby="sct-${id}"${i?' hidden':''}></div>`).join('')}`;
 consumer(el.querySelector('#scp-consumer'),href);fleet(el.querySelector('#scp-fleet'),href);
 const tabs=[...el.querySelectorAll('[role=tab]')];
 const sel=t=>{tabs.forEach(x=>{const on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;el.querySelector('#'+x.getAttribute('aria-controls')).hidden=!on});t.focus()};
 tabs.forEach((t,i)=>{t.onclick=()=>sel(t);t.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();sel(tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length])}}})}
window.HFSSavings={mount};
})();
