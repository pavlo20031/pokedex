import { get } from './api.js';
import spriteUrl from '../img/symbol-defs.svg';

const backdrop = document.querySelector('[data-details-backdrop]');
const content = backdrop?.querySelector('[data-details-content]');
const toolbarId = backdrop?.querySelector('[data-details-toolbar-id]');
const closeButtons = backdrop?.querySelectorAll('[data-details-close]');
const lists = document.querySelectorAll('.search-cards, .favorites__list');
let modalReturnFocus = null;

const TYPE_NAMES_UA = {
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

const ABILITY_NAMES_UA = {
  static: 'Статика',
  'lightning-rod': 'Блискавковідвід',
  overgrow: 'Заростання',
  blaze: 'Спалах',
  torrent: 'Потік',
  'shield-dust': 'Захисний пил',
  'compound-eyes': 'Складні очі',
  swarm: 'Рій',
  'keen-eye': 'Гострий зір',
  'run-away': 'Втеча',
  intimidate: 'Залякування',
  levitate: 'Левітація',
  pressure: 'Тиск',
  adaptability: 'Адаптивність',
  synchronize: 'Синхронізація',
  'inner-focus': 'Внутрішній фокус',
};

const STAT_LABELS = [
  ['hp', 'HP'],
  ['a', 'Атака'],
  ['d', 'Захист'],
  ['spA', 'Спец. атака'],
  ['spD', 'Спец. захист'],
  ['spe', 'Швидкість'],
];

let currentPokemon = null;
let requestNumber = 0;
let scrollSnapshot = null;

function escapeHtml(value = '') {
  return String(value).replace(
    /[&<>"']/g,
    char =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char]
  );
}

function paddedId(id) {
  return String(id).padStart(3, '0');
}

function getSavedIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem('likedPokemons') || '[]');
    return Array.isArray(parsed) ? parsed.map(Number) : [];
  } catch (error) {
    console.error('Не вдалося прочитати список обраного:', error);
    return [];
  }
}

function updateHeaderCounter() {
  const count = getSavedIds().length;
  document.querySelectorAll('.header__nav-badge').forEach(badge => {
    badge.textContent = count;
  });
}

function formatMeasurement(value, unit) {
  const numeric = Number.parseFloat(value);
  return Number.isFinite(numeric)
    ? `${numeric.toFixed(1).replace('.', ',')} ${unit}`
    : `${value || '—'} ${unit}`;
}

function getAbilityLabel(pokemon) {
  const ability =
    pokemon.abilities?.find(item => !item.is_hidden) || pokemon.abilities?.[0];
  const name = ability?.ability?.name;
  if (!name) return '—';
  return (
    ABILITY_NAMES_UA[name] ||
    name.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase())
  );
}

function renderTypes(types = []) {
  return types
    .map(item => {
      const typeName = item?.type?.name || '';
      const label = TYPE_NAMES_UA[typeName] || typeName;
      return `<span class="pokemon-details__type pokemon-details__type--${escapeHtml(typeName)}">${escapeHtml(label)}</span>`;
    })
    .join('');
}

function renderStats(pokemon) {
  const primaryType = pokemon.type?.[0]?.type?.name || 'normal';

  const stats = STAT_LABELS.map(([key, label]) => ({
    label,
    value: Number(pokemon[key]) || 0,
  }));

  const total = stats.reduce((sum, item) => sum + item.value, 0);

  return `
    <section class="pokemon-details__section pokemon-details__stats-section">
      <div class="pokemon-details__section-heading">
        <h3>Базові характеристики</h3>
        <span>Разом: <strong>${total}</strong></span>
      </div>

      <ul class="pokemon-details__stats">
        ${stats
          .map(
            ({ label, value }) => `
          <li class="pokemon-details__stat">
            <span class="pokemon-details__stat-name">${label}</span>

            <span class="pokemon-details__stat-value">${value}</span>

            <progress
              class="pokemon-details__progress pokemon-details__progress--${escapeHtml(primaryType)}"
              value="${Math.min(value, 255)}"
              max="255"
              aria-label="${label}: ${value}"
            ></progress>
          </li>
        `
          )
          .join('')}
      </ul>
    </section>
  `;
}

function renderEvolution(pokemon) {
  const evolutions = Array.isArray(pokemon.evodata) ? pokemon.evodata : [];
  const names = Array.isArray(pokemon.chain) ? pokemon.chain : [];

  if (!evolutions.length) {
    return `
      <section class="pokemon-details__section pokemon-details__evolution-section">
        <h3>Еволюційний ланцюг</h3>
        <p class="pokemon-details__no-evolution">Інформація про еволюцію відсутня.</p>
      </section>
    `;
  }

  return `
    <section class="pokemon-details__section pokemon-details__evolution-section">
      <h3>Еволюційний ланцюг</h3>
      <div class="pokemon-details__evolutions">
        ${evolutions
          .map((evolution, index) => {
            const id = Number(evolution.id);
            const name = names[index] || `Pokémon ${id}`;
            const isCurrent = id === Number(pokemon.id);
            return `
            <button
              class="pokemon-details__evolution ${isCurrent ? 'is-current' : ''}"
              type="button"
              data-evolution-id="${id}"
              aria-current="${isCurrent ? 'true' : 'false'}"
              aria-label="Відкрити ${escapeHtml(name)}"
            >
              <span class="pokemon-details__evolution-image">
                <img src="${escapeHtml(evolution.img)}" alt="${escapeHtml(name)}" loading="lazy">
              </span>
              <span class="pokemon-details__evolution-name">${escapeHtml(name.charAt(0).toUpperCase() + name.slice(1))}</span>
              <span class="pokemon-details__evolution-id">#${paddedId(id)}</span>
            </button>
            ${index < evolutions.length - 1 ? '<span class="pokemon-details__evolution-arrow" aria-hidden="true">→</span>' : ''}
          `;
          })
          .join('')}
      </div>
    </section>
  `;
}

function renderPokemon(pokemon) {
  const id = paddedId(pokemon.id);
  const name = pokemon.name
    ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    : 'Pokémon';
  const primaryType = pokemon.type?.[0]?.type?.name || 'normal';
  const isLiked = getSavedIds().includes(Number(pokemon.id));

  return `
    <div class="pokemon-details__top">
      <div class="pokemon-details__art pokemon-details__art--${escapeHtml(primaryType)}">
        <span class="pokemon-details__art-id">#${id}</span>
        <img class="pokemon-details__art-image" src="${escapeHtml(pokemon.sprites)}" alt="${escapeHtml(name)}">
        <span class="pokemon-details__art-caption">Покемон</span>
      </div>

      <div class="pokemon-details__overview">
        <div class="pokemon-details__identity">
          <div>
            <p class="pokemon-details__eyebrow">#${id} · ${escapeHtml(pokemon.generation || 'Покоління невідоме')}</p>
            <h2 id="pokemon-details-title">${escapeHtml(name)}</h2>
          </div>
          <button class="pokemon-details__like ${isLiked ? 'is-liked' : ''}" type="button" data-details-like="${Number(pokemon.id)}" aria-pressed="${isLiked}" aria-label="${isLiked ? 'Видалити з обраного' : 'Додати до обраного'}">
            <svg class="pokemon-details__like-icon" aria-hidden="true">
              <use href="${spriteUrl}#heart"></use>
            </svg>
          </button>
        </div>

        <div class="pokemon-details__types">${renderTypes(pokemon.type)}</div>
        <p class="pokemon-details__description">${escapeHtml(pokemon.description || 'Опис для цього покемона поки відсутній.')}</p>

        <div class="pokemon-details__traits">
          <div><span>Зріст</span><strong>${escapeHtml(formatMeasurement(pokemon.height, 'м'))}</strong></div>
          <div><span>Вага</span><strong>${escapeHtml(formatMeasurement(pokemon.weight, 'кг'))}</strong></div>
          <div><span>Здібність</span><strong>${escapeHtml(getAbilityLabel(pokemon))}</strong></div>
        </div>
      </div>
    </div>

    ${renderStats(pokemon)}
    ${renderEvolution(pokemon)}
  `;
}

function lockPageScroll() {
  if (scrollSnapshot) return;

  const body = document.body;
  const html = document.documentElement;

  scrollSnapshot = {
    scrollX: window.scrollX,
    scrollY: window.scrollY,

    htmlOverflow: html.style.overflow,

    bodyStyles: {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    },
  };

  body.style.position = 'fixed';
  body.style.top = `-${scrollSnapshot.scrollY}px`;
  body.style.left = `-${scrollSnapshot.scrollX}px`;
  body.style.right = '0';
  body.style.width = '100%';
  body.style.overflow = 'hidden';
  html.style.overflow = 'hidden';
}

function unlockPageScroll() {
  if (!scrollSnapshot) return;
  const snapshot = scrollSnapshot;
  scrollSnapshot = null;
  Object.assign(document.body.style, snapshot.bodyStyles);
  document.documentElement.style.overflow = snapshot.htmlOverflow;
  window.requestAnimationFrame(() => {
    window.scrollTo(snapshot.scrollX, snapshot.scrollY);
  });
}

function openModal() {
  if (!backdrop) return;

  const isOpening = backdrop.getAttribute('aria-hidden') !== 'false';

  if (isOpening) {
    lockPageScroll();
  }
  backdrop.inert = false;
  backdrop.style.display = 'flex';
  backdrop.setAttribute('aria-hidden', 'false');

  if (isOpening) {
    requestAnimationFrame(() => {
      backdrop.querySelector('.pokemon-details__close')?.focus();
    });
  }
}

function closeModal() {
  if (!backdrop) return;
  const returnFocus = modalReturnFocus;

  if (returnFocus?.isConnected) {
    returnFocus.focus({ preventScroll: true });
  } else if (backdrop.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  backdrop.inert = true;
  backdrop.setAttribute('aria-hidden', 'true');
  backdrop.style.display = 'none';

  unlockPageScroll();

  currentPokemon = null;
  modalReturnFocus = null;
  requestNumber += 1;
}

async function loadPokemonDetails(id) {
  if (!content || !id) return;
  const thisRequest = ++requestNumber;
  openModal();
  if (backdrop) {
    backdrop.scrollTop = 0;
  }
  if (toolbarId) toolbarId.textContent = `Покемон #${paddedId(id)}`;
  content.innerHTML =
    '<p class="pokemon-details__loading">Завантажуємо інформацію про покемона…</p>';

  try {
    const [pokemon] = await get([], [Number(id)]);
    if (thisRequest !== requestNumber) return;
    if (!pokemon) throw new Error('Покемона не знайдено.');

    currentPokemon = pokemon;
    if (toolbarId) toolbarId.textContent = `Покемон #${paddedId(pokemon.id)}`;
    content.innerHTML = renderPokemon(pokemon);
  } catch (error) {
    if (thisRequest !== requestNumber) return;
    console.error('Не вдалося завантажити деталі покемона:', error);
    content.innerHTML =
      '<p class="pokemon-details__error">Не вдалося завантажити інформацію. Спробуй ще раз.</p>';
  }
}

function getPokemonIdFromCard(card) {
  const dataId =
    card.dataset.pokemonId || card.querySelector('[data-id]')?.dataset.id;

  if (dataId && /^\d+$/.test(dataId)) {
    return dataId;
  }
  const idElement =
    card.querySelector('.favorites__id') || card.querySelector('span');
  const match = idElement?.textContent.match(/\d+/);

  return match ? match[0] : null;
}

function handleListClick(event) {
  if (
    event.target.closest(
      'button, a, input, select, textarea, [data-no-details]'
    )
  ) {
    return;
  }

  const card = event.target.closest('li, section, article');
  const pokemonId = getPokemonIdFromCard(card);
  if (!card || !event.currentTarget.contains(card)) {
    return;
  }
  if (!pokemonId) {
    return;
  }
  modalReturnFocus = card;

  if (!card.hasAttribute('tabindex')) {
    card.setAttribute('tabindex', '-1');
  }

  loadPokemonDetails(pokemonId);
}

lists.forEach(list => list.addEventListener('click', handleListClick));

closeButtons?.forEach(button => button.addEventListener('click', closeModal));

backdrop?.addEventListener('click', event => {
  if (event.target === backdrop) closeModal();
});

backdrop?.addEventListener('click', event => {
  const evolutionButton = event.target.closest('[data-evolution-id]');
  if (evolutionButton) {
    loadPokemonDetails(evolutionButton.dataset.evolutionId);
    return;
  }

  const likeButton = event.target.closest('[data-details-like]');
  if (!likeButton || !currentPokemon) return;

  const pokemonId = Number(likeButton.dataset.detailsLike);
  const savedIds = getSavedIds();
  const wasLiked = savedIds.includes(pokemonId);
  const nextIds = wasLiked
    ? savedIds.filter(id => id !== pokemonId)
    : [...savedIds, pokemonId];

  localStorage.setItem('likedPokemons', JSON.stringify(nextIds));
  const isLiked = !wasLiked;
  likeButton.classList.toggle('is-liked', isLiked);
  likeButton.setAttribute('aria-pressed', String(isLiked));
  likeButton.setAttribute(
    'aria-label',
    isLiked ? 'Видалити з обраного' : 'Додати до обраного'
  );
  updateHeaderCounter();
  document.dispatchEvent(
    new CustomEvent('favorites:changed', {
      detail: { id: pokemonId, liked: isLiked },
    })
  );
});

window.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    backdrop?.getAttribute('aria-hidden') === 'false'
  ) {
    closeModal();
  }
});
