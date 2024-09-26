import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import type { PropsWithChildren } from 'react'

interface LoadingScreenProps extends PropsWithChildren {
  loading: boolean
}

export function LoadingScreen({ loading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-[url('/bg.png')]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <Image
              src="/pokedex-logo.png"
              width={250}
              height={50}
              alt="pokedex"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
