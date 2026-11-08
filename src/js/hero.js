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
    const [pokemonData, typeData, generationData] = await Promise.all([
      fetch('https://pokeapi.co/api/v2/pokemon').then(res => res.json()),
      fetch('https://pokeapi.co/api/v2/type').then(res => res.json()),
      fetch('https://pokeapi.co/api/v2/generation').then(res => res.json()),
    ]);

    renderStats({
      pokemons: pokemonData.count,
      types: typeData.count,
      generations: generationData.count,
    });
  } catch (error) {
    console.error(error);
  }
}

getStats();
