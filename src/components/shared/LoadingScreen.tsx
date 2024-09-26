import { AnimatePresence, motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

interface LoadingScreenProps extends PropsWithChildren {
  loading: boolean
}

export function LoadingScreen({ loading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 bg-neutral-400"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
    </AnimatePresence>
  )
}
