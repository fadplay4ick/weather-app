import { describe, expect, it } from 'vitest'
import { formatHour, formatTemperature } from './format.js'

describe('форматирование температуры', () => {
  it.each([
    [4.4, '4°'],
    [-0.4, '0°'],
    [-0.7, '−1°'],
    [-12, '−12°'],
    [0, '0°'],
  ])('%s даёт %s', (value, expected) => {
    expect(formatTemperature(value)).toBe(expected)
  })

  it('час выводится с минутами', () => {
    expect(formatHour(8)).toBe('8:00')
  })
}) 