(function(){
const ext='<span class="ms ext-ic" aria-hidden="true">open_in_new</span><span class="sr-only">(opens in a new tab)</span>';
const CASES=[
 {id:'foh',img:'https://www.sinclairoil.com/sites/default/files/2025-04/Folds-of-Honor.jpg',k:'Cause marketing',p:'Folds of Honor',tab:'Folds of Honor',yrs:'2022 – present',ic:'military_tech',h:'Fueling Folds of Honor',
  ch:'The communities where veterans settle after serving often overlap with Sinclair’s station footprint. We wanted a way for those communities to give back to the families of fallen and disabled service members and first responders.',
  ap:'Each fall, participating independent Sinclair stations set aside a portion of every gallon sold. Customers add to it with DINOPAY® offers, round-ups and Folds of Honor merchandise, and HF Sinclair matches contributions. The money stays local, funding scholarships near the stations that raised it.',
  st:[['$3.1M','raised in four campaigns'],['$1,007,957','raised in fall 2025'],['201','scholarships funded for 2026'],['72','days, Labor Day to Veterans Day']],
  q:'Together, we’re fueling change and taking care of our military and first responder families.',qb:'Lt. Col. Dan Rooney',qr:'Founder and CEO, Folds of Honor',
  cta:['Support the campaign','fueling-folds-of-honor']},
 {id:'macys',k:'Brand experience',p:'Macy’s Thanksgiving Day Parade®',tab:'Macy’s Parade',yrs:'1963 – 1976 · 2015 – 2024',ic:'celebration',h:'DINO over Manhattan',
  ch:'Ahead of Sinclair’s 100th anniversary and an expansion of stations toward the East Coast, DINO needed to reach a national audience far beyond our Western roots.',
  ap:'After nearly 40 years away, DINO returned to the parade in 2015 as the only life-size balloon in the lineup. Sinclair’s Dino2NYC sweepstakes drove a DINO statue across America, stopping at stations for selfies along the way. In 2022 a new 68-foot balloon debuted, with a baby DINO riding on his back.',
  st:[['50M+','TV viewers each year'],['3.5M','spectators along the route'],['24','parades over two eras'],['72 ft','the only life-size balloon']],
  q:'It makes us proud that DINO is a part of special life moments, whether watching the Parade together or filling up at a station.',qb:'Fergie Theriault',qr:'Vice President, Marketing, HF Sinclair',
  cta:['See parade history','interactive-gallery']},
 {id:'utah',k:'Sports partnership',p:'Utah Hockey Club (NHL)',yrs:'2025 – 2027',ic:'sports_hockey',tab:'Utah Hockey Club',h:'Lucky rows and big fans',
  ch:'Salt Lake City has been home to Sinclair for generations. When the NHL arrived in Utah, we saw a chance to show up for hometown fans in a fresh way and connect game nights to fill-ups.',
  ap:'Through a three-year official partnership at the Delta Center, Sinclair designates a “lucky row” at select home games. Fans in the randomly chosen row receive DINO® merchandise and up to $25 off fuel through the DINOPAY® app, with co-branded station giveaways and annual team events planned.',
  st:[['3','seasons as an official partner'],['$25','off fuel for each lucky row fan'],['NHL','Sinclair’s newest sports partner'],['1','hometown, Salt Lake City']],rl:'The partnership',
  q:'Salt Lake City has been home to the Sinclair brand for generations, and we’re proud to welcome new opportunities, people and joy into a city we love.',qb:'Fergie Theriault',qr:'Vice President, Branded Marketing, HF Sinclair',
  cta:['Get DINOPAY®','download-the-apps']}];
const CORP=[
 {id:'wex',k:'Financial & technology partner',p:'WEX Inc.',tab:'WEX Inc.',yrs:'Long-standing partner',ic:'credit_card',h:'Powering the Sinclair WEX Fleet Card',l1:'The partner',l2:'How it works',rl:'What it delivers',
  ch:'WEX Inc. is a leading financial technology and payments provider, and one of Sinclair’s longest-standing corporate partners.',
  ap:'WEX issues and manages the commercial Sinclair WEX Fleet Card program. It handles back-end payment processing, fuel purchasing controls and expense tracking for the commercial fleets and logistics operators that fuel with Sinclair.',
  st:[['Payments','Back-end processing for fleet card transactions'],['Controls','Fuel purchasing controls for fleet operators'],['Tracking','Expense tracking across vehicles and drivers'],['Fleets','Built for commercial and logistics operations']],
  note:'Running a commercial fleet? See how the Sinclair WEX Fleet Card works.',cta:['Explore fleet cards','sinclair-fleet-card']},
 {id:'upop',k:'Strategic joint venture',p:'UPOP Holdings · Green Trail Fuels JV',tab:'UPOP Holdings',yrs:'Announced February 2026',ic:'storefront',h:'Growing Sinclair across Colorado and New Mexico',l1:'The partner',l2:'The plan',rl:'The joint venture',
  ch:'UPOP Holdings is a convenience store holding company. In February 2026, HF Sinclair and UPOP announced the Green Trail Fuels joint venture.',
  ap:'Green Trail Fuels is built to accelerate Sinclair’s branded marketing footprint. HF Sinclair supplies fuel from its refineries, and the venture will open 30 new convenience retail sites across Colorado and New Mexico.',
  st:[['30','new convenience retail sites planned'],['2','states: Colorado and New Mexico'],['2026','joint venture announced in February'],['Refinery','fuel supplied by HF Sinclair refineries']],
  note:'Interested in bringing Sinclair to your stations?',cta:['Become a distributor','become-a-distributor']}];
const SPON=[
 {id:'race',k:'Motorsports & racing',p:'Silver Hare Racing · Michael Self',tab:'Motorsports',yrs:'2021 Trans Am Series',ic:'sports_motorsports',h:'Back on track with Michael Self',l1:'The program',l2:'The history',rl:'The sponsorship',
  ch:'Sinclair Oil signed on as primary sponsor for driver Michael Self and his Silver Hare Racing TA2 Camaro for a nine-race stretch of the 2021 Trans Am Series.',
  ap:'The sponsorship continued Sinclair’s long presence in racing. It followed a multi-year sponsorship of Self during his time in the ARCA Racing Series.',
  st:[['9','races in the 2021 Trans Am Series'],['TA2','Silver Hare Racing Camaro'],['Primary','sponsor on the car'],['ARCA','earlier multi-year sponsorship of Self']],
  note:'Follow Sinclair’s racing stories in the newsroom.',cta:['Read the news','press-releases']},
 {id:'tcsa',k:'Industry & B2B',p:'Tribal Convenience Store Association (TCSA)',tab:'Industry & B2B',yrs:'2024 – present',ic:'handshake',h:'Platinum Sponsor of the TCSA',l1:'The sponsorship',l2:'Why it matters',rl:'At a glance',
  ch:'HF Sinclair serves as a Platinum Sponsor of the Tribal Convenience Store Association, a strategic partnership supporting Native American and tribal-owned gas stations.',
  ap:'Tribal-owned stations make up a growing segment of independent Sinclair-branded locations across the country. Sponsoring the TCSA keeps HF Sinclair connected to these owners and operators.',
  st:[['Platinum','sponsor level'],['2024','sponsor since'],['Tribal','owned stations supported'],['Growing','segment of independent Sinclair locations']],
  note:'Own or operate a tribal convenience store? Talk to us about carrying the Sinclair brand.',cta:['Become a distributor','become-a-distributor']},
 {id:'local',k:'Regional charity & education',p:'Heroes Hope Gala · Butler Community College Foundation',tab:'Community',yrs:'Ongoing',ic:'volunteer_activism',h:'Close to home, near our refineries',l1:'Our approach',l2:'Recent examples',rl:'Recent sponsorships',ls:1,
  ch:'As part of a community-focused approach, HF Sinclair routinely sponsors regional events and educational foundations in the areas around its refineries and corporate hubs.',
  ap:'HF Sinclair was recognized as a Veteran Ally and Table Sponsor for the 2026 Heroes Hope Gala, an Oklahoma-based organization supporting military veterans. It is also a corporate sponsor of the Butler Community College Foundation in El Dorado, Kansas, near one of its major refineries, providing direct financial backing for student scholarships and community events.',
  st:[['Heroes Hope Gala','2026 Veteran Ally and Table Sponsor · Oklahoma'],['Butler Community College Foundation','Student scholarships and community events · El Dorado, Kansas']],
  note:'See the communities where HF Sinclair operates.',cta:['Our footprint','our-footprint']}];
const PAGE={spon:{cases:SPON,pre:'sp',k:'Sponsorships',h:'Sponsorships that show up where we do',p:'From the racetrack to tribal retail and the towns around our refineries, HF Sinclair sponsors programs that connect with drivers, station owners and neighbors.',sum:[['Motorsports & racing','Trans Am'],['Industry & B2B','TCSA'],['Regional charity & education','Community']],sk:'nm'},
 brand:{cases:CASES,pre:'bp',k:'Brand Partnerships',h:'Partnerships that put DINO to work for good',p:'From national stages to local scholarships, Sinclair partners with organizations that share our values and reach the communities we serve. Here’s what those partnerships have delivered.',sum:[['Raised for military and first responder families','$3.1M'],['Parade viewers reached each year','50M+'],['Years DINO has led brand moments','60+']]},
 corp:{cases:CORP,pre:'cp',k:'Corporate Partnerships',h:'Partners that keep Sinclair moving',p:'Behind every fill-up are companies that help Sinclair process payments, supply fuel and grow its station network. Here’s how two of our corporate partnerships work.',sum:[['Financial & technology partner','WEX Inc.'],['Strategic joint venture','UPOP Holdings']],sk:'nm'}};
function render(o){const {href,src,crumbs}=o,P=PAGE[o.kind||'brand'],CASES=P.cases;
return `<div class="wrap">${crumbs}
<section class="bp-hero" aria-labelledby="bpH"><div class="bp-hc"><span class="kicker">${P.k}</span><h1 id="bpH">${P.h}</h1><p>${P.p}</p><div class="bp-ctas"><a class="hbtn red" href="${href('request-a-partnership')}"><span class="ms">handshake</span>Request a partnership</a></div></div>
<dl class="bp-sum${P.sk?' '+P.sk:''}">${P.sum.map(([t,d])=>`<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl></section>
<section class="bp-tabs" aria-label="Partnership case studies"><div class="bp-tl" role="tablist">${CASES.map((c,i)=>`<button type="button" role="tab" id="bpt-${c.id}" aria-controls="bp-${c.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-bptab="${c.id}"><span class="ms">${c.ic}</span>${c.tab}</button>`).join('')}</div>
${CASES.map((c,i)=>`<article class="bp-case" role="tabpanel" id="bp-${c.id}" aria-labelledby="bpt-${c.id}"${i?' hidden':''}><header class="bp-ch"><div class="bp-cm"><span class="hk"><span class="ms">${c.ic}</span>${c.k}</span><h2 id="bp-${c.id}-h">${c.h}</h2><p class="bp-meta"><b>${c.p}</b><span>${c.yrs}</span></p></div><div class="bp-ci"><image-slot id="${P.pre}-${c.id}"${src(P.pre+'-'+c.id)||(c.img?` src="${c.img}"`:'')} shape="rounded" radius="24" placeholder="${c.p} campaign photo"></image-slot></div></header>
<div class="bp-body"><div class="bp-txt"><section><h3>${c.l1||'The challenge'}</h3><p>${c.ch}</p></section><section><h3>${c.l2||'Our approach'}</h3><p>${c.ap}</p></section></div><div class="bp-res${c.ls?' ls':''}"><h3>${c.rl||'The results'}</h3><dl>${c.st.map(([n,l])=>`<div><dd>${n}</dd><dt>${l}</dt></div>`).join('')}</dl></div></div>
<footer class="bp-cf">${c.q?`<figure><blockquote>“${c.q}”</blockquote><figcaption><b>${c.qb}</b> · ${c.qr}</figcaption></figure>`:`<p class="bp-cn">${c.note}</p>`}<a class="hbtn green" href="${href(c.cta[1])}">${c.cta[0]}<span class="ms">arrow_forward</span></a></footer></article>`).join('')}</section>
<section class="bp-x" aria-labelledby="bpXH"><div class="bp-xc"><span class="kicker">Work with Sinclair</span><h2 id="bpXH">Have an idea worth fueling?</h2><p>We’re always looking for partners who want to make an impact on the road and in our communities. Tell us about your organization and goals.</p></div><div class="bp-xa"><a class="hbtn red" href="${href('request-a-partnership')}">Request a partnership<span class="ms">arrow_forward</span></a></div></section></div>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-bptab]');if(!b)return;const w=b.closest('.bp-tabs');w.querySelectorAll('[data-bptab]').forEach(t=>{const on=t===b;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;w.querySelector('#bp-'+t.dataset.bptab).hidden=!on})});
document.addEventListener('keydown',e=>{const b=e.target.closest&&e.target.closest('[data-bptab]');if(!b||!['ArrowLeft','ArrowRight'].includes(e.key))return;const T=[...b.parentNode.children];const n=T[(T.indexOf(b)+(e.key==='ArrowRight'?1:T.length-1))%T.length];n.focus();n.click()});
window.HFSPartners={render};})();
