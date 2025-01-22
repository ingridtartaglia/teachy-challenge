export const formatHeight = (height: string): string => {
  const heightInMeters = Number(height) / 100
  return `${heightInMeters.toFixed(2).replace('.', ',')} m`
}