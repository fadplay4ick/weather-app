import { describe, expect, it } from 'vitest'
import { ratesForDate } from './ratesForDate.js'

const snapshot = {
  date: '2026-11-05',
  previousDate: '2026-11-04',
  rates: {
    USD: { value: 81, previous: 80.5 },
    EUR: { value: 93, previous: 93.25 },
    CNY: { value: 11.1, previous: 11.1 },
  },
}

const history = {
  '2026-11-02': { USD: 79.9, EUR: 92.5, CNY: 11 },
  '2026-11-03': { USD: 80.1, EUR: 93.2, CNY: 11.04 },
}

const byCode = (rates, code) => rates.find((rate) => rate.code === code)

describe('ratesForDate', () => {
  it('берёт Value, если Date равна дню', () => {
    const rates = ratesForDate({ snapshot, history, date: '2026-11-05' })
    expect(byCode(rates, 'USD')).toEqual({ code: 'USD', value: 81, change: 0.5 })
  })

  it('считает отрицательную динамику', () => {
    const rates = ratesForDate({ snapshot, history, date: '2026-11-05' })
    expect(byCode(rates, 'EUR').change).toBe(-0.25)
  })

  it('даёт нулевую динамику без шума', () => {
    const rates = ratesForDate({ snapshot, history, date: '2026-11-05' })
    expect(byCode(rates, 'CNY').change).toBe(0)
  })

  it('берёт Previous, если PreviousDate равна дню', () => {
    const rates = ratesForDate({ snapshot, history, date: '2026-11-04' })
    expect(byCode(rates, 'USD').value).toBe(80.5)
  })

  it('считает динамику Previous по истории', () => {
    const rates = ratesForDate({ snapshot, history, date: '2026-11-04' })
    expect(byCode(rates, 'USD').change).toBe(0.4)
  })

  it('без истории динамика Previous пустая', () => {
    const rates = ratesForDate({ snapshot, date: '2026-11-04' })
    expect(byCode(rates, 'USD').change).toBeNull()
  })

  it('берёт прошлый день из истории', () => {
    const rates = ratesForDate({ snapshot, history, date: '2026-11-03' })
    expect(byCode(rates, 'USD')).toEqual({ code: 'USD', value: 80.1, change: 0.2 })
  })

  it('самый старый день истории без динамики', () => {
    const rates = ratesForDate({ snapshot, history, date: '2026-11-02' })
    expect(byCode(rates, 'USD').change).toBeNull()
  })

  it('даёт прочерки для неизвестного дня', () => {
    const rates = ratesForDate({ snapshot, history, date: '2026-11-09' })
    expect(rates.every(({ value, change }) => value === null && change === null)).toBe(true)
  })

  it('работает без снимка, если день есть в истории', () => {
    const rates = ratesForDate({ snapshot: null, history, date: '2026-11-03' })
    expect(byCode(rates, 'EUR').value).toBe(93.2)
  })

  it('даёт прочерки без снимка для дня вне истории', () => {
    const rates = ratesForDate({ snapshot: null, history, date: '2026-11-05' })
    expect(rates.every(({ value }) => value === null)).toBe(true)
  })
})