import Link from "next/link";
import Image from "next/image";

interface PokemonListProps {
  pokemons: [];
}

export function PokemonsList({ pokemons }: PokemonListProps) {
  return (
    <ul className="flex gap-10 flex-wrap p-5">
      {pokemons.map(({ name, id }: { name: string; id: string | number }) => (
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
