(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const d=document.querySelector(".hero__list"),y=({pokemons:e,types:o,generations:n})=>{d.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${o} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${n} поколінь</p>
    </li>
    ${d.innerHTML}
  `};async function h(){try{const[e,o,n]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),t=await o.json(),s=await n.json();y({pokemons:r.count,types:t.count,generations:s.count})}catch(e){console.error(e)}}h();const c=document.querySelector(".btn-icon"),u=c==null?void 0:c.querySelector("use"),m=document.querySelector(".header__burger-btn"),a=document.querySelector(".header__nav");function p(e){if(u){const o=e?"sun":"moon";u.setAttribute("href",`/img/symbol-defs.svg#${o}`)}}const g=localStorage.getItem("theme");g==="dark"?(document.body.classList.add("dark-theme"),p(!0)):p(!1);c==null||c.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),p(e)});m&&a&&(m.addEventListener("click",()=>{a.classList.toggle("is-open")}),a.querySelectorAll(".header__nav-link").forEach(o=>{o.addEventListener("click",()=>{a.classList.remove("is-open")})}));const f=document.querySelector(".world__list"),k=({pokemons:e,types:o,generations:n})=>{f.innerHTML=`
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${e}</span> покемонів
      </p>
    </li>
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${o}</span> типів
      </p>
    </li>
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${n}</span> поколінь
      </p>
    </li>
    ${f.innerHTML}
  `};async function v(){try{const[e,o,n]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon"),fetch("https://pokeapi.co/api/v2/type"),fetch("https://pokeapi.co/api/v2/generation")]),r=await e.json(),t=await o.json(),s=await n.json();k({pokemons:r.count,types:t.count,generations:s.count})}catch(e){console.error("Помилка:",e)}}v();const w=document.querySelector(".easteregg__button"),L=document.querySelector(".easteregg__btn"),_=document.querySelector(".backdrop"),i=()=>{_.style.display="none"};w.addEventListener("click",i);L.addEventListener("click",i);window.addEventListener("keydown",e=>{e.key==="Escape"&&i()});_.addEventListener("click",e=>{e.target===e.currentTarget&&i()});
//# sourceMappingURL=main-2e4dbae5.js.map
