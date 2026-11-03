import { RATES_CURRENCIES, RATES_TIMEOUT_MS, RATES_URL } from '../config.js'

const dateOnly = (isoString) => isoString.slice(0, 10)

function toCurrencyRate(valute) {
  return {
    value: valute.Value / valute.Nominal,
    previous: valute.Previous / valute.Nominal,
  }
}

function pickRate(valutes, code) {
  const valute = valutes[code]
  if (!valute) throw new Error(`В ответе нет валюты ${code}`)
  return toCurrencyRate(valute)
}

export function toRateSnapshot(json) {
  const rates = {}
  for (const code of RATES_CURRENCIES) rates[code] = pickRate(json.Valute, code)
  return {
    date: dateOnly(json.Date),
    previousDate: dateOnly(json.PreviousDate),
    rates,
  }
}

export async function fetchRates(fetchFn = fetch) {
  const response = await fetchFn(RATES_URL, {
    signal: AbortSignal.timeout(RATES_TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`Курсы: ошибка ${response.status}`)
  return toRateSnapshot(await response.json())
}