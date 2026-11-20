(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const f of n.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();async function A(e=[],t=[],a=!0){var b;let r="https://pokeapi.co/api/v2/",s=Array.isArray(e)?e:[],n=Array.isArray(t)?[...t]:[t];if(n.length===0&&s.length>0){let l=null;for(let d of s){if(!d||!d.type)continue;let o=[];if(d.type==="gen"&&d.value)o=(await(await fetch(`${r}generation/${d.value}`)).json()).pokemon_species.map(u=>u.name);else if(d.type==="searchByTypes"&&Array.isArray(d.types)&&d.types.length>0){let i=d.types.map(y=>fetch(`${r}type/${y}`).then(k=>k.json())),u=(await Promise.all(i)).filter(y=>y&&y.pokemon).map(y=>y.pokemon.map(k=>k.pokemon.name));u.length>0&&(o=u.reduce((k,g)=>k.filter(w=>g.includes(w)),u[0]))}o.length>0&&(l=l?l.filter(i=>o.includes(i)):o)}l&&(n=l)}else if(n.length>0&&s.length>0){for(let l of s)if(!(!l||!l.type)){if(l.type==="gen"&&l.value){let o=(await(await fetch(`${r}generation/${l.value}`)).json()).pokemon_species.map(i=>i.name);n=n.filter(i=>o.includes(String(i).toLowerCase()))}else if(l.type==="searchByTypes"&&Array.isArray(l.types)){let d=l.types.map(c=>fetch(`${r}type/${c}`).then(u=>u.json())),i=(await Promise.all(d)).filter(c=>c&&c.pokemon).map(c=>c.pokemon.map(u=>u.pokemon.name));if(i.length>0){let c=i.reduce((u,y)=>u.filter(k=>y.includes(k)),i[0]);n=n.filter(u=>c.includes(String(u).toLowerCase()))}}}}const f={"generation-i":"Покоління I","generation-ii":"Покоління II","generation-iii":"Покоління III","generation-iv":"Покоління IV","generation-v":"Покоління V","generation-vi":"Покоління VI","generation-vii":"Покоління VII","generation-viii":"Покоління VIII","generation-ix":"Покоління IX"};let m=[];for(let l of n){let d=await fetch(`${r}pokemon/${l}`);if(!d.ok)continue;let o=await d.json(),i=o.stats.map(x=>x.base_stat),c=await fetch(`${r}pokemon-species/${o.id}`);if(!c.ok)continue;let u=await c.json(),y=await fetch(u.evolution_chain.url);if(!y.ok)continue;let g=(await y.json()).chain,w=[],Q=[];for(;g;){if(g.species&&g.species.name){w.push(g.species.name);let x=g.species.url.split("/")[g.species.url.split("/").length-2];Q.push({id:x,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${x}.png`})}g=g.evolves_to&&g.evolves_to.length>0?g.evolves_to[0]:null}const ie=((b=u.flavor_text_entries.find(x=>x.language.name==="en"))==null?void 0:b.flavor_text.replace(/\f/g," "))||"";let le={id:o.id,name:o.name,type:o.types,height:o.height/10+"m",weight:o.weight/10+"kg",abilities:o.abilities,hp:i[0],a:i[1],d:i[2],spA:i[3],spD:i[4],spe:i[5],sprites:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${o.id}.png`,description:ie,generation:f[u.generation.name],chain:w,evodata:Q};m.push(le)}let p=s.find(l=>l&&l.type==="sort");return p&&p.field&&p.order&&m.sort((l,d)=>{let o=l[p.field],i=d[p.field];return p.order==="desc"?i-o:o-i}),m}const F=document.querySelector(".hero__list"),ce=({pokemons:e,types:t,generations:a})=>{F.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${a} поколінь</p>
    </li>
    ${F.innerHTML}
  `};async function de(){try{const[e,t,a]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),s=await t.json(),n=await a.json();ce({pokemons:r.count,types:s.count,generations:n.count})}catch(e){console.error(e)}}F&&de();const J="/pokedex/assets/symbol-defs-a3682fdc.svg",$=document.querySelector(".btn-icon"),U=$==null?void 0:$.querySelector("use"),z=document.querySelector(".header__burger-btn"),T=document.querySelector(".header__nav");function H(e){if(U){const t=e?"sun":"moon";U.setAttribute("href",`${J}#${t}`)}}const pe=localStorage.getItem("theme");pe==="dark"?(document.body.classList.add("dark-theme"),H(!0)):H(!1);$==null||$.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),H(e)});z&&T&&(z.addEventListener("click",()=>{T.classList.toggle("is-open")}),T.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{T.classList.remove("is-open")})}));const V=document.querySelector(".world__list"),ue=({pokemons:e,types:t,generations:a})=>{V.innerHTML=`
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
        <span class="world__num">${a}</span> поколінь
      </p>
    </li>
    ${V.innerHTML}
  `};async function me(){try{const[e,t,a]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),s=await t.json(),n=await a.json();ue({pokemons:r.count,types:s.count,generations:n.count})}catch(e){console.error("Помилка:",e)}}V&&me();const B=document.querySelector(".easteregg__button"),K=document.querySelector(".easteregg__btn"),O=document.querySelector(".backdrop");if(B&&K&&O){const e=()=>{O.style.display="none"};B.addEventListener("click",e),K.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),O.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}const Y=document.querySelector(".btn-random"),G=document.querySelector(".random__btn"),R=document.querySelector(".backdrops"),X=document.querySelector(".random__box"),W=document.querySelector(".random__button"),fe={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"};function ye(e){const t=e.type.map(s=>`
      <li class="random__items">
        <p class="random__types random__${s.type.name}">
          ${fe[s.type.name]||s.type.name}
        </p>
      </li>
    `).join("");X.innerHTML=`
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
            <use href="${J}#heart"></use>
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
  `;const a=X.querySelector(".random__like");(JSON.parse(localStorage.getItem("likedPokemons"))||[]).includes(e.id)&&a.classList.add("liked"),a.addEventListener("click",()=>{const s=JSON.parse(localStorage.getItem("likedPokemons"))||[];if(s.includes(e.id)){const n=s.filter(f=>f!==e.id);localStorage.setItem("likedPokemons",JSON.stringify(n)),a.classList.remove("liked")}else s.push(e.id),localStorage.setItem("likedPokemons",JSON.stringify(s)),a.classList.add("liked")})}async function Z(){const e=Math.floor(Math.random()*1025)+1,[t]=await A([],[e]);t&&ye(t)}if(Y&&G&&R){const e=async()=>{R.style.display="flex",await Z()},t=()=>{R.style.display="none"};Y.addEventListener("click",e),G.addEventListener("click",t),W&&W.addEventListener("click",Z),window.addEventListener("keydown",a=>{a.key==="Escape"&&t()}),R.addEventListener("click",a=>{a.target===a.currentTarget&&t()})}const P={pageSize:10,maxPokemonId:1025},_={currentId:1,searchQuery:"",filters:[],loadedPokemons:[]},_e=`
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
`;function ge(e,t){const a=[];for(let r=e;r<=t;r++)a.push(r);return a}function ve(e){return Array.isArray(e)?e.map(t=>{const a={id:String(t.id||"").padStart(3,"0"),name:t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",sprites:t.sprites||"",type1:t.type&&t.type[0]&&t.type[0].type?t.type[0].type.name:"",type2:t.type&&t.type[1]&&t.type[1].type?t.type[1].type.name:""};return _e.replace(/<var>(.*?)<\/var>/g,(r,s)=>{const n=s.trim();return a[n]!==void 0?a[n]:""})}).join(""):""}function he([e,t],a,r){const s=document.querySelector(e),n=document.querySelector(t),f=document.querySelector(a),m=document.querySelector(r);function p(o){m&&(m.textContent=`Показано ${o} із ${P.maxPokemonId} покемонів`)}async function b(){const o=_.searchQuery.trim().toLowerCase();let i=_.loadedPokemons;if(o!==""&&(i=_.loadedPokemons.filter(c=>c.name.toLowerCase().includes(o)||String(c.id).includes(o)),i.length===0))try{const c=await A(_.filters,[o]);Array.isArray(c)&&c.length>0&&(i=c)}catch{console.log("Поиск через API не дал результатов")}s&&(s.innerHTML=ve(i)),p(i.length),n&&(n.style.display=o!==""||_.currentId>P.maxPokemonId?"none":"block")}async function l(o=!1){o&&(_.currentId=1,_.loadedPokemons=[]),n&&(n.disabled=!0);try{const i=_.currentId,c=Math.min(_.currentId+P.pageSize-1,P.maxPokemonId);if(i>P.maxPokemonId){n&&(n.style.display="none");return}const u=ge(i,c),y=await A(_.filters,u);if(_.currentId=c+1,o)_.loadedPokemons=y;else{const k=new Set(_.loadedPokemons.map(w=>w.id)),g=y.filter(w=>!k.has(w.id));_.loadedPokemons.push(...g)}await b()}catch(i){console.error("Помилка завантаження:",i)}finally{n&&(n.disabled=!1)}}let d;f&&f.addEventListener("input",o=>{clearTimeout(d),_.searchQuery=o.target.value,d=setTimeout(()=>{b()},300)}),n&&n.addEventListener("click",()=>{l(!1)}),l(!0)}he([".search-cards",".search-controls-button"],".search-input",".search-results-count");const j=document.querySelector(".search-input");document.querySelector('[data-action="random-pokemon"]');const D=document.querySelector('[data-action="sort-number"]'),E=document.querySelector('[data-action="filter-type"]'),q=document.querySelector('[data-action="filter-generation"]'),N=document.querySelector(".search-results-count"),v={query:"",sortOrder:"asc",types:[],generation:null},ee=[{id:"normal",name:"Звичайний"},{id:"fire",name:"Вогняний"},{id:"water",name:"Водяний"},{id:"electric",name:"Електричний"},{id:"grass",name:"Трав'яний"},{id:"ice",name:"Льодяний"},{id:"fighting",name:"Бойовий"},{id:"poison",name:"Отруйний"},{id:"ground",name:"Земляний"},{id:"flying",name:"Літаючий"},{id:"psychic",name:"Психічний"},{id:"bug",name:"Комаха"},{id:"rock",name:"Кам'яний"},{id:"ghost",name:"Примарний"},{id:"dragon",name:"Драконячий"},{id:"dark",name:"Темний"},{id:"steel",name:"Сталевий"},{id:"fairy",name:"Фейний"}],te=[{id:1,name:"Покоління І"},{id:2,name:"Покоління ІІ"},{id:3,name:"Покоління ІІІ"},{id:4,name:"Покоління IV"},{id:5,name:"Покоління V"},{id:6,name:"Покоління VI"},{id:7,name:"Покоління VII"},{id:8,name:"Покоління VIII"},{id:9,name:"Покоління ІХ"}];async function M(){const e=[];v.generation&&e.push({type:"gen",value:v.generation}),v.types.length>0&&e.push({type:"searchByTypes",types:v.types}),e.push({type:"sort",field:"id",order:v.sortOrder});try{let t=[];const a=v.query.trim().toLowerCase();a?t=await A(e,[a],!1):t=await A(e,[],!1),N&&(N.textContent=`Показано ${t.length} із 1 025 покемонів`),document.dispatchEvent(new CustomEvent("pokemon:update-list",{detail:{pokemons:t}}))}catch(t){console.error("Помилка під час фільтрації:",t),N&&(N.textContent="Показано 0 із 1 025 покемонів")}}function re(e,t,a){let r=e.parentNode.querySelector(".custom-dropdown-list");if(r){r.remove();return}document.querySelectorAll(".custom-dropdown-list").forEach(m=>m.remove());const s=document.createElement("ul");s.className="custom-dropdown-list",s.style.cssText=`
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
  `;const n=document.createElement("li");n.textContent="Усі",n.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px; font-weight: 600;",n.addEventListener("click",()=>{a(null),s.remove()}),s.appendChild(n),t.forEach(m=>{const p=document.createElement("li");p.textContent=m.name,p.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px;",p.addEventListener("mouseenter",()=>p.style.backgroundColor="rgba(0,0,0,0.05)"),p.addEventListener("mouseleave",()=>p.style.backgroundColor="transparent"),p.addEventListener("click",()=>{a(m.id),s.remove()}),s.appendChild(p)}),e.style.position="relative",e.parentNode.style.position="relative",e.parentNode.appendChild(s);function f(m){!e.contains(m.target)&&!s.contains(m.target)&&(s.remove(),document.removeEventListener("click",f))}setTimeout(()=>document.addEventListener("click",f),0)}let se=null;j==null||j.addEventListener("input",e=>{v.query=e.target.value,clearTimeout(se),se=setTimeout(()=>M(),400)});D==null||D.addEventListener("click",()=>{v.sortOrder=v.sortOrder==="asc"?"desc":"asc";const e=D.querySelector("span");e&&(e.textContent=v.sortOrder==="asc"?"За номером ↑":"За номером ↓"),M()});E==null||E.addEventListener("click",()=>{re(E,ee,e=>{v.types=e?[e]:[];const t=E.querySelector("span");if(t){const a=ee.find(r=>r.id===e);t.textContent=a?a.name:"Усі типи"}M()})});q==null||q.addEventListener("click",()=>{re(q,te,e=>{v.generation=e;const t=q.querySelector("span");if(t){const a=te.find(r=>r.id===e);t.textContent=a?a.name:"Усі покоління"}M()})});const I=document.querySelector(".favorites__list"),S=document.querySelector(".favorites__input"),L=document.querySelector('.favorites__btn[data-action="sort-number"]'),ae=document.querySelector(".favorites__span");function oe(){const e=document.querySelectorAll(".header__nav-badge");if(e.length!==0)try{const t=localStorage.getItem("likedPokemons"),a=t?JSON.parse(t):[],r=Array.isArray(a)?a.length:0;e.forEach(s=>{s.textContent=r})}catch(t){console.error("Помилка оновлення лічильника в шапці:",t)}}oe();const h={allFavorites:[],searchQuery:"",searchMode:"name"},be={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"},ke=`
<li class="favorites__item">
  <article class="favorites__article">
    <div class="favorites__header">
      <span class="favorites__id">#<var>id</var></span>
      <button type="button" class="favorites__button" data-id="<var>rawId</var>" aria-label="Видалити з улюблених">
        <svg class="favorites__heart">
          <use href="${J}#heart"></use>
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
`;function Se(e){return!Array.isArray(e)||e.length===0?'<p class="favorites__empty">У тебе поки немає улюблених покемонів або твій пошук не правильний.</p>':e.map(t=>{const a=t.id,r=String(t.id).padStart(3,"0"),s=t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",n=t.sprites||"",f=Array.isArray(t.type)?t.type.map(p=>{var d;const b=((d=p==null?void 0:p.type)==null?void 0:d.name)||"",l=be[b]||b;return`<span class="favorites__type favorites__type--${b}">${l}</span>`}).join(""):"",m={rawId:a,id:r,name:s,sprites:n,typesHtml:f};return ke.replace(/<var>(.*?)<\/var>/g,(p,b)=>{const l=b.trim();return m[l]!==void 0?m[l]:""})}).join("")}function we(e){ae&&(ae.textContent=e)}function C(){const e=S?S.value.trim().toLowerCase():h.searchQuery;let t=h.allFavorites.filter(a=>e?h.searchMode==="id"?String(a.id).includes(e):a.name.toLowerCase().includes(e):!0);I&&(I.innerHTML=Se(t)),we(h.allFavorites.length)}async function Le(){try{const e=localStorage.getItem("likedPokemons");console.log("Raw localStorage likedPokemons:",e);const t=e?JSON.parse(e):[];if(console.log("Parsed saved IDs:",t),!Array.isArray(t)||t.length===0){h.allFavorites=[],C();return}const a=await A([],t,!1);console.log("Fetched pokemons data from API:",a),h.allFavorites=Array.isArray(a)?a:[],C()}catch(e){console.error("Помилка завантаження улюблених покемонів:",e)}}let ne;S==null||S.addEventListener("input",e=>{clearTimeout(ne),h.searchQuery=e.target.value,ne=setTimeout(()=>{C()},300)});L==null||L.addEventListener("click",()=>{h.searchMode=h.searchMode==="name"?"id":"name";const e=L.querySelector(".favorites__tablet"),t=L.querySelector(".favorites__mobile");h.searchMode==="id"?(e&&(e.textContent="Пошук за номером ←"),t&&(t.textContent="За № ←"),L.classList.add("is-active"),S&&(S.placeholder="Введіть номер покемона...")):(e&&(e.textContent="Пошук за назвою ←"),t&&(t.textContent="За назвою ←"),L.classList.remove("is-active"),S&&(S.placeholder="Пошук за назвою або номером...")),C()});I==null||I.addEventListener("click",e=>{const t=e.target.closest(".favorites__button");if(!t)return;const a=Number(t.dataset.id);let r=JSON.parse(localStorage.getItem("likedPokemons"))||[];r=r.filter(s=>Number(s)!==a),localStorage.setItem("likedPokemons",JSON.stringify(r)),h.allFavorites=h.allFavorites.filter(s=>s.id!==a),C(),oe()});I&&Le();
//# sourceMappingURL=main-e76fe4cd.js.map
