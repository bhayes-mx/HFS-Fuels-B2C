(function(){
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const FACTS=[
['1930','DINO wasn’t alone at first. The original 1930 ad campaign featured a dozen different dinosaurs, but the gentle Apatosaurus is the one America fell for.'],
['1932','DINO is pronounced “DYE-NO.” He became so popular that Sinclair registered him as a trademark in 1932.'],
['1903+','DINO was introduced as a Brontosaurus. Sinclair now calls him an Apatosaurus, following the scientific debate that has run since 1903.'],
['1933','A life-size DINO debuted at the 1933 Chicago World’s Fair, built in papier-mâché by the same artist who made creatures for the movies.'],
['1963','DINO first floated over New York as a balloon in the 1963 Macy’s Thanksgiving Day Parade and quickly became a fan favorite.'],
['1975','DINO was named an Honorary Member of the Museum of Natural History in 1975.'],
['1964','For the 1964 New York World’s Fair, DINO and eight friends traveled 125 miles down the Hudson River by barge to reach Dinoland.'],
['70 ft','The World’s Fair DINO was 70 feet long and weighed 20 tons. Sinclair’s ads put his length at “56 kids.”'],
['25¢','At Dinoland, a quarter bought a toy dinosaur molded from Sinclair “Dinofin Plastic” right before your eyes in a Mold-a-Rama machine.'],
['Today','The World’s Fair DINO still stands in Dinosaur Valley State Park in Glen Rose, Texas, next to his old friend the T. rex.'],
['1991','In Disney’s 1991–1994 TV series Dinosaurs, the main family’s last name is Sinclair.'],
['Pixar','The Dinoco brand in Pixar’s Toy Story and Cars is a loving nod to Sinclair and DINO.'],
['2015','DINO returned to the Macy’s Parade in 2015 as a 72-foot balloon, seen by 3.5 million people on the street and 50 million more on TV.'],
['2016','For Sinclair’s 100th birthday in 2016, DINO took a coast-to-coast road trip from California to the Macy’s Parade in New York City.']
];
const POP=[['find-a-station','location_on','Find the nearest station'],['dinopay-app','smartphone','Save with the app'],['active-promotions','sell','Current deals'],['trip-planner','route','Plan your stops'],['find-a-dino-statue','photo_camera','Road trip photo ops'],['the-dino-story','history_edu','Where DINO came from'],['gift-cards','redeem','Buy, reload, check balance'],['faqs','help','Quick answers']];
let fi=Math.floor(Math.random()*FACTS.length);
function fact(){const [k,t]=FACTS[fi];return `<span class="nf-yr">${esc(k)}</span><p class="nf-fact" aria-live="polite">${esc(t)}</p>`}
function render(o){const {href,idx}=o;
 const pop=POP.filter(p=>idx[p[0]]).map(([id,ic,d])=>`<a class="nf-link" href="${href(id)}"><span class="ms">${ic}</span><span><b>${esc(idx[id].n.name)}</b><small>${esc(d)}</small></span><span class="ms nf-go">arrow_forward</span></a>`).join('');
 return `<div class="wrap nf">
<section class="nf-hero"><div class="nf-num" aria-hidden="true"><span>4</span><img src="design-files/dino-silhouette.png" alt=""><span>4</span></div>
<div class="nf-hc"><span class="kicker">Error 404 · Page not found</span><h1>This page went extinct.</h1><p>It may have moved, been renamed or wandered off like a lost Apatosaurus. Let’s get you back on the road.</p>
<form class="nf-search" role="search" id="nf-search"><span class="ms" aria-hidden="true">search</span><label class="sr" for="nf-q">Search the Sinclair site</label><input id="nf-q" type="search" placeholder="Ask Sinclair: stations, DINOPAY, fuels…" autocomplete="off"><button type="submit">Search</button></form>
<div class="nf-acts"><a class="pill green" href="#/"><span class="ms">home</span>Back to Home</a><a class="pill tonal" href="${href('contact-us')}"><span class="ms">support_agent</span>Contact Sinclair</a></div></div></section>
<div class="nf-grid"><section class="nf-pop" aria-labelledby="nf-pop-h"><h2 id="nf-pop-h">Popular destinations</h2><div class="nf-links">${pop}</div></section>
<aside class="nf-dyk" aria-labelledby="nf-dyk-h"><div class="nf-dyk-top"><span class="ms">lightbulb</span><h2 id="nf-dyk-h">Did you know?</h2></div><div id="nf-fact">${fact()}</div><div class="nf-dyk-acts"><button type="button" class="nf-more" id="nf-more"><span class="ms">autorenew</span>Another fact</button><a href="${href('the-dino-story')}">Read the DINO Story<span class="ms">arrow_forward</span></a></div></aside></div>
</div>`}
function mount(){const f=document.getElementById('nf-search');if(f)f.addEventListener('submit',ev=>{ev.preventDefault();const q=document.getElementById('nf-q').value.trim();location.hash='#/ask-sinclair'+(q?'?q='+encodeURIComponent(q):'')});
 const b=document.getElementById('nf-more');if(b)b.addEventListener('click',()=>{let n;do{n=Math.floor(Math.random()*FACTS.length)}while(n===fi);fi=n;document.getElementById('nf-fact').innerHTML=fact()})}
window.HFS404={render,mount};
})();
