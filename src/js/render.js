import { get } from './api.js';

const CONFIG = {
  pageSize: 10,
  maxPokemonId: 1025
};

const STATE = {
  currentId: 1,
  searchQuery: '',
  filters: [],
  loadedPokemons: []
};

const CARD_TEMPLATE = `
<section>
    <div>
        <div>
            <span>#<var>id</var></span>
            <button type="button">❤️</button>
        </div>

        <div>
            <img src="<var>sprites</var>" alt="<var>name</var>">
        </div>

        <div>
            <h2><var>name</var></h2>

            <div>
                <span><var>type1</var></span>
                <span><var>type2</var></span>
            </div>
        </div>
    </div>
</section>
`;

function createRangeList(min, max) {
  const list = [];
  for (let i = min; i <= max; i++) {
    list.push(i);
  }
  return list;
}

function renderCards(dataArray) {
  if (!Array.isArray(dataArray)) return '';

  return dataArray
    .map(pokemon => {
      const templateData = {
        id: String(pokemon.id || '').padStart(3, '0'),
        name: pokemon.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : '',
        sprites: pokemon.sprites || '',
        type1: pokemon.type && pokemon.type[0] ? pokemon.type[0] : '',
        type2: pokemon.type && pokemon.type[1] ? pokemon.type[1] : ''
      };

      return CARD_TEMPLATE.replace(/<var>(.*?)<\/var>/g, (_, key) => {
        const trimmedKey = key.trim();
        return templateData[trimmedKey] !== undefined ? templateData[trimmedKey] : '';
      });
    })
    .join('');
}

export function initPokemonApp([ containerId, nextBtnId ], searchInputSelector, counterSelector) {
  const container = document.querySelector(containerId);
  const nextBtn = document.querySelector(nextBtnId);
  const searchInput = document.querySelector(searchInputSelector);
  const counterElement = document.querySelector(counterSelector);

  function updateCounter(shownCount) {
    if (counterElement) {
      counterElement.textContent = `Показано ${shownCount} із ${CONFIG.maxPokemonId} покемонів`;
    }
  }

  // Главная функция отрисовки UI
  async function updateDisplay() {
    const query = STATE.searchQuery.trim().toLowerCase();

    let displayData = STATE.loadedPokemons;

    // Если есть поисковый запрос
    if (query !== '') {
      // 1. Сначала ищем локально среди уже загруженных
      displayData = STATE.loadedPokemons.filter(p =>
        p.name.toLowerCase().includes(query) || String(p.id).includes(query)
      );

      // 2. Если локально ничего не нашли, пробуем запросить через API точечно
      if (displayData.length === 0) {
        try {
          const apiResult = await get(STATE.filters, [query]);
          if (Array.isArray(apiResult) && apiResult.length > 0) {
            displayData = apiResult;
          }
        } catch (e) {
          console.log("Поиск через API не дал результатов");
        }
      }
    }

    if (container) {
      container.innerHTML = renderCards(displayData);
    }

    updateCounter(displayData.length);

    if (nextBtn) {
      nextBtn.style.display = (query !== '' || STATE.currentId > CONFIG.maxPokemonId) ? 'none' : 'block';
    }
  }

  // Загрузка порций покемонов (пагинация)
  async function loadMoreData(isReset = false) {
    if (isReset) {
      STATE.currentId = 1;
      STATE.loadedPokemons = [];
    }

    if (nextBtn) nextBtn.disabled = true;

    try {
      const min = STATE.currentId;
      const max = Math.min(STATE.currentId + CONFIG.pageSize - 1, CONFIG.maxPokemonId);

      if (min > CONFIG.maxPokemonId) {
        if (nextBtn) nextBtn.style.display = 'none';
        return;
      }

      const ids = createRangeList(min, max);
      const pokemonData = await get(STATE.filters, ids);

      STATE.currentId = max + 1;

      if (isReset) {
        STATE.loadedPokemons = pokemonData;
      } else {
        const existingIds = new Set(STATE.loadedPokemons.map(p => p.id));
        const uniqueNew = pokemonData.filter(p => !existingIds.has(p.id));
        STATE.loadedPokemons.push(...uniqueNew);
      }

      await updateDisplay();

    } catch (error) {
      console.error('Помилка завантаження:', error);
    } finally {
      if (nextBtn) nextBtn.disabled = false;
    }
  }

  // Обработка ввода в поиск с небольшой задержкой (debounce)
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      STATE.searchQuery = e.target.value;

      searchTimeout = setTimeout(() => {
        updateDisplay();
      }, 300);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      loadMoreData(false);
    });
  }

  // Первый запуск
  loadMoreData(true);
}

// Запуск
initPokemonApp([".search-cards", ".search-controls-button"], ".search-input", ".search-results-count");