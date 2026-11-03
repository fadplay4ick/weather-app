import { CITY, PRECIPITATION_WINDOWS } from '../config.js'
import { toLocalKey } from '../utils/localTime.js'

const BASE_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact'
const TIMEOUT_MS = 8000

function buildUrl() {
  const params = new URLSearchParams({
    lat: CITY.latitude.toFixed(4),
    lon: CITY.longitude.toFixed(4),
  })
  return `${BASE_URL}?${params}`
}

function pickForecastWindow(data) {
  if (data.next_1_hours) {
    return { forecast: data.next_1_hours, hours: PRECIPITATION_WINDOWS.short }
  }
  if (data.next_6_hours) {
    return { forecast: data.next_6_hours, hours: PRECIPITATION_WINDOWS.long }
  }
  return null
}

export function toReading(entry) {
  const { details } = entry.data.instant
  const picked = pickForecastWindow(entry.data)
  return {
    time: toLocalKey(entry.time),
    temperature: details.air_temperature,
    wind: details.wind_speed,
    humidity: details.relative_humidity,
    precipitation: picked?.forecast.details.precipitation_amount ?? null,
    precipitationWindow: picked?.hours ?? null,
    symbol: picked?.forecast.summary.symbol_code ?? null,
  }
}

export async function fetchHourlyForecast() {
  const response = await fetch(buildUrl(), { signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!response.ok) throw new Error(`MET Norway: ${response.status}`)
  const data = await response.json()
  return data.properties.timeseries.map(toReading)
}