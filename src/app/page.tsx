"use client";

import { Suspense, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Search } from "lucide-react";
import { Pagination } from "@/components/Pagination";

export default function Home() {
  const [pokemons, setPokemons] = useState(
    [] as { name: string; id: string | number }[]
  );

  const [searchedValue, setSearchedValue] = useState("");
  const [searchBy, setSearchBy] = useState("pokemon");
  const [paginationCalls, setPaginationCalls] = useState({
    next: "",
    previous: "",
  });

  useEffect(() => {
    getPokemons("https://pokeapi.co/api/v2/pokemon");
    getPokemonTypes();
  }, []);

  const [types, setTypes] = useState([]);

  const getPokemons = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const pokemons = data.results.map(
        ({ name, url }: { name: string; url: string }) => ({
          name,
          // sprite value splitted by url string: explain at README.md
          id: url.split("/")[6],
        })
      );

      setPokemons(pokemons);

      setPaginationCalls({ next: data.next, previous: data.previous });
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemonTypes = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type`);
      const data = await res.json();

      const formattedData = data.results.map(
        ({ name, url }: { name: string; url: string }) => ({
          name,
          // sprite value splitted by url string: explain at README.md
          id: url.split("/")[6],
        })
      );

      setTypes(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const searchPokemon = async () => {
    if (!searchedValue) {
      return;
    }

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/${searchBy}/${searchedValue}`
      );

      let data = await res.json();

      if (data.pokemon) {
        data = data.pokemon.map((item) => {
          return {
            name: item.pokemon.name,
            id: item.pokemon.url.split("/")[6],
          };
        });
        setPokemons([...data]);
      } else {
        setPokemons([data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchBy === "type") {
      setSearchedValue("1");
    }
  }, [searchBy]);

  return (
    <div>
      <div className="flex items-center w-1/2 p-5">
        <Select onValueChange={setSearchBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="pokemon">Number or Name</SelectItem>
          </SelectContent>
        </Select>
        {searchBy === "type" ? (
          <Select onValueChange={setSearchedValue} defaultValue="1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Search by" />
            </SelectTrigger>
            <SelectContent>
              {types.map(({ name, id }: { name: string; id: string }) => (
                <SelectItem value={id} key={name}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            type="text"
            placeholder="Search for pokemon"
            onChange={(e) => setSearchedValue(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? searchPokemon() : "")}
          />
        )}

        <Button onClick={searchPokemon}>
          <Search />
        </Button>
      </div>
      <ul className="flex gap-10 flex-wrap p-5">
        {pokemons.map(({ name, id }: { name: string; id: string | number }) => (
          <li key={name}>
            <div className="bg-zinc-300 rounded p-2 flex flex-col justify-center items-center">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={`${name} picture`}
                width={100}
                height={100}
                priority
              />
              <p>
                {name
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            </div>
          </li>
        ))}

        <Pagination
          onPreviousClick={() => getPokemons(paginationCalls.previous)}
          onNextClick={() => getPokemons(paginationCalls.next)}
        />
      </ul>
    </div>
  );
}
