import { use } from "react";
import { getPokemons } from "./services/pokemons";
import { Pokemon } from "./Pokemon";

export default function Home() {
  const pokemons = use(getPokemons()).results;

  return (
    <div>
      <ul className="flex gap-10 flex-wrap p-5">
        {pokemons.map(({ name }: { name: string }) => (
          <li key={name}>
            <Pokemon name={name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
