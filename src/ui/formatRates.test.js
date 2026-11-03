import { describe, expect, it } from 'vitest'
import { changeDirection, formatChange, formatRate } from './formatRates.js'

describe('форматирование курса', () => {
  it.each([
    [80.42, '80,42'],
    [93.1, '93,10'],
    [11.08, '11,08'],
    [100, '100,00'],
    [null, '—'],
  ])('%s даёт %s', (value, expected) => {
    expect(formatRate(value)).toBe(expected)
  })
})

describe('форматирование динамики', () => {
  it.each([
    [0.31, '▲ 0,31'],
    [-0.12, '▼ 0,12'],
    [0, ''],
    [null, ''],
  ])('%s даёт «%s»', (change, expected) => {
    expect(formatChange(change)).toBe(expected)
  })
})

describe('направление динамики', () => {
  it('рост', () => {
    expect(changeDirection(0.5)).toBe('up')
  })

  it('падение', () => {
    expect(changeDirection(-0.5)).toBe('down')
  })

  it('нет изменения', () => {
    expect(changeDirection(0)).toBeNull()
    expect(changeDirection(null)).toBeNull()
  })
})