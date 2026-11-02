import { describe, expect, it } from 'vitest'
import { buildDayLabel } from './dayLabel.js'

describe('подпись дня', () => {
  it('для сегодняшнего дня', () => {
    expect(buildDayLabel('2026-11-03', '2026-11-03')).toEqual({
      prefix: 'Сегодня',
      date: 'вторник, 3 ноября',
    })
  })

  it('для завтрашнего дня', () => {
    expect(buildDayLabel('2026-11-04', '2026-11-03').prefix).toBe('Завтра')
  })
})