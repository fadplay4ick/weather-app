import { describe, expect, it } from 'vitest'
import { getTargetDate } from './checkpoints.js'

function readingsAt(time) {
  return [{ time }]
}

describe('выбор дня для советов', () => {
  it('утром берётся сегодняшний день', () => {
    expect(getTargetDate(readingsAt('2026-11-03T07:00'))).toBe('2026-11-03')
  })

  it('в 18:00 ещё сегодняшний день', () => {
    expect(getTargetDate(readingsAt('2026-11-03T18:00'))).toBe('2026-11-03')
  })

  it('после 18:00 берётся завтрашний день', () => {
    expect(getTargetDate(readingsAt('2026-11-03T19:00'))).toBe('2026-11-04')
  })

  it('на границе месяца и года день считается верно', () => {
    expect(getTargetDate(readingsAt('2026-11-30T20:00'))).toBe('2026-12-01')
    expect(getTargetDate(readingsAt('2026-12-31T22:00'))).toBe('2027-01-01')
  })
})