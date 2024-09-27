import { POKEMON_TYPE_TAILWIND_BG_COLORS } from '@/app/utils/constants'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface PokemonTypesProps {
  types: { type: { name: string } }[]
}

export function PokemonTypes({ types }: PokemonTypesProps) {
  const router = useRouter()

  return (
    <div className="mb-5 flex gap-7">
      {types.map(({ type }: { type: { name: string } }) => (
        <p
          key={type.name}
          className={twMerge(
            'text-xl uppercase py-2 mt-6 mb-4 w-28 text-center rounded-full cursor-pointer',
            POKEMON_TYPE_TAILWIND_BG_COLORS[
              type.name as keyof typeof POKEMON_TYPE_TAILWIND_BG_COLORS
            ],
          )}
          onClick={() => router.push(`/?type=${type.name}`)}
        >
          {type.name}
        </p>
      ))}
    </div>
  )
}
