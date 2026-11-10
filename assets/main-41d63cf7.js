(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const p=document.querySelector(".hero__list"),m=({pokemons:e,types:t,generations:r})=>{p.innerHTML=`
    <li class="hero__item">
      <p class="hero__analys">${e} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${t} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${r} поколінь</p>
    </li>
    ${p.innerHTML}
  `};async function y(){try{const[e,t,r]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon").then(n=>n.json()),fetch("https://pokeapi.co/api/v2/type").then(n=>n.json()),fetch("https://pokeapi.co/api/v2/generation").then(n=>n.json())]);m({pokemons:e.count,types:t.count,generations:r.count})}catch(e){console.error(e)}}y();const c=document.querySelector(".btn-icon"),d=c==null?void 0:c.querySelector("use"),u=document.querySelector(".header__burger-btn"),i=document.querySelector(".header__nav");c==null||c.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");if(d){const t=e?"sun":"moon";d.setAttribute("href",`./img/symbol-defs.svg#${t}`)}});u&&i&&(u.addEventListener("click",()=>{i.classList.toggle("is-open")}),i.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{i.classList.remove("is-open")})}));const f=document.querySelector(".world__list"),h=({pokemons:e,types:t,generations:r})=>{f.innerHTML=`
    <li class="world__item">
      <p class="world__text"><span class="world__num">${e}</span> покемонів</p>
    </li>
    <li class="world__item">
      <p class="world__text"><span class="world__num">${t}</span> типів</p>
    </li>
    <li class="world__item">
      <p class="world__text"><span class="world__num">${r}</span> поколінь</p>
    </li>
    ${f.innerHTML}
  `};async function g(){try{const[e,t,r]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon").then(n=>n.json()),fetch("https://pokeapi.co/api/v2/type").then(n=>n.json()),fetch("https://pokeapi.co/api/v2/generation").then(n=>n.json())]);h({pokemons:e.count,types:t.count,generations:r.count})}catch(e){console.error(e)}}g();const k=document.querySelector(".easteregg__button"),v=document.querySelector(".easteregg__btn"),_=document.querySelector(".backdrop"),a=()=>{_.style.display="none"};k.addEventListener("click",a);v.addEventListener("click",a);window.addEventListener("keydown",e=>{e.key==="Escape"&&a()});_.addEventListener("click",e=>{e.target===e.currentTarget&&a()});
//# sourceMappingURL=main-41d63cf7.js.map
