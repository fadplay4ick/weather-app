import { updateHistory } from '../logic/history.js'

const STORAGE_KEY = 'weather-history'

export function loadHistory(storage = globalThis.localStorage) {
  try {
    return JSON.parse(storage.getItem(STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

function saveHistory(history, storage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    return
  }
}

export function recordForecast(readings, storage = globalThis.localStorage) {
  const history = updateHistory(loadHistory(storage), readings)
  saveHistory(history, storage)
  return history
}