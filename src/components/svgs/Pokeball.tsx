import type { JSX, SVGProps } from 'react'

function Pokeball(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <path d="M16.08.63C7.5.63.63 7.47.63 16.03c0 8.43 6.89 15.33 15.32 15.34 8.55 0 15.43-6.85 15.43-15.37C31.38 7.55 24.51.64 16.09.64zm3.1 15.38c0 1.77-1.45 3.19-3.21 3.17-1.77-.02-3.16-1.45-3.15-3.24 0-1.73 1.46-3.13 3.22-3.12 1.74 0 3.15 1.44 3.15 3.19zm-2.71 13.64c-7.95.27-13.79-6.11-14.08-12.77h8.79c.29 1.34.98 2.42 2.12 3.19.86.58 1.82.84 2.86.82 2.25-.06 3.86-1.43 4.69-4h8.75c-.12 5.84-5.21 12.5-13.12 12.77z" />
    </svg>
  )
}

export default Pokeball
