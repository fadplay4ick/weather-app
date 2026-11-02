import { CITY } from '../config.js'

const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: CITY.timezone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  hourCycle: 'h23',
})

export function toLocalKey(isoString) {
  const parts = Object.fromEntries(
    formatter.formatToParts(new Date(isoString)).map(({ type, value }) => [type, value])
  )
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:00`
}