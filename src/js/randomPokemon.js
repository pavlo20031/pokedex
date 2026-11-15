import { get } from './api.js';
import spriteUrl from '../img/symbol-defs.svg';

const openBtnRef = document.querySelector('.btn-random');
const closeBtnRef = document.querySelector('.random__btn');
const backdropRef = document.querySelector('.backdrops');
const boxRef = document.querySelector('.random__box');
const btnRef = document.querySelector('.random__button');

const typeTranslations = {
  normal: 'Звичайний',
  fire: 'Вогняний',
  water: 'Водяний',
  electric: 'Електричний',
  grass: "Трав'яний",
  ice: 'Льодяний',
  fighting: 'Бойовий',
  poison: 'Отруйний',
  ground: 'Земляний',
  flying: 'Літаючий',
  psychic: 'Психічний',
  bug: 'Комаха',
  rock: "Кам'яний",
  ghost: 'Примарний',
  dragon: 'Драконячий',
  dark: 'Темний',
  steel: 'Сталевий',
  fairy: 'Фейний',
};

function renderPokemon(pokemon) {
  const typesMarkup = pokemon.type
    .map(
      item => `
      <li class="random__items">
        <p class="random__types random__${item.type.name}">
          ${typeTranslations[item.type.name] || item.type.name}
        </p>
      </li>
    `
    )
    .join('');

  boxRef.innerHTML = `
    <div class="random__position">
      <p class="random__number">
        #${String(pokemon.id).padStart(3, '0')}
      </p>

      <img
        class="random__img random__img${pokemon.type[0].type.name}"
        src="${pokemon.sprites.other['official-artwork'].front_default}"
        alt="${pokemon.name}"
      />
    </div>

    <div>
      <div class="random__info">
        <div>
          <p class="random__subtitle">
            #${String(pokemon.id).padStart(3, '0')} ·
            ${pokemon.generation}
          </p>

          <h2 class="random__title">
            ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
        </div>

        <button class="random__like" type="button">
          <svg class="random__icon">
            <use href="${spriteUrl}#heart"></use>
          </svg>
        </button>
      </div>

      <ul class="random__lists">
        ${typesMarkup}
      </ul>

      <p class="random__subtitle random__desc">
        ${pokemon.description}
      </p>

      <div class="random__params">
        <p class="random__subtitle">
          Зріст:
          ${pokemon.height.replace('.', ',').replace('m', ' м')}
        </p>

        <p class="random__subtitle">
          Вага:
          ${pokemon.weight.replace('.', ',').replace('kg', ' кг')}
        </p>
      </div>

      <ul class="random__list">
        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">HP</p>
            <p class="random__stats">${pokemon.hp}</p>
          </div>
          <progress
            class="random__progress"
            value="${pokemon.hp}"
            max="255"
          ></progress>
        </li>

        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">Атака</p>
            <p class="random__stats">${pokemon.a}</p>
          </div>
          <progress
            class="random__progress"
            value="${pokemon.a}"
            max="255"
          ></progress>
        </li>

        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">Захист</p>
            <p class="random__stats">${pokemon.d}</p>
          </div>
          <progress
            class="random__progress"
            value="${pokemon.d}"
            max="255"
          ></progress>
        </li>

        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">Спец. атака</p>
            <p class="random__stats">${pokemon.spA}</p>
          </div>
          <progress
            class="random__progress"
            value="${pokemon.spA}"
            max="255"
          ></progress>
        </li>

        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">Спец. захист</p>
            <p class="random__stats">${pokemon.spD}</p>
          </div>
          <progress
            class="random__progress"
            value="${pokemon.spD}"
            max="255"
          ></progress>
        </li>

        <li class="random__item">
          <div class="random__abil">
            <p class="random__subtitle">Швидкість</p>
            <p class="random__stats">${pokemon.spe}</p>
          </div>
          <progress
            class="random__progress"
            value="${pokemon.spe}"
            max="255"
          ></progress>
        </li>
      </ul>
    </div>
  `;
  const likeBtnRef = boxRef.querySelector('.random__like');

  const likedPokemons = JSON.parse(localStorage.getItem('likedPokemons')) || [];

  if (likedPokemons.includes(pokemon.id)) {
    likeBtnRef.classList.add('liked');
  }

  likeBtnRef.addEventListener('click', () => {
    const likedPokemons =
      JSON.parse(localStorage.getItem('likedPokemons')) || [];

    if (likedPokemons.includes(pokemon.id)) {
      const filtered = likedPokemons.filter(id => id !== pokemon.id);

      localStorage.setItem('likedPokemons', JSON.stringify(filtered));

      likeBtnRef.classList.remove('liked');
    } else {
      likedPokemons.push(pokemon.id);

      localStorage.setItem('likedPokemons', JSON.stringify(likedPokemons));

      likeBtnRef.classList.add('liked');
    }
  });
}

async function loadRandomPokemon() {
  const randomId = Math.floor(Math.random() * 1025) + 1;

  const [pokemon] = await get([], [randomId]);

  if (pokemon) {
    renderPokemon(pokemon);
  }
}

if (openBtnRef && closeBtnRef && backdropRef) {
  const openModal = async () => {
    backdropRef.style.display = 'flex';
    await loadRandomPokemon();
  };

  const closeModal = () => {
    backdropRef.style.display = 'none';
  };

  openBtnRef.addEventListener('click', openModal);

  closeBtnRef.addEventListener('click', closeModal);

  if (btnRef) {
    btnRef.addEventListener('click', loadRandomPokemon);
  }

  window.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  });

  backdropRef.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  });
}
