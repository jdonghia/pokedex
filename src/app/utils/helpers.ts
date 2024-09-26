export const padToFourDigits = (num: number | string): string =>
  num.toString().padStart(4, '0')

export const capitalizeString = (name: string) =>
  name
    .split('-')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
