import { describe, expect, it } from 'vitest'
import { PRECIPITATION_WINDOWS } from '../config.js'
import { toReading } from './metNorway.js'

function makeEntry(extra = {}) {
  return {
    time: '2026-11-03T05:00:00Z',
    data: {
      instant: {
        details: { air_temperature: -1, wind_speed: 2, relative_humidity: 80 },
      },
      ...extra,
    },
  }
}

function makeWindow(amount, symbol) {
  return {
    summary: { symbol_code: symbol },
    details: { precipitation_amount: amount },
  }
}

describe('toReading', () => {
  it('с next_1_hours берёт часовые данные', () => {
    const reading = toReading(
      makeEntry({
        next_1_hours: makeWindow(0.2, 'lightrain'),
        next_6_hours: makeWindow(3, 'rain'),
      })
    )
    expect(reading.precipitation).toBe(0.2)
    expect(reading.precipitationWindow).toBe(PRECIPITATION_WINDOWS.short)
    expect(reading.symbol).toBe('lightrain')
  })

  it('только с next_6_hours берёт 6-часовые данные', () => {
    const reading = toReading(makeEntry({ next_6_hours: makeWindow(3, 'rain') }))
    expect(reading.precipitation).toBe(3)
    expect(reading.precipitationWindow).toBe(PRECIPITATION_WINDOWS.long)
    expect(reading.symbol).toBe('rain')
  })

  it('без прогноза на период оставляет осадки и значок пустыми', () => {
    const reading = toReading(makeEntry())
    expect(reading.precipitation).toBeNull()
    expect(reading.precipitationWindow).toBeNull()
    expect(reading.symbol).toBeNull()
  })

  it('переводит время в московское и сохраняет температуру и ветер', () => {
    const reading = toReading(makeEntry())
    expect(reading.time).toBe('2026-11-03T08:00')
    expect(reading.temperature).toBe(-1)
    expect(reading.wind).toBe(2)
  })
})