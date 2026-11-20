(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();async function A(e=[],t=[],s=!0){var w;let r="https://pokeapi.co/api/v2/",a=Array.isArray(e)?e:[],n=Array.isArray(t)?[...t]:[t];if(n.length===0&&a.length>0){let u=null;for(let f of a){if(!f||!f.type)continue;let i=[];if(f.type==="gen"&&f.value)i=(await(await fetch(`${r}generation/${f.value}`)).json()).pokemon_species.map(y=>y.name);else if(f.type==="searchByTypes"&&Array.isArray(f.types)&&f.types.length>0){let l=f.types.map(v=>fetch(`${r}type/${v}`).then(S=>S.json())),y=(await Promise.all(l)).filter(v=>v&&v.pokemon).map(v=>v.pokemon.map(S=>S.pokemon.name));y.length>0&&(i=y.reduce((S,k)=>S.filter(L=>k.includes(L)),y[0]))}i.length>0&&(u=u?u.filter(l=>i.includes(l)):i)}u&&(n=u)}else if(n.length>0&&a.length>0){for(let u of a)if(!(!u||!u.type)){if(u.type==="gen"&&u.value){let i=(await(await fetch(`${r}generation/${u.value}`)).json()).pokemon_species.map(l=>l.name);n=n.filter(l=>i.includes(String(l).toLowerCase()))}else if(u.type==="searchByTypes"&&Array.isArray(u.types)){let f=u.types.map(m=>fetch(`${r}type/${m}`).then(y=>y.json())),l=(await Promise.all(f)).filter(m=>m&&m.pokemon).map(m=>m.pokemon.map(y=>y.pokemon.name));if(l.length>0){let m=l.reduce((y,v)=>y.filter(S=>v.includes(S)),l[0]);n=n.filter(y=>m.includes(String(y).toLowerCase()))}}}}const c={"generation-i":"Покоління I","generation-ii":"Покоління II","generation-iii":"Покоління III","generation-iv":"Покоління IV","generation-v":"Покоління V","generation-vi":"Покоління VI","generation-vii":"Покоління VII","generation-viii":"Покоління VIII","generation-ix":"Покоління IX"};let o=[];for(let u of n){let f=await fetch(`${r}pokemon/${u}`);if(!f.ok)continue;let i=await f.json(),l=i.stats.map(P=>P.base_stat),m=await fetch(`${r}pokemon-species/${i.id}`);if(!m.ok)continue;let y=await m.json(),v=await fetch(y.evolution_chain.url);if(!v.ok)continue;let k=(await v.json()).chain,L=[],se=[];for(;k;){if(k.species&&k.species.name){L.push(k.species.name);let P=k.species.url.split("/")[k.species.url.split("/").length-2];se.push({id:P,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${P}.png`})}k=k.evolves_to&&k.evolves_to.length>0?k.evolves_to[0]:null}const ke=((w=y.flavor_text_entries.find(P=>P.language.name==="en"))==null?void 0:w.flavor_text.replace(/\f/g," "))||"";let be={id:i.id,name:i.name,type:i.types,height:i.height/10+"m",weight:i.weight/10+"kg",abilities:i.abilities,hp:l[0],a:l[1],d:l[2],spA:l[3],spD:l[4],spe:l[5],sprites:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i.id}.png`,description:ke,generation:c[y.generation.name],chain:L,evodata:se};o.push(be)}let d=a.find(u=>u&&u.type==="sort");return d&&d.field&&d.order&&o.sort((u,f)=>{let i=u[d.field],l=f[d.field];return d.order==="desc"?l-i:i-l}),o}const X=document.querySelector(".hero__list"),we=({pokemons:e,types:t,generations:s})=>{X.innerHTML=`
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
  `};async function Se(){try{const[e,t,s]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),a=await t.json(),n=await s.json();we({pokemons:r.count,types:a.count,generations:n.count})}catch(e){console.error(e)}}X&&Se();const V="/pokedex/assets/symbol-defs-a3682fdc.svg",q=document.querySelector(".btn-icon"),ae=q==null?void 0:q.querySelector("use"),ne=document.querySelector(".header__burger-btn"),R=document.querySelector(".header__nav");function K(e){if(ae){const t=e?"sun":"moon";ae.setAttribute("href",`${V}#${t}`)}}const $e=localStorage.getItem("theme");$e==="dark"?(document.body.classList.add("dark-theme"),K(!0)):K(!1);q==null||q.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),K(e)});ne&&R&&(ne.addEventListener("click",()=>{R.classList.toggle("is-open")}),R.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{R.classList.remove("is-open")})}));function Le(){function e(){try{const t=localStorage.getItem("likedPokemons"),s=t?JSON.parse(t):[],r=Array.isArray(s)?s.length:0;document.querySelectorAll(".header__nav-badge").forEach(a=>{a.textContent=r})}catch(t){console.error("Error updating header counter:",t)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("favorites:changed",e),window.addEventListener("storage",t=>{t.key==="likedPokemons"&&e()})}Le();const G=document.querySelector(".world__list"),Ae=({pokemons:e,types:t,generations:s})=>{G.innerHTML=`
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
  `};async function Ee(){try{const[e,t,s]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),a=await t.json(),n=await s.json();Ae({pokemons:r.count,types:a.count,generations:n.count})}catch(e){console.error("Помилка:",e)}}G&&Ee();const re=document.querySelector(".easteregg__button"),oe=document.querySelector(".easteregg__btn"),Y=document.querySelector(".backdrop");if(re&&oe&&Y){const e=()=>{Y.style.display="none"};re.addEventListener("click",e),oe.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),Y.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}const ie=document.querySelector(".btn-random"),le=document.querySelector(".random__btn"),D=document.querySelector(".backdrops"),ce=document.querySelector(".random__box"),de=document.querySelector(".random__button"),xe={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"};function Ie(e){const t=e.type.map(a=>`
      <li class="random__items">
        <p class="random__types random__${a.type.name}">
          ${xe[a.type.name]||a.type.name}
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
  `;const s=ce.querySelector(".random__like");(JSON.parse(localStorage.getItem("likedPokemons"))||[]).includes(e.id)&&s.classList.add("liked"),s.addEventListener("click",()=>{const a=JSON.parse(localStorage.getItem("likedPokemons"))||[];if(a.includes(e.id)){const n=a.filter(c=>c!==e.id);localStorage.setItem("likedPokemons",JSON.stringify(n)),s.classList.remove("liked")}else a.push(e.id),localStorage.setItem("likedPokemons",JSON.stringify(a)),s.classList.add("liked");document.dispatchEvent(new Event("favorites:changed"))})}async function pe(){const e=Math.floor(Math.random()*1025)+1,[t]=await A([],[e]);t&&Ie(t)}if(ie&&le&&D){const e=async()=>{D.style.display="flex",await pe()},t=()=>{D.style.display="none"};ie.addEventListener("click",e),le.addEventListener("click",t),de&&de.addEventListener("click",pe),window.addEventListener("keydown",s=>{s.key==="Escape"&&t()}),D.addEventListener("click",s=>{s.target===s.currentTarget&&t()})}const N={pageSize:10,maxPokemonId:1025},h={currentId:1,searchQuery:"",filters:[],loadedPokemons:[]},Pe=`
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
`;function qe(e,t){const s=[];for(let r=e;r<=t;r++)s.push(r);return s}function Ce(e){return Array.isArray(e)?e.map(t=>{const s={id:String(t.id||"").padStart(3,"0"),name:t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",sprites:t.sprites||"",type1:t.type&&t.type[0]&&t.type[0].type?t.type[0].type.name:"",type2:t.type&&t.type[1]&&t.type[1].type?t.type[1].type.name:""};return Pe.replace(/<var>(.*?)<\/var>/g,(r,a)=>{const n=a.trim();return s[n]!==void 0?s[n]:""})}).join(""):""}function Ne([e,t],s,r){const a=document.querySelector(e),n=document.querySelector(t),c=document.querySelector(s),o=document.querySelector(r);function d(i){o&&(o.textContent=`Показано ${i} із ${N.maxPokemonId} покемонів`)}async function w(){const i=h.searchQuery.trim().toLowerCase();let l=h.loadedPokemons;if(i!==""&&(l=h.loadedPokemons.filter(m=>m.name.toLowerCase().includes(i)||String(m.id).includes(i)),l.length===0))try{const m=await A(h.filters,[i]);Array.isArray(m)&&m.length>0&&(l=m)}catch{console.log("Поиск через API не дал результатов")}a&&(a.innerHTML=Ce(l)),d(l.length),n&&(n.style.display=i!==""||h.currentId>N.maxPokemonId?"none":"block")}async function u(i=!1){i&&(h.currentId=1,h.loadedPokemons=[]),n&&(n.disabled=!0);try{const l=h.currentId,m=Math.min(h.currentId+N.pageSize-1,N.maxPokemonId);if(l>N.maxPokemonId){n&&(n.style.display="none");return}const y=qe(l,m),v=await A(h.filters,y);if(h.currentId=m+1,i)h.loadedPokemons=v;else{const S=new Set(h.loadedPokemons.map(L=>L.id)),k=v.filter(L=>!S.has(L.id));h.loadedPokemons.push(...k)}await w()}catch(l){console.error("Помилка завантаження:",l)}finally{n&&(n.disabled=!1)}}let f;c&&c.addEventListener("input",i=>{clearTimeout(f),h.searchQuery=i.target.value,f=setTimeout(()=>{w()},300)}),n&&n.addEventListener("click",()=>{u(!1)}),u(!0)}Ne([".search-cards",".search-controls-button"],".search-input",".search-results-count");const Q=document.querySelector(".search-input");document.querySelector('[data-action="random-pokemon"]');const O=document.querySelector('[data-action="sort-number"]'),T=document.querySelector('[data-action="filter-type"]'),M=document.querySelector('[data-action="filter-generation"]'),F=document.querySelector(".search-results-count"),b={query:"",sortOrder:"asc",types:[],generation:null},ue=[{id:"normal",name:"Звичайний"},{id:"fire",name:"Вогняний"},{id:"water",name:"Водяний"},{id:"electric",name:"Електричний"},{id:"grass",name:"Трав'яний"},{id:"ice",name:"Льодяний"},{id:"fighting",name:"Бойовий"},{id:"poison",name:"Отруйний"},{id:"ground",name:"Земляний"},{id:"flying",name:"Літаючий"},{id:"psychic",name:"Психічний"},{id:"bug",name:"Комаха"},{id:"rock",name:"Кам'яний"},{id:"ghost",name:"Примарний"},{id:"dragon",name:"Драконячий"},{id:"dark",name:"Темний"},{id:"steel",name:"Сталевий"},{id:"fairy",name:"Фейний"}],me=[{id:1,name:"Покоління І"},{id:2,name:"Покоління ІІ"},{id:3,name:"Покоління ІІІ"},{id:4,name:"Покоління IV"},{id:5,name:"Покоління V"},{id:6,name:"Покоління VI"},{id:7,name:"Покоління VII"},{id:8,name:"Покоління VIII"},{id:9,name:"Покоління ІХ"}];async function z(){const e=[];b.generation&&e.push({type:"gen",value:b.generation}),b.types.length>0&&e.push({type:"searchByTypes",types:b.types}),e.push({type:"sort",field:"id",order:b.sortOrder});try{let t=[];const s=b.query.trim().toLowerCase();s?t=await A(e,[s],!1):t=await A(e,[],!1),F&&(F.textContent=`Показано ${t.length} із 1 025 покемонів`),document.dispatchEvent(new CustomEvent("pokemon:update-list",{detail:{pokemons:t}}))}catch(t){console.error("Помилка під час фільтрації:",t),F&&(F.textContent="Показано 0 із 1 025 покемонів")}}function ve(e,t,s){let r=e.parentNode.querySelector(".custom-dropdown-list");if(r){r.remove();return}document.querySelectorAll(".custom-dropdown-list").forEach(o=>o.remove());const a=document.createElement("ul");a.className="custom-dropdown-list",a.style.cssText=`
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
  `;const n=document.createElement("li");n.textContent="Усі",n.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px; font-weight: 600;",n.addEventListener("click",()=>{s(null),a.remove()}),a.appendChild(n),t.forEach(o=>{const d=document.createElement("li");d.textContent=o.name,d.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px;",d.addEventListener("mouseenter",()=>d.style.backgroundColor="rgba(0,0,0,0.05)"),d.addEventListener("mouseleave",()=>d.style.backgroundColor="transparent"),d.addEventListener("click",()=>{s(o.id),a.remove()}),a.appendChild(d)}),e.style.position="relative",e.parentNode.style.position="relative",e.parentNode.appendChild(a);function c(o){!e.contains(o.target)&&!a.contains(o.target)&&(a.remove(),document.removeEventListener("click",c))}setTimeout(()=>document.addEventListener("click",c),0)}let fe=null;Q==null||Q.addEventListener("input",e=>{b.query=e.target.value,clearTimeout(fe),fe=setTimeout(()=>z(),400)});O==null||O.addEventListener("click",()=>{b.sortOrder=b.sortOrder==="asc"?"desc":"asc";const e=O.querySelector("span");e&&(e.textContent=b.sortOrder==="asc"?"За номером ↑":"За номером ↓"),z()});T==null||T.addEventListener("click",()=>{ve(T,ue,e=>{b.types=e?[e]:[];const t=T.querySelector("span");if(t){const s=ue.find(r=>r.id===e);t.textContent=s?s.name:"Усі типи"}z()})});M==null||M.addEventListener("click",()=>{ve(M,me,e=>{b.generation=e;const t=M.querySelector("span");if(t){const s=me.find(r=>r.id===e);t.textContent=s?s.name:"Усі покоління"}z()})});const I=document.querySelector(".favorites__list"),$=document.querySelector(".favorites__input"),E=document.querySelector('.favorites__btn[data-action="sort-number"]'),ye=document.querySelector(".favorites__span"),g={allFavorites:[],searchQuery:"",searchMode:"name"},Te={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},Me=`
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
`;function Re(e){return!Array.isArray(e)||e.length===0?'<p class="favorites__empty">У тебе поки немає улюблених покемонів або твій пошук не правильний.</p>':e.map(t=>{const s=t.id,r=String(t.id).padStart(3,"0"),a=t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",n=t.sprites||"",c=Array.isArray(t.type)?t.type.map(d=>{var f;const w=((f=d==null?void 0:d.type)==null?void 0:f.name)||"",u=Te[w]||w;return`<span class="favorites__type favorites__type--${w}">${u}</span>`}).join(""):"",o={rawId:s,id:r,name:a,sprites:n,typesHtml:c};return Me.replace(/<var>(.*?)<\/var>/g,(d,w)=>{const u=w.trim();return o[u]!==void 0?o[u]:""})}).join("")}function De(e){ye&&(ye.textContent=e)}function C(){const e=$?$.value.trim().toLowerCase():g.searchQuery;let t=g.allFavorites.filter(s=>e?g.searchMode==="id"?String(s.id).includes(e):s.name.toLowerCase().includes(e):!0);I&&(I.innerHTML=Re(t)),De(g.allFavorites.length)}async function Oe(){try{const e=localStorage.getItem("likedPokemons");console.log("Raw localStorage likedPokemons:",e);const t=e?JSON.parse(e):[];if(console.log("Parsed saved IDs:",t),!Array.isArray(t)||t.length===0){g.allFavorites=[],C();return}const s=await A([],t,!1);console.log("Fetched pokemons data from API:",s),g.allFavorites=Array.isArray(s)?s:[],C()}catch(e){console.error("Помилка завантаження улюблених покемонів:",e)}}let _e;$==null||$.addEventListener("input",e=>{clearTimeout(_e),g.searchQuery=e.target.value,_e=setTimeout(()=>{C()},300)});E==null||E.addEventListener("click",()=>{g.searchMode=g.searchMode==="name"?"id":"name";const e=E.querySelector(".favorites__tablet"),t=E.querySelector(".favorites__mobile");g.searchMode==="id"?(e&&(e.textContent="Пошук за номером ←"),t&&(t.textContent="За № ←"),E.classList.add("is-active"),$&&($.placeholder="Введіть номер покемона...")):(e&&(e.textContent="Пошук за назвою ←"),t&&(t.textContent="За назвою ←"),E.classList.remove("is-active"),$&&($.placeholder="Пошук за назвою або номером...")),C()});I==null||I.addEventListener("click",e=>{const t=e.target.closest(".favorites__button");if(!t)return;const s=Number(t.dataset.id);let r=JSON.parse(localStorage.getItem("likedPokemons"))||[];r=r.filter(a=>Number(a)!==s),localStorage.setItem("likedPokemons",JSON.stringify(r)),g.allFavorites=g.allFavorites.filter(a=>a.id!==s),C(),document.dispatchEvent(new Event("favorites:changed"))});document.addEventListener("favorites:changed",async e=>{const{id:t,liked:s}=e.detail||{},r=Number(t);if(Number.isFinite(r)){if(I){if(s){if(!g.allFavorites.some(n=>Number(n.id)===r))try{const[n]=await A([],[r],!1);n&&g.allFavorites.push(n)}catch(n){console.error("Error adding favorite:",n)}}else g.allFavorites=g.allFavorites.filter(a=>Number(a.id)!==r);C()}initHeaderCounter()}});I&&Oe();const p=document.querySelector("[data-details-backdrop]"),j=p==null?void 0:p.querySelector("[data-details-content]"),H=p==null?void 0:p.querySelector("[data-details-toolbar-id]"),B=p==null?void 0:p.querySelectorAll("[data-details-close]"),Fe=document.querySelectorAll(".search-cards, .favorites__list");let W=null;const je={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},He={static:"Статика","lightning-rod":"Блискавковідвід",overgrow:"Заростання",blaze:"Спалах",torrent:"Потік","shield-dust":"Захисний пил","compound-eyes":"Складні очі",swarm:"Рій","keen-eye":"Гострий зір","run-away":"Втеча",intimidate:"Залякування",levitate:"Левітація",pressure:"Тиск",adaptability:"Адаптивність",synchronize:"Синхронізація","inner-focus":"Внутрішній фокус"},Ue=[["hp","HP"],["a","Атака"],["d","Захист"],["spA","Спец. атака"],["spD","Спец. захист"],["spe","Швидкість"]];let Z=null,U=0,x=null;function _(e=""){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function J(e){return String(e).padStart(3,"0")}function ee(){try{const e=JSON.parse(localStorage.getItem("likedPokemons")||"[]");return Array.isArray(e)?e.map(Number):[]}catch(e){return console.error("Не вдалося прочитати список обраного:",e),[]}}function Je(){const e=ee().length;document.querySelectorAll(".header__nav-badge").forEach(t=>{t.textContent=e})}function ge(e,t){const s=Number.parseFloat(e);return Number.isFinite(s)?`${s.toFixed(1).replace(".",",")} ${t}`:`${e||"—"} ${t}`}function Ve(e){var r,a,n;const t=((r=e.abilities)==null?void 0:r.find(c=>!c.is_hidden))||((a=e.abilities)==null?void 0:a[0]),s=(n=t==null?void 0:t.ability)==null?void 0:n.name;return s?He[s]||s.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase()):"—"}function ze(e=[]){return e.map(t=>{var a;const s=((a=t==null?void 0:t.type)==null?void 0:a.name)||"",r=je[s]||s;return`<span class="pokemon-details__type pokemon-details__type--${_(s)}">${_(r)}</span>`}).join("")}function Ye(e){var a,n,c;const t=((c=(n=(a=e.type)==null?void 0:a[0])==null?void 0:n.type)==null?void 0:c.name)||"normal",s=Ue.map(([o,d])=>({label:d,value:Number(e[o])||0}));return`
    <section class="pokemon-details__section pokemon-details__stats-section">
      <div class="pokemon-details__section-heading">
        <h3>Базові характеристики</h3>
        <span>Разом: <strong>${s.reduce((o,d)=>o+d.value,0)}</strong></span>
      </div>

      <ul class="pokemon-details__stats">
        ${s.map(({label:o,value:d})=>`
          <li class="pokemon-details__stat">
            <span class="pokemon-details__stat-name">${o}</span>

            <span class="pokemon-details__stat-value">${d}</span>

            <progress
              class="pokemon-details__progress pokemon-details__progress--${_(t)}"
              value="${Math.min(d,255)}"
              max="255"
              aria-label="${o}: ${d}"
            ></progress>
          </li>
        `).join("")}
      </ul>
    </section>
  `}function Qe(e){const t=Array.isArray(e.evodata)?e.evodata:[],s=Array.isArray(e.chain)?e.chain:[];return t.length?`
    <section class="pokemon-details__section pokemon-details__evolution-section">
      <h3>Еволюційний ланцюг</h3>
      <div class="pokemon-details__evolutions">
        ${t.map((r,a)=>{const n=Number(r.id),c=s[a]||`Pokémon ${n}`,o=n===Number(e.id);return`
            <button
              class="pokemon-details__evolution ${o?"is-current":""}"
              type="button"
              data-evolution-id="${n}"
              aria-current="${o?"true":"false"}"
              aria-label="Відкрити ${_(c)}"
            >
              <span class="pokemon-details__evolution-image">
                <img src="${_(r.img)}" alt="${_(c)}" loading="lazy">
              </span>
              <span class="pokemon-details__evolution-name">${_(c.charAt(0).toUpperCase()+c.slice(1))}</span>
              <span class="pokemon-details__evolution-id">#${J(n)}</span>
            </button>
            ${a<t.length-1?'<span class="pokemon-details__evolution-arrow" aria-hidden="true">→</span>':""}
          `}).join("")}
      </div>
    </section>
  `:`
      <section class="pokemon-details__section pokemon-details__evolution-section">
        <h3>Еволюційний ланцюг</h3>
        <p class="pokemon-details__no-evolution">Інформація про еволюцію відсутня.</p>
      </section>
    `}function Be(e){var n,c,o;const t=J(e.id),s=e.name?e.name.charAt(0).toUpperCase()+e.name.slice(1):"Pokémon",r=((o=(c=(n=e.type)==null?void 0:n[0])==null?void 0:c.type)==null?void 0:o.name)||"normal",a=ee().includes(Number(e.id));return`
    <div class="pokemon-details__top">
      <div class="pokemon-details__art pokemon-details__art--${_(r)}">
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
          <button class="pokemon-details__like ${a?"is-liked":""}" type="button" data-details-like="${Number(e.id)}" aria-pressed="${a}" aria-label="${a?"Видалити з обраного":"Додати до обраного"}">
            <svg class="pokemon-details__like-icon" aria-hidden="true">
              <use href="${V}#heart"></use>
            </svg>
          </button>
        </div>

        <div class="pokemon-details__types">${ze(e.type)}</div>
        <p class="pokemon-details__description">${_(e.description||"Опис для цього покемона поки відсутній.")}</p>

        <div class="pokemon-details__traits">
          <div><span>Зріст</span><strong>${_(ge(e.height,"м"))}</strong></div>
          <div><span>Вага</span><strong>${_(ge(e.weight,"кг"))}</strong></div>
          <div><span>Здібність</span><strong>${_(Ve(e))}</strong></div>
        </div>
      </div>
    </div>

    ${Ye(e)}
    ${Qe(e)}
  `}function Xe(){if(x)return;const e=document.body,t=document.documentElement;x={scrollX:window.scrollX,scrollY:window.scrollY,htmlOverflow:t.style.overflow,bodyStyles:{position:e.style.position,top:e.style.top,left:e.style.left,right:e.style.right,width:e.style.width,overflow:e.style.overflow}},e.style.position="fixed",e.style.top=`-${x.scrollY}px`,e.style.left=`-${x.scrollX}px`,e.style.right="0",e.style.width="100%",e.style.overflow="hidden",t.style.overflow="hidden"}function Ke(){if(!x)return;const e=x;x=null,Object.assign(document.body.style,e.bodyStyles),document.documentElement.style.overflow=e.htmlOverflow,window.requestAnimationFrame(()=>{window.scrollTo(e.scrollX,e.scrollY)})}function Ge(){if(!p)return;const e=p.getAttribute("aria-hidden")!=="false";e&&Xe(),p.inert=!1,p.style.display="flex",p.setAttribute("aria-hidden","false"),e&&requestAnimationFrame(()=>{var t;(t=p.querySelector(".pokemon-details__close"))==null||t.focus()})}function te(){if(!p)return;const e=W;e!=null&&e.isConnected?e.focus({preventScroll:!0}):p.contains(document.activeElement)&&document.activeElement.blur(),p.inert=!0,p.setAttribute("aria-hidden","true"),p.style.display="none",Ke(),Z=null,W=null,U+=1}async function he(e){if(!j||!e)return;const t=++U;Ge(),p&&(p.scrollTop=0),H&&(H.textContent=`Покемон #${J(e)}`),j.innerHTML='<p class="pokemon-details__loading">Завантажуємо інформацію про покемона…</p>';try{const[s]=await A([],[Number(e)]);if(t!==U)return;if(!s)throw new Error("Покемона не знайдено.");Z=s,H&&(H.textContent=`Покемон #${J(s.id)}`),j.innerHTML=Be(s)}catch(s){if(t!==U)return;console.error("Не вдалося завантажити деталі покемона:",s),j.innerHTML='<p class="pokemon-details__error">Не вдалося завантажити інформацію. Спробуй ще раз.</p>'}}function We(e){var a;const t=e.dataset.pokemonId||((a=e.querySelector("[data-id]"))==null?void 0:a.dataset.id);if(t&&/^\d+$/.test(t))return t;const s=e.querySelector(".favorites__id")||e.querySelector("span"),r=s==null?void 0:s.textContent.match(/\d+/);return r?r[0]:null}function Ze(e){if(e.target.closest("button, a, input, select, textarea, [data-no-details]"))return;const t=e.target.closest("li, section, article"),s=We(t);!t||!e.currentTarget.contains(t)||s&&(W=t,t.hasAttribute("tabindex")||t.setAttribute("tabindex","-1"),he(s))}Fe.forEach(e=>e.addEventListener("click",Ze));B==null||B.forEach(e=>e.addEventListener("click",te));p==null||p.addEventListener("click",e=>{e.target===p&&te()});p==null||p.addEventListener("click",e=>{const t=e.target.closest("[data-evolution-id]");if(t){he(t.dataset.evolutionId);return}const s=e.target.closest("[data-details-like]");if(!s||!Z)return;const r=Number(s.dataset.detailsLike),a=ee(),n=a.includes(r),c=n?a.filter(d=>d!==r):[...a,r];localStorage.setItem("likedPokemons",JSON.stringify(c));const o=!n;s.classList.toggle("is-liked",o),s.setAttribute("aria-pressed",String(o)),s.setAttribute("aria-label",o?"Видалити з обраного":"Додати до обраного"),Je(),document.dispatchEvent(new CustomEvent("favorites:changed",{detail:{id:r,liked:o}}))});window.addEventListener("keydown",e=>{e.key==="Escape"&&(p==null?void 0:p.getAttribute("aria-hidden"))==="false"&&te()});
//# sourceMappingURL=main-2fb28dc6.js.map
