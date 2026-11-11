import { get } from './api.js';

// Configuration & State
const CONFIG = {
  pageSize: 10,
  startId: 1
};

const STATE = {
  currentId: CONFIG.startId
};

// HTML Template
const CARD_TEMPLATE = `
  <div class="card">
    <p><var>id</var></p>
    <p><var>hp</var></p>
  </div>
`;

// Helper Functions
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
      return CARD_TEMPLATE.replace(/<var>(.*?)<\/var>/g, (_, key) => {
        return pokemon[key] !== undefined ? pokemon[key] : '';
      });
    })
    .join('');
}

// Data Fetching Logic
async function fetchPokemonPage(startId, size) {
  const min = startId;
  const max = startId + size - 1;
  const ids = createRangeList(min, max);

  const pokemonData = await get(null, ids);
  return {
    html: renderCards(pokemonData),
    min,
    max
  };
}

// UI Controller & Event Handlers
export function initPokemonApp({ containerId, prevBtnId, nextBtnId }) {
  const container = document.getElementById(containerId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  async function updatePage(newStartId) {
    if (newStartId < 1) return;

    STATE.currentId = newStartId;

    // Блокируем кнопки на время загрузки
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;

    try {
      const { html } = await fetchPokemonPage(STATE.currentId, CONFIG.pageSize);
      if (container) container.innerHTML = html;
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      // Обновляем состояние кнопки "Назад" (нельзя уйти ниже 1)
      if (prevBtn) prevBtn.disabled = STATE.currentId <= 1;
      if (nextBtn) nextBtn.disabled = false;
    }
  }

  // Навешиваем слушатели событий
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updatePage(STATE.currentId + CONFIG.pageSize);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updatePage(Math.max(1, STATE.currentId - CONFIG.pageSize));
    });
  }

  // Первоначальная загрузка первой страницы
  updatePage(STATE.currentId);
}
//<div id="pokemon-container" class="cards-grid"></div>
//
// <div class="pagination-controls">
//   <button id="prev-btn" disabled>Назад</button>
//   <button id="next-btn">Загрузить еще</button>
// </div>
//
// <script type="module">
//   import { initPokemonApp } from './app.js';
//
//   // Инициализация приложения
//   initPokemonApp({
//     containerId: 'pokemon-container',
//     prevBtnId: 'prev-btn',
//     nextBtnId: 'next-btn'
//   });
// </script>