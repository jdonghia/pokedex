import { POKEMON_STATS_ABBREVIATION } from '@/app/utils/constants'
import { twMerge } from 'tailwind-merge'

interface PokemonStatsProps {
  stats: []
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <>
      {stats.map(
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
                  POKEMON_STATS_ABBREVIATION.find(({ id }) => id === stat.name)
                    ?.color,
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
    </>
  )
}
