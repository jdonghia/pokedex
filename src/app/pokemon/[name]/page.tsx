"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { POKEMON_TYPE_TAILWIND_COLORS } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PokemonDetailsProps {
  params: {
    name: string;
  };
}

interface PokemonProps {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: { type: { name: string } }[];
  stats: [];
}

export default function PokemonDetails({ params }: PokemonDetailsProps) {
  const router = useRouter();

  const [pokemon, setPokemon] = useState({} as PokemonProps);
  const [currentPokemonImage, setCurrentPokemonImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.name}`
        );
        const data = await res.json();

        setPokemon(data);
        setCurrentPokemonImage(data.sprites.front_default);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemon();
  }, []);

  return (
    <div className="h-screen absolute inset-0 grid place-items-center">
      {!isLoading && (
        <div
          className={twMerge(
            "h-4/5  w-4/5 flex",
            POKEMON_TYPE_TAILWIND_COLORS[
              pokemon.types[0].type
                .name as keyof typeof POKEMON_TYPE_TAILWIND_COLORS
            ]
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
          <div>
            <Button
              onClick={() =>
                setCurrentPokemonImage(pokemon.sprites.front_default)
              }
            >
              Default
            </Button>
            <Button
              onClick={() =>
                setCurrentPokemonImage(pokemon.sprites.front_shiny)
              }
            >
              Shiny
            </Button>
          </div>
          <Image
            src={currentPokemonImage}
            width={500}
            priority
            height={500}
            alt={`${pokemon.name} picture`}
          />
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
      )}
    </div>
  );
}
