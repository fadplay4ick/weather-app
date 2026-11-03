import { updateRatesHistory } from '../logic/ratesHistory.js'

const STORAGE_KEY = 'rates-history'

export function loadRatesHistory(storage = globalThis.localStorage) {
  try {
    return JSON.parse(storage.getItem(STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

function saveRatesHistory(history, storage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    return
  }
}

export function recordRates(snapshot, storage = globalThis.localStorage) {
  const history = updateRatesHistory(loadRatesHistory(storage), snapshot)
  saveRatesHistory(history, storage)
  return history
}