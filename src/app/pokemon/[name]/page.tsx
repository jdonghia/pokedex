import { useEffect } from "react";
import Image from "next/image";
import { twJoin, twMerge } from "tailwind-merge";
import { POKEMON_TYPE_TAILWIND_COLORS } from "@/app/constants";
import { PokemonImage } from "./PokemonImage";

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

  const pokemonType = pokemon.types[0].type
    .name as keyof typeof POKEMON_TYPE_TAILWIND_COLORS;

  const sprites = {
    default: pokemon.sprites.front_default,
    shiny: pokemon.sprites.front_shiny,
  };

  return (
    <div className="h-screen absolute inset-0 grid place-items-center">
      <div
        className={twMerge(
          "h-4/5  w-4/5 flex",
          POKEMON_TYPE_TAILWIND_COLORS[pokemonType]
        )}
      >
        <div>
          <p className="text-3xl">{pokemon.id}</p>
          <p className="text-3xl">{pokemon.name}</p>
          <div>
            {pokemon.types.map(({ type }: { type: { name: string } }) => (
              <p className="text-4xl">{type.name}</p>
            ))}
          </div>
        </div>
        <PokemonImage name={pokemon.name} imgs={sprites} />
        <div>
          {pokemon.stats.map(
            ({
              base_stat,
              stat,
            }: {
              base_stat: number;
              stat: {
                name: string;
              };
            }) => {
              return (
                <div>
                  <p className="text-3xl">{stat.name}</p>
                  <p>{base_stat}</p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
