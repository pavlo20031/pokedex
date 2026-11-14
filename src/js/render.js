import { get } from './api.js';

// Configuration & State
const CONFIG = {
  pageSize: 10,
  startId: 1
};

const STATE = {
  currentId: CONFIG.startId
};

// HTML Template (с уникальными ключами для типов и картинки)
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
      // Преобразуем данные покемона под нужные ключи шаблона
      const templateData = {
        id: String(pokemon.id || '').padStart(3, '0'),
        name: pokemon.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : '',
        sprites: pokemon.sprites || '',
        type1: pokemon.types && pokemon.types[0] ? pokemon.types[0] : '',
        type2: pokemon.types && pokemon.types[1] ? pokemon.types[1] : ''
      };

      return CARD_TEMPLATE.replace(/<var>(.*?)<\/var>/g, (_, key) => {
        const trimmedKey = key.trim();
        return templateData[trimmedKey] !== undefined ? templateData[trimmedKey] : '';
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
export function initPokemonApp([ containerId, nextBtnId ]) {
  const container = document.querySelector(containerId);
  const nextBtn = document.querySelector(nextBtnId);

  async function loadMoreData(newStartId) {
    if (newStartId < 1) return;

    // Блокируем кнопку на время загрузки
    if (nextBtn) nextBtn.disabled = true;

    try {
      const { html } = await fetchPokemonPage(newStartId, CONFIG.pageSize);

      if (container) {
        // Добавляем новые карточки к уже существующим в контейнере
        container.innerHTML += html;
      }

      // Обновляем текущий ID только после успешной загрузки
      STATE.currentId = newStartId;

    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      if (nextBtn) nextBtn.disabled = false;
    }
  }

  // Навешиваем слушатель на кнопку «Загрузить еще»
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      loadMoreData(STATE.currentId + CONFIG.pageSize);
    });
  }

  // Первоначальная загрузка первой порции при старте
  loadMoreData(STATE.currentId);
}

// Инициализация
initPokemonApp([".search-cards", ".search-controls-button"]);