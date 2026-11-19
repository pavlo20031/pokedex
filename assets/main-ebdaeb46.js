(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const _ of n.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&i(_)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();async function I(e=[],t=[],a=!0){var S;let i="https://pokeapi.co/api/v2/",s=Array.isArray(e)?e:[],n=Array.isArray(t)?[...t]:[t];if(n.length===0&&s.length>0){let l=null;for(let d of s){if(!d||!d.type)continue;let o=[];if(d.type==="gen"&&d.value)o=(await(await fetch(`${i}generation/${d.value}`)).json()).pokemon_species.map(p=>p.name);else if(d.type==="searchByTypes"&&Array.isArray(d.types)&&d.types.length>0){let r=d.types.map(u=>fetch(`${i}type/${u}`).then(v=>v.json())),p=(await Promise.all(r)).filter(u=>u&&u.pokemon).map(u=>u.pokemon.map(v=>v.pokemon.name));p.length>0&&(o=p.reduce((v,g)=>v.filter(k=>g.includes(k)),p[0]))}o.length>0&&(l=l?l.filter(r=>o.includes(r)):o)}l&&(n=l)}else if(n.length>0&&s.length>0){for(let l of s)if(!(!l||!l.type)){if(l.type==="gen"&&l.value){let o=(await(await fetch(`${i}generation/${l.value}`)).json()).pokemon_species.map(r=>r.name);n=n.filter(r=>o.includes(String(r).toLowerCase()))}else if(l.type==="searchByTypes"&&Array.isArray(l.types)){let d=l.types.map(c=>fetch(`${i}type/${c}`).then(p=>p.json())),r=(await Promise.all(d)).filter(c=>c&&c.pokemon).map(c=>c.pokemon.map(p=>p.pokemon.name));if(r.length>0){let c=r.reduce((p,u)=>p.filter(v=>u.includes(v)),r[0]);n=n.filter(p=>c.includes(String(p).toLowerCase()))}}}}const _={"generation-i":"Покоління I","generation-ii":"Покоління II","generation-iii":"Покоління III","generation-iv":"Покоління IV","generation-v":"Покоління V","generation-vi":"Покоління VI","generation-vii":"Покоління VII","generation-viii":"Покоління VIII","generation-ix":"Покоління IX"};let y=[];for(let l of n){let d=await fetch(`${i}pokemon/${l}`);if(!d.ok)continue;let o=await d.json(),r=o.stats.map(b=>b.base_stat),c=await fetch(`${i}pokemon-species/${o.id}`);if(!c.ok)continue;let p=await c.json(),u=await fetch(p.evolution_chain.url);if(!u.ok)continue;let g=(await u.json()).chain,k=[],O=[];for(;g;){if(g.species&&g.species.name){k.push(g.species.name);let b=g.species.url.split("/")[g.species.url.split("/").length-2];O.push({id:b,img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${b}.png`})}g=g.evolves_to&&g.evolves_to.length>0?g.evolves_to[0]:null}const Z=((S=p.flavor_text_entries.find(b=>b.language.name==="en"))==null?void 0:S.flavor_text.replace(/\f/g," "))||"";let ee={id:o.id,name:o.name,type:o.types,height:o.height/10+"m",weight:o.weight/10+"kg",abilities:o.abilities,hp:r[0],a:r[1],d:r[2],spA:r[3],spD:r[4],spe:r[5],sprites:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${o.id}.png`,description:Z,generation:_[p.generation.name],chain:k,evodata:O};y.push(ee)}let m=s.find(l=>l&&l.type==="sort");return m&&m.field&&m.order&&y.sort((l,d)=>{let o=l[m.field],r=d[m.field];return m.order==="desc"?r-o:o-r}),y}const D=document.querySelector(".hero__list"),te=({pokemons:e,types:t,generations:a})=>{D.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${a} поколінь</p>
    </li>
    ${D.innerHTML}
  `};async function se(){try{const[e,t,a]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),i=await e.json(),s=await t.json(),n=await a.json();te({pokemons:i.count,types:s.count,generations:n.count})}catch(e){console.error(e)}}D&&se();const Y="/pokedex/assets/symbol-defs-a3682fdc.svg",w=document.querySelector(".btn-icon"),M=w==null?void 0:w.querySelector("use"),V=document.querySelector(".header__burger-btn"),P=document.querySelector(".header__nav");function N(e){if(M){const t=e?"sun":"moon";M.setAttribute("href",`${Y}#${t}`)}}const ne=localStorage.getItem("theme");ne==="dark"?(document.body.classList.add("dark-theme"),N(!0)):N(!1);w==null||w.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),N(e)});V&&P&&(V.addEventListener("click",()=>{P.classList.toggle("is-open")}),P.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{P.classList.remove("is-open")})}));const j=document.querySelector(".world__list"),ae=({pokemons:e,types:t,generations:a})=>{j.innerHTML=`
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
    ${j.innerHTML}
  `};async function oe(){try{const[e,t,a]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),i=await e.json(),s=await t.json(),n=await a.json();ae({pokemons:i.count,types:s.count,generations:n.count})}catch(e){console.error("Помилка:",e)}}j&&oe();const F=document.querySelector(".easteregg__button"),H=document.querySelector(".easteregg__btn"),T=document.querySelector(".backdrop");if(F&&H&&T){const e=()=>{T.style.display="none"};F.addEventListener("click",e),H.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),T.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}const z=document.querySelector(".btn-random"),J=document.querySelector(".random__btn"),q=document.querySelector(".backdrops"),Q=document.querySelector(".random__box"),U=document.querySelector(".random__button"),re={normal:"Звичайний",fire:"Вогняний",water:"Водяний",electric:"Електричний",grass:"Трав'яний",ice:"Льодяний",fighting:"Бойовий",poison:"Отруйний",ground:"Земляний",flying:"Літаючий",psychic:"Психічний",bug:"Комаха",rock:"Кам'яний",ghost:"Примарний",dragon:"Драконячий",dark:"Темний",steel:"Сталевий",fairy:"Фейний"};function ie(e){const t=e.type.map(s=>`
      <li class="random__items">
        <p class="random__types random__${s.type.name}">
          ${re[s.type.name]||s.type.name}
        </p>
      </li>
    `).join("");Q.innerHTML=`
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
            <use href="${Y}#heart"></use>
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
  `;const a=Q.querySelector(".random__like");(JSON.parse(localStorage.getItem("likedPokemons"))||[]).includes(e.id)&&a.classList.add("liked"),a.addEventListener("click",()=>{const s=JSON.parse(localStorage.getItem("likedPokemons"))||[];if(s.includes(e.id)){const n=s.filter(_=>_!==e.id);localStorage.setItem("likedPokemons",JSON.stringify(n)),a.classList.remove("liked")}else s.push(e.id),localStorage.setItem("likedPokemons",JSON.stringify(s)),a.classList.add("liked")})}async function B(){const e=Math.floor(Math.random()*1025)+1,[t]=await I([],[e]);t&&ie(t)}if(z&&J&&q){const e=async()=>{q.style.display="flex",await B()},t=()=>{q.style.display="none"};z.addEventListener("click",e),J.addEventListener("click",t),U&&U.addEventListener("click",B),window.addEventListener("keydown",a=>{a.key==="Escape"&&t()}),q.addEventListener("click",a=>{a.target===a.currentTarget&&t()})}const L={pageSize:10,maxPokemonId:1025},f={currentId:1,searchQuery:"",filters:[],loadedPokemons:[]},le=`
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
`;function ce(e,t){const a=[];for(let i=e;i<=t;i++)a.push(i);return a}function de(e){return Array.isArray(e)?e.map(t=>{const a={id:String(t.id||"").padStart(3,"0"),name:t.name?t.name.charAt(0).toUpperCase()+t.name.slice(1):"",sprites:t.sprites||"",type1:t.type&&t.type[0]&&t.type[0].type?t.type[0].type.name:"",type2:t.type&&t.type[1]&&t.type[1].type?t.type[1].type.name:""};return le.replace(/<var>(.*?)<\/var>/g,(i,s)=>{const n=s.trim();return a[n]!==void 0?a[n]:""})}).join(""):""}function pe([e,t],a,i){const s=document.querySelector(e),n=document.querySelector(t),_=document.querySelector(a),y=document.querySelector(i);function m(o){y&&(y.textContent=`Показано ${o} із ${L.maxPokemonId} покемонів`)}async function S(){const o=f.searchQuery.trim().toLowerCase();let r=f.loadedPokemons;if(o!==""&&(r=f.loadedPokemons.filter(c=>c.name.toLowerCase().includes(o)||String(c.id).includes(o)),r.length===0))try{const c=await I(f.filters,[o]);Array.isArray(c)&&c.length>0&&(r=c)}catch{console.log("Поиск через API не дал результатов")}s&&(s.innerHTML=de(r)),m(r.length),n&&(n.style.display=o!==""||f.currentId>L.maxPokemonId?"none":"block")}async function l(o=!1){o&&(f.currentId=1,f.loadedPokemons=[]),n&&(n.disabled=!0);try{const r=f.currentId,c=Math.min(f.currentId+L.pageSize-1,L.maxPokemonId);if(r>L.maxPokemonId){n&&(n.style.display="none");return}const p=ce(r,c),u=await I(f.filters,p);if(f.currentId=c+1,o)f.loadedPokemons=u;else{const v=new Set(f.loadedPokemons.map(k=>k.id)),g=u.filter(k=>!v.has(k.id));f.loadedPokemons.push(...g)}await S()}catch(r){console.error("Помилка завантаження:",r)}finally{n&&(n.disabled=!1)}}let d;_&&_.addEventListener("input",o=>{clearTimeout(d),f.searchQuery=o.target.value,d=setTimeout(()=>{S()},300)}),n&&n.addEventListener("click",()=>{l(!1)}),l(!0)}pe([".search-cards",".search-controls-button"],".search-input",".search-results-count");const C=document.querySelector(".search-input");document.querySelector('[data-action="random-pokemon"]');const E=document.querySelector('[data-action="sort-number"]'),$=document.querySelector('[data-action="filter-type"]'),x=document.querySelector('[data-action="filter-generation"]'),A=document.querySelector(".search-results-count"),h={query:"",sortOrder:"asc",types:[],generation:null},K=[{id:"normal",name:"Звичайний"},{id:"fire",name:"Вогняний"},{id:"water",name:"Водяний"},{id:"electric",name:"Електричний"},{id:"grass",name:"Трав'яний"},{id:"ice",name:"Льодяний"},{id:"fighting",name:"Бойовий"},{id:"poison",name:"Отруйний"},{id:"ground",name:"Земляний"},{id:"flying",name:"Літаючий"},{id:"psychic",name:"Психічний"},{id:"bug",name:"Комаха"},{id:"rock",name:"Кам'яний"},{id:"ghost",name:"Примарний"},{id:"dragon",name:"Драконячий"},{id:"dark",name:"Темний"},{id:"steel",name:"Сталевий"},{id:"fairy",name:"Фейний"}],G=[{id:1,name:"Покоління І"},{id:2,name:"Покоління ІІ"},{id:3,name:"Покоління ІІІ"},{id:4,name:"Покоління IV"},{id:5,name:"Покоління V"},{id:6,name:"Покоління VI"},{id:7,name:"Покоління VII"},{id:8,name:"Покоління VIII"},{id:9,name:"Покоління ІХ"}];async function R(){const e=[];h.generation&&e.push({type:"gen",value:h.generation}),h.types.length>0&&e.push({type:"searchByTypes",types:h.types}),e.push({type:"sort",field:"id",order:h.sortOrder});try{let t=[];const a=h.query.trim().toLowerCase();a?t=await I(e,[a],!1):t=await I(e,[],!1),A&&(A.textContent=`Показано ${t.length} із 1 025 покемонів`),document.dispatchEvent(new CustomEvent("pokemon:update-list",{detail:{pokemons:t}}))}catch(t){console.error("Помилка під час фільтрації:",t),A&&(A.textContent="Показано 0 із 1 025 покемонів")}}function W(e,t,a){let i=e.parentNode.querySelector(".custom-dropdown-list");if(i){i.remove();return}document.querySelectorAll(".custom-dropdown-list").forEach(y=>y.remove());const s=document.createElement("ul");s.className="custom-dropdown-list",s.style.cssText=`
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
  `;const n=document.createElement("li");n.textContent="Усі",n.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px; font-weight: 600;",n.addEventListener("click",()=>{a(null),s.remove()}),s.appendChild(n),t.forEach(y=>{const m=document.createElement("li");m.textContent=y.name,m.style.cssText="padding: 8px 16px; cursor: pointer; font-size: 14px;",m.addEventListener("mouseenter",()=>m.style.backgroundColor="rgba(0,0,0,0.05)"),m.addEventListener("mouseleave",()=>m.style.backgroundColor="transparent"),m.addEventListener("click",()=>{a(y.id),s.remove()}),s.appendChild(m)}),e.style.position="relative",e.parentNode.style.position="relative",e.parentNode.appendChild(s);function _(y){!e.contains(y.target)&&!s.contains(y.target)&&(s.remove(),document.removeEventListener("click",_))}setTimeout(()=>document.addEventListener("click",_),0)}let X=null;C==null||C.addEventListener("input",e=>{h.query=e.target.value,clearTimeout(X),X=setTimeout(()=>R(),400)});E==null||E.addEventListener("click",()=>{h.sortOrder=h.sortOrder==="asc"?"desc":"asc";const e=E.querySelector("span");e&&(e.textContent=h.sortOrder==="asc"?"За номером ↑":"За номером ↓"),R()});$==null||$.addEventListener("click",()=>{W($,K,e=>{h.types=e?[e]:[];const t=$.querySelector("span");if(t){const a=K.find(i=>i.id===e);t.textContent=a?a.name:"Усі типи"}R()})});x==null||x.addEventListener("click",()=>{W(x,G,e=>{h.generation=e;const t=x.querySelector("span");if(t){const a=G.find(i=>i.id===e);t.textContent=a?a.name:"Усі покоління"}R()})});
//# sourceMappingURL=main-ebdaeb46.js.map
