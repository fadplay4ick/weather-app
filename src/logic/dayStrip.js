import { CITY } from '../config.js'

const weekdayFormatter = new Intl.DateTimeFormat('ru-RU', {
  weekday: 'short',
  timeZone: CITY.timezone,
})

function pickTemperature(day) {
  const reading = day.morning ?? day.afternoon ?? day.evening
  return reading ? reading.temperature : null
}

export function buildDayStrip(history, selectedDate) {
  return Object.keys(history)
    .sort()
    .map((date) => ({
      date,
      weekday: weekdayFormatter.format(new Date(`${date}T12:00:00Z`)),
      dayNumber: Number(date.slice(8, 10)),
      temperature: pickTemperature(history[date]),
      isSelected: date === selectedDate,
    }))
}