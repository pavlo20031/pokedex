(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const p=document.querySelector(".hero__list"),L=({pokemons:e,types:t,generations:s})=>{p.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${s} поколінь</p>
    </li>
    ${p.innerHTML}
  `};async function v(){try{const[e,t,s]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),o=await t.json(),n=await s.json();L({pokemons:r.count,types:o.count,generations:n.count})}catch(e){console.error(e)}}p&&v();const w="/pokedex/assets/symbol-defs-a3682fdc.svg",c=document.querySelector(".btn-icon"),m=c==null?void 0:c.querySelector("use"),y=document.querySelector(".header__burger-btn"),a=document.querySelector(".header__nav");function u(e){if(m){const t=e?"sun":"moon";m.setAttribute("href",`${w}#${t}`)}}const b=localStorage.getItem("theme");b==="dark"?(document.body.classList.add("dark-theme"),u(!0)):u(!1);c==null||c.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),u(e)});y&&a&&(y.addEventListener("click",()=>{a.classList.toggle("is-open")}),a.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{a.classList.remove("is-open")})}));const f=document.querySelector(".world__list"),S=({pokemons:e,types:t,generations:s})=>{f.innerHTML=`
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
    ${f.innerHTML}
  `};async function E(){try{const[e,t,s]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),o=await t.json(),n=await s.json();S({pokemons:r.count,types:o.count,generations:n.count})}catch(e){console.error("Помилка:",e)}}f&&E();const _=document.querySelector(".easteregg__button"),h=document.querySelector(".easteregg__btn"),d=document.querySelector(".backdrop");if(_&&h&&d){const e=()=>{d.style.display="none"};_.addEventListener("click",e),h.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),d.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}const k=document.querySelector(".btn-random"),g=document.querySelector(".random__btn"),i=document.querySelector(".backdrops");if(k&&g&&i){const e=()=>{i.style.display="flex"},t=()=>{i.style.display="none"};k.addEventListener("click",e),g.addEventListener("click",t),window.addEventListener("keydown",s=>{s.key==="Escape"&&t()}),i.addEventListener("click",s=>{s.target===s.currentTarget&&t()})}
//# sourceMappingURL=main-82cb0e63.js.map
