import { describe, expect, it } from 'vitest'
import { HISTORY_FORECAST_DAYS } from '../config.js'
import { updateHistory } from './history.js'

function makeReading(time, temperature = 0) {
  return { time, temperature }
}

function dayReadings(date, temperature = 0) {
  return [8, 16, 18].map((hour) =>
    makeReading(`${date}T${String(hour).padStart(2, '0')}:00`, temperature)
  )
}

describe('обновление истории', () => {
  it('сохраняет сегодня и будущие дни', () => {
    const readings = [...dayReadings('2026-11-03'), ...dayReadings('2026-11-04')]
    const history = updateHistory({}, readings)
    expect(Object.keys(history)).toEqual(['2026-11-03', '2026-11-04'])
    expect(history['2026-11-04'].evening.time).toBe('2026-11-04T18:00')
  })

  it('свежий прогноз перезаписывает будущую точку', () => {
    const stored = { '2026-11-04': { morning: makeReading('2026-11-04T08:00', 1) } }
    const readings = [...dayReadings('2026-11-03'), ...dayReadings('2026-11-04', 5)]
    const history = updateHistory(stored, readings)
    expect(history['2026-11-04'].morning.temperature).toBe(5)
  })

  it('прошедшая точка не затирается', () => {
    const stored = { '2026-11-03': { morning: makeReading('2026-11-03T08:00', 7) } }
    const readings = [
      makeReading('2026-11-03T17:00', 2),
      makeReading('2026-11-03T18:00', 2),
    ]
    const day = updateHistory(stored, readings)['2026-11-03']
    expect(day.morning.temperature).toBe(7)
    expect(day.evening.temperature).toBe(2)
  })

  it('при первом запуске в 17:00 утро и дорога остаются пустыми', () => {
    const readings = [
      makeReading('2026-11-03T17:00'),
      makeReading('2026-11-03T18:00'),
    ]
    const day = updateHistory({}, readings)['2026-11-03']
    expect(day.morning).toBeUndefined()
    expect(day.afternoon).toBeUndefined()
    expect(day.evening).toBeDefined()
  })

  it('хранит не больше 7 дней вперёд', () => {
    const readings = Array.from({ length: 9 }, (_, index) =>
      dayReadings(`2026-11-${String(3 + index).padStart(2, '0')}`)
    ).flat()
    const history = updateHistory({}, readings)
    expect(Object.keys(history)).toHaveLength(HISTORY_FORECAST_DAYS)
  })

  it('удаляет дни старше 30 суток', () => {
    const stored = {
      '2026-10-03': { morning: makeReading('2026-10-03T08:00') },
      '2026-10-04': { morning: makeReading('2026-10-04T08:00') },
    }
    const history = updateHistory(stored, dayReadings('2026-11-03'))
    expect(history['2026-10-03']).toBeUndefined()
    expect(history['2026-10-04']).toBeDefined()
  })
})