(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();async function R(e=[],t=[],s=!0){var f;let o="https://pokeapi.co/api/v2/",n=Array.isArray(e)?e:[],a=Array.isArray(t)?[...t]:[t];if(a.length===0&&n.length>0){let l=null;for(let y of n){if(!y||!y.type)continue;let p=[];if(y.type==="gen"&&y.value)p=(await(await fetch(`${o}generation/${y.value}`)).json()).pokemon_species.map(_=>_.name);else if(y.type==="searchByTypes"&&Array.isArray(y.types)&&y.types.length>0){let u=y.types.map(b=>fetch(`${o}type/${b}`).then(w=>w.json())),_=(await Promise.all(u)).filter(b=>b&&b.pokemon).map(b=>b.pokemon.map(w=>w.pokemon.name));_.length>0&&(p=_.reduce((w,$)=>w.filter(I=>$.includes(I)),_[0]))}p.length>0&&(l=l?l.filter(u=>p.includes(u)):p)}l&&(a=l)}else if(a.length>0&&n.length>0){for(let l of n)if(!(!l||!l.type)){if(l.type==="gen"&&l.value){let p=(await(await fetch(`${o}generation/${l.value}`)).json()).pokemon_species.map(u=>u.name);a=a.filter(u=>p.includes(String(u).toLowerCase()))}else if(l.type==="searchByTypes"&&Array.isArray(l.types)){let y=l.types.map(g=>fetch(`${o}type/${g}`).then(_=>_.json())),u=(await Promise.all(y)).filter(g=>g&&g.pokemon).map(g=>g.pokemon.map(_=>_.pokemon.name));if(u.length>0){let g=u.reduce((_,b)=>_.filter(w=>b.includes(w)),u[0]);a=a.filter(_=>g.includes(String(_).toLowerCase()))}}}}const d={"generation-i":"Покоління I","generation-ii":"Покоління II","generation-iii":"Покоління III","generation-iv":"Покоління IV","generation-v":"Покоління V","generation-vi":"Покоління VI","generation-vii":"Покоління VII","generation-viii":"Покоління VIII","generation-ix":"Покоління IX"};let c=[];for(let l of a){let y=await fetch(`${o}pokemon/${l}`);if(!y.ok)continue;let p=await y.json(),u=p.stats.map(T=>T.base_stat),g=await fetch(`${o}pokemon-species/${p.id}`);if(!g.ok)continue;let _=await g.json(),b=await fetch(_.evolution_chain.url);if(!b.ok)continue;let $=(await b.json()).chain,I=[],fe=[];for(;$;){if($.species&&$.species.name){I.push($.species.name);let T=$.species.url.split("/")[$.species.url.split("/").length-2];fe.push({id:T,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${T}.png`})}$=$.evolves_to&&$.evolves_to.length>0?$.evolves_to[0]:null}const Re=((f=_.flavor_text_entries.find(T=>T.language.name==="en"))==null?void 0:f.flavor_text.replace(/\f/g," "))||"";let je={id:p.id,name:p.name,type:p.types,height:p.height/10+"m",weight:p.weight/10+"kg",abilities:p.abilities,hp:u[0],a:u[1],d:u[2],spA:u[3],spD:u[4],spe:u[5],sprites:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,description:Re,generation:d[_.generation.name],chain:I,evodata:fe};c.push(je)}let i=n.find(l=>l&&l.type==="sort");return i&&i.field&&i.order&&c.sort((l,y)=>{let p=l[i.field],u=y[i.field];return i.order==="desc"?u-p:p-u}),c}const oe=document.querySelector(".hero__list"),De=({pokemons:e,types:t,generations:s})=>{oe.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${s} поколінь</p>
    </li>
    ${oe.innerHTML}
  `};async function Fe(){try{const[e,t,s]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),o=await e.json(),n=await t.json(),a=await s.json();De({pokemons:o.count,types:n.count,generations:a.count})}catch(e){console.error(e)}}oe&&Fe();const W="/pokedex/assets/symbol-defs-a3682fdc.svg",M=document.querySelector(".btn-icon"),ye=M==null?void 0:M.querySelector("use"),ge=document.querySelector(".header__burger-btn"),J=document.querySelector(".header__nav");function re(e){if(ye){const t=e?"sun":"moon";ye.setAttribute("href",`${W}#${t}`)}}const Oe=localStorage.getItem("theme");Oe==="dark"?(document.body.classList.add("dark-theme"),re(!0)):re(!1);M==null||M.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),re(e)});ge&&J&&(ge.addEventListener("click",()=>{J.classList.toggle("is-open")}),J.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{J.classList.remove("is-open")})}));function He(){function e(){try{const t=localStorage.getItem("likedPokemons"),s=t?JSON.parse(t):[],o=Array.isArray(s)?s.length:0;document.querySelectorAll(".header__nav-badge").forEach(n=>{n.textContent=o})}catch(t){console.error("Error updating header counter:",t)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("favorites:changed",e),window.addEventListener("storage",t=>{t.key==="likedPokemons"&&e()})}He();const ie=document.querySelector(".world__list"),Be=({pokemons:e,types:t,generations:s})=>{ie.innerHTML=`
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
    ${ie.innerHTML}
  `};async function Ue(){try{const[e,t,s]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),o=await e.json(),n=await t.json(),a=await s.json();Be({pokemons:o.count,types:n.count,generations:a.count})}catch(e){console.error("Помилка:",e)}}ie&&Ue();const _e=document.querySelector(".easteregg__button"),he=document.querySelector(".easteregg__btn"),Z=document.querySelector(".backdrop");if(_e&&he&&Z){const e=()=>{Z.style.display="none"};_e.addEventListener("click",e),he.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),Z.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}const ve=document.querySelector(".btn-random"),be=document.querySelector(".random__btn"),V=document.querySelector(".backdrops"),ke=document.querySelector(".random__box"),$e=document.querySelector(".random__button"),Je={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"};function Ve(e){const t=e.type.map(n=>`
      <li class="random__items">
        <p class="random__types random__${n.type.name}">
          ${Je[n.type.name]||n.type.name}
        </p>
      </li>
    `).join("");ke.innerHTML=`
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
            <use href="${W}#heart"></use>
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
  `;const s=ke.querySelector(".random__like");(JSON.parse(localStorage.getItem("likedPokemons"))||[]).includes(e.id)&&s.classList.add("liked"),s.addEventListener("click",()=>{const n=JSON.parse(localStorage.getItem("likedPokemons"))||[];if(n.includes(e.id)){const a=n.filter(d=>d!==e.id);localStorage.setItem("likedPokemons",JSON.stringify(a)),s.classList.remove("liked")}else n.push(e.id),localStorage.setItem("likedPokemons",JSON.stringify(n)),s.classList.add("liked");document.dispatchEvent(new Event("favorites:changed"))})}async function Se(){const e=Math.floor(Math.random()*1025)+1,[t]=await R([],[e]);t&&Ve(t)}if(ve&&be&&V){const e=async()=>{V.style.display="flex",await Se()},t=()=>{V.style.display="none"};ve.addEventListener("click",e),be.addEventListener("click",t),$e&&$e.addEventListener("click",Se),window.addEventListener("keydown",s=>{s.key==="Escape"&&t()}),V.addEventListener("click",s=>{s.target===s.currentTarget&&t()})}const F={pageSize:10,maxPokemonId:1025},k={currentId:1,searchQuery:"",filters:[],loadedPokemons:[]},Ye=`
<section>
    <div>
        <div>
            <span>#<var>id</var></span>
            <button type="button">❤️</button>
        </div>

        <div>
            <img src="<var>sprites</var>" alt="<var>name</var>">
        </div>

        <div>
            <h2><var>name</var></h2>

            <p>
                <span><var>type1</var></span>
                <span><var>type2</var></span>
            </p>
        </div>
    </div>
</section>
`;function ze(e,t){const s=[];for(let o=e;o<=t;o++)s.push(o);return s}function Xe(e){return Array.isArray(e)?e.map(t=>{const s={id:String(t.id||"").padStart(3,"0"),name:t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",sprites:t.sprites||"",type1:t.type&&t.type[0]&&t.type[0].type?t.type[0].type.name:"",type2:t.type&&t.type[1]&&t.type[1].type?t.type[1].type.name:""};return Ye.replace(/<var>(.*?)<\/var>/g,(o,n)=>{const a=n.trim();return s[a]!==void 0?s[a]:""})}).join(""):""}function Qe([e,t],s,o){const n=document.querySelector(e),a=document.querySelector(t),d=document.querySelector(s),c=document.querySelector(o);function i(p){c&&(c.textContent=`Показано ${p} із ${F.maxPokemonId} покемонів`)}async function f(){const p=k.searchQuery.trim().toLowerCase();let u=k.loadedPokemons;if(p!==""&&(u=k.loadedPokemons.filter(g=>g.name.toLowerCase().includes(p)||String(g.id).includes(p)),u.length===0))try{const g=await R(k.filters,[p]);Array.isArray(g)&&g.length>0&&(u=g)}catch{console.log("Поиск через API не дал результатов")}n&&(n.innerHTML=Xe(u)),i(u.length),a&&(a.style.display=p!==""||k.currentId>F.maxPokemonId?"none":"block")}async function l(p=!1){p&&(k.currentId=1,k.loadedPokemons=[]),a&&(a.disabled=!0);try{const u=k.currentId,g=Math.min(k.currentId+F.pageSize-1,F.maxPokemonId);if(u>F.maxPokemonId){a&&(a.style.display="none");return}const _=ze(u,g),b=await R(k.filters,_);if(k.currentId=g+1,p)k.loadedPokemons=b;else{const w=new Set(k.loadedPokemons.map(I=>I.id)),$=b.filter(I=>!w.has(I.id));k.loadedPokemons.push(...$)}await f()}catch(u){console.error("Помилка завантаження:",u)}finally{a&&(a.disabled=!1)}}let y;d&&d.addEventListener("input",p=>{clearTimeout(y),k.searchQuery=p.target.value,y=setTimeout(()=>{f()},300)}),a&&a.addEventListener("click",()=>{l(!1)}),l(!0)}Qe([".search-cards",".search-controls-button"],".search-input",".search-results-count");const ee="https://pokeapi.co/api/v2/",de=12,we=1025,Ke=2,xe="likedPokemons",O={grass:"Трав'яний",poison:"Отруйний",fire:"Вогняний",water:"Водний",bug:"Комаха",electric:"Електричний",psychic:"Психічний",normal:"Звичайний",ghost:"Примарний",flying:"Летючий",ice:"Крижаний",ground:"Земляний",fighting:"Бойовий",rock:"Кам'яний",dragon:"Дракон",dark:"Темний",steel:"Сталевий",fairy:"Казковий"},Q=["I","II","III","IV","V","VI","VII","VIII","IX"],Ce=()=>JSON.parse(localStorage.getItem(xe))||[],Ge=e=>localStorage.setItem(xe,JSON.stringify(e)),r={all:[],query:"",types:[],gen:0,order:"asc",shown:de},A=document.querySelector(".search-section"),H=A.querySelector(".search-input"),We=A.querySelector(".search-input-box"),Ze=A.querySelector(".filters-wrapper"),te=A.querySelector('[data-action="filter-type"]'),se=A.querySelector('[data-action="filter-generation"]'),et=A.querySelector('[data-action="sort-number"]'),le=A.querySelector(".search-results-count"),N=document.createElement("button");N.type="button";N.className="search-clear";N.hidden=!0;N.setAttribute("aria-label","Очистити пошук");N.textContent="×";We.append(N);const S=document.createElement("div");S.className="filter-panel";S.hidden=!0;const B=document.createElement("div");B.className="active-filters";B.hidden=!0;const K=document.createElement("ul");K.className="pokemon-grid";const j=document.createElement("div");j.className="empty-state";j.hidden=!0;j.innerHTML=`
  <button class="empty-state__img-btn" type="button" data-action="reset-all" aria-label="Повернутися до каталогу">
    <img class="empty-state__img" src="/img/search-pokemon.png" alt="Нічого не знайдено" width="120" height="120" />
  </button>
  <h3 class="empty-state__title">Нічого не знайдено</h3>
  <p class="empty-state__text"></p>
  <button class="btn btn-reset" type="button" data-action="reset-all">Скинути всі фільтри</button>
  <button class="empty-state__back" type="button" data-action="reset-all">Повернутися до каталогу</button>`;const C=document.createElement("button");C.type="button";C.className="btn btn-more";C.dataset.action="show-more";C.hidden=!0;Ze.after(S,B,K,j,C);S.innerHTML=`
  <div class="filter-panel__head">
    <h3 class="filter-panel__title">Тип покемона</h3>
    <button class="filter-panel__reset" type="button" data-action="reset-filters">Скинути</button>
  </div>
  <div class="filter-panel__types">
    ${Object.entries(O).map(([e,t])=>`<button class="type-badge type-badge--${e}" type="button" data-type="${e}">${t}</button>`).join("")}
  </div>
  <div class="filter-panel__gens">
    <span class="filter-panel__label">Покоління</span>
    <button class="gen-chip" type="button" data-gen="0">Усі</button>
    ${Q.map((e,t)=>`<button class="gen-chip" type="button" data-gen="${t+1}">${e}</button>`).join("")}
  </div>`;const ne=e=>Number(e.split("/").filter(Boolean).pop()),Le=e=>e.split("-").map(t=>t[0].toUpperCase()+t.slice(1)).join(" ");function Ne(e){const t=e%10,s=e%100;return t===1&&s!==11?"покемон":t>=2&&t<=4&&(s<12||s>14)?"покемони":"покемонів"}async function tt(){const e=fetch(`${ee}pokemon?limit=${we}`).then(i=>i.json()),t=Object.keys(O).map(i=>fetch(`${ee}type/${i}`).then(f=>f.json())),s=Q.map((i,f)=>fetch(`${ee}generation/${f+1}`).then(l=>l.json())),[o,n,a]=await Promise.all([e,Promise.all(t),Promise.all(s)]),d={};n.forEach(i=>{i.pokemon.forEach(f=>{const l=ne(f.pokemon.url);l>we||(d[l]||(d[l]=[])).push({slot:f.slot,name:i.name})})});const c={};a.forEach((i,f)=>{i.pokemon_species.forEach(l=>{c[ne(l.url)]=f+1})}),r.all=o.results.map(i=>{const f=ne(i.url),l=(d[f]||[]).sort((y,p)=>y.slot-p.slot).map(y=>y.name);return{id:f,name:i.name,types:l,gen:c[f]||0}})}function st(){const e=r.query.trim().toLowerCase().replace("#",""),t=r.all.filter(s=>!(e&&!s.name.includes(e)&&!String(s.id).padStart(3,"0").includes(e)||!r.types.every(o=>s.types.includes(o))||r.gen&&s.gen!==r.gen));return t.sort((s,o)=>r.order==="asc"?s.id-o.id:o.id-s.id),t}function nt(e,t){const s=String(e.id).padStart(3,"0"),o=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.id}.png`,n=t.includes(e.id),a=e.types.map(d=>`<li class="type-badge type-badge--${d}">${O[d]}</li>`).join("");return`
    <li class="pokemon-card" data-id="${e.id}">
      <div class="pokemon-card__top">
        <span class="pokemon-card__num">#${s}</span>
        <button class="pokemon-card__fav ${n?"is-active":""}" type="button" aria-label="Додати в улюблені">
          <svg class="icon icon__stroke"><use href="/img/symbol-defs.svg#heart"></use></svg>
        </button>
      </div>
      <img class="pokemon-card__img" src="${o}" alt="${Le(e.name)}" loading="lazy" width="475" height="475" />
      <h3 class="pokemon-card__name">${Le(e.name)}</h3>
      <ul class="pokemon-card__types">${a}</ul>
    </li>`}function at(e){const t=r.types.length===0?"Усі типи":r.types.length===1?O[r.types[0]]:`Типів: ${r.types.length}`;te.querySelector("span").textContent=t,se.querySelector("span").textContent=r.gen?`Покоління ${Q[r.gen-1]}`:"Усі покоління",et.querySelector("span").textContent=`За номером ${r.order==="asc"?"↑":"↓"}`,te.classList.toggle("is-active",r.types.length>0),se.classList.toggle("is-active",r.gen>0),te.classList.toggle("is-open",!S.hidden),se.classList.toggle("is-open",!S.hidden),S.querySelectorAll("[data-type]").forEach(o=>{o.classList.toggle("is-active",r.types.includes(o.dataset.type))}),S.querySelectorAll("[data-gen]").forEach(o=>{o.classList.toggle("is-active",Number(o.dataset.gen)===r.gen)}),N.hidden=!r.query;const s=r.types.length>0||r.gen>0;if(B.hidden=!s,s){const o=r.types.map(a=>`<span class="active-chip">${O[a]}<button type="button" data-remove-type="${a}" aria-label="Прибрати фільтр">×</button></span>`).join(""),n=r.gen?`<span class="active-chip">Покоління ${Q[r.gen-1]}<button type="button" data-remove-gen aria-label="Прибрати фільтр">×</button></span>`:"";B.innerHTML=`${o}${n}
      <button class="active-filters__reset" type="button" data-action="reset-filters">Скинути всі</button>
      <span class="active-filters__count">Знайдено ${e} ${Ne(e)}</span>`}}function U(){const e=st(),t=e.slice(0,r.shown),s=!!(r.query.trim()||r.types.length||r.gen),o=Ce();K.innerHTML=t.map(n=>nt(n,o)).join(""),K.hidden=e.length===0,j.hidden=e.length!==0,e.length===0&&(j.querySelector(".empty-state__text").textContent=r.query.trim()?`Ми не знайшли покемонів за запитом «${r.query.trim()}». Спробуй змінити назву або скинути фільтри.`:"За такими фільтрами покемонів немає. Спробуй змінити параметри."),C.hidden=t.length>=e.length,C.textContent=`Показати ще (${e.length-t.length})`,le.textContent=s?`Знайдено ${e.length} ${Ne(e.length)}`:`Показано ${t.length} із ${r.all.length.toLocaleString("uk-UA")} покемонів`,at(e.length)}function E(){r.shown=de,U()}function Te(){r.types=[],r.gen=0,E()}function ot(){r.query="",H.value="",S.hidden=!0,Te()}function rt(){S.hidden=!S.hidden,U()}let Ie;H.addEventListener("input",()=>{clearTimeout(Ie),Ie=setTimeout(()=>{r.query=H.value,E()},250)});A.addEventListener("click",e=>{const t=e.target;if(t.closest(".search-clear"))return r.query="",H.value="",H.focus(),E();if(t.closest('[data-action="filter-type"], [data-action="filter-generation"]'))return rt();if(t.closest('[data-action="sort-number"]'))return r.order=r.order==="asc"?"desc":"asc",E();if(t.closest('[data-action="reset-filters"]'))return Te();if(t.closest('[data-action="reset-all"]'))return ot();if(t.closest('[data-action="show-more"]'))return r.shown+=de,U();const s=t.closest("[data-type]");if(s){const c=s.dataset.type;return r.types=r.types.includes(c)?r.types.filter(i=>i!==c):r.types.length<Ke?[...r.types,c]:r.types,E()}const o=t.closest("[data-gen]");if(o)return r.gen=Number(o.dataset.gen),E();const n=t.closest("[data-remove-type]");if(n)return r.types=r.types.filter(c=>c!==n.dataset.removeType),E();if(t.closest("[data-remove-gen]"))return r.gen=0,E();const a=t.closest(".pokemon-card__fav");if(a){const c=Number(a.closest(".pokemon-card").dataset.id),i=Ce(),f=i.includes(c)?i.filter(l=>l!==c):[...i,c];Ge(f),a.classList.toggle("is-active",f.includes(c));return}const d=t.closest(".pokemon-card");d&&document.dispatchEvent(new CustomEvent("pokemon:open",{detail:{id:Number(d.dataset.id)}}))});window.addEventListener("storage",U);async function it(){le.textContent="Завантаження...";try{await tt(),U()}catch(e){console.error(e),le.textContent="Не вдалося завантажити покемонів"}}it();const x=document.querySelector(".favorites__list"),L=document.querySelector(".favorites__input"),q=document.querySelector('.favorites__btn[data-action="sort-number"]'),Ee=document.querySelector(".favorites__span"),Ae=document.querySelector(".favorites__empty"),v={allFavorites:[],searchQuery:"",searchMode:"name"},lt={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},ct=`
<li class="favorites__item">
  <article class="favorites__article">
    <div class="favorites__header">
      <span class="favorites__id">#<var>id</var></span>
      <button type="button" class="favorites__button" data-id="<var>rawId</var>" aria-label="Видалити з улюблених">
        <svg class="favorites__heart">
          <use href="${W}#heart"></use>
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
`;function dt(e){return!Array.isArray(e)||e.length===0?"":e.map(t=>{const s=t.id,o=String(t.id).padStart(3,"0"),n=t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",a=t.sprites||"",d=Array.isArray(t.type)?t.type.map(i=>{var y;const f=((y=i==null?void 0:i.type)==null?void 0:y.name)||"",l=lt[f]||f;return`<span class="favorites__type favorites__type--${f}">${l}</span>`}).join(""):"",c={rawId:s,id:o,name:n,sprites:a,typesHtml:d};return ct.replace(/<var>(.*?)<\/var>/g,(i,f)=>{const l=f.trim();return c[l]!==void 0?c[l]:""})}).join("")}function pt(e){Ee&&(Ee.textContent=e)}function D(){const e=L?L.value.trim().toLowerCase():v.searchQuery;let t=v.allFavorites.filter(s=>e?v.searchMode==="id"?String(s.id).includes(e):s.name.toLowerCase().includes(e):!0);x&&(x.innerHTML=dt(t)),Ae&&(Ae.hidden=t.length>0),pt(v.allFavorites.length)}async function ut(){try{const e=localStorage.getItem("likedPokemons");console.log("Raw localStorage likedPokemons:",e);const t=e?JSON.parse(e):[];if(console.log("Parsed saved IDs:",t),!Array.isArray(t)||t.length===0){v.allFavorites=[],D();return}const s=await R([],t,!1);console.log("Fetched pokemons data from API:",s),v.allFavorites=Array.isArray(s)?s:[],D()}catch(e){console.error("Помилка завантаження улюблених покемонів:",e)}}let qe;L==null||L.addEventListener("input",e=>{clearTimeout(qe),v.searchQuery=e.target.value,qe=setTimeout(()=>{D()},300)});q==null||q.addEventListener("click",()=>{v.searchMode=v.searchMode==="name"?"id":"name";const e=q.querySelector(".favorites__tablet"),t=q.querySelector(".favorites__mobile");v.searchMode==="id"?(e&&(e.textContent="Пошук за номером ←"),t&&(t.textContent="За № ←"),q.classList.add("is-active"),L&&(L.placeholder="Введіть номер покемона...")):(e&&(e.textContent="Пошук за назвою ←"),t&&(t.textContent="За назвою ←"),q.classList.remove("is-active"),L&&(L.placeholder="Пошук за назвою або номером...")),D()});x==null||x.addEventListener("click",e=>{const t=e.target.closest(".favorites__button");if(!t)return;const s=Number(t.dataset.id);let o=JSON.parse(localStorage.getItem("likedPokemons"))||[];o=o.filter(n=>Number(n)!==s),localStorage.setItem("likedPokemons",JSON.stringify(o)),v.allFavorites=v.allFavorites.filter(n=>n.id!==s),D(),document.dispatchEvent(new Event("favorites:changed"))});document.addEventListener("favorites:changed",async e=>{const{id:t,liked:s}=e.detail||{},o=Number(t);if(Number.isFinite(o)){if(x){if(s){if(!v.allFavorites.some(a=>Number(a.id)===o))try{const[a]=await R([],[o],!1);a&&v.allFavorites.push(a)}catch(a){console.error("Error adding favorite:",a)}}else v.allFavorites=v.allFavorites.filter(n=>Number(n.id)!==o);D()}initHeaderCounter()}});x&&ut();const m=document.querySelector("[data-details-backdrop]"),Y=m==null?void 0:m.querySelector("[data-details-content]"),z=m==null?void 0:m.querySelector("[data-details-toolbar-id]"),ae=m==null?void 0:m.querySelectorAll("[data-details-close]"),mt=document.querySelectorAll(".search-cards, .favorites__list");let ce=null;const ft={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},yt={static:"Статика","lightning-rod":"Блискавковідвід",overgrow:"Заростання",blaze:"Спалах",torrent:"Потік","shield-dust":"Захисний пил","compound-eyes":"Складні очі",swarm:"Рій","keen-eye":"Гострий зір","run-away":"Втеча",intimidate:"Залякування",levitate:"Левітація",pressure:"Тиск",adaptability:"Адаптивність",synchronize:"Синхронізація","inner-focus":"Внутрішній фокус"},gt=[["hp","HP"],["a","Атака"],["d","Захист"],["spA","Спец. атака"],["spD","Спец. захист"],["spe","Швидкість"]];let pe=null,X=0,P=null;function h(e=""){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function G(e){return String(e).padStart(3,"0")}function ue(){try{const e=JSON.parse(localStorage.getItem("likedPokemons")||"[]");return Array.isArray(e)?e.map(Number):[]}catch(e){return console.error("Не вдалося прочитати список обраного:",e),[]}}function _t(){const e=ue().length;document.querySelectorAll(".header__nav-badge").forEach(t=>{t.textContent=e})}function Pe(e,t){const s=Number.parseFloat(e);return Number.isFinite(s)?`${s.toFixed(1).replace(".",",")} ${t}`:`${e||"—"} ${t}`}function ht(e){var o,n,a;const t=((o=e.abilities)==null?void 0:o.find(d=>!d.is_hidden))||((n=e.abilities)==null?void 0:n[0]),s=(a=t==null?void 0:t.ability)==null?void 0:a.name;return s?yt[s]||s.replace(/-/g," ").replace(/\b\w/g,d=>d.toUpperCase()):"—"}function vt(e=[]){return e.map(t=>{var n;const s=((n=t==null?void 0:t.type)==null?void 0:n.name)||"",o=ft[s]||s;return`<span class="pokemon-details__type pokemon-details__type--${h(s)}">${h(o)}</span>`}).join("")}function bt(e){var n,a,d;const t=((d=(a=(n=e.type)==null?void 0:n[0])==null?void 0:a.type)==null?void 0:d.name)||"normal",s=gt.map(([c,i])=>({label:i,value:Number(e[c])||0}));return`
    <section class="pokemon-details__section pokemon-details__stats-section">
      <div class="pokemon-details__section-heading">
        <h3>Базові характеристики</h3>
        <span>Разом: <strong>${s.reduce((c,i)=>c+i.value,0)}</strong></span>
      </div>

      <ul class="pokemon-details__stats">
        ${s.map(({label:c,value:i})=>`
          <li class="pokemon-details__stat">
            <span class="pokemon-details__stat-name">${c}</span>

            <span class="pokemon-details__stat-value">${i}</span>

            <progress
              class="pokemon-details__progress pokemon-details__progress--${h(t)}"
              value="${Math.min(i,255)}"
              max="255"
              aria-label="${c}: ${i}"
            ></progress>
          </li>
        `).join("")}
      </ul>
    </section>
  `}function kt(e){const t=Array.isArray(e.evodata)?e.evodata:[],s=Array.isArray(e.chain)?e.chain:[];return t.length?`
    <section class="pokemon-details__section pokemon-details__evolution-section">
      <h3>Еволюційний ланцюг</h3>
      <div class="pokemon-details__evolutions">
        ${t.map((o,n)=>{const a=Number(o.id),d=s[n]||`Pokémon ${a}`,c=a===Number(e.id);return`
            <button
              class="pokemon-details__evolution ${c?"is-current":""}"
              type="button"
              data-evolution-id="${a}"
              aria-current="${c?"true":"false"}"
              aria-label="Відкрити ${h(d)}"
            >
              <span class="pokemon-details__evolution-image">
                <img src="${h(o.img)}" alt="${h(d)}" loading="lazy">
              </span>
              <span class="pokemon-details__evolution-name">${h(d.charAt(0).toUpperCase()+d.slice(1))}</span>
              <span class="pokemon-details__evolution-id">#${G(a)}</span>
            </button>
            ${n<t.length-1?'<span class="pokemon-details__evolution-arrow" aria-hidden="true">→</span>':""}
          `}).join("")}
      </div>
    </section>
  `:`
      <section class="pokemon-details__section pokemon-details__evolution-section">
        <h3>Еволюційний ланцюг</h3>
        <p class="pokemon-details__no-evolution">Інформація про еволюцію відсутня.</p>
      </section>
    `}function $t(e){var a,d,c;const t=G(e.id),s=e.name?e.name.charAt(0).toUpperCase()+e.name.slice(1):"Pokémon",o=((c=(d=(a=e.type)==null?void 0:a[0])==null?void 0:d.type)==null?void 0:c.name)||"normal",n=ue().includes(Number(e.id));return`
    <div class="pokemon-details__top">
      <div class="pokemon-details__art pokemon-details__art--${h(o)}">
        <span class="pokemon-details__art-id">#${t}</span>
        <img class="pokemon-details__art-image" src="${h(e.sprites)}" alt="${h(s)}">
        <span class="pokemon-details__art-caption">Покемон</span>
      </div>

      <div class="pokemon-details__overview">
        <div class="pokemon-details__identity">
          <div>
            <p class="pokemon-details__eyebrow">#${t} · ${h(e.generation||"Покоління невідоме")}</p>
            <h2 id="pokemon-details-title">${h(s)}</h2>
          </div>
          <button class="pokemon-details__like ${n?"is-liked":""}" type="button" data-details-like="${Number(e.id)}" aria-pressed="${n}" aria-label="${n?"Видалити з обраного":"Додати до обраного"}">
            <svg class="pokemon-details__like-icon" aria-hidden="true">
              <use href="${W}#heart"></use>
            </svg>
          </button>
        </div>

        <div class="pokemon-details__types">${vt(e.type)}</div>
        <p class="pokemon-details__description">${h(e.description||"Опис для цього покемона поки відсутній.")}</p>

        <div class="pokemon-details__traits">
          <div><span>Зріст</span><strong>${h(Pe(e.height,"м"))}</strong></div>
          <div><span>Вага</span><strong>${h(Pe(e.weight,"кг"))}</strong></div>
          <div><span>Здібність</span><strong>${h(ht(e))}</strong></div>
        </div>
      </div>
    </div>

    ${bt(e)}
    ${kt(e)}
  `}function St(){if(P)return;const e=document.body,t=document.documentElement;P={scrollX:window.scrollX,scrollY:window.scrollY,htmlOverflow:t.style.overflow,bodyStyles:{position:e.style.position,top:e.style.top,left:e.style.left,right:e.style.right,width:e.style.width,overflow:e.style.overflow}},e.style.position="fixed",e.style.top=`-${P.scrollY}px`,e.style.left=`-${P.scrollX}px`,e.style.right="0",e.style.width="100%",e.style.overflow="hidden",t.style.overflow="hidden"}function wt(){if(!P)return;const e=P;P=null,Object.assign(document.body.style,e.bodyStyles),document.documentElement.style.overflow=e.htmlOverflow,window.requestAnimationFrame(()=>{window.scrollTo(e.scrollX,e.scrollY)})}function Lt(){if(!m)return;const e=m.getAttribute("aria-hidden")!=="false";e&&St(),m.inert=!1,m.style.display="flex",m.setAttribute("aria-hidden","false"),e&&requestAnimationFrame(()=>{var t;(t=m.querySelector(".pokemon-details__close"))==null||t.focus()})}function me(){if(!m)return;const e=ce;e!=null&&e.isConnected?e.focus({preventScroll:!0}):m.contains(document.activeElement)&&document.activeElement.blur(),m.inert=!0,m.setAttribute("aria-hidden","true"),m.style.display="none",wt(),pe=null,ce=null,X+=1}async function Me(e){if(!Y||!e)return;const t=++X;Lt(),m&&(m.scrollTop=0),z&&(z.textContent=`Покемон #${G(e)}`),Y.innerHTML='<p class="pokemon-details__loading">Завантажуємо інформацію про покемона…</p>';try{const[s]=await R([],[Number(e)]);if(t!==X)return;if(!s)throw new Error("Покемона не знайдено.");pe=s,z&&(z.textContent=`Покемон #${G(s.id)}`),Y.innerHTML=$t(s)}catch(s){if(t!==X)return;console.error("Не вдалося завантажити деталі покемона:",s),Y.innerHTML='<p class="pokemon-details__error">Не вдалося завантажити інформацію. Спробуй ще раз.</p>'}}function It(e){var n;const t=e.dataset.pokemonId||((n=e.querySelector("[data-id]"))==null?void 0:n.dataset.id);if(t&&/^\d+$/.test(t))return t;const s=e.querySelector(".favorites__id")||e.querySelector("span"),o=s==null?void 0:s.textContent.match(/\d+/);return o?o[0]:null}function Et(e){if(e.target.closest("button, a, input, select, textarea, [data-no-details]"))return;const t=e.target.closest("li, section, article"),s=It(t);!t||!e.currentTarget.contains(t)||s&&(ce=t,t.hasAttribute("tabindex")||t.setAttribute("tabindex","-1"),Me(s))}mt.forEach(e=>e.addEventListener("click",Et));ae==null||ae.forEach(e=>e.addEventListener("click",me));m==null||m.addEventListener("click",e=>{e.target===m&&me()});m==null||m.addEventListener("click",e=>{const t=e.target.closest("[data-evolution-id]");if(t){Me(t.dataset.evolutionId);return}const s=e.target.closest("[data-details-like]");if(!s||!pe)return;const o=Number(s.dataset.detailsLike),n=ue(),a=n.includes(o),d=a?n.filter(i=>i!==o):[...n,o];localStorage.setItem("likedPokemons",JSON.stringify(d));const c=!a;s.classList.toggle("is-liked",c),s.setAttribute("aria-pressed",String(c)),s.setAttribute("aria-label",c?"Видалити з обраного":"Додати до обраного"),_t(),document.dispatchEvent(new CustomEvent("favorites:changed",{detail:{id:o,liked:c}}))});window.addEventListener("keydown",e=>{e.key==="Escape"&&(m==null?void 0:m.getAttribute("aria-hidden"))==="false"&&me()});
//# sourceMappingURL=main-50cd7a9f.js.map
