(function(){
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const EXTRA={
 general:{ic:'support_agent',t:'General Support',d:'Questions or comments that don\u2019t fit another topic.',fl:[['Full name','text','',1],['Email','email','',1],['Phone','tel','',0],['Subject','text','w',1],['Message','area','w',1]]},
 sponsor:{ic:'handshake',t:'Partnership or Sponsorship Request',d:'Request event sponsorship, a brand partnership or community support.',fl:[['Full name','text','',1],['Organization','text','',1],['Email','email','',1],['Phone','tel','',0],['Request type','opts',['Event sponsorship','Brand partnership','Community donation','Other'],1],['Event or program date','date','',0],['Location (city, state)','text','',1],['Tell us about your request','area','w',1]]},
 sds:{ic:'science',t:'SDS Inquiries',d:'Request a Safety Data Sheet for an HF Sinclair product.',fl:[['Full name','text','',1],['Company','text','',0],['Email','email','',1],['Phone','tel','',0],['Product name','text','',1],['Product code or SKU','text','',0],['Reason for request','sel',['Workplace safety','Regulatory compliance','Emergency response','Other'],0],['Additional details','area','w',0]]}
};
const ORDER=['general','dinopay','wholesale','cards','partner','station','media','sponsor','sds'];
const F=()=>Object.assign({},window.HFSAsk&&HFSAsk.forms||{},EXTRA);
function render(o){const {crumbs,href}=o;const fm=F();
return `<div class="wrap">${crumbs}<div class="akf ct">
<aside class="akf-side"><span class="kicker">Contact Us</span><h1>How can we help?</h1><p>Choose a topic and send your request straight to the right Sinclair team.</p>
<div class="ct-alt"><b>Looking for a quick answer?</b><a href="${href('faqs')}"><span class="ms" aria-hidden="true">help</span>Browse FAQs</a><a href="#/ask-sinclair"><span class="ms" aria-hidden="true">search</span>Search Ask Sinclair</a><a href="${href('find-a-station')}"><span class="ms" aria-hidden="true">local_gas_station</span>Find a station</a></div></aside>
<div class="akf-main"><form class="akf-card" id="ct-form" novalidate><label class="akf-f w ct-topic"><span>What do you need help with?</span><select id="ct-sel" required><option value="">Select a topic\u2026</option>${ORDER.filter(k=>fm[k]).map(k=>`<option value="${k}">${esc(fm[k].t)}</option>`).join('')}</select></label>
<div class="ct-desc" id="ct-desc" hidden></div><div class="akf-g" id="ct-fields"></div>
<div class="akf-ft" id="ct-ft" hidden><small>We\u2019ll use your information only to respond to this request. See our <a href="${href('privacy-policy')}">Privacy Policy</a>.</small><button class="akf-sub" type="submit">Submit request<span class="ms">send</span></button></div></form></div></div></div>`}
function pick(k){const fm=F()[k],g=document.getElementById('ct-fields'),d=document.getElementById('ct-desc'),ft=document.getElementById('ct-ft');if(!g)return;
 if(!fm){g.innerHTML='';d.hidden=ft.hidden=true;return}
 d.innerHTML=`<span class="ms" aria-hidden="true">${fm.ic}</span><p>${esc(fm.d)}</p>`;d.hidden=false;
 g.innerHTML=fm.fl.map((f,i)=>HFSAsk.field(f,i)).join('');ft.hidden=false}
function mount(qs){const s=document.getElementById('ct-sel');if(!s)return;const t=new URLSearchParams(qs||'').get('topic');if(t&&F()[t]){s.value=t;pick(t)}
 s.onchange=()=>pick(s.value);
 const fm=document.getElementById('ct-form');fm.onsubmit=e=>{e.preventDefault();if(!fm.checkValidity()){fm.reportValidity();return}const f=F()[s.value];const ref='SC-'+Math.random().toString(36).slice(2,8).toUpperCase();
  fm.parentElement.innerHTML=`<div class="akf-done"><span class="ms">check_circle</span><h2>Thanks, we got your request.</h2><p>Your reference number is <b>${ref}</b>. The ${esc(f.t)} team will follow up by email.</p><a href="#/contact-us">Send another request</a></div>`;window.scrollTo(0,0)}}
window.HFSContact={render,mount};})();
