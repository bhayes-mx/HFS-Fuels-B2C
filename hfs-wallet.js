(function(){
const OFFERS=[
 {id:'mammoth',img:'design-files/hero-mammoth-monday.webp',label:'Mammoth Monday',k:'Mammoth Monday',h:'25¢ off per gallon, every Monday',p:'Pay with DINOPAY plus Mobile Advantage on Mondays to save 25¢ on every gallon at participating Sinclair stations.',sec:['Learn About Loyalty','loyalty'],terms:'*Mondays only, at participating locations. See offer terms for details.',alt:'Sinclair Mammoth Monday: 25¢ off per gallon with DINOPAY plus Mobile Advantage'},
 {id:'save10',img:'design-files/hero-save-10.png',label:'Save 10¢',k:'Every gallon',h:'Save 10¢ a gallon or more with DINOPAY',p:'Pay at the pump from your phone and save on every fill-up.',sec:['How DINOPAY Works','dinopay-app'],terms:'*At participating locations, up to 35 gallons.',alt:'Save 10¢ per gallon or more with Sinclair DINOPAY'},
 {id:'save15',img:'design-files/hero-save-15.png',label:'Save 15¢',k:'Mobile Advantage',h:'Save 15¢ a gallon or more with Mobile Advantage',p:'Add Mobile Advantage to DINOPAY for even bigger savings at the pump.',sec:['About Mobile Advantage','mobile-advantage'],terms:'*At participating locations, up to 35 gallons.',alt:'Save 15¢ per gallon or more with Sinclair DINOPAY plus Mobile Advantage'}];
const N=OFFERS.length,DWELL=6500;
const P={active:'translate(2cqw,3cqw) rotate(-3deg)',lift:k=>`translate(26cqw,${14-k}cqw)`,slot:k=>`translate(${26+k*1.5}cqw,${57-(16-k*6)}cqw)`};
let el,q,busy=false,timer=null,raf=null,t0=0,paused=false,href=x=>'#/'+x;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function mount(root,opt={}){if(!root)return;el=root;href=opt.href||href;q=OFFERS.map((_,i)=>i);clearTimeout(timer);cancelAnimationFrame(raf);busy=false;
 el.innerHTML=`<div class="hw-copy" aria-live="polite"><span class="hw-k hw-swap"><span class="ms">savings</span><span data-k></span></span><h1 class="hw-swap" data-h></h1><p class="hw-swap" data-p></p><div class="hw-ctas"><a class="hw-btn pri" href="${href('download-the-apps')}"><span class="ms">download</span>Download the DINOPAY App</a><a class="hw-btn sec" data-sec href="#"></a></div><span class="hw-terms hw-swap" data-t></span></div>
 <div class="hw-right"><div class="hw-stage" role="region" aria-roledescription="carousel" aria-label="Current offers"><div class="hw-back" aria-hidden="true"></div>${OFFERS.map((o,i)=>`<button type="button" class="hw-card" data-i="${i}" aria-label="Show offer: ${esc(o.label)}"><img src="${o.img}" alt="${esc(o.alt)}" width="620" height="349"></button>`).join('')}<div class="hw-front" aria-hidden="true"><b>DINOPAY</b><small>Ways<br>to save</small></div></div>
 <div class="hw-ctl"><button type="button" class="hw-nav" data-d="-1" aria-label="Previous offer"><span class="ms">chevron_left</span></button><div class="hw-pills">${OFFERS.map((o,i)=>`<button type="button" class="hw-pill" data-go="${i}">${esc(o.label)}<i></i></button>`).join('')}</div><button type="button" class="hw-nav" data-d="1" aria-label="Next offer"><span class="ms">chevron_right</span></button></div></div>`;
 layout();copy(false);
 el.addEventListener('click',e=>{const c=e.target.closest('.hw-card');if(c&&+c.dataset.i!==q[0]){go(+c.dataset.i);return}const d=e.target.closest('[data-d]');if(d){go(q[(+d.dataset.d+N)%N===1?1:N-1]);return}const g=e.target.closest('[data-go]');if(g)go(+g.dataset.go)});
 const st=el.querySelector('.hw-right');st.addEventListener('mouseenter',()=>paused=true);st.addEventListener('mouseleave',()=>{paused=false});el.addEventListener('focusin',()=>paused=true);el.addEventListener('focusout',()=>paused=false);
 if(!RM){t0=performance.now();raf=requestAnimationFrame(tick)}}
function cards(){return [...el.querySelectorAll('.hw-card')]}
function layout(){const cs=cards();q.forEach((ci,pos)=>{const c=cs[ci];c.classList.toggle('is-active',pos===0);c.tabIndex=pos===0?-1:0;c.setAttribute('aria-hidden',pos===0?'false':'false');if(pos===0){c.style.zIndex=10;c.style.transform=P.active}else{const k=pos-1;c.style.zIndex=2+k;c.style.transform=P.slot(k)}});
 el.querySelectorAll('.hw-pill').forEach((p,i)=>{p.classList.toggle('on',i===q[0]);p.setAttribute('aria-current',i===q[0]?'true':'false');if(i!==q[0])p.querySelector('i').style.width='0'})}
function copy(anim=true,idx){const o=OFFERS[idx??q[0]],c=el.querySelector('.hw-copy');const fill=()=>{c.querySelector('[data-k]').textContent=o.k;c.querySelector('[data-h]').textContent=o.h;c.querySelector('[data-p]').textContent=o.p;c.querySelector('[data-t]').textContent=o.terms;const s=c.querySelector('[data-sec]');s.href=href(o.sec[1]);s.innerHTML=`${esc(o.sec[0])}<span class="ms">arrow_forward</span>`};
 if(!anim||RM){fill();return}c.classList.add('out');setTimeout(()=>{fill();c.classList.remove('out')},350)}
function go(target){if(busy||target===q[0]||!el.isConnected)return;busy=true;const cs=cards(),out=cs[q[0]],inn=cs[target];
 const rest=q.slice(1).filter(i=>i!==target);const nq=[target,...rest,q[0]];
 if(RM){q=nq;layout();copy(false);busy=false;t0=performance.now();return}
 out.style.zIndex=9;out.style.transform=P.lift(0);
 const slotK=q.indexOf(target)-1;inn.style.zIndex=8;
 setTimeout(()=>{out.style.zIndex=1+N;out.style.transform=P.slot(N-2);inn.style.transform=P.lift(1);copy(true,target)},380);
 setTimeout(()=>{inn.style.zIndex=10;q=nq;layout();},820);
 setTimeout(()=>{busy=false;t0=performance.now()},1320);void slotK}
function tick(now){if(!el||!el.isConnected)return;if(paused||busy)t0+=now-(tick.l||now);tick.l=now;const p=Math.min(1,(now-t0)/DWELL);const bar=el.querySelector('.hw-pill.on i');if(bar)bar.style.width=p*100+'%';if(p>=1&&!busy)go(q[1]);raf=requestAnimationFrame(tick)}
window.HFSWallet={mount};
})();
