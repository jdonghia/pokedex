"use client";

import { CustomSelect } from "@/components/shared/CustomSelect";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function PokemonSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [searchedValue, setSearchedValue] = useState("");
  const [searchBy, setSearchBy] = useState("pokemon");
  const [pokemonTypes, setPokemonTypes] = useState([] as OptionProps[]);

  const searchByOptions = [
    {
      value: "pokemon",
      label: "Number or Name",
    },
    {
      value: "type",
      label: "Type",
    },
  ];

  useEffect(() => {
    if (searchBy === "type") {
      setSearchedValue("normal");
    } else {
      setSearchedValue("");
    }
  }, [searchBy]);

  useEffect(() => {
    const getPokemonTypes = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/type`);
        const data = await res.json();

        const formattedData = data.results.map(
          ({ name }: { name: string }) => ({
            value: name,
            label: name,
          })
        );

        setPokemonTypes(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    getPokemonTypes();
  }, []);

  const handlePokemonSearch = () => {
    if (searchedValue) {
      params.set(searchBy, searchedValue);
      router.push(`?${searchBy}=${searchedValue}`);
    }
  };

  const resetFilter = () => {
    setSearchBy("pokemon");
    setSearchedValue("");
    router.push("/");
  };

  return (
    <div className="flex items-center w-1/2 p-5">
      <CustomSelect
        value={searchBy}
        onValueChange={setSearchBy}
        options={searchByOptions}
        placeholder="Search by"
      />
      {searchBy === "type" && (
        <CustomSelect
          onValueChange={setSearchedValue}
          options={pokemonTypes}
          defaultValue="normal"
        />
      )}
      {searchBy === "pokemon" && (
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
      <Button onClick={resetFilter}>reset filter</Button>
    </div>
  );
}
