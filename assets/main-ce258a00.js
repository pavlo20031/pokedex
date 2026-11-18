import{e as se}from"./vendor-3fb8d95f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const g of s.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&i(g)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();async function I(e=[],t=[],a=!0){var _;let i="https://pokeapi.co/api/v2/",n=Array.isArray(e)?e:[],s=Array.isArray(t)?[...t]:[t];if(s.length===0&&n.length>0){let l=null;for(let d of n){if(!d||!d.type)continue;let o=[];if(d.type==="gen"&&d.value)o=(await(await fetch(`${i}generation/${d.value}`)).json()).pokemon_species.map(m=>m.name);else if(d.type==="searchByTypes"&&Array.isArray(d.types)&&d.types.length>0){let r=d.types.map(f=>fetch(`${i}type/${f}`).then(k=>k.json())),m=(await Promise.all(r)).filter(f=>f&&f.pokemon).map(f=>f.pokemon.map(k=>k.pokemon.name));m.length>0&&(o=m.reduce((k,h)=>k.filter(b=>h.includes(b)),m[0]))}o.length>0&&(l=l?l.filter(r=>o.includes(r)):o)}l&&(s=l)}else if(s.length>0&&n.length>0){for(let l of n)if(!(!l||!l.type)){if(l.type==="gen"&&l.value){let o=(await(await fetch(`${i}generation/${l.value}`)).json()).pokemon_species.map(r=>r.name);s=s.filter(r=>o.includes(String(r).toLowerCase()))}else if(l.type==="searchByTypes"&&Array.isArray(l.types)){let d=l.types.map(c=>fetch(`${i}type/${c}`).then(m=>m.json())),r=(await Promise.all(d)).filter(c=>c&&c.pokemon).map(c=>c.pokemon.map(m=>m.pokemon.name));if(r.length>0){let c=r.reduce((m,f)=>m.filter(k=>f.includes(k)),r[0]);s=s.filter(m=>c.includes(String(m).toLowerCase()))}}}}const g={"generation-i":"Покоління I","generation-ii":"Покоління II","generation-iii":"Покоління III","generation-iv":"Покоління IV","generation-v":"Покоління V","generation-vi":"Покоління VI","generation-vii":"Покоління VII","generation-viii":"Покоління VIII","generation-ix":"Покоління IX"};let u=[];for(let l of s){let d=await fetch(`${i}pokemon/${l}`);if(!d.ok)continue;let o=await d.json(),r=o.stats.map(w=>w.base_stat),c=await fetch(`${i}pokemon-species/${o.id}`);if(!c.ok)continue;let m=await c.json(),f=await fetch(m.evolution_chain.url);if(!f.ok)continue;let h=(await f.json()).chain,b=[],T=[];for(;h;){if(h.species&&h.species.name){b.push(h.species.name);let w=h.species.url.split("/")[h.species.url.split("/").length-2];T.push({id:w,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${w}.png`})}h=h.evolves_to&&h.evolves_to.length>0?h.evolves_to[0]:null}console.log(T);const M=((_=m.flavor_text_entries.find(w=>w.language.name==="en"))==null?void 0:_.flavor_text.replace(/\f/g," "))||"";let V=M;try{V=await se(M,{from:"en",to:"uk"})}catch(w){console.error("Помилка перекладу:",w)}let te={id:o.id,name:o.name,type:o.types,height:o.height/10+"m",weight:o.weight/10+"kg",abilities:o.abilities,hp:r[0],a:r[1],d:r[2],spA:r[3],spD:r[4],spe:r[5],sprites:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${o.id}.png`,description:V,generation:g[m.generation.name],chain:b,evodata:T};u.push(te)}let p=n.find(l=>l&&l.type==="sort");return p&&p.field&&p.order&&u.sort((l,d)=>{let o=l[p.field],r=d[p.field];return p.order==="desc"?r-o:o-r}),u}const N=document.querySelector(".hero__list"),ne=({pokemons:e,types:t,generations:a})=>{N.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${a} поколінь</p>
    </li>
    ${N.innerHTML}
  `};async function ae(){try{const[e,t,a]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),i=await e.json(),n=await t.json(),s=await a.json();ne({pokemons:i.count,types:n.count,generations:s.count})}catch(e){console.error(e)}}N&&ae();const Z="/pokedex/assets/symbol-defs-a3682fdc.svg",S=document.querySelector(".btn-icon"),F=S==null?void 0:S.querySelector("use"),H=document.querySelector(".header__burger-btn"),P=document.querySelector(".header__nav");function j(e){if(F){const t=e?"sun":"moon";F.setAttribute("href",`${Z}#${t}`)}}const oe=localStorage.getItem("theme");oe==="dark"?(document.body.classList.add("dark-theme"),j(!0)):j(!1);S==null||S.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),j(e)});H&&P&&(H.addEventListener("click",()=>{P.classList.toggle("is-open")}),P.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{P.classList.remove("is-open")})}));const O=document.querySelector(".world__list"),re=({pokemons:e,types:t,generations:a})=>{O.innerHTML=`
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
    ${O.innerHTML}
  `};async function ie(){try{const[e,t,a]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),i=await e.json(),n=await t.json(),s=await a.json();re({pokemons:i.count,types:n.count,generations:s.count})}catch(e){console.error("Помилка:",e)}}O&&ie();const z=document.querySelector(".easteregg__button"),J=document.querySelector(".easteregg__btn"),C=document.querySelector(".backdrop");if(z&&J&&C){const e=()=>{C.style.display="none"};z.addEventListener("click",e),J.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),C.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}const Q=document.querySelector(".btn-random"),U=document.querySelector(".random__btn"),q=document.querySelector(".backdrops"),B=document.querySelector(".random__box"),K=document.querySelector(".random__button"),le={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"};function ce(e){var s,g,u,p;const t=e.type.map(_=>`
      <li class="random__items">
        <p class="random__types random__${_.type.name}">
          ${le[_.type.name]||_.type.name}
        </p>
      </li>
    `).join(""),a=((u=(g=(s=e.sprites)==null?void 0:s.other)==null?void 0:g["official-artwork"])==null?void 0:u.front_default)||((p=e.sprites)==null?void 0:p.front_default)||"";B.innerHTML=`
    <div class="random__position">
      <p class="random__number">
        #${String(e.id).padStart(3,"0")}
      </p>

      <img
        class="random__img random__img${e.type[0].type.name}"
        src="${a}"
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
            <use href="${Z}#heart"></use>
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
  `;const i=B.querySelector(".random__like");(JSON.parse(localStorage.getItem("likedPokemons"))||[]).includes(e.id)&&i.classList.add("liked"),i.addEventListener("click",()=>{const _=JSON.parse(localStorage.getItem("likedPokemons"))||[];if(_.includes(e.id)){const l=_.filter(d=>d!==e.id);localStorage.setItem("likedPokemons",JSON.stringify(l)),i.classList.remove("liked")}else _.push(e.id),localStorage.setItem("likedPokemons",JSON.stringify(_)),i.classList.add("liked")})}async function G(){const e=Math.floor(Math.random()*1025)+1,[t]=await I([],[e]);t&&ce(t)}if(Q&&U&&q){const e=async()=>{q.style.display="flex",await G()},t=()=>{q.style.display="none"};Q.addEventListener("click",e),U.addEventListener("click",t),K&&K.addEventListener("click",G),window.addEventListener("keydown",a=>{a.key==="Escape"&&t()}),q.addEventListener("click",a=>{a.target===a.currentTarget&&t()})}const L={pageSize:10,maxPokemonId:1025},y={currentId:1,searchQuery:"",filters:[],loadedPokemons:[]},de=`
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

            <div>
                <span><var>type1</var></span>
                <span><var>type2</var></span>
            </div>
        </div>
    </div>
</section>
`;function pe(e,t){const a=[];for(let i=e;i<=t;i++)a.push(i);return a}function me(e){return Array.isArray(e)?e.map(t=>{const a={id:String(t.id||"").padStart(3,"0"),name:t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",sprites:t.sprites||"",type1:t.type&&t.type[0]?t.type[0]:"",type2:t.type&&t.type[1]?t.type[1]:""};return de.replace(/<var>(.*?)<\/var>/g,(i,n)=>{const s=n.trim();return a[s]!==void 0?a[s]:""})}).join(""):""}function ue([e,t],a,i){const n=document.querySelector(e),s=document.querySelector(t),g=document.querySelector(a),u=document.querySelector(i);function p(o){u&&(u.textContent=`Показано ${o} із ${L.maxPokemonId} покемонів`)}async function _(){const o=y.searchQuery.trim().toLowerCase();let r=y.loadedPokemons;if(o!==""&&(r=y.loadedPokemons.filter(c=>c.name.toLowerCase().includes(o)||String(c.id).includes(o)),r.length===0))try{const c=await I(y.filters,[o]);Array.isArray(c)&&c.length>0&&(r=c)}catch{console.log("Поиск через API не дал результатов")}n&&(n.innerHTML=me(r)),p(r.length),s&&(s.style.display=o!==""||y.currentId>L.maxPokemonId?"none":"block")}async function l(o=!1){o&&(y.currentId=1,y.loadedPokemons=[]),s&&(s.disabled=!0);try{const r=y.currentId,c=Math.min(y.currentId+L.pageSize-1,L.maxPokemonId);if(r>L.maxPokemonId){s&&(s.style.display="none");return}const m=pe(r,c),f=await I(y.filters,m);if(y.currentId=c+1,o)y.loadedPokemons=f;else{const k=new Set(y.loadedPokemons.map(b=>b.id)),h=f.filter(b=>!k.has(b.id));y.loadedPokemons.push(...h)}await _()}catch(r){console.error("Помилка завантаження:",r)}finally{s&&(s.disabled=!1)}}let d;g&&g.addEventListener("input",o=>{clearTimeout(d),y.searchQuery=o.target.value,d=setTimeout(()=>{_()},300)}),s&&s.addEventListener("click",()=>{l(!1)}),l(!0)}ue([".search-cards",".search-controls-button"],".search-input",".search-results-count");const D=document.querySelector(".search-input");document.querySelector('[data-action="random-pokemon"]');const E=document.querySelector('[data-action="sort-number"]'),$=document.querySelector('[data-action="filter-type"]'),x=document.querySelector('[data-action="filter-generation"]'),A=document.querySelector(".search-results-count"),v={query:"",sortOrder:"asc",types:[],generation:null},X=[{id:"normal",name:"Звичайний"},{id:"fire",name:"Вогняний"},{id:"water",name:"Водяний"},{id:"electric",name:"Електричний"},{id:"grass",name:"Трав'яний"},{id:"ice",name:"Льодяний"},{id:"fighting",name:"Бойовий"},{id:"poison",name:"Отруйний"},{id:"ground",name:"Земляний"},{id:"flying",name:"Літаючий"},{id:"psychic",name:"Психічний"},{id:"bug",name:"Комаха"},{id:"rock",name:"Кам'яний"},{id:"ghost",name:"Примарний"},{id:"dragon",name:"Драконячий"},{id:"dark",name:"Темний"},{id:"steel",name:"Сталевий"},{id:"fairy",name:"Фейний"}],Y=[{id:1,name:"Покоління І"},{id:2,name:"Покоління ІІ"},{id:3,name:"Покоління ІІІ"},{id:4,name:"Покоління IV"},{id:5,name:"Покоління V"},{id:6,name:"Покоління VI"},{id:7,name:"Покоління VII"},{id:8,name:"Покоління VIII"},{id:9,name:"Покоління ІХ"}];async function R(){const e=[];v.generation&&e.push({type:"gen",value:v.generation}),v.types.length>0&&e.push({type:"searchByTypes",types:v.types}),e.push({type:"sort",field:"id",order:v.sortOrder});try{let t=[];const a=v.query.trim().toLowerCase();a?t=await I(e,[a],!1):t=await I(e,[],!1),A&&(A.textContent=`Показано ${t.length} із 1 025 покемонів`),document.dispatchEvent(new CustomEvent("pokemon:update-list",{detail:{pokemons:t}}))}catch(t){console.error("Помилка під час фільтрації:",t),A&&(A.textContent="Показано 0 із 1 025 покемонів")}}function ee(e,t,a){let i=e.parentNode.querySelector(".custom-dropdown-list");if(i){i.remove();return}document.querySelectorAll(".custom-dropdown-list").forEach(u=>u.remove());const n=document.createElement("ul");n.className="custom-dropdown-list",n.style.cssText=`
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
  `;const s=document.createElement("li");s.textContent="Усі",s.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px; font-weight: 600;",s.addEventListener("click",()=>{a(null),n.remove()}),n.appendChild(s),t.forEach(u=>{const p=document.createElement("li");p.textContent=u.name,p.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px;",p.addEventListener("mouseenter",()=>p.style.backgroundColor="rgba(0,0,0,0.05)"),p.addEventListener("mouseleave",()=>p.style.backgroundColor="transparent"),p.addEventListener("click",()=>{a(u.id),n.remove()}),n.appendChild(p)}),e.style.position="relative",e.parentNode.style.position="relative",e.parentNode.appendChild(n);function g(u){!e.contains(u.target)&&!n.contains(u.target)&&(n.remove(),document.removeEventListener("click",g))}setTimeout(()=>document.addEventListener("click",g),0)}let W=null;D==null||D.addEventListener("input",e=>{v.query=e.target.value,clearTimeout(W),W=setTimeout(()=>R(),400)});E==null||E.addEventListener("click",()=>{v.sortOrder=v.sortOrder==="asc"?"desc":"asc";const e=E.querySelector("span");e&&(e.textContent=v.sortOrder==="asc"?"За номером ↑":"За номером ↓"),R()});$==null||$.addEventListener("click",()=>{ee($,X,e=>{v.types=e?[e]:[];const t=$.querySelector("span");if(t){const a=X.find(i=>i.id===e);t.textContent=a?a.name:"Усі типи"}R()})});x==null||x.addEventListener("click",()=>{ee(x,Y,e=>{v.generation=e;const t=x.querySelector("span");if(t){const a=Y.find(i=>i.id===e);t.textContent=a?a.name:"Усі покоління"}R()})});
//# sourceMappingURL=main-ce258a00.js.map
