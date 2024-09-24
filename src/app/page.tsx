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

export default function Home() {
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 20;

  const offset = searchParams.get("offset")
    ? Number(searchParams.get("offset"))
    : 0;

  const currentPage = Math.floor(offset / limit + 1);

  const { data: pokemonsResponse, isLoading } = useQuery({
    queryKey: ["get-pokemons", limit, offset],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      const formattedData = {
        ...data,
        results: data.results.map(
          ({ name, url }: { name: string; url: string }) => ({
            name,
            // sprite value splitted by url string: explain at README.md
            id: url.split("/")[6],
          })
        ),
      };

      return formattedData;
    },
    placeholderData: keepPreviousData,
  });

  const router = useRouter();
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // const offset = itemsPerPage * (currentPage - 1);

  const setQueryParams = () => {
    const currentParams = new URLSearchParams(searchParams);

    const offset = itemsPerPage * (currentPage - 1);

    currentParams.set("limit", itemsPerPage.toString());
    currentParams.set("offset", offset.toString());

    router.push(`?${currentParams.toString()}`);
  };

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
    if (searchParams.get("limit") && searchParams.get("offset")) {
      setItemsPerPage(parseInt(searchParams.get("limit") as string));
    }

    getPokemons();
    getPokemonTypes();
  }, []);

  const [types, setTypes] = useState([]);

  const getPokemons = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`;

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

      setTotalItems(data.count);

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
        data = data.pokemon.map(
          (item: { pokemon: { name: string; url: string } }) => {
            return {
              name: item.pokemon.name,
              id: item.pokemon.url.split("/")[6],
            };
          }
        );
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

  useEffect(() => {
    // setQueryParams();
    getPokemons();
  }, [currentPage]);

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
        {!isLoading && (
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
