const MINUS = '−'

export function formatTemperature(value) {
  const rounded = Math.round(value) + 0
  return rounded < 0 ? `${MINUS}${Math.abs(rounded)}°` : `${rounded}°`
}

export function formatHour(hour) {
  return `${hour}:00`
}