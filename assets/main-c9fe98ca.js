(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const i=document.querySelector(".hero__list"),d=({pokemons:e,types:n,generations:r})=>{i.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${n} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${r} поколінь</p>
    </li>
    ${i.innerHTML}
  `};async function u(){try{const[e,n,r]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon").then(o=>o.json()),fetch("https://pokeapi.co/api/v2/type").then(o=>o.json()),fetch("https://pokeapi.co/api/v2/generation").then(o=>o.json())]);d({pokemons:e.count,types:n.count,generations:r.count})}catch(e){console.error(e)}}u();const l=document.querySelector(".world__list"),f=({pokemons:e,types:n,generations:r})=>{l.innerHTML=`
    <li class="world__item">
      <p class="world__text"><span class="world__num">${e}</span> покемонів</p>
    </li>
    <li class="world__item">
      <p class="world__text"><span class="world__num">${n}</span> типів</p>
    </li>
    <li class="world__item">
      <p class="world__text"><span class="world__num">${r}</span> поколінь</p>
    </li>
    ${l.innerHTML}
  `};async function _(){try{const[e,n,r]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon").then(o=>o.json()),fetch("https://pokeapi.co/api/v2/type").then(o=>o.json()),fetch("https://pokeapi.co/api/v2/generation").then(o=>o.json())]);f({pokemons:e.count,types:n.count,generations:r.count})}catch(e){console.error(e)}}_();const m=document.querySelector(".easteregg__button"),h=document.querySelector(".easteregg__btn"),p=document.querySelector(".backdrop"),c=()=>{p.style.display="none"};m.addEventListener("click",c);h.addEventListener("click",c);window.addEventListener("keydown",e=>{e.key==="Escape"&&c()});p.addEventListener("click",e=>{e.target===e.currentTarget&&c()});
//# sourceMappingURL=main-c9fe98ca.js.map
