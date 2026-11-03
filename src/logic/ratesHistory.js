import { HISTORY_KEEP_DAYS } from '../config.js'
import { snapshotValues } from './ratesForDate.js'

function addIfMissing(history, date, values) {
  return history[date] ? history : { ...history, [date]: values }
}

function keepLatest(history) {
  const entries = Object.entries(history).sort(([a], [b]) => (a < b ? -1 : 1))
  return Object.fromEntries(entries.slice(-HISTORY_KEEP_DAYS))
}

export function updateRatesHistory(history, snapshot) {
  const withValue = addIfMissing(history, snapshot.date, snapshotValues(snapshot, 'value'))
  const withPrevious = addIfMissing(
    withValue,
    snapshot.previousDate,
    snapshotValues(snapshot, 'previous')
  )
  return keepLatest(withPrevious)
}