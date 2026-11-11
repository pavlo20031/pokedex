(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const p=document.querySelector(".hero__list"),_=({pokemons:e,types:t,generations:r})=>{p.innerHTML=`
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
  `};async function y(){try{const[e,t,r]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon").then(n=>n.json()),fetch("https://pokeapi.co/api/v2/type").then(n=>n.json()),fetch("https://pokeapi.co/api/v2/generation").then(n=>n.json())]);_({pokemons:e.count,types:t.count,generations:r.count})}catch(e){console.error(e)}}y();const c=document.querySelector(".btn-icon"),u=c==null?void 0:c.querySelector("use"),m=document.querySelector(".header__burger-btn"),a=document.querySelector(".header__nav");function d(e){if(u){const t=e?"sun":"moon";u.setAttribute("href",`./img/symbol-defs.svg#${t}`)}}const g=localStorage.getItem("theme");g==="dark"?(document.body.classList.add("dark-theme"),d(!0)):d(!1);c==null||c.addEventListener("click",()=>{const e=document.body.classList.toggle("dark-theme");e?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light"),d(e)});m&&a&&(m.addEventListener("click",()=>{a.classList.toggle("is-open")}),a.querySelectorAll(".header__nav-link").forEach(t=>{t.addEventListener("click",()=>{a.classList.remove("is-open")})}));const f=document.querySelector(".world__list"),k=({pokemons:e,types:t,generations:r})=>{f.innerHTML=`
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
  `};async function v(){try{const[e,t,r]=await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon").then(n=>n.json()),fetch("https://pokeapi.co/api/v2/type").then(n=>n.json()),fetch("https://pokeapi.co/api/v2/generation").then(n=>n.json())]);k({pokemons:e.count,types:t.count,generations:r.count})}catch(e){console.error(e)}}v();const L=document.querySelector(".easteregg__button"),S=document.querySelector(".easteregg__btn"),h=document.querySelector(".backdrop"),i=()=>{h.style.display="none"};L.addEventListener("click",i);S.addEventListener("click",i);window.addEventListener("keydown",e=>{e.key==="Escape"&&i()});h.addEventListener("click",e=>{e.target===e.currentTarget&&i()});
//# sourceMappingURL=main-700a8d65.js.map
