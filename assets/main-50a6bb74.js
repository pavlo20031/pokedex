(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();async function A(e=[],t=[],s=!0){var w;let o="https://pokeapi.co/api/v2/",n=Array.isArray(e)?e:[],a=Array.isArray(t)?[...t]:[t];if(a.length===0&&n.length>0){let u=null;for(let f of n){if(!f||!f.type)continue;let i=[];if(f.type==="gen"&&f.value)i=(await(await fetch(`${o}generation/${f.value}`)).json()).pokemon_species.map(y=>y.name);else if(f.type==="searchByTypes"&&Array.isArray(f.types)&&f.types.length>0){let l=f.types.map(v=>fetch(`${o}type/${v}`).then(S=>S.json())),y=(await Promise.all(l)).filter(v=>v&&v.pokemon).map(v=>v.pokemon.map(S=>S.pokemon.name));y.length>0&&(i=y.reduce((S,k)=>S.filter(L=>k.includes(L)),y[0]))}i.length>0&&(u=u?u.filter(l=>i.includes(l)):i)}u&&(a=u)}else if(a.length>0&&n.length>0){for(let u of n)if(!(!u||!u.type)){if(u.type==="gen"&&u.value){let i=(await(await fetch(`${o}generation/${u.value}`)).json()).pokemon_species.map(l=>l.name);a=a.filter(l=>i.includes(String(l).toLowerCase()))}else if(u.type==="searchByTypes"&&Array.isArray(u.types)){let f=u.types.map(m=>fetch(`${o}type/${m}`).then(y=>y.json())),l=(await Promise.all(f)).filter(m=>m&&m.pokemon).map(m=>m.pokemon.map(y=>y.pokemon.name));if(l.length>0){let m=l.reduce((y,v)=>y.filter(S=>v.includes(S)),l[0]);a=a.filter(y=>m.includes(String(y).toLowerCase()))}}}}const c={"generation-i":"Покоління I","generation-ii":"Покоління II","generation-iii":"Покоління III","generation-iv":"Покоління IV","generation-v":"Покоління V","generation-vi":"Покоління VI","generation-vii":"Покоління VII","generation-viii":"Покоління VIII","generation-ix":"Покоління IX"};let r=[];for(let u of a){let f=await fetch(`${o}pokemon/${u}`);if(!f.ok)continue;let i=await f.json(),l=i.stats.map(q=>q.base_stat),m=await fetch(`${o}pokemon-species/${i.id}`);if(!m.ok)continue;let y=await m.json(),v=await fetch(y.evolution_chain.url);if(!v.ok)continue;let k=(await v.json()).chain,L=[],se=[];for(;k;){if(k.species&&k.species.name){L.push(k.species.name);let q=k.species.url.split("/")[k.species.url.split("/").length-2];se.push({id:q,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${q}.png`})}k=k.evolves_to&&k.evolves_to.length>0?k.evolves_to[0]:null}const be=((w=y.flavor_text_entries.find(q=>q.language.name==="en"))==null?void 0:w.flavor_text.replace(/\f/g," "))||"";let we={id:i.id,name:i.name,type:i.types,height:i.height/10+"m",weight:i.weight/10+"kg",abilities:i.abilities,hp:l[0],a:l[1],d:l[2],spA:l[3],spD:l[4],spe:l[5],sprites:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i.id}.png`,description:be,generation:c[y.generation.name],chain:L,evodata:se};r.push(we)}let d=n.find(u=>u&&u.type==="sort");return d&&d.field&&d.order&&r.sort((u,f)=>{let i=u[d.field],l=f[d.field];return d.order==="desc"?l-i:i-l}),r}const X=document.querySelector(".hero__list"),Se=({pokemons:e,types:t,generations:s})=>{X.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${s} поколінь</p>
    </li>
    ${X.innerHTML}
  `};async function $e(){try{const[e,t,s]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),o=await e.json(),n=await t.json(),a=await s.json();Se({pokemons:o.count,types:n.count,generations:a.count})}catch(e){console.error(e)}}X&&$e();const V="/pokedex/assets/symbol-defs-a3682fdc.svg",P=document.querySelector(".btn-icon"),ne=P==null?void 0:P.querySelector("use"),ae=document.querySelector(".header__burger-btn"),R=document.querySelector(".header__nav");function K(e){if(ne){const t=e?"sun":"moon";ne.setAttribute("href",`${V}#${t}`)}}const Le=localStorage.getItem("theme");Le==="dark"?(document.body.classList.add("dark-theme"),K(!0)):K(!1);P==null||P.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),K(e)});ae&&R&&(ae.addEventListener("click",()=>{R.classList.toggle("is-open")}),R.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{R.classList.remove("is-open")})}));function Ae(){function e(){try{const t=localStorage.getItem("likedPokemons"),s=t?JSON.parse(t):[],o=Array.isArray(s)?s.length:0;document.querySelectorAll(".header__nav-badge").forEach(n=>{n.textContent=o})}catch(t){console.error("Error updating header counter:",t)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("favorites:changed",e),window.addEventListener("storage",t=>{t.key==="likedPokemons"&&e()})}Ae();const G=document.querySelector(".world__list"),Ee=({pokemons:e,types:t,generations:s})=>{G.innerHTML=`
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
    ${G.innerHTML}
  `};async function xe(){try{const[e,t,s]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),o=await e.json(),n=await t.json(),a=await s.json();Ee({pokemons:o.count,types:n.count,generations:a.count})}catch(e){console.error("Помилка:",e)}}G&&xe();const oe=document.querySelector(".easteregg__button"),re=document.querySelector(".easteregg__btn"),Y=document.querySelector(".backdrop");if(oe&&re&&Y){const e=()=>{Y.style.display="none"};oe.addEventListener("click",e),re.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),Y.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}const ie=document.querySelector(".btn-random"),le=document.querySelector(".random__btn"),D=document.querySelector(".backdrops"),ce=document.querySelector(".random__box"),de=document.querySelector(".random__button"),Ie={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"};function qe(e){const t=e.type.map(n=>`
      <li class="random__items">
        <p class="random__types random__${n.type.name}">
          ${Ie[n.type.name]||n.type.name}
        </p>
      </li>
    `).join("");ce.innerHTML=`
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
            <use href="${V}#heart"></use>
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
  `;const s=ce.querySelector(".random__like");(JSON.parse(localStorage.getItem("likedPokemons"))||[]).includes(e.id)&&s.classList.add("liked"),s.addEventListener("click",()=>{const n=JSON.parse(localStorage.getItem("likedPokemons"))||[];if(n.includes(e.id)){const a=n.filter(c=>c!==e.id);localStorage.setItem("likedPokemons",JSON.stringify(a)),s.classList.remove("liked")}else n.push(e.id),localStorage.setItem("likedPokemons",JSON.stringify(n)),s.classList.add("liked");document.dispatchEvent(new Event("favorites:changed"))})}async function pe(){const e=Math.floor(Math.random()*1025)+1,[t]=await A([],[e]);t&&qe(t)}if(ie&&le&&D){const e=async()=>{D.style.display="flex",await pe()},t=()=>{D.style.display="none"};ie.addEventListener("click",e),le.addEventListener("click",t),de&&de.addEventListener("click",pe),window.addEventListener("keydown",s=>{s.key==="Escape"&&t()}),D.addEventListener("click",s=>{s.target===s.currentTarget&&t()})}const N={pageSize:10,maxPokemonId:1025},h={currentId:1,searchQuery:"",filters:[],loadedPokemons:[]},Pe=`
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
`;function Ce(e,t){const s=[];for(let o=e;o<=t;o++)s.push(o);return s}function Ne(e){return Array.isArray(e)?e.map(t=>{const s={id:String(t.id||"").padStart(3,"0"),name:t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",sprites:t.sprites||"",type1:t.type&&t.type[0]&&t.type[0].type?t.type[0].type.name:"",type2:t.type&&t.type[1]&&t.type[1].type?t.type[1].type.name:""};return Pe.replace(/<var>(.*?)<\/var>/g,(o,n)=>{const a=n.trim();return s[a]!==void 0?s[a]:""})}).join(""):""}function Te([e,t],s,o){const n=document.querySelector(e),a=document.querySelector(t),c=document.querySelector(s),r=document.querySelector(o);function d(i){r&&(r.textContent=`Показано ${i} із ${N.maxPokemonId} покемонів`)}async function w(){const i=h.searchQuery.trim().toLowerCase();let l=h.loadedPokemons;if(i!==""&&(l=h.loadedPokemons.filter(m=>m.name.toLowerCase().includes(i)||String(m.id).includes(i)),l.length===0))try{const m=await A(h.filters,[i]);Array.isArray(m)&&m.length>0&&(l=m)}catch{console.log("Поиск через API не дал результатов")}n&&(n.innerHTML=Ne(l)),d(l.length),a&&(a.style.display=i!==""||h.currentId>N.maxPokemonId?"none":"block")}async function u(i=!1){i&&(h.currentId=1,h.loadedPokemons=[]),a&&(a.disabled=!0);try{const l=h.currentId,m=Math.min(h.currentId+N.pageSize-1,N.maxPokemonId);if(l>N.maxPokemonId){a&&(a.style.display="none");return}const y=Ce(l,m),v=await A(h.filters,y);if(h.currentId=m+1,i)h.loadedPokemons=v;else{const S=new Set(h.loadedPokemons.map(L=>L.id)),k=v.filter(L=>!S.has(L.id));h.loadedPokemons.push(...k)}await w()}catch(l){console.error("Помилка завантаження:",l)}finally{a&&(a.disabled=!1)}}let f;c&&c.addEventListener("input",i=>{clearTimeout(f),h.searchQuery=i.target.value,f=setTimeout(()=>{w()},300)}),a&&a.addEventListener("click",()=>{u(!1)}),u(!0)}Te([".search-cards",".search-controls-button"],".search-input",".search-results-count");const Q=document.querySelector(".search-input");document.querySelector('[data-action="random-pokemon"]');const O=document.querySelector('[data-action="sort-number"]'),T=document.querySelector('[data-action="filter-type"]'),M=document.querySelector('[data-action="filter-generation"]'),F=document.querySelector(".search-results-count"),b={query:"",sortOrder:"asc",types:[],generation:null},ue=[{id:"normal",name:"Звичайний"},{id:"fire",name:"Вогняний"},{id:"water",name:"Водяний"},{id:"electric",name:"Електричний"},{id:"grass",name:"Трав'яний"},{id:"ice",name:"Льодяний"},{id:"fighting",name:"Бойовий"},{id:"poison",name:"Отруйний"},{id:"ground",name:"Земляний"},{id:"flying",name:"Літаючий"},{id:"psychic",name:"Психічний"},{id:"bug",name:"Комаха"},{id:"rock",name:"Кам'яний"},{id:"ghost",name:"Примарний"},{id:"dragon",name:"Драконячий"},{id:"dark",name:"Темний"},{id:"steel",name:"Сталевий"},{id:"fairy",name:"Фейний"}],me=[{id:1,name:"Покоління І"},{id:2,name:"Покоління ІІ"},{id:3,name:"Покоління ІІІ"},{id:4,name:"Покоління IV"},{id:5,name:"Покоління V"},{id:6,name:"Покоління VI"},{id:7,name:"Покоління VII"},{id:8,name:"Покоління VIII"},{id:9,name:"Покоління ІХ"}];async function z(){const e=[];b.generation&&e.push({type:"gen",value:b.generation}),b.types.length>0&&e.push({type:"searchByTypes",types:b.types}),e.push({type:"sort",field:"id",order:b.sortOrder});try{let t=[];const s=b.query.trim().toLowerCase();s?t=await A(e,[s],!1):t=await A(e,[],!1),F&&(F.textContent=`Показано ${t.length} із 1 025 покемонів`),document.dispatchEvent(new CustomEvent("pokemon:update-list",{detail:{pokemons:t}}))}catch(t){console.error("Помилка під час фільтрації:",t),F&&(F.textContent="Показано 0 із 1 025 покемонів")}}function he(e,t,s){let o=e.parentNode.querySelector(".custom-dropdown-list");if(o){o.remove();return}document.querySelectorAll(".custom-dropdown-list").forEach(r=>r.remove());const n=document.createElement("ul");n.className="custom-dropdown-list",n.style.cssText=`
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 100;
    background-color: var(--main-color, #fff);
    border: 1px solid var(--subtitle-color, #9ca3af);
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    list-style: none;
    padding: 8px 0;
    margin: 0;
    width: 200px;
    max-height: 240px;
    overflow-y: auto;
  `;const a=document.createElement("li");a.textContent="Усі",a.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px; font-weight: 600;",a.addEventListener("click",()=>{s(null),n.remove()}),n.appendChild(a),t.forEach(r=>{const d=document.createElement("li");d.textContent=r.name,d.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px;",d.addEventListener("mouseenter",()=>d.style.backgroundColor="rgba(0,0,0,0.05)"),d.addEventListener("mouseleave",()=>d.style.backgroundColor="transparent"),d.addEventListener("click",()=>{s(r.id),n.remove()}),n.appendChild(d)}),e.style.position="relative",e.parentNode.style.position="relative",e.parentNode.appendChild(n);function c(r){!e.contains(r.target)&&!n.contains(r.target)&&(n.remove(),document.removeEventListener("click",c))}setTimeout(()=>document.addEventListener("click",c),0)}let fe=null;Q==null||Q.addEventListener("input",e=>{b.query=e.target.value,clearTimeout(fe),fe=setTimeout(()=>z(),400)});O==null||O.addEventListener("click",()=>{b.sortOrder=b.sortOrder==="asc"?"desc":"asc";const e=O.querySelector("span");e&&(e.textContent=b.sortOrder==="asc"?"За номером ↑":"За номером ↓"),z()});T==null||T.addEventListener("click",()=>{he(T,ue,e=>{b.types=e?[e]:[];const t=T.querySelector("span");if(t){const s=ue.find(o=>o.id===e);t.textContent=s?s.name:"Усі типи"}z()})});M==null||M.addEventListener("click",()=>{he(M,me,e=>{b.generation=e;const t=M.querySelector("span");if(t){const s=me.find(o=>o.id===e);t.textContent=s?s.name:"Усі покоління"}z()})});const I=document.querySelector(".favorites__list"),$=document.querySelector(".favorites__input"),E=document.querySelector('.favorites__btn[data-action="sort-number"]'),ye=document.querySelector(".favorites__span"),_e=document.querySelector(".favorites__empty"),g={allFavorites:[],searchQuery:"",searchMode:"name"},Me={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},Re=`
<li class="favorites__item">
  <article class="favorites__article">
    <div class="favorites__header">
      <span class="favorites__id">#<var>id</var></span>
      <button type="button" class="favorites__button" data-id="<var>rawId</var>" aria-label="Видалити з улюблених">
        <svg class="favorites__heart">
          <use href="${V}#heart"></use>
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
`;function De(e){return!Array.isArray(e)||e.length===0?"":e.map(t=>{const s=t.id,o=String(t.id).padStart(3,"0"),n=t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",a=t.sprites||"",c=Array.isArray(t.type)?t.type.map(d=>{var f;const w=((f=d==null?void 0:d.type)==null?void 0:f.name)||"",u=Me[w]||w;return`<span class="favorites__type favorites__type--${w}">${u}</span>`}).join(""):"",r={rawId:s,id:o,name:n,sprites:a,typesHtml:c};return Re.replace(/<var>(.*?)<\/var>/g,(d,w)=>{const u=w.trim();return r[u]!==void 0?r[u]:""})}).join("")}function Oe(e){ye&&(ye.textContent=e)}function C(){const e=$?$.value.trim().toLowerCase():g.searchQuery;let t=g.allFavorites.filter(s=>e?g.searchMode==="id"?String(s.id).includes(e):s.name.toLowerCase().includes(e):!0);I&&(I.innerHTML=De(t)),_e&&(_e.hidden=t.length>0),Oe(g.allFavorites.length)}async function Fe(){try{const e=localStorage.getItem("likedPokemons");console.log("Raw localStorage likedPokemons:",e);const t=e?JSON.parse(e):[];if(console.log("Parsed saved IDs:",t),!Array.isArray(t)||t.length===0){g.allFavorites=[],C();return}const s=await A([],t,!1);console.log("Fetched pokemons data from API:",s),g.allFavorites=Array.isArray(s)?s:[],C()}catch(e){console.error("Помилка завантаження улюблених покемонів:",e)}}let ge;$==null||$.addEventListener("input",e=>{clearTimeout(ge),g.searchQuery=e.target.value,ge=setTimeout(()=>{C()},300)});E==null||E.addEventListener("click",()=>{g.searchMode=g.searchMode==="name"?"id":"name";const e=E.querySelector(".favorites__tablet"),t=E.querySelector(".favorites__mobile");g.searchMode==="id"?(e&&(e.textContent="Пошук за номером ←"),t&&(t.textContent="За № ←"),E.classList.add("is-active"),$&&($.placeholder="Введіть номер покемона...")):(e&&(e.textContent="Пошук за назвою ←"),t&&(t.textContent="За назвою ←"),E.classList.remove("is-active"),$&&($.placeholder="Пошук за назвою або номером...")),C()});I==null||I.addEventListener("click",e=>{const t=e.target.closest(".favorites__button");if(!t)return;const s=Number(t.dataset.id);let o=JSON.parse(localStorage.getItem("likedPokemons"))||[];o=o.filter(n=>Number(n)!==s),localStorage.setItem("likedPokemons",JSON.stringify(o)),g.allFavorites=g.allFavorites.filter(n=>n.id!==s),C(),document.dispatchEvent(new Event("favorites:changed"))});document.addEventListener("favorites:changed",async e=>{const{id:t,liked:s}=e.detail||{},o=Number(t);if(Number.isFinite(o)){if(I){if(s){if(!g.allFavorites.some(a=>Number(a.id)===o))try{const[a]=await A([],[o],!1);a&&g.allFavorites.push(a)}catch(a){console.error("Error adding favorite:",a)}}else g.allFavorites=g.allFavorites.filter(n=>Number(n.id)!==o);C()}initHeaderCounter()}});I&&Fe();const p=document.querySelector("[data-details-backdrop]"),j=p==null?void 0:p.querySelector("[data-details-content]"),H=p==null?void 0:p.querySelector("[data-details-toolbar-id]"),B=p==null?void 0:p.querySelectorAll("[data-details-close]"),je=document.querySelectorAll(".search-cards, .favorites__list");let W=null;const He={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},Ue={static:"Статика","lightning-rod":"Блискавковідвід",overgrow:"Заростання",blaze:"Спалах",torrent:"Потік","shield-dust":"Захисний пил","compound-eyes":"Складні очі",swarm:"Рій","keen-eye":"Гострий зір","run-away":"Втеча",intimidate:"Залякування",levitate:"Левітація",pressure:"Тиск",adaptability:"Адаптивність",synchronize:"Синхронізація","inner-focus":"Внутрішній фокус"},Je=[["hp","HP"],["a","Атака"],["d","Захист"],["spA","Спец. атака"],["spD","Спец. захист"],["spe","Швидкість"]];let Z=null,U=0,x=null;function _(e=""){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function J(e){return String(e).padStart(3,"0")}function ee(){try{const e=JSON.parse(localStorage.getItem("likedPokemons")||"[]");return Array.isArray(e)?e.map(Number):[]}catch(e){return console.error("Не вдалося прочитати список обраного:",e),[]}}function Ve(){const e=ee().length;document.querySelectorAll(".header__nav-badge").forEach(t=>{t.textContent=e})}function ve(e,t){const s=Number.parseFloat(e);return Number.isFinite(s)?`${s.toFixed(1).replace(".",",")} ${t}`:`${e||"—"} ${t}`}function ze(e){var o,n,a;const t=((o=e.abilities)==null?void 0:o.find(c=>!c.is_hidden))||((n=e.abilities)==null?void 0:n[0]),s=(a=t==null?void 0:t.ability)==null?void 0:a.name;return s?Ue[s]||s.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase()):"—"}function Ye(e=[]){return e.map(t=>{var n;const s=((n=t==null?void 0:t.type)==null?void 0:n.name)||"",o=He[s]||s;return`<span class="pokemon-details__type pokemon-details__type--${_(s)}">${_(o)}</span>`}).join("")}function Qe(e){var n,a,c;const t=((c=(a=(n=e.type)==null?void 0:n[0])==null?void 0:a.type)==null?void 0:c.name)||"normal",s=Je.map(([r,d])=>({label:d,value:Number(e[r])||0}));return`
    <section class="pokemon-details__section pokemon-details__stats-section">
      <div class="pokemon-details__section-heading">
        <h3>Базові характеристики</h3>
        <span>Разом: <strong>${s.reduce((r,d)=>r+d.value,0)}</strong></span>
      </div>

      <ul class="pokemon-details__stats">
        ${s.map(({label:r,value:d})=>`
          <li class="pokemon-details__stat">
            <span class="pokemon-details__stat-name">${r}</span>

            <span class="pokemon-details__stat-value">${d}</span>

            <progress
              class="pokemon-details__progress pokemon-details__progress--${_(t)}"
              value="${Math.min(d,255)}"
              max="255"
              aria-label="${r}: ${d}"
            ></progress>
          </li>
        `).join("")}
      </ul>
    </section>
  `}function Be(e){const t=Array.isArray(e.evodata)?e.evodata:[],s=Array.isArray(e.chain)?e.chain:[];return t.length?`
    <section class="pokemon-details__section pokemon-details__evolution-section">
      <h3>Еволюційний ланцюг</h3>
      <div class="pokemon-details__evolutions">
        ${t.map((o,n)=>{const a=Number(o.id),c=s[n]||`Pokémon ${a}`,r=a===Number(e.id);return`
            <button
              class="pokemon-details__evolution ${r?"is-current":""}"
              type="button"
              data-evolution-id="${a}"
              aria-current="${r?"true":"false"}"
              aria-label="Відкрити ${_(c)}"
            >
              <span class="pokemon-details__evolution-image">
                <img src="${_(o.img)}" alt="${_(c)}" loading="lazy">
              </span>
              <span class="pokemon-details__evolution-name">${_(c.charAt(0).toUpperCase()+c.slice(1))}</span>
              <span class="pokemon-details__evolution-id">#${J(a)}</span>
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
    `}function Xe(e){var a,c,r;const t=J(e.id),s=e.name?e.name.charAt(0).toUpperCase()+e.name.slice(1):"Pokémon",o=((r=(c=(a=e.type)==null?void 0:a[0])==null?void 0:c.type)==null?void 0:r.name)||"normal",n=ee().includes(Number(e.id));return`
    <div class="pokemon-details__top">
      <div class="pokemon-details__art pokemon-details__art--${_(o)}">
        <span class="pokemon-details__art-id">#${t}</span>
        <img class="pokemon-details__art-image" src="${_(e.sprites)}" alt="${_(s)}">
        <span class="pokemon-details__art-caption">Покемон</span>
      </div>

      <div class="pokemon-details__overview">
        <div class="pokemon-details__identity">
          <div>
            <p class="pokemon-details__eyebrow">#${t} · ${_(e.generation||"Покоління невідоме")}</p>
            <h2 id="pokemon-details-title">${_(s)}</h2>
          </div>
          <button class="pokemon-details__like ${n?"is-liked":""}" type="button" data-details-like="${Number(e.id)}" aria-pressed="${n}" aria-label="${n?"Видалити з обраного":"Додати до обраного"}">
            <svg class="pokemon-details__like-icon" aria-hidden="true">
              <use href="${V}#heart"></use>
            </svg>
          </button>
        </div>

        <div class="pokemon-details__types">${Ye(e.type)}</div>
        <p class="pokemon-details__description">${_(e.description||"Опис для цього покемона поки відсутній.")}</p>

        <div class="pokemon-details__traits">
          <div><span>Зріст</span><strong>${_(ve(e.height,"м"))}</strong></div>
          <div><span>Вага</span><strong>${_(ve(e.weight,"кг"))}</strong></div>
          <div><span>Здібність</span><strong>${_(ze(e))}</strong></div>
        </div>
      </div>
    </div>

    ${Qe(e)}
    ${Be(e)}
  `}function Ke(){if(x)return;const e=document.body,t=document.documentElement;x={scrollX:window.scrollX,scrollY:window.scrollY,htmlOverflow:t.style.overflow,bodyStyles:{position:e.style.position,top:e.style.top,left:e.style.left,right:e.style.right,width:e.style.width,overflow:e.style.overflow}},e.style.position="fixed",e.style.top=`-${x.scrollY}px`,e.style.left=`-${x.scrollX}px`,e.style.right="0",e.style.width="100%",e.style.overflow="hidden",t.style.overflow="hidden"}function Ge(){if(!x)return;const e=x;x=null,Object.assign(document.body.style,e.bodyStyles),document.documentElement.style.overflow=e.htmlOverflow,window.requestAnimationFrame(()=>{window.scrollTo(e.scrollX,e.scrollY)})}function We(){if(!p)return;const e=p.getAttribute("aria-hidden")!=="false";e&&Ke(),p.inert=!1,p.style.display="flex",p.setAttribute("aria-hidden","false"),e&&requestAnimationFrame(()=>{var t;(t=p.querySelector(".pokemon-details__close"))==null||t.focus()})}function te(){if(!p)return;const e=W;e!=null&&e.isConnected?e.focus({preventScroll:!0}):p.contains(document.activeElement)&&document.activeElement.blur(),p.inert=!0,p.setAttribute("aria-hidden","true"),p.style.display="none",Ge(),Z=null,W=null,U+=1}async function ke(e){if(!j||!e)return;const t=++U;We(),p&&(p.scrollTop=0),H&&(H.textContent=`Покемон #${J(e)}`),j.innerHTML='<p class="pokemon-details__loading">Завантажуємо інформацію про покемона…</p>';try{const[s]=await A([],[Number(e)]);if(t!==U)return;if(!s)throw new Error("Покемона не знайдено.");Z=s,H&&(H.textContent=`Покемон #${J(s.id)}`),j.innerHTML=Xe(s)}catch(s){if(t!==U)return;console.error("Не вдалося завантажити деталі покемона:",s),j.innerHTML='<p class="pokemon-details__error">Не вдалося завантажити інформацію. Спробуй ще раз.</p>'}}function Ze(e){var n;const t=e.dataset.pokemonId||((n=e.querySelector("[data-id]"))==null?void 0:n.dataset.id);if(t&&/^\d+$/.test(t))return t;const s=e.querySelector(".favorites__id")||e.querySelector("span"),o=s==null?void 0:s.textContent.match(/\d+/);return o?o[0]:null}function et(e){if(e.target.closest("button, a, input, select, textarea, [data-no-details]"))return;const t=e.target.closest("li, section, article"),s=Ze(t);!t||!e.currentTarget.contains(t)||s&&(W=t,t.hasAttribute("tabindex")||t.setAttribute("tabindex","-1"),ke(s))}je.forEach(e=>e.addEventListener("click",et));B==null||B.forEach(e=>e.addEventListener("click",te));p==null||p.addEventListener("click",e=>{e.target===p&&te()});p==null||p.addEventListener("click",e=>{const t=e.target.closest("[data-evolution-id]");if(t){ke(t.dataset.evolutionId);return}const s=e.target.closest("[data-details-like]");if(!s||!Z)return;const o=Number(s.dataset.detailsLike),n=ee(),a=n.includes(o),c=a?n.filter(d=>d!==o):[...n,o];localStorage.setItem("likedPokemons",JSON.stringify(c));const r=!a;s.classList.toggle("is-liked",r),s.setAttribute("aria-pressed",String(r)),s.setAttribute("aria-label",r?"Видалити з обраного":"Додати до обраного"),Ve(),document.dispatchEvent(new CustomEvent("favorites:changed",{detail:{id:o,liked:r}}))});window.addEventListener("keydown",e=>{e.key==="Escape"&&(p==null?void 0:p.getAttribute("aria-hidden"))==="false"&&te()});
//# sourceMappingURL=main-50a6bb74.js.map
