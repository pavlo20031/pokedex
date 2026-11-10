import { get } from './api.js';

let template = '<div class="card"><p><var>id</var></p><p><var>hp</var></p></div>';

// Вспомогательные функции остаются
function cratelist(min, max) {
  let arr = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
}

function render(arr) {
  if (!Array.isArray(arr)) return [];

  return arr.map(pokemon => {
    let htmlCard = template;
    // Заменяем все теги <var>имя_поля</var> на значения из объекта
    htmlCard = htmlCard.replace(/<var>(.*?)<\/var>/g, (_, key) => {
      return pokemon[key] !== undefined ? pokemon[key] : "";
    });
    return htmlCard;
  });
}

// ================= СОСТОЯНИЕ И ФУНКЦИЯ ДЛЯ КНОПКИ =================

let currentId = 1;       // С какого ID начинать
const pageSize = 10;     // Сколько загружать за один раз

// Эту функцию передаешь в обработчик события кнопки
export async function loadNextPage() {
  let min = currentId;
  let max = currentId + pageSize - 1;

  // 1. Получаем список ID (например, 1..10, потом 11..20 и т.д.)
  let ids = cratelist(min, max);

  // 2. Запрашиваем данные
  let pokemonData = await get(null, ids);

  // 3. Превращаем данные в HTML-карточки
  let cards = render(pokemonData);

  // 4. Увеличиваем счетчик для следующего клика
  currentId += pageSize;

  // Возвращаем готовую разметку (или вывод в консоль)
  console.log(`Загружены элементы с ${min} по ${max}:`, cards);
  return cards;
}