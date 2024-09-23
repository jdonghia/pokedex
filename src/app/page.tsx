"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { Search } from "lucide-react";

export default function Home() {
  const [pokemons, setPokemons] = useState(
    [] as { name: string; sprite: string }[]
  );
  const [searchedValue, setSearchedValue] = useState("");

  const getPokemons = async (pagination = 20) => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${pagination}`
      );
      const data = await res.json();

      const formattedData = data.results.map(
        ({ name, url }: { name: string; url: string }) => ({
          name,
          // sprite value splitted by url string: explain at README.md
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            url.split("/")[6]
          }.png`,
        })
      );

      setPokemons(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const searchPokemon = async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchedValue}`
      );

      const data = await res.json();

      const formattedData = {
        name: data.name,
        sprite: data.sprites.front_default,
      };

      setPokemons([formattedData]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center w-1/2 p-5">
        <Input
          type="text"
          placeholder="search"
          onChange={(e) => setSearchedValue(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? searchPokemon() : "")}
        />
        <Button onClick={searchPokemon}>
          <Search />
        </Button>
      </div>
      <ul className="flex gap-10 flex-wrap p-5">
        {pokemons.map(({ name, sprite }: { name: string; sprite: string }) => (
          <li key={name}>
            <div className="bg-zinc-300 rounded p-2 flex flex-col justify-center items-center">
              <Image
                src={sprite}
                alt={name}
                width={100}
                height={100}
                priority
              />
              <p>{name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
