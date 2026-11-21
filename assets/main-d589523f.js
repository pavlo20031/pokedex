(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const P="https://pokeapi.co/api/v2/",Te=1025,Me=["grass","poison","fire","water","bug","electric","psychic","normal","ghost","flying","ice","ground","fighting","rock","dragon","dark","steel","fairy"],Re={"generation-i":"Покоління I","generation-ii":"Покоління II","generation-iii":"Покоління III","generation-iv":"Покоління IV","generation-v":"Покоління V","generation-vi":"Покоління VI","generation-vii":"Покоління VII","generation-viii":"Покоління VIII","generation-ix":"Покоління IX"},G=e=>Number(e.split("/").filter(Boolean).pop());async function je(e=Te){const t=fetch(`${P}pokemon?limit=${e}`).then(i=>i.json()),n=Me.map(i=>fetch(`${P}type/${i}`).then(d=>d.json())),r=Array.from({length:9},(i,d)=>fetch(`${P}generation/${d+1}`).then(l=>l.json())),[s,o,c]=await Promise.all([t,Promise.all(n),Promise.all(r)]),p={};o.forEach(i=>{i.pokemon.forEach(d=>{const l=G(d.pokemon.url);l>e||(p[l]||(p[l]=[])).push({slot:d.slot,name:i.name})})});const f={};return c.forEach((i,d)=>{i.pokemon_species.forEach(l=>{f[G(l.url)]=d+1})}),s.results.map(i=>{const d=G(i.url),l=(p[d]||[]).sort((a,y)=>a.slot-y.slot).map(a=>a.name);return{id:d,name:i.name,types:l,gen:f[d]||0,sprites:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${d}.png`}})}async function z(e=[],t=[],n=!0){var p,f;let r=Array.isArray(e)?e:[],s=Array.isArray(t)?[...t]:[t];if(s.length===0&&r.length>0){let i=null;for(let d of r){if(!d||!d.type)continue;let l=[];if(d.type==="gen"&&d.value)l=(await(await fetch(`${P}generation/${d.value}`)).json()).pokemon_species.map(y=>y.name);else if(d.type==="searchByTypes"&&Array.isArray(d.types)&&d.types.length>0){let a=d.types.map(b=>fetch(`${P}type/${b}`).then(v=>v.json())),m=(await Promise.all(a)).filter(b=>b&&b.pokemon).map(b=>b.pokemon.map(v=>v.pokemon.name));m.length>0&&(l=m.reduce((b,v)=>b.filter(k=>v.includes(k)),m[0]))}l.length>0&&(i=i?i.filter(a=>l.includes(a)):l)}i&&(s=i)}else if(s.length>0&&r.length>0){for(let i of r)if(!(!i||!i.type)){if(i.type==="gen"&&i.value){let l=(await(await fetch(`${P}generation/${i.value}`)).json()).pokemon_species.map(a=>a.name);s=s.filter(a=>l.includes(String(a).toLowerCase()))}else if(i.type==="searchByTypes"&&Array.isArray(i.types)){let d=i.types.map(y=>fetch(`${P}type/${y}`).then(m=>m.json())),a=(await Promise.all(d)).filter(y=>y&&y.pokemon).map(y=>y.pokemon.map(m=>m.pokemon.name));if(a.length>0){let y=a.reduce((m,b)=>m.filter(v=>b.includes(v)),a[0]);s=s.filter(m=>y.includes(String(m).toLowerCase()))}}}}let o=[];for(let i of s){let d=await fetch(`${P}pokemon/${i}`);if(!d.ok)continue;let l=await d.json(),a=l.stats.map(I=>I.base_stat),y=await fetch(`${P}pokemon-species/${l.id}`);if(!y.ok)continue;let m=await y.json(),b=[],v=[];if(n&&((p=m.evolution_chain)!=null&&p.url)){let I=await fetch(m.evolution_chain.url);if(I.ok){let w=(await I.json()).chain;for(;w;){if(w.species&&w.species.name){b.push(w.species.name);let A=w.species.url.split("/").filter(Boolean),O=A[A.length-1];v.push({id:O,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${O}.png`})}w=w.evolves_to&&w.evolves_to.length>0?w.evolves_to[0]:null}}}const k=((f=m.flavor_text_entries.find(I=>I.language.name==="en"))==null?void 0:f.flavor_text.replace(/\f/g," "))||"";let L={id:l.id,name:l.name,type:l.types,types:l.types.map(I=>I.type.name),height:l.height/10+"m",weight:l.weight/10+"kg",abilities:l.abilities,hp:a[0],a:a[1],d:a[2],spA:a[3],spD:a[4],spe:a[5],sprites:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${l.id}.png`,description:k,generation:Re[m.generation.name],chain:b,evodata:v};o.push(L)}let c=r.find(i=>i&&i.type==="sort");return c&&c.field&&c.order&&o.sort((i,d)=>{let l=i[c.field],a=d[c.field];return c.order==="desc"?a-l:l-a}),o}const te=document.querySelector(".hero__list"),Fe=({pokemons:e,types:t,generations:n})=>{te.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${n} поколінь</p>
    </li>
    ${te.innerHTML}
  `};async function Oe(){try{const[e,t,n]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),s=await t.json(),o=await n.json();Fe({pokemons:r.count,types:s.count,generations:o.count})}catch(e){console.error(e)}}te&&Oe();const K="/pokedex/assets/symbol-defs-a3682fdc.svg",j=document.querySelector(".btn-icon"),ue=j==null?void 0:j.querySelector("use"),me=document.querySelector(".header__burger-btn"),H=document.querySelector(".header__nav");function se(e){if(ue){const t=e?"sun":"moon";ue.setAttribute("href",`${K}#${t}`)}}const De=localStorage.getItem("theme");De==="dark"?(document.body.classList.add("dark-theme"),se(!0)):se(!1);j==null||j.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),se(e)});me&&H&&(me.addEventListener("click",()=>{H.classList.toggle("is-open")}),H.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{H.classList.remove("is-open")})}));function He(){function e(){try{const t=localStorage.getItem("likedPokemons"),n=t?JSON.parse(t):[],r=Array.isArray(n)?n.length:0;document.querySelectorAll(".header__nav-badge").forEach(s=>{s.textContent=r})}catch(t){console.error("Error updating header counter:",t)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("favorites:changed",e),window.addEventListener("storage",t=>{t.key==="likedPokemons"&&e()})}He();const ne=document.querySelector(".world__list"),Be=({pokemons:e,types:t,generations:n})=>{ne.innerHTML=`
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
        <span class="world__num">${n}</span> поколінь
      </p>
    </li>
    ${ne.innerHTML}
  `};async function Ue(){try{const[e,t,n]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),s=await t.json(),o=await n.json();Be({pokemons:r.count,types:s.count,generations:o.count})}catch(e){console.error("Помилка:",e)}}ne&&Ue();const fe=document.querySelector(".easteregg__button"),ge=document.querySelector(".easteregg__btn"),Q=document.querySelector(".backdrop");if(fe&&ge&&Q){const e=()=>{Q.style.display="none"};fe.addEventListener("click",e),ge.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),Q.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}const ye=document.querySelector(".btn-random"),_e=document.querySelector(".random__btn"),B=document.querySelector(".backdrops"),he=document.querySelector(".random__box"),ve=document.querySelector(".random__button"),Je={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"};function Ye(e){const t=e.type.map(s=>`
      <li class="random__items">
        <p class="random__types random__${s.type.name}">
          ${Je[s.type.name]||s.type.name}
        </p>
      </li>
    `).join("");he.innerHTML=`
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
            <use href="${K}#heart"></use>
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
  `;const n=he.querySelector(".random__like");(JSON.parse(localStorage.getItem("likedPokemons"))||[]).includes(e.id)&&n.classList.add("liked"),n.addEventListener("click",()=>{const s=JSON.parse(localStorage.getItem("likedPokemons"))||[];if(s.includes(e.id)){const o=s.filter(c=>c!==e.id);localStorage.setItem("likedPokemons",JSON.stringify(o)),n.classList.remove("liked")}else s.push(e.id),localStorage.setItem("likedPokemons",JSON.stringify(s)),n.classList.add("liked");document.dispatchEvent(new Event("favorites:changed"))})}async function be(){const e=Math.floor(Math.random()*1025)+1,[t]=await z([],[e]);t&&Ye(t)}if(ye&&_e&&B){const e=async()=>{B.style.display="flex",await be()},t=()=>{B.style.display="none"};ye.addEventListener("click",e),_e.addEventListener("click",t),ve&&ve.addEventListener("click",be),window.addEventListener("keydown",n=>{n.key==="Escape"&&t()}),B.addEventListener("click",n=>{n.target===n.currentTarget&&t()})}const W=10,Ve=1025,Xe=2,Ie="likedPokemons",Y={grass:"Трав'яний",poison:"Отруйний",fire:"Вогняний",water:"Водний",bug:"Комаха",electric:"Електричний",psychic:"Психічний",normal:"Звичайний",ghost:"Примарний",flying:"Летючий",ice:"Крижаний",ground:"Земляний",fighting:"Бойовий",rock:"Кам'яний",dragon:"Дракон",dark:"Темний",steel:"Сталевий",fairy:"Казковий"},Z=["I","II","III","IV","V","VI","VII","VIII","IX"],ke=()=>JSON.parse(localStorage.getItem(Ie))||[],ze=e=>localStorage.setItem(Ie,JSON.stringify(e)),$e=e=>e.split("-").map(t=>t[0].toUpperCase()+t.slice(1)).join(" ");function Se(e){const t=e%10,n=e%100;return t===1&&n!==11?"покемон":t>=2&&t<=4&&(n<12||n>14)?"покемони":"покемонів"}function Ke(e,t=[]){const n=String(e.id).padStart(3,"0"),r=e.sprites||`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.id}.png`,s=t.includes(e.id),c=(Array.isArray(e.types)?e.types:Array.isArray(e.type)?e.type.map(p=>{var f;return((f=p.type)==null?void 0:f.name)||p}):[]).map(p=>`<li class="type-badge type-badge--${p}">${Y[p]||p}</li>`).join("");return`
    <li class="pokemon-card" data-id="${e.id}">
      <div class="pokemon-card__top">
        <span class="pokemon-card__num">#${n}</span>
        <button class="pokemon-card__fav ${s?"is-active":""}" type="button" aria-label="Додати в улюблені">
          <svg class="icon icon__stroke"><use href="/img/symbol-defs.svg#heart"></use></svg>
        </button>
      </div>
      <img class="pokemon-card__img" src="${r}" alt="${$e(e.name)}" loading="lazy" width="475" height="475" />
      <h3 class="pokemon-card__name">${$e(e.name)}</h3>
      <ul class="pokemon-card__types">${c}</ul>
    </li>`}function Ge([e=".search-cards",t=".search-controls-button"]=[],n=".search-input",r=".search-results-count"){const s=document.querySelector(".search-section")||document.body,o=s.querySelector(n),c=s.querySelector(".search-input-box"),p=s.querySelector(".filters-wrappers"),f=s.querySelector('[data-action="filter-type"]'),i=s.querySelector('[data-action="filter-generation"]'),d=s.querySelector('[data-action="sort-number"]'),l=s.querySelector(r),a={all:[],query:"",types:[],gen:0,order:"asc",shown:W};let y=c==null?void 0:c.querySelector(".search-clear");!y&&c&&(y=document.createElement("button"),y.type="button",y.className="search-clear",y.hidden=!0,y.setAttribute("aria-label","Очистити пошук"),y.textContent="×",c.append(y));const m=document.createElement("div");m.className="filter-panel",m.hidden=!0,m.innerHTML=`
    <div class="filter-panel__head">
      <h3 class="filter-panel__title">Тип покемона</h3>
      <button class="filter-panel__reset" type="button" data-action="reset-filters">Скинути</button>
    </div>
    <div class="filter-panel__types">
      ${Object.entries(Y).map(([h,_])=>`<button class="type-badge type-badge--${h}" type="button" data-type="${h}">${_}</button>`).join("")}
    </div>
    <div class="filter-panel__gens">
      <span class="filter-panel__label">Покоління</span>
      <button class="gen-chip" type="button" data-gen="0">Усі</button>
      ${Z.map((h,_)=>`<button class="gen-chip" type="button" data-gen="${_+1}">${h}</button>`).join("")}
    </div>`;const b=document.createElement("div");b.className="active-filters",b.hidden=!0;let v=s.querySelector(e)||s.querySelector(".pokemon-grid");v||(v=document.createElement("ul")),v.classList.add("pokemon-grid");let k=s.querySelector(".empty-state");k||(k=document.createElement("div"),k.className="empty-state",k.hidden=!0,k.innerHTML=`
      <button class="empty-state__img-btn" type="button" data-action="reset-all" aria-label="Повернутися до каталогу">
        <img class="empty-state__img" src="/img/search-pokemon.png" alt="Нічого не знайдено" width="120" height="120" />
      </button>
      <h3 class="empty-state__title">Нічого не знайдено</h3>
      <p class="empty-state__text"></p>
      <button class="btn btn-reset" type="button" data-action="reset-all">Скинути всі фільтри</button>
      <button class="empty-state__back" type="button" data-action="reset-all">Повернутися до каталогу</button>`);let L=s.querySelector(t)||s.querySelector('[data-action="show-more"]');L||(L=document.createElement("button"),L.type="button"),L.classList.add("btn","btn-more"),L.dataset.action="show-more",L.hidden=!0,p?(p.after(m,b),v.parentElement||b.after(v),k.parentElement||v.after(k),L.parentElement||k.after(L)):v.parentElement&&(v.before(m,b),k.parentElement||v.after(k),L.parentElement||k.after(L));function I(){const h=a.query.trim().toLowerCase().replace("#",""),_=a.all.filter(g=>!(h&&!g.name.includes(h)&&!String(g.id).padStart(3,"0").includes(h)||!a.types.every(E=>g.types.includes(E))||a.gen&&g.gen!==a.gen));return _.sort((g,E)=>a.order==="asc"?g.id-E.id:E.id-g.id),_}function le(h){if(f){const g=a.types.length===0?"Усі типи":a.types.length===1?Y[a.types[0]]:`Типів: ${a.types.length}`,E=f.querySelector("span");E&&(E.textContent=g),f.classList.toggle("is-active",a.types.length>0),f.classList.toggle("is-open",!m.hidden)}if(i){const g=i.querySelector("span");g&&(g.textContent=a.gen?`Покоління ${Z[a.gen-1]}`:"Усі покоління"),i.classList.toggle("is-active",a.gen>0),i.classList.toggle("is-open",!m.hidden)}if(d){const g=d.querySelector("span");g&&(g.textContent=`За номером ${a.order==="asc"?"↑":"↓"}`)}m.querySelectorAll("[data-type]").forEach(g=>{g.classList.toggle("is-active",a.types.includes(g.dataset.type))}),m.querySelectorAll("[data-gen]").forEach(g=>{g.classList.toggle("is-active",Number(g.dataset.gen)===a.gen)}),y&&(y.hidden=!a.query);const _=a.types.length>0||a.gen>0;if(b.hidden=!_,_){const g=a.types.map(C=>`<span class="active-chip">${Y[C]}<button type="button" data-remove-type="${C}" aria-label="Прибрати фільтр">×</button></span>`).join(""),E=a.gen?`<span class="active-chip">Покоління ${Z[a.gen-1]}<button type="button" data-remove-gen aria-label="Прибрати фільтр">×</button></span>`:"";b.innerHTML=`${g}${E}
        <button class="active-filters__reset" type="button" data-action="reset-filters">Скинути всі</button>
        <span class="active-filters__count">Знайдено ${h} ${Se(h)}</span>`}}function w(){const h=I(),_=h.slice(0,a.shown),g=!!(a.query.trim()||a.types.length||a.gen),E=ke();if(v.innerHTML=_.map(x=>Ke(x,E)).join(""),v.hidden=h.length===0,k.hidden=h.length!==0,h.length===0){const x=k.querySelector(".empty-state__text");x&&(x.textContent=a.query.trim()?`Ми не знайшли покемонів за запитом «${a.query.trim()}». Спробуй змінити назву або скинути фільтри.`:"За такими фільтрами покемонів немає. Спробуй змінити параметри.")}const C=h.length-_.length;L.hidden=C<=0,L.textContent=`Загрузити покемонів (${C})`,l&&(l.textContent=g?`Знайдено ${h.length} ${Se(h.length)}`:`Показано ${_.length} із ${a.all.length.toLocaleString("uk-UA")} покемонів`),le(h.length)}function A(){a.shown=W,w()}function O(){a.types=[],a.gen=0,A()}function Pe(){a.query="",o&&(o.value=""),m.hidden=!0,O()}function Ne(){m.hidden=!m.hidden,w()}let ce;o&&o.addEventListener("input",()=>{clearTimeout(ce),ce=setTimeout(()=>{a.query=o.value,A()},250)}),s.addEventListener("click",h=>{const _=h.target;if(_.closest(".search-clear"))return a.query="",o&&(o.value="",o.focus()),A();if(_.closest('[data-action="filter-type"], [data-action="filter-generation"]'))return Ne();if(_.closest('[data-action="sort-number"]'))return a.order=a.order==="asc"?"desc":"asc",A();if(_.closest('[data-action="reset-filters"]'))return O();if(_.closest('[data-action="reset-all"]'))return Pe();if(_.closest('[data-action="show-more"]')||_.closest(t))return a.shown+=W,w();const g=_.closest("[data-type]");if(g){const q=g.dataset.type;return a.types=a.types.includes(q)?a.types.filter(D=>D!==q):a.types.length<Xe?[...a.types,q]:a.types,A()}const E=_.closest("[data-gen]");if(E)return a.gen=Number(E.dataset.gen),A();const C=_.closest("[data-remove-type]");if(C)return a.types=a.types.filter(q=>q!==C.dataset.removeType),A();if(_.closest("[data-remove-gen]"))return a.gen=0,A();const x=_.closest(".pokemon-card__fav");if(x){const q=Number(x.closest(".pokemon-card").dataset.id),D=ke(),pe=D.includes(q)?D.filter(xe=>xe!==q):[...D,q];ze(pe),x.classList.toggle("is-active",pe.includes(q));return}const de=_.closest(".pokemon-card");de&&document.dispatchEvent(new CustomEvent("pokemon:open",{detail:{id:Number(de.dataset.id)}}))}),window.addEventListener("storage",w);async function Ce(){l&&(l.textContent="Завантаження...");try{a.all=await je(Ve),w()}catch(h){console.error(h),l&&(l.textContent="Не вдалося завантажити покемонів")}}Ce()}Ge([".search-cards",".search-controls-button"],".search-input",".search-results-count");const R=document.querySelector(".favorites__list"),N=document.querySelector(".favorites__input"),T=document.querySelector('.favorites__btn[data-action="sort-number"]'),we=document.querySelector(".favorites__span"),Le=document.querySelector(".favorites__empty"),S={allFavorites:[],searchQuery:"",searchMode:"name"},Qe={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},We=`
<li class="favorites__item">
  <article class="favorites__article">
    <div class="favorites__header">
      <span class="favorites__id">#<var>id</var></span>
      <button type="button" class="favorites__button" data-id="<var>rawId</var>" aria-label="Видалити з улюблених">
        <svg class="favorites__heart">
          <use href="${K}#heart"></use>
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
`;function Ze(e){return!Array.isArray(e)||e.length===0?"":e.map(t=>{const n=t.id,r=String(t.id).padStart(3,"0"),s=t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",o=t.sprites||"",c=Array.isArray(t.type)?t.type.map(f=>{var l;const i=((l=f==null?void 0:f.type)==null?void 0:l.name)||"",d=Qe[i]||i;return`<span class="favorites__type favorites__type--${i}">${d}</span>`}).join(""):"",p={rawId:n,id:r,name:s,sprites:o,typesHtml:c};return We.replace(/<var>(.*?)<\/var>/g,(f,i)=>{const d=i.trim();return p[d]!==void 0?p[d]:""})}).join("")}function et(e){we&&(we.textContent=e)}function F(){const e=N?N.value.trim().toLowerCase():S.searchQuery;let t=S.allFavorites.filter(n=>e?S.searchMode==="id"?String(n.id).includes(e):n.name.toLowerCase().includes(e):!0);R&&(R.innerHTML=Ze(t)),Le&&(Le.hidden=t.length>0),et(S.allFavorites.length)}async function tt(){try{const e=localStorage.getItem("likedPokemons");console.log("Raw localStorage likedPokemons:",e);const t=e?JSON.parse(e):[];if(console.log("Parsed saved IDs:",t),!Array.isArray(t)||t.length===0){S.allFavorites=[],F();return}const n=await z([],t,!1);console.log("Fetched pokemons data from API:",n),S.allFavorites=Array.isArray(n)?n:[],F()}catch(e){console.error("Помилка завантаження улюблених покемонів:",e)}}let Ee;N==null||N.addEventListener("input",e=>{clearTimeout(Ee),S.searchQuery=e.target.value,Ee=setTimeout(()=>{F()},300)});T==null||T.addEventListener("click",()=>{S.searchMode=S.searchMode==="name"?"id":"name";const e=T.querySelector(".favorites__tablet"),t=T.querySelector(".favorites__mobile");S.searchMode==="id"?(e&&(e.textContent="Пошук за номером ←"),t&&(t.textContent="За № ←"),T.classList.add("is-active"),N&&(N.placeholder="Введіть номер покемона...")):(e&&(e.textContent="Пошук за назвою ←"),t&&(t.textContent="За назвою ←"),T.classList.remove("is-active"),N&&(N.placeholder="Пошук за назвою або номером...")),F()});R==null||R.addEventListener("click",e=>{const t=e.target.closest(".favorites__button");if(!t)return;const n=Number(t.dataset.id);let r=JSON.parse(localStorage.getItem("likedPokemons"))||[];r=r.filter(s=>Number(s)!==n),localStorage.setItem("likedPokemons",JSON.stringify(r)),S.allFavorites=S.allFavorites.filter(s=>s.id!==n),F(),document.dispatchEvent(new Event("favorites:changed"))});document.addEventListener("favorites:changed",async e=>{const{id:t,liked:n}=e.detail||{},r=Number(t);if(Number.isFinite(r)){if(R){if(n){if(!S.allFavorites.some(o=>Number(o.id)===r))try{const[o]=await z([],[r],!1);o&&S.allFavorites.push(o)}catch(o){console.error("Error adding favorite:",o)}}else S.allFavorites=S.allFavorites.filter(s=>Number(s.id)!==r);F()}initHeaderCounter()}});R&&tt();const u=document.querySelector("[data-details-backdrop]"),U=u==null?void 0:u.querySelector("[data-details-content]"),J=u==null?void 0:u.querySelector("[data-details-toolbar-id]"),ee=u==null?void 0:u.querySelectorAll("[data-details-close]"),st=document.querySelectorAll(".search-cards, .favorites__list");let ae=null;const nt={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},at={static:"Статика","lightning-rod":"Блискавковідвід",overgrow:"Заростання",blaze:"Спалах",torrent:"Потік","shield-dust":"Захисний пил","compound-eyes":"Складні очі",swarm:"Рій","keen-eye":"Гострий зір","run-away":"Втеча",intimidate:"Залякування",levitate:"Левітація",pressure:"Тиск",adaptability:"Адаптивність",synchronize:"Синхронізація","inner-focus":"Внутрішній фокус"},ot=[["hp","HP"],["a","Атака"],["d","Захист"],["spA","Спец. атака"],["spD","Спец. захист"],["spe","Швидкість"]];let oe=null,V=0,M=null;function $(e=""){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function X(e){return String(e).padStart(3,"0")}function re(){try{const e=JSON.parse(localStorage.getItem("likedPokemons")||"[]");return Array.isArray(e)?e.map(Number):[]}catch(e){return console.error("Не вдалося прочитати список обраного:",e),[]}}function rt(){const e=re().length;document.querySelectorAll(".header__nav-badge").forEach(t=>{t.textContent=e})}function Ae(e,t){const n=Number.parseFloat(e);return Number.isFinite(n)?`${n.toFixed(1).replace(".",",")} ${t}`:`${e||"—"} ${t}`}function it(e){var r,s,o;const t=((r=e.abilities)==null?void 0:r.find(c=>!c.is_hidden))||((s=e.abilities)==null?void 0:s[0]),n=(o=t==null?void 0:t.ability)==null?void 0:o.name;return n?at[n]||n.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase()):"—"}function lt(e=[]){return e.map(t=>{var s;const n=((s=t==null?void 0:t.type)==null?void 0:s.name)||"",r=nt[n]||n;return`<span class="pokemon-details__type pokemon-details__type--${$(n)}">${$(r)}</span>`}).join("")}function ct(e){var s,o,c;const t=((c=(o=(s=e.type)==null?void 0:s[0])==null?void 0:o.type)==null?void 0:c.name)||"normal",n=ot.map(([p,f])=>({label:f,value:Number(e[p])||0}));return`
    <section class="pokemon-details__section pokemon-details__stats-section">
      <div class="pokemon-details__section-heading">
        <h3>Базові характеристики</h3>
        <span>Разом: <strong>${n.reduce((p,f)=>p+f.value,0)}</strong></span>
      </div>

      <ul class="pokemon-details__stats">
        ${n.map(({label:p,value:f})=>`
          <li class="pokemon-details__stat">
            <span class="pokemon-details__stat-name">${p}</span>

            <span class="pokemon-details__stat-value">${f}</span>

            <progress
              class="pokemon-details__progress pokemon-details__progress--${$(t)}"
              value="${Math.min(f,255)}"
              max="255"
              aria-label="${p}: ${f}"
            ></progress>
          </li>
        `).join("")}
      </ul>
    </section>
  `}function dt(e){const t=Array.isArray(e.evodata)?e.evodata:[],n=Array.isArray(e.chain)?e.chain:[];return t.length?`
    <section class="pokemon-details__section pokemon-details__evolution-section">
      <h3>Еволюційний ланцюг</h3>
      <div class="pokemon-details__evolutions">
        ${t.map((r,s)=>{const o=Number(r.id),c=n[s]||`Pokémon ${o}`,p=o===Number(e.id);return`
            <button
              class="pokemon-details__evolution ${p?"is-current":""}"
              type="button"
              data-evolution-id="${o}"
              aria-current="${p?"true":"false"}"
              aria-label="Відкрити ${$(c)}"
            >
              <span class="pokemon-details__evolution-image">
                <img src="${$(r.img)}" alt="${$(c)}" loading="lazy">
              </span>
              <span class="pokemon-details__evolution-name">${$(c.charAt(0).toUpperCase()+c.slice(1))}</span>
              <span class="pokemon-details__evolution-id">#${X(o)}</span>
            </button>
            ${s<t.length-1?'<span class="pokemon-details__evolution-arrow" aria-hidden="true">→</span>':""}
          `}).join("")}
      </div>
    </section>
  `:`
      <section class="pokemon-details__section pokemon-details__evolution-section">
        <h3>Еволюційний ланцюг</h3>
        <p class="pokemon-details__no-evolution">Інформація про еволюцію відсутня.</p>
      </section>
    `}function pt(e){var o,c,p;const t=X(e.id),n=e.name?e.name.charAt(0).toUpperCase()+e.name.slice(1):"Pokémon",r=((p=(c=(o=e.type)==null?void 0:o[0])==null?void 0:c.type)==null?void 0:p.name)||"normal",s=re().includes(Number(e.id));return`
    <div class="pokemon-details__top">
      <div class="pokemon-details__art pokemon-details__art--${$(r)}">
        <span class="pokemon-details__art-id">#${t}</span>
        <img class="pokemon-details__art-image" src="${$(e.sprites)}" alt="${$(n)}">
        <span class="pokemon-details__art-caption">Покемон</span>
      </div>

      <div class="pokemon-details__overview">
        <div class="pokemon-details__identity">
          <div>
            <p class="pokemon-details__eyebrow">#${t} · ${$(e.generation||"Покоління невідоме")}</p>
            <h2 id="pokemon-details-title">${$(n)}</h2>
          </div>
          <button class="pokemon-details__like ${s?"is-liked":""}" type="button" data-details-like="${Number(e.id)}" aria-pressed="${s}" aria-label="${s?"Видалити з обраного":"Додати до обраного"}">
            <svg class="pokemon-details__like-icon" aria-hidden="true">
              <use href="${K}#heart"></use>
            </svg>
          </button>
        </div>

        <div class="pokemon-details__types">${lt(e.type)}</div>
        <p class="pokemon-details__description">${$(e.description||"Опис для цього покемона поки відсутній.")}</p>

        <div class="pokemon-details__traits">
          <div><span>Зріст</span><strong>${$(Ae(e.height,"м"))}</strong></div>
          <div><span>Вага</span><strong>${$(Ae(e.weight,"кг"))}</strong></div>
          <div><span>Здібність</span><strong>${$(it(e))}</strong></div>
        </div>
      </div>
    </div>

    ${ct(e)}
    ${dt(e)}
  `}function ut(){if(M)return;const e=document.body,t=document.documentElement;M={scrollX:window.scrollX,scrollY:window.scrollY,htmlOverflow:t.style.overflow,bodyStyles:{position:e.style.position,top:e.style.top,left:e.style.left,right:e.style.right,width:e.style.width,overflow:e.style.overflow}},e.style.position="fixed",e.style.top=`-${M.scrollY}px`,e.style.left=`-${M.scrollX}px`,e.style.right="0",e.style.width="100%",e.style.overflow="hidden",t.style.overflow="hidden"}function mt(){if(!M)return;const e=M;M=null,Object.assign(document.body.style,e.bodyStyles),document.documentElement.style.overflow=e.htmlOverflow,window.requestAnimationFrame(()=>{window.scrollTo(e.scrollX,e.scrollY)})}function ft(){if(!u)return;const e=u.getAttribute("aria-hidden")!=="false";e&&ut(),u.inert=!1,u.style.display="flex",u.setAttribute("aria-hidden","false"),e&&requestAnimationFrame(()=>{var t;(t=u.querySelector(".pokemon-details__close"))==null||t.focus()})}function ie(){if(!u)return;const e=ae;e!=null&&e.isConnected?e.focus({preventScroll:!0}):u.contains(document.activeElement)&&document.activeElement.blur(),u.inert=!0,u.setAttribute("aria-hidden","true"),u.style.display="none",mt(),oe=null,ae=null,V+=1}async function qe(e){if(!U||!e)return;const t=++V;ft(),u&&(u.scrollTop=0),J&&(J.textContent=`Покемон #${X(e)}`),U.innerHTML='<p class="pokemon-details__loading">Завантажуємо інформацію про покемона…</p>';try{const[n]=await z([],[Number(e)]);if(t!==V)return;if(!n)throw new Error("Покемона не знайдено.");oe=n,J&&(J.textContent=`Покемон #${X(n.id)}`),U.innerHTML=pt(n)}catch(n){if(t!==V)return;console.error("Не вдалося завантажити деталі покемона:",n),U.innerHTML='<p class="pokemon-details__error">Не вдалося завантажити інформацію. Спробуй ще раз.</p>'}}function gt(e){var s;const t=e.dataset.pokemonId||((s=e.querySelector("[data-id]"))==null?void 0:s.dataset.id);if(t&&/^\d+$/.test(t))return t;const n=e.querySelector(".favorites__id")||e.querySelector("span"),r=n==null?void 0:n.textContent.match(/\d+/);return r?r[0]:null}function yt(e){if(e.target.closest("button, a, input, select, textarea, [data-no-details]"))return;const t=e.target.closest("li, section, article"),n=gt(t);!t||!e.currentTarget.contains(t)||n&&(ae=t,t.hasAttribute("tabindex")||t.setAttribute("tabindex","-1"),qe(n))}st.forEach(e=>e.addEventListener("click",yt));ee==null||ee.forEach(e=>e.addEventListener("click",ie));u==null||u.addEventListener("click",e=>{e.target===u&&ie()});u==null||u.addEventListener("click",e=>{const t=e.target.closest("[data-evolution-id]");if(t){qe(t.dataset.evolutionId);return}const n=e.target.closest("[data-details-like]");if(!n||!oe)return;const r=Number(n.dataset.detailsLike),s=re(),o=s.includes(r),c=o?s.filter(f=>f!==r):[...s,r];localStorage.setItem("likedPokemons",JSON.stringify(c));const p=!o;n.classList.toggle("is-liked",p),n.setAttribute("aria-pressed",String(p)),n.setAttribute("aria-label",p?"Видалити з обраного":"Додати до обраного"),rt(),document.dispatchEvent(new CustomEvent("favorites:changed",{detail:{id:r,liked:p}}))});window.addEventListener("keydown",e=>{e.key==="Escape"&&(u==null?void 0:u.getAttribute("aria-hidden"))==="false"&&ie()});
//# sourceMappingURL=main-d589523f.js.map
