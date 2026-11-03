import { CHECKPOINTS, MAX_READING_DISTANCE_HOURS } from '../config.js'

const MS_PER_HOUR = 3600000

function toMs(timeKey) {
  return Date.parse(`${timeKey}Z`)
}

function distanceHours(reading, targetMs) {
  return Math.abs(toMs(reading.time) - targetMs) / MS_PER_HOUR
}

function byProximity(targetMs) {
  return (a, b) =>
    distanceHours(a, targetMs) - distanceHours(b, targetMs) || toMs(a.time) - toMs(b.time)
}

export function addDays(dateKey, days) {
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
  const targetMs = toMs(`${date}T${String(hour).padStart(2, '0')}:00`)
  if (targetMs < toMs(readings[0].time)) return undefined
  return readings
    .filter((reading) => distanceHours(reading, targetMs) <= MAX_READING_DISTANCE_HOURS)
    .sort(byProximity(targetMs))[0]
}

export function pickCheckpoints(readings, date) {
  return CHECKPOINTS.map((checkpoint) => ({
    ...checkpoint,
    reading: findReading(readings, date, checkpoint.hour),
  }))
}