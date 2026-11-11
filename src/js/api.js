export async function get(filters = [], pokemons = [], evoinfo = true) {
  let infoApi = "https://pokeapi.co/api/v2/";

  // Безопасно приводим аргументы к правильным типам, если прилетел null или undefined
  let safeFilters = Array.isArray(filters) ? filters : [];
  let pokemonsToFetch = Array.isArray(pokemons) ? [...pokemons] : [pokemons];

  // 1. Если список покемонов пустой, но есть фильтры — собираем имена по фильтрам
  if (pokemonsToFetch.length === 0 && safeFilters.length > 0) {
    let filteredNames = null;

    for (let rule of safeFilters) {
      if (!rule || !rule.type) continue;

      let currentFilteredNames = [];

      if (rule.type === "gen" && rule.value) {
        let objgen = await (await fetch(`${infoApi}generation/${rule.value}`)).json();
        let genNames = objgen.pokemon_species.map(p => p.name);
        currentFilteredNames = genNames;

      } else if (rule.type === "searchByTypes" && Array.isArray(rule.types) && rule.types.length > 0) {
        let typeRequests = rule.types.map(t => fetch(`${infoApi}type/${t}`).then(r => r.json()));
        let typeResponses = await Promise.all(typeRequests);

        let typePokemonLists = typeResponses
          .filter(res => res && res.pokemon)
          .map(res => res.pokemon.map(p => p.pokemon.name));

        if (typePokemonLists.length > 0) {
          let combinedTypes = typePokemonLists.reduce((acc, curr) =>
            acc.filter(name => curr.includes(name)), typePokemonLists[0]
          );
          currentFilteredNames = combinedTypes;
        }
      }

      // Пересекаем результаты текущего правила с общим списком
      if (currentFilteredNames.length > 0) {
        filteredNames = filteredNames
          ? filteredNames.filter(name => currentFilteredNames.includes(name))
          : currentFilteredNames;
      }
    }

    if (filteredNames) {
      pokemonsToFetch = filteredNames;
    }
  }
  // ТВОЙ КЕЙС: Если переданы И покемоны, И фильтры — фильтруем переданных покемонов на лету!
  else if (pokemonsToFetch.length > 0 && safeFilters.length > 0) {
    for (let rule of safeFilters) {
      if (!rule || !rule.type) continue;

      if (rule.type === "gen" && rule.value) {
        let objgen = await (await fetch(`${infoApi}generation/${rule.value}`)).json();
        let genNames = objgen.pokemon_species.map(p => p.name);
        pokemonsToFetch = pokemonsToFetch.filter(name => genNames.includes(String(name).toLowerCase()));

      } else if (rule.type === "searchByTypes" && Array.isArray(rule.types)) {
        let typeRequests = rule.types.map(t => fetch(`${infoApi}type/${t}`).then(r => r.json()));
        let typeResponses = await Promise.all(typeRequests);

        let typePokemonLists = typeResponses
          .filter(res => res && res.pokemon)
          .map(res => res.pokemon.map(p => p.pokemon.name));

        if (typePokemonLists.length > 0) {
          let combinedTypes = typePokemonLists.reduce((acc, curr) =>
            acc.filter(name => curr.includes(name)), typePokemonLists[0]
          );
          pokemonsToFetch = pokemonsToFetch.filter(name => combinedTypes.includes(String(name).toLowerCase()));
        }
      }
    }
  }

  let data = [];

  // 2. Цикл загрузки данных покемонов
  for (let pokemonIdentifier of pokemonsToFetch) {

    let pokemonRes = await fetch(`${infoApi}pokemon/${pokemonIdentifier}`);
    if (!pokemonRes.ok) continue;
    let pokemon = await pokemonRes.json();

    let stats = pokemon.stats.map(stat => stat.base_stat);

    let speciesRes = await fetch(`${infoApi}pokemon-species/${pokemon.id}`);

    if (!speciesRes.ok) continue;
    let get_more_data = await speciesRes.json();

    let chainRes = await fetch(get_more_data.evolution_chain.url);
    if (!chainRes.ok) continue;
    let evolutionData = await chainRes.json();

    let currentChain = evolutionData.chain;
    let str = [];
    let evodata = []
    while (currentChain) {
      if (currentChain.species && currentChain.species.name) {
        str.push(currentChain.species.name);
        let id =  currentChain.species.url.split("/")[currentChain.species.url.split("/").length - 2]
        evodata.push({id: id, img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`});

      }
      currentChain = currentChain.evolves_to && currentChain.evolves_to.length > 0
        ? currentChain.evolves_to[0]
        : null;

    }
    console.log(evodata);
    let normalData = {
      id: pokemon.id,
      name: pokemon.name,
      type: pokemon.types,
      height: pokemon.height / 10 + "m",
      weight: pokemon.weight / 10 + "kg",
      abilities: pokemon.abilities,
      hp: stats[0],
      a: stats[1],
      d: stats[2],
      spA: stats[3],
      spD: stats[4],
      spe: stats[5],
      sprites: pokemon.sprites,
      chain: str,
      evodata: evodata,
    };
    data.push(normalData);
  }

  // 3. Адекватная сортировка в самом конце (если передано правило sort)
  let sortRule = safeFilters.find(rule => rule && rule.type === "sort");
  if (sortRule && sortRule.field && sortRule.order) {
    data.sort((a, b) => {
      let valA = a[sortRule.field];
      let valB = b[sortRule.field];
      return sortRule.order === "desc" ? valB - valA : valA - valB;
    });
  }

  return data;
} //url is id
// // Проверяем тесты:
// let filters = [
//   { type: 'gen', value: 1 },
//   { type: 'searchByTypes', types: ['grass', 'poison'] },
//   { type: 'sort', field: 'hp', order: 'desc' } // Сортировка тоже работает через фильтр!
// ];
//
// console.log(await get(filters));
