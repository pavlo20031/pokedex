const listRef = document.querySelector('.world__list');

const renderStats = ({ pokemons, types, generations }) => {
  listRef.innerHTML = `
    <li class="world__item">
      <p class="world__text"><span class="world__num">${pokemons}</span> покемонів</p>
    </li>
    <li class="world__item">
      <p class="world__text"><span class="world__num">${types}</span> типів</p>
    </li>
    <li class="world__item">
      <p class="world__text"><span class="world__num">${generations}</span> поколінь</p>
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
