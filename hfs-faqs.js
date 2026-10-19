(function(){
const ext=' target="_blank" rel="noopener"';
const C=(h)=>[
['pay','DINOPAY & the app','smartphone',[
['What is DINOPAY?',`DINOPAY is Sinclair’s mobile payment option. Link a checking account in the app, then pay at the pump or inside the store and save on every gallon. <a href="${h('dinopay-app')}">Learn about DINOPAY</a>.`],
['How do I get the Sinclair app?',`Download it free from the App Store or Google Play, then create an account. <a href="${h('download-the-apps')}">Get the apps</a>.`],
['Is my payment information secure?','Yes. DINOPAY uses bank-level encryption, and your card or account numbers are never shared with the station.'],
['Where can I use DINOPAY?',`At participating Sinclair stations. Use the station finder and filter by DINOPAY to see locations near you. <a href="${h('find-a-station')}">Find a station</a>.`]]],
['rewards','MyDINO Rewards','loyalty',[
['How do I join MyDINO Rewards?',`Sign up in the Sinclair app or online. Membership is free. <a href="${h('sign-up-access')}">Sign up</a>.`],
['How do I earn and redeem rewards?','Scan your app or enter your phone number when you fuel or shop at participating stations. Rewards show in your account and can be applied at checkout.'],
['Where can I see current offers?',`Offers change often and appear in the app. <a href="${h('current-offers')}">See current offers</a>.`]]],
['fuel','Fuel quality','local_gas_station',[
['What is DINOCARE®?',`DINOCARE is the additive package blended into every grade of Sinclair gasoline. It helps clean and protect fuel injectors and intake valves. <a href="${h('dinocare')}">Learn about DINOCARE</a>.`],
['Is Sinclair gasoline TOP TIER™?','Yes. Sinclair gasoline with DINOCARE meets TOP TIER detergent standards for engine cleanliness.'],
['Can I use E15 in my vehicle?',`E15 is approved for most cars, light trucks and SUVs from model year 2001 and newer. Check your owner’s manual first. <a href="${h('e15-gas')}">Is E15 right for you?</a>`],
['What is Elite Diesel?',`Sinclair’s premium diesel, formulated to help keep injectors clean and engines running efficiently. <a href="${h('elite-diesel')}">Learn about Elite Diesel</a>.`]]],
['stations','Stations & DINO statues','storefront',[
['How do I find a Sinclair station?',`Use the station finder to search by city, ZIP or route and filter by fuel and amenities. <a href="${h('find-a-station')}">Find a station</a>.`],
['How do I report an issue at a station?',`Contact our customer service team with the station address and details. <a href="${h('customer-service')}">Contact customer service</a>.`],
['Where can I find a DINO statue?',`See every DINO statue on one map and plan a photo stop. <a href="${h('find-a-dino-statue')}">Find a DINO statue</a>.`]]],
['gift','Gift cards','redeem',[
['Where can I buy a Sinclair gift card?',`Buy eGift or physical cards online, or at participating stations. <a href="${h('buy-gift-cards')}"${ext}>Buy gift cards<span class="sr-only"> (opens in a new tab)</span></a>.`],
['How do I check my gift card balance?','Check your balance on the gift card site using your card number and PIN, or ask a station associate.'],
['What if my gift card is lost or stolen?',`Contact customer service as soon as possible with your card number if you have it. <a href="${h('customer-service')}">Contact customer service</a>.`]]],
['business','Fleet & business','local_shipping',[
['How do I get a Sinclair Fleet Card?',`Apply online for fuel controls, reporting and savings for your business vehicles. <a href="${h('sinclair-fleet-card')}">Explore the Fleet Card</a>.`],
['How do I become a Sinclair distributor or dealer?',`Start with the distributor or dealer pages to see programs and requirements. <a href="${h('become-a-distributor')}">Become a distributor</a> · <a href="${h('become-a-dealer')}">Become a dealer</a>.`],
['Where are Sinclair terminals?',`See refinery racks and terminals on our network map. <a href="${h('terminal-map')}">View the terminal map</a>.`]]],
['shop','DINO Store','shopping_bag',[
['Where can I buy DINO merchandise?',`Shop apparel, toys and collectibles at the DINO Store. <a href="https://mydinostore.com/"${ext}>Visit the DINO Store<span class="sr-only"> (opens in a new tab)</span></a>.`],
['Who do I contact about a DINO Store order?','Orders, shipping and returns are handled by the DINO Store. Use the contact options on mydinostore.com for order help.']]]];
let cat='all',q='';
function render(o){const {href,crumbs}=o;const D=C(href);
return `<div class="wrap">${crumbs}
<section class="fq-hero" aria-labelledby="fqH"><span class="kicker">Help center</span><h1 id="fqH">Frequently asked questions</h1><p>Answers about DINOPAY, rewards, fuel, stations and more.</p>
<label class="fq-search"><span class="ms" aria-hidden="true">search</span><span class="sr-only">Search FAQs</span><input type="search" id="fq-q" placeholder="Search questions" autocomplete="off"></label></section>
<nav class="fq-cats" aria-label="FAQ categories"><button type="button" class="on" data-fqc="all">All topics</button>${D.map(([id,n,ic])=>`<button type="button" data-fqc="${id}"><span class="ms" aria-hidden="true">${ic}</span>${n}</button>`).join('')}</nav>
<div class="fq-body">${D.map(([id,n,ic,qs])=>`<section class="fq-grp" data-g="${id}" aria-labelledby="fq-${id}"><h2 id="fq-${id}"><span class="ms" aria-hidden="true">${ic}</span>${n}</h2><div class="fq-list">${qs.map(([qq,a])=>`<details class="fq-i"><summary>${qq}<span class="ms" aria-hidden="true">expand_more</span></summary><div class="fq-a"><p>${a}</p></div></details>`).join('')}</div></section>`).join('')}
<p class="fq-none" hidden>No questions match your search. Try another word, or <a href="#/ask-sinclair">Ask Sinclair</a>.</p></div>
<section class="fq-x" aria-labelledby="fqXH"><div><h2 id="fqXH">Still have questions?</h2><p>Our team is here to help with stations, payments, rewards and more.</p></div><div class="fq-xa"><a class="hbtn red" href="${href('contact-us')}">Contact us<span class="ms" aria-hidden="true">arrow_forward</span></a><a class="fq-l" href="#/ask-sinclair"><span class="ms" aria-hidden="true">search</span>Ask Sinclair</a></div></section></div>`}
function apply(){const t=q.trim().toLowerCase();let any=0;document.querySelectorAll('.fq-grp').forEach(g=>{let n=0;g.querySelectorAll('.fq-i').forEach(i=>{const ok=(cat==='all'||g.dataset.g===cat)&&(!t||i.textContent.toLowerCase().includes(t));i.hidden=!ok;if(ok)n++;if(t&&ok)i.open=true});g.hidden=!n;any+=n});const no=document.querySelector('.fq-none');if(no)no.hidden=!!any;document.querySelectorAll('[data-fqc]').forEach(b=>b.classList.toggle('on',b.dataset.fqc===cat))}
function mount(qs){cat=new URLSearchParams(qs||'').get('c')||'all';q='';apply()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-fqc]');if(b){cat=b.dataset.fqc;apply()}});
document.addEventListener('input',e=>{if(e.target.id==='fq-q'){q=e.target.value;apply()}});
window.HFSFaqs={render,mount};})();
