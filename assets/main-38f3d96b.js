(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const p=document.querySelector(".hero__list"),h=({pokemons:e,types:t,generations:n})=>{p.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${n} поколінь</p>
    </li>
    ${p.innerHTML}
  `};async function g(){try{const[e,t,n]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),o=await t.json(),s=await n.json();h({pokemons:r.count,types:o.count,generations:s.count})}catch(e){console.error(e)}}p&&g();const c=document.querySelector(".btn-icon"),m=c==null?void 0:c.querySelector("use"),f=document.querySelector(".header__burger-btn"),a=document.querySelector(".header__nav");function d(e){if(m){const t=e?"sun":"moon";m.setAttribute("href",`/img/symbol-defs.svg#${t}`)}}const k=localStorage.getItem("theme");k==="dark"?(document.body.classList.add("dark-theme"),d(!0)):d(!1);c==null||c.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),d(e)});f&&a&&(f.addEventListener("click",()=>{a.classList.toggle("is-open")}),a.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{a.classList.remove("is-open")})}));const u=document.querySelector(".world__list"),v=({pokemons:e,types:t,generations:n})=>{u.innerHTML=`
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
  `};async function w(){try{const[e,t,n]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),o=await t.json(),s=await n.json();v({pokemons:r.count,types:o.count,generations:s.count})}catch(e){console.error("Помилка:",e)}}u&&w();const _=document.querySelector(".easteregg__button"),y=document.querySelector(".easteregg__btn"),l=document.querySelector(".backdrop");if(_&&y&&l){const e=()=>{l.style.display="none"};_.addEventListener("click",e),y.addEventListener("click",e),window.addEventListener("keydown",t=>{t.key==="Escape"&&e()}),l.addEventListener("click",t=>{t.target===t.currentTarget&&e()})}
//# sourceMappingURL=main-38f3d96b.js.map
