async function get(filters = [], pokemons = [], evoinfo = true) {
  let infoApi = "https://pokeapi.co/api/v2/";
  let pokemonsToFetch = [...pokemons];

  if (pokemonsToFetch.length === 0 && filters.length > 0) {
    let allRes = await fetch(`${infoApi}pokemon?limit=10000`);
    if (!allRes.ok) throw new Error("Не удалось загрузить общий список покемонов");
    let allData = await allRes.json();
    pokemonsToFetch = allData.results.map(p => p.name);
  }

  // Обработка фильтров (сортировка, поколения, типы) остается твоя...
  // [Здесь твой блок с фильтрами без изменений для краткости]

  let data = [];

  for (let pokemonIdentifier of pokemonsToFetch) {
    console.log("Загружаем покемона:", pokemonIdentifier);

    let pokemonRes = await fetch(`${infoApi}pokemon/${pokemonIdentifier}`);

    // ЗАЩИТА ОТ 404: если покемон не найден, пропускаем его вместо падения всей цепочки
    if (!pokemonRes.ok) {
      console.warn(`Покемон не найден или ошибка API: ${pokemonIdentifier}`);
      continue;
    }

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
    while (currentChain) {
      if (currentChain.species && currentChain.species.name) {
        str.push(currentChain.species.name);
      }
      currentChain = currentChain.evolves_to && currentChain.evolves_to.length > 0
        ? currentChain.evolves_to[0]
        : null;
    }

    let evodata = [];
    if (evoinfo === true) {
      for (let i of str) {
        evodata.push(await get(null, [i], false));
      }
    } else {
      evodata = "you didnt arg for it";
    }

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

  return data;
}