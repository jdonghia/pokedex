'use client'

import { CustomSelect } from '@/components/shared/CustomSelect'
import { Input } from '@/components/ui/input'
import { RotateCw } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { TbPokeball } from 'react-icons/tb'
import type { OptionProps } from '@/app/utils/types'
import { CustomTooltip } from './shared/CustomTooltip'

export function PokemonSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const [searchBy, setSearchBy] = useState('pokemon')
  const [searchedValue, setSearchedValue] = useState('')
  const [pokemonTypes, setPokemonTypes] = useState([] as OptionProps[])

  const searchByOptions = [
    {
      value: 'pokemon',
      label: 'Number or Name',
    },
    {
      value: 'type',
      label: 'Type',
    },
  ]

  useEffect(() => {
    clearSearchedValue()
  }, [searchBy])

  useEffect(() => {
    const getPokemonTypes = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/type`)
        const data = await res.json()

        const formattedData = data.results.map(
          ({ name }: { name: string }) => ({
            value: name,
            label: name,
          }),
        )

        setPokemonTypes(formattedData)
      } catch (error) {
        console.error(error)
      }
    }

    getPokemonTypes()
  }, [])

  const searchPokemon = () => {
    if (searchedValue) {
      params.set(searchBy, searchedValue)
      router.push(`?${searchBy}=${searchedValue}`)
    }
  }

  const clearFilters = () => {
    setSearchBy('pokemon')
    setSearchedValue('')
    router.push('/')
  }

  const clearSearchedValue = () => {
    if (searchBy === 'type') {
      setSearchedValue('normal')
    } else {
      setSearchedValue('')
    }
  }

  return (
    <div className="col-[span_36_/_span_36] row-span-2 grid place-items-center">
      <div className="flex w-3/6 items-center">
        <CustomSelect
          value={searchBy}
          onValueChange={setSearchBy}
          options={searchByOptions}
          placeholder="Search by"
          className="rounded-none rounded-s"
        />
        {searchBy === 'type' && (
          <CustomSelect
            onValueChange={setSearchedValue}
            options={pokemonTypes}
            defaultValue="normal"
            className="rounded-none"
          />
        )}
        {searchBy === 'pokemon' && (
          <Input
            value={searchedValue}
            className="rounded-none"
            type="text"
            placeholder="Search for pokemon"
            onChange={(e) => setSearchedValue(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? searchPokemon() : '')}
          />
        )}
        <CustomTooltip
          content={
            <Button
              onClick={searchPokemon}
              className="rounded-none rounded-e bg-white"
            >
              <TbPokeball size={25} className="text-red-500" />
            </Button>
          }
          text="Gotta catch'em all!"
        />
        <CustomTooltip
          content={
            <Button className="ms-5 bg-white" onClick={clearFilters}>
              <RotateCw className="text-red-500" />
            </Button>
          }
          text="Reset filters"
        />
      </div>
    </div>
  )
}
