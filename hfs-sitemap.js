// Site structure from HFS.pdf — L1 (red) › L2 (blue, clickable) › L3 (yellow). f = features (orange).
window.HFS_SITEMAP = [
{id:'on-the-road',name:'On the Road',children:[
 {id:'find-a-station',name:'Find a Sinclair Station',quick:[{k:'tier-3-gas',name:'Tier 3',label:'Tier 3 Gas Available',f:[['fu','Tier 3']]},{k:'diesel',name:'Diesel',label:'Diesel Available',f:[['fu','Diesel']]},{k:'open-24-7',name:'Open 24/7',label:'Open 24/7',f:[['am','Open 24/7']]},{k:'convenience-store',name:'Convenience Store',label:'Convenience Store Attached',f:[['am','Convenience Store']]}],children:[
  {id:'search-locate',name:'Search by Amenities',filter:true,desc:'Map',menuDesc:false,f:[
   {name:'Amenities Filter',desc:'Diesel, EV Fast Charging, Car Wash, 24/7, Truck Parking, Convenience Store, Hot Food, Fresh Coffee'},
   {name:'Station Details',desc:'Dynamic landing page per location with live pricing, hours, and available fuels'}]},{id:'search-fuel-type',name:'Search by Fuel Type',filter:true}]},
 {id:'driver-tools',name:'Driver Tools',children:[{id:'trip-planner',name:'Trip Planner'},{id:'savings-calculators',name:'Savings Calculator'},{id:'seasonal-guides',name:'Seasonal Guides'},{id:'commercial-products',name:'Commercial Products'}]},
 {id:'quality-fuels',name:'Quality Fuels',children:[{id:'dinocare',name:'DINOCARE® Technology'},{id:'tier-3-gas',name:'Tier 3 Gas'},{id:'e15-gas',name:'E15 Gas'},{id:'elite-diesel',name:'Elite Diesel'}]}]},
{id:'at-the-pump',name:'At the Pump',children:[
 {id:'dinopay',name:'Savings & Rewards',children:[{id:'download-the-apps',name:'Download the Apps'},{id:'mydino-rewards',name:'MyDINO Rewards',desc:'Saved savings, cents-per-gallon discounts, & points breakdown',menuDesc:false},{id:'dinopay-app',name:'DINOPAY'},{id:'help-faqs',name:'Help & FAQs'}]},
 {id:'fuel-savings',name:'Cards & Offers',children:[{id:'active-promotions',name:'Active Promotions'},{id:'sinclair-green-card',name:'Green Card',desc:'Application & account login',menuDesc:false},{id:'sinclair-fleet-card',name:'Fleet Card',desc:'Application & account login',menuDesc:false},{id:'co-branded-credit-cards',name:'Co-Branded Credit Cards'}]},
 {id:'loyalty',name:'Loyalty Program',children:[{id:'program-overview',name:'Program Overview'},{id:'sign-up-access',name:'Sign-Up & Access'},{id:'mobile-advantage',name:'Mobile Advantage'},{id:'current-offers',name:'Current Offers'}]}]},
{id:'in-the-shop',name:'In the Shop',children:[
 {id:'the-dino-story',name:'The DINO Story',children:[{id:'find-a-dino-statue',name:'Find a DINO Statue',desc:'Every statue, nationwide',menuDesc:false},{id:'dino-stories',ext:'https://www.instagram.com/stories/highlights/17848674799886148/',name:'DINO Reels'},{id:'dino-clips',ext:'https://www.tiktok.com/@sinclairdino',name:'DINO Clips'}]},
 {id:'dino-merch',name:'DINO Merch',children:[{id:'shop-accessories',ext:'https://mydinostore.com/collections/accessories-1',name:'Shop Accessories'},{id:'shop-apparel',ext:'https://mydinostore.com/collections/apparel-1',name:'Shop Apparel'},{id:'shop-gear',ext:'https://mydinostore.com/collections/dino-gear-1',name:'Shop Gear'}]},
 {id:'gift-cards',name:'Gift Cards',children:[{id:'buy-gift-cards',ext:'https://sinclairoil.wgiftcard.com/responsive/landing_responsive/landing/sinclairoil',name:'Buy Gift Cards',desc:'eGift or physical',menuDesc:false},{id:'check-gift-card-balance',ext:'https://sinclairoil.wgiftcard.com/rbc/sinclairoil',name:'Check Gift Card Balance'},{id:'bulk-order-request',ext:'https://storefront.wgiftcard.com/responsive_login/sinclairoil',name:'Bulk Order Request'}]}]},
{id:'partner-with-us',name:'Our Network',logins:[{name:'B2B Portal',href:'https://distributors.hfsinclair.com/s/login/?ec=302&startURL=%2Fs%2F'},{name:'Brand Excellence',href:'#'},{name:'Fleet Track Online',href:'#'},{name:'Carriers',href:'#'}],children:[
 {id:'distributors',name:'Distributors',f:[{name:'Link to Portal',href:'login.html'}],children:[{id:'become-a-distributor',name:'Become a Distributor'},{id:'wholesale-supply',name:'Wholesale Supply'},{id:'terminal-map',name:'Terminal Map'}]},
 {id:'dealers',name:'Dealers',f:[{name:'Link to Portal',href:'login.html'}],children:[{id:'become-a-dealer',name:'Become a Dealer',f:[{name:'Dealer Network'}]},{id:'branding-opportunities',name:'Branding Opportunities'},{id:'brand-excellence',name:'Brand Excellence'},{id:'operational-support',name:'Operational Support',desc:'POS systems, DINOPAY integration',menuDesc:false}]},
 {id:'fleets',name:'Fleets',children:[{id:'commercial-programs',name:'Commercial Programs'},{id:'bulk-delivery-services',name:'Bulk Delivery Services'}]},
 {id:'licensees',name:'Licensees',children:[{id:'request-details',name:'Request Details'}]}]},
{id:'our-story',name:'About Us',children:[
 {id:'sinclair-heritage',mw:161,name:'Sinclair Heritage',children:[{id:'sinclair-today',name:'Sinclair Today'},{id:'our-history',name:'Our History Timeline'},{id:'interactive-gallery',name:'Interactive Gallery',desc:'Vintage advertising, historic stations, & parade appearances',menuDesc:false},{id:'our-footprint',name:'Our Footprint'}]},
 {id:'partnerships',mw:181,name:'Partnerships',children:[{id:'fueling-folds-of-honor',name:'Folds of Honor'},{id:'brand-partnerships',name:'Brand Partnerships'},{id:'seasonal-giveaways',name:'Corporate Partnerships'},{id:'sponsorships',name:'Sponsorships'}]},
 {id:'newsroom',mw:136,name:'Newsroom',children:[{id:'press-releases',name:'Press Releases'},{id:'media-kits',name:'Media Kits'},{id:'blog',name:'Blog'},{id:'investor-relations',name:'Investor Relations'}]}]}
];
// Utility pages (eyebrow + footer only)
window.HFS_UTILITY = [
 {id:'ask-sinclair',name:'Ask Sinclair'},{id:'request-a-partnership',name:'Request a Partnership'},{id:'work-with-us',name:'Work with Us'},{id:'contact-us',name:'Contact Us'},{id:'customer-service',name:'Customer Service'},{id:'wholesale-supply',name:'Wholesale Supply'},{id:'newsletter-signup',name:'Newsletter Signup'},{id:'social-media',name:'Social Media'},{id:'hf-sinclair-corporate',ext:'https://www.hfsinclair.com/about-us/corporate-profile/default.aspx',name:'HF Sinclair Corporate'},
 {id:'privacy-policy',name:'Privacy Policy'},{id:'terms-of-use',name:'Terms of Use'},{id:'cookie-policy',name:'Cookie Policy'},{id:'manage-cookies',name:'Manage Cookies'},{id:'accessibility',name:'Accessibility'}
];
window.HFS_FOOTER = [
 [['Find a Station','find-a-station'],['Download DINOPAY','download-the-apps'],['MyDINO Rewards','mydino-rewards'],['DINO Store','@https://mydinostore.com/'],['Loyalty Program','loyalty']],
 [['Become a Distributor','become-a-distributor'],['Wholesale Supply','wholesale-supply'],['Fleet Cards','sinclair-fleet-card'],['Terminal Network','terminal-map'],['Portal Login','@https://www.salesforce.com/']],
 [['Safety Data Sheets','our-history'],['Fuel Quality','quality-fuels'],['Press Releases','press-releases'],['Work with Us','work-with-us'],['HF Sinclair Corporate','hf-sinclair-corporate']],
 [['Contact Us','contact-us']]
];
