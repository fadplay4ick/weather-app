import { describe, expect, it } from 'vitest'
import { adviceForDate } from './dayFromHistory.js'

const reading = { temperature: 3, wind: 1, precipitation: 0 }

describe('совет по дню из истории', () => {
  it('точки без данных недоступны, остальные работают', () => {
    const advice = adviceForDate({ '2026-11-03': { morning: reading } }, '2026-11-03')
    expect(advice.map(({ available }) => available)).toEqual([true, false, false])
  })

  it('день, которого нет в истории, целиком недоступен', () => {
    const advice = adviceForDate({}, '2026-11-03')
    expect(advice.every(({ available }) => !available)).toBe(true)
  })
})

describe('прошлые дни', () => {
  const stormy = { temperature: 3, wind: 10, precipitation: 1 }
  const history = { '2026-11-02': { morning: stormy }, '2026-11-03': { morning: stormy } }

  it('у прошлого дня нет совета и предупреждений, температура остаётся', () => {
    const [morning] = adviceForDate(history, '2026-11-02', '2026-11-03')
    expect(morning.available).toBe(true)
    expect(morning.reading.temperature).toBe(3)
    expect(morning.outfit).toBeNull()
    expect(morning.warnings).toEqual([])
  })

  it('у сегодняшнего дня совет остаётся', () => {
    const [morning] = adviceForDate(history, '2026-11-03', '2026-11-03')
    expect(morning.outfit).toBeTruthy()
    expect(morning.warnings.length).toBeGreaterThan(0)
  })

  it('недоступные точки прошлого дня остаются недоступными', () => {
    const advice = adviceForDate(history, '2026-11-02', '2026-11-03')
    expect(advice.map(({ available }) => available)).toEqual([true, false, false])
  })
})