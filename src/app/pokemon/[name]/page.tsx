'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { capitalizeString, padToFourDigits } from '@/app/utils/helpers'
import { IoMdArrowRoundBack } from 'react-icons/io'
import Pokeball from '@/components/svgs/Pokeball'
import { PokemonStats } from './PokemonStats'
import { PokemonTypes } from './PokemonTypes'

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
            <span className="block font-semibold">
              #{padToFourDigits(pokemon.id)}
            </span>
            <p className="mt-3 text-4xl font-bold">
              {capitalizeString(pokemon.name)}
            </p>
            <div className="mb-5 flex gap-7">
              <PokemonTypes types={pokemon.types} />
            </div>
            <div className="relative size-full rounded-b-2xl bg-[#cc3333]">
              <Pokeball className="absolute inset-x-0 m-auto size-14 -translate-y-6 rounded-full bg-white fill-[#cc3333] p-1" />
              <div className="m-auto flex h-full items-center justify-center gap-10">
                <PokemonStats stats={pokemon.stats} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
