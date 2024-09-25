"use client";

import { CustomSelect } from "@/components/shared/CustomSelect";
import { Input } from "@/components/ui/input";
import { RotateCw, Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { TbPokeball } from "react-icons/tb";

export function PokemonSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [searchBy, setSearchBy] = useState("pokemon");
  const [searchedValue, setSearchedValue] = useState("");
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
    <div className="flex items-center py-3 sticky w-full top-0 z-50 bg-orange-500 justify-center">
      <div className="flex items-center w-3/6">
        <CustomSelect
          value={searchBy}
          onValueChange={setSearchBy}
          options={searchByOptions}
          placeholder="Search by"
          className="rounded-none rounded-s"
        />
        {searchBy === "type" && (
          <CustomSelect
            onValueChange={setSearchedValue}
            options={pokemonTypes}
            defaultValue="normal"
            className="rounded-none"
          />
        )}
        {searchBy === "pokemon" && (
          <Input
            className="rounded-none"
            type="text"
            placeholder="Search for pokemon"
            onChange={(e) => setSearchedValue(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handlePokemonSearch() : "")}
          />
        )}
        <Button
          onClick={handlePokemonSearch}
          className="bg-white rounded-none rounded-e"
        >
          <TbPokeball size={25} className="text-red-500" />
        </Button>
        <Button className="ms-5 bg-white" onClick={resetFilter}>
          <RotateCw className="text-red-500" />
        </Button>
      </div>
    </div>
  );
}
