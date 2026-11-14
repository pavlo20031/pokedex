(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const f of a.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&d(f)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function d(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();async function H(e=[],s=[],r=!0){var P;let d="https://pokeapi.co/api/v2/",t=Array.isArray(e)?e:[],a=Array.isArray(s)?[...s]:[s];if(a.length===0&&t.length>0){let o=null;for(let l of t){if(!l||!l.type)continue;let i=[];if(l.type==="gen"&&l.value)i=(await(await fetch(`${d}generation/${l.value}`)).json()).pokemon_species.map(c=>c.name);else if(l.type==="searchByTypes"&&Array.isArray(l.types)&&l.types.length>0){let n=l.types.map(m=>fetch(`${d}type/${m}`).then(u=>u.json())),c=(await Promise.all(n)).filter(m=>m&&m.pokemon).map(m=>m.pokemon.map(u=>u.pokemon.name));c.length>0&&(i=c.reduce((u,_)=>u.filter(v=>_.includes(v)),c[0]))}i.length>0&&(o=o?o.filter(n=>i.includes(n)):i)}o&&(a=o)}else if(a.length>0&&t.length>0){for(let o of t)if(!(!o||!o.type)){if(o.type==="gen"&&o.value){let i=(await(await fetch(`${d}generation/${o.value}`)).json()).pokemon_species.map(n=>n.name);a=a.filter(n=>i.includes(String(n).toLowerCase()))}else if(o.type==="searchByTypes"&&Array.isArray(o.types)){let l=o.types.map(p=>fetch(`${d}type/${p}`).then(c=>c.json())),n=(await Promise.all(l)).filter(p=>p&&p.pokemon).map(p=>p.pokemon.map(c=>c.pokemon.name));if(n.length>0){let p=n.reduce((c,m)=>c.filter(u=>m.includes(u)),n[0]);a=a.filter(c=>p.includes(String(c).toLowerCase()))}}}}const f={"generation-i":"Покоління I","generation-ii":"Покоління II","generation-iii":"Покоління III","generation-iv":"Покоління IV","generation-v":"Покоління V","generation-vi":"Покоління VI","generation-vii":"Покоління VII","generation-viii":"Покоління VIII","generation-ix":"Покоління IX"};let $=[];for(let o of a){let l=await fetch(`${d}pokemon/${o}`);if(!l.ok)continue;let i=await l.json(),n=i.stats.map(y=>y.base_stat),p=await fetch(`${d}pokemon-species/${i.id}`);if(!p.ok)continue;let c=await p.json(),m=await fetch(c.evolution_chain.url);if(!m.ok)continue;let _=(await m.json()).chain,v=[],w=[];for(;_;){if(_.species&&_.species.name){v.push(_.species.name);let y=_.species.url.split("/")[_.species.url.split("/").length-2];w.push({id:y,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${y}.png`})}_=_.evolves_to&&_.evolves_to.length>0?_.evolves_to[0]:null}console.log(w);let O={id:i.id,name:i.name,type:i.types,height:i.height/10+"m",weight:i.weight/10+"kg",abilities:i.abilities,hp:n[0],a:n[1],d:n[2],spA:n[3],spD:n[4],spe:n[5],sprites:i.sprites,description:((P=c.flavor_text_entries.find(y=>y.language.name==="en"))==null?void 0:P.flavor_text.replace(/\f/g," "))||"",generation:f[c.generation.name],chain:v,evodata:w};$.push(O)}let g=t.find(o=>o&&o.type==="sort");return g&&g.field&&g.order&&$.sort((o,l)=>{let i=o[g.field],n=l[g.field];return g.order==="desc"?n-i:i-n}),$}const L=document.querySelector(".hero__list"),V=({pokemons:e,types:s,generations:r})=>{L.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${s} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${r} поколінь</p>
    </li>
    ${L.innerHTML}
  `};async function B(){try{const[e,s,r]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),d=await e.json(),t=await s.json(),a=await r.json();V({pokemons:d.count,types:t.count,generations:a.count})}catch(e){console.error(e)}}L&&B();const C="/pokedex/assets/symbol-defs-a3682fdc.svg",h=document.querySelector(".btn-icon"),q=h==null?void 0:h.querySelector("use"),j=document.querySelector(".header__burger-btn"),k=document.querySelector(".header__nav");function R(e){if(q){const s=e?"sun":"moon";q.setAttribute("href",`${C}#${s}`)}}const F=localStorage.getItem("theme");F==="dark"?(document.body.classList.add("dark-theme"),R(!0)):R(!1);h==null||h.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),R(e)});j&&k&&(j.addEventListener("click",()=>{k.classList.toggle("is-open")}),k.querySelectorAll(".header__nav-link").forEach(s=>{s.addEventListener("click",()=>{k.classList.remove("is-open")})}));const I=document.querySelector(".world__list"),J=({pokemons:e,types:s,generations:r})=>{I.innerHTML=`
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${e}</span> покемонів
      </p>
    </li>
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${s}</span> типів
      </p>
    </li>
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${r}</span> поколінь
      </p>
    </li>
    ${I.innerHTML}
  `};async function U(){try{const[e,s,r]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),d=await e.json(),t=await s.json(),a=await r.json();J({pokemons:d.count,types:t.count,generations:a.count})}catch(e){console.error("Помилка:",e)}}I&&U();const A=document.querySelector(".easteregg__button"),E=document.querySelector(".easteregg__btn"),S=document.querySelector(".backdrop");if(A&&E&&S){const e=()=>{S.style.display="none"};A.addEventListener("click",e),E.addEventListener("click",e),window.addEventListener("keydown",s=>{s.key==="Escape"&&e()}),S.addEventListener("click",s=>{s.target===s.currentTarget&&e()})}const x=document.querySelector(".btn-random"),M=document.querySelector(".random__btn"),b=document.querySelector(".backdrops"),D=document.querySelector(".random__box"),N=document.querySelector(".random__button"),K={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"};function X(e){const s=e.type.map(t=>`
      <li class="random__items">
        <p class="random__types random__${t.type.name}">
          ${K[t.type.name]||t.type.name}
        </p>
      </li>
    `).join("");D.innerHTML=`
    <div class="random__position">
      <p class="random__number">
        #${String(e.id).padStart(3,"0")}
      </p>

      <img
        class="random__img"
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
            <use href="/img/symbol-defs.svg#heart"></use>
          </svg>
        </button>
      </div>

      <ul class="random__lists">
        ${s}
      </ul>

      <p class="random__subtitle random__desc">
        ${e.description}
      </p>

      <div class="random__params">
        <p class="random__subtitle">
          Зріст: ${e.height}
        </p>

        <p class="random__subtitle">
          Вага: ${e.weight}
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
  `;const r=D.querySelector(".random__like");(JSON.parse(localStorage.getItem("likedPokemons"))||[]).includes(e.id)&&r.classList.add("liked"),r.addEventListener("click",()=>{const t=JSON.parse(localStorage.getItem("likedPokemons"))||[];if(t.includes(e.id)){const a=t.filter(f=>f!==e.id);localStorage.setItem("likedPokemons",JSON.stringify(a)),r.classList.remove("liked")}else t.push(e.id),localStorage.setItem("likedPokemons",JSON.stringify(t)),r.classList.add("liked")})}async function T(){const e=Math.floor(Math.random()*1025)+1,[s]=await H([],[e]);s&&X(s)}if(x&&M&&b){const e=async()=>{b.style.display="flex",await T()},s=()=>{b.style.display="none"};x.addEventListener("click",e),M.addEventListener("click",s),N&&N.addEventListener("click",T),window.addEventListener("keydown",r=>{r.key==="Escape"&&s()}),b.addEventListener("click",r=>{r.target===r.currentTarget&&s()})}
//# sourceMappingURL=main-32ff36bc.js.map
