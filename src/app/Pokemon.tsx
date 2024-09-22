import { use } from "react";
import { getPokemon } from "./services/pokemons";
import Image from "next/image";

interface PokemonProps {
  name: string;
}

export function Pokemon({ name }: PokemonProps) {
  const pokemon = use(getPokemon(name));
  return (
    <div className="bg-zinc-300 rounded p-2 flex flex-col justify-center items-center">
      <Image src={pokemon.sprites.front_default} alt={name} width={100} height={100} />
      <p>{pokemon.name}</p>
    </div>
  );
}
