const listRef = document.querySelector('.world__list');

const renderStats = ({ pokemons, types, generations }) => {
  listRef.innerHTML = `
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${pokemons}</span> покемонів
      </p>
    </li>
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${types}</span> типів
      </p>
    </li>
    <li class="world__item">
      <p class="world__text">
        <span class="world__num">${generations}</span> поколінь
      </p>
    </li>
    ${listRef.innerHTML}
  `;
};

async function getStats() {
  try {
    const [pokemonResponse, typeResponse, generationResponse] =
      await Promise.all([
        fetch('https://pokeapi.co/api/v2/pokemon'),
        fetch('https://pokeapi.co/api/v2/type'),
        fetch('https://pokeapi.co/api/v2/generation'),
      ]);

    const pokemonData = await pokemonResponse.json();
    const typeData = await typeResponse.json();
    const generationData = await generationResponse.json();

    renderStats({
      pokemons: pokemonData.count,
      types: typeData.count,
      generations: generationData.count,
    });
  } catch (error) {
    console.error('Помилка:', error);
  }
}

getStats();