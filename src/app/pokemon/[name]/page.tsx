'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  POKEMON_TYPE_TAILWIND_BG_COLORS,
  POKEMON_TYPE_TAILWIND_FILL_COLORS,
} from '@/app/utils/constants'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { capitalizeString, padToFourDigits } from '@/app/utils/helpers'
import { IoMdArrowRoundBack } from 'react-icons/io'
import Pokeball from '@/components/svgs/Pokeball'

const POKEMON_STATS_ABBREVIATION = [
  { id: 'hp', value: 'HP', color: 'bg-[#df2140]' },
  { id: 'attack', value: 'ATK', color: 'bg-[#ff994d]' },
  { id: 'defense', value: 'DEF', color: 'bg-[#ffdc41]' },
  { id: 'special-attack', value: 'SPA', color: 'bg-[#85ddff]' },
  { id: 'special-defense', value: 'SPD', color: 'bg-[#a8ef95]' },
  { id: 'speed', value: 'SPD', color: 'bg-[#fb94a8]' },
]

interface PokemonDetailsProps {
  params: {
    name: string
  }
}

interface PokemonProps {
  id: number
  name: string
  sprites: {
    front_default: string
    front_shiny: string
  }
  types: { type: { name: string } }[]
  stats: []
}

export default function PokemonDetails({ params }: PokemonDetailsProps) {
  const router = useRouter()

  const [pokemon, setPokemon] = useState({} as PokemonProps)
  const [currentPokemonImage, setCurrentPokemonImage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.name}`,
        )
        const data = await res.json()

        setPokemon(data)
        setCurrentPokemonImage(data.sprites.front_default)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getPokemon()
  }, [])

  const switchPokemonImage = (value: boolean) => {
    setCurrentPokemonImage(pokemon.sprites.front_default)

    if (value) {
      setCurrentPokemonImage(pokemon.sprites.front_shiny)
    }
  }

  return (
    <div className="col-[span_36_/_span_36] row-[span_36_/_span_36] grid place-items-center">
      {!isLoading && (
        <div className={twMerge('w-4/6 h-4/6  bg-white rounded-2xl')}>
          <Button
            className="absolute mt-2 rounded  bg-white hover:bg-white"
            onClick={() => router.push('/')}
          >
            <IoMdArrowRoundBack className="size-10 text-[#1a1a1a]" />
          </Button>

          <div className="flex size-full flex-col items-center">
            <Image
              src={currentPokemonImage}
              width={300}
              priority
              className="absolute m-auto -translate-y-28"
              height={300}
              alt={`${pokemon.name} picture`}
            />
            <div className="mb-4 mt-48 flex flex-col items-center gap-2 font-semibold">
              <span className="block">Toggle shiny</span>
              <Switch onCheckedChange={switchPokemonImage} />
            </div>
            <span className="mt-4 block font-semibold">
              #{padToFourDigits(pokemon.id)}
            </span>
            <p className="mt-3 text-4xl font-bold">
              {capitalizeString(pokemon.name)}
            </p>
            <div className="mb-5 flex gap-7">
              {pokemon.types.map(({ type }: { type: { name: string } }) => (
                <p
                  key={type.name}
                  className={twMerge(
                    'text-2xl uppercase py-2 mt-6 mb-4 w-36 text-center rounded-full cursor-pointer',
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

            <div
              className={twMerge(
                'w-full h-full rounded-b-2xl relative',
                POKEMON_TYPE_TAILWIND_BG_COLORS[
                  pokemon.types[0].type
                    .name as keyof typeof POKEMON_TYPE_TAILWIND_BG_COLORS
                ],
              )}
            >
              <Pokeball
                className={twMerge(
                  'absolute inset-x-0 m-auto size-14 -translate-y-6 rounded-full bg-white p-1',
                  POKEMON_TYPE_TAILWIND_FILL_COLORS[
                    pokemon.types[0].type
                      .name as keyof typeof POKEMON_TYPE_TAILWIND_BG_COLORS
                  ],
                )}
              />
              <div className="m-auto flex h-full items-center justify-center gap-10">
                {pokemon.stats.map(
                  ({
                    base_stat: baseStat,
                    stat,
                  }: {
                    base_stat: number
                    stat: {
                      name: string
                    }
                  }) => {
                    return (
                      <div
                        key={stat.name}
                        className="flex h-28 w-16 flex-col items-center rounded-full  bg-white font-bold"
                      >
                        <div
                          className={twMerge(
                            'm-1 flex size-14 items-center justify-center rounded-full text-center text-xl',
                            POKEMON_STATS_ABBREVIATION.find(
                              ({ id }) => id === stat.name,
                            )?.color,
                          )}
                        >
                          <p className="text-white">
                            {
                              POKEMON_STATS_ABBREVIATION.find(
                                ({ id }) => id === stat.name,
                              )?.value
                            }
                          </p>
                        </div>
                        <p className="text-xl font-bold">{baseStat}</p>
                      </div>
                    )
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
