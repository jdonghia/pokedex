'use client'

import { CustomPagination } from '@/components/shared/CustomPagination'
import { useSearchParams } from 'next/navigation'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { POKEAPI_BASE_URL } from './utils/constants'
import { PokemonSearch } from '@/components/PokemonSearch'
import { PokemonsList } from '@/components/PokemonsList'
import { PokemonNotFound } from '@/components/PokemonNotFound'
import { LoadingScreen } from '@/components/shared/LoadingScreen'

export default function Home() {
  const searchParams = useSearchParams()

  const { pokemon, type, limit, offset } = {
    pokemon: searchParams.get('pokemon'),
    type: searchParams.get('type'),
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 20,
    offset: searchParams.get('offset') ? Number(searchParams.get('offset')) : 0,
  }

  const currentPage = Math.floor(offset / limit + 1)

  const {
    data: pokemonsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['get-pokemons', limit, offset, pokemon, type],
    queryFn: async () => {
      let url = `${POKEAPI_BASE_URL}/pokemon`

      if (limit.toString() && offset.toString()) {
        url = `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      }

      if (pokemon) {
        url = `${POKEAPI_BASE_URL}/pokemon/${pokemon}`
      }

      if (type) {
        url = `${POKEAPI_BASE_URL}/type/${type}`
      }

      try {
        const response = await fetch(url)
        const data = await response.json()

        const getPokemonRows = () => {
          if (!data.pokemon && !data.results) {
            return [data]
          }

          if (data.pokemon) {
            return data.pokemon.map(
              ({ pokemon }: { pokemon: { name: string; url: string } }) => {
                return {
                  name: pokemon.name,
                  id: pokemon.url.split('/')[6],
                }
              },
            )
          }

          if (data.results) {
            return data.results.map(
              ({ name, url }: { name: string; url: string }) => ({
                name,
                // sprite value splitted by url string: explained at README.md
                id: url.split('/')[6],
              }),
            )
          }
        }

        const formattedData = {
          ...data,
          results: getPokemonRows(),
        }

        return formattedData
      } catch (error) {
        console.error(error)
      }
    },
    placeholderData: keepPreviousData,
  })

  return (
    <>
      <LoadingScreen loading={isLoading} />
      {!isLoading && (
        <>
          <PokemonSearch />
          <>
            {isError ? (
              <PokemonNotFound />
            ) : (
              <PokemonsList pokemons={pokemonsResponse?.results} />
            )}
            <CustomPagination
              totalItems={pokemonsResponse?.count || 0}
              itemsPerPage={limit}
              currentPage={currentPage}
            />
          </>
        </>
      )}
    </>
  )
}
