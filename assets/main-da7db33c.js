(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const d=document.querySelector(".hero__list"),h=({pokemons:e,types:t,generations:n})=>{d.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${n} поколінь</p>
    </li>
    ${d.innerHTML}
  `};async function g(){try{const[e,t,n]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),o=await t.json(),s=await n.json();h({pokemons:r.count,types:o.count,generations:s.count})}catch(e){console.error(e)}}d&&g();const c=document.querySelector(".btn-icon"),a=c==null?void 0:c.querySelector("use"),f=document.querySelector(".header__burger-btn"),i=document.querySelector(".header__nav");function m(e){if(a){const t=e?"sun":"moon";a.setAttribute("href",`/img/symbol-defs.svg#${t}`)}}const k=localStorage.getItem("theme");k==="dark"?(document.body.classList.add("dark-theme"),m(!0)):m(!1);c==null||c.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");if(a){const t=e?"sun":"moon",r=(a.getAttribute("href")||"").split("#")[0];a.setAttribute("href",`${r}#${t}`)}});f&&i&&(f.addEventListener("click",()=>{i.classList.toggle("is-open")}),i.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{i.classList.remove("is-open")})}));const u=document.querySelector(".world__list"),v=({pokemons:e,types:t,generations:n})=>{u.innerHTML=`
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
    ${u.innerHTML}
  `};async function w(){try{const[e,t,n]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),o=await t.json(),s=await n.json();v({pokemons:r.count,types:o.count,generations:s.count})}catch(e){console.error("Помилка:",e)}}u&&w();const _=document.querySelector(".easteregg__button"),y=document.querySelector(".easteregg__btn"),p=document.querySelector(".backdrop");if(_&&y&&p){const e=()=>{p.style.display="none"};_.addEventListener("click",e),y.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),p.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}
//# sourceMappingURL=main-da7db33c.js.map
