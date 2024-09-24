export async function getPokemonTypes() {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const data = await res.json();

  const formattedData = data.results.map(
    ({ name, url }: { name: string; url: string }) => ({
      name,
      // sprite value splitted by url string: explain at README.md
      id: url.split("/")[6],
    })
  );
  return formattedData;
}
