import { get } from './api.js';

let currentId = 1;
const pageSize = 10;

// Шаблон с маркерами id$$ и hp$$
const template = `
  <div class="card">
    <p>ID: id$$</p>
    <p>HP: hp$$</p>
  </div>
`;

export function initPokemonApp({ containerId, loadMoreBtnId }) {
  const container = document.getElementById(containerId);
  const loadMoreBtn = document.getElementById(loadMoreBtnId);

  async function loadPage(id) {
    const ids = [];
    for (let i = id; i < id + pageSize; i++) {
      ids.push(i);
    }

    try {
      const pokemons = await get(null, ids);

      // Автоматически заменяем все ключи вида "чтото$$" на данные покемона
      const html = pokemons.map(p => {
        return template.replace(/([a-zA-Z0-9_]+)\$\$/g, (match, key) => {
          return p[key] !== undefined ? p[key] : '';
        });
      }).join('');

      container.innerHTML += html;
      currentId = id;
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      loadPage(currentId + pageSize);
    });
  }

  loadPage(currentId);
}