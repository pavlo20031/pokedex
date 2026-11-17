import{e as ee}from"./vendor-3fb8d95f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const y of a.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&i(y)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();async function P(e=[],t=[],n=!0){var j;let i="https://pokeapi.co/api/v2/",s=Array.isArray(e)?e:[],a=Array.isArray(t)?[...t]:[t];if(a.length===0&&s.length>0){let r=null;for(let c of s){if(!c||!c.type)continue;let l=[];if(c.type==="gen"&&c.value)l=(await(await fetch(`${i}generation/${c.value}`)).json()).pokemon_species.map(d=>d.name);else if(c.type==="searchByTypes"&&Array.isArray(c.types)&&c.types.length>0){let o=c.types.map(u=>fetch(`${i}type/${u}`).then(h=>h.json())),d=(await Promise.all(o)).filter(u=>u&&u.pokemon).map(u=>u.pokemon.map(h=>h.pokemon.name));d.length>0&&(l=d.reduce((h,f)=>h.filter($=>f.includes($)),d[0]))}l.length>0&&(r=r?r.filter(o=>l.includes(o)):l)}r&&(a=r)}else if(a.length>0&&s.length>0){for(let r of s)if(!(!r||!r.type)){if(r.type==="gen"&&r.value){let l=(await(await fetch(`${i}generation/${r.value}`)).json()).pokemon_species.map(o=>o.name);a=a.filter(o=>l.includes(String(o).toLowerCase()))}else if(r.type==="searchByTypes"&&Array.isArray(r.types)){let c=r.types.map(m=>fetch(`${i}type/${m}`).then(d=>d.json())),o=(await Promise.all(c)).filter(m=>m&&m.pokemon).map(m=>m.pokemon.map(d=>d.pokemon.name));if(o.length>0){let m=o.reduce((d,u)=>d.filter(h=>u.includes(h)),o[0]);a=a.filter(d=>m.includes(String(d).toLowerCase()))}}}}const y={"generation-i":"Покоління I","generation-ii":"Покоління II","generation-iii":"Покоління III","generation-iv":"Покоління IV","generation-v":"Покоління V","generation-vi":"Покоління VI","generation-vii":"Покоління VII","generation-viii":"Покоління VIII","generation-ix":"Покоління IX"};let g=[];for(let r of a){let c=await fetch(`${i}pokemon/${r}`);if(!c.ok)continue;let l=await c.json(),o=l.stats.map(v=>v.base_stat),m=await fetch(`${i}pokemon-species/${l.id}`);if(!m.ok)continue;let d=await m.json(),u=await fetch(d.evolution_chain.url);if(!u.ok)continue;let f=(await u.json()).chain,$=[],I=[];for(;f;){if(f.species&&f.species.name){$.push(f.species.name);let v=f.species.url.split("/")[f.species.url.split("/").length-2];I.push({id:v,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${v}.png`})}f=f.evolves_to&&f.evolves_to.length>0?f.evolves_to[0]:null}console.log(I);const D=((j=d.flavor_text_entries.find(v=>v.language.name==="en"))==null?void 0:j.flavor_text.replace(/\f/g," "))||"";let O=D;try{O=await ee(D,{from:"en",to:"uk"})}catch(v){console.error("Помилка перекладу:",v)}let Z={id:l.id,name:l.name,type:l.types,height:l.height/10+"m",weight:l.weight/10+"kg",abilities:l.abilities,hp:o[0],a:o[1],d:o[2],spA:o[3],spD:o[4],spe:o[5],sprites:l.sprites,description:O,generation:y[d.generation.name],chain:$,evodata:I};g.push(Z)}let p=s.find(r=>r&&r.type==="sort");return p&&p.field&&p.order&&g.sort((r,c)=>{let l=r[p.field],o=c[p.field];return p.order==="desc"?o-l:l-o}),g}const T=document.querySelector(".hero__list"),te=({pokemons:e,types:t,generations:n})=>{T.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${n} поколінь</p>
    </li>
    ${T.innerHTML}
  `};async function se(){try{const[e,t,n]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),i=await e.json(),s=await t.json(),a=await n.json();te({pokemons:i.count,types:s.count,generations:a.count})}catch(e){console.error(e)}}T&&se();const G="/pokedex/assets/symbol-defs-a3682fdc.svg",k=document.querySelector(".btn-icon"),M=k==null?void 0:k.querySelector("use"),V=document.querySelector(".header__burger-btn"),L=document.querySelector(".header__nav");function C(e){if(M){const t=e?"sun":"moon";M.setAttribute("href",`${G}#${t}`)}}const ne=localStorage.getItem("theme");ne==="dark"?(document.body.classList.add("dark-theme"),C(!0)):C(!1);k==null||k.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),C(e)});V&&L&&(V.addEventListener("click",()=>{L.classList.toggle("is-open")}),L.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{L.classList.remove("is-open")})}));const N=document.querySelector(".world__list"),ae=({pokemons:e,types:t,generations:n})=>{N.innerHTML=`
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
    ${N.innerHTML}
  `};async function oe(){try{const[e,t,n]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),i=await e.json(),s=await t.json(),a=await n.json();ae({pokemons:i.count,types:s.count,generations:a.count})}catch(e){console.error("Помилка:",e)}}N&&oe();const F=document.querySelector(".easteregg__button"),H=document.querySelector(".easteregg__btn"),R=document.querySelector(".backdrop");if(F&&H&&R){const e=()=>{R.style.display="none"};F.addEventListener("click",e),H.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),R.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}const J=document.querySelector(".btn-random"),z=document.querySelector(".random__btn"),S=document.querySelector(".backdrops"),U=document.querySelector(".random__box"),B=document.querySelector(".random__button"),ie={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"};function re(e){const t=e.type.map(s=>`
      <li class="random__items">
        <p class="random__types random__${s.type.name}">
          ${ie[s.type.name]||s.type.name}
        </p>
      </li>
    `).join("");U.innerHTML=`
    <div class="random__position">
      <p class="random__number">
        #${String(e.id).padStart(3,"0")}
      </p>

      <img
        class="random__img random__img${e.type[0].type.name}"
        src="${e.sprites.other["official-artwork"].front_default}"
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
            <use href="${G}#heart"></use>
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
  `;const n=U.querySelector(".random__like");(JSON.parse(localStorage.getItem("likedPokemons"))||[]).includes(e.id)&&n.classList.add("liked"),n.addEventListener("click",()=>{const s=JSON.parse(localStorage.getItem("likedPokemons"))||[];if(s.includes(e.id)){const a=s.filter(y=>y!==e.id);localStorage.setItem("likedPokemons",JSON.stringify(a)),n.classList.remove("liked")}else s.push(e.id),localStorage.setItem("likedPokemons",JSON.stringify(s)),n.classList.add("liked")})}async function K(){const e=Math.floor(Math.random()*1025)+1,[t]=await P([],[e]);t&&re(t)}if(J&&z&&S){const e=async()=>{S.style.display="flex",await K()},t=()=>{S.style.display="none"};J.addEventListener("click",e),z.addEventListener("click",t),B&&B.addEventListener("click",K),window.addEventListener("keydown",n=>{n.key==="Escape"&&t()}),S.addEventListener("click",n=>{n.target===n.currentTarget&&t()})}const A=document.querySelector(".search-input");document.querySelector('[data-action="random-pokemon"]');const x=document.querySelector('[data-action="sort-number"]'),b=document.querySelector('[data-action="filter-type"]'),w=document.querySelector('[data-action="filter-generation"]'),q=document.querySelector(".search-results-count"),_={query:"",sortOrder:"asc",types:[],generation:null},Q=[{id:"normal",name:"Звичайний"},{id:"fire",name:"Вогняний"},{id:"water",name:"Водяний"},{id:"electric",name:"Електричний"},{id:"grass",name:"Трав'яний"},{id:"ice",name:"Льодяний"},{id:"fighting",name:"Бойовий"},{id:"poison",name:"Отруйний"},{id:"ground",name:"Земляний"},{id:"flying",name:"Літаючий"},{id:"psychic",name:"Психічний"},{id:"bug",name:"Комаха"},{id:"rock",name:"Кам'яний"},{id:"ghost",name:"Примарний"},{id:"dragon",name:"Драконячий"},{id:"dark",name:"Темний"},{id:"steel",name:"Сталевий"},{id:"fairy",name:"Фейний"}],X=[{id:1,name:"Покоління І"},{id:2,name:"Покоління ІІ"},{id:3,name:"Покоління ІІІ"},{id:4,name:"Покоління IV"},{id:5,name:"Покоління V"},{id:6,name:"Покоління VI"},{id:7,name:"Покоління VII"},{id:8,name:"Покоління VIII"},{id:9,name:"Покоління ІХ"}];async function E(){const e=[];_.generation&&e.push({type:"gen",value:_.generation}),_.types.length>0&&e.push({type:"searchByTypes",types:_.types}),e.push({type:"sort",field:"id",order:_.sortOrder});try{let t=[];const n=_.query.trim().toLowerCase();n?t=await P(e,[n],!1):t=await P(e,[],!1),q&&(q.textContent=`Показано ${t.length} із 1 025 покемонів`),document.dispatchEvent(new CustomEvent("pokemon:update-list",{detail:{pokemons:t}}))}catch(t){console.error("Помилка під час фільтрації:",t),q&&(q.textContent="Показано 0 із 1 025 покемонів")}}function W(e,t,n){let i=e.parentNode.querySelector(".custom-dropdown-list");if(i){i.remove();return}document.querySelectorAll(".custom-dropdown-list").forEach(g=>g.remove());const s=document.createElement("ul");s.className="custom-dropdown-list",s.style.cssText=`
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
  `;const a=document.createElement("li");a.textContent="Усі",a.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px; font-weight: 600;",a.addEventListener("click",()=>{n(null),s.remove()}),s.appendChild(a),t.forEach(g=>{const p=document.createElement("li");p.textContent=g.name,p.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px;",p.addEventListener("mouseenter",()=>p.style.backgroundColor="rgba(0,0,0,0.05)"),p.addEventListener("mouseleave",()=>p.style.backgroundColor="transparent"),p.addEventListener("click",()=>{n(g.id),s.remove()}),s.appendChild(p)}),e.style.position="relative",e.parentNode.style.position="relative",e.parentNode.appendChild(s);function y(g){!e.contains(g.target)&&!s.contains(g.target)&&(s.remove(),document.removeEventListener("click",y))}setTimeout(()=>document.addEventListener("click",y),0)}let Y=null;A==null||A.addEventListener("input",e=>{_.query=e.target.value,clearTimeout(Y),Y=setTimeout(()=>E(),400)});x==null||x.addEventListener("click",()=>{_.sortOrder=_.sortOrder==="asc"?"desc":"asc";const e=x.querySelector("span");e&&(e.textContent=_.sortOrder==="asc"?"За номером ↑":"За номером ↓"),E()});b==null||b.addEventListener("click",()=>{W(b,Q,e=>{_.types=e?[e]:[];const t=b.querySelector("span");if(t){const n=Q.find(i=>i.id===e);t.textContent=n?n.name:"Усі типи"}E()})});w==null||w.addEventListener("click",()=>{W(w,X,e=>{_.generation=e;const t=w.querySelector("span");if(t){const n=X.find(i=>i.id===e);t.textContent=n?n.name:"Усі покоління"}E()})});
//# sourceMappingURL=main-7a14f2d1.js.map
