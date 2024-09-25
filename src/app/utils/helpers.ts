export const padToFourDigits = (num: number | string): string =>
  num.toString().padStart(4, '0')
