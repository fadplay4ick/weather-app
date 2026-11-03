import { describe, expect, it } from 'vitest'
import { HISTORY_KEEP_DAYS } from '../config.js'
import { updateRatesHistory } from './ratesHistory.js'

const snapshot = {
  date: '2026-11-05',
  previousDate: '2026-11-04',
  rates: {
    USD: { value: 81, previous: 80.5 },
    EUR: { value: 93, previous: 93.25 },
    CNY: { value: 11.1, previous: 11.05 },
  },
}

function makeOldHistory(count) {
  const days = Array.from({ length: count }, (_, index) =>
    new Date(Date.UTC(2020, 0, 1 + index)).toISOString().slice(0, 10)
  )
  return Object.fromEntries(days.map((day) => [day, { USD: 1, EUR: 1, CNY: 1 }]))
}

describe('updateRatesHistory', () => {
  it('сохраняет Value на дату Date', () => {
    const history = updateRatesHistory({}, snapshot)
    expect(history['2026-11-05']).toEqual({ USD: 81, EUR: 93, CNY: 11.1 })
  })

  it('сохраняет Previous на дату PreviousDate', () => {
    const history = updateRatesHistory({}, snapshot)
    expect(history['2026-11-04']).toEqual({ USD: 80.5, EUR: 93.25, CNY: 11.05 })
  })

  it('не перезаписывает уже сохранённый день', () => {
    const saved = { '2026-11-04': { USD: 1, EUR: 2, CNY: 3 } }
    const history = updateRatesHistory(saved, snapshot)
    expect(history['2026-11-04']).toEqual({ USD: 1, EUR: 2, CNY: 3 })
  })

  it('хранит только последние записи', () => {
    const old = makeOldHistory(40)
    const history = updateRatesHistory(old, snapshot)
    expect(Object.keys(history)).toHaveLength(HISTORY_KEEP_DAYS)
    expect(history['2020-01-01']).toBeUndefined()
    expect(history['2026-11-05']).toBeDefined()
  })

  it('не меняет переданную историю', () => {
    const saved = {}
    updateRatesHistory(saved, snapshot)
    expect(saved).toEqual({})
  })
})