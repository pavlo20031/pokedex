(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const se=document.querySelector(".hero__list"),Re=({pokemons:e,types:t,generations:s})=>{se.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${s} поколінь</p>
    </li>
    ${se.innerHTML}
  `};async function je(){try{const[e,t,s]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),i=await e.json(),n=await t.json(),o=await s.json();Re({pokemons:i.count,types:n.count,generations:o.count})}catch(e){console.error(e)}}se&&je();const x="https://pokeapi.co/api/v2/",Oe=1025,De=["grass","poison","fire","water","bug","electric","psychic","normal","ghost","flying","ice","ground","fighting","rock","dragon","dark","steel","fairy"],Fe={"generation-i":"Покоління I","generation-ii":"Покоління II","generation-iii":"Покоління III","generation-iv":"Покоління IV","generation-v":"Покоління V","generation-vi":"Покоління VI","generation-vii":"Покоління VII","generation-viii":"Покоління VIII","generation-ix":"Покоління IX"},W=e=>Number(e.split("/").filter(Boolean).pop());async function He(e=Oe){const t=fetch(`${x}pokemon?limit=${e}`).then(r=>r.json()),s=De.map(r=>fetch(`${x}type/${r}`).then(c=>c.json())),i=Array.from({length:9},(r,c)=>fetch(`${x}generation/${c+1}`).then(l=>l.json())),[n,o,d]=await Promise.all([t,Promise.all(s),Promise.all(i)]),p={};o.forEach(r=>{r.pokemon.forEach(c=>{const l=W(c.pokemon.url);l>e||(p[l]||(p[l]=[])).push({slot:c.slot,name:r.name})})});const f={};return d.forEach((r,c)=>{r.pokemon_species.forEach(l=>{f[W(l.url)]=c+1})}),n.results.map(r=>{const c=W(r.url),l=(p[c]||[]).sort((a,u)=>a.slot-u.slot).map(a=>a.name);return{id:c,name:r.name,types:l,gen:f[c]||0,sprites:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${c}.png`}})}async function G(e=[],t=[],s=!0){var p,f;let i=Array.isArray(e)?e:[],n=Array.isArray(t)?[...t]:[t];if(n.length===0&&i.length>0){let r=null;for(let c of i){if(!c||!c.type)continue;let l=[];if(c.type==="gen"&&c.value)l=(await(await fetch(`${x}generation/${c.value}`)).json()).pokemon_species.map(u=>u.name);else if(c.type==="searchByTypes"&&Array.isArray(c.types)&&c.types.length>0){let a=c.types.map(h=>fetch(`${x}type/${h}`).then(y=>y.json())),m=(await Promise.all(a)).filter(h=>h&&h.pokemon).map(h=>h.pokemon.map(y=>y.pokemon.name));m.length>0&&(l=m.reduce((h,y)=>h.filter(k=>y.includes(k)),m[0]))}l.length>0&&(r=r?r.filter(a=>l.includes(a)):l)}r&&(n=r)}else if(n.length>0&&i.length>0){for(let r of i)if(!(!r||!r.type)){if(r.type==="gen"&&r.value){let l=(await(await fetch(`${x}generation/${r.value}`)).json()).pokemon_species.map(a=>a.name);n=n.filter(a=>l.includes(String(a).toLowerCase()))}else if(r.type==="searchByTypes"&&Array.isArray(r.types)){let c=r.types.map(u=>fetch(`${x}type/${u}`).then(m=>m.json())),a=(await Promise.all(c)).filter(u=>u&&u.pokemon).map(u=>u.pokemon.map(m=>m.pokemon.name));if(a.length>0){let u=a.reduce((m,h)=>m.filter(y=>h.includes(y)),a[0]);n=n.filter(m=>u.includes(String(m).toLowerCase()))}}}}let o=[];for(let r of n){let c=await fetch(`${x}pokemon/${r}`);if(!c.ok)continue;let l=await c.json(),a=l.stats.map(P=>P.base_stat),u=await fetch(`${x}pokemon-species/${l.id}`);if(!u.ok)continue;let m=await u.json(),h=[],y=[];if(s&&((p=m.evolution_chain)!=null&&p.url)){let P=await fetch(m.evolution_chain.url);if(P.ok){let E=(await P.json()).chain;for(;E;){if(E.species&&E.species.name){h.push(E.species.name);let I=E.species.url.split("/").filter(Boolean),F=I[I.length-1];y.push({id:F,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${F}.png`})}E=E.evolves_to&&E.evolves_to.length>0?E.evolves_to[0]:null}}}const k=((f=m.flavor_text_entries.find(P=>P.language.name==="en"))==null?void 0:f.flavor_text.replace(/\f/g," "))||"";let $={id:l.id,name:l.name,type:l.types,types:l.types.map(P=>P.type.name),height:l.height/10+"m",weight:l.weight/10+"kg",abilities:l.abilities,hp:a[0],a:a[1],d:a[2],spA:a[3],spD:a[4],spe:a[5],sprites:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${l.id}.png`,description:k,generation:Fe[m.generation.name],chain:h,evodata:y};o.push($)}let d=i.find(r=>r&&r.type==="sort");return d&&d.field&&d.order&&o.sort((r,c)=>{let l=r[d.field],a=c[d.field];return d.order==="desc"?a-l:l-a}),o}const D="/pokedex/assets/symbol-defs-a3682fdc.svg",j=document.querySelector(".btn-icon"),fe=j==null?void 0:j.querySelector("use"),_e=document.querySelector(".header__burger-btn"),B=document.querySelector(".header__nav");function ne(e){if(fe){const t=e?"sun":"moon";fe.setAttribute("href",`${D}#${t}`)}}const Ue=localStorage.getItem("theme");Ue==="dark"?(document.body.classList.add("dark-theme"),ne(!0)):ne(!1);j==null||j.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),ne(e)});_e&&B&&(_e.addEventListener("click",()=>{B.classList.toggle("is-open")}),B.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{B.classList.remove("is-open")})}));function Be(){function e(){try{const t=localStorage.getItem("likedPokemons"),s=t?JSON.parse(t):[],i=Array.isArray(s)?s.length:0;document.querySelectorAll(".header__nav-badge").forEach(n=>{n.textContent=i})}catch(t){console.error("Error updating header counter:",t)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("favorites:changed",e),window.addEventListener("storage",t=>{t.key==="likedPokemons"&&e()})}Be();const ae=document.querySelector(".world__list"),Je=({pokemons:e,types:t,generations:s})=>{ae.innerHTML=`
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${e}</span> покемонів
      </p>
    </li>
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${t}</span> типів
      </p>
    </li>
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${s}</span> поколінь
      </p>
    </li>
    ${ae.innerHTML}
  `};async function Ye(){try{const[e,t,s]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),i=await e.json(),n=await t.json(),o=await s.json();Je({pokemons:i.count,types:n.count,generations:o.count})}catch(e){console.error("Помилка:",e)}}ae&&Ye();const Ve="/pokedex/assets/search-pokemon-8fef02cf.png",Z=10,Ke=1025,Xe=2,Pe="likedPokemons",X={grass:"Трав'яний",poison:"Отруйний",fire:"Вогняний",water:"Водний",bug:"Комаха",electric:"Електричний",psychic:"Психічний",normal:"Звичайний",ghost:"Примарний",flying:"Летючий",ice:"Крижаний",ground:"Земляний",fighting:"Бойовий",rock:"Кам'яний",dragon:"Дракон",dark:"Темний",steel:"Сталевий",fairy:"Казковий"},ee=["I","II","III","IV","V","VI","VII","VIII","IX"],ge=()=>JSON.parse(localStorage.getItem(Pe))||[],ze=e=>localStorage.setItem(Pe,JSON.stringify(e)),he=e=>e.split("-").map(t=>t[0].toUpperCase()+t.slice(1)).join(" ");function ye(e){const t=e%10,s=e%100;return t===1&&s!==11?"покемон":t>=2&&t<=4&&(s<12||s>14)?"покемони":"покемонів"}function Ge(e,t=[]){const s=String(e.id).padStart(3,"0"),i=e.sprites||`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.id}.png`,n=t.includes(e.id),d=(Array.isArray(e.types)?e.types:Array.isArray(e.type)?e.type.map(p=>{var f;return((f=p.type)==null?void 0:f.name)||p}):[]).map(p=>`<li class="type-badge type-badge--${p}">${X[p]||p}</li>`).join("");return`
    <li class="pokemon-card" data-id="${e.id}">
      <div class="pokemon-card__top">
        <span class="pokemon-card__num">#${s}</span>
        <button class="pokemon-card__fav ${n?"is-active":""}" type="button" aria-label="Додати в улюблені">
          <svg class="icon icon__stroke"><use href="${D}#heart"></use></svg>
        </button>
      </div>
      <img class="pokemon-card__img" src="${i}" alt="${he(e.name)}" loading="lazy" width="475" height="475" />
      <h3 class="pokemon-card__name">${he(e.name)}</h3>
      <ul class="pokemon-card__types">${d}</ul>
    </li>`}function Qe([e=".search-cards",t=".search-controls-button"]=[],s=".search-input",i=".search-results-count"){const n=document.querySelector(".search-section")||document.body,o=n.querySelector(s),d=n.querySelector(".search-input-box"),p=n.querySelector(".filters-wrappers"),f=n.querySelector('[data-action="filter-type"]'),r=n.querySelector('[data-action="filter-generation"]'),c=n.querySelector('[data-action="sort-number"]'),l=n.querySelector(i),a={all:[],query:"",types:[],gen:0,order:"asc",shown:Z};let u=d==null?void 0:d.querySelector(".search-clear");!u&&d&&(u=document.createElement("button"),u.type="button",u.className="search-clear",u.hidden=!0,u.setAttribute("aria-label","Очистити пошук"),u.textContent="×",d.append(u));const m=document.createElement("div");m.className="filter-panel",m.hidden=!0,m.innerHTML=`
    <div class="filter-panel__head">
      <h3 class="filter-panel__title">Тип покемона</h3>
      <button class="filter-panel__reset" type="button" data-action="reset-filters">Скинути</button>
    </div>
    <div class="filter-panel__types">
      ${Object.entries(X).map(([b,v])=>`<button class="type-badge type-badge--${b}" type="button" data-type="${b}">${v}</button>`).join("")}
    </div>
    <div class="filter-panel__gens">
      <span class="filter-panel__label">Покоління</span>
      <button class="gen-chip" type="button" data-gen="0">Усі</button>
      ${ee.map((b,v)=>`<button class="gen-chip" type="button" data-gen="${v+1}">${b}</button>`).join("")}
    </div>`;const h=document.createElement("div");h.className="active-filters",h.hidden=!0;let y=n.querySelector(e)||n.querySelector(".pokemon-grid");y||(y=document.createElement("ul")),y.classList.add("pokemon-grid");let k=n.querySelector(".empty-state");k||(k=document.createElement("div"),k.className="empty-state",k.hidden=!0,k.innerHTML=`
  <button
    class="empty-state__img-btn"
    type="button"
    aria-label="Відкрити модалку"
  >
    <img
      class="empty-state__img"
      src="${Ve}"
      alt="Нічого не знайдено"
      width="120"
      height="120"
    />
  </button>

  <h3 class="empty-state__title">Нічого не знайдено</h3>

  <p class="empty-state__text"></p>

  <button
    class="btn btn-reset"
    type="button"
    data-action="reset-all"
  >
  <svg class="search-icons">
  <use href="${D}#update"></use>
</svg>
    Скинути всі фільтри
  </button>

  <button
    class="empty-state__back"
    type="button"
    data-action="reset-all"
  >
    Повернутися до каталогу
  </button>
`);let $=n.querySelector(t)||n.querySelector('[data-action="show-more"]');$||($=document.createElement("button"),$.type="button"),$.classList.add("btn","btn-more"),$.dataset.action="show-more",$.hidden=!0,p?(p.after(m,h),y.parentElement||h.after(y),k.parentElement||y.after(k),$.parentElement||k.after($)):y.parentElement&&(y.before(m,h),k.parentElement||y.after(k),$.parentElement||k.after($));function P(){const b=a.query.trim().toLowerCase().replace("#",""),v=a.all.filter(g=>!(b&&!g.name.includes(b)&&!String(g.id).padStart(3,"0").includes(b)||!a.types.every(L=>g.types.includes(L))||a.gen&&g.gen!==a.gen));return v.sort((g,L)=>a.order==="asc"?g.id-L.id:L.id-g.id),v}function ce(b){if(f){const g=a.types.length===0?"Усі типи":a.types.length===1?X[a.types[0]]:`Типів: ${a.types.length}`,L=f.querySelector("span");L&&(L.textContent=g),f.classList.toggle("is-active",a.types.length>0),f.classList.toggle("is-open",!m.hidden)}if(r){const g=r.querySelector("span");g&&(g.textContent=a.gen?`Покоління ${ee[a.gen-1]}`:"Усі покоління"),r.classList.toggle("is-active",a.gen>0),r.classList.toggle("is-open",!m.hidden)}if(c){const g=c.querySelector("span");g&&(g.textContent=`За номером ${a.order==="asc"?"↑":"↓"}`)}m.querySelectorAll("[data-type]").forEach(g=>{g.classList.toggle("is-active",a.types.includes(g.dataset.type))}),m.querySelectorAll("[data-gen]").forEach(g=>{g.classList.toggle("is-active",Number(g.dataset.gen)===a.gen)}),u&&(u.hidden=!a.query);const v=a.types.length>0||a.gen>0;if(h.hidden=!v,v){const g=a.types.map(A=>`<span class="active-chip">${X[A]}<button type="button" data-remove-type="${A}" aria-label="Прибрати фільтр">×</button></span>`).join(""),L=a.gen?`<span class="active-chip">Покоління ${ee[a.gen-1]}<button type="button" data-remove-gen aria-label="Прибрати фільтр">×</button></span>`:"";h.innerHTML=`${g}${L}
        <button class="active-filters__reset" type="button" data-action="reset-filters">Скинути всі</button>
        <span class="active-filters__count">Знайдено ${b} ${ye(b)}</span>`}}function E(){const b=P(),v=b.slice(0,a.shown),g=!!(a.query.trim()||a.types.length||a.gen),L=ge();if(y.innerHTML=v.map(A=>Ge(A,L)).join(""),y.hidden=b.length===0,k.hidden=b.length!==0,b.length===0){const A=k.querySelector(".empty-state__text");A&&(A.textContent=a.query.trim()?`Ми не знайшли покемонів за запитом «${a.query.trim()}». Спробуй змінити назву або скинути фільтри.`:"За такими фільтрами покемонів немає. Спробуй змінити параметри.")}if(b.length===0)$.style.display="none";else{const A=b.length-v.length;$.style.display=A>0?"block":"none",$.textContent=`Загрузити покемонів (${A})`}l&&(l.textContent=g?`Знайдено ${b.length} ${ye(b.length)}`:`Показано ${v.length} із ${a.all.length.toLocaleString("uk-UA")} покемонів`),ce(b.length)}function I(){a.shown=Z,E()}function F(){a.types=[],a.gen=0,I()}function xe(){a.query="",o&&(o.value=""),m.hidden=!0,F()}function Ce(){m.hidden=!m.hidden,E()}let de;o&&o.addEventListener("input",()=>{clearTimeout(de),de=setTimeout(()=>{a.query=o.value,I()},250)}),n.addEventListener("click",b=>{const v=b.target;if(v.closest(".search-clear"))return a.query="",o&&(o.value="",o.focus()),I();if(v.closest('[data-action="filter-type"], [data-action="filter-generation"]'))return Ce();if(v.closest('[data-action="sort-number"]'))return a.order=a.order==="asc"?"desc":"asc",I();if(v.closest('[data-action="reset-filters"]'))return F();if(v.closest('[data-action="reset-all"]'))return xe();if(v.closest('[data-action="show-more"]')||v.closest(t))return a.shown+=Z,E();const g=v.closest("[data-type]");if(g){const q=g.dataset.type;return a.types=a.types.includes(q)?a.types.filter(H=>H!==q):a.types.length<Xe?[...a.types,q]:a.types,I()}const L=v.closest("[data-gen]");if(L)return a.gen=Number(L.dataset.gen),I();const A=v.closest("[data-remove-type]");if(A)return a.types=a.types.filter(q=>q!==A.dataset.removeType),I();if(v.closest("[data-remove-gen]"))return a.gen=0,I();const Q=v.closest(".pokemon-card__fav");if(Q){const q=Number(Q.closest(".pokemon-card").dataset.id),H=ge(),ue=H.includes(q)?H.filter(Me=>Me!==q):[...H,q];ze(ue);const me=ue.includes(q);Q.classList.toggle("is-active",me),document.dispatchEvent(new CustomEvent("favorites:changed",{detail:{id:q,liked:me}}));return}const pe=v.closest(".pokemon-card");pe&&document.dispatchEvent(new CustomEvent("pokemon:open",{detail:{id:Number(pe.dataset.id)}}))}),window.addEventListener("storage",E);async function Te(){l&&(l.textContent="Завантаження...");try{a.all=await He(Ke),E()}catch(b){console.error(b),l&&(l.textContent="Не вдалося завантажити покемонів")}}Te()}const ve=document.querySelector(".easteregg__button"),be=document.querySelector(".easteregg__btn"),J=document.querySelector(".backdrop");if(ve&&be&&J){const e=()=>{J.style.display="flex"},t=()=>{J.style.display="none"};ve.addEventListener("click",t),be.addEventListener("click",t),document.addEventListener("click",s=>{s.target.closest(".empty-state__img-btn")&&e()}),window.addEventListener("keydown",s=>{s.key==="Escape"&&t()}),J.addEventListener("click",s=>{s.target===s.currentTarget&&t()})}const ke=document.querySelector(".btn-random"),$e=document.querySelector(".random__btn"),Y=document.querySelector(".backdrops"),we=document.querySelector(".random__box"),Se=document.querySelector(".random__button"),We={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"};function Ze(e){const t=e.type.map(n=>`
      <li class="random__items">
        <p class="random__types random__${n.type.name}">
          ${We[n.type.name]||n.type.name}
        </p>
      </li>
    `).join("");we.innerHTML=`
    <div class="random__position">
      <p class="random__number">
        #${String(e.id).padStart(3,"0")}
      </p>

      <img
        class="random__img random__img${e.type[0].type.name}"
        src="${e.sprites}"
        alt="${e.name}"
      />
    </div>

    <div>
      <div class="random__info">
        <div>
          <p class="random__subtitle">
            #${String(e.id).padStart(3,"0")} ·
            ${e.generation}
          </p>

          <h2 class="random__title">
            ${e.name.charAt(0).toUpperCase()+e.name.slice(1)}
          </h2>
        </div>

        <button class="random__like" type="button">
          <svg class="random__icon">
            <use href="${D}#heart"></use>
          </svg>
        </button>
      </div>

      <ul class="random__lists">
        ${t}
      </ul>

      <p class="random__subtitle random__desc">
        ${e.description}
      </p>

      <div class="random__params">
        <p class="random__subtitle">
          Зріст:
          ${e.height.replace(".",",").replace("m"," м")}
        </p>

        <p class="random__subtitle">
          Вага:
          ${e.weight.replace(".",",").replace("kg"," кг")}
        </p>
      </div>

      <ul class="random__list">
        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">HP</p>
            <p class="random__stats">${e.hp}</p>
          </div>
          <progress
            class="random__progress"
            value="${e.hp}"
            max="255"
          ></progress>
        </li>

        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">Атака</p>
            <p class="random__stats">${e.a}</p>
          </div>
          <progress
            class="random__progress"
            value="${e.a}"
            max="255"
          ></progress>
        </li>

        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">Захист</p>
            <p class="random__stats">${e.d}</p>
          </div>
          <progress
            class="random__progress"
            value="${e.d}"
            max="255"
          ></progress>
        </li>

        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">Спец. атака</p>
            <p class="random__stats">${e.spA}</p>
          </div>
          <progress
            class="random__progress"
            value="${e.spA}"
            max="255"
          ></progress>
        </li>

        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">Спец. захист</p>
            <p class="random__stats">${e.spD}</p>
          </div>
          <progress
            class="random__progress"
            value="${e.spD}"
            max="255"
          ></progress>
        </li>

        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">Швидкість</p>
            <p class="random__stats">${e.spe}</p>
          </div>
          <progress
            class="random__progress"
            value="${e.spe}"
            max="255"
          ></progress>
        </li>
      </ul>
    </div>
  `;const s=we.querySelector(".random__like");(JSON.parse(localStorage.getItem("likedPokemons"))||[]).includes(e.id)&&s.classList.add("liked"),s.addEventListener("click",()=>{const n=JSON.parse(localStorage.getItem("likedPokemons"))||[];if(n.includes(e.id)){const o=n.filter(d=>d!==e.id);localStorage.setItem("likedPokemons",JSON.stringify(o)),s.classList.remove("liked")}else n.push(e.id),localStorage.setItem("likedPokemons",JSON.stringify(n)),s.classList.add("liked");document.dispatchEvent(new Event("favorites:changed"))})}async function Ee(){const e=Math.floor(Math.random()*1025)+1,[t]=await G([],[e]);t&&Ze(t)}if(ke&&$e&&Y){const e=async()=>{Y.style.display="flex",await Ee()},t=()=>{Y.style.display="none"};ke.addEventListener("click",e),$e.addEventListener("click",t),Se&&Se.addEventListener("click",Ee),window.addEventListener("keydown",s=>{s.key==="Escape"&&t()}),Y.addEventListener("click",s=>{s.target===s.currentTarget&&t()})}Qe([".search-cards",".search-controls-button"],".search-input",".search-results-count");const R=document.querySelector(".favorites__list"),C=document.querySelector(".favorites__input"),T=document.querySelector('.favorites__btn[data-action="sort-number"]'),Le=document.querySelector(".favorites__span"),Ae=document.querySelector(".favorites__empty"),S={allFavorites:[],searchQuery:"",searchMode:"name"},et={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},tt=`
<li class="favorites__item">
  <article class="favorites__article">
    <div class="favorites__header">
      <span class="favorites__id">#<var>id</var></span>
      <button type="button" class="favorites__button" data-id="<var>rawId</var>" aria-label="Видалити з улюблених">
        <svg class="favorites__heart">
          <use href="${D}#heart"></use>
        </svg>
      </button>
    </div>
    <div class="favorites__img-box"> <!-- Changed from favorites__box -->
      <img src="<var>sprites</var>" alt="<var>name</var>" class="favorites__image" loading="lazy">
    </div>
    <div class="favorites__content">
      <h2 class="favorites__name"><var>name</var></h2>
      <div class="favorites__types">
        <var>typesHtml</var>
      </div>
    </div>
  </article>
</li>
`;function st(e){return!Array.isArray(e)||e.length===0?"":e.map(t=>{const s=t.id,i=String(t.id).padStart(3,"0"),n=t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",o=t.sprites||"",d=Array.isArray(t.type)?t.type.map(f=>{var l;const r=((l=f==null?void 0:f.type)==null?void 0:l.name)||"",c=et[r]||r;return`<span class="favorites__type favorites__type--${r}">${c}</span>`}).join(""):"",p={rawId:s,id:i,name:n,sprites:o,typesHtml:d};return tt.replace(/<var>(.*?)<\/var>/g,(f,r)=>{const c=r.trim();return p[c]!==void 0?p[c]:""})}).join("")}function nt(e){Le&&(Le.textContent=e)}function O(){const e=C?C.value.trim().toLowerCase():S.searchQuery;let t=S.allFavorites.filter(s=>e?S.searchMode==="id"?String(s.id).includes(e):s.name.toLowerCase().includes(e):!0);R&&(R.innerHTML=st(t)),Ae&&(Ae.hidden=t.length>0),nt(S.allFavorites.length)}async function at(){try{const e=localStorage.getItem("likedPokemons");console.log("Raw localStorage likedPokemons:",e);const t=e?JSON.parse(e):[];if(console.log("Parsed saved IDs:",t),!Array.isArray(t)||t.length===0){S.allFavorites=[],O();return}const s=await G([],t,!1);console.log("Fetched pokemons data from API:",s),S.allFavorites=Array.isArray(s)?s:[],O()}catch(e){console.error("Помилка завантаження улюблених покемонів:",e)}}let Ie;C==null||C.addEventListener("input",e=>{clearTimeout(Ie),S.searchQuery=e.target.value,Ie=setTimeout(()=>{O()},300)});T==null||T.addEventListener("click",()=>{S.searchMode=S.searchMode==="name"?"id":"name";const e=T.querySelector(".favorites__tablet"),t=T.querySelector(".favorites__mobile");S.searchMode==="id"?(e&&(e.textContent="Пошук за номером ←"),t&&(t.textContent="За № ←"),T.classList.add("is-active"),C&&(C.placeholder="Введіть номер покемона...")):(e&&(e.textContent="Пошук за назвою ←"),t&&(t.textContent="За назвою ←"),T.classList.remove("is-active"),C&&(C.placeholder="Пошук за назвою або номером...")),O()});R==null||R.addEventListener("click",e=>{const t=e.target.closest(".favorites__button");if(!t)return;const s=Number(t.dataset.id);let i=JSON.parse(localStorage.getItem("likedPokemons"))||[];i=i.filter(n=>Number(n)!==s),localStorage.setItem("likedPokemons",JSON.stringify(i)),S.allFavorites=S.allFavorites.filter(n=>n.id!==s),O(),document.dispatchEvent(new Event("favorites:changed"))});document.addEventListener("favorites:changed",async e=>{const{id:t,liked:s}=e.detail||{},i=Number(t);if(Number.isFinite(i)){if(R){if(s){if(!S.allFavorites.some(o=>Number(o.id)===i))try{const[o]=await G([],[i],!1);o&&S.allFavorites.push(o)}catch(o){console.error("Error adding favorite:",o)}}else S.allFavorites=S.allFavorites.filter(n=>Number(n.id)!==i);O()}initHeaderCounter()}});R&&at();const ot="https://pokeapi.co/api/v2",_=document.querySelector("[data-details-backdrop]"),V=_==null?void 0:_.querySelector("[data-details-content]"),K=_==null?void 0:_.querySelector("[data-details-toolbar-id]"),te=_==null?void 0:_.querySelectorAll("[data-details-close]"),it=document.querySelectorAll(".search-cards, .favorites__list");let oe=null;const rt={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},lt={static:"Статика","lightning-rod":"Блискавковідвід",overgrow:"Заростання",blaze:"Спалах",torrent:"Потік","shield-dust":"Захисний пил","compound-eyes":"Складні очі",swarm:"Рій","keen-eye":"Гострий зір","run-away":"Втеча",intimidate:"Залякування",levitate:"Левітація",pressure:"Тиск",adaptability:"Адаптивність",synchronize:"Синхронізація","inner-focus":"Внутрішній фокус"},ct=[["hp","HP"],["a","Атака"],["d","Захист"],["spA","Спец. атака"],["spD","Спец. захист"],["spe","Швидкість"]];let ie=null,U=0,M=null;function w(e=""){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function z(e){return String(e).padStart(3,"0")}function re(){try{const e=JSON.parse(localStorage.getItem("likedPokemons")||"[]");return Array.isArray(e)?e.map(Number):[]}catch(e){return console.error("Не вдалося прочитати список обраного:",e),[]}}function dt(){const e=re().length;document.querySelectorAll(".header__nav-badge").forEach(t=>{t.textContent=e})}function qe(e,t){const s=Number.parseFloat(e);return Number.isFinite(s)?`${s.toFixed(1).replace(".",",")} ${t}`:`${e||"—"} ${t}`}function pt(e){var i,n,o;const t=((i=e.abilities)==null?void 0:i.find(d=>!d.is_hidden))||((n=e.abilities)==null?void 0:n[0]),s=(o=t==null?void 0:t.ability)==null?void 0:o.name;return s?lt[s]||s.replace(/-/g," ").replace(/\b\w/g,d=>d.toUpperCase()):"—"}function ut(e=[]){return e.map(t=>{var n;const s=((n=t==null?void 0:t.type)==null?void 0:n.name)||"",i=rt[s]||s;return`<span class="pokemon-details__type pokemon-details__type--${w(s)}">${w(i)}</span>`}).join("")}function mt(e){var n,o,d;const t=((d=(o=(n=e.type)==null?void 0:n[0])==null?void 0:o.type)==null?void 0:d.name)||"normal",s=ct.map(([p,f])=>({label:f,value:Number(e[p])||0}));return`
    <section class="pokemon-details__section pokemon-details__stats-section">
      <div class="pokemon-details__section-heading">
        <h3>Базові характеристики</h3>
        <span>Разом: <strong>${s.reduce((p,f)=>p+f.value,0)}</strong></span>
      </div>

      <ul class="pokemon-details__stats">
        ${s.map(({label:p,value:f})=>`
          <li class="pokemon-details__stat">
            <span class="pokemon-details__stat-name">${p}</span>

            <span class="pokemon-details__stat-value">${f}</span>

            <progress
              class="pokemon-details__progress pokemon-details__progress--${w(t)}"
              value="${Math.min(f,255)}"
              max="255"
              aria-label="${p}: ${f}"
            ></progress>
          </li>
        `).join("")}
      </ul>
    </section>
  `}function ft(e){const t=Array.isArray(e.evolutionPath)?e.evolutionPath:[];return t.length?`
    <section class="pokemon-details__section pokemon-details__evolution-section">
      <h3>Еволюційний ланцюг</h3>
      <div class="pokemon-details__evolutions">
        ${t.map((s,i)=>{const n=Number(s.id),o=s.name,d=n===Number(e.id),p=t[i+1];return`
            <button
              class="pokemon-details__evolution ${d?"is-current":""}"
              type="button"
              data-evolution-id="${n}"
              aria-current="${d?"true":"false"}"
              aria-label="Відкрити ${w(o)}"
            >
              <span class="pokemon-details__evolution-image">
                <img
                  src="${w(s.img)}"
                  alt="${w(o)}"
                  loading="lazy"
                >
              </span>

              <span class="pokemon-details__evolution-name">
                ${w(o.charAt(0).toUpperCase()+o.slice(1))}
              </span>

              <span class="pokemon-details__evolution-id">
                #${z(n)}
              </span>

            </button>

            ${p?`
                  <div class="pokemon-details__evolution-step">

                    <span class="pokemon-details__evolution-arrow" aria-hidden="true">
                      →
                    </span>

                    <span class="pokemon-details__evolution-method">
                      ${w(vt(p))}
                    </span>

                  </div>
                `:""}
          `}).join("")}

      </div>
    </section>
  `:`
      <section class="pokemon-details__section pokemon-details__evolution-section">
        <h3>Еволюційний ланцюг</h3>

        <p class="pokemon-details__no-evolution">
          Інформація про еволюцію відсутня.
        </p>
      </section>
    `}function _t(e){return Number(e.split("/").filter(Boolean).pop())}async function gt(e){var l,a;const t=await fetch(`${ot}/pokemon-species/${e}/`);if(!t.ok)throw new Error("Failed to fetch Pokémon species.");const i=(l=(await t.json()).evolution_chain)==null?void 0:l.url;if(!i)return[];const n=await fetch(i);if(!n.ok)throw new Error("Failed to fetch evolution chain.");const o=await n.json();function d(u){const m=_t(u.species.url);return{id:m,name:u.species.name,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${m}.png`,evolutionDetails:u.evolution_details||[]}}function p(u,m=[]){const h=d(u),y=[...m,h];if(h.id===Number(e))return{path:y,node:u};for(const k of u.evolves_to||[]){const $=p(k,y);if($)return $}return null}const f=p(o.chain);if(!f)return[];const r=[...f.path];let c=f.node;for(;(a=c.evolves_to)!=null&&a.length;){const u=c.evolves_to.find(m=>{var h;return(h=m.evolution_details)==null?void 0:h.some(y=>y.is_default)})||c.evolves_to[0];r.push(d(u)),c=u}return r}const ht={"moon-stone":"Місячний камінь","thunder-stone":"Громовий камінь","fire-stone":"Вогняний камінь","water-stone":"Водяний камінь","leaf-stone":"Листовий камінь","sun-stone":"Сонячний камінь","ice-stone":"Крижаний камінь","dusk-stone":"Сутінковий камінь","dawn-stone":"Світанковий камінь","shiny-stone":"Блискучий камінь","kings-rock":"Королівський камінь","metal-coat":"Металеве покриття"};function N(e){const t=typeof e=="string"?e:e==null?void 0:e.name;return t?t.replace(/-/g," ").replace(/\b\w/g,s=>s.toUpperCase()):""}function yt(e){var i,n,o,d,p,f,r,c,l;const t=[],s=(i=e.trigger)==null?void 0:i.name;if((n=e.item)!=null&&n.name){const a=e.item.name;t.push(`Використати ${ht[a]||N(a)}`)}if((o=e.held_item)!=null&&o.name&&t.push(`Тримати ${N(e.held_item)}`),e.min_level!=null&&t.push(`Рівень ${e.min_level}+`),e.min_happiness!=null&&t.push(`Дружба ≥ ${e.min_happiness}`),e.min_affection!=null&&t.push(`Прихильність ≥ ${e.min_affection}`),e.min_beauty!=null&&t.push(`Краса ≥ ${e.min_beauty}`),e.time_of_day){const a={day:"вдень",night:"вночі"}[e.time_of_day]||e.time_of_day;t.push(`Еволюціонувати ${a}`)}if(e.gender===1?t.push("Лише жіноча стать"):e.gender===2&&t.push("Лише чоловіча стать"),(d=e.location)!=null&&d.name&&t.push(`Локація: ${N(e.location)}`),(p=e.known_move)!=null&&p.name&&t.push(`Знати рух ${N(e.known_move)}`),(f=e.known_move_type)!=null&&f.name&&t.push(`Знати рух типу ${N(e.known_move_type)}`),(r=e.party_species)!=null&&r.name&&t.push(`Мати в команді ${N(e.party_species)}`),(c=e.party_type)!=null&&c.name&&t.push(`Мати в команді покемона типу ${N(e.party_type)}`),(l=e.trade_species)!=null&&l.name?t.push(`Обміняти на ${N(e.trade_species)}`):s==="trade"&&t.push("Обмін"),e.needs_overworld_rain&&t.push("Під час дощу"),e.min_steps!=null&&t.push(`Пройти ${e.min_steps} кроків`),e.turn_upside_down&&t.push("Перевернути пристрій"),e.relative_physical_stats!=null){const a={"-1":"Атака менша за захист",0:"Атака дорівнює захисту",1:"Атака більша за захист"};t.push(a[String(e.relative_physical_stats)])}return t.length===0?{"level-up":"Підвищити рівень","use-item":"Використати предмет",trade:"Обмін",shed:"Підвищити рівень із вільним місцем у команді","three-critical-hits":"Завдати три критичні удари","take-damage":"Отримати шкоду",spin:"Покрутитися"}[s]||N(s)||"Умови не вказані":t.join(" · ")}function vt(e){const t=e.evolutionDetails||[];return t.length&&[...new Set(t.map(yt))].filter(Boolean).join(" / ")||"Умови не вказані"}function bt(e){var o,d,p;const t=z(e.id),s=e.name?e.name.charAt(0).toUpperCase()+e.name.slice(1):"Pokémon",i=((p=(d=(o=e.type)==null?void 0:o[0])==null?void 0:d.type)==null?void 0:p.name)||"normal",n=re().includes(Number(e.id));return`
    <div class="pokemon-details__top">
      <div class="pokemon-details__art pokemon-details__art--${w(i)}">
        <span class="pokemon-details__art-id">#${t}</span>
        <img class="pokemon-details__art-image" src="${w(e.sprites)}" alt="${w(s)}">
        <span class="pokemon-details__art-caption">Покемон</span>
      </div>

      <div class="pokemon-details__overview">
        <div class="pokemon-details__identity">
          <div>
            <p class="pokemon-details__eyebrow">#${t} · ${w(e.generation||"Покоління невідоме")}</p>
            <h2 id="pokemon-details-title">${w(s)}</h2>
          </div>
          <button class="pokemon-details__like ${n?"is-liked":""}" type="button" data-details-like="${Number(e.id)}" aria-pressed="${n}" aria-label="${n?"Видалити з обраного":"Додати до обраного"}">
            <svg class="pokemon-details__like-icon" aria-hidden="true">
              <use href="${D}#heart"></use>
            </svg>
          </button>
        </div>

        <div class="pokemon-details__types">${ut(e.type)}</div>
        <p class="pokemon-details__description">${w(e.description||"Опис для цього покемона поки відсутній.")}</p>

        <div class="pokemon-details__traits">
          <div><span>Зріст</span><strong>${w(qe(e.height,"м"))}</strong></div>
          <div><span>Вага</span><strong>${w(qe(e.weight,"кг"))}</strong></div>
          <div><span>Здібність</span><strong>${w(pt(e))}</strong></div>
        </div>
      </div>
    </div>

    ${mt(e)}
    ${ft(e)}
  `}function kt(){if(M)return;const e=document.body,t=document.documentElement;M={scrollX:window.scrollX,scrollY:window.scrollY,htmlOverflow:t.style.overflow,bodyStyles:{position:e.style.position,top:e.style.top,left:e.style.left,right:e.style.right,width:e.style.width,overflow:e.style.overflow}},e.style.position="fixed",e.style.top=`-${M.scrollY}px`,e.style.left=`-${M.scrollX}px`,e.style.right="0",e.style.width="100%",e.style.overflow="hidden",t.style.overflow="hidden"}function $t(){if(!M)return;const e=M;M=null,Object.assign(document.body.style,e.bodyStyles),document.documentElement.style.overflow=e.htmlOverflow,window.requestAnimationFrame(()=>{window.scrollTo(e.scrollX,e.scrollY)})}function wt(){if(!_)return;const e=_.getAttribute("aria-hidden")!=="false";e&&kt(),_.inert=!1,_.style.display="flex",_.setAttribute("aria-hidden","false"),e&&requestAnimationFrame(()=>{var t;(t=_.querySelector(".pokemon-details__close"))==null||t.focus()})}function le(){if(!_)return;const e=oe;e!=null&&e.isConnected?e.focus({preventScroll:!0}):_.contains(document.activeElement)&&document.activeElement.blur(),_.inert=!0,_.setAttribute("aria-hidden","true"),_.style.display="none",$t(),ie=null,oe=null,U+=1}async function Ne(e){if(!V||!e)return;const t=++U;wt(),_&&(_.scrollTop=0),K&&(K.textContent=`Покемон #${z(e)}`),V.innerHTML='<p class="pokemon-details__loading">Завантажуємо інформацію про покемона…</p>';try{const[s]=await G([],[Number(e)],!1);if(t!==U)return;if(!s)throw new Error("Покемона не знайдено.");ie=s;try{s.evolutionPath=await gt(s.id)}catch(i){console.error("Помилка завантаження еволюцій:",i),s.evolutionPath=[]}if(t!==U)return;K&&(K.textContent=`Покемон #${z(s.id)}`),V.innerHTML=bt(s)}catch(s){if(t!==U)return;console.error("Не вдалося завантажити деталі покемона:",s),V.innerHTML='<p class="pokemon-details__error">Не вдалося завантажити інформацію. Спробуй ще раз.</p>'}}function St(e){var n;const t=e.dataset.id||e.dataset.pokemonId||((n=e.querySelector("[data-id]"))==null?void 0:n.dataset.id);if(t&&/^\d+$/.test(t))return t;const s=e.querySelector(".favorites__id")||e.querySelector("span"),i=s==null?void 0:s.textContent.match(/\d+/);return i?i[0]:null}function Et(e){if(e.target.closest("button, a, input, select, textarea, [data-no-details]"))return;const t=e.target.closest(".pokemon-card, .favorites__item"),s=St(t);!t||!e.currentTarget.contains(t)||s&&(oe=t,t.hasAttribute("tabindex")||t.setAttribute("tabindex","-1"),Ne(s))}it.forEach(e=>e.addEventListener("click",Et));te==null||te.forEach(e=>e.addEventListener("click",le));_==null||_.addEventListener("click",e=>{e.target===_&&le()});_==null||_.addEventListener("click",e=>{const t=e.target.closest("[data-evolution-id]");if(t){Ne(t.dataset.evolutionId);return}const s=e.target.closest("[data-details-like]");if(!s||!ie)return;const i=Number(s.dataset.detailsLike),n=re(),o=n.includes(i),d=o?n.filter(f=>f!==i):[...n,i];localStorage.setItem("likedPokemons",JSON.stringify(d));const p=!o;s.classList.toggle("is-liked",p),s.setAttribute("aria-pressed",String(p)),s.setAttribute("aria-label",p?"Видалити з обраного":"Додати до обраного"),dt(),document.dispatchEvent(new CustomEvent("favorites:changed",{detail:{id:i,liked:p}}))});window.addEventListener("keydown",e=>{e.key==="Escape"&&(_==null?void 0:_.getAttribute("aria-hidden"))==="false"&&le()});
//# sourceMappingURL=main-d9df8aca.js.map
