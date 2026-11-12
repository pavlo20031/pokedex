const listRef = document.querySelector('.hero__list');

const renderStats = ({ pokemons, types, generations }) => {
  listRef.innerHTML = `
    <li class="hero__item">
      <p class="hero__analys">${pokemons} покемонів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${types} типів</p>
    </li>
    <li class="hero__item">
      <p class="hero__analys">${generations} поколінь</p>
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
    console.error(error);
  }
}

if (listRef) {
  getStats();
}
