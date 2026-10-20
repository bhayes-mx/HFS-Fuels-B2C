(function(){
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const ME=[['Full name','text','',1],['Email','email','',1],['Phone','tel','',0]];
const T=[
 {k:'station',ic:'cleaning_services',t:'Station cleanliness or amenities',d:'A station wasn’t clean, or its amenities are listed incorrectly.',top:1,fl:[['Station address or store number','text','w',1,'e.g. 550 E South Temple, Salt Lake City'],['What’s the issue?','opts',['Cleanliness','Incorrect amenities listed','Both'],1],['Date of visit','date','',0],['Which amenities are listed incorrectly?','text','',0,'e.g. Restrooms, EV charging, diesel'],['Tell us what happened','area','w',1]]},
 {k:'cards',ic:'credit_card',t:'Credit or gift card',d:'Charges, declines, balances or a lost card.',fl:[['Card type','sel',['Sinclair credit card','Sinclair gift card','Other'],1],['Last 4 digits of card','text','',0,'1234'],['Transaction date','date','',0],['Amount','text','',0,'$0.00'],['Station address or store number','text','w',0],['Describe the issue','area','w',1]]},
 {k:'rewards',ic:'loyalty',t:'Rewards or DINOPAY® offers',d:'Missing points, discounts that didn’t apply or offer questions.',fl:[['Program','sel',['MyDINO Rewards','DINOPAY® offers','Mobile Advantage™','Other'],1],['Email on your account','email','',1],['Transaction date','date','',0],['Station address or store number','text','',0],['Describe the issue','area','w',1]]},
 {k:'login',ic:'lock_person',t:'Login or account access',d:'Trouble signing in, resetting a password or accessing your account.',fl:[['Which account?','sel',['DINOPAY® app','MyDINO Rewards','Gift card balance','Other'],1],['Email on your account','email','',1],['Device','sel',['iPhone','Android phone','Web browser'],0],['What happens when you try to sign in?','area','w',1]]},
 {k:'pump',ic:'local_gas_station',t:'Fuel or pump',d:'Fuel quality concerns, pump errors or receipt problems.',fl:[['Station address or store number','text','w',1],['Date of visit','date','',0],['Pump number','text','',0],['Describe the issue','area','w',1]]},
 {k:'other',ic:'support_agent',t:'Something else',d:'Any other customer service question or feedback.',fl:[['Subject','text','w',1],['Message','area','w',1]]}];
const BY=Object.fromEntries(T.map(t=>[t.k,t]));
function render(o){const {crumbs,href}=o;
return `<div class="wrap">${crumbs}<div class="akf ct cs">
<aside class="akf-side"><span class="kicker">Customer Service</span><h1>Report an issue</h1><p>Tell us what went wrong and our customer service team will follow up.</p>
<div class="ct-alt cs-contact"><b>Prefer to reach us directly?</b><a href="mailto:slc.customerservice@HFSinclair.com"><span class="ms" aria-hidden="true">mail</span>slc.customerservice@HFSinclair.com</a><a href="tel:+18003253265"><span class="ms" aria-hidden="true">call</span>800-325-3265</a><small>Monday–Friday, 7AM–5PM MT</small></div>
<div class="ct-alt cs-contact"><b>Sinclair Fleet Track Customer Service</b><a href="tel:+18669392275"><span class="ms" aria-hidden="true">local_shipping</span>866-939-2275</a></div></aside>
<div class="akf-main"><form class="akf-card" id="cs-form" novalidate><fieldset class="cs-q"><legend>What issue are you reporting?</legend><div class="cs-opts">${T.map(t=>`<label class="cs-o${t.top?' top':''}"><input type="radio" name="cs-topic" value="${t.k}" required><span class="ms" aria-hidden="true">${t.ic}</span><span class="tx"><b>${esc(t.t)}</b>${t.top?'<em>Most reported</em>':''}<small>${esc(t.d)}</small></span></label>`).join('')}</div></fieldset>
<div id="cs-rest" hidden><h2 class="cs-h" id="cs-h"></h2><div class="akf-g" id="cs-fields"></div>
<div class="akf-ft"><small>We’ll use your information only to respond to this report. See our <a href="${href('privacy-policy')}">Privacy Policy</a>.</small><button class="akf-sub" type="submit">Submit report<span class="ms">send</span></button></div></div></form></div></div></div>`}
function pick(k,go){const t=BY[k],r=document.getElementById('cs-rest');if(!r)return;
 document.getElementById('cs-h').textContent=t.t;
 document.getElementById('cs-fields').innerHTML=[...t.fl,...ME].map((f,i)=>HFSAsk.field(f,'cs'+i)).join('')+'<p class="cs-sub w">Your contact details</p>';
 const g=document.getElementById('cs-fields'),n=t.fl.length,s=g.querySelector('.cs-sub');g.insertBefore(s,g.children[n]);r.hidden=false;
 if(go){const hd=document.querySelector('header.main'),off=(hd?hd.getBoundingClientRect().bottom:72)+16;window.scrollTo({top:r.getBoundingClientRect().top+window.scrollY-off,behavior:'smooth'});const f=g.querySelector('input,select,textarea');if(f)f.focus({preventScroll:true})}}
function mount(qs){const fm=document.getElementById('cs-form');if(!fm)return;
 fm.querySelectorAll('input[name="cs-topic"]').forEach(i=>i.onchange=()=>pick(i.value,true));
 const t=new URLSearchParams(qs||'').get('topic');if(t&&BY[t]){fm.querySelector(`input[value="${t}"]`).checked=true;pick(t)}
 fm.onsubmit=e=>{e.preventDefault();if(!fm.checkValidity()){fm.reportValidity();return}const ref='CS-'+Math.random().toString(36).slice(2,8).toUpperCase(),k=fm.querySelector('input[name="cs-topic"]:checked').value;
  fm.parentElement.innerHTML=`<div class="akf-done"><span class="ms">check_circle</span><h2>Thanks, we got your report.</h2><p>Your reference number is <b>${ref}</b>. Our customer service team will follow up about your ${esc(BY[k].t.toLowerCase())} report by email.</p><a href="#/customer-service">Report another issue</a></div>`;window.scrollTo(0,0)}}
window.HFSCS={render,mount};})();
