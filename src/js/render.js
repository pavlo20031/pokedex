import { getAllLight } from './api.js';
import spriteUrl from '../img/symbol-defs.svg';
import searchImg from '../img/search-pokemon.png';
const PAGE_SIZE = 10;
const TOTAL = 1025;
const MAX_TYPES = 2;
const LIKED_KEY = 'likedPokemons';

const TYPES = {
  grass: "Трав'яний",
  poison: 'Отруйний',
  fire: 'Вогняний',
  water: 'Водний',
  bug: 'Комаха',
  electric: 'Електричний',
  psychic: 'Психічний',
  normal: 'Звичайний',
  ghost: 'Примарний',
  flying: 'Летючий',
  ice: 'Крижаний',
  ground: 'Земляний',
  fighting: 'Бойовий',
  rock: "Кам'яний",
  dragon: 'Дракон',
  dark: 'Темний',
  steel: 'Сталевий',
  fairy: 'Казковий',
};

const GENS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

const getLiked = () => JSON.parse(localStorage.getItem(LIKED_KEY)) || [];
const saveLiked = ids => localStorage.setItem(LIKED_KEY, JSON.stringify(ids));

const formatName = name =>
  name
    .split('-')
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(' ');

function pluralize(n) {
  const last = n % 10;
  const lastTwo = n % 100;
  if (last === 1 && lastTwo !== 11) return 'покемон';
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14))
    return 'покемони';
  return 'покемонів';
}

// Розмітка однієї картки (повністю під стилі .pokemon-card)
export function cardHTML(p, likedIds = []) {
  const num = String(p.id).padStart(3, '0');
  const img =
    p.sprites ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;
  const isLiked = likedIds.includes(p.id);
  const typeList = Array.isArray(p.types)
    ? p.types
    : Array.isArray(p.type)
      ? p.type.map(t => t.type?.name || t)
      : [];

  const badges = typeList
    .map(t => `<li class="type-badge type-badge--${t}">${TYPES[t] || t}</li>`)
    .join('');

  return `
    <li class="pokemon-card" data-id="${p.id}">
      <div class="pokemon-card__top">
        <span class="pokemon-card__num">#${num}</span>
        <button class="pokemon-card__fav ${isLiked ? 'is-active' : ''}" type="button" aria-label="Додати в улюблені">
          <svg class="icon icon__stroke"><use href="${spriteUrl}#heart"></use></svg>
        </button>
      </div>
      <img class="pokemon-card__img" src="${img}" alt="${formatName(p.name)}" loading="lazy" width="475" height="475" />
      <h3 class="pokemon-card__name">${formatName(p.name)}</h3>
      <ul class="pokemon-card__types">${badges}</ul>
    </li>`;
}

export function initPokemonApp(
  [
    containerSelector = '.search-cards',
    nextBtnSelector = '.search-controls-button',
  ] = [],
  searchInputSelector = '.search-input',
  counterSelector = '.search-results-count'
) {
  const section = document.querySelector('.search-section') || document.body;
  const input = section.querySelector(searchInputSelector);
  const inputBox = section.querySelector('.search-input-box');
  const filtersWrapper = section.querySelector('.filters-wrappers');
  const typeBtn = section.querySelector('[data-action="filter-type"]');
  const genBtn = section.querySelector('[data-action="filter-generation"]');
  const sortBtn = section.querySelector('[data-action="sort-number"]');
  const countEl = section.querySelector(counterSelector);

  const state = {
    all: [],
    query: '',
    types: [],
    gen: 0,
    order: 'asc',
    shown: PAGE_SIZE,
  };

  // Кнопка очищення пошуку (.search-clear)
  let clearBtn = inputBox?.querySelector('.search-clear');
  if (!clearBtn && inputBox) {
    clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'search-clear';
    clearBtn.hidden = true;
    clearBtn.setAttribute('aria-label', 'Очистити пошук');
    clearBtn.textContent = '×';
    inputBox.append(clearBtn);
  }

  // Панель фільтрів (.filter-panel)
  const panel = document.createElement('div');
  panel.className = 'filter-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <div class="filter-panel__head">
      <h3 class="filter-panel__title">Тип покемона</h3>
      <button class="filter-panel__reset" type="button" data-action="reset-filters">Скинути</button>
    </div>
    <div class="filter-panel__types">
      ${Object.entries(TYPES)
        .map(
          ([key, name]) =>
            `<button class="type-badge type-badge--${key}" type="button" data-type="${key}">${name}</button>`
        )
        .join('')}
    </div>
    <div class="filter-panel__gens">
      <span class="filter-panel__label">Покоління</span>
      <button class="gen-chip" type="button" data-gen="0">Усі</button>
      ${GENS.map(
        (roman, i) =>
          `<button class="gen-chip" type="button" data-gen="${i + 1}">${roman}</button>`
      ).join('')}
    </div>`;

  // Рядок активних фільтрів (.active-filters)
  const activeBar = document.createElement('div');
  activeBar.className = 'active-filters';
  activeBar.hidden = true;

  // Контейнер сітки карток — обов'язково додаємо клас .pokemon-grid
  let grid =
    section.querySelector(containerSelector) ||
    section.querySelector('.pokemon-grid');
  if (!grid) {
    grid = document.createElement('ul');
  }
  grid.classList.add('pokemon-grid');

  // Стан порожнього результату (.empty-state)
  let empty = section.querySelector('.empty-state');
  if (!empty) {
    empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.hidden = true;
    empty.innerHTML = `
  <button
    class="empty-state__img-btn"
    type="button"
    aria-label="Відкрити модалку"
  >
    <img
      class="empty-state__img"
      src="${searchImg}"
      alt="Нічого не знайдено"
      width="120"
      height="120"
    />
  </button>

  <h3 class="empty-state__title">Нічого не знайдено</h3>

  <p class="empty-state__text"></p>

  <button
    class="btn btn-reset"
    type="button"
    data-action="reset-all"
  >
  <svg class="search-icons">
  <use href="${spriteUrl}#update"></use>
</svg>
    Скинути всі фільтри
  </button>

  <button
    class="empty-state__back"
    type="button"
    data-action="reset-all"
  >
    Повернутися до каталогу
  </button>
`;
  }

  // Кнопка пагінації — обов'язково додаємо класи .btn та .btn-more
  let moreBtn =
    section.querySelector(nextBtnSelector) ||
    section.querySelector('[data-action="show-more"]');
  if (!moreBtn) {
    moreBtn = document.createElement('button');
    moreBtn.type = 'button';
  }
  moreBtn.classList.add('btn', 'btn-more');
  moreBtn.dataset.action = 'show-more';
  moreBtn.hidden = true;

  // Вставляємо елементи в правильному порядку у DOM
  if (filtersWrapper) {
    filtersWrapper.after(panel, activeBar);
    if (!grid.parentElement) activeBar.after(grid);
    if (!empty.parentElement) grid.after(empty);
    if (!moreBtn.parentElement) empty.after(moreBtn);
  } else if (grid.parentElement) {
    grid.before(panel, activeBar);
    if (!empty.parentElement) grid.after(empty);
    if (!moreBtn.parentElement) empty.after(moreBtn);
  }

  // Фільтрація та сортування
  function getFiltered() {
    const q = state.query.trim().toLowerCase().replace('#', '');
    const result = state.all.filter(p => {
      if (
        q &&
        !p.name.includes(q) &&
        !String(p.id).padStart(3, '0').includes(q)
      )
        return false;
      if (!state.types.every(t => p.types.includes(t))) return false;
      if (state.gen && p.gen !== state.gen) return false;
      return true;
    });
    result.sort((a, b) => (state.order === 'asc' ? a.id - b.id : b.id - a.id));
    return result;
  }

  // Оновлення кнопок і чипів фільтрів
  function syncControls(total) {
    if (typeBtn) {
      const typeLabel =
        state.types.length === 0
          ? 'Усі типи'
          : state.types.length === 1
            ? TYPES[state.types[0]]
            : `Типів: ${state.types.length}`;
      const span = typeBtn.querySelector('span');
      if (span) span.textContent = typeLabel;
      typeBtn.classList.toggle('is-active', state.types.length > 0);
      typeBtn.classList.toggle('is-open', !panel.hidden);
    }

    if (genBtn) {
      const span = genBtn.querySelector('span');
      if (span) {
        span.textContent = state.gen
          ? `Покоління ${GENS[state.gen - 1]}`
          : 'Усі покоління';
      }
      genBtn.classList.toggle('is-active', state.gen > 0);
      genBtn.classList.toggle('is-open', !panel.hidden);
    }

    if (sortBtn) {
      const span = sortBtn.querySelector('span');
      if (span)
        span.textContent = `За номером ${state.order === 'asc' ? '↑' : '↓'}`;
    }

    panel.querySelectorAll('[data-type]').forEach(el => {
      el.classList.toggle('is-active', state.types.includes(el.dataset.type));
    });
    panel.querySelectorAll('[data-gen]').forEach(el => {
      el.classList.toggle('is-active', Number(el.dataset.gen) === state.gen);
    });

    if (clearBtn) clearBtn.hidden = !state.query;

    const hasChips = state.types.length > 0 || state.gen > 0;
    activeBar.hidden = !hasChips;
    if (hasChips) {
      const typeChips = state.types
        .map(
          t =>
            `<span class="active-chip">${TYPES[t]}<button type="button" data-remove-type="${t}" aria-label="Прибрати фільтр">×</button></span>`
        )
        .join('');
      const genChip = state.gen
        ? `<span class="active-chip">Покоління ${GENS[state.gen - 1]}<button type="button" data-remove-gen aria-label="Прибрати фільтр">×</button></span>`
        : '';
      activeBar.innerHTML = `${typeChips}${genChip}
        <button class="active-filters__reset" type="button" data-action="reset-filters">Скинути всі</button>
        <span class="active-filters__count">Знайдено ${total} ${pluralize(total)}</span>`;
    }
  }

  // Головна функція рендеру карток, стану "Нічого не знайдено" та пагінації
  function render() {
    const list = getFiltered();
    const visible = list.slice(0, state.shown);
    const hasFilters = Boolean(
      state.query.trim() || state.types.length || state.gen
    );
    const likedIds = getLiked();

    grid.innerHTML = visible.map(p => cardHTML(p, likedIds)).join('');
    grid.hidden = list.length === 0;
    empty.hidden = list.length !== 0;

    if (list.length === 0) {
      const emptyText = empty.querySelector('.empty-state__text');
      if (emptyText) {
        emptyText.textContent = state.query.trim()
          ? `Ми не знайшли покемонів за запитом «${state.query.trim()}». Спробуй змінити назву або скинути фільтри.`
          : 'За такими фільтрами покемонів немає. Спробуй змінити параметри.';
      }
    }

if (list.length === 0) {
  moreBtn.style.display = 'none';
} else {
  const remaining = list.length - visible.length;

  moreBtn.style.display = remaining > 0 ? 'block' : 'none';
  moreBtn.textContent = `Загрузити покемонів (${remaining})`;
}

    if (countEl) {
      countEl.textContent = hasFilters
        ? `Знайдено ${list.length} ${pluralize(list.length)}`
        : `Показано ${visible.length} із ${state.all.length.toLocaleString('uk-UA')} покемонів`;
    }

    syncControls(list.length);
  }

  function applyChange() {
    state.shown = PAGE_SIZE;
    render();
  }

  function resetFilters() {
    state.types = [];
    state.gen = 0;
    applyChange();
  }

  function resetAll() {
    state.query = '';
    if (input) input.value = '';
    panel.hidden = true;
    resetFilters();
  }

  function togglePanel() {
    panel.hidden = !panel.hidden;
    render();
  }

  let timer;
  if (input) {
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        state.query = input.value;
        applyChange();
      }, 250);
    });
  }

  section.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.search-clear')) {
      state.query = '';
      if (input) {
        input.value = '';
        input.focus();
      }
      return applyChange();
    }
    if (
      target.closest(
        '[data-action="filter-type"], [data-action="filter-generation"]'
      )
    ) {
      return togglePanel();
    }
    if (target.closest('[data-action="sort-number"]')) {
      state.order = state.order === 'asc' ? 'desc' : 'asc';
      return applyChange();
    }
    if (target.closest('[data-action="reset-filters"]')) return resetFilters();
    if (target.closest('[data-action="reset-all"]')) return resetAll();
    if (
      target.closest('[data-action="show-more"]') ||
      target.closest(nextBtnSelector)
    ) {
      state.shown += PAGE_SIZE;
      return render();
    }

    const typeChip = target.closest('[data-type]');
    if (typeChip) {
      const t = typeChip.dataset.type;
      state.types = state.types.includes(t)
        ? state.types.filter(x => x !== t)
        : state.types.length < MAX_TYPES
          ? [...state.types, t]
          : state.types;
      return applyChange();
    }

    const genChip = target.closest('[data-gen]');
    if (genChip) {
      state.gen = Number(genChip.dataset.gen);
      return applyChange();
    }

    const removeType = target.closest('[data-remove-type]');
    if (removeType) {
      state.types = state.types.filter(
        x => x !== removeType.dataset.removeType
      );
      return applyChange();
    }

    if (target.closest('[data-remove-gen]')) {
      state.gen = 0;
      return applyChange();
    }

    const favBtn = target.closest('.pokemon-card__fav');
    if (favBtn) {
      const id = Number(favBtn.closest('.pokemon-card').dataset.id);
      const liked = getLiked();
      const updated = liked.includes(id)
        ? liked.filter(x => x !== id)
        : [...liked, id];
      saveLiked(updated);
      const isLiked = updated.includes(id);
      favBtn.classList.toggle('is-active', isLiked);
      document.dispatchEvent(
        new CustomEvent('favorites:changed', { detail: { id, liked: isLiked } })
      );
      return;
    }

    const card = target.closest('.pokemon-card');
    if (card) {
      document.dispatchEvent(
        new CustomEvent('pokemon:open', {
          detail: { id: Number(card.dataset.id) },
        })
      );
    }
  });

  window.addEventListener('storage', render);

  async function init() {
    if (countEl) countEl.textContent = 'Завантаження...';
    try {
      state.all = await getAllLight(TOTAL);
      render();
    } catch (err) {
      console.error(err);
      if (countEl) countEl.textContent = 'Не вдалося завантажити покемонів';
    }
  }

  init();
}
