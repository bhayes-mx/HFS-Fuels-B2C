(function(){
const S='https://mydinostore.com',CDN=f=>`${S}/cdn/shop/files/${f}?width=800`;
const ext='<span class="ms ext-ic" aria-hidden="true">open_in_new</span><span class="sr-only">(opens in a new tab)</span>';
const X=(u,t,c)=>`<a class="${c}" href="${u}" target="_blank" rel="noopener">${t}${ext}</a>`;
const NEW=[
 {id:'sinclair-tie-dye-t-shirt-new',n:'Sinclair Tie-Dye T-Shirt',p:'$27.99',f:'PC147-DINOTieDye.jpg'},
 {id:'sinclair-64-oz-insulated-mug',n:'Sinclair 64 oz Insulated Mug',p:'$17.99',f:'DSC06924-3.jpg'},
 {id:'leather-embossed-coasters-pack-of-4',n:'Leather Embossed Coasters',p:'$19.99',f:'image_35.png'},
 {id:'hear-me-roar-youth-t-shirt',n:'Hear You Roar Youth Tee',p:'$14.99',f:'Untitled_design_3.png'}];
const BEST=[
 {id:'multi-dino-hoodie',n:'Multi-DINO Hoodie',p:'$91.99',f:'DinoPullover2done.png'},
 {id:'mens-multi-dino-shirt',n:'Men’s Multi-DINO Polo',p:'$45.99',f:'mensmulti_1.png'},
 {id:'sinclair-30-oz-tumbler',n:'Sinclair 30 oz Tumbler',p:'$20.99',f:'Untitled-1_-_31-08-2026_12-20-24_97941999-23a6-4184-afcd-c2d8445abff3.png'},
 {id:'sinclair-dino-and-pump-socks',n:'DINO and Pump Socks',p:'$18.99',f:'Gemini_Generated_Image_zfalpvzfalpvzfal.png'},
 {id:'sinclair-independent-midweight-hooded-sweatshirt',n:'Classic Midweight Hoodie',p:'$36.99',f:'V2-HF-Sinclair-Independent-Midweight-Hooded-Sweatshirt.jpg'},
 {id:'110-year-lapel-pin',n:'110 Year Anniversary Pin',p:'$3.99',f:'Removebackgroundproject_3.png'}];
const WHY=[
 ['history','110 years on the road','DINO has stood by American drivers since 1916. Every piece carries that history with it.'],
 ['verified','Official Sinclair gear','Designed and sold by Sinclair, so you know it’s the real DINO, from the logo to the green.'],
 ['family_restroom','Something for every fan','Polos and hoodies, youth tees, drinkware, golf gear and collector pins.'],
 ['local_shipping','Free shipping over $100','Use code FREESHIP at checkout for free ground shipping.']];
function render(o){const {href,src}=o;const img=(k,i)=>{const s=src(k);return s||` src="${CDN(i.f)}"`};
const prod=(i,k,cls)=>`<a class="mr-p ${cls||''}" href="${S}/products/${i.id}" target="_blank" rel="noopener"><span class="im"><image-slot id="${k}" shape="rect" fit="contain"${img(k,i)} placeholder="${i.n} product photo"></image-slot></span><span class="tx"><b>${i.n}</b><span class="pr">${i.p}</span></span><span class="sr-only">(opens in a new tab)</span></a>`;
const cats=(o.cats||[]).map(c=>X(c.ext,c.name.replace(/^Shop /,''),'mr-cat')).join('');
return `<section class="mr-hero" aria-labelledby="mrH"><div class="mr-hc"><span class="kicker">New in the DINO Store</span><h2 id="mrH">Fresh gear for the road ahead.</h2><p>The newest Sinclair merch just landed, from sunwashed hats and tie-dye tees to drinkware made for long drives.</p><div class="mr-ctas">${X(S+'/collections/new','Shop new arrivals','hbtn red')}${X(S+'/collections/all','Shop all','mr-l')}</div>${cats?`<div class="mr-cats"><small>Shop by category</small><div>${cats}</div></div>`:''}</div>
<div class="mr-new">${NEW.map(i=>prod(i,'mr-new-'+i.id)).join('')}</div></section>
<section class="mr-why" aria-labelledby="mrWH"><div class="mr-wi"><image-slot id="mr-why"${src('mr-why')||` src="${S}/cdn/shop/files/DSC07184.jpg?width=1400"`} shape="rounded" radius="24" placeholder="DINO gear lifestyle photo"></image-slot></div><div class="mr-wc"><span class="kicker">BRING THE DINO HOME</span><h2 id="mrWH">Wear a piece of the road trip.</h2><p>DINO has been the face of Sinclair stations for generations. Our gear lets you take that friendly green giant home, or on your next drive.</p><ul>${WHY.map(([ic,t,d])=>`<li><span class="ms">${ic}</span><div><b>${t}</b><p>${d}</p></div></li>`).join('')}</ul></div></section>
<section class="mr-sec" aria-labelledby="mrBH"><div class="mr-sh"><div><span class="kicker">Best sellers</span><h2 id="mrBH">DINO fan favorites</h2></div>${X(S+'/collections/all','Shop the DINO Store','mr-l')}</div><div class="mr-best">${BEST.map(i=>prod(i,'mr-best-'+i.id)).join('')}</div></section>
<section class="mr-x" aria-labelledby="mrXH"><div class="mr-xc"><span class="kicker">Find a DINO</span><h2 id="mrXH">Now meet the real thing</h2><p>Life-size DINO statues stand at Sinclair stations across the country. Find one near you and snap a photo.</p></div><div class="mr-xa"><a class="hbtn red" href="${href('find-a-dino-statue')}"><span class="ms">pets</span>Find a DINO</a></div></section>`}
window.HFSMerch={render};})();
