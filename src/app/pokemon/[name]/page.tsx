import { useEffect } from "react";
import Image from "next/image";

interface PokemonDetailsProps {
  params: {
    name: string;
  };
}

export default async function PokemonDetails({ params }: PokemonDetailsProps) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.name}`
  );
  const pokemon = await response.json();

  return (
    <div className="h-screen absolute inset-0 grid place-items-center">
      <div className="h-4/5  w-4/5  bg-zinc-500">
        <p className="text-3xl">{pokemon.name}</p>
        <Image
          src={pokemon.sprites.front_default}
          width={500}
          priority
          height={500}
          alt={`${pokemon.name} picture`}
        />
      </div>
    </div>
  );
}
