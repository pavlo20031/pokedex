(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();const l=document.querySelector(".hero__list"),f=({pokemons:e,types:s,generations:r})=>{l.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${s} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${r} поколінь</p>
    </li>
    ${l.innerHTML}
  `};async function m(){try{const[e,s,r]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon").then(o=>o.json()),fetch("https://pokeapi.co/api/v2/type").then(o=>o.json()),fetch("https://pokeapi.co/api/v2/generation").then(o=>o.json())]);f({pokemons:e.count,types:s.count,generations:r.count})}catch(e){console.error(e)}}m();const c=document.querySelector(".btn-icon"),p=c==null?void 0:c.querySelector("use");c==null||c.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");if(p){const s=e?"sun":"moon";p.setAttribute("href",`./img/symbol-defs.svg#${s}`)}});const d=document.querySelector(".world__list"),_=({pokemons:e,types:s,generations:r})=>{d.innerHTML=`
    <li class="world__item">
      <p class="world__text"><span class="world__num">${e}</span> покемонів</p>
    </li>
    <li class="world__item">
      <p class="world__text"><span class="world__num">${s}</span> типів</p>
    </li>
    <li class="world__item">
      <p class="world__text"><span class="world__num">${r}</span> поколінь</p>
    </li>
    ${d.innerHTML}
  `};async function y(){try{const[e,s,r]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon").then(o=>o.json()),fetch("https://pokeapi.co/api/v2/type").then(o=>o.json()),fetch("https://pokeapi.co/api/v2/generation").then(o=>o.json())]);_({pokemons:e.count,types:s.count,generations:r.count})}catch(e){console.error(e)}}y();const h=document.querySelector(".easteregg__button"),g=document.querySelector(".easteregg__btn"),u=document.querySelector(".backdrop"),i=()=>{u.style.display="none"};h.addEventListener("click",i);g.addEventListener("click",i);window.addEventListener("keydown",e=>{e.key==="Escape"&&i()});u.addEventListener("click",e=>{e.target===e.currentTarget&&i()});
//# sourceMappingURL=main-b9c82894.js.map
