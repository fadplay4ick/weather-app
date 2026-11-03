import { RATES_CURRENCIES } from '../config.js'

const roundChange = (value, base) => Math.round((value - base) * 100) / 100

function emptyRates() {
  return RATES_CURRENCIES.map((code) => ({ code, value: null, change: null }))
}

export function snapshotValues(snapshot, field) {
  return Object.fromEntries(
    RATES_CURRENCIES.map((code) => [code, snapshot.rates[code][field]])
  )
}

function buildRates(values, baseValues) {
  return RATES_CURRENCIES.map((code) => ({
    code,
    value: values[code],
    change: baseValues ? roundChange(values[code], baseValues[code]) : null,
  }))
}

function previousHistoryDate(history, date) {
  return Object.keys(history).sort().filter((key) => key < date).at(-1) ?? null
}

export function ratesForDate({ snapshot, history = {}, date }) {
  if (snapshot?.date === date) {
    return buildRates(snapshotValues(snapshot, 'value'), snapshotValues(snapshot, 'previous'))
  }
  const values = snapshot?.previousDate === date ? snapshotValues(snapshot, 'previous') : history[date]
  if (!values) return emptyRates()
  const baseDate = previousHistoryDate(history, date)
  return buildRates(values, baseDate ? history[baseDate] : null)
}