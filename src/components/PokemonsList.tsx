import Link from "next/link";
import Image from "next/image";

interface PokemonListProps {
  pokemons: [];
}

export function PokemonsList({ pokemons }: PokemonListProps) {
  return (
    <ul className="row-[span_32_/_span_32]  col-[span_36_/_span_36] overflow-scroll flex flex-wrap gap-10 py-5 justify-center">
      {pokemons.map(({ name, id }: { name: string; id: string | number }) => (
        <li
          key={name}
          className="w-1/6 h-1/4 bg-zinc-500 flex flex-col items-center justify-center z-30"
        >
          <Link href={`pokemon/${name}`}>
            <div className="cursor-pointer rounded p-2 flex flex-col  items-center relative">
              <div className="absolute bottom-0  px-2 py-3 rounded">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={`${name} picture`}
                  width={100}
                  height={100}
                  priority
                />
              </div>
              <p className="z-40 mt-4">
                {name
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
