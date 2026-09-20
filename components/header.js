import {icon} from './shared.js';
const columns=[
 ['READY TO WEAR','WINTER 26','FALL 26','|','DRESSES AND SKIRTS','SHIRTS AND TOPS','JACKETS AND PANTS','OUTERWEAR','LEATHER','DENIM','KNITWEAR','JERSEY','COATS','LACE AND LINGERIE','VIEW ALL'],
 ['SHOES','BOOTIES','BOOTS','LOAFERS','PUMPS AND SLINGBACKS','MULES','SANDALS','FLAT SANDALS','THONG SANDALS AND BALLERINAS','SNEAKERS'],
 ['HANDBAGS','SHOULDER BAGS','CROSSBODY BAGS','TOP HANDLES','HOBOS','BUCKETS','CLUTCHES AND EVENING','TOTES','MINI BAGS','MICRO BAGS'],
 ['SMALL LEATHER GOODS','WALLETS ON CHAIN','POUCHES','WALLETS','CARD CASES','CASES AND KEYCHAINS'],
 ['ACCESSORIES','BELTS','SUNGLASSES','HATS','GLOVES','SCARVES AND SILK'],
 ['JEWELRY','CUFFS AND BRACELETS','BROOCHES AND RINGS','EARRINGS','NECKLACES','|','LE SOIR','ORGANIC','CASSANDRE','LUCKY CHARMS']
];
const renderColumn=items=>`<div class="mega-column">${items.map((item,i)=>item==='|'?'<span class="mega-spacer"></span>':`<a class="${i===0?'mega-heading':''}" href="#categories">${item}</a>`).join('')}</div>`;
export function renderHeader(){return `<header class="site-header" data-node-id="68:1862"><div class="announcement" data-node-id="68:1863">Limited-Time Offer: Up to XX% Off Selected Rings | Shop Now</div><div class="nav-surface"><div class="header-content" data-node-id="68:1866"><nav class="main-nav" data-node-id="68:1868" aria-label="Main navigation"><a class="nav-item" href="#classic" aria-expanded="false">NEW ARRIVALS</a><a class="nav-item" href="#identity" aria-expanded="false">FUNDAMENTALS</a><a class="nav-item" href="#categories" aria-expanded="false">READY TO WEAR</a><a class="nav-item" href="#stories" aria-expanded="false">ABOUT</a></nav><a class="logo" href="#hero" aria-label="TU home" data-node-id="68:1874"></a><div class="header-icons" data-node-id="68:1878">${icon('user-new','Account')}${icon('globe-new','Region')}${icon('search-new','Search')}${icon('cart-new','Shopping bag')}</div></div><div class="mega-menu" data-node-id="68:1893" aria-hidden="true">${columns.map(renderColumn).join('')}</div></div></header>`}
