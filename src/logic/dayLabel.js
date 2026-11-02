import { CITY } from '../config.js'

const formatter = new Intl.DateTimeFormat('ru-RU', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: CITY.timezone,
})

function formatDate(dateKey) {
  return formatter.format(new Date(`${dateKey}T12:00:00Z`))
}

export function buildDayLabel(targetDate, todayDate) {
  return {
    prefix: targetDate === todayDate ? 'Сегодня' : 'Завтра',
    date: formatDate(targetDate),
  }
}