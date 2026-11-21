const INFO_API = 'https://pokeapi.co/api/v2/';
const TOTAL_POKEMONS = 1025;

const TYPE_KEYS = [
  'grass', 'poison', 'fire', 'water', 'bug', 'electric',
  'psychic', 'normal', 'ghost', 'flying', 'ice', 'ground',
  'fighting', 'rock', 'dragon', 'dark', 'steel', 'fairy'
];

const GENERATION_MAP = {
  'generation-i': 'Покоління I',
  'generation-ii': 'Покоління II',
  'generation-iii': 'Покоління III',
  'generation-iv': 'Покоління IV',
  'generation-v': 'Покоління V',
  'generation-vi': 'Покоління VI',
  'generation-vii': 'Покоління VII',
  'generation-viii': 'Покоління VIII',
  'generation-ix': 'Покоління IX',
};

const idFromUrl = url => Number(url.split('/').filter(Boolean).pop());

// Швидке завантаження каталогу (id, name, types, gen) для пошуку, фільтрів та пагінації
export async function getAllLight(total = TOTAL_POKEMONS) {
  const listReq = fetch(`${INFO_API}pokemon?limit=${total}`).then(r => r.json());
  const typeReqs = TYPE_KEYS.map(t =>
    fetch(`${INFO_API}type/${t}`).then(r => r.json())
  );
  const genReqs = Array.from({ length: 9 }, (_, i) =>
    fetch(`${INFO_API}generation/${i + 1}`).then(r => r.json())
  );

  const [list, typeData, genData] = await Promise.all([
    listReq,
    Promise.all(typeReqs),
    Promise.all(genReqs),
  ]);

  const typesById = {};
  typeData.forEach(type => {
    type.pokemon.forEach(entry => {
      const id = idFromUrl(entry.pokemon.url);
      if (id > total) return;
      (typesById[id] ||= []).push({ slot: entry.slot, name: type.name });
    });
  });

  const genById = {};
  genData.forEach((gen, i) => {
    gen.pokemon_species.forEach(s => {
      genById[idFromUrl(s.url)] = i + 1;
    });
  });

  return list.results.map(p => {
    const id = idFromUrl(p.url);
    const types = (typesById[id] || [])
      .sort((a, b) => a.slot - b.slot)
      .map(t => t.name);

    return {
      id,
      name: p.name,
      types,
      gen: genById[id] || 0,
      sprites: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });
}

// Детальне отримання покемонів (для модалки та точкових запитів)
export async function get(filters = [], pokemons = [], evoinfo = true) {
  let safeFilters = Array.isArray(filters) ? filters : [];
  let pokemonsToFetch = Array.isArray(pokemons) ? [...pokemons] : [pokemons];

  if (pokemonsToFetch.length === 0 && safeFilters.length > 0) {
    let filteredNames = null;

    for (let rule of safeFilters) {
      if (!rule || !rule.type) continue;

      let currentFilteredNames = [];

      if (rule.type === 'gen' && rule.value) {
        let objgen = await (
          await fetch(`${INFO_API}generation/${rule.value}`)
        ).json();
        currentFilteredNames = objgen.pokemon_species.map(p => p.name);
      } else if (
        rule.type === 'searchByTypes' &&
        Array.isArray(rule.types) &&
        rule.types.length > 0
      ) {
        let typeRequests = rule.types.map(t =>
          fetch(`${INFO_API}type/${t}`).then(r => r.json())
        );
        let typeResponses = await Promise.all(typeRequests);

        let typePokemonLists = typeResponses
          .filter(res => res && res.pokemon)
          .map(res => res.pokemon.map(p => p.pokemon.name));

        if (typePokemonLists.length > 0) {
          currentFilteredNames = typePokemonLists.reduce(
            (acc, curr) => acc.filter(name => curr.includes(name)),
            typePokemonLists[0]
          );
        }
      }

      if (currentFilteredNames.length > 0) {
        filteredNames = filteredNames
          ? filteredNames.filter(name => currentFilteredNames.includes(name))
          : currentFilteredNames;
      }
    }

    if (filteredNames) {
      pokemonsToFetch = filteredNames;
    }
  } else if (pokemonsToFetch.length > 0 && safeFilters.length > 0) {
    for (let rule of safeFilters) {
      if (!rule || !rule.type) continue;

      if (rule.type === 'gen' && rule.value) {
        let objgen = await (
          await fetch(`${INFO_API}generation/${rule.value}`)
        ).json();
        let genNames = objgen.pokemon_species.map(p => p.name);
        pokemonsToFetch = pokemonsToFetch.filter(name =>
          genNames.includes(String(name).toLowerCase())
        );
      } else if (rule.type === 'searchByTypes' && Array.isArray(rule.types)) {
        let typeRequests = rule.types.map(t =>
          fetch(`${INFO_API}type/${t}`).then(r => r.json())
        );
        let typeResponses = await Promise.all(typeRequests);

        let typePokemonLists = typeResponses
          .filter(res => res && res.pokemon)
          .map(res => res.pokemon.map(p => p.pokemon.name));

        if (typePokemonLists.length > 0) {
          let combinedTypes = typePokemonLists.reduce(
            (acc, curr) => acc.filter(name => curr.includes(name)),
            typePokemonLists[0]
          );
          pokemonsToFetch = pokemonsToFetch.filter(name =>
            combinedTypes.includes(String(name).toLowerCase())
          );
        }
      }
    }
  }

  let data = [];

  for (let pokemonIdentifier of pokemonsToFetch) {
    let pokemonRes = await fetch(`${INFO_API}pokemon/${pokemonIdentifier}`);
    if (!pokemonRes.ok) continue;
    let pokemon = await pokemonRes.json();

    let stats = pokemon.stats.map(stat => stat.base_stat);

    let speciesRes = await fetch(`${INFO_API}pokemon-species/${pokemon.id}`);
    if (!speciesRes.ok) continue;
    let get_more_data = await speciesRes.json();

    let str = [];
    let evodata = [];

    if (evoinfo && get_more_data.evolution_chain?.url) {
      let chainRes = await fetch(get_more_data.evolution_chain.url);
      if (chainRes.ok) {
        let evolutionData = await chainRes.json();
        let currentChain = evolutionData.chain;

        while (currentChain) {
          if (currentChain.species && currentChain.species.name) {
            str.push(currentChain.species.name);
            let parts = currentChain.species.url.split('/').filter(Boolean);
            let id = parts[parts.length - 1];
            evodata.push({
              id: id,
              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            });
          }
          currentChain =
            currentChain.evolves_to && currentChain.evolves_to.length > 0
              ? currentChain.evolves_to[0]
              : null;
        }
      }
    }

    const englishDescription =
      get_more_data.flavor_text_entries
        .find(item => item.language.name === 'en')
        ?.flavor_text.replace(/\f/g, ' ') || '';

    let normalData = {
      id: pokemon.id,
      name: pokemon.name,
      type: pokemon.types,
      types: pokemon.types.map(t => t.type.name),
      height: pokemon.height / 10 + 'm',
      weight: pokemon.weight / 10 + 'kg',
      abilities: pokemon.abilities,
      hp: stats[0],
      a: stats[1],
      d: stats[2],
      spA: stats[3],
      spD: stats[4],
      spe: stats[5],
      sprites: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      description: englishDescription,
      generation: GENERATION_MAP[get_more_data.generation.name],
      chain: str,
      evodata: evodata,
    };
    data.push(normalData);
  }

  let sortRule = safeFilters.find(rule => rule && rule.type === 'sort');
  if (sortRule && sortRule.field && sortRule.order) {
    data.sort((a, b) => {
      let valA = a[sortRule.field];
      let valB = b[sortRule.field];
      return sortRule.order === 'desc' ? valB - valA : valA - valB;
    });
  }

  return data;
}