import { describe, expect, it } from 'vitest'
import { loadHistory, recordForecast } from './historyStorage.js'

function makeStorage(initial = null) {
  let value = initial
  return {
    getItem: () => value,
    setItem: (_, next) => {
      value = next
    },
  }
}

const readings = [{ time: '2026-11-03T08:00', temperature: 3 }]

describe('хранилище истории', () => {
  it('запись сохраняется и читается обратно', () => {
    const storage = makeStorage()
    recordForecast(readings, storage)
    expect(loadHistory(storage)['2026-11-03'].morning.temperature).toBe(3)
  })

  it('пустое хранилище даёт пустую историю', () => {
    expect(loadHistory(makeStorage())).toEqual({})
  })

  it('повреждённые данные не ломают загрузку', () => {
    expect(loadHistory(makeStorage('{oops'))).toEqual({})
  })

  it('ошибка записи не роняет приложение', () => {
    const storage = {
      getItem: () => null,
      setItem: () => {
        throw new Error('quota')
      },
    }
    expect(() => recordForecast(readings, storage)).not.toThrow()
  })
})