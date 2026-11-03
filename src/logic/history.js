import { HISTORY_FORECAST_DAYS, HISTORY_KEEP_DAYS } from '../config.js'
import { addDays, pickCheckpoints } from './checkpoints.js'

function uniqueDates(readings) {
  const dates = readings.map(({ time }) => time.slice(0, 10))
  return [...new Set(dates)].slice(0, HISTORY_FORECAST_DAYS)
}

function mergeDay(storedDay = {}, date, readings) {
  const merged = { ...storedDay }
  pickCheckpoints(readings, date).forEach(({ id, reading }) => {
    if (reading) merged[id] = reading
  })
  return merged
}

function dropOldDays(history, today) {
  const cutoff = addDays(today, -HISTORY_KEEP_DAYS)
  return Object.fromEntries(Object.entries(history).filter(([date]) => date >= cutoff))
}

export function updateHistory(history, readings) {
  const merged = { ...history }
  uniqueDates(readings).forEach((date) => {
    merged[date] = mergeDay(history[date], date, readings)
  })
  return dropOldDays(merged, readings[0].time.slice(0, 10))
}