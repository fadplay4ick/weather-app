const MS_TO_KMH = 3.6
const MAX_TEMPERATURE = 10
const MIN_WIND_KMH = 4.8
const WIND_EXPONENT = 0.16

export function calcFeelsLike(temperature, windMs) {
  const windKmh = windMs * MS_TO_KMH
  if (temperature > MAX_TEMPERATURE || windKmh <= MIN_WIND_KMH) return temperature
  const factor = windKmh ** WIND_EXPONENT
  return 13.12 + 0.6215 * temperature - 11.37 * factor + 0.3965 * temperature * factor
}