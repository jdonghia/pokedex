import { capitalizeString, padToFourDigits } from '@/app/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import Pokeball from './svgs/Pokeball'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface PokemonCardProps {
  name: string
  id: string
}

export function PokemonCard({ name, id }: PokemonCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`pokemon/${name}`} className="size-full">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="flex size-full cursor-pointer flex-col items-center rounded p-2"
      >
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt=""
          // alt is also translating when not image found.
          // alt={`${name} picture`}
          width={130}
          height={130}
          priority
          className="absolute inset-x-0 top-0 z-50 m-auto size-32 -translate-y-16"
        />
        <motion.div
          className={`absolute inset-x-0 bottom-0 flex flex-col items-center rounded-b bg-[#c1c1cb] pb-2 pt-4 ${hovered && 'bg-[#cc3333] transition-colors'}`}
        >
          <Pokeball
            className={`absolute top-0 z-10 size-11 -translate-y-4 rounded-full bg-[#e8e8e8] fill-[#c1c1cb] p-[2px] ${hovered && 'fill-[#cc3333] transition-colors'}`}
          />
          <p className="z-50 mt-4 text-lg font-bold text-[#242124]">
            {capitalizeString(name)}
          </p>
          <span className="text-sm font-medium text-[#595759]">
            #{padToFourDigits(id)}
          </span>
        </motion.div>
      </motion.div>
    </Link>
  )
}
