import { get } from './api.js';

// Селектори з твого HTML
const searchInput = document.querySelector('.search-input');
const randomBtn = document.querySelector('[data-action="random-pokemon"]');
const sortBtn = document.querySelector('[data-action="sort-number"]');
const typeBtn = document.querySelector('[data-action="filter-type"]');
const generationBtn = document.querySelector('[data-action="filter-generation"]');
const resultsCountText = document.querySelector('.search-results-count');

// Єдиний стан фільтрів, пошуку та сортування
const searchState = {
  query: '',
  sortOrder: 'asc', // 'asc' (вгору) або 'desc' (вниз)
  types: [],        // обрані типи (масив)
  generation: null, // обране покоління (наприклад, 1, 2... або null)
};

// Список усіх доступних типів та поколінь для випадаючих меню
const ALL_TYPES = [
  { id: 'normal', name: 'Звичайний' },
  { id: 'fire', name: 'Вогняний' },
  { id: 'water', name: 'Водяний' },
  { id: 'electric', name: 'Електричний' },
  { id: 'grass', name: "Трав'яний" },
  { id: 'ice', name: 'Льодяний' },
  { id: 'fighting', name: 'Бойовий' },
  { id: 'poison', name: 'Отруйний' },
  { id: 'ground', name: 'Земляний' },
  { id: 'flying', name: 'Літаючий' },
  { id: 'psychic', name: 'Психічний' },
  { id: 'bug', name: 'Комаха' },
  { id: 'rock', name: "Кам'яний" },
  { id: 'ghost', name: 'Примарний' },
  { id: 'dragon', name: 'Драконячий' },
  { id: 'dark', name: 'Темний' },
  { id: 'steel', name: 'Сталевий' },
  { id: 'fairy', name: 'Фейний' },
];

const ALL_GENERATIONS = [
  { id: 1, name: 'Покоління І' },
  { id: 2, name: 'Покоління ІІ' },
  { id: 3, name: 'Покоління ІІІ' },
  { id: 4, name: 'Покоління IV' },
  { id: 5, name: 'Покоління V' },
  { id: 6, name: 'Покоління VI' },
  { id: 7, name: 'Покоління VII' },
  { id: 8, name: 'Покоління VIII' },
  { id: 9, name: 'Покоління ІХ' },
];

/**
 * Головна функція фільтрації та пошуку
 */
async function applyFiltersAndSearch() {
  const apiFilters = [];

  if (searchState.generation) {
    apiFilters.push({ type: 'gen', value: searchState.generation });
  }

  if (searchState.types.length > 0) {
    apiFilters.push({ type: 'searchByTypes', types: searchState.types });
  }

  apiFilters.push({
    type: 'sort',
    field: 'id',
    order: searchState.sortOrder,
  });

  try {
    let pokemonsData = [];
    const trimmedQuery = searchState.query.trim().toLowerCase();

    if (trimmedQuery) {
      pokemonsData = await get(apiFilters, [trimmedQuery], false);
    } else {
      pokemonsData = await get(apiFilters, [], false);
    }

    if (resultsCountText) {
      resultsCountText.textContent = `Показано ${pokemonsData.length} із 1 025 покемонів`;
    }

    document.dispatchEvent(
      new CustomEvent('pokemon:update-list', {
        detail: { pokemons: pokemonsData },
      })
    );
  } catch (error) {
    console.error('Помилка під час фільтрації:', error);
    if (resultsCountText) {
      resultsCountText.textContent = 'Показано 0 із 1 025 покемонів';
    }
  }
}

// --- Функція створення і показу випадаючого списку (Dropdown) ---
function toggleDropdown(buttonElement, items, onSelect) {
  // Перевіряємо, чи список вже відкритий, якщо так – закриваємо
  let existingDropdown = buttonElement.parentNode.querySelector('.custom-dropdown-list');
  if (existingDropdown) {
    existingDropdown.remove();
    return;
  }

  // Закриваємо інші відкриті списки на сторінці
  document.querySelectorAll('.custom-dropdown-list').forEach(el => el.remove());

  // Створюємо контейнер списку
  const dropdownList = document.createElement('ul');
  dropdownList.className = 'custom-dropdown-list';
  dropdownList.style.cssText = `
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 100;
    background-color: var(--main-color, #fff);
    border: 1px solid var(--subtitle-color, #9ca3af);
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    list-style: none;
    padding: 8px 0;
    margin: 0;
    width: 200px;
    max-height: 240px;
    overflow-y: auto;
  `;

  // Додаємо опцію "Скинути / Усі"
  const resetItem = document.createElement('li');
  resetItem.textContent = 'Усі';
  resetItem.style.cssText = `padding: 8px 16px; cursor: pointer; font-size: 14px; font-weight: 600;`;
  resetItem.addEventListener('click', () => {
    onSelect(null);
    dropdownList.remove();
  });
  dropdownList.appendChild(resetItem);

  // Додаємо елементи списку
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    li.style.cssText = `padding: 8px 16px; cursor: pointer; font-size: 14px;`;
    li.addEventListener('mouseenter', () => li.style.backgroundColor = 'rgba(0,0,0,0.05)');
    li.addEventListener('mouseleave', () => li.style.backgroundColor = 'transparent');
    
    li.addEventListener('click', () => {
      onSelect(item.id);
      dropdownList.remove();
    });
    dropdownList.appendChild(li);
  });

  // Робимо батьківський елемент кнопці позиційованим, щоб список прив'язався до неї
  buttonElement.style.position = 'relative';
  buttonElement.parentNode.style.position = 'relative';
  buttonElement.parentNode.appendChild(dropdownList);

  // Закриття при кліку за межами списку
  function closeOnOutsideClick(e) {
    if (!buttonElement.contains(e.target) && !dropdownList.contains(e.target)) {
      dropdownList.remove();
      document.removeEventListener('click', closeOnOutsideClick);
    }
  }
  setTimeout(() => document.addEventListener('click', closeOnOutsideClick), 0);
}

// --- Події для кнопок ---

// 1. Пошук інпутом
let searchTimeout = null;
searchInput?.addEventListener('input', evt => {
  searchState.query = evt.target.value;
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => applyFiltersAndSearch(), 400);
});

// 2. Сортування за номером
sortBtn?.addEventListener('click', () => {
  searchState.sortOrder = searchState.sortOrder === 'asc' ? 'desc' : 'asc';
  const span = sortBtn.querySelector('span');
  if (span) {
    span.textContent = searchState.sortOrder === 'asc' ? 'За номером ↑' : 'За номером ↓';
  }
  applyFiltersAndSearch();
});

// 3. Випадаючий список типів
typeBtn?.addEventListener('click', () => {
  toggleDropdown(typeBtn, ALL_TYPES, (selectedTypeId) => {
    searchState.types = selectedTypeId ? [selectedTypeId] : [];
    const span = typeBtn.querySelector('span');
    if (span) {
      const found = ALL_TYPES.find(t => t.id === selectedTypeId);
      span.textContent = found ? found.name : 'Усі типи';
    }
    applyFiltersAndSearch();
  });
});

// 4. Випадаючий список поколінь
generationBtn?.addEventListener('click', () => {
  toggleDropdown(generationBtn, ALL_GENERATIONS, (selectedGenId) => {
    searchState.generation = selectedGenId;
    const span = generationBtn.querySelector('span');
    if (span) {
      const found = ALL_GENERATIONS.find(g => g.id === selectedGenId);
      span.textContent = found ? found.name : 'Усі покоління';
    }
    applyFiltersAndSearch();
  });
});

