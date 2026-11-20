import { get } from './api.js';
import spriteUrl from '../img/symbol-defs.svg';

const favoritesList = document.querySelector('.favorites__list');
const searchInput = document.querySelector('.favorites__input');
const sortBtn = document.querySelector(
  '.favorites__btn[data-action="sort-number"]'
);
const counterSpan = document.querySelector('.favorites__span');
const emptyMessage = document.querySelector('.favorites__empty');

const favoritesState = {
  allFavorites: [],
  searchQuery: '',
  searchMode: 'name',
};

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

const CARD_TEMPLATE = `
<li class="favorites__item">
  <article class="favorites__article">
    <div class="favorites__header">
      <span class="favorites__id">#<var>id</var></span>
      <button type="button" class="favorites__button" data-id="<var>rawId</var>" aria-label="Видалити з улюблених">
        <svg class="favorites__heart">
          <use href="${spriteUrl}#heart"></use>
        </svg>
      </button>
    </div>
    <div class="favorites__img-box"> <!-- Changed from favorites__box -->
      <img src="<var>sprites</var>" alt="<var>name</var>" class="favorites__image" loading="lazy">
    </div>
    <div class="favorites__content">
      <h2 class="favorites__name"><var>name</var></h2>
      <div class="favorites__types">
        <var>typesHtml</var>
      </div>
    </div>
  </article>
</li>
`;

function renderFavoritesCards(pokemons) {
  if (!Array.isArray(pokemons) || pokemons.length === 0) {
    return '';
  }

  return pokemons
    .map(pokemon => {
      const rawId = pokemon.id;
      const idStr = String(pokemon.id).padStart(3, '0');
      const name = pokemon.name
        ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        : '';
      const sprites = pokemon.sprites || '';

      const typesHtml = Array.isArray(pokemon.type)
        ? pokemon.type
            .map(t => {
              const typeNameEn = t?.type?.name || '';
              const typeNameUa = TYPE_NAMES_UA[typeNameEn] || typeNameEn;
              return `<span class="favorites__type favorites__type--${typeNameEn}">${typeNameUa}</span>`;
            })
            .join('')
        : '';

      const templateData = {
        rawId: rawId,
        id: idStr,
        name: name,
        sprites: sprites,
        typesHtml: typesHtml,
      };

      return CARD_TEMPLATE.replace(/<var>(.*?)<\/var>/g, (_, key) => {
        const trimmedKey = key.trim();
        return templateData[trimmedKey] !== undefined
          ? templateData[trimmedKey]
          : '';
      });
    })
    .join('');
}

function updateCounter(count) {
  if (counterSpan) {
    counterSpan.textContent = count;
  }
}

function updateFavoritesDisplay() {
  const query = searchInput
    ? searchInput.value.trim().toLowerCase()
    : favoritesState.searchQuery;
  let filtered = favoritesState.allFavorites.filter(pokemon => {
    if (!query) return true;

    if (favoritesState.searchMode === 'id') {
      return String(pokemon.id).includes(query);
    } else {
      return pokemon.name.toLowerCase().includes(query);
    }
  });

  if (favoritesList) {
    favoritesList.innerHTML = renderFavoritesCards(filtered);
  }

  if (emptyMessage) {
    emptyMessage.hidden = filtered.length > 0;
  }

  updateCounter(favoritesState.allFavorites.length);
}

export async function initFavoritesPage() {
  try {
    const rawData = localStorage.getItem('likedPokemons');
    console.log('Raw localStorage likedPokemons:', rawData);

    const savedIds = rawData ? JSON.parse(rawData) : [];
    console.log('Parsed saved IDs:', savedIds);

    if (!Array.isArray(savedIds) || savedIds.length === 0) {
      favoritesState.allFavorites = [];
      updateFavoritesDisplay();
      return;
    }

    const pokemonsData = await get([], savedIds, false);
    console.log('Fetched pokemons data from API:', pokemonsData);
    favoritesState.allFavorites = Array.isArray(pokemonsData)
      ? pokemonsData
      : [];
    updateFavoritesDisplay();
  } catch (error) {
    console.error('Помилка завантаження улюблених покемонів:', error);
  }
}

// --- Події ---

let searchTimeout;
searchInput?.addEventListener('input', e => {
  clearTimeout(searchTimeout);
  favoritesState.searchQuery = e.target.value;
  searchTimeout = setTimeout(() => {
    updateFavoritesDisplay();
  }, 300);
});

sortBtn?.addEventListener('click', () => {
  favoritesState.searchMode =
    favoritesState.searchMode === 'name' ? 'id' : 'name';

  const tabletSpan = sortBtn.querySelector('.favorites__tablet');
  const mobileSpan = sortBtn.querySelector('.favorites__mobile');

  if (favoritesState.searchMode === 'id') {
    if (tabletSpan) tabletSpan.textContent = 'Пошук за номером ←';
    if (mobileSpan) mobileSpan.textContent = 'За № ←';
    sortBtn.classList.add('is-active');
    if (searchInput) searchInput.placeholder = 'Введіть номер покемона...';
  } else {
    if (tabletSpan) tabletSpan.textContent = 'Пошук за назвою ←';
    if (mobileSpan) mobileSpan.textContent = 'За назвою ←';
    sortBtn.classList.remove('is-active');
    if (searchInput) searchInput.placeholder = 'Пошук за назвою або номером...';
  }

  updateFavoritesDisplay();
});

favoritesList?.addEventListener('click', e => {
  const likeBtn = e.target.closest('.favorites__button');
  if (!likeBtn) return;

  const pokemonId = Number(likeBtn.dataset.id);
  let savedIds = JSON.parse(localStorage.getItem('likedPokemons')) || [];

  savedIds = savedIds.filter(id => Number(id) !== pokemonId);
  localStorage.setItem('likedPokemons', JSON.stringify(savedIds));

  favoritesState.allFavorites = favoritesState.allFavorites.filter(
    p => p.id !== pokemonId
  );

  updateFavoritesDisplay();
  document.dispatchEvent(new Event('favorites:changed'));
});

document.addEventListener('favorites:changed', async event => {
  const { id, liked } = event.detail || {};
  const pokemonId = Number(id);

  if (!Number.isFinite(pokemonId)) return;

  if (favoritesList) {
    if (liked) {
      const alreadyExists = favoritesState.allFavorites.some(
        pokemon => Number(pokemon.id) === pokemonId
      );
      if (!alreadyExists) {
        try {
          const [pokemon] = await get([], [pokemonId], false);

          if (pokemon) {
            favoritesState.allFavorites.push(pokemon);
          }
        } catch (error) {
          console.error('Error adding favorite:', error);
        }
      }
    } else {
      favoritesState.allFavorites = favoritesState.allFavorites.filter(
        pokemon => Number(pokemon.id) !== pokemonId
      );
    }
    updateFavoritesDisplay();
  }
  initHeaderCounter();
});

if (favoritesList) {
  initFavoritesPage();
}
