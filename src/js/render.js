import { get } from './api.js';

let template = '<div class="card"><p><var>id</var></p><p><var>hp</var></p></div>';

function cratelist(min, max) {
  let arr = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
}

function findAllIndices(str, target) {
  let indices = [];
  let idx = str.indexOf(target);

  while (idx !== -1) {
    indices.push(idx);
    idx = str.indexOf(target, idx + 1);
  }

  return indices;
}

function render(arr) {
  let rez = [];
  if (Array.isArray(arr)) {
    let start = findAllIndices(template, "<var>");
    let end = findAllIndices(template, "</var>");

    for (let pokemon of arr) {
      let htmlCard = template;

      for (let j = start.length - 1; j >= 0; j--) {
        let tagContent = template.slice(start[j], end[j]);
        let variableName = tagContent.slice(5);
        let fullTag = tagContent + "</var>";

        let value = pokemon[variableName] !== undefined ? pokemon[variableName] : "";
        htmlCard = htmlCard.replace(fullTag, value);
      }

      rez.push(htmlCard);
    }
  }
  return rez;
}

// ================= НАСТРОЙКИ ПАГИНАЦИИ (легко менять) =================
let itemsPerPage = 5; // Сколько карточек выводить на страницу
let currentPage = 1;  // Текущая страница

// ================= ФУНКЦИЯ ПАГИНАЦИИ =================
function paginate(array, page, perPage) {
  let start = (page - 1) * perPage;
  let end = start + perPage;

  return {
    items: array.slice(start, end),
    totalPages: Math.ceil(array.length / perPage),
    page: page
  };
}

// ================= ПОЛУЧЕНИЕ И РЕНДЕР =================
let pokemonData = await get(null, cratelist(1, 20));
let cards = render(pokemonData);

// Вызов пагинации
let result = paginate(cards, currentPage, itemsPerPage);

console.log(`Страница ${result.page} из ${result.totalPages}:`);
console.log(result.items);

// ================= ПРИМЕР ДЛЯ КНОПОК =================
// Если нужно привязать к кнопкам "Назад" / "Вперед":
function nextPage() {
  if (currentPage < result.totalPages) {
    currentPage++;
    let newPageData = paginate(cards, currentPage, itemsPerPage);
    console.log("Новая страница:", newPageData.items);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    let newPageData = paginate(cards, currentPage, itemsPerPage);
    console.log("Новая страница:", newPageData.items);
  }
}