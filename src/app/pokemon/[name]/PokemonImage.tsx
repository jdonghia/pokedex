'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'

interface PokemonImageProps {
  imgs: { default: string; shiny: string }
  name: string
}

export function PokemonImage({ imgs, name }: PokemonImageProps) {
  const [currentImg, setCurrentImg] = useState(imgs.default)

  return (
    <>
      <div>
        <Button onClick={() => setCurrentImg(imgs.default)}>Default</Button>
        <Button onClick={() => setCurrentImg(imgs.shiny)}>Shiny</Button>
      </div>
      <Image
        src={currentImg}
        width={500}
        priority
        height={500}
        alt={`${name} picture`}
      />
    </>
  )
}
