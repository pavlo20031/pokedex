// Базова адреса PokeAPI
const API = 'https://pokeapi.co/api/v2/';
// Скільки карток показуємо за один раз
const PAGE_SIZE = 12;
// Загальна кількість покемонів (без альтернативних форм)
const TOTAL = 1025;
// Максимум типів, які можна обрати одночасно
const MAX_TYPES = 2;
// Ключ у localStorage (спільний із іншими сторінками та модалками)
const LIKED_KEY = 'likedPokemons';

// Типи: ключ з API -> українська назва
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
// Римські цифри поколінь (індекс + 1 = номер покоління)
const GENS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

// Робота з улюбленими в localStorage
const getLiked = () => JSON.parse(localStorage.getItem(LIKED_KEY)) || [];
const saveLiked = ids => localStorage.setItem(LIKED_KEY, JSON.stringify(ids));

// Стан сторінки
const state = {
  all: [], // усі покемони {id, name, types, gen}
  query: '', // текст пошуку
  types: [], // обрані типи
  gen: 0, // обране покоління (0 = усі)
  order: 'asc', // напрям сортування за номером
  shown: PAGE_SIZE, // скільки карток зараз показано
};

// Знаходимо елементи, які вже є в HTML
const section = document.querySelector('.search-section');
const input = section.querySelector('.search-input');
const inputBox = section.querySelector('.search-input-box');
const filtersWrapper = section.querySelector('.filters-wrapper');
const typeBtn = section.querySelector('[data-action="filter-type"]');
const genBtn = section.querySelector('[data-action="filter-generation"]');
const sortBtn = section.querySelector('[data-action="sort-number"]');
const countEl = section.querySelector('.search-results-count');

// Створюємо елементи, яких у HTML немає
const clearBtn = document.createElement('button');
clearBtn.type = 'button';
clearBtn.className = 'search-clear';
clearBtn.hidden = true;
clearBtn.setAttribute('aria-label', 'Очистити пошук');
clearBtn.textContent = '×';
inputBox.append(clearBtn);

const panel = document.createElement('div');
panel.className = 'filter-panel';
panel.hidden = true;

const activeBar = document.createElement('div');
activeBar.className = 'active-filters';
activeBar.hidden = true;

const grid = document.createElement('ul');
grid.className = 'pokemon-grid';

const empty = document.createElement('div');
empty.className = 'empty-state';
empty.hidden = true;
empty.innerHTML = `
  <button class="empty-state__img-btn" type="button" data-action="reset-all" aria-label="Повернутися до каталогу">
    <img class="empty-state__img" src="/img/search-pokemon.png" alt="Нічого не знайдено" width="120" height="120" />
  </button>
  <h3 class="empty-state__title">Нічого не знайдено</h3>
  <p class="empty-state__text"></p>
  <button class="btn btn-reset" type="button" data-action="reset-all">Скинути всі фільтри</button>
  <button class="empty-state__back" type="button" data-action="reset-all">Повернутися до каталогу</button>`;

const moreBtn = document.createElement('button');
moreBtn.type = 'button';
moreBtn.className = 'btn btn-more';
moreBtn.dataset.action = 'show-more';
moreBtn.hidden = true;

// Вставляємо все після рядка фільтрів у потрібному порядку
filtersWrapper.after(panel, activeBar, grid, empty, moreBtn);

// Розмітка панелі: типи + покоління
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

// Дістаємо id з посилання виду .../pokemon/25/
const idFromUrl = url => Number(url.split('/').filter(Boolean).pop());

// Робимо назву гарною: "mr-mime" -> "Mr Mime"
const formatName = name =>
  name
    .split('-')
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(' ');

// Правильна форма слова "покемон" залежно від числа
function pluralize(n) {
  const last = n % 10;
  const lastTwo = n % 100;
  if (last === 1 && lastTwo !== 11) return 'покемон';
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return 'покемони';
  return 'покемонів';
}

// Завантажуємо всі дані одним пакетом запитів
async function loadData() {
  const listReq = fetch(`${API}pokemon?limit=${TOTAL}`).then(r => r.json());
  const typeReqs = Object.keys(TYPES).map(t =>
    fetch(`${API}type/${t}`).then(r => r.json())
  );
  const genReqs = GENS.map((_, i) =>
    fetch(`${API}generation/${i + 1}`).then(r => r.json())
  );

  const [list, typeData, genData] = await Promise.all([
    listReq,
    Promise.all(typeReqs),
    Promise.all(genReqs),
  ]);

  const typesById = {};
  typeData.forEach(type => {
    type.pokemon.forEach(entry => {
      const id = idFromUrl(entry.pokemon.url);
      if (id > TOTAL) return;
      (typesById[id] ||= []).push({ slot: entry.slot, name: type.name });
    });
  });

  const genById = {};
  genData.forEach((gen, i) => {
    gen.pokemon_species.forEach(s => {
      genById[idFromUrl(s.url)] = i + 1;
    });
  });

  state.all = list.results.map(p => {
    const id = idFromUrl(p.url);
    const types = (typesById[id] || [])
      .sort((a, b) => a.slot - b.slot)
      .map(t => t.name);
    return { id, name: p.name, types, gen: genById[id] || 0 };
  });
}

// Застосовуємо пошук → типи → покоління → сортування
function getFiltered() {
  const q = state.query.trim().toLowerCase().replace('#', '');
  const result = state.all.filter(p => {
    if (q && !p.name.includes(q) && !String(p.id).padStart(3, '0').includes(q)) return false;
    if (!state.types.every(t => p.types.includes(t))) return false;
    if (state.gen && p.gen !== state.gen) return false;
    return true;
  });
  result.sort((a, b) => (state.order === 'asc' ? a.id - b.id : b.id - a.id));
  return result;
}

// Розмітка однієї картки
function cardHTML(p, likedIds) {
  const num = String(p.id).padStart(3, '0');
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;
  const isLiked = likedIds.includes(p.id);
  const badges = p.types
    .map(t => `<li class="type-badge type-badge--${t}">${TYPES[t]}</li>`)
    .join('');

  return `
    <li class="pokemon-card" data-id="${p.id}">
      <div class="pokemon-card__top">
        <span class="pokemon-card__num">#${num}</span>
        <button class="pokemon-card__fav ${isLiked ? 'is-active' : ''}" type="button" aria-label="Додати в улюблені">
          <svg class="icon icon__stroke"><use href="/img/symbol-defs.svg#heart"></use></svg>
        </button>
      </div>
      <img class="pokemon-card__img" src="${img}" alt="${formatName(p.name)}" loading="lazy" width="475" height="475" />
      <h3 class="pokemon-card__name">${formatName(p.name)}</h3>
      <ul class="pokemon-card__types">${badges}</ul>
    </li>`;
}

// Оновлюємо кнопки, панель і рядок обраних фільтрів
function syncControls(total) {
  const typeLabel =
    state.types.length === 0
      ? 'Усі типи'
      : state.types.length === 1
        ? TYPES[state.types[0]]
        : `Типів: ${state.types.length}`;
  typeBtn.querySelector('span').textContent = typeLabel;

  genBtn.querySelector('span').textContent = state.gen
    ? `Покоління ${GENS[state.gen - 1]}`
    : 'Усі покоління';

  sortBtn.querySelector('span').textContent = `За номером ${state.order === 'asc' ? '↑' : '↓'}`;

  typeBtn.classList.toggle('is-active', state.types.length > 0);
  genBtn.classList.toggle('is-active', state.gen > 0);
  typeBtn.classList.toggle('is-open', !panel.hidden);
  genBtn.classList.toggle('is-open', !panel.hidden);

  panel.querySelectorAll('[data-type]').forEach(el => {
    el.classList.toggle('is-active', state.types.includes(el.dataset.type));
  });
  panel.querySelectorAll('[data-gen]').forEach(el => {
    el.classList.toggle('is-active', Number(el.dataset.gen) === state.gen);
  });

  clearBtn.hidden = !state.query;

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

// Головна функція малювання
function render() {
  const list = getFiltered();
  const visible = list.slice(0, state.shown);
  const hasFilters = Boolean(state.query.trim() || state.types.length || state.gen);
  const likedIds = getLiked();

  grid.innerHTML = visible.map(p => cardHTML(p, likedIds)).join('');
  grid.hidden = list.length === 0;
  empty.hidden = list.length !== 0;

  if (list.length === 0) {
    empty.querySelector('.empty-state__text').textContent = state.query.trim()
      ? `Ми не знайшли покемонів за запитом «${state.query.trim()}». Спробуй змінити назву або скинути фільтри.`
      : 'За такими фільтрами покемонів немає. Спробуй змінити параметри.';
  }

  moreBtn.hidden = visible.length >= list.length;
  moreBtn.textContent = `Показати ще (${list.length - visible.length})`;

  countEl.textContent = hasFilters
    ? `Знайдено ${list.length} ${pluralize(list.length)}`
    : `Показано ${visible.length} із ${state.all.length.toLocaleString('uk-UA')} покемонів`;

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
  input.value = '';
  panel.hidden = true;
  resetFilters();
}

function togglePanel() {
  panel.hidden = !panel.hidden;
  render();
}

let timer;
input.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    state.query = input.value;
    applyChange();
  }, 250);
});

// Усі кліки в секції обробляємо в одному місці
section.addEventListener('click', e => {
  const target = e.target;

  if (target.closest('.search-clear')) {
    state.query = '';
    input.value = '';
    input.focus();
    return applyChange();
  }
  if (target.closest('[data-action="filter-type"], [data-action="filter-generation"]')) {
    return togglePanel();
  }
  if (target.closest('[data-action="sort-number"]')) {
    state.order = state.order === 'asc' ? 'desc' : 'asc';
    return applyChange();
  }
  if (target.closest('[data-action="reset-filters"]')) return resetFilters();
  if (target.closest('[data-action="reset-all"]')) return resetAll();
  if (target.closest('[data-action="show-more"]')) {
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
    state.types = state.types.filter(x => x !== removeType.dataset.removeType);
    return applyChange();
  }
  if (target.closest('[data-remove-gen]')) {
    state.gen = 0;
    return applyChange();
  }
  

  // Клік по сердечку — додаємо або видаляємо з likedPokemons
  const favBtn = target.closest('.pokemon-card__fav');
  if (favBtn) {
    const id = Number(favBtn.closest('.pokemon-card').dataset.id);
    const liked = getLiked();
    const updated = liked.includes(id)
      ? liked.filter(x => x !== id)
      : [...liked, id];
    saveLiked(updated);
    favBtn.classList.toggle('is-active', updated.includes(id));
    return;
  }

  // Клік по самій картці — відкриття модалки деталей
  const card = target.closest('.pokemon-card');
  if (card) {
    document.dispatchEvent(
      new CustomEvent('pokemon:open', { detail: { id: Number(card.dataset.id) } })
    );
  }
});

window.addEventListener('storage', render);

async function init() {
  countEl.textContent = 'Завантаження...';
  try {
    await loadData();
    render();
  } catch (err) {
    console.error(err);
    countEl.textContent = 'Не вдалося завантажити покемонів';
  }
}

init();