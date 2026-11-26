const decode=s=>s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi,(m,k)=>{try{return k[0]==='#'?String.fromCodePoint(k[1].toLowerCase()==='x'?parseInt(k.slice(2),16):Number(k.slice(1))):({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"}[k]??m)}catch{return m}});
const tag=(s,k)=>decode(s.match(new RegExp(`<${k}(?:\\s[^>]*)?>([\\s\\S]*?)</${k}>`,'i'))?.[1]||'').trim();
export default async req=>{
 if(req.method!=='GET')return new Response('Method not allowed',{status:405});
 const q=new URL(req.url).searchParams.get('q')?.trim();
 if(!q||q.length>220)return Response.json({error:'検索条件が不正です'},{status:400});
 try{const u=new URL('https://news.google.com/rss/search');u.search=new URLSearchParams({q,hl:'ja',gl:'JP',ceid:'JP:ja'});const r=await fetch(u,{signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error('RSS unavailable');const xml=await r.text();if(!xml.includes('<rss'))throw Error('Invalid RSS');const items=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0,30).map(([,s])=>({id:tag(s,'guid')||tag(s,'link'),title:tag(s,'title'),url:tag(s,'link'),source:tag(s,'source'),published:tag(s,'pubDate')})).filter(x=>x.title&&x.id&&/^https:\/\//.test(x.url));return Response.json({items},{headers:{'Cache-Control':'public, max-age=900, s-maxage=3600'}})}catch{return Response.json({error:'情報取得に失敗しました。時間をおいて再試行してください。'},{status:502})}
};
