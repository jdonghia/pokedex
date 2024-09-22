export async function getPokemons(pagination = 20) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pagination}`
  );
  return await res.json();
}

export async function getPokemon(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return await res.json();
}
