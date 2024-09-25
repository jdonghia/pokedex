"use client";

import { use, useEffect } from "react";
import Image from "next/image";
import { twJoin, twMerge } from "tailwind-merge";
import { POKEMON_TYPE_TAILWIND_COLORS } from "@/app/utils/constants";
import { PokemonImage } from "./PokemonImage";
import { getPokemon } from "./get-pokemon";
import { useSearchParams, useRouter } from "next/navigation";

interface PokemonDetailsProps {
  params: {
    name: string;
  };
}

export default function PokemonDetails({ params }: PokemonDetailsProps) {
  const pokemon = use(getPokemon(params.name));
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const router = useRouter();

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
              <p
                className="text-4xl"
                onClick={() => router.push(`/?type=${type.name}`)}
              >
                {type.name}
              </p>
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
