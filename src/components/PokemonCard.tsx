import { padToFourDigits } from '@/app/utils/helpers'
import { TbPokeball } from 'react-icons/tb'
import Image from 'next/image'
import Link from 'next/link'

interface PokemonCardProps {
  name: string
  id: string
}

export function PokemonCard({ name, id }: PokemonCardProps) {
  return (
    <Link href={`pokemon/${name}`}>
      <div className="flex cursor-pointer flex-col items-center rounded p-2">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt=""
          // alt is also translating when not image found.
          // alt={`${name} picture`}
          width={130}
          height={1}
          priority
          className="absolute inset-x-0 top-0 z-50 m-auto -translate-y-16"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center rounded-b bg-zinc-500 pb-2 pt-4">
          <TbPokeball className="absolute top-0 z-10 size-12 -translate-y-4 rounded-full bg-zinc-500 text-white" />
          <p className="z-50 mt-4 text-lg font-bold">
            {name
              .split('-')
              .slice(0, 2)
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </p>
          <span>#{padToFourDigits(id)}</span>
        </div>
      </div>
    </Link>
  )
}
