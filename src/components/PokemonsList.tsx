import Link from "next/link";
import Image from "next/image";
import { padToFourDigits } from "@/app/utils/helpers";
import { TbPokeball } from "react-icons/tb";

interface PokemonListProps {
  pokemons: [];
}

export function PokemonsList({ pokemons }: PokemonListProps) {
  return (
    <ul className="row-[span_32_/_span_32]  col-[span_36_/_span_36] overflow-scroll flex flex-wrap gap-10 pt-12 justify-center">
      {pokemons.map(({ name, id }: { name: string; id: string | number }) => (
        <li
          key={name}
          className="w-1/6 h-[20%] my-4 bg-zinc-200 flex flex-col items-center justify-center z-30 rounded-lg relative"
        >
          <Link href={`pokemon/${name}`}>
            <div className="cursor-pointer rounded p-2 flex flex-col items-center">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={`${name} picture`}
                width={130}
                height={1}
                priority
                className=" absolute top-0 left-0 right-0 m-auto -translate-y-16 z-50"
              />

              <div className="flex flex-col items-center absolute bottom-0 rounded-b pt-4 pb-2 left-0 right-0 bg-zinc-500">
                <TbPokeball className="w-12 h-12 text-white bg-zinc-500 rounded-full absolute top-0 -translate-y-4 z-10" />
                <p className="font-bold text-lg z-50 mt-4">
                  {name
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
                <span>#{padToFourDigits(id)}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
