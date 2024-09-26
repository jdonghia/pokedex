import { motion } from 'framer-motion'
import { PokemonCard } from './PokemonCard'
import type { PokemonProps } from '@/app/utils/types'

interface PokemonListProps {
  pokemons: PokemonProps[]
}

export function PokemonsList({ pokemons }: PokemonListProps) {
  return (
    <ul className="col-[span_36_/_span_36] row-[span_32_/_span_32] flex flex-wrap justify-center gap-10 overflow-scroll bg-[#e8e8e8] pt-12">
      {pokemons.map((pokemon: PokemonProps, index) => (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.005,
            ease: 'easeInOut',
          }}
          key={pokemon.name}
          className="relative z-30 my-4 flex h-1/5 w-1/6 flex-col items-center justify-center rounded-lg bg-[#e8e8e8] shadow-pokemon-card"
        >
          <PokemonCard name={pokemon.name} id={pokemon.id} />
        </motion.li>
      ))}
    </ul>
  )
}
