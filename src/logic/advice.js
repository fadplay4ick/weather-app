import { CLOTHING_BANDS, COMFORT_SHIFT, EVENING_DROP, MESSAGES, WIND_LIMIT } from '../config.js'
import { calcFeelsLike } from './feelsLike.js'

function roundToTenth(value) {
  return Math.round(value * 10) / 10
}

function effectiveTemperature({ temperature, wind }) {
  return roundToTenth(calcFeelsLike(temperature, wind) + COMFORT_SHIFT)
}

function pickOutfit(temperature) {
  return CLOTHING_BANDS.find((band) => temperature < band.below).summary
}

function pickWarnings({ precipitation, wind }) {
  const warnings = []
  if (precipitation > 0) warnings.push(MESSAGES.rain)
  if (wind >= WIND_LIMIT) warnings.push(MESSAGES.wind)
  return warnings
}

function adviseCheckpoint({ id, label, hour, reading }) {
  if (!reading) return { id, label, hour, available: false }
  const temperature = effectiveTemperature(reading)
  return {
    id,
    label,
    hour,
    available: true,
    reading,
    effectiveTemperature: temperature,
    outfit: pickOutfit(temperature),
    warnings: pickWarnings(reading),
  }
}

function isEveningColder(afternoon, evening) {
  if (!afternoon.available || !evening.available) return false
  return afternoon.effectiveTemperature - evening.effectiveTemperature >= EVENING_DROP
}

function addEveningNote(advice) {
  const afternoon = advice.find(({ id }) => id === 'afternoon')
  const evening = advice.find(({ id }) => id === 'evening')
  if (!isEveningColder(afternoon, evening)) return advice
  return advice.map((item) =>
    item.id === 'evening'
      ? { ...item, warnings: [...item.warnings, MESSAGES.eveningDrop] }
      : item
  )
}

export function buildDayAdvice(checkpoints) {
  return addEveningNote(checkpoints.map(adviseCheckpoint))
}