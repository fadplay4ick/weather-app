import { describe, expect, it } from 'vitest'
import { buildDayLabel } from './dayLabel.js'

describe('подпись дня', () => {
  it('для сегодняшнего дня', () => {
    expect(buildDayLabel('2026-11-03', '2026-11-03')).toEqual({
      prefix: 'Сегодня',
      date: 'вторник, 3 ноября',
      approximate: false,
    })
  })

  it('для завтрашнего дня', () => {
    expect(buildDayLabel('2026-11-04', '2026-11-03').prefix).toBe('Завтра')
  })
})

describe('подпись дня: другие дни', () => {
  it('вчера', () => {
    expect(buildDayLabel('2026-11-02', '2026-11-03').prefix).toBe('Вчера')
  })

  it('через несколько дней', () => {
    expect(buildDayLabel('2026-11-06', '2026-11-03').prefix).toBe('Через 3 дн.')
  })

  it('несколько дней назад', () => {
    expect(buildDayLabel('2026-11-01', '2026-11-03').prefix).toBe('2 дн. назад')
  })
})

describe('подпись дня: примерный прогноз', () => {
  it('через 3 дня прогноз ещё не примерный', () => {
    expect(buildDayLabel('2026-11-06', '2026-11-03').approximate).toBe(false)
  })

  it('через 4 дня и дальше примерный', () => {
    expect(buildDayLabel('2026-11-07', '2026-11-03').approximate).toBe(true)
  })

  it('прошлые дни не примерные', () => {
    expect(buildDayLabel('2026-11-01', '2026-11-03').approximate).toBe(false)
  })
})