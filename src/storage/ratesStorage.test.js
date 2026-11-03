import { describe, expect, it } from 'vitest'
import { loadRatesHistory, recordRates } from './ratesStorage.js'

function makeStorage(initial = null) {
  let value = initial
  return {
    getItem: () => value,
    setItem: (_, next) => {
      value = next
    },
  }
}

const snapshot = {
  date: '2026-11-05',
  previousDate: '2026-11-04',
  rates: {
    USD: { value: 81, previous: 80.5 },
    EUR: { value: 93, previous: 93.25 },
    CNY: { value: 11.1, previous: 11.05 },
  },
}

describe('хранилище истории курсов', () => {
  it('запись сохраняется и читается обратно', () => {
    const storage = makeStorage()
    recordRates(snapshot, storage)
    expect(loadRatesHistory(storage)['2026-11-05'].USD).toBe(81)
  })

  it('пустое хранилище даёт пустую историю', () => {
    expect(loadRatesHistory(makeStorage())).toEqual({})
  })

  it('повреждённые данные не ломают загрузку', () => {
    expect(loadRatesHistory(makeStorage('{oops'))).toEqual({})
  })

  it('ошибка записи не роняет приложение', () => {
    const storage = {
      getItem: () => null,
      setItem: () => {
        throw new Error('quota')
      },
    }
    expect(() => recordRates(snapshot, storage)).not.toThrow()
  })
})