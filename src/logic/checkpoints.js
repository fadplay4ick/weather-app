import { CHECKPOINTS } from '../config.js'

function addDays(dateKey, days) {
  const date = new Date(`${dateKey}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

function lastCheckpointHour() {
  return Math.max(...CHECKPOINTS.map(({ hour }) => hour))
}

export function getTargetDate(readings) {
  const [date, time] = readings[0].time.split('T')
  const currentHour = Number(time.slice(0, 2))
  return currentHour > lastCheckpointHour() ? addDays(date, 1) : date
}

function findReading(readings, date, hour) {
  const key = `${date}T${String(hour).padStart(2, '0')}:00`
  return readings.find((reading) => reading.time === key)
}

export function pickCheckpoints(readings, date) {
  return CHECKPOINTS.map((checkpoint) => ({
    ...checkpoint,
    reading: findReading(readings, date, checkpoint.hour),
  }))
}