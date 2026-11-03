import { CHECKPOINTS } from '../config.js'
import { buildDayAdvice } from './advice.js'

function withoutAdvice(item) {
  return item.available ? { ...item, outfit: null, warnings: [] } : item
}

export function adviceForDate(history, date, todayDate) {
  const day = history[date] ?? {}
  const advice = buildDayAdvice(
    CHECKPOINTS.map((checkpoint) => ({ ...checkpoint, reading: day[checkpoint.id] }))
  )
  return date < todayDate ? advice.map(withoutAdvice) : advice
}