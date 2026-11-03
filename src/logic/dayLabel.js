import { APPROXIMATE_FROM_DAYS, CITY } from '../config.js'

const formatter = new Intl.DateTimeFormat('ru-RU', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: CITY.timezone,
})

function formatDate(dateKey) {
  return formatter.format(new Date(`${dateKey}T12:00:00Z`))
}

const MS_PER_DAY = 86400000
const PREFIXES = { '-1': 'Вчера', 0: 'Сегодня', 1: 'Завтра' }

function dayDifference(targetDate, todayDate) {
  return Math.round((Date.parse(targetDate) - Date.parse(todayDate)) / MS_PER_DAY)
}

function buildPrefix(difference) {
  if (difference in PREFIXES) return PREFIXES[difference]
  return difference > 0 ? `Через ${difference} дн.` : `${-difference} дн. назад`
}

export function buildDayLabel(targetDate, todayDate) {
  const difference = dayDifference(targetDate, todayDate)
  return {
    prefix: buildPrefix(difference),
    date: formatDate(targetDate),
    approximate: difference >= APPROXIMATE_FROM_DAYS,
  }
}