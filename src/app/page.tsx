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
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { POKEAPI_BASE_URL } from "./constants";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pokemon = searchParams.get("pokemon");
  const type = searchParams.get("type");

  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 20;

  const offset = searchParams.get("offset")
    ? Number(searchParams.get("offset"))
    : 0;

  const currentPage = Math.floor(offset / limit + 1);

  const [searchedValue, setSearchedValue] = useState("1");
  const [searchBy, setSearchBy] = useState("pokemon");

  const { data: pokemonsResponse, isLoading } = useQuery({
    queryKey: ["get-pokemons", limit, offset, pokemon, type],
    queryFn: async () => {
      let url = `${POKEAPI_BASE_URL}/pokemon`;

      if (limit && offset) {
        url = `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
      }

      if (pokemon) {
        url = `${POKEAPI_BASE_URL}/pokemon/${pokemon}`;
      }

      if (type) {
        url = `${POKEAPI_BASE_URL}/type/${type}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      const getPokemonRows = () => {
        if (!data.pokemon && !data.results) {
          return [data];
        }

        if (data.pokemon) {
          return data.pokemon.map(
            (item: { pokemon: { name: string; url: string } }) => {
              return {
                name: item.pokemon.name,
                id: item.pokemon.url.split("/")[6],
              };
            }
          );
        }

        if (data.results) {
          return data.results.map(
            ({ name, url }: { name: string; url: string }) => ({
              name,
              // sprite value splitted by url string: explain at README.md
              id: url.split("/")[6],
            })
          );
        }
      };

      const formattedData = {
        ...data,
        results: getPokemonRows(),
      };

      return formattedData;
    },
    placeholderData: keepPreviousData,
  });

  const [types, setTypes] = useState([]);

  useEffect(() => {
    getPokemonTypes();
  }, []);

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

  const handlePokemonSearch = () => {
    params.set(searchBy, searchedValue);
    router.push(`?${searchBy}=${searchedValue}`);
  };

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
            onKeyDown={(e) => (e.key === "Enter" ? handlePokemonSearch() : "")}
          />
        )}

        <Button onClick={handlePokemonSearch}>
          <Search />
        </Button>
      </div>
      <ul className="flex gap-10 flex-wrap p-5">
        {pokemonsResponse &&
          pokemonsResponse.results.map(
            ({ name, id }: { name: string; id: string | number }) => (
              <li key={name}>
                <Link href={`pokemon/${name}`}>
                  <div className="cursor-pointer bg-zinc-300 rounded p-2 flex flex-col justify-center items-center">
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
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </p>
                  </div>
                </Link>
              </li>
            )
          )}
        {!isLoading && pokemonsResponse.results.length !== 1 && (
          <div className="flex items-center w-full">
            <Pagination
              totalItems={pokemonsResponse && pokemonsResponse.count}
              itemsPerPage={limit}
              currentPage={currentPage}
            />
          </div>
        )}
      </ul>
    </div>
  );
}
