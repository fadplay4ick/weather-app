import { describe, expect, it } from 'vitest'
import { buildDayStrip } from './dayStrip.js'

function makeReading(temperature) {
  return { temperature }
}

describe('полоса дней', () => {
  it('сортирует дни и отмечает выбранный', () => {
    const history = { '2026-11-04': {}, '2026-11-03': {} }
    const strip = buildDayStrip(history, '2026-11-04')
    expect(strip.map(({ date }) => date)).toEqual(['2026-11-03', '2026-11-04'])
    expect(strip[0]).toMatchObject({ weekday: 'вт', dayNumber: 3, isSelected: false })
    expect(strip[1]).toMatchObject({ weekday: 'ср', dayNumber: 4, isSelected: true })
  })

  it('берёт температуру утра', () => {
    const history = { '2026-11-03': { morning: makeReading(-1), evening: makeReading(5) } }
    expect(buildDayStrip(history, '2026-11-03')[0].temperature).toBe(-1)
  })

  it('без утра берёт следующую доступную точку', () => {
    const history = { '2026-11-03': { evening: makeReading(5) } }
    expect(buildDayStrip(history, '2026-11-03')[0].temperature).toBe(5)
  })

  it('пустой день даёт null', () => {
    expect(buildDayStrip({ '2026-11-03': {} }, '2026-11-03')[0].temperature).toBeNull()
  })
})