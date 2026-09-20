export const image=(src,alt='',eager=false)=>`<img src="${src}" alt="${alt}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
export const caption=m=>`<div class="caption"><h2>${m.title}</h2><a class="text-link" href="${m.target||'#edit'}">${m.link||'DISCOVER'}</a></div>`;
export const icon=(name,label,className='')=>`<span class="icon ${className}" ${label?`role="img" aria-label="${label}"`:'aria-hidden="true"'}>${image(`assets/${name}.svg`)}</span>`;
