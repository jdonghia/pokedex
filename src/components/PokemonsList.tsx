import Link from 'next/link'
import Image from 'next/image'
import { padToFourDigits } from '@/app/utils/helpers'
import { TbPokeball } from 'react-icons/tb'
import { motion } from 'framer-motion'

interface PokemonListProps {
  pokemons: []
}

export function PokemonsList({ pokemons }: PokemonListProps) {
  return (
    <ul className="col-[span_36_/_span_36] row-[span_32_/_span_32] flex flex-wrap justify-center gap-10 overflow-scroll pt-12">
      {pokemons.map((pokemon: { name: string; id: string }, index) => (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.005,
            ease: 'easeInOut',
          }}
          key={pokemon.name}
          className="relative z-30 my-4 flex h-1/5 w-1/6 flex-col items-center justify-center rounded-lg bg-zinc-200"
        >
          <Link href={`pokemon/${pokemon.name}`}>
            <div className="flex cursor-pointer flex-col items-center rounded p-2">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt=""
                // alt is also translating when not image found.
                // alt={`${pokemon.name} picture`}
                width={130}
                height={1}
                priority
                className="absolute inset-x-0 top-0 z-50 m-auto -translate-y-16"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center rounded-b bg-zinc-500 pb-2 pt-4">
                <TbPokeball className="absolute top-0 z-10 size-12 -translate-y-4 rounded-full bg-zinc-500 text-white" />
                <p className="z-50 mt-4 text-lg font-bold">
                  {pokemon.name
                    .split('-')
                    .slice(0, 2)
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </p>
                <span>#{padToFourDigits(pokemon.id)}</span>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}
